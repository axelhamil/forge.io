interface IValueObjectProps {
  value: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [index: string]: any;
}

export abstract class ValueObject<T extends IValueObjectProps> {
  protected readonly _value: T["value"];
  protected readonly props: T;

  protected constructor(props: T) {
    this._value = Object.freeze(this.ensureValidFormat(props));
  }

  get value(): T["value"] {
    return this._value;
  }

  protected abstract ensureValidFormat(value: T): T[keyof T];
}
