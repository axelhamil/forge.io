import { type SafeParseError, z } from "zod";
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
    min?: number,
    max?: number,
  ): IStringValueProps["value"] {
    const zodSchema = z.object({
      value: z
        .string()
        .min(min ?? 0)
        .max(max ?? Infinity),
    });

    const zodResult = zodSchema.safeParse(value);

    if (!zodResult.success)
      throw new Error(
        (zodResult as SafeParseError<IStringValueProps>).error.message,
      );

    return zodResult.data.value;
  }
}
