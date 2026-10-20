import { existsSync, writeFileSync } from "node:fs";
import { randomBytes } from "node:crypto";

if (!existsSync(".env.local")) {
  writeFileSync(
    ".env.local",
    `BETTER_AUTH_URL=http://localhost:3000\nBETTER_AUTH_SECRET=${randomBytes(32).toString("hex")}\n`,
  );
  console.log(
    "Created local auth configuration. Secrets stay on this computer.",
  );
}
process.loadEnvFile(".env.local");
const { auth } = await import("../lib/auth.js");
const { getMigrations } = await import("better-auth/db/migration");
const migration = await getMigrations(auth.options);
await migration.runMigrations();
console.log("Authentication database is ready.");
process.exit(0);
