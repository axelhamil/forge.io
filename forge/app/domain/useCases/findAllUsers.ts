import { HtmlView, IHtmlPresenter, UseCase } from "@repo/core-domain";
import { inject, injectable } from "tsyringe";

import { IUserRepo } from "../contracts/users.contract";
import UserMap from "../mappers/user.map";

@injectable()
class FindAllUsers implements UseCase<void, HtmlView> {
  constructor(
    @inject("IUserRepo")
    private userRepo: IUserRepo,
    @inject("IHtmlPresenter")
    private htmlPresenter: IHtmlPresenter,
  ) {}

  public async execute(): Promise<HtmlView> {
    const users = await this.userRepo.findAll();

    return this.htmlPresenter.render("pages/users", {
      users: users.map(UserMap.toDTO),
    });
  }
}

export default FindAllUsers;
