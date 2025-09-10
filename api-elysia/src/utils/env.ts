import { z } from "zod";

export const env = z.object({
  DATABASE_URL: z.string(),
  DEEPL_API_KEY: z.string(),
  PORT: z.coerce.number().default(3000)
}).parse(process.env);  