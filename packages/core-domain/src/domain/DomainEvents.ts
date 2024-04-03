import { AggregateRoot } from "./AggregateRoot";
import { ID } from "./ID";

export interface IDomainEvent {
  dateTimeOccurred: Date;
  getAggregateId(): ID<string | number>;
}

export interface IHandle {
  setupSubscriptions(): void;
}

type EventHandler<T extends IDomainEvent> = (event: T) => Promise<void> | void;

type EventHandlers<T extends IDomainEvent = IDomainEvent> = {
  [key: string]: EventHandler<T>[];
};

export class DomainEvents {
  public static eventHandlers: EventHandlers = {};
  private static markedAggregates: AggregateRoot<any>[] = [];

  constructor() {}

  public static subscribe<T extends IDomainEvent>(
    listener: EventHandler<T>,
    eventClassName: string,
  ): void {
    if (!DomainEvents.eventHandlers[eventClassName]) {
      DomainEvents.eventHandlers[eventClassName] = [];
    }
    DomainEvents.eventHandlers[eventClassName].push(
      listener as EventHandler<IDomainEvent>,
    );
  }

  public static async dispatch(
    aggregateId: ID<string | number>,
  ): Promise<void> {
    const aggregate = this.findMarkedAggregateByID(aggregateId);

    if (aggregate) {
      const events = aggregate.domainEvents;
      for (const event of events) {
        const eventClassName = event.constructor.name;
        const handlers = this.eventHandlers[eventClassName];

        if (handlers?.length) {
          for (const handler of handlers) {
            await handler(event);
          }
        }

        aggregate.clearEvents();
        this.removeAggregateFromMarkedDispatchList(aggregate);
      }
    }
  }

  private static removeAggregateFromMarkedDispatchList(
    aggregate: AggregateRoot<any>,
  ): void {
    const index = this.markedAggregates.findIndex((a) => a.equals(aggregate));
    this.markedAggregates.splice(index, 1);
  }

  public static registerEvent(aggregate: AggregateRoot<any>): void {
    const found = !!this.findMarkedAggregateByID(aggregate.id);

    if (!found) {
      this.markedAggregates.push(aggregate);
    }
  }

  private static findMarkedAggregateByID(
    id: ID<string | number>,
  ): AggregateRoot<any> {
    let found: AggregateRoot<any> = null;
    for (const aggregate of this.markedAggregates) {
      if (aggregate.id.equals(id)) {
        found = aggregate;
      }
    }

    return found;
  }
}
