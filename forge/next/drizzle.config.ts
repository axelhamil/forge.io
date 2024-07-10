import type { Config } from "drizzle-kit";
import env from "~/utils/env";

export default {
  schema: "./infra/config/db/schemas.ts",
  out: "./infra/config/db/migrations",
  dbCredentials: {
    url: env.DATABASE_URL,
  },
  dialect: "postgresql",
} satisfies Config;
