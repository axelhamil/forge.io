import { type SafeParseError, z } from "zod";
import { DomainError } from "../app/DomainError";
import { ValueObject } from "../domain/ValueObject";

interface IStringValueProps {
  value: string;
}

export class StringValue extends ValueObject<IStringValueProps> {
  private constructor(props: IStringValueProps) {
    super(props);
  }

  public static create(name: string): StringValue {
    return new StringValue({ value: name });
  }

  protected ensureValidFormat(
    value: IStringValueProps,
  ): IStringValueProps["value"] {
    const zodSchema = z.object({
      value: z.string(),
    });

    const zodResult = zodSchema.safeParse(value);

    if (!zodResult.success)
      throw new DomainError(
        (zodResult as SafeParseError<IStringValueProps>).error.message,
      );

    return zodResult.data.value;
  }
}
