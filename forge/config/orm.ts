import * as schema from "@app/infra/repositories";
import env from "@config/env";
import Logger from "@utils/logger";
import { drizzle } from "drizzle-orm/node-postgres";
import { migrate } from "drizzle-orm/node-postgres/migrator";
import path from "path";
import { Pool } from "pg";

let db: ReturnType<typeof drizzle<typeof schema>>;

async function initDb(): Promise<void> {
  const pool = new Pool({
    connectionString: env.DATABASE_URL,
    max: env.DATABASE_POOL_MAX,
  });

  const poolClient = await pool
    .connect()
    .then((client) => {
      Logger.log("[DATABASE]: Database connected 🎉");
      return client;
    })
    .catch((err) => {
      Logger.error(`[DATABASE]: Failed to connect to database ${String(err)}`);
      throw new Error(`Failed to connect to database ${String(err)}`);
    });

  db = drizzle(poolClient, {
    schema,
  });

  await migrate(db, {
    migrationsFolder: path.resolve(__dirname, "../database/migrations"),
  })
    .then(() => {
      Logger.log("[DATABASE]: Database migrated 🎉");
    })
    .catch((error) => {
      Logger.error(`Failed to migrate database ${String(error)}`);
      throw new Error(`Failed to migrate database ${String(error)}`);
    });
}

export { db, initDb };
