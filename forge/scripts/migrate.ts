import { drizzle, type NodePgDatabase } from "drizzle-orm/node-postgres";
import { migrate } from "drizzle-orm/node-postgres/migrator";
import { Client } from "pg";
import * as schema from "../database/schemas";
import env from "../utils/env";

const client = new Client({
  connectionString: env.DATABASE_URL,
});

async function getDb(): Promise<NodePgDatabase<typeof schema>> {
  await client.connect();
  return drizzle(client, { schema });
}

(async (): Promise<void> => {
  await migrate(await getDb(), {
    migrationsFolder: "./database/migrations",
  });

  console.log("Database migrated successfully");

  process.exit(0);
})();
