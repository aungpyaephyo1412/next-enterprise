import process from 'node:process';
import { z } from 'zod';

export const envSchema = z.object({
  AUTH_URL: z.string().url(),
  AUTH_SECRET: z.string().min(1),
  NEXT_PUBLIC_API_URL: z.string().url(),
  ANALYZE: z.enum(['true', 'false']).transform((value) => value === 'true'),
});

const env = () => {
  const { data, success } = envSchema.safeParse({
    AUTH_URL: process.env.AUTH_URL,
    AUTH_SECRET: process.env.AUTH_SECRET,
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
    ANALYZE: process.env.ANALYZE,
  });
  if (!success) {
    throw new Error('Invalid environment variables');
  }
  return data;
};
export default env;
