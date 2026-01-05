'use client';

import { useLocale } from 'next-intl';
import { useRouter, usePathname } from '@/i18n/navigation';
import { languages } from '@/i18n/options';
import { Button } from '@/shared/components/ui/button';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/shared/components/ui/dropdown-menu';
import { Globe } from 'lucide-react';
import { motion } from 'framer-motion';

export function LanguageSwitcher() {
	const locale = useLocale();
	const router = useRouter();
	const pathname = usePathname();

	const currentLanguage = languages.find((lang) => lang.locale === locale);

	const handleLanguageChange = (newLocale: string) => {
		router.replace(pathname, { locale: newLocale });
	};

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant='outline' size='sm' className='gap-2'>
					<Globe className='h-4 w-4' />
					<span className='hidden md:inline'>{currentLanguage?.displayName}</span>
					<span className='md:hidden'>{currentLanguage?.locale.toUpperCase()}</span>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align='end'>
				{languages.map((language) => (
					<DropdownMenuItem
						key={language.locale}
						onClick={() => handleLanguageChange(language.locale)}
						className={locale === language.locale ? 'bg-accent' : ''}>
						<motion.div
							className='flex items-center gap-2 w-full'
							whileHover={{ x: 4 }}
							transition={{ duration: 0.2 }}>
							<span>{language.displayName}</span>
							{locale === language.locale && (
								<motion.span
									initial={{ scale: 0 }}
									animate={{ scale: 1 }}
									className='ml-auto text-primary'>
									✓
								</motion.span>
							)}
						</motion.div>
					</DropdownMenuItem>
				))}
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
