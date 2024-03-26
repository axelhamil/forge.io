import { ID, IDomainEvent } from "@repo/core-domain";

import User from "../User";

class UserCreated implements IDomainEvent {
  protected [Symbol.toStringTag]: string = "UserCreatedEvent";
  public readonly dateTimeOccurred: Date = new Date();

  public constructor(public readonly user: User) {}

  public getAggregateId(): ID<string | number> {
    return this.user.id;
  }
}

export default UserCreated;
