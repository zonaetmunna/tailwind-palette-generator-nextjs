import { useCallback } from "react"

export function useColorConverter() {
  // Convert hex to HSL
  const hexToHSL = useCallback((hex: string): [number, number, number] => {
    hex = hex.replace(/^#/, "")

    const r = Number.parseInt(hex.substring(0, 2), 16) / 255
    const g = Number.parseInt(hex.substring(2, 4), 16) / 255
    const b = Number.parseInt(hex.substring(4, 6), 16) / 255

    const max = Math.max(r, g, b)
    const min = Math.min(r, g, b)

    let l = (max + min) / 2
    let h = 0
    let s = 0

    if (max !== min) {
      s = l > 0.5 ? (max - min) / (2 - max - min) : (max - min) / (max + min)

      if (max === r) {
        h = (g - b) / (max - min) + (g < b ? 6 : 0)
      } else if (max === g) {
        h = (b - r) / (max - min) + 2
      } else {
        h = (r - g) / (max - min) + 4
      }
      h /= 6
    }

    h = Math.round(h * 360)
    s = Math.round(s * 100)
    l = Math.round(l * 100)

    return [h, s, l]
  }, [])

  // Convert HSL to hex
  const hslToHex = useCallback((h: number, s: number, l: number): string => {
    h /= 360
    s /= 100
    l /= 100

    let r, g, b

    if (s === 0) {
      r = g = b = l
    } else {
      const hue2rgb = (p: number, q: number, t: number) => {
        if (t < 0) t += 1
        if (t > 1) t -= 1
        if (t < 1 / 6) return p + (q - p) * 6 * t
        if (t < 1 / 2) return q
        if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6
        return p
      }

      const q = l < 0.5 ? l * (1 + s) : l + s - l * s
      const p = 2 * l - q

      r = hue2rgb(p, q, h + 1 / 3)
      g = hue2rgb(p, q, h)
      b = hue2rgb(p, q, h - 1 / 3)
    }

    const toHex = (x: number) => {
      const hex = Math.round(x * 255).toString(16)
      return hex.length === 1 ? "0" + hex : hex
    }

    return `#${toHex(r)}${toHex(g)}${toHex(b)}`.toUpperCase()
  }, [])

  return { hexToHSL, hslToHex }
}
