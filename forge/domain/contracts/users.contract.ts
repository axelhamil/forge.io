import { Email } from "@repo/core-domain";
import { z } from "zod";

import User from "../entities/user/User";
import UserId from "../entities/user/UserId";

const createUserDTOSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

const userDTOSchema = z.object({
  email: z.string().email(),
  id: z.string(),
});

const usersDTOSchema = z.array(userDTOSchema);

type CreateUserDTO = z.infer<typeof createUserDTOSchema>;
type UserDTO = z.infer<typeof userDTOSchema>;
type UsersDTO = z.infer<typeof usersDTOSchema>;

abstract class UserRepo {
  abstract find(userId: UserId): Promise<User | null>;
  abstract findAll(): Promise<User[]>;
  abstract findByEmail(email: Email): Promise<User | null>;
  abstract exists(arg: Email | UserId): Promise<boolean>;
  abstract save(user: User): Promise<User>;
}

export type { CreateUserDTO, UserDTO, UsersDTO };
export { createUserDTOSchema, userDTOSchema, UserRepo, usersDTOSchema };
