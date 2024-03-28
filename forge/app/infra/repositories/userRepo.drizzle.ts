import { IUserRepo } from "@app/domain/contracts/users.contract";
import User from "@app/domain/entities/user/User";
import UserId from "@app/domain/entities/user/UserId";
import UserMap from "@app/domain/mappers/user.map";
import { db } from "@config/orm";
import { Email } from "@repo/core-domain";
import HooksManager from "@utils/hooksManager";
import { eq } from "drizzle-orm";
import { pgTable, text, timestamp, uuid, varchar } from "drizzle-orm/pg-core";
import { registry, singleton } from "tsyringe";

export const users = pgTable("users", {
  createdAt: timestamp("created_at").defaultNow(),
  email: text("email").unique(),
  id: uuid("id").defaultRandom(),
  password: varchar("password"),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export type UserSelect = typeof users.$inferSelect;
export type UserInsert = typeof users.$inferInsert;

@singleton()
@registry([{ token: "IUserRepo", useClass: UserRepoDrizzle }])
class UserRepoDrizzle implements IUserRepo {
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
        } else return eq(users.id, arg.value);
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

export default UserRepoDrizzle;
