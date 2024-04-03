import bcrypt from "bcrypt";
import { SafeParseError, z } from "zod";

import { DomainError } from "../app/DomainError";
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
    } else {
      return this.props?.value === plainText;
    }
  }

  public async hash(): Promise<string> {
    return new Promise((resolve) => {
      if (this.props?.hashed) {
        return resolve(this.value);
      } else {
        resolve(this.hashPassword(this.value));
      }
    });
  }

  private hashPassword(password: string): Promise<string> {
    return new Promise((resolve, reject) => {
      bcrypt.hash(password, 10, (err, hash) => {
        if (err) return reject(err);
        return resolve(hash);
      });
    });
  }

  private bcryptCompare(
    passwd: string,
    hashedPasswd: string,
  ): Promise<boolean> {
    return new Promise((resolve) => {
      bcrypt.compare(passwd, hashedPasswd, (err, result) => {
        if (err) return resolve(false);
        return resolve(result);
      });
    });
  }

  public static create(password: string, hashed: boolean = false): Password {
    return new Password({ hashed, value: password });
  }

  protected ensureValidFormat(value: IPasswordProps): IPasswordProps["value"] {
    const zodSchema = z.object({
      value: z.string().min(6).max(255),
    });

    const zodResult = zodSchema.safeParse(value);

    if (!zodResult.success)
      throw new DomainError(
        (zodResult as SafeParseError<IPasswordProps["value"]>).error.message,
      );

    return zodResult.data.value;
  }
}
