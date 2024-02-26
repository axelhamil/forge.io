import User from "@modules/user/domain/User";
import IUserRepo from "@modules/user/repositories/userRepo.spi";
import { Email, Password, UseCase, UseCaseError } from "@repo/core-domain";
import { CreateUserDTO } from "@repo/types";
import { inject, injectable } from "tsyringe";

@injectable()
class CreateUser implements UseCase<CreateUserDTO, Promise<"OK">> {
  constructor(
    @inject("IUserRepo")
    private readonly useRepo: IUserRepo,
  ) {}

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

export default CreateUser;
