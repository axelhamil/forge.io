import { z } from "zod";

const envSchema = z.object({
  DATABASE_POOL_MAX: z.number().default(50),
  DATABASE_URL: z
    .string()
    .default("postgres://user:password@localhost:5432/forge"),
});

type Env = z.infer<typeof envSchema>;
const env = envSchema.parse(process.env);

export default env;
export type { Env };
