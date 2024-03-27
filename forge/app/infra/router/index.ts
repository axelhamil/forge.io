import { FastifyPluginAsync } from "fastify";

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
};

export default homeRouter;
