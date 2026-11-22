import React, { useState, useEffect, useRef } from 'react'
import {
  Search,
  Terminal,
  FolderGit2,
  BookOpen,
  Cpu,
  Compass,
  Palette,
  Volume2,
  VolumeX,
  Mail,
  Copy,
  Check,
  FileText,
  FlaskConical,
  Sparkles
} from 'lucide-react'
import { useTheme } from '../../context/ThemeContext'
import { sound } from '../../utils/sound'
import { projectsData } from '../../data/projects'
import confetti from 'canvas-confetti'

interface CommandItem {
  id: string
  title: string
  subtitle?: string
  category: 'Navigation' | 'Projects' | 'Preferences' | 'Actions'
  icon: React.ElementType
  action: () => void
}

export const CommandPalette: React.FC = () => {
  const {
    isCommandPaletteOpen,
    setCommandPaletteOpen,
    theme,
    setTheme,
    soundMuted,
    toggleSound,
    setTerminalOpen
  } = useTheme()

  const [query, setQuery] = useState('')
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [copiedText, setCopiedText] = useState<string | null>(null)
  const inputRef = useRef<HTMLInputElement | null>(null)

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text)
    setCopiedText(label)
    sound.playSuccess()
    confetti({
      particleCount: 40,
      spread: 60,
      origin: { y: 0.8 }
    })
    setTimeout(() => setCopiedText(null), 2500)
  }

  const navigateTo = (id: string) => {
    setCommandPaletteOpen(false)
    sound.playClick()
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const commands: CommandItem[] = [
    // Navigation
    {
      id: 'nav-projects',
      title: 'Navigate to Flagship Projects',
      subtitle: 'NexusFlow, HyperionDB, AetherOS & low-level systems',
      category: 'Navigation',
      icon: FolderGit2,
      action: () => navigateTo('projects')
    },
    {
      id: 'nav-journal',
      title: 'Read Engineering Journal',
      subtitle: 'Technical essays on storage engines, agent runtimes & 60 FPS',
      category: 'Navigation',
      icon: BookOpen,
      action: () => navigateTo('journal')
    },
    {
      id: 'nav-lab',
      title: 'Open Experimental Lab',
      subtitle: 'Interactive GPU particle physics & memory allocation simulator',
      category: 'Navigation',
      icon: FlaskConical,
      action: () => navigateTo('lab')
    },
    {
      id: 'nav-arsenal',
      title: 'Inspect Technical Arsenal',
      subtitle: 'C++, Rust, TypeScript, Distributed Systems, WebGL',
      category: 'Navigation',
      icon: Cpu,
      action: () => navigateTo('arsenal')
    },
    {
      id: 'nav-trajectory',
      title: 'View Journey & Academic Trajectory',
      subtitle: 'CS Undergraduate milestones & 2027 internship goals',
      category: 'Navigation',
      icon: Compass,
      action: () => navigateTo('journey')
    },
    {
      id: 'nav-philosophy',
      title: 'Read Engineering Ethos & Manifesto',
      subtitle: 'First principles, 16ms rule, craftsmanship',
      category: 'Navigation',
      icon: Sparkles,
      action: () => navigateTo('philosophy')
    },
    {
      id: 'nav-contact',
      title: 'Contact & Dispatch Vault',
      subtitle: 'Send message, schedule chat, direct contact coordinates',
      category: 'Navigation',
      icon: Mail,
      action: () => navigateTo('contact')
    },

    // Projects Direct Access
    ...projectsData.map((proj) => ({
      id: `proj-${proj.id}`,
      title: `Project: ${proj.title}`,
      subtitle: `${proj.category} — ${proj.subtitle}`,
      category: 'Projects' as const,
      icon: FolderGit2,
      action: () => {
        navigateTo('projects')
        const el = document.getElementById(`card-${proj.id}`)
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'center' })
        }
      }
    })),

    // Preferences & Themes
    {
      id: 'theme-cyan',
      title: 'Theme: Cyan Obsidian',
      subtitle: 'Deep oceanic cyber glow (Current: ' + (theme === 'cyan' ? 'Active' : 'Inactive') + ')',
      category: 'Preferences',
      icon: Palette,
      action: () => {
        setTheme('cyan')
        setCommandPaletteOpen(false)
      }
    },
    {
      id: 'theme-emerald',
      title: 'Theme: Emerald Matrix',
      subtitle: 'High-contrast phosphor green (Current: ' + (theme === 'emerald' ? 'Active' : 'Inactive') + ')',
      category: 'Preferences',
      icon: Palette,
      action: () => {
        setTheme('emerald')
        setCommandPaletteOpen(false)
      }
    },
    {
      id: 'theme-amber',
      title: 'Theme: Solar Amber',
      subtitle: 'Industrial retro amber phosphor (Current: ' + (theme === 'amber' ? 'Active' : 'Inactive') + ')',
      category: 'Preferences',
      icon: Palette,
      action: () => {
        setTheme('amber')
        setCommandPaletteOpen(false)
      }
    },
    {
      id: 'theme-violet',
      title: 'Theme: Hyper Violet',
      subtitle: 'Futuristic deep synthwave violet (Current: ' + (theme === 'violet' ? 'Active' : 'Inactive') + ')',
      category: 'Preferences',
      icon: Palette,
      action: () => {
        setTheme('violet')
        setCommandPaletteOpen(false)
      }
    },
    {
      id: 'pref-sound',
      title: soundMuted ? 'Enable Sound FX' : 'Mute Sound FX',
      subtitle: 'Web Audio API programmatic synthesizer',
      category: 'Preferences',
      icon: soundMuted ? Volume2 : VolumeX,
      action: () => {
        toggleSound()
        setCommandPaletteOpen(false)
      }
    },

    // Actions
    {
      id: 'action-terminal',
      title: 'Launch Interactive Shell (CLI)',
      subtitle: 'Open full-screen terminal environment with matrix mode',
      category: 'Actions',
      icon: Terminal,
      action: () => {
        setCommandPaletteOpen(false)
        sound.playChime()
        setTerminalOpen(true)
      }
    },
    {
      id: 'action-email',
      title: 'Copy Email to Clipboard',
      subtitle: 'lohithvarma2208@gmail.com',
      category: 'Actions',
      icon: Copy,
      action: () => copyToClipboard('lohithvarma2208@gmail.com', 'Email Copied!')
    },
    {
      id: 'action-github',
      title: 'Copy GitHub Profile URL',
      subtitle: 'https://github.com/lohithvarma2208-tech',
      category: 'Actions',
      icon: Copy,
      action: () => copyToClipboard('https://github.com/lohithvarma2208-tech', 'GitHub URL Copied!')
    },
    {
      id: 'action-linkedin',
      title: 'Copy LinkedIn Profile URL',
      subtitle: 'https://www.linkedin.com/in/lohith-varma-3b4153421/',
      category: 'Actions',
      icon: Copy,
      action: () => copyToClipboard('https://www.linkedin.com/in/lohith-varma-3b4153421/', 'LinkedIn URL Copied!')
    },
    {
      id: 'action-cv',
      title: 'Download Curriculum Vitae (CV)',
      subtitle: 'Complete technical resume with benchmarks & coursework',
      category: 'Actions',
      icon: FileText,
      action: () => {
        setCommandPaletteOpen(false)
        const el = document.getElementById('contact')
        if (el) el.scrollIntoView({ behavior: 'smooth' })
        confetti({ particleCount: 50, spread: 70 })
      }
    },
    {
      id: 'action-admin',
      title: 'Open Admin Management CMS (#admin)',
      subtitle: 'Restricted control panel to manage skills, projects, and personal info',
      category: 'Actions',
      icon: Terminal,
      action: () => {
        setCommandPaletteOpen(false)
        sound.playChime()
        window.location.hash = '#admin'
      }
    }
  ]

  const filtered = commands.filter((cmd) => {
    const q = query.toLowerCase()
    return (
      cmd.title.toLowerCase().includes(q) ||
      (cmd.subtitle && cmd.subtitle.toLowerCase().includes(q)) ||
      cmd.category.toLowerCase().includes(q)
    )
  })

  useEffect(() => {
    if (isCommandPaletteOpen) {
      setTimeout(() => inputRef.current?.focus(), 100)
      setSelectedIndex(0)
    }
  }, [isCommandPaletteOpen, query])

  if (!isCommandPaletteOpen) return null

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      sound.playHover()
      setSelectedIndex((prev) => (prev + 1 < filtered.length ? prev + 1 : 0))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      sound.playHover()
      setSelectedIndex((prev) => (prev - 1 >= 0 ? prev - 1 : filtered.length - 1))
    } else if (e.key === 'Enter') {
      e.preventDefault()
      if (filtered[selectedIndex]) {
        filtered[selectedIndex].action()
      }
    } else if (e.key === 'Escape') {
      setCommandPaletteOpen(false)
    }
  }

  return (
    <div className="fixed inset-0 z-[120] flex items-start justify-center pt-24 px-4 bg-black/75 backdrop-blur-md animate-fadeIn">
      <div
        className="relative w-full max-w-2xl rounded-2xl bg-[#090b12] border border-white/20 shadow-[0_24px_80px_rgba(0,0,0,0.9)] overflow-hidden flex flex-col"
        onKeyDown={handleKeyDown}
      >
        {/* Search Input Bar */}
        <div className="flex items-center gap-3 px-4 py-3.5 border-b border-white/10 bg-[#0e111a]">
          <Search className="w-4 h-4 text-neutral-400" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type a command or search (e.g. 'projects', 'theme', 'email')..."
            className="flex-1 bg-transparent text-sm text-white placeholder-neutral-500 focus:outline-none font-mono"
            autoFocus
          />
          <kbd className="px-2 py-0.5 rounded bg-white/10 text-[10px] font-mono text-neutral-400">
            ESC
          </kbd>
        </div>

        {/* Results List */}
        <div className="max-h-[380px] overflow-y-auto p-2 space-y-1">
          {copiedText && (
            <div className="mx-2 my-1 px-3 py-2 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-mono flex items-center justify-between">
              <span>{copiedText}</span>
              <Check className="w-3.5 h-3.5" />
            </div>
          )}

          {filtered.length === 0 ? (
            <div className="py-12 text-center text-xs font-mono text-neutral-500">
              No matching command found for &quot;{query}&quot;
            </div>
          ) : (
            filtered.map((cmd, idx) => {
              const Icon = cmd.icon
              const isSelected = idx === selectedIndex

              return (
                <button
                  key={cmd.id}
                  onClick={() => cmd.action()}
                  onMouseEnter={() => {
                    setSelectedIndex(idx)
                    sound.playHover()
                  }}
                  className={`w-full text-left px-3.5 py-2.5 rounded-xl flex items-center justify-between transition-colors ${
                    isSelected
                      ? 'bg-white/10 text-white'
                      : 'text-neutral-300 hover:bg-white/5'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div
                      className={`p-2 rounded-lg ${
                        isSelected ? 'bg-cyan-500/20 text-cyan-300' : 'bg-white/5 text-neutral-400'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="flex flex-col min-w-0">
                      <span className="text-xs font-semibold tracking-wide truncate">
                        {cmd.title}
                      </span>
                      {cmd.subtitle && (
                        <span className="text-[11px] text-neutral-400 truncate">
                          {cmd.subtitle}
                        </span>
                      )}
                    </div>
                  </div>

                  <span className="text-[10px] font-mono text-neutral-400 uppercase ml-2 flex-shrink-0">
                    {cmd.category}
                  </span>
                </button>
              )
            })
          )}
        </div>

        {/* Footer shortcuts */}
        <div className="px-4 py-2.5 bg-[#07090f] border-t border-white/5 flex items-center justify-between text-[11px] font-mono text-neutral-400">
          <div className="flex items-center gap-3">
            <span>↑↓ Navigate</span>
            <span>↵ Select</span>
          </div>
          <span>LOHITH.V COMMAND PALETTE</span>
        </div>
      </div>
    </div>
  )
}
