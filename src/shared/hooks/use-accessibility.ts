import { useMemo, useCallback } from "react"
import type { ColorShade } from "./use-palette-generator"

export interface ContrastScore {
  background: ColorShade
  foreground: ColorShade
  ratio: number
  level: string
  pass: boolean
}

export function useAccessibility() {
  const getLuminance = useCallback((hex: string): number => {
    hex = hex.replace("#", "")

    const r = Number.parseInt(hex.substring(0, 2), 16) / 255
    const g = Number.parseInt(hex.substring(2, 4), 16) / 255
    const b = Number.parseInt(hex.substring(4, 6), 16) / 255

    const R = r <= 0.03928 ? r / 12.92 : Math.pow((r + 0.055) / 1.055, 2.4)
    const G = g <= 0.03928 ? g / 12.92 : Math.pow((g + 0.055) / 1.055, 2.4)
    const B = b <= 0.03928 ? b / 12.92 : Math.pow((b + 0.055) / 1.055, 2.4)

    return 0.2126 * R + 0.7152 * G + 0.0722 * B
  }, [])

  const getContrastRatio = useCallback(
    (color1: string, color2: string): number => {
      const luminance1 = getLuminance(color1)
      const luminance2 = getLuminance(color2)

      const lighter = Math.max(luminance1, luminance2)
      const darker = Math.min(luminance1, luminance2)

      return (lighter + 0.05) / (darker + 0.05)
    },
    [getLuminance]
  )

  const calculatePaletteAccessibility = useCallback(
    (colorShades: ColorShade[]): ContrastScore[] => {
      const testShades = [50, 100, 200, 500, 700, 900]
      const results: ContrastScore[] = []

      for (let i = 0; i < testShades.length; i++) {
        for (let j = i + 1; j < testShades.length; j++) {
          const bgShade = colorShades.find((s) => s.shade === testShades[i])
          const fgShade = colorShades.find((s) => s.shade === testShades[j])

          if (bgShade && fgShade) {
            const ratio = getContrastRatio(bgShade.hex, fgShade.hex)
            let level = ""
            let pass = false

            if (ratio >= 7) {
              level = "AAA"
              pass = true
            } else if (ratio >= 4.5) {
              level = "AA"
              pass = true
            } else if (ratio >= 3) {
              level = "AA Large"
              pass = true
            } else {
              level = "Fail"
              pass = false
            }

            results.push({
              background: bgShade,
              foreground: fgShade,
              ratio,
              level,
              pass,
            })
          }
        }
      }

      return results.sort((a, b) => b.ratio - a.ratio)
    },
    [getContrastRatio]
  )

  return { calculatePaletteAccessibility, getContrastRatio, getLuminance }
}
