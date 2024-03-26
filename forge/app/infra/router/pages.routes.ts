import { FastifyInstance } from "fastify";
import { container } from "tsyringe";

import UserController from "../controllers/users/user.controller";

const pagesRouter = async (fastify: FastifyInstance): Promise<void> => {
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

export default pagesRouter;
