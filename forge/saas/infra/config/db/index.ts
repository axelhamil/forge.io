import { drizzle, type NodePgDatabase } from "drizzle-orm/node-postgres";
import { Client } from "pg";
import env from "~/utils/env";
import * as schema from "./schemas";

const client = new Client({
  connectionString: env.DATABASE_URL,
});

async function getDb(): Promise<NodePgDatabase<typeof schema>> {
  await client.connect();
  return drizzle(client, { schema });
}

const db = await getDb();

export default db;
