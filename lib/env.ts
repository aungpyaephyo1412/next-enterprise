import { z } from 'zod';
const envSchema = z.object({
  NEXT_PUBLIC_API_URL: z.string().url(),
  AUTH_URL: z.string().url(),
  AUTH_SECRET: z.string(),
});
export const getEnvVariables = (): z.infer<typeof envSchema> => {
  const parsedEnv = envSchema.safeParse(process.env);

  if (!parsedEnv.success) {
    const errorDetails = parsedEnv.error.errors
      .map((e) => `${e.path.join('.')}: ${e.message}`)
      .join(', ');
    throw new Error(`Invalid environment variable(s): ${errorDetails}`);
  }

  return parsedEnv.data;
};
