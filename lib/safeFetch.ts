import { env } from '@/lib/env';
import z, { ZodSchema } from 'zod';

// Interface for the result of a fetch operation
interface FetchResult<T> {
  error: any | null;
  data: T | null;
}

/**
 * Fetches JSON data from the given URL and returns the parsed JSON data.
 * Throws an error if the response is not OK.
 *
 * @param url - The URL or RequestInfo to fetch data from.
 * @param init - Optional RequestInit object to configure the fetch request.
 * @returns The parsed JSON data from the response.
 * @throws An error if the response is not OK.
 */
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

/**
 * Validates the given data against the provided Zod schema.
 *
 * @param schema - The Zod schema to validate the data against.
 * @param data - The data to validate.
 * @returns An object containing either the validated data or an error message.
 */
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

/**
 * Fetches JSON data from the given URL, validates it against the provided Zod schema,
 * and returns the result.
 *
 * @param schema - The Zod schema to validate the data against.
 * @param url - The URL or RequestInfo to fetch data from.
 * @param init - Optional RequestInit object to configure the fetch request.
 * @returns A FetchResult object containing either the validated data or an error message.
 */
const safeFetch = async <T extends ZodSchema>(
  schema: T,
  url: URL | RequestInfo,
  init?: RequestInit,
): Promise<FetchResult<z.TypeOf<T>>> => {
  try {
    const fullUrl = `${env.NEXT_PUBLIC_API_URL}${url}`;
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
