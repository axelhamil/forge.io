import "dotenv/config";
import { z } from "zod";

const envSchema = z.object({
  DATABASE_POOL_MAX: z.preprocess(
    (value) => (typeof value === "string" ? parseInt(value) : value),
    z.number().default(50),
  ),
  DATABASE_URL: z.string(),
});

type Env = z.infer<typeof envSchema>;
const env = envSchema.parse(process.env);

export default env;
export type { Env };
