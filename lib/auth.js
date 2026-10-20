import { betterAuth } from "better-auth";
import { Pool } from "pg";

// A shared PostgreSQL database also works when deployed to Vercel.
export const auth = betterAuth({
  database: new Pool({ connectionString: process.env.DATABASE_URL }),
  emailAndPassword: { enabled: true, autoSignIn: false, minPasswordLength: 8 },
  socialProviders: {
    ...(process.env.GOOGLE_CLIENT_ID ? { google: {
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }} : {}),
    ...(process.env.GITHUB_CLIENT_ID ? { github: {
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }} : {}),
  },
});
