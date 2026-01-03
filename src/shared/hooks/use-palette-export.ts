import { useCallback } from "react"
import type { ColorShade } from "./use-palette-generator"

export function usePaletteExport() {
  const downloadFile = useCallback((content: string, filename: string, mimeType: string) => {
    const dataStr = `data:${mimeType};charset=utf-8,${encodeURIComponent(content)}`
    const downloadAnchorNode = document.createElement("a")
    downloadAnchorNode.setAttribute("href", dataStr)
    downloadAnchorNode.setAttribute("download", filename)
    document.body.appendChild(downloadAnchorNode)
    downloadAnchorNode.click()
    downloadAnchorNode.remove()
  }, [])

  const downloadJSON = useCallback(
    (colorShades: ColorShade[], baseColor: string) => {
      const palette = colorShades.reduce(
        (acc, { shade, hex }) => {
          acc[shade] = hex
          return acc
        },
        {} as Record<number, string>
      )

      const content = JSON.stringify(palette, null, 2)
      downloadFile(content, `palette-${baseColor.replace("#", "")}.json`, "text/json")
    },
    [downloadFile]
  )

  const downloadCSS = useCallback(
    (colorShades: ColorShade[], baseColor: string) => {
      let css = `:root {\n`
      colorShades.forEach(({ shade, hex }) => {
        css += `  --color-primary-${shade}: ${hex};\n`
      })
      css += `}\n`

      downloadFile(css, `palette-${baseColor.replace("#", "")}.css`, "text/css")
    },
    [downloadFile]
  )

  const downloadTailwindConfig = useCallback(
    (colorShades: ColorShade[], baseColor: string) => {
      const colors = colorShades.reduce(
        (acc, { shade, hex }) => {
          acc[shade] = hex
          return acc
        },
        {} as Record<number, string>
      )

      const config = `/** @type {import('tailwindcss').Config} */
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: ${JSON.stringify(colors, null, 6).replace(/"([^"]+)":/g, "$1:")}
      }
    }
  }
}`

      downloadFile(config, `tailwind-config-${baseColor.replace("#", "")}.js`, "text/javascript")
    },
    [downloadFile]
  )

  const downloadSCSS = useCallback(
    (colorShades: ColorShade[], baseColor: string) => {
      let scss = `// Color Palette - ${baseColor}\n`
      scss += `$primary-colors: (\n`
      colorShades.forEach(({ shade, hex }, index) => {
        scss += `  ${shade}: ${hex}${index < colorShades.length - 1 ? "," : ""}\n`
      })
      scss += `);\n\n`
      scss += `// Individual color variables\n`
      colorShades.forEach(({ shade, hex }) => {
        scss += `$primary-${shade}: ${hex};\n`
      })

      downloadFile(scss, `palette-${baseColor.replace("#", "")}.scss`, "text/scss")
    },
    [downloadFile]
  )

  return { downloadJSON, downloadCSS, downloadTailwindConfig, downloadSCSS }
}
