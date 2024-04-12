import { type SafeParseError, z } from "zod";
import { ValueObject } from "../domain/ValueObject";

interface ILinkProps {
  value: string;
}

export class Link extends ValueObject<ILinkProps> {
  private constructor(props: ILinkProps) {
    super(props);
  }

  public static create(name: string): Link {
    return new Link({ value: name });
  }

  protected ensureValidFormat(value: ILinkProps): ILinkProps["value"] {
    const zodSchema = z.object({
      value: z.string().url({
        message: "Invalid URL format",
      }),
    });

    const zodResult = zodSchema.safeParse(value);

    if (!zodResult.success)
      throw new Error((zodResult as SafeParseError<ILinkProps>).error.message);

    return zodResult.data.value;
  }
}
