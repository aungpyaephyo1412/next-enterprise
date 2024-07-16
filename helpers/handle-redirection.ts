import { i18n } from '@/i18n-config';
import { getLocale } from '@/lib/utils';
import { Session } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';

// Type definition for the return type of handleRedirection
type RedirectResponse = NextResponse | boolean;

/**
 * Checks if the pathname is missing the locale.
 *
 * @param pathname - The URL pathname to check.
 * @returns `true` if the pathname is missing a locale, `false` otherwise.
 */
const isPathnameMissingLocale = (pathname: string): boolean => {
  return i18n.locales.every(
    (locale) =>
      !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`,
  );
};

/**
 * Handles redirection to the appropriate locale if the locale is missing from the pathname.
 *
 * @param locale - The locale to use for redirection.
 * @param pathname - The original pathname.
 * @param requestUrl - The original request URL.
 * @returns A `NextResponse` object that redirects to the appropriate locale URL.
 */
const handleMissingLocale = (
  locale: string | undefined,
  pathname: string,
  requestUrl: string,
): NextResponse => {
  const sanitizedPathname = pathname.startsWith('/')
    ? pathname.substring(1)
    : pathname;
  return NextResponse.redirect(
    new URL(`/${locale}/${sanitizedPathname || 'home'}`, requestUrl),
  );
};

/**
 * Checks if the path is profile related.
 *
 * @param pathname - The URL pathname to check.
 * @param locale - The locale to use for checking.
 * @returns `true` if the pathname is profile related, `false` otherwise.
 */
const isProfilePath = (pathname: string, locale?: string): boolean =>
  pathname.startsWith(`/${locale}/profile`);

/**
 * Checks if the path is an authentication route.
 *
 * @param pathname - The URL pathname to check.
 * @param locale - The locale to use for checking.
 * @returns `true` if the pathname is an authentication route, `false` otherwise.
 */
const isAuthPath = (pathname: string, locale?: string): boolean =>
  pathname.startsWith(`/${locale}/login`) ||
  pathname.startsWith(`/${locale}/register`);

/**
 * Checks if the path is a verification route.
 *
 * @param pathname - The URL pathname to check.
 * @param locale - The locale to use for checking.
 * @returns `true` if the pathname is a verification route, `false` otherwise.
 */
const isVerifyPath = (pathname: string, locale?: string): boolean =>
  pathname.startsWith(`/${locale}/verify`);

/**
 * Handles redirection logic based on the user's session and the request.
 *
 * @param auth - The user session object.
 * @param request - The incoming request object.
 * @returns `NextResponse` object for redirection or `true` to allow the request to proceed.
 */
const handleRedirection = (
  auth: Session | null,
  request: NextRequest,
): RedirectResponse => {
  const { nextUrl } = request;
  const isLoggedIn = !!auth?.user;
  const locale = getLocale(request);

  if (nextUrl.pathname.startsWith('/images')) {
    return true;
  }

  if (isPathnameMissingLocale(nextUrl.pathname)) {
    return handleMissingLocale(locale, nextUrl.pathname, request.url);
  }

  if (isProfilePath(nextUrl.pathname, locale)) {
    return isLoggedIn
      ? true
      : NextResponse.redirect(new URL(`/${locale}/login`, nextUrl));
  }

  if (isAuthPath(nextUrl.pathname, locale)) {
    return isLoggedIn
      ? NextResponse.redirect(new URL(`/${locale}`, nextUrl))
      : true;
  }

  if (isVerifyPath(nextUrl.pathname, locale)) {
    return isLoggedIn
      ? true
      : NextResponse.redirect(new URL(`/${locale}/login`, nextUrl));
  }

  return true;
};

export default handleRedirection;
