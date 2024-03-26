import { DomainError } from "../app/DomainError";
import { ID } from "./ID";
import { ValueObject } from "./ValueObject";
import { WatchedList } from "./WatchedList";

function isEntity(v: any): boolean {
  // eslint-disable-next-line @typescript-eslint/no-use-before-define
  return v instanceof Entity;
}

export abstract class Entity<T extends object> {
  protected readonly _props: T;
  protected readonly _id: ID<string | number>;

  protected constructor(props: T, id?: ID<string | number>) {
    this._id = id || new ID();
    this._props = props;
  }

  public equals(object?: Entity<T>): boolean {
    if (!object || this === object || !isEntity(object)) {
      return false;
    }

    return this._id.equals(object._id);
  }

  get<Key extends keyof T>(key: Key): T[Key] | null {
    const prop = this._props[key];
    if (key === "id" && !prop) return this._id as T[Key];

    if (prop === null) return null;

    if (!prop)
      throw new DomainError(
        `The property ${String(key)} doesn't exist in ${this.constructor.name}`,
      );

    return prop;
  }
  set<Key extends keyof T>(key: Key, value: T[Key]): void {
    if (key === "id")
      throw new DomainError("Cannot change the ID of an entity.");

    if (!(key in this._props))
      throw new DomainError(
        `The property ${String(key)} doesn't exist in ${this.constructor.name}`,
      );

    this._props[key] = value;
  }

  public toObject(): Record<keyof T & "id", any> {
    const plainObject = {} as Record<keyof T, any>;
    for (const key in this._props) {
      const prop = this._props[key];
      if (prop instanceof ValueObject || prop instanceof ID) {
        plainObject[key] = prop.value;
      } else if (prop instanceof Entity) {
        plainObject[key] = prop.toObject();
      } else if (prop instanceof WatchedList) {
        plainObject[key] = prop.mapToObject();
      } else {
        plainObject[key] = prop;
      }
    }

    return {
      ...plainObject,
      id: this._id.value,
    };
  }

  public clone(props?: T): Entity<T> {
    const clonedProps = { ...this._props, ...props };
    return new (this.constructor as new (
      props: T,
      id?: ID<string | number>,
    ) => Entity<T>)(clonedProps, this._id);
  }
}
