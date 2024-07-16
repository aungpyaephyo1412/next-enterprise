import { i18n } from '@/i18n-config';
import { match as matchLocale } from '@formatjs/intl-localematcher';
import clsx, { ClassValue } from 'clsx';
import Negotiator from 'negotiator';
import { NextRequest } from 'next/server';
import { twMerge } from 'tailwind-merge';

/**
 * Combines and merges class names using `clsx` and `tailwind-merge`.
 *
 * @param inputs - An array of class values to combine.
 * @returns A string of combined class names.
 */
export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));

/**
 * Determines the best matching locale from the request headers.
 *
 * @param request - The incoming Next.js request object.
 * @returns The best matching locale or undefined if no match is found.
 */
export const getLocale = (request: NextRequest): string | undefined => {
  // Negotiator expects a plain object, so we need to transform headers
  const negotiatorHeaders: Record<string, string> = {};
  request.headers.forEach((value, key) => (negotiatorHeaders[key] = value));

  // Use Negotiator to get the preferred languages from the request headers
  let languages = new Negotiator({ headers: negotiatorHeaders }).languages(
    i18n.locales,
  );

  // Match the preferred languages with the available locales
  return matchLocale(languages, i18n.locales, i18n.defaultLocale);
};
