import { useCallback } from "react"
import { useColorConverter } from "./use-color-converter"

export interface ColorShade {
  shade: number
  hex: string
  hue: number
  saturation: number
  lightness: number
}

export function usePaletteGenerator() {
  const { hexToHSL, hslToHex } = useColorConverter()

  const generateColorShades = useCallback(
    (baseColor: string, vibrancy: number, hueShift: number): ColorShade[] => {
      const shades = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900]
      const [baseHue, baseSat] = hexToHSL(baseColor)

      const adjustedHue = (baseHue + hueShift + 360) % 360
      const cappedVibrancy = Math.min(vibrancy, 85)
      const saturationMultiplier = cappedVibrancy / 50

      const lightnessMap: Record<number, number> = {
        50: 96,
        100: 90,
        200: 80,
        300: 70,
        400: 60,
        500: 50,
        600: 40,
        700: 30,
        800: 20,
        900: 10,
      }

      return shades.map((shade) => {
        const targetLightness = lightnessMap[shade]
        let adjustedSaturation: number

        if (shade <= 100) {
          adjustedSaturation = baseSat * saturationMultiplier * (0.3 + shade / 500)
        } else if (shade < 500) {
          adjustedSaturation = baseSat * saturationMultiplier * (0.6 + shade / 1000)
        } else if (shade < 800) {
          adjustedSaturation = baseSat * saturationMultiplier * (0.9 + (shade - 500) / 2000)
        } else {
          adjustedSaturation = baseSat * saturationMultiplier * 0.95
        }

        adjustedSaturation = Math.min(adjustedSaturation, 100)

        const hex = hslToHex(adjustedHue, adjustedSaturation, targetLightness)

        return {
          shade,
          hex,
          hue: adjustedHue,
          saturation: Math.round(adjustedSaturation),
          lightness: targetLightness,
        }
      })
    },
    [hexToHSL, hslToHex]
  )

  return { generateColorShades }
}
