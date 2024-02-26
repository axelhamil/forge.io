import CreateUser from "@modules/user/useCases/createUser";
import { CreateUserDTO } from "@repo/types";
import { FastifyReply, FastifyRequest } from "fastify";
import { injectable } from "tsyringe";

@injectable()
class UserController {
  constructor(private readonly createUserUseCase: CreateUser) {}

  public async createUser(
    req: FastifyRequest<{
      Body?: CreateUserDTO;
    }>,
    reply: FastifyReply,
  ): Promise<FastifyReply> {
    try {
      const { email, password } = req.body;

      const result = await this.createUserUseCase.execute({
        email,
        password,
      });

      return reply.send(result).code(201).type("text/plain");
    } catch (error) {
      return reply.send(error).code(500);
    }
  }
}

export default UserController;
