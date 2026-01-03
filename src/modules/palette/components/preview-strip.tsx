'use client';

import { motion } from 'framer-motion';
import type { ColorShade } from '@/shared/hooks/use-palette-generator';

interface PreviewStripProps {
	colorShades: ColorShade[];
}

export function PreviewStrip({ colorShades }: PreviewStripProps) {
	return (
		<motion.div
			className='h-24 rounded-lg overflow-hidden flex'
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.3, delay: 0.3 }}
			whileHover={{ boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
			{colorShades.map(({ shade, hex }, index) => (
				<motion.div
					key={shade}
					className='flex-1'
					style={{ backgroundColor: hex }}
					title={`${shade}: ${hex}`}
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ duration: 0.3, delay: 0.05 * index }}
				/>
			))}
		</motion.div>
	);
}
