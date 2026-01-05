'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { HexColorPicker } from 'react-colorful';
import { RefreshCw } from 'lucide-react';
import { Button } from '@/shared/components/ui/button';

interface ColorPickerSectionProps {
	baseColor: string;
	inputValue: string;
	isRandomizing: boolean;
	onColorChange: (color: string) => void;
	onInputChange: (value: string) => void;
	onInputBlur: () => void;
	onInputKeyDown: (e: React.KeyboardEvent) => void;
	onRandomize: () => void;
}

export function ColorPickerSection({
	baseColor,
	inputValue,
	isRandomizing,
	onColorChange,
	onInputChange,
	onInputBlur,
	onInputKeyDown,
	onRandomize,
}: ColorPickerSectionProps) {
	const t = useTranslations();

	return (
		<motion.div
			className='space-y-4 border p-4 rounded-lg'
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.3, delay: 0.1 }}>
			<div className='flex items-center justify-between'>
				<h3 className='font-medium'>{t('colorPicker.baseColor')}</h3>
				<div className='flex items-center gap-2'>
					<motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
						<Button
							variant='outline'
							size='sm'
							onClick={onRandomize}
							className='text-xs'
							disabled={isRandomizing}>
							<RefreshCw className={`h-3 w-3 mr-1 ${isRandomizing ? 'animate-spin' : ''}`} />
							{t('common.randomize')}
						</Button>
					</motion.div>
					<motion.div
						className='w-8 h-8 rounded'
						style={{ backgroundColor: baseColor }}
						animate={{ backgroundColor: baseColor }}
						transition={{ duration: 0.3 }}
					/>
				</div>
			</div>

			<div className='relative aspect-video w-full rounded-lg overflow-hidden'>
				<HexColorPicker
					color={baseColor}
					onChange={onColorChange}
					style={{
						width: '100%',
						height: '100%',
					}}
				/>
			</div>

			<div className='flex items-center space-x-2'>
				<motion.div
					className='w-8 h-8 rounded'
					style={{ backgroundColor: baseColor }}
					animate={{ backgroundColor: baseColor }}
					transition={{ duration: 0.3 }}
				/>
				<motion.input
					type='text'
					value={inputValue}
					onChange={(e) => onInputChange(e.target.value)}
					onBlur={onInputBlur}
					onKeyDown={onInputKeyDown}
					className='flex-1 px-3 py-2 border rounded-lg text-sm font-mono transition-all duration-200 focus:ring-2 focus:ring-primary focus:border-transparent'
					placeholder={t('colorPicker.hexPlaceholder')}
					initial={{ scale: 1 }}
					whileFocus={{ scale: 1.01 }}
					transition={{ duration: 0.2 }}
				/>
			</div>
		</motion.div>
	);
}
