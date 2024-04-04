import { type SafeParseError, z } from "zod";
import { DomainError } from "../app/DomainError";
import { ValueObject } from "../domain/ValueObject";

interface INumberValueProps {
  value: number;
}

export class NumberValue extends ValueObject<INumberValueProps> {
  private constructor(props: INumberValueProps) {
    super(props);
  }

  public static create(name: number): NumberValue {
    return new NumberValue({ value: name });
  }

  protected ensureValidFormat(
    value: INumberValueProps,
  ): INumberValueProps["value"] {
    const zodSchema = z.object({
      value: z.number().refine((number) => !isNaN(number), {
        message: "Invalid number format",
      }),
    });

    const zodResult = zodSchema.safeParse(value);

    if (!zodResult.success)
      throw new DomainError(
        (zodResult as SafeParseError<INumberValueProps>).error.message,
      );

    return zodResult.data.value;
  }
}
