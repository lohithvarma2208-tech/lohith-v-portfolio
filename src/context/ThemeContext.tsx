import React, { createContext, useContext, useState, useEffect } from 'react'
import type { AccentTheme } from '../types'
import { sound } from '../utils/sound'

interface ThemeContextType {
  theme: AccentTheme
  setTheme: (t: AccentTheme) => void
  soundMuted: boolean
  toggleSound: () => void
  isTerminalOpen: boolean
  setTerminalOpen: (open: boolean) => void
  isCommandPaletteOpen: boolean
  setCommandPaletteOpen: (open: boolean) => void
  themeColors: {
    primaryText: string
    primaryBorder: string
    primaryGlow: string
    accentBg: string
    badgeText: string
  }
}

const themeColorMap: Record<AccentTheme, {
  primaryText: string
  primaryBorder: string
  primaryGlow: string
  accentBg: string
  badgeText: string
}> = {
  cyan: {
    primaryText: 'text-cyan-400',
    primaryBorder: 'border-cyan-500/30',
    primaryGlow: 'rgba(56, 189, 248, 0.25)',
    accentBg: 'bg-cyan-500/10',
    badgeText: 'text-cyan-300'
  },
  emerald: {
    primaryText: 'text-emerald-400',
    primaryBorder: 'border-emerald-500/30',
    primaryGlow: 'rgba(52, 211, 153, 0.25)',
    accentBg: 'bg-emerald-500/10',
    badgeText: 'text-emerald-300'
  },
  amber: {
    primaryText: 'text-amber-400',
    primaryBorder: 'border-amber-500/30',
    primaryGlow: 'rgba(251, 191, 36, 0.25)',
    accentBg: 'bg-amber-500/10',
    badgeText: 'text-amber-300'
  },
  violet: {
    primaryText: 'text-purple-400',
    primaryBorder: 'border-purple-500/30',
    primaryGlow: 'rgba(192, 132, 252, 0.25)',
    accentBg: 'bg-purple-500/10',
    badgeText: 'text-purple-300'
  }
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setThemeState] = useState<AccentTheme>('cyan')
  const [soundMuted, setSoundMuted] = useState<boolean>(false)
  const [isTerminalOpen, setTerminalOpen] = useState<boolean>(false)
  const [isCommandPaletteOpen, setCommandPaletteOpen] = useState<boolean>(false)

  useEffect(() => {
    const savedTheme = localStorage.getItem('lv_theme') as AccentTheme | null
    if (savedTheme && ['cyan', 'emerald', 'amber', 'violet'].includes(savedTheme)) {
      setThemeState(savedTheme)
    }
    setSoundMuted(sound.getIsMuted())

    // Global keyboard listener for ⌘K and `
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        sound.playChime()
        setCommandPaletteOpen((prev) => !prev)
      } else if (e.key === '`' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        sound.playChime()
        setTerminalOpen((prev) => !prev)
      } else if (e.key === 'Escape') {
        setCommandPaletteOpen(false)
        setTerminalOpen(false)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  const setTheme = (t: AccentTheme) => {
    setThemeState(t)
    localStorage.setItem('lv_theme', t)
    sound.playChime()
  }

  const toggleSound = () => {
    const isNowActive = sound.toggleMute()
    setSoundMuted(!isNowActive)
  }

  return (
    <ThemeContext.Provider
      value={{
        theme,
        setTheme,
        soundMuted,
        toggleSound,
        isTerminalOpen,
        setTerminalOpen,
        isCommandPaletteOpen,
        setCommandPaletteOpen,
        themeColors: themeColorMap[theme]
      }}
    >
      {children}
    </ThemeContext.Provider>
  )
}

export const useTheme = () => {
  const ctx = useContext(ThemeContext)
  if (!ctx) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return ctx
}
