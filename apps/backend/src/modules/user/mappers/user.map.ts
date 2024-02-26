import { UserInsert, UserSelect } from "@db/schemas";
import User from "@modules/user/domain/User";
import { Email, ID, Mapper, Password } from "@repo/core-domain";

class UserMap implements Mapper<User, UserSelect, Promise<UserInsert>> {
  public toDomain(raw: UserSelect): User {
    return User.create(
      {
        email: Email.create(raw.email),
        password: Password.create(raw.password, true),
      },
      new ID<string>(raw.id),
    );
  }

  public async toDTO(user: User): Promise<UserInsert> {
    return {
      email: user.get("email").value,
      id: user.get("id").value,
      password: await user.get("password").hash(),
    };
  }
}

export default new UserMap();
