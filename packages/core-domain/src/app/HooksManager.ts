import { type ID } from "../domain/ID";
import { DomainEvents } from "../domain/DomainEvents";

/*
 * Drizzle doesn't have a hook system, so we created one
 * to handle events after a user is created, for example.
 * If your orm has a hook system, you can use it instead.
 * This is a simple implementation.
 */
export class HooksManager {
  private static events: Record<
    string,
    ((aggregateId: ID<string | number>) => Promise<void>)[]
  > = {};

  static addHook(hook: string): void {
    if (!this.events[hook]) {
      this.events[hook] = [];
    }
    this.events[hook].push(async (id: ID<string | number>) =>
      DomainEvents.dispatch(id),
    );
  }

  static async processHooks(
    hook: string,
    aggregateId: ID<string | number>,
  ): Promise<void> {
    if (this.events[hook]) {
      for (const handler of this.events[hook]) {
        await handler(aggregateId);
      }
    }
  }
}
