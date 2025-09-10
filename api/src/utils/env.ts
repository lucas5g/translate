import z from "zod";

export const env = z.object({
  DATABASE_URL: z.string(),
  DEEPL_API_KEY: z.string()
}).parse(process.env);