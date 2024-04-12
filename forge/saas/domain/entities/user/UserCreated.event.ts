import { type ID, type IDomainEvent } from "@repo/core-domain";
import type User from "./User";

class UserCreated implements IDomainEvent {
  protected [Symbol.toStringTag] = "UserCreatedEvent";
  public readonly dateTimeOccurred: Date = new Date();

  public constructor(public readonly user: User) {}

  public getAggregateId(): ID<string | number> {
    return this.user.id;
  }
}

export default UserCreated;
