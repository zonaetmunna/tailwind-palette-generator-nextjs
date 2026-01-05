import { getRequestConfig } from 'next-intl/server';
import { hasLocale } from 'next-intl';
import deepmerge from 'deepmerge';
import { routing } from './routing';

export default getRequestConfig(async ({ requestLocale }) => {
	const requested = await requestLocale;
	const locale = hasLocale(routing.locales, requested) ? requested : routing.defaultLocale;

	const currentMessages = (await import(`../../dictionary/${locale}.json`)).default;

	const fallbackLocale = locale === 'en' ? 'bn' : 'en';
	const fallbackMessages = (await import(`../../dictionary/${fallbackLocale}.json`)).default;

	// Merge fallback first, then current (so current overrides fallback)
	const messages = deepmerge(fallbackMessages, currentMessages) as Record<string, any>;

	return {
		locale,
		messages,
	};
});
