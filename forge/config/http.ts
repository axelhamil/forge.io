import env, { Env } from "@config/env";
import { initDb } from "@config/orm";
import cors from "@fastify/cors";
import formBody from "@fastify/formbody";
import helmet from "@fastify/helmet";
import fastifyStatic from "@fastify/static";
import view from "@fastify/view";
import Logger from "@utils/logger";
import Fastify from "fastify";
import { PinoLoggerOptions } from "fastify/types/logger";
import fs from "fs";
import handlebars from "handlebars";
import path from "path";

import { userSchemas } from "../app/infra/controllers/users/user.routes";
import apiRouter from "../app/infra/router/api.router";
import pagesRouter from "../app/infra/router/pages.routes";

const envToLogger: Record<Env["NODE_ENV"], PinoLoggerOptions | boolean> = {
  development: {
    level: "info",
    transport: {
      options: {
        ignore: "pid,hostname",
        translateTime: "HH:MM:ss Z",
      },
      target: "pino-pretty",
    },
  },
  production: true,
  test: true,
};

export const server = Fastify({
  ajv: {
    customOptions: {
      keywords: ["example"],
      strict: "log",
    },
  },
  logger: envToLogger[env.NODE_ENV],
});

server.register(helmet, { global: true });

server.register(cors, {
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  origin: "*",
});

server.register(view, {
  defaultContext: {
    dev: env.NODE_ENV === "development",
    title: "test",
  },
  engine: {
    handlebars,
  },
  layout: "layouts/main",
  root: path.join(__dirname, "../app/views"),
});

server.register(fastifyStatic, {
  root: path.join(__dirname, "../public"),
});

server.register(formBody);

for (const schema of [...userSchemas]) {
  server.addSchema(schema);
}

server.register(pagesRouter);
server.register(apiRouter, { prefix: "/api/v1" });

const routes = [] as {
  method: string;
  name: string;
  type: string;
  url: string;
}[];

server.addHook("onRoute", (routeOptions) => {
  const type = routeOptions?.schema?.tags?.[0] || null;

  if (type === "PAGES" || type === "API") {
    routes.push({
      method: routeOptions.method as string,
      name: routeOptions?.schema?.summary,
      type,
      url: routeOptions.url,
    });
  }
});

handlebars.registerHelper("route", (route: string): string => {
  const routeFound = routes.find((r) => r.name === route);

  if (!routeFound) return "";

  return routeFound.url;
});

const partials = fs.readdirSync(path.join(__dirname, "../app/views/partials"));

for (const partial of partials) {
  const partialName = partial.split(".")[0];
  const partialContent = fs.readFileSync(
    path.join(__dirname, `../app/views/partials/${partial}`),
    "utf-8",
  );

  handlebars.registerPartial(partialName, partialContent);
}

const startServer = async (): Promise<void> => {
  try {
    await initDb();

    await server.listen({ host: env.HOST, port: Number(env.PORT) });
  } catch (err) {
    Logger.error((err as Error).toString());
    process.exit(1);
  }
};

export default startServer;
