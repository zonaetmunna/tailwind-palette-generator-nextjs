'use client';

import { useState, useEffect, useMemo } from 'react';
import { useTranslations } from 'next-intl';
import { useTheme } from 'next-themes';
import { toast } from 'sonner';

// Hooks
import { usePaletteGenerator } from '@/shared/hooks/use-palette-generator';
import { useColorConverter } from '@/shared/hooks/use-color-converter';
import { useAccessibility } from '@/shared/hooks/use-accessibility';
import { usePaletteExport } from '@/shared/hooks/use-palette-export';
import { useHexValidation } from '@/shared/hooks/use-hex-validation';

// Components
import { Header } from '@/modules/palette/components/header';
import { ColorPickerSection } from '@/modules/palette/components/color-picker-section';
import { ControlsSection } from '@/modules/palette/components/controls-section';
import { PreviewStrip } from '@/modules/palette/components/preview-strip';
import { AccessibilitySection } from '@/modules/palette/components/accessibility-section';
import { UsageExamplesSection } from '@/modules/palette/components/usage-examples-section';
import { ShadeList } from '@/modules/palette/components/shade-list';

export default function ColorPaletteGenerator() {
	// State
	const [baseColor, setBaseColor] = useState('#15437F');
	const [vibrancy, setVibrancy] = useState(50);
	const [hueShift, setHueShift] = useState(0);
	const [copiedHex, setCopiedHex] = useState<string | null>(null);
	const [inputValue, setInputValue] = useState(baseColor);
	const [isRandomizing, setIsRandomizing] = useState(false);
	const [isDarkMode, setIsDarkMode] = useState(true);

	// Hooks
	const t = useTranslations();
	const { theme, setTheme } = useTheme();
	const { generateColorShades } = usePaletteGenerator();
	const { hexToHSL, hslToHex } = useColorConverter();
	const { calculatePaletteAccessibility } = useAccessibility();
	const { downloadJSON, downloadCSS, downloadTailwindConfig, downloadSCSS } = usePaletteExport();
	const { formatHexValue } = useHexValidation();

	// Generate color shades
	const colorShades = useMemo(
		() => generateColorShades(baseColor, vibrancy, hueShift),
		[baseColor, vibrancy, hueShift, generateColorShades]
	);

	// Calculate accessibility
	const accessibilityScores = useMemo(
		() => calculatePaletteAccessibility(colorShades),
		[colorShades, calculatePaletteAccessibility]
	);

	const passingCombinations = useMemo(
		() => accessibilityScores.filter((score) => score.pass),
		[accessibilityScores]
	);

	const failingCombinations = useMemo(
		() => accessibilityScores.filter((score) => !score.pass),
		[accessibilityScores]
	);

	// Effects
	useEffect(() => {
		if (copiedHex) {
			const timeout = setTimeout(() => setCopiedHex(null), 1000);
			return () => clearTimeout(timeout);
		}
	}, [copiedHex]);

	useEffect(() => {
		setInputValue(baseColor);
	}, [baseColor]);

	useEffect(() => {
		if (!theme) {
			setTheme('dark');
			setIsDarkMode(true);
		}
	}, [theme, setTheme]);

	// Handlers
	const handleCopyHex = (hex: string) => {
		navigator.clipboard.writeText(hex);
		setCopiedHex(hex);
		toast.success(t('toast.copiedToClipboard'), {
			description: `${hex} ${t('toast.copiedDescription')}`,
			duration: 1000,
		});
	};

	const handleThemeToggle = (checked: boolean) => {
		setIsDarkMode(checked);
		const newTheme = checked ? 'dark' : 'light';
		document.documentElement.classList.add('theme-transition');
		setTheme(newTheme);
		setTimeout(() => {
			document.documentElement.classList.remove('theme-transition');
		}, 300);
	};

	const handleRandomizeColor = () => {
		setIsRandomizing(true);
		setVibrancy(50);
		setHueShift(0);

		const completelyRandom = Math.random() < 0.3;

		if (completelyRandom) {
			const newHue = Math.floor(Math.random() * 360);
			const newSaturation = 20 + Math.random() * 80;
			const newLightness = 20 + Math.random() * 60;
			const newColor = hslToHex(newHue, newSaturation, newLightness);
			setBaseColor(newColor);
			setInputValue(newColor);
		} else {
			const [currentHue] = hexToHSL(baseColor);
			const newHue = (currentHue + (Math.random() * 120 - 60) + 360) % 360;
			const newSaturation = 20 + Math.random() * 80;
			const newLightness = 20 + Math.random() * 60;
			const newColor = hslToHex(newHue, newSaturation, newLightness);
			setBaseColor(newColor);
			setInputValue(newColor);
		}

		toast.success(t('toast.colorRandomized'), {
			description: t('toast.colorRandomizedDescription'),
			duration: 1000,
		});

		setTimeout(() => setIsRandomizing(false), 500);
	};

	const handleInputBlur = () => {
		const validHex = formatHexValue(inputValue, baseColor);
		setInputValue(validHex);
		setBaseColor(validHex);
	};

	const handleInputKeyDown = (e: React.KeyboardEvent) => {
		if (e.key === 'Enter') {
			const validHex = formatHexValue(inputValue, baseColor);
			setInputValue(validHex);
			setBaseColor(validHex);
			(e.target as HTMLInputElement).blur();
		}
	};

	const handleCopyTailwindClasses = () => {
		const examples = colorShades
			.map((s) => `bg-primary-${s.shade} text-primary-${s.shade}`)
			.join('\n');
		navigator.clipboard.writeText(examples);
		toast.success(t('common.copied'), {
			description: t('usage.copiedToClipboard'),
		});
	};

	const handleCopyCSSVariables = () => {
		const cssVars = colorShades.map((s) => `--color-primary-${s.shade}: ${s.hex};`).join('\n');
		navigator.clipboard.writeText(`:root {\n  ${cssVars}\n}`);
		toast.success(t('common.copied'), {
			description: t('usage.copiedToClipboard'),
		});
	};

	return (
		<div className='flex flex-col min-h-screen'>
			<Header
				baseColor={baseColor}
				isDarkMode={isDarkMode}
				onThemeToggle={handleThemeToggle}
				onDownloadJSON={() => downloadJSON(colorShades, baseColor)}
				onDownloadCSS={() => downloadCSS(colorShades, baseColor)}
				onDownloadTailwind={() => downloadTailwindConfig(colorShades, baseColor)}
				onDownloadSCSS={() => downloadSCSS(colorShades, baseColor)}
			/>

			<main className='flex-1 container px-4 sm:px-6 lg:px-8 py-8'>
				<div className='space-y-8'>
					<div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
						{/* Left Column */}
						<div className='space-y-6'>
							<ColorPickerSection
								baseColor={baseColor}
								inputValue={inputValue}
								isRandomizing={isRandomizing}
								onColorChange={setBaseColor}
								onInputChange={setInputValue}
								onInputBlur={handleInputBlur}
								onInputKeyDown={handleInputKeyDown}
								onRandomize={handleRandomizeColor}
							/>

							<ControlsSection
								vibrancy={vibrancy}
								hueShift={hueShift}
								onVibrancyChange={setVibrancy}
								onHueShiftChange={setHueShift}
							/>

							<PreviewStrip colorShades={colorShades} />

							<AccessibilitySection
								passingCombinations={passingCombinations}
								failingCombinations={failingCombinations}
								totalCombinations={accessibilityScores.length}
							/>

							<UsageExamplesSection
								colorShades={colorShades}
								onCopyTailwindClasses={handleCopyTailwindClasses}
								onCopyCSSVariables={handleCopyCSSVariables}
							/>
						</div>

						{/* Right Column */}
						<ShadeList colorShades={colorShades} copiedHex={copiedHex} onCopyHex={handleCopyHex} />
					</div>
				</div>
			</main>
		</div>
	);
}
