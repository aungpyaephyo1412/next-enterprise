import env from '@/lib/env';
import z, { ZodSchema } from 'zod';

const safeFetch = async <T extends ZodSchema<any>>(
  schema: T,
  url: URL | RequestInfo,
  init?: RequestInit,
): Promise<{ error: any | null; data: z.TypeOf<T> }> => {
  const { NEXT_PUBLIC_API_URL } = env();
  const response = await fetch(`${NEXT_PUBLIC_API_URL}${url}`, init);
  const res = await response.json();
  if (!response.ok) return { error: res, data: null };
  const validateFields = schema.safeParse(res);
  if (!validateFields.success) {
    return {
      error: validateFields.error.message,
      data: null,
    };
  }
  return {
    data: validateFields.data,
    error: null,
  };
};
export default safeFetch;
