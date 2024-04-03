import { AggregateRoot, Email, ID, Password } from "@repo/core-domain";

import UserCreated from "./UserCreated.event";
import UserId from "./UserId";

interface IUserProps {
  id?: UserId;
  email: Email;
  password: Password;
}

class User extends AggregateRoot<IUserProps> {
  private constructor(props: IUserProps, id?: ID<string>) {
    super(props, id);
  }

  public static create(props: IUserProps, id?: ID<string>): User {
    const user = new User(props, UserId.create(id));
    user.addEvent(new UserCreated(user));
    return user;
  }
}

export default User;
