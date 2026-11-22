import React, { useState, useEffect } from 'react'
import { Sparkles, X, Volume2, VolumeX } from 'lucide-react'
import { sound } from '../../utils/sound'
import { robotSpeech } from '../../utils/robotSpeech'

export const RobotCompanionOverlay: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [activeSection, setActiveSection] = useState<string>('hero')
  const [hasInteracted, setHasInteracted] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [dismissed, setDismissed] = useState(false)

  // Track active section as user scrolls
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'projects', 'arsenal', 'journey', 'contact']
      const scrollPos = window.scrollY + window.innerHeight * 0.4

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId)
        if (el) {
          const top = el.offsetTop
          const height = el.offsetHeight
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(sectionId)
            break
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const commentaries: Record<string, { tag: string; tip: string; actionText?: string }> = {
    hero: {
      tag: 'SYSTEM COMPANION',
      tip: 'Move your cursor across the screen! The 3D avatar bust in the center tracks your movements in real time.'
    },
    projects: {
      tag: 'ARCHITECTURE ARCHIVE',
      tip: 'Click "Inspect →" on any project card to view the low-level memory layout, Raft consensus, and ASCII architecture diagrams.'
    },
    arsenal: {
      tag: 'PHYSICS MATRIX',
      tip: 'Try clicking and throwing those 3D tech balls! The zero-gravity engine runs on Verlet integration with elastic collisions.'
    },
    journey: {
      tag: 'THE BUILDER',
      tip: "That's Lohith in his suit! He's a CS undergraduate based in Bangalore, seeking 2027 software engineering internships."
    },
    contact: {
      tag: 'DIRECT COMMS',
      tip: 'Need to reach Lohith? Click the copy button next to lohithvarma2208@gmail.com or send a direct dispatch.'
    }
  }

  const currentComment = commentaries[activeSection] || commentaries.hero

  const handleToggleOpen = () => {
    sound.playClick()
    robotSpeech.playChirp('blip')
    setIsOpen(!isOpen)
    setHasInteracted(true)

    if (!isOpen && !isMuted) {
      robotSpeech.speak(currentComment.tip)
    }
  }

  const handleToggleMute = (e: React.MouseEvent) => {
    e.stopPropagation()
    sound.playClick()
    const next = !isMuted
    setIsMuted(next)
    robotSpeech.setMuted(next)
  }

  if (dismissed) return null

  return (
    <aside aria-label="Robot Companion Guide" className="fixed bottom-6 right-6 z-40 flex flex-col items-end pointer-events-none select-none">
      {/* Speech / Insight Bubble */}
      {isOpen && (
        <div className="pointer-events-auto mb-3 max-w-xs sm:max-w-sm p-4 rounded-2xl bg-[#090c16]/95 border border-cyan-500/30 backdrop-blur-xl shadow-[0_16px_40px_rgba(0,0,0,0.8)] transition-all animate-fadeIn">
          {/* Header */}
          <div className="flex items-center justify-between pb-2 mb-2 border-b border-white/10">
            <div className="flex items-center gap-1.5 text-[10px] font-mono text-cyan-400 font-bold tracking-wider uppercase">
              <Sparkles className="w-3 h-3 text-cyan-400" />
              <span>{currentComment.tag}</span>
            </div>

            <div className="flex items-center gap-1.5">
              <button
                onClick={handleToggleMute}
                className="p-1 rounded hover:bg-white/10 text-neutral-400 hover:text-white transition-colors cursor-pointer"
                title={isMuted ? 'Unmute Robot Voice' : 'Mute Robot Voice'}
              >
                {isMuted ? <VolumeX className="w-3.5 h-3.5 text-neutral-500" /> : <Volume2 className="w-3.5 h-3.5 text-cyan-400" />}
              </button>

              <button
                onClick={() => {
                  sound.playClick()
                  setIsOpen(false)
                }}
                className="p-1 rounded hover:bg-white/10 text-neutral-400 hover:text-white transition-colors cursor-pointer"
                title="Close"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Commentary Body */}
          <p className="text-xs sm:text-sm text-neutral-200 font-sans leading-relaxed">
            {currentComment.tip}
          </p>

          {/* Footer Dismiss / Snooze */}
          <div className="mt-3 pt-2 border-t border-white/5 flex items-center justify-between text-[10px] font-mono text-neutral-500">
            <span>COMPANION DROID v2.4</span>
            <button
              onClick={() => {
                sound.playClick()
                setDismissed(true)
              }}
              className="hover:text-neutral-300 transition-colors cursor-pointer"
            >
              Sleep Droid
            </button>
          </div>
        </div>
      )}

      {/* Floating Droid Trigger Pill */}
      <button
        onClick={handleToggleOpen}
        onMouseEnter={() => sound.playHover()}
        className={`pointer-events-auto flex items-center gap-2 px-3.5 py-2 rounded-full border backdrop-blur-xl shadow-2xl transition-all duration-300 hover:scale-105 cursor-pointer ${
          isOpen
            ? 'bg-cyan-500/20 border-cyan-400 text-cyan-200 shadow-[0_0_20px_rgba(56,189,248,0.3)]'
            : 'bg-[#090c16]/90 border-white/15 text-neutral-300 hover:text-white hover:border-cyan-500/40'
        }`}
        title="Interactive Robot Companion Guide"
      >
        {/* Animated Robot Eye Dot */}
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-400" />
        </span>

        <span className="text-xs font-mono font-semibold tracking-wider uppercase">
          🤖 GUIDE
        </span>

        {!hasInteracted && (
          <span className="hidden sm:inline-flex px-1.5 py-0.5 rounded text-[9px] font-mono bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
            TIP
          </span>
        )}
      </button>
    </aside>
  )
}
