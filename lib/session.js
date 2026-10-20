import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { getSessionCookie } from "better-auth/cookies";

export async function requireSession(path) {
  const requestHeaders = await headers();
  const signIn = `/signin?protected=1&next=${encodeURIComponent(path)}`;
  // Visitors without a session can go to sign-in before connecting to the database.
  if (!getSessionCookie(requestHeaders)) redirect(signIn);

  const { auth } = await import("./auth.js");
  // A cookie alone never grants access: BetterAuth must validate the session.
  const session = await auth.api.getSession({ headers: requestHeaders });
  if (!session) redirect(signIn);
  return session;
}
