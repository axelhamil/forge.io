import "reflect-metadata";

import configureRoutes from "@config/configureRoutes";
import configureServer from "@config/configureServer";
import configureViews from "@config/configureViews";
import env from "@config/env";
import { initDb } from "@config/orm";
import autoLoad from "@fastify/autoload";
import Logger from "@utils/logger";
import path from "path";

export const app = configureServer(env);

(async (): Promise<void> => {
  try {
    const routes = configureRoutes(app);
    configureViews(routes);
    app.register(autoLoad, {
      dir: path.join(__dirname, "app/infra/router"),
    });
    await initDb();
    await app.listen({ host: env.HOST, port: Number(env.PORT) });
  } catch (err) {
    Logger.error((err as Error).toString());
    process.exit(1);
  }
})().then(() => {
  import("@config/hooks");
  import("@app/domain/handlers");
});
