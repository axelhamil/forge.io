import { randomUUID } from "crypto";

export class ID<T extends string | number> {
  protected readonly _value: T;
  constructor(value?: T) {
    this._value = value ?? (randomUUID() as T);
  }
  public get value(): T {
    return this._value;
  }

  public create(id: ID<string | number>): ID<string | number> {
    return new ID<string | number>(id.value);
  }

  equals(id?: ID<T>): boolean {
    if (id === null || id === undefined) {
      return false;
    }
    if (!(id instanceof this.constructor)) {
      return false;
    }
    return id.value === this.value;
  }
}
