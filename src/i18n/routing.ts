import { defineRouting } from 'next-intl/routing';
import { defaultLocale, locales } from './options';

export const routing = defineRouting({
	locales: locales,
	defaultLocale: defaultLocale,
	localePrefix: 'as-needed',
	localeDetection: false,
});
