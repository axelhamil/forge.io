import { UseCase } from "@repo/core-domain";

import { UserRepo } from "../contracts/users.contract";
import User from "../entities/user/User";

export default class FindAllUsers implements UseCase<void, User[]> {
  constructor(private userRepo: UserRepo) {}

  public async execute(): Promise<User[]> {
    return this.userRepo.findAll();
  }
}
