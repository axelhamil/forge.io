import { hash, compare } from "bcrypt";
import { type SafeParseError, z } from "zod";
import { ValueObject } from "../domain/ValueObject";

interface IPasswordProps {
  value: string;
  hashed?: boolean;
}

export class Password extends ValueObject<IPasswordProps> {
  private constructor(props: IPasswordProps) {
    super(props);
  }

  public async compare(plainText: string): Promise<boolean> {
    let hashed: string;
    if (!this.props?.hashed) {
      hashed = this.value;
      return this.bcryptCompare(plainText, hashed);
    }
    return this.props?.value === plainText;
  }

  public async hash(): Promise<string> {
    return new Promise((resolve) => {
      if (this.props?.hashed) {
        resolve(this.value);
        return;
      }
      resolve(this.hashPassword(this.value));
    });
  }

  private hashPassword(password: string): Promise<string> {
    return new Promise((resolve, reject) => {
      hash(password, 10, (err, hashed) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(hashed);
      });
    });
  }

  private bcryptCompare(
    passwd: string,
    hashedPasswd: string,
  ): Promise<boolean> {
    return new Promise((resolve) => {
      compare(passwd, hashedPasswd, (err, result) => {
        if (err) {
          resolve(false);
          return;
        }
        resolve(result);
      });
    });
  }

  public static create(password: string, hashed = false): Password {
    return new Password({ hashed, value: password });
  }

  protected ensureValidFormat(value: IPasswordProps): IPasswordProps["value"] {
    const zodSchema = z.object({
      value: z.string().min(6).max(255),
    });

    const zodResult = zodSchema.safeParse(value);

    if (!zodResult.success)
      throw new Error(
        (zodResult as SafeParseError<IPasswordProps["value"]>).error.message,
      );

    return zodResult.data.value;
  }
}
