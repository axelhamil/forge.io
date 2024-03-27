import { CreateUserDTO } from "@app/domain/contracts/users.contract";
import CreateUser from "@app/domain/usecases/createUser";
import FindAllUsers from "@app/domain/usecases/findAllUsers";
import AllUsersPresenter from "@app/infra/presenters/allUsersPresenter";
import DrizzleUserRepo from "@app/infra/repositories/users/drizzleUserRepo";
import { FastifyReply, FastifyRequest } from "fastify";
import { injectable, registry } from "tsyringe";

@injectable()
@registry([{ token: "IUserRepo", useClass: DrizzleUserRepo }])
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
  ): Promise<void> {
    const result = await this.findAllUsersUseCase.execute();
    const presenter = new AllUsersPresenter(reply);

    return presenter.render(result);
  }
}

export default UserController;
