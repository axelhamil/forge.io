import type { Config } from "drizzle-kit";
import env from "./utils/env";

export default {
  schema: "./database/schemas.ts",
  out: "./database/migrations",
  driver: "pg",
  dbCredentials: {
    connectionString: env.DATABASE_URL,
  },
} satisfies Config;
