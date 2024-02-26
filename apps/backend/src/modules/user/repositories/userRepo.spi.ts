import User from "@modules/user/domain/User";
import UserId from "@modules/user/domain/UserId";
import { Email } from "@repo/core-domain";

interface IUserRepo {
  find(userId: UserId): Promise<User | null>;
  findByEmail(email: Email): Promise<User | null>;
  exists(arg: Email | UserId): Promise<boolean>;
  save(user: User): Promise<User>;
}

export default IUserRepo;
