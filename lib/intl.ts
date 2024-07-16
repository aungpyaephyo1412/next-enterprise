import 'server-only'; // Ensures that this module is only used on the server

import { i18n } from '@/i18n-config';
import { createIntl } from '@formatjs/intl';

// Type definition for supported locales
export type Locale = (typeof i18n)['locales'][number];

/**
 * Asynchronously loads the internationalization (i18n) messages for the given locale
 * and creates an `Intl` instance.
 *
 * @param locale - The locale to load messages for.
 * @returns A Promise that resolves to an `Intl` instance with the loaded messages.
 */
export async function getIntl(locale: Locale) {
  return createIntl({
    locale: locale,
    messages: (await import(`../lang/${locale}.json`)).default,
  });
}
