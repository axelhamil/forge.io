import { drizzleUserRepo } from "../../infra/repositories";
import CreateUserUseCase from "./CreateUser.usecase";
import FindAllUsers from "./FindAllUsers.usecase";

const createUserUseCase = new CreateUserUseCase(drizzleUserRepo);
const findAllUsersUseCase = new FindAllUsers(drizzleUserRepo);

export { createUserUseCase, findAllUsersUseCase };
