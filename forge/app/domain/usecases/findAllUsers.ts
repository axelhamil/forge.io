import { UseCase } from "@repo/core-domain";
import { inject, injectable } from "tsyringe";

import { IUserRepo } from "../contracts/users.contract";
import User from "../entities/user/User";

@injectable()
class FindAllUsers implements UseCase<void, User[]> {
  constructor(
    @inject("IUserRepo")
    private userRepo: IUserRepo,
  ) {}

  public async execute(): Promise<User[]> {
    return this.userRepo.findAll();
  }
}

export default FindAllUsers;
