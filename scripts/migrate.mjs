// Vercel provides DATABASE_URL during the build. Local SQLite uses npm run setup.
if (!process.env.DATABASE_URL) {
  console.log("No hosted database configured; skipping hosted auth migration.");
  process.exit(0);
}

const { auth } = await import("../lib/auth.js");
const { getMigrations } = await import("better-auth/db/migration");
const migration = await getMigrations(auth.options);
await migration.runMigrations();
console.log("Hosted authentication tables are ready.");
process.exit(0);
