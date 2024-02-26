import UserRepoImpl from "@modules/user/repositories/userRepoImpl";
import UserController from "@modules/user/routes/user.controller";
import { container } from "tsyringe";

container.register("IUserRepo", UserRepoImpl);

const userController = container.resolve(UserController);

export { userController };
