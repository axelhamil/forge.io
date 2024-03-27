import { FastifyReply, FastifyRequest } from "fastify";
import { injectable, registry } from "tsyringe";

import { CreateUserDTO } from "../../../domain/contracts/users.contract";
import CreateUser from "../../../domain/usecases/createUser";
import FindAllUsers from "../../../domain/usecases/findAllUsers";
import HbsPresenter from "../../hbsPresenter";
import DrizzleUserRepo from "../../repositories/users/drizzleUserRepo";

@injectable()
@registry([
  { token: "IUserRepo", useClass: DrizzleUserRepo },
  {
    token: "IHtmlPresenter",
    useClass: HbsPresenter,
  },
])
class UserController {
  constructor(
    private readonly createUserUseCase: CreateUser,
    private readonly findAllUsersUseCase: FindAllUsers,
  ) {}

  public async createUser(
    req: FastifyRequest<{
      Body?: CreateUserDTO;
    }>,
    reply: FastifyReply,
  ): Promise<FastifyReply> {
    try {
      const { email, password } = req.body;

      await this.createUserUseCase.execute({
        email,
        password,
      });

      return reply.redirect(`/users`);
    } catch (error) {
      return reply.send(error).code(500);
    }
  }

  public async findAllUsers(
    _req: FastifyRequest,
    reply: FastifyReply,
  ): Promise<FastifyReply> {
    const result = await this.findAllUsersUseCase.execute();

    return reply.view(result.template, result.data);
  }
}

export default UserController;
