import { userController } from "@modules/user/user.container";
import { createUserSchema } from "@repo/types";
import { FastifyInstance } from "fastify";
import { buildJsonSchemas } from "fastify-zod";

const { schemas: userSchemas, $ref } = buildJsonSchemas(
  {
    createUserSchema,
  },
  { $id: "user" },
);

const userRoutes = async (fastify: FastifyInstance): Promise<void> => {
  fastify.post(
    "/",
    {
      schema: {
        body: $ref("createUserSchema"),
        response: {
          201: {
            type: "string",
          },
        },
        summary: "Create a user",
        tags: ["User"],
      },
    },
    (request, reply) => userController.createUser(request, reply),
  );
};

export { userSchemas };
export default userRoutes;
