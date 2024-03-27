import { createUserDTOSchema } from "@app/domain/contracts/users.contract";
import UserController from "@app/infra/controllers/user.controller";
import { FastifyPluginAsync } from "fastify";
import { buildJsonSchemas } from "fastify-zod";
import { container } from "tsyringe";

const { schemas: userSchemas, $ref } = buildJsonSchemas(
  {
    createUserDTOSchema,
  },
  { $id: "user" },
);

const usersRoutes: FastifyPluginAsync = async (fastify): Promise<void> => {
  fastify.get("/", async (_request, reply) => reply.send("OK_Users"));
  fastify.post(
    "/",
    {
      schema: {
        body: $ref("createUserDTOSchema"),
        summary: "createUser",
        tags: ["API"],
      },
    },
    (request, reply) =>
      container.resolve(UserController).createUser(request, reply),
  );
};

export { userSchemas };
export default usersRoutes;
