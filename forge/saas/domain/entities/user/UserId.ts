import { ID } from "@repo/core-domain";

class UserId extends ID<string> {
  protected [Symbol.toStringTag] = "UserId";

  private constructor(id: ID<string>) {
    super(id ? id.value : new ID<string>().value);
  }

  public static create(id: ID<string>): UserId {
    return new UserId(id);
  }
}

export default UserId;
