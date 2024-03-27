import UserController from "@app/infra/controllers/user.controller";
import { FastifyPluginAsync } from "fastify";
import { container } from "tsyringe";

const homeRouter: FastifyPluginAsync = async (fastify): Promise<void> => {
  fastify.get(
    "/",
    {
      schema: {
        summary: "home",
        tags: ["PAGES"],
      },
    },
    async (_request, reply) => {
      return reply.view("pages/home");
    },
  );
  fastify.get(
    "/register",
    {
      schema: {
        summary: "register",
        tags: ["PAGES"],
      },
    },
    async (_request, reply) => {
      return reply.view("pages/register");
    },
  );

  fastify.get(
    "/users",
    {
      schema: {
        summary: "users",
        tags: ["PAGES"],
      },
    },
    (request, reply) =>
      container.resolve(UserController).findAllUsers(request, reply),
  );
};

export default homeRouter;
