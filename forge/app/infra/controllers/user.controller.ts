import { CreateUserDTO } from "@app/domain/contracts/users.contract";
import AllUsersPresenter from "@app/domain/handlers/presenters/AllUsers.presenter";
import CreateUser from "@app/domain/usecases/createUser";
import FindAllUsers from "@app/domain/usecases/findAllUsers";
import { FastifyReply, FastifyRequest } from "fastify";
import { inject, injectable } from "tsyringe";

@injectable()
class UserController {
  constructor(
    @inject(CreateUser)
    private readonly createUserUseCase: CreateUser,
    @inject(FindAllUsers)
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
