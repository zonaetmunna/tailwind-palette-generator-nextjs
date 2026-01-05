import { cn } from '@/shared/utils/cn';
import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';

const typographyVariants = cva('', {
	variants: {
		variant: {
			h1: 'text-3xl md:text-4xl xl:text-5xl font-extrabold tracking-tight leading-snug', // Large and prominent headers
			h2: 'text-2xl md:text-3xl xl:text-4xl font-bold tracking-tight leading-tight', // Sub-headers
			h3: 'text-xl md:text-2xl xl:text-3xl font-semibold tracking-tight text-light', // Section titles
			h4: 'text-lg md:text-xl xl:text-2xl font-semibold text-light leading-normal', // Subsection titles
			h5: 'text-sm md:text-lg xl:text-xl font-semibold leading-relaxed', // Smaller headers
			h6: 'text-sm md:text-base xl:text-lg font-medium leading-snug', // Small headings
			base: 'text-xs md:text-sm xl:text-base font-normal leading-relaxed ', // Body text with readability
			small: 'text-xs md:text-sm xl:text-sm font-normal leading-normal ', // Smaller body text
			extraSmall: 'text-xs md:text-xs xl:text-xs font-normal leading-snug ', // Extra small text
			tinY: 'text-[10px] md:text-xs font-normal leading-tight ', // Minimal or tiny text
		},
	},
	defaultVariants: {
		variant: 'base',
	},
});

const variantToTag: Record<string, React.ElementType> = {
	h1: 'h1',
	h2: 'h2',
	h3: 'h3',
	h4: 'h4',
	h5: 'h5',
	h6: 'h6',
	base: 'p',
	small: 'small',
	extraSmall: 'span',
	tiny: 'span',
};

export interface TypographyProps
	extends React.HTMLAttributes<HTMLElement>,
		VariantProps<typeof typographyVariants> {
	as?: React.ElementType;
}

const Typography = React.forwardRef<HTMLElement, TypographyProps>(function Typography(
	{ className, variant = 'base', as, children, ...props },
	ref
) {
	const Tag = as || (variant && variantToTag[variant]) || 'p';

	return (
		<Tag className={cn(typographyVariants({ variant, className }))} ref={ref} {...props}>
			{children}
		</Tag>
	);
});

export { Typography, typographyVariants };
