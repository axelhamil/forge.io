import User from "@app/domain/entities/user/User";
import UserMap from "@app/domain/mappers/user.map";
import { HtmlPresenter } from "@repo/core-domain";
import { FastifyReply } from "fastify";

type ViewEngine = FastifyReply;

class AllUsersPresenter extends HtmlPresenter<User[], ViewEngine> {
  public constructor(engine: ViewEngine) {
    super(engine);
  }

  public async render(data: User[]): Promise<void> {
    const users = data.map(UserMap.toDTO);

    return this.compile.view("pages/users", { users });
  }
}

export default AllUsersPresenter;
