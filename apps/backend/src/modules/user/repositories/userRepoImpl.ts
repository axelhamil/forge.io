import { db } from "@config/orm";
import { users, UserSelect } from "@db/schemas";
import User from "@modules/user/domain/User";
import UserId from "@modules/user/domain/UserId";
import UserMap from "@modules/user/mappers/user.map";
import IUserRepo from "@modules/user/repositories/userRepo.spi";
import { Email } from "@repo/core-domain";
import HooksManager from "@utils/hooksManager";
import { eq } from "drizzle-orm";

class UserRepoImpl implements IUserRepo {
  public async find(userId: UserId): Promise<User | null> {
    const user: UserSelect = await db.query.users.findFirst({
      where: (users, { eq }) => eq(users.id, userId.value),
    });

    if (!user) return null;

    return UserMap.toDomain(user);
  }

  public async findByEmail(email: Email): Promise<User | null> {
    const user: UserSelect = await db.query.users.findFirst({
      where: eq(users.email, email.value),
    });

    if (!user) return null;

    return UserMap.toDomain(user);
  }

  public async exists(arg: UserId | Email): Promise<boolean> {
    const user: UserSelect = await db.query.users.findFirst({
      where: (users, { eq }) => {
        if (arg instanceof Email) {
          return eq(users.email, arg.value);
        } else return eq(users.id, arg.value);
      },
    });

    return Boolean(user);
  }

  public async save(user: User): Promise<User> {
    const userInsert = await UserMap.toDTO(user);
    const exists = await this.exists(user.get("email"));

    try {
      if (!exists) {
        await db.insert(users).values(userInsert);
        await HooksManager.processHooks("afterUserCreated", user.get("id"));
      } else {
        await db
          .update(users)
          .set(userInsert)
          .where(eq(users.id, user.get("id").value));
      }
    } catch (error) {
      await db.delete(users).where(eq(users.id, user.get("id").value));

      throw new Error(error.toString());
    }
    return user;
  }
}

export default UserRepoImpl;
