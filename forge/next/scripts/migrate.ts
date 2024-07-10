import { drizzle, type NodePgDatabase } from "drizzle-orm/node-postgres";
import { migrate } from "drizzle-orm/node-postgres/migrator";
import { Client } from "pg";
import { Logger } from "@repo/core-domain";
import env from "~/utils/env";
import * as schema from "~/config/db/schemas";

const client = new Client({
  connectionString: env.DATABASE_URL,
});

async function getDb(): Promise<NodePgDatabase<typeof schema>> {
  await client.connect();
  return drizzle(client, { schema });
}

(async (): Promise<void> => {
  await migrate(await getDb(), {
    migrationsFolder: "./config/db/migrations",
  });

  Logger.info("[DB]: Migrations done 🚀");
  await import("../config/db/hooks");
  process.exit(0);
})();
