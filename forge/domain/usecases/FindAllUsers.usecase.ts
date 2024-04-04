import { type UseCase } from "@repo/core-domain";
import { type UserRepo } from "../contracts/users.contract";
import type User from "../entities/user/User";

export default class FindAllUsers implements UseCase<void, User[]> {
  constructor(private userRepo: UserRepo) {}

  public async execute(): Promise<User[]> {
    return this.userRepo.findAll();
  }
}
