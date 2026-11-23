import React, { useState, useEffect, useRef } from 'react'
import { cinematicAudio } from '../../utils/cinematicAudio'
import { Volume2, VolumeX, FastForward, Play, Pause, Sparkles } from 'lucide-react'

interface CinematicIntroProps {
  onComplete: () => void
}

export const CinematicIntro: React.FC<CinematicIntroProps> = ({ onComplete }) => {
  // Phase progression: 0 to 100
  const [progress, setProgress] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const [isAudioMuted, setIsAudioMuted] = useState(false)
  const [currentTextIndex, setCurrentTextIndex] = useState(0)

  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const requestRef = useRef<number | null>(null)
  const startTimeRef = useRef<number | null>(null)
  const pausedTimeRef = useRef<number>(0)

  // Real systems code that types on the monitor screen
  const codeLines = [
    '// VSS75 & KL ERP Buddy: Campus Academic Network Engine',
    '// Software Engineer & Systems Builder: Lohith Varma',
    'namespace lv::systems::consensus {',
    '  template <typename T, size_t Shards = 32>',
    '  class LockFreeRingBuffer {',
    '    alignas(64) std::atomic<uint64_t> head_{0};',
    '    alignas(64) std::atomic<uint64_t> tail_{0};',
    '    mmap_ring_storage<T> storage_;',
    '  public:',
    '    inline bool try_push(const T& event) noexcept {',
    '      const auto current = tail_.load(std::memory_order_relaxed);',
    '      if (current - head_.load(std::memory_order_acquire) >= Shards)',
    '        return false; // Backpressure engaged',
    '      storage_[current % Shards] = event;',
    '      tail_.store(current + 1, std::memory_order_release);',
    '      return true; // Zero-copy committed',
    '    }',
    '  };',
    '}'
  ]

  // Typing animation for screen code
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTextIndex((prev) => (prev < codeLines.length ? prev + 1 : prev))
    }, 280)
    return () => clearInterval(interval)
  }, [])

  // Floating Dust Particles in the Room
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const particles: Array<{
      x: number
      y: number
      size: number
      alpha: number
      vx: number
      vy: number
    }> = []

    for (let i = 0; i < 45; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 1.8 + 0.8,
        alpha: Math.random() * 0.4 + 0.1,
        vx: (Math.random() - 0.5) * 0.18,
        vy: -Math.random() * 0.25 - 0.05
      })
    }

    let pAnimId: number
    const renderParticles = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      for (const p of particles) {
        p.x += p.vx
        p.y += p.vy
        if (p.y < 0) p.y = canvas.height
        if (p.x < 0) p.x = canvas.width
        if (p.x > canvas.width) p.x = 0

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255, 230, 180, ${p.alpha})`
        ctx.fill()
      }
      pAnimId = requestAnimationFrame(renderParticles)
    }
    renderParticles()

    return () => cancelAnimationFrame(pAnimId)
  }, [])

  // Master Cinematic Timeline Loop
  useEffect(() => {
    // Start calm room ambience sound
    cinematicAudio.startRoomAmbience()

    const TOTAL_DURATION = 13500 // 13.5 seconds cinematic journey
    let hasTriggeredWarp = false

    const step = (timestamp: number) => {
      if (!startTimeRef.current) startTimeRef.current = timestamp
      if (!isPaused) {
        const elapsed = timestamp - startTimeRef.current - pausedTimeRef.current
        const rawProgress = Math.min((elapsed / TOTAL_DURATION) * 100, 100)
        setProgress(rawProgress)

        // Trigger screen dive warp sound at progress ~58%
        if (rawProgress >= 58 && !hasTriggeredWarp) {
          hasTriggeredWarp = true
          cinematicAudio.playScreenDiveTransition()
        }

        if (rawProgress >= 100) {
          cinematicAudio.stopAll()
          onComplete()
          return
        }
      }
      requestRef.current = requestAnimationFrame(step)
    }

    requestRef.current = requestAnimationFrame(step)

    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current)
      cinematicAudio.stopAll()
    }
  }, [isPaused, onComplete])

  const handleToggleSound = () => {
    const nextMuted = !isAudioMuted
    setIsAudioMuted(nextMuted)
    cinematicAudio.setMuted(nextMuted)
  }

  const handleSkip = () => {
    cinematicAudio.stopAll()
    onComplete()
  }

  // Camera Dolly Calculation
  // 0% - 40%: Wide room establishing shot, slow cinematic dolly-in
  // 40% - 62%: Push-in directly into the monitor screen
  // 62% - 75%: Screen dive transition (camera passes through glass)
  // 75% - 100%: Emergence into Lohith Varma's digital consciousness & identity
  const isRoomPhase = progress < 62
  const isTransitionPhase = progress >= 62 && progress < 76
  const isDigitalPhase = progress >= 76

  // Smooth camera scale and position curves
  const cameraScale =
    progress < 40
      ? 1.0 + (progress / 40) * 0.15
      : progress < 62
      ? 1.15 + Math.pow((progress - 40) / 22, 2.2) * 4.2
      : 5.35 + (progress - 62) * 0.8

  // Focus target shifts toward monitor center
  const cameraTranslateX =
    progress < 40
      ? 0
      : progress < 62
      ? -((progress - 40) / 22) * 4.5
      : -4.5

  const cameraTranslateY =
    progress < 40
      ? 0
      : progress < 62
      ? ((progress - 40) / 22) * 2.8
      : 2.8

  return (
    <div className="fixed inset-0 z-[200] bg-black text-white overflow-hidden select-none font-mono">
      {/* 2.39:1 CINEMATIC ANAMORPHIC LETTERBOX BARS */}
      <div className="absolute top-0 left-0 right-0 h-[6vh] sm:h-[8vh] bg-black z-50 pointer-events-none transition-all duration-700" />
      <div className="absolute bottom-0 left-0 right-0 h-[6vh] sm:h-[8vh] bg-black z-50 pointer-events-none transition-all duration-700" />

      {/* TOP STATUS BAR */}
      <div className="absolute top-[8vh] left-6 right-6 z-50 flex items-center justify-between text-xs font-mono text-neutral-400 pointer-events-auto">
        <div className="flex items-center gap-2.5">
          <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
          <span className="text-[11px] tracking-widest text-neutral-300 uppercase">
            {isRoomPhase ? 'SCENE 01 · NIGHT STUDY · BENGALURU' : isTransitionPhase ? 'SCENE 02 · ENTERING THE CODE' : 'SCENE 03 · DIGITAL GENESIS'}
          </span>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleToggleSound}
            className="p-2 rounded-full bg-black/60 border border-white/10 text-neutral-400 hover:text-white transition-colors"
            title={isAudioMuted ? 'Unmute Cinematic Audio' : 'Mute Audio'}
          >
            {isAudioMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5 text-cyan-400" />}
          </button>

          <button
            onClick={handleSkip}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 text-xs text-white font-mono transition-all backdrop-blur-md"
          >
            <span>Skip to Portfolio</span>
            <FastForward className="w-3 h-3 text-cyan-400" />
          </button>
        </div>
      </div>

      {/* MAIN CINEMATIC VIEWPORT CANVAS */}
      <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
        {/* SCENE 01 & 02: PHOTOREALISTIC ROOM ENVIRONMENT & MONITOR DIVE */}
        <div
          className="absolute inset-0 flex items-center justify-center transition-transform duration-75 ease-out"
          style={{
            transform: `scale(${cameraScale}) translate(${cameraTranslateX}%, ${cameraTranslateY}%)`,
            transformOrigin: '52% 48%',
            opacity: progress > 72 ? Math.max(0, 1 - (progress - 72) / 4) : 1
          }}
        >
          {/* Photorealistic Master Still of Room at Night */}
          <img
            src="/cinematic_room.jpg"
            alt="Cinematic developer workspace at night"
            className="w-full h-full object-cover filter contrast-[1.05] brightness-[0.92]"
          />

          {/* Floating Dust Particles Canvas in Room Light */}
          <canvas
            ref={canvasRef}
            className="absolute inset-0 pointer-events-none opacity-60 mix-blend-screen"
          />

          {/* Dynamic Light Rays / Anamorphic Streak */}
          <div className="absolute inset-0 bg-gradient-to-tr from-black/60 via-transparent to-black/40 pointer-events-none" />

          {/* Live Code Screen Overlay mapped onto the monitor */}
          <div
            className="absolute pointer-events-none overflow-hidden"
            style={{
              top: '38%',
              left: '42%',
              width: '28%',
              height: '24%',
              transform: 'perspective(600px) rotateY(-4deg) rotateX(2deg)',
              boxShadow: '0 0 40px rgba(56, 189, 248, 0.45)',
              borderRadius: '2px'
            }}
          >
            {/* Monitor Bezel Inner Screen Glow */}
            <div className="w-full h-full bg-[#07090f]/95 p-3 flex flex-col justify-between border border-cyan-500/30">
              <div className="space-y-1">
                <div className="flex items-center justify-between text-[7px] text-neutral-500 border-b border-white/5 pb-1 mb-1">
                  <span className="text-cyan-400">vss75_core.cpp — Clang++ 20</span>
                  <span>UTF-8</span>
                </div>
                {codeLines.slice(0, currentTextIndex).map((line, i) => (
                  <div key={i} className="text-[7.5px] leading-tight font-mono text-cyan-200/90 truncate">
                    <span className="text-neutral-600 mr-1.5 select-none">{i + 1}</span>
                    <span className={line.startsWith('//') ? 'text-neutral-500 italic' : line.includes('template') || line.includes('class') ? 'text-purple-300' : 'text-neutral-200'}>
                      {line}
                    </span>
                  </div>
                ))}
                <div className="w-1.5 h-3 bg-cyan-400 animate-pulse inline-block" />
              </div>

              {/* Sub-pixel scanlines */}
              <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.35)_50%)] bg-[length:100%_3px] pointer-events-none opacity-40" />
            </div>
          </div>
        </div>

        {/* SCENE 02 TRANSITION: CHROMATIC ABERRATION & HYPERSPACE WARP */}
        {isTransitionPhase && (
          <div className="absolute inset-0 pointer-events-none z-30 flex items-center justify-center">
            {/* Warp Speed Light Tunnel */}
            <div className="absolute inset-0 bg-radial from-cyan-400/30 via-transparent to-black animate-ping opacity-60" />
            <div className="w-full h-full flex items-center justify-center">
              <div className="w-64 h-64 rounded-full border-4 border-cyan-400 animate-ping opacity-75" />
            </div>
          </div>
        )}

        {/* SCENE 03: DIGITAL CONSCIOUSNESS & BRAND IDENTITY GENESIS */}
        {isDigitalPhase && (
          <div className="absolute inset-0 z-40 flex flex-col items-center justify-center text-center px-4 bg-[#050508] animate-fadeIn">
            {/* Subtle Quantum Grid in Background */}
            <div className="absolute inset-0 bg-grid-pattern opacity-25 pointer-events-none" />
            <div className="absolute w-[500px] h-[500px] rounded-full bg-cyan-500/10 blur-[120px] pointer-events-none" />

            <div className="relative z-10 max-w-3xl space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 text-xs text-cyan-400 font-mono tracking-widest uppercase">
                <Sparkles className="w-3.5 h-3.5" />
                <span>DIMENSIONAL TRANSITION COMPLETE</span>
              </div>

              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-white tracking-tight font-heading">
                LOHITH <span className="text-gradient-cyan">VARMA</span>
              </h1>

              <p className="text-xl sm:text-2xl font-medium text-neutral-300 font-display italic">
                &ldquo;Building my way into the future.&rdquo;
              </p>

              <p className="text-xs sm:text-sm text-neutral-400 font-mono max-w-lg mx-auto pt-2">
                Learning relentlessly. Building deliberately. Evolving continuously.
              </p>

              <div className="pt-6">
                <button
                  onClick={handleSkip}
                  className="px-6 py-3 rounded-full bg-cyan-500 hover:bg-cyan-400 text-black font-extrabold text-xs tracking-wider uppercase transition-all shadow-[0_0_30px_rgba(56,189,248,0.5)] hover:scale-105"
                >
                  Enter Digital Universe ➔
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* BOTTOM CONTROLS & TIMELINE SCRUBBER */}
      <div className="absolute bottom-[8vh] left-6 right-6 z-50 flex flex-col gap-2 pointer-events-auto">
        <div className="flex items-center justify-between text-[11px] font-mono text-neutral-400">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsPaused(!isPaused)}
              className="text-neutral-300 hover:text-white"
            >
              {isPaused ? <Play className="w-3.5 h-3.5 text-cyan-400" /> : <Pause className="w-3.5 h-3.5" />}
            </button>
            <span>{isPaused ? 'PAUSED' : 'PLAYING CINEMATIC SEQUENCE'}</span>
          </div>

          <span className="text-neutral-500">{Math.round(progress)}%</span>
        </div>

        {/* Timeline Scrubber Bar */}
        <div className="relative w-full h-1 bg-white/10 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-amber-400 via-cyan-400 to-emerald-400 transition-all duration-100"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  )
}
