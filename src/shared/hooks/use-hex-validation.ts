import { useCallback } from "react"

export function useHexValidation() {
  const formatHexValue = useCallback((value: string, fallback: string): string => {
    let hex = value.replace(/[^0-9A-Fa-f]/g, "")

    if (!hex) return fallback

    if (hex.length === 3) {
      hex = hex
        .split("")
        .map((char) => char + char)
        .join("")
    }

    if (hex.length < 6) {
      if (hex.length === 1) {
        hex = hex.repeat(6)
      } else if (hex.length === 2) {
        hex = hex + hex + "00"
      } else if (hex.length === 4) {
        hex = hex + "00"
      } else if (hex.length === 5) {
        hex = hex + hex.charAt(0)
      }
    } else if (hex.length > 6) {
      hex = hex.substring(0, 6)
    }

    return "#" + hex.toUpperCase()
  }, [])

  const isValidHex = useCallback((hex: string): boolean => {
    const hexRegex = /^#?[0-9A-Fa-f]{6}$/
    return hexRegex.test(hex)
  }, [])

  return { formatHexValue, isValidHex }
}
