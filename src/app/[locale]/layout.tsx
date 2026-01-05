import type React from 'react';
import type { Metadata } from 'next';
import { Inconsolata } from 'next/font/google';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import './globals.css';
import { Toaster } from '@/shared/components/ui/sonner';
import { ThemeProvider } from '@/shared/providers/theme-provider';
import { routing } from '@/i18n/routing';

const inconsolata = Inconsolata({
	subsets: ['latin'],
	variable: '--font-inconsolata',
});

export const metadata: Metadata = {
	title: 'Tailwind Palette Generator | Create Beautiful Color Palettes',
	description:
		'Generate beautiful, accessible color palettes for Tailwind CSS. Export as JSON, CSS, SCSS, or Tailwind config. Perfect for developers building modern web applications.',
	keywords: [
		'tailwind',
		'color palette',
		'design system',
		'css',
		'tailwind css',
		'color generator',
		'accessibility',
	],
	authors: [{ name: 'Tailwind Palette Generator' }],
	generator: 'Next.js',
	openGraph: {
		title: 'Tailwind Palette Generator',
		description: 'Generate beautiful, accessible color palettes for Tailwind CSS',
		type: 'website',
	},
};

export function generateStaticParams() {
	return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
	children,
	params,
}: Readonly<{
	children: React.ReactNode;
	params: Promise<{ locale: string }>;
}>) {
	const { locale } = await params;

	// Ensure that the incoming locale is valid
	if (!routing.locales.includes(locale as any)) {
		notFound();
	}

	// Providing all messages to the client side
	const messages = await getMessages();

	return (
		<html lang={locale} suppressHydrationWarning>
			<body className={inconsolata.className}>
				<NextIntlClientProvider messages={messages}>
					<ThemeProvider attribute='class' defaultTheme='system' enableSystem disableTransitionOnChange>
						{children}
						<Toaster />
					</ThemeProvider>
				</NextIntlClientProvider>
			</body>
		</html>
	);
}
