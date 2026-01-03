'use client';

import { motion } from 'framer-motion';
import { Copy } from 'lucide-react';
import { Button } from '@/shared/components/ui/button';
import type { ColorShade } from '@/shared/hooks/use-palette-generator';

interface UsageExamplesSectionProps {
	colorShades: ColorShade[];
	onCopyTailwindClasses: () => void;
	onCopyCSSVariables: () => void;
}

export function UsageExamplesSection({
	colorShades,
	onCopyTailwindClasses,
	onCopyCSSVariables,
}: UsageExamplesSectionProps) {
	return (
		<motion.div
			className='border rounded-lg p-4 bg-muted/30'
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.3, delay: 0.5 }}>
			<h3 className='font-medium mb-3'>Usage Examples</h3>
			<div className='space-y-3'>
				<div>
					<div className='flex items-center justify-between mb-1'>
						<p className='text-xs text-muted-foreground font-medium'>Tailwind Classes</p>
						<Button
							variant='ghost'
							size='sm'
							className='h-6 text-xs'
							onClick={onCopyTailwindClasses}>
							<Copy className='h-3 w-3 mr-1' />
							Copy
						</Button>
					</div>
					<pre className='text-xs bg-background border rounded p-2 overflow-x-auto'>
						<code>bg-primary-500 text-primary-50</code>
					</pre>
				</div>
				<div>
					<div className='flex items-center justify-between mb-1'>
						<p className='text-xs text-muted-foreground font-medium'>CSS Variables</p>
						<Button variant='ghost' size='sm' className='h-6 text-xs' onClick={onCopyCSSVariables}>
							<Copy className='h-3 w-3 mr-1' />
							Copy
						</Button>
					</div>
					<pre className='text-xs bg-background border rounded p-2 overflow-x-auto'>
						<code>var(--color-primary-500)</code>
					</pre>
				</div>
			</div>
		</motion.div>
	);
}
