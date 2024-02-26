import userRoutes from "@modules/user/routes/user.routes";
import { FastifyInstance, FastifyReply } from "fastify";

const v1Router = async (fastify: FastifyInstance): Promise<void> => {
  fastify.get("/health", async (_request, reply: FastifyReply) => {
    return reply.send("OK").code(200).type("application/text");
  });

  fastify.register(userRoutes, { prefix: "/user" });
};

export default v1Router;
