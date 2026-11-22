// Pure Web Audio API Cinematic Soundscape
// Generates realistic room tone, keyboard typing, fan hum, and spatial warp transitions

class CinematicAudioEngine {
  private ctx: AudioContext | null = null
  private isMuted: boolean = false
  private isPlaying: boolean = false

  // Ambient nodes
  private roomGain: GainNode | null = null
  private typingTimer: number | null = null
  private fanGain: GainNode | null = null

  constructor() {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('lv_sound_enabled')
      this.isMuted = saved === 'false'
    }
  }

  private init() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
      if (AudioCtx) {
        this.ctx = new AudioCtx()
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume()
    }
  }

  public setMuted(muted: boolean) {
    this.isMuted = muted
    if (this.roomGain && this.ctx) {
      this.roomGain.gain.setTargetAtTime(muted ? 0 : 0.08, this.ctx.currentTime, 0.1)
    }
  }

  // Start Room Ambience: Sub-bass room tone + gentle computer fan + occasional keyboard clicks
  public startRoomAmbience() {
    if (this.isMuted || this.isPlaying) return
    try {
      this.init()
      if (!this.ctx) return
      this.isPlaying = true

      const now = this.ctx.currentTime

      // 1. Sub-bass Room Drone (55Hz / 58Hz binaural beat)
      const osc1 = this.ctx.createOscillator()
      const osc2 = this.ctx.createOscillator()
      osc1.type = 'sine'
      osc2.type = 'sine'
      osc1.frequency.setValueAtTime(55, now)
      osc2.frequency.setValueAtTime(58, now)

      this.roomGain = this.ctx.createGain()
      this.roomGain.gain.setValueAtTime(0.001, now)
      this.roomGain.gain.exponentialRampToValueAtTime(0.06, now + 2.0)

      const roomFilter = this.ctx.createBiquadFilter()
      roomFilter.type = 'lowpass'
      roomFilter.frequency.setValueAtTime(120, now)

      osc1.connect(roomFilter)
      osc2.connect(roomFilter)
      roomFilter.connect(this.roomGain)
      this.roomGain.connect(this.ctx.destination)

      osc1.start(now)
      osc2.start(now)

      // 2. Computer Fan Airflow (filtered pink noise)
      this.createFanNoise(now)

      // 3. Realistic Mechanical Keyboard Typing loop
      this.scheduleNextKeypress()
    } catch {
      // Audio fallback
    }
  }

  private createFanNoise(now: number) {
    if (!this.ctx) return
    const bufferSize = this.ctx.sampleRate * 2
    const noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate)
    const output = noiseBuffer.getChannelData(0)
    let b0 = 0, b1 = 0, b2 = 0
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1
      b0 = 0.99886 * b0 + white * 0.0555179
      b1 = 0.99332 * b1 + white * 0.0750759
      b2 = 0.96900 * b2 + white * 0.1538520
      output[i] = (b0 + b1 + b2 + white * 0.5362) * 0.03
    }

    const whiteNoise = this.ctx.createBufferSource()
    whiteNoise.buffer = noiseBuffer
    whiteNoise.loop = true

    const fanFilter = this.ctx.createBiquadFilter()
    fanFilter.type = 'bandpass'
    fanFilter.frequency.setValueAtTime(180, now)
    fanFilter.Q.setValueAtTime(1.5, now)

    this.fanGain = this.ctx.createGain()
    this.fanGain.gain.setValueAtTime(0.001, now)
    this.fanGain.gain.exponentialRampToValueAtTime(0.04, now + 2.5)

    whiteNoise.connect(fanFilter)
    fanFilter.connect(this.fanGain)
    this.fanGain.connect(this.ctx.destination)

    whiteNoise.start(now)
  }

  // Random natural human typing rhythm (bursts followed by pauses)
  private scheduleNextKeypress() {
    if (!this.isPlaying) return
    const isBurst = Math.random() > 0.35
    const delay = isBurst ? 90 + Math.random() * 140 : 450 + Math.random() * 900

    this.typingTimer = window.setTimeout(() => {
      this.playMechanicalKeyClick()
      this.scheduleNextKeypress()
    }, delay)
  }

  private playMechanicalKeyClick() {
    if (this.isMuted || !this.ctx || this.ctx.state === 'suspended') return
    try {
      const now = this.ctx.currentTime

      // Keycap bottom-out thud
      const osc = this.ctx.createOscillator()
      const gain = this.ctx.createGain()
      osc.type = 'triangle'
      const freq = 600 + Math.random() * 400
      osc.frequency.setValueAtTime(freq, now)
      osc.frequency.exponentialRampToValueAtTime(120, now + 0.02)

      const volume = 0.015 + Math.random() * 0.015
      gain.gain.setValueAtTime(volume, now)
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.02)

      osc.connect(gain)
      gain.connect(this.ctx.destination)

      osc.start(now)
      osc.stop(now + 0.025)
    } catch {
      // Ignore
    }
  }

  // Screen Dive Transition Whoosh (Warp into Digital Matrix)
  public playScreenDiveTransition() {
    if (this.isMuted) return
    try {
      this.init()
      if (!this.ctx) return
      const now = this.ctx.currentTime

      // Fade out room noise quickly
      if (this.roomGain) {
        this.roomGain.gain.setTargetAtTime(0.001, now, 0.4)
      }
      if (this.fanGain) {
        this.fanGain.gain.setTargetAtTime(0.001, now, 0.4)
      }

      // Rising cinematic frequency sweep
      const sweepOsc = this.ctx.createOscillator()
      const sweepGain = this.ctx.createGain()
      sweepOsc.type = 'sawtooth'
      sweepOsc.frequency.setValueAtTime(70, now)
      sweepOsc.frequency.exponentialRampToValueAtTime(1200, now + 1.2)

      const filter = this.ctx.createBiquadFilter()
      filter.type = 'lowpass'
      filter.frequency.setValueAtTime(200, now)
      filter.frequency.exponentialRampToValueAtTime(6000, now + 1.2)

      sweepGain.gain.setValueAtTime(0.01, now)
      sweepGain.gain.linearRampToValueAtTime(0.08, now + 1.0)
      sweepGain.gain.exponentialRampToValueAtTime(0.0001, now + 1.8)

      sweepOsc.connect(filter)
      filter.connect(sweepGain)
      sweepGain.connect(this.ctx.destination)

      sweepOsc.start(now)
      sweepOsc.stop(now + 1.8)

      // Celestial Arrival Chime
      const chords = [261.63, 392.00, 523.25, 659.25, 783.99, 1046.50] // C major 9th celestial chord
      chords.forEach((noteFreq, i) => {
        const chordOsc = this.ctx!.createOscillator()
        const chordGain = this.ctx!.createGain()
        chordOsc.type = 'sine'
        const start = now + 1.1 + i * 0.05
        chordOsc.frequency.setValueAtTime(noteFreq, start)

        chordGain.gain.setValueAtTime(0.03, start)
        chordGain.gain.exponentialRampToValueAtTime(0.0001, start + 2.5)

        chordOsc.connect(chordGain)
        chordGain.connect(this.ctx!.destination)

        chordOsc.start(start)
        chordOsc.stop(start + 2.5)
      })
    } catch {
      // Ignore
    }
  }

  public stopAll() {
    this.isPlaying = false
    if (this.typingTimer) {
      clearTimeout(this.typingTimer)
      this.typingTimer = null
    }
    if (this.roomGain && this.ctx) {
      try {
        this.roomGain.gain.setTargetAtTime(0, this.ctx.currentTime, 0.2)
      } catch {
        // Ignore
      }
    }
    if (this.fanGain && this.ctx) {
      try {
        this.fanGain.gain.setTargetAtTime(0, this.ctx.currentTime, 0.2)
      } catch {
        // Ignore
      }
    }
  }
}

export const cinematicAudio = new CinematicAudioEngine()
