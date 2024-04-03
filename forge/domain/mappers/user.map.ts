import { Email, ID, Mapper, Password } from "@repo/core-domain";

import { UserInsert, UserSelect } from "../../database/schemas";
import { UserDTO } from "../contracts/users.contract";
import User from "../entities/user/User";

class UserMap
  implements Mapper<User, UserDTO, UserSelect, Promise<UserInsert>>
{
  public toDTO(user: User): UserDTO {
    return {
      email: user.get("email").value,
      id: user.get("id").value,
    };
  }

  public toDomain(raw: UserSelect): User {
    return User.create(
      {
        email: Email.create(raw.email),
        password: Password.create(raw.password, true),
      },
      new ID<string>(raw.id),
    );
  }

  public async toPersistence(user: User): Promise<UserInsert> {
    return {
      email: user.get("email").value,
      id: user.get("id").value,
      password: await user.get("password").hash(),
      updatedAt: new Date(),
    };
  }
}

export default new UserMap();
