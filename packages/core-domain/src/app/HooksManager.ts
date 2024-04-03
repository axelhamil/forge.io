import { ID } from "../domain/ID";

/*
 * Drizzle don't have a hook system, so we created one
 * to handle events after a user is created, for example.
 * If your orm has a hook system, you can use it instead.
 * This is a simple implementation.
 */
export class HooksManager {
  private static events: {
    [hook: string]: ((aggregateId: ID<string | number>) => Promise<void>)[];
  } = {};

  static addHook(
    hook: string,
    hookFunction: (aggregateId: ID<string | number>) => Promise<void>,
  ): void {
    if (!this.events[hook]) {
      this.events[hook] = [];
    }
    this.events[hook].push(hookFunction);
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
