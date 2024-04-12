import type { Config } from "drizzle-kit";
import env from "./utils/env";

export default {
  schema: "./infra/config/db/schemas.ts",
  out: "./infra/config/db/migrations",
  driver: "pg",
  dbCredentials: {
    connectionString: env.DATABASE_URL,
  },
} satisfies Config;
