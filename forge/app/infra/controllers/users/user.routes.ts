import { FastifyInstance } from "fastify";
import { buildJsonSchemas } from "fastify-zod";
import { container } from "tsyringe";

import { createUserDTOSchema } from "../../../domain/contracts/users.contract";
import UserController from "./user.controller";

const { schemas: userSchemas, $ref } = buildJsonSchemas(
  {
    createUserDTOSchema,
  },
  { $id: "user" },
);

const userRoutes = async (fastify: FastifyInstance): Promise<void> => {
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
export default userRoutes;
