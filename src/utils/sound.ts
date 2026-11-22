// Pure Web Audio API Sound Synthesizer
// Provides subtle, tactile sonic feedback without external audio assets

class SoundEngine {
  private ctx: AudioContext | null = null
  private isMuted: boolean = false

  constructor() {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('lv_sound_enabled')
      this.isMuted = saved === 'false'
    }
  }

  private initContext() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioContextClass =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
      if (AudioContextClass) {
        this.ctx = new AudioContextClass()
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume()
    }
  }

  public toggleMute(): boolean {
    this.isMuted = !this.isMuted
    if (typeof window !== 'undefined') {
      localStorage.setItem('lv_sound_enabled', String(!this.isMuted))
    }
    if (!this.isMuted) {
      this.playChime()
    }
    return !this.isMuted
  }

  public getIsMuted(): boolean {
    return this.isMuted
  }

  // Subtle tick on interactive element hover
  public playHover() {
    if (this.isMuted) return
    try {
      this.initContext()
      if (!this.ctx) return

      const osc = this.ctx.createOscillator()
      const gain = this.ctx.createGain()

      osc.type = 'sine'
      const now = this.ctx.currentTime
      osc.frequency.setValueAtTime(1200, now)
      osc.frequency.exponentialRampToValueAtTime(700, now + 0.025)

      gain.gain.setValueAtTime(0.015, now)
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.025)

      osc.connect(gain)
      gain.connect(this.ctx.destination)

      osc.start(now)
      osc.stop(now + 0.025)
    } catch {
      // Ignore
    }
  }

  // Tactile click on button press
  public playClick() {
    if (this.isMuted) return
    try {
      this.initContext()
      if (!this.ctx) return

      const osc = this.ctx.createOscillator()
      const gain = this.ctx.createGain()

      osc.type = 'triangle'
      const now = this.ctx.currentTime
      osc.frequency.setValueAtTime(480, now)
      osc.frequency.exponentialRampToValueAtTime(140, now + 0.04)

      gain.gain.setValueAtTime(0.04, now)
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.04)

      osc.connect(gain)
      gain.connect(this.ctx.destination)

      osc.start(now)
      osc.stop(now + 0.04)
    } catch {
      // Ignore
    }
  }

  // High-tech modal or command menu opening chime
  public playChime() {
    if (this.isMuted) return
    try {
      this.initContext()
      if (!this.ctx) return

      const now = this.ctx.currentTime
      const freqs = [523.25, 659.25, 783.99] // C5, E5, G5 triad

      freqs.forEach((freq, i) => {
        const osc = this.ctx!.createOscillator()
        const gain = this.ctx!.createGain()

        osc.type = 'sine'
        const delay = i * 0.04
        osc.frequency.setValueAtTime(freq, now + delay)

        gain.gain.setValueAtTime(0.025, now + delay)
        gain.gain.exponentialRampToValueAtTime(0.0001, now + delay + 0.2)

        osc.connect(gain)
        gain.connect(this.ctx!.destination)

        osc.start(now + delay)
        osc.stop(now + delay + 0.2)
      })
    } catch {
      // Ignore
    }
  }

  // Terminal keystroke blip
  public playKeystroke() {
    if (this.isMuted) return
    try {
      this.initContext()
      if (!this.ctx) return

      const osc = this.ctx.createOscillator()
      const gain = this.ctx.createGain()

      osc.type = 'sine'
      const now = this.ctx.currentTime
      const randFreq = 750 + Math.random() * 150
      osc.frequency.setValueAtTime(randFreq, now)

      gain.gain.setValueAtTime(0.02, now)
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.015)

      osc.connect(gain)
      gain.connect(this.ctx.destination)

      osc.start(now)
      osc.stop(now + 0.015)
    } catch {
      // Ignore
    }
  }

  // Sphere / physics collision pop
  public playCollision() {
    if (this.isMuted) return
    try {
      this.initContext()
      if (!this.ctx) return

      const osc = this.ctx.createOscillator()
      const gain = this.ctx.createGain()

      osc.type = 'triangle'
      const now = this.ctx.currentTime
      const pitch = 220 + Math.random() * 140
      osc.frequency.setValueAtTime(pitch, now)
      osc.frequency.exponentialRampToValueAtTime(80, now + 0.035)

      gain.gain.setValueAtTime(0.02, now)
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.035)

      osc.connect(gain)
      gain.connect(this.ctx.destination)

      osc.start(now)
      osc.stop(now + 0.035)
    } catch {
      // Ignore
    }
  }

  // Success dispatch sound
  public playSuccess() {
    if (this.isMuted) return
    try {
      this.initContext()
      if (!this.ctx) return

      const now = this.ctx.currentTime
      const notes = [440, 554.37, 659.25, 880]

      notes.forEach((freq, idx) => {
        const osc = this.ctx!.createOscillator()
        const gain = this.ctx!.createGain()

        osc.type = 'sine'
        const startTime = now + idx * 0.06
        osc.frequency.setValueAtTime(freq, startTime)

        gain.gain.setValueAtTime(0.04, startTime)
        gain.gain.exponentialRampToValueAtTime(0.0001, startTime + 0.3)

        osc.connect(gain)
        gain.connect(this.ctx!.destination)

        osc.start(startTime)
        osc.stop(startTime + 0.3)
      })
    } catch {
      // Ignore
    }
  }
}

export const sound = new SoundEngine()
