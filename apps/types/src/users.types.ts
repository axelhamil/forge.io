import { z } from "zod";

const createUserSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6).max(255),
});

export type CreateUserDTO = z.infer<typeof createUserSchema>;
export { createUserSchema };
