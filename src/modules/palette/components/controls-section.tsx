'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Slider } from '@/shared/components/ui/slider';

interface ControlsSectionProps {
	vibrancy: number;
	hueShift: number;
	onVibrancyChange: (value: number) => void;
	onHueShiftChange: (value: number) => void;
}

export function ControlsSection({
	vibrancy,
	hueShift,
	onVibrancyChange,
	onHueShiftChange,
}: ControlsSectionProps) {
	const t = useTranslations();

	return (
		<motion.div
			className='space-y-4'
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.3, delay: 0.2 }}>
			<motion.div
				className='space-y-2'
				whileHover={{ scale: 1.01 }}
				transition={{ type: 'spring', stiffness: 400, damping: 25 }}>
				<div className='flex justify-between'>
					<label className='text-sm font-medium'>{t('controls.vibrancy')}</label>
					<motion.span
						className='text-sm text-gray-500'
						animate={{
							x: vibrancy === 50 ? [0, 5, -5, 5, -5, 0] : 0,
							transition: { duration: vibrancy === 50 ? 0.5 : 0 },
						}}>
						{vibrancy}%
					</motion.span>
				</div>
				<Slider
					value={[vibrancy]}
					min={0}
					max={100}
					step={1}
					onValueChange={(value) => onVibrancyChange(value[0])}
					className='transition-all duration-150 ease-out'
				/>
			</motion.div>

			<motion.div
				className='space-y-2'
				whileHover={{ scale: 1.01 }}
				transition={{ type: 'spring', stiffness: 400, damping: 25 }}>
				<div className='flex justify-between'>
					<label className='text-sm font-medium'>{t('controls.hueShift')}</label>
					<motion.span
						className='text-sm text-gray-500'
						animate={{
							x: hueShift === 0 ? [0, 5, -5, 5, -5, 0] : 0,
							transition: { duration: hueShift === 0 ? 0.5 : 0 },
						}}>
						{hueShift}°
					</motion.span>
				</div>
				<Slider
					value={[hueShift]}
					min={-180}
					max={180}
					step={1}
					onValueChange={(value) => onHueShiftChange(value[0])}
					className='transition-all duration-150 ease-out'
				/>
			</motion.div>
		</motion.div>
	);
}
