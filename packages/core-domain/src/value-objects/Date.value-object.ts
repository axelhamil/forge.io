import { type SafeParseError, z } from "zod";
import { DomainError } from "../app/DomainError";
import { ValueObject } from "../domain/ValueObject";

interface IDateValueProps {
  value: Date;
}

export class DateValue extends ValueObject<IDateValueProps> {
  private constructor(props: IDateValueProps) {
    super(props);
  }

  public static create(name: Date): DateValue {
    return new DateValue({ value: name });
  }

  protected ensureValidFormat(
    value: IDateValueProps,
  ): IDateValueProps["value"] {
    const zodSchema = z.object({
      value: z.date().refine((date) => !isNaN(date.getTime()), {
        message: "Invalid date format",
      }),
    });

    const zodResult = zodSchema.safeParse(value);

    if (!zodResult.success)
      throw new DomainError(
        (zodResult as SafeParseError<IDateValueProps>).error.message,
      );

    return zodResult.data.value;
  }
}
