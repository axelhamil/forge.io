import { type SafeParseError, z } from "zod";
import { DomainError } from "../app/DomainError";
import { ValueObject } from "../domain/ValueObject";

interface IEmailProps {
  value: string;
}

export class Email extends ValueObject<IEmailProps> {
  private constructor(props: IEmailProps) {
    super(props);
  }

  public static create(name: string): Email {
    return new Email({ value: name });
  }

  protected ensureValidFormat(value: IEmailProps): IEmailProps["value"] {
    const zodSchema = z.object({
      value: z.string().email({
        message: "Invalid email format",
      }),
    });

    const zodResult = zodSchema.safeParse(value);

    if (!zodResult.success)
      throw new DomainError(
        (zodResult as SafeParseError<IEmailProps>).error.message,
      );

    return zodResult.data.value;
  }
}
