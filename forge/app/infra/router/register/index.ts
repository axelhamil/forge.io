import { FastifyPluginAsync } from "fastify";

const registerRoutes: FastifyPluginAsync = async (fastify): Promise<void> => {
  fastify.get(
    "/",
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
};

export default registerRoutes;
