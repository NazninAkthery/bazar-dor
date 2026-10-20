import { DatabaseSync } from "node:sqlite";
import { Pool } from "pg";

// Local development needs no database account. Production uses PostgreSQL.
export const database = process.env.DATABASE_URL
  ? new Pool({ connectionString: process.env.DATABASE_URL })
  : new DatabaseSync("bazar-dor.sqlite");
