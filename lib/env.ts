import { z } from 'zod';
const envSchema = z.object({
  NEXT_PUBLIC_API_URL: z.string().url(),
  AUTH_URL: z.string().url(),
  AUTH_SECRET: z.string(),
});
const env = () => {
  const { error, data } = envSchema.safeParse(process.env);
  if (error) throw new Error('Invalid environment variable');
  return data;
};

export default env;
