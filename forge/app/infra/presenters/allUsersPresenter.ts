import { FastifyReply } from "fastify";

import HtmlPresenter from "../../domain/contracts/html.presenter";
import User from "../../domain/entities/user/User";
import UserMap from "../../domain/mappers/user.map";

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
