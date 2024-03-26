import { FastifyInstance, FastifyReply } from "fastify";

import userRoutes from "../controllers/users/user.routes";

const apiRouter = async (fastify: FastifyInstance): Promise<void> => {
  fastify.get("/health", async (_request, reply: FastifyReply) => {
    return reply.send("OK").code(200).type("application/text");
  });

  fastify.register(userRoutes, { prefix: "/users" });
};

export default apiRouter;
