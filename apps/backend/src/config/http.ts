import env, { Env } from "@config/env";
import { initDb } from "@config/orm";
import cors from "@fastify/cors";
import helmet from "@fastify/helmet";
import { userSchemas } from "@modules/user/routes/user.routes";
import v1Router from "@router/v1.router";
import Logger from "@utils/logger";
import Fastify from "fastify";
import { PinoLoggerOptions } from "fastify/types/logger";

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

for (const schema of [...userSchemas]) {
  server.addSchema(schema);
}

server.register(v1Router, { prefix: "/api/v1" });

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
