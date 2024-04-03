import { Email, Password, UseCase, UseCaseError } from "@repo/core-domain";

import type { CreateUserDTO, UserRepo } from "../contracts/users.contract";
import User from "../entities/User";

export default class CreateUserUseCase
  implements UseCase<CreateUserDTO, Promise<"OK">>
{
  constructor(private readonly useRepo: UserRepo) {}

  public async execute(req: CreateUserDTO): Promise<"OK"> {
    const email = Email.create(req.email);
    const password = Password.create(req.password);

    const userExists = await this.useRepo.exists(email);

    if (userExists) throw new UseCaseError("User already exists", 400);

    const newUser = User.create({
      email,
      password,
    });

    await this.useRepo.save(newUser);

    return "OK";
  }
}
