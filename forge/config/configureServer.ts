import { userSchemas } from "@app/infra/router/users";
import { Env } from "@config/env";
import cors from "@fastify/cors";
import formBody from "@fastify/formbody";
import helmet from "@fastify/helmet";
import fastifyStatic from "@fastify/static";
import view from "@fastify/view";
import Fastify from "fastify";
import { PinoLoggerOptions } from "fastify/types/logger";
import handlebars from "handlebars";
import path from "path";
import {__dirname} from "../main";

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

const configureServer = (env: Env) => {
  const server = Fastify({
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
    root: path.join(__dirname, "resources"),
  });
  server.register(fastifyStatic, {
    root: path.join(__dirname, "public"),
  });

  server.register(formBody);

  for (const schema of [...userSchemas]) {
    server.addSchema(schema);
  }

  return server;
};

export default configureServer;
