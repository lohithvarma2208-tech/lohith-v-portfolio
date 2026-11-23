import React, { useState, useEffect, useRef } from 'react'
import { DeveloperAvatar3D, type RobotGestureState } from '../3d/DeveloperAvatar3D'
import { robotSpeech } from '../../utils/robotSpeech'
import { sound } from '../../utils/sound'
import { Volume2, VolumeX, Sparkles, ArrowRight, RotateCcw } from 'lucide-react'

interface RobotOpeningSceneProps {
  onEnterPortfolio: () => void
}

interface DialogueLine {
  text: string
  pauseAfterMs: number
  gesture: RobotGestureState
}

export const RobotOpeningScene: React.FC<RobotOpeningSceneProps> = ({ onEnterPortfolio }) => {
  const [currentLineIndex, setCurrentLineIndex] = useState<number>(0)
  const [gesture, setGesture] = useState<RobotGestureState>('booting')
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false)
  const [audioUnlocked, setAudioUnlocked] = useState<boolean>(false)
  const [isMuted, setIsMuted] = useState<boolean>(false)
  const [isTransitioning, setIsTransitioning] = useState<boolean>(false)
  const [dialogueFinished, setDialogueFinished] = useState<boolean>(false)

  const activeTimeoutRef = useRef<number | null>(null)

  const dialogueLines: DialogueLine[] = [
    {
      text: 'Oh… another curious human.',
      pauseAfterMs: 900,
      gesture: 'speaking_1'
    },
    {
      text: "You're just in time. My creator is busy building his future. While he's away, let me show you what he's been building.",
      pauseAfterMs: 1400,
      gesture: 'speaking_2'
    },
    {
      text: "Welcome to Lohith's world. Ready?",
      pauseAfterMs: 1100,
      gesture: 'speaking_3'
    }
  ]

  // Start sequence
  useEffect(() => {
    // Attempt to unlock audio immediately
    robotSpeech.initAudioContext()

    // Boot chirp
    robotSpeech.playChirp('startup')
    setGesture('booting')

    // Start line 0 after brief warm up
    const timer = setTimeout(() => {
      triggerLine(0)
    }, 700)

    return () => {
      clearTimeout(timer)
      if (activeTimeoutRef.current) clearTimeout(activeTimeoutRef.current)
      robotSpeech.stop()
    }
  }, [])

  // Trigger dialogue line with real studio WAV audio + fallback
  const triggerLine = (index: number) => {
    if (index >= dialogueLines.length) {
      setIsSpeaking(false)
      setGesture('explore')
      setDialogueFinished(true)
      return
    }

    const line = dialogueLines[index]
    setCurrentLineIndex(index)
    setGesture(line.gesture)
    setIsSpeaking(true)

    // Play real studio audio file (/audio/dialogue_lineX.wav) or fallback
    robotSpeech.speakDialogue(index, line.text, () => {
      setIsSpeaking(false)
      activeTimeoutRef.current = window.setTimeout(() => {
        triggerLine(index + 1)
      }, line.pauseAfterMs)
    })
  }

  // Handle user interaction to unlock browser autoplay audio
  const handleUserGestureUnlock = () => {
    robotSpeech.initAudioContext()
    setAudioUnlocked(true)
    setIsMuted(false)
    robotSpeech.setMuted(false)

    // Replay current line so visitor hears it immediately
    if (currentLineIndex >= 0 && currentLineIndex < dialogueLines.length) {
      robotSpeech.speakDialogue(currentLineIndex, dialogueLines[currentLineIndex].text)
    }
  }

  const handleToggleMute = (e: React.MouseEvent) => {
    e.stopPropagation()
    sound.playClick()
    const nextMuted = !isMuted
    setIsMuted(nextMuted)
    robotSpeech.setMuted(nextMuted)
    if (!nextMuted && currentLineIndex >= 0 && currentLineIndex < dialogueLines.length) {
      robotSpeech.speakDialogue(currentLineIndex, dialogueLines[currentLineIndex].text)
    }
  }

  const handleReplayDialogue = (e: React.MouseEvent) => {
    e.stopPropagation()
    sound.playClick()
    if (activeTimeoutRef.current) clearTimeout(activeTimeoutRef.current)
    setDialogueFinished(false)
    triggerLine(0)
  }

  const handleExplore = (e?: React.MouseEvent) => {
    e?.stopPropagation()
    sound.playClick()
    robotSpeech.playChirp('explore')
    setGesture('explore')
    setIsTransitioning(true)

    setTimeout(() => {
      robotSpeech.stop()
      onEnterPortfolio()
    }, 1200)
  }

  const handleSkip = (e: React.MouseEvent) => {
    e.stopPropagation()
    sound.playClick()
    robotSpeech.stop()
    onEnterPortfolio()
  }

  return (
    <div
      onClick={handleUserGestureUnlock}
      className={`fixed inset-0 z-[200] bg-black text-white select-none overflow-hidden transition-all duration-1000 ${
        isTransitioning ? 'scale-[2.6] opacity-0 pointer-events-none filter blur-sm' : 'opacity-100'
      }`}
    >
      {/* Background Room Atmosphere with Subtle Monitor Glow */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <img
          src="/cinematic_room.jpg"
          alt="Night Study"
          className={`w-full h-full object-cover transition-transform duration-[1200ms] ease-in-out ${
            isTransitioning ? 'scale-150' : 'scale-100'
          }`}
          style={{ filter: 'brightness(0.3) contrast(1.15) blur(1.5px)' }}
        />
        <div className="absolute inset-0 bg-radial from-transparent via-black/60 to-black/90" />
      </div>

      {/* Cinematic Letterbox Bars */}
      <div className="absolute top-0 left-0 right-0 h-[5vh] sm:h-[7vh] bg-black z-30 pointer-events-none" />
      <div className="absolute bottom-0 left-0 right-0 h-[5vh] sm:h-[7vh] bg-black z-30 pointer-events-none" />

      {/* TOP HEADER CONTROLS */}
      <div className="absolute top-[6vh] sm:top-[8vh] left-6 right-6 z-40 flex items-center justify-between text-xs font-mono pointer-events-auto">
        <div className="flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-black/60 border border-white/10 backdrop-blur-md">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
          <span className="text-[11px] tracking-wider text-neutral-300 uppercase">
            ROBOT GUIDE // FIRST VISITOR INTERACTION
          </span>
        </div>

        <div className="flex items-center gap-2">
          {/* Audio Indicator / Toggle */}
          <button
            onClick={handleToggleMute}
            onMouseEnter={() => sound.playHover()}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-cyan-500/15 hover:bg-cyan-500/25 border border-cyan-500/40 text-cyan-300 text-xs font-mono transition-all cursor-pointer shadow-lg"
            title={isMuted ? 'Unmute Speech Voice' : 'Voice Audio Active'}
          >
            {isMuted ? (
              <>
                <VolumeX className="w-3.5 h-3.5 text-red-400" />
                <span>VOICE: MUTED</span>
              </>
            ) : (
              <>
                <Volume2 className="w-3.5 h-3.5 text-cyan-400" />
                <span>VOICE: ON</span>
              </>
            )}
          </button>

          {/* Replay voice button */}
          <button
            onClick={handleReplayDialogue}
            onMouseEnter={() => sound.playHover()}
            className="p-1.5 rounded-full bg-black/60 border border-white/10 text-neutral-400 hover:text-white transition-colors cursor-pointer"
            title="Replay Dialogue"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={handleSkip}
            onMouseEnter={() => sound.playHover()}
            className="px-3.5 py-1.5 rounded-full bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-neutral-400 hover:text-white text-xs font-mono transition-colors cursor-pointer"
          >
            SKIP INTRO
          </button>
        </div>
      </div>

      {/* CENTER STAGE: THE 3D CYBER ROBOT / AVATAR CHARACTER */}
      <div className="absolute inset-0 z-20 flex flex-col items-center justify-center pointer-events-none">
        <div className="w-[320px] h-[360px] sm:w-[420px] sm:h-[460px] md:w-[480px] md:h-[520px] relative pointer-events-auto">
          <DeveloperAvatar3D
            isIntroMode={true}
            gesture={gesture}
            isSpeaking={isSpeaking}
            className="w-full h-full"
          />
        </div>
      </div>

      {/* SYNCHRONIZED CINEMATIC SUBTITLES (BOTTOM CENTER) */}
      <div className="absolute bottom-[8vh] sm:bottom-[10vh] left-4 right-4 z-40 flex flex-col items-center text-center pointer-events-auto">
        {currentLineIndex >= 0 && currentLineIndex < dialogueLines.length && (
          <div className="max-w-2xl px-6 py-3.5 rounded-2xl bg-black/80 border border-white/10 backdrop-blur-xl shadow-2xl transition-all duration-300 animate-fadeIn">
            <div className="flex items-center justify-center gap-2 mb-1">
              <Sparkles className="w-3 h-3 text-cyan-400" />
              <span className="text-[10px] font-mono tracking-widest text-cyan-400 uppercase font-semibold">
                ROBOT GUIDE
              </span>
            </div>
            <p className="text-base sm:text-xl md:text-2xl font-medium text-white font-sans tracking-wide leading-relaxed">
              &ldquo;{dialogueLines[currentLineIndex].text}&rdquo;
            </p>
          </div>
        )}

        {/* POST-DIALOGUE INTERACTION BUTTONS */}
        <div
          className={`flex items-center gap-3 mt-4 transition-all duration-500 ${
            dialogueFinished ? 'scale-105 opacity-100' : 'opacity-90'
          }`}
        >
          <button
            onClick={handleExplore}
            onMouseEnter={() => sound.playHover()}
            className="px-7 py-3 rounded-full bg-white text-black font-semibold text-xs tracking-wider uppercase transition-all flex items-center gap-2 shadow-[0_0_30px_rgba(255,255,255,0.3)] hover:bg-neutral-200 hover:scale-105 cursor-pointer"
          >
            <span>LET&apos;S EXPLORE</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={handleSkip}
            onMouseEnter={() => sound.playHover()}
            className="px-5 py-3 rounded-full bg-white/[0.06] hover:bg-white/[0.12] border border-white/15 text-white font-mono text-xs tracking-wider uppercase transition-all backdrop-blur-md cursor-pointer"
          >
            SKIP INTRO
          </button>
        </div>

        {/* Click anywhere audio prompt if visitor has not clicked */}
        {!audioUnlocked && (
          <p className="text-[11px] font-mono text-neutral-400 mt-2 animate-pulse">
            Tip: Click anywhere to ensure browser audio is active
          </p>
        )}
      </div>
    </div>
  )
}
