import { env } from '@/lib/utils';
import z, { ZodSchema } from 'zod';

interface FetchResult<T> {
  error: any | null;
  data: T | null;
}

const fetchJson = async (
  url: URL | RequestInfo,
  init?: RequestInit,
): Promise<any> => {
  const response = await fetch(url, init);
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data);
  }
  return data;
};

const validateSchema = <T extends ZodSchema>(
  schema: T,
  data: any,
): { data: z.TypeOf<T> | null; error: string | null } => {
  const validationResult = schema.safeParse(data);
  if (!validationResult.success) {
    return {
      error: validationResult.error.message,
      data: null,
    };
  }
  return {
    data: validationResult.data,
    error: null,
  };
};

const safeFetch = async <T extends ZodSchema>(
  schema: T,
  url: URL | RequestInfo,
  init?: RequestInit,
): Promise<FetchResult<z.TypeOf<T>>> => {
  try {
    const fullUrl = `${env.AUTH_URL}${url}`;
    const jsonData = await fetchJson(fullUrl, init);
    const { data, error } = validateSchema(schema, jsonData);

    if (error) {
      return { error, data: null };
    }

    return { data, error: null };
  } catch (error) {
    return { error, data: null };
  }
};

export default safeFetch;
