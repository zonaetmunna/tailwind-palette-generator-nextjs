"use client"

import { motion } from "framer-motion"
import { Download } from "lucide-react"
import { Button } from "@/shared/components/ui/button"
import { Switch } from "@/shared/components/ui/switch"
import { Label } from "@/shared/components/ui/label"

interface HeaderProps {
  baseColor: string
  isDarkMode: boolean
  onThemeToggle: (checked: boolean) => void
  onDownloadJSON: () => void
  onDownloadCSS: () => void
  onDownloadTailwind: () => void
  onDownloadSCSS: () => void
}

export function Header({
  baseColor,
  isDarkMode,
  onThemeToggle,
  onDownloadJSON,
  onDownloadCSS,
  onDownloadTailwind,
  onDownloadSCSS,
}: HeaderProps) {
  return (
    <motion.header
      className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="container flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <motion.div
            className="w-10 h-10 rounded-lg shadow-md"
            style={{ backgroundColor: baseColor }}
            animate={{ backgroundColor: baseColor }}
            transition={{ duration: 0.3 }}
          />
          <div>
            <h1 className="text-xl font-bold tracking-tight">Tailwind Palette Generator</h1>
            <p className="text-xs text-muted-foreground">{baseColor}</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <motion.div
            className="flex items-center space-x-2"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
          >
            <Switch id="dark-mode" checked={isDarkMode} defaultChecked={true} onCheckedChange={onThemeToggle} />
            <Label htmlFor="dark-mode" className="text-sm">
              Dark
            </Label>
          </motion.div>

          <div className="hidden sm:flex items-center gap-2">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button variant="outline" size="sm" onClick={onDownloadJSON} className="gap-2">
                <Download className="h-4 w-4" />
                <span className="hidden md:inline">JSON</span>
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button variant="outline" size="sm" onClick={onDownloadCSS} className="gap-2">
                <Download className="h-4 w-4" />
                <span className="hidden md:inline">CSS</span>
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button variant="outline" size="sm" onClick={onDownloadTailwind} className="gap-2">
                <Download className="h-4 w-4" />
                <span className="hidden md:inline">Tailwind</span>
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button variant="outline" size="sm" onClick={onDownloadSCSS} className="gap-2">
                <Download className="h-4 w-4" />
                <span className="hidden md:inline">SCSS</span>
              </Button>
            </motion.div>
          </div>

          <div className="sm:hidden">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button variant="outline" size="sm" onClick={onDownloadJSON}>
                <Download className="h-4 w-4" />
              </Button>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.header>
  )
}
