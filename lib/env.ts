import { z, ZodSchema } from 'zod';

// Define a schema for the expected environment variables
const envSchema = z.object({
  NEXT_PUBLIC_API_URL: z.string().url(),
  AUTH_URL: z.string().url(),
  AUTH_SECRET: z.string(),
});

/**
 * Creates an environment configuration object by validating the process environment
 * variables against the provided Zod schema.
 *
 * @param schema - The Zod schema to validate the environment variables against.
 * @returns An object containing the validated environment variables.
 * @throws An error if any environment variable is invalid.
 */
export const createEnv = <T extends ZodSchema>(schema: T): z.TypeOf<T> => {
  const parsedEnv = schema.safeParse(process.env);
  if (!parsedEnv.success) {
    const errorDetails = parsedEnv.error.errors
      .map((e) => `${e.path.join('.')}: ${e.message}`)
      .join(', ');
    throw new Error(`Invalid environment variable(s): ${errorDetails}`);
  }
  return parsedEnv.data;
};

// Validate and export the environment configuration object
export const env = createEnv(envSchema);
