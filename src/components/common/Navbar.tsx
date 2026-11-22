import React, { useState, useEffect } from 'react'
import {
  Terminal as TerminalIcon,
  Command,
  Volume2,
  VolumeX,
  Palette,
  Menu,
  X,
  ArrowUpRight
} from 'lucide-react'
import { useTheme } from '../../context/ThemeContext'
import { sound } from '../../utils/sound'
import type { AccentTheme } from '../../types'

interface NavbarProps {
  onReplayRobot?: () => void
}

export const Navbar: React.FC<NavbarProps> = ({ onReplayRobot }) => {
  const {
    theme,
    setTheme,
    soundMuted,
    toggleSound,
    setTerminalOpen,
    setCommandPaletteOpen,
    themeColors
  } = useTheme()

  const [timeStr, setTimeStr] = useState<string>('')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  // Real-time IST clock (UTC+5:30)
  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      const options: Intl.DateTimeFormatOptions = {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
      }
      setTimeStr(new Intl.DateTimeFormat('en-GB', options).format(now))
    }
    updateTime()
    const interval = setInterval(updateTime, 1000)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const themesList: AccentTheme[] = ['cyan', 'emerald', 'amber', 'violet']

  const cycleTheme = () => {
    sound.playClick()
    const currentIndex = themesList.indexOf(theme)
    const nextIndex = (currentIndex + 1) % themesList.length
    setTheme(themesList[nextIndex])
  }

  const handleNavClick = (id: string) => {
    sound.playClick()
    setMobileMenuOpen(false)
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const navLinks = [
    { id: 'projects', label: 'Work' },
    { id: 'arsenal', label: 'Skills' },
    { id: 'journey', label: 'About' },
    { id: 'contact', label: 'Contact' }
  ]

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex justify-center px-4 pt-3 pb-2 pointer-events-none">
      <div
        className={`pointer-events-auto flex items-center justify-between w-full max-w-6xl px-4 sm:px-6 py-2.5 rounded-full transition-all duration-300 border ${
          scrolled
            ? 'bg-[#090b10]/90 border-white/[0.12] shadow-[0_12px_36px_rgba(0,0,0,0.7)] backdrop-blur-xl'
            : 'bg-[#090b10]/60 border-white/[0.07] backdrop-blur-md'
        }`}
      >
        {/* Brand Mark & Identity */}
        <div className="flex items-center gap-3">
          <a
            href="#hero"
            onClick={(e) => {
              e.preventDefault()
              handleNavClick('hero')
            }}
            onMouseEnter={() => sound.playHover()}
            className="group flex items-center gap-2.5 focus:outline-none"
          >
            <div className="relative flex items-center justify-center w-8 h-8 rounded-lg bg-black/60 border border-white/10 overflow-hidden group-hover:border-cyan-500/50 transition-colors">
              <span className="font-mono text-xs font-bold tracking-tight text-white group-hover:text-cyan-300 transition-colors">
                LV.
              </span>
            </div>

            <div className="flex flex-col">
              <span className="text-xs font-bold tracking-wider text-white font-mono flex items-center gap-1.5">
                LOHITH.V
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              </span>
              <span className="text-[10px] text-neutral-400 font-mono hidden sm:inline">
                SWE & SYSTEMS
              </span>
            </div>
          </a>

          {/* Time indicator */}
          <div className="hidden lg:flex items-center gap-1.5 pl-3 ml-2 border-l border-white/10 text-[11px] font-mono text-neutral-400">
            <span className="text-neutral-500">BLR:</span>
            <span className="text-neutral-200 font-semibold">{timeStr}</span>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 text-[13px] font-medium text-neutral-300">
          {navLinks.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              onMouseEnter={() => sound.playHover()}
              className="px-3.5 py-1.5 rounded-full text-neutral-300 hover:text-white hover:bg-white/[0.06] transition-all cursor-pointer"
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* Interactive Controls */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Replay Robot Guide trigger */}
          {onReplayRobot && (
            <button
              onClick={() => {
                sound.playChime()
                onReplayRobot()
              }}
              onMouseEnter={() => sound.playHover()}
              title="Replay Robot Introduction"
              className="hidden lg:flex items-center gap-1 px-2.5 py-1.5 rounded-full bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 text-xs font-mono text-cyan-300 transition-colors cursor-pointer"
            >
              <span>🤖</span>
              <span className="text-[11px]">GUIDE</span>
            </button>
          )}

          {/* Command Palette trigger */}
          <button
            onClick={() => {
              sound.playChime()
              setCommandPaletteOpen(true)
            }}
            onMouseEnter={() => sound.playHover()}
            title="Command Menu (⌘K)"
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-full bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] text-xs font-mono text-neutral-300 transition-colors cursor-pointer"
          >
            <Command className="w-3.5 h-3.5 text-neutral-400" />
            <span className="hidden sm:inline text-[11px] text-neutral-400">⌘K</span>
          </button>

          {/* Terminal Drawer trigger */}
          <button
            onClick={() => {
              sound.playChime()
              setTerminalOpen(true)
            }}
            onMouseEnter={() => sound.playHover()}
            title="Open CLI Terminal"
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-full bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] text-xs font-mono text-neutral-300 transition-colors cursor-pointer"
          >
            <TerminalIcon className="w-3.5 h-3.5 text-cyan-400" />
            <span className="hidden sm:inline text-[11px]">CLI</span>
          </button>

          {/* Theme Palette Switcher */}
          <button
            onClick={cycleTheme}
            onMouseEnter={() => sound.playHover()}
            title={`Switch Theme Accent (Current: ${theme})`}
            className="p-1.5 rounded-full bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] text-neutral-300 transition-colors cursor-pointer"
          >
            <Palette className={`w-3.5 h-3.5 ${themeColors.primaryText}`} />
          </button>

          {/* Sound Synthesizer Toggle */}
          <button
            onClick={() => {
              sound.playClick()
              toggleSound()
            }}
            onMouseEnter={() => sound.playHover()}
            title={soundMuted ? 'Sound FX Muted' : 'Sound FX Active'}
            className={`p-1.5 rounded-full border transition-colors cursor-pointer ${
              soundMuted
                ? 'bg-white/[0.02] border-white/[0.06] text-neutral-500'
                : 'bg-cyan-500/10 border-cyan-500/30 text-cyan-400'
            }`}
          >
            {soundMuted ? (
              <VolumeX className="w-3.5 h-3.5" />
            ) : (
              <Volume2 className="w-3.5 h-3.5" />
            )}
          </button>

          {/* Mobile hamburger button */}
          <button
            onClick={() => {
              sound.playClick()
              setMobileMenuOpen(!mobileMenuOpen)
            }}
            className="md:hidden p-1.5 rounded-full bg-white/[0.04] border border-white/[0.08] text-neutral-300"
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="pointer-events-auto absolute top-16 left-4 right-4 rounded-2xl bg-[#090b10]/95 border border-white/15 p-5 backdrop-blur-2xl shadow-2xl flex flex-col gap-3 md:hidden z-50">
          <div className="flex items-center justify-between pb-3 border-b border-white/10">
            <span className="text-xs font-mono text-neutral-400">NAVIGATION</span>
            <span className="text-[11px] font-mono text-cyan-400">{timeStr} IST</span>
          </div>

          <div className="grid grid-cols-2 gap-2">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className="text-left px-3 py-2 rounded-lg text-sm font-medium text-neutral-200 hover:bg-white/10 transition-colors flex items-center justify-between"
              >
                <span>{link.label}</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-neutral-500" />
              </button>
            ))}
          </div>
        </div>
      )}
    </header>
  )
}
