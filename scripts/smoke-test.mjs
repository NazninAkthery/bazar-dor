import assert from "node:assert/strict";
import { randomBytes } from "node:crypto";
const base = "http://localhost:3000";
let cookie = "";
async function request(path, body) {
  const response = await fetch(`${base}/api/auth/${path}`, {
    method: body ? "POST" : "GET",
    headers: {
      "Content-Type": "application/json",
      Origin: base,
      Cookie: cookie,
    },
    ...(body ? { body: JSON.stringify(body) } : {}),
  });
  if (response.headers.getSetCookie().length)
    cookie = response.headers
      .getSetCookie()
      .map((c) => c.split(";")[0])
      .join("; ");
  return { response, data: await response.json() };
}
for (const path of [
  "/",
  "/category/chal",
  "/category/dim-dui",
  "/signin",
  "/signup",
]) {
  assert.equal((await fetch(base + path)).status, 200, path);
}
for (const path of ["/category/invalid", "/product/unknown", "/missing-page"]) {
  const response = await fetch(base + path);
  // Next.js may stream the 404 content after sending its initial headers.
  assert.match(await response.text(), /৪০৪ — খুঁজে পাওয়া যায়নি/, path);
}
const protectedPage = await fetch(`${base}/product/miniket-chal`, {
  redirect: "manual",
});
assert.ok([200, 307].includes(protectedPage.status));
assert.match(
  protectedPage.headers.get("location") || (await protectedPage.text()),
  /signin/,
);
const email = `test-${Date.now()}@example.com`;
const password = randomBytes(16).toString("hex");
let result = await request("sign-up/email", {
  name: "Local Test",
  email,
  password,
});
assert.equal(result.response.status, 200, JSON.stringify(result.data));
result = await request("sign-in/email", { email, password: "wrong-password" });
assert.equal(result.response.ok, false, "Wrong password must fail");
result = await request("sign-in/email", { email, password });
assert.equal(result.response.status, 200, JSON.stringify(result.data));
result = await request("get-session");
assert.equal(result.data.user.email, email);
result = await request("update-user", { name: "Updated Local Test" });
assert.equal(result.response.ok, true);
result = await request("get-session");
assert.equal(result.data.user.name, "Updated Local Test");
const details = await fetch(`${base}/product/miniket-chal`, {
  headers: { Cookie: cookie },
});
assert.equal(details.status, 200);
assert.match(await details.text(), /বাজারভিত্তিক আজকের দাম/);
await request("sign-out", {});
result = await request("get-session");
assert.equal(result.data, null);
console.log(
  "PASS: public pages, invalid routes, protected redirect, registration, invalid login, login, session, profile update, protected details, logout.",
);
