import type React from 'react';
import type { Metadata } from 'next';
import { Inconsolata } from 'next/font/google';
import './globals.css';
import { Toaster } from '@/shared/components/ui/sonner';
import { ThemeProvider } from '@/shared/providers/theme-provider';

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

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang='en' suppressHydrationWarning>
			<body className={inconsolata.className}>
				<ThemeProvider
					attribute='class'
					defaultTheme='system'
					enableSystem
					disableTransitionOnChange>
					{children}
					<Toaster />
				</ThemeProvider>
			</body>
		</html>
	);
}
