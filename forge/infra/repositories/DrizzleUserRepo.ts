import { type Email, HooksManager } from "@repo/core-domain";
import { eq } from "drizzle-orm";
import db from "../../database";
import { users, type UserSelect } from "../../database/schemas";
import { UserRepo } from "../../domain/contracts/users.contract";
import type User from "../../domain/entities/user/User";
import type UserId from "../../domain/entities/user/UserId";
import UserMap from "../../domain/mappers/user.map";

export default class DrizzleUserRepo extends UserRepo {
  public async findAll(): Promise<User[]> {
    const rawUsers = await db
      .select({
        email: users.email,
        id: users.id,
        password: users.password,
      })
      .from(users);

    return rawUsers.map((rawUser) => UserMap.toDomain(rawUser as UserSelect));
  }
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
        if (arg.constructor.name === "Email") {
          return eq(users.email, arg.value);
        }
        return eq(users.id, arg.value);
      },
    });

    return Boolean(user);
  }

  public async save(user: User): Promise<User> {
    const userInsert = await UserMap.toPersistence(user);
    const exists = await this.exists(user.get("email"));

    if (!exists) {
      try {
        await db.insert(users).values(userInsert);
        await HooksManager.processHooks("afterUserCreated", user.get("id"));
      } catch (error) {
        await db.delete(users).where(eq(users.id, user.get("id").value));

        throw new Error(error.toString());
      }
    } else {
      await db
        .update(users)
        .set(userInsert)
        .where(eq(users.id, user.get("id").value));
    }
    return user;
  }
}
