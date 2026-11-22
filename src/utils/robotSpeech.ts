// Triple-Redundant Robot Voice Engine
// 1. High-fidelity pre-rendered studio dialogue audio (/audio/dialogue_lineX.wav)
// 2. Web Speech API synthesis fallback
// 3. Web Audio harmonic carrier blips fallback

class RobotSpeechEngine {
  private isMuted: boolean = false
  private audioCtx: AudioContext | null = null
  private currentAudioElement: HTMLAudioElement | null = null

  constructor() {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('lv_robot_sound_muted')
      this.isMuted = saved === 'true'
    }
  }

  public initAudioContext(): AudioContext | null {
    if (!this.audioCtx && typeof window !== 'undefined') {
      const AudioCtxClass =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
      if (AudioCtxClass) {
        this.audioCtx = new AudioCtxClass()
      }
    }
    if (this.audioCtx && this.audioCtx.state === 'suspended') {
      this.audioCtx.resume()
    }
    return this.audioCtx
  }

  public getIsMuted(): boolean {
    return this.isMuted
  }

  public setMuted(muted: boolean) {
    this.isMuted = muted
    if (typeof window !== 'undefined') {
      localStorage.setItem('lv_robot_sound_muted', String(muted))
      if (muted) {
        this.stop()
      }
    }
  }

  // Play pre-recorded WAV audio for lines 0 to 3
  public playLineAudio(lineIndex: number): Promise<boolean> {
    if (this.isMuted) {
      return Promise.resolve(false)
    }

    this.stop()
    this.initAudioContext()

    const soundFile = `/audio/dialogue_line${lineIndex + 1}.wav`

    return new Promise((resolve) => {
      try {
        const audio = new Audio(soundFile)
        this.currentAudioElement = audio
        audio.volume = 1.0

        audio.onended = () => {
          this.currentAudioElement = null
          resolve(true)
        }

        audio.onerror = (e) => {
          console.warn('[RobotAudio] File playback error, falling back to speech synthesis:', e)
          this.currentAudioElement = null
          resolve(false)
        }

        const playPromise = audio.play()
        if (playPromise !== undefined) {
          playPromise.catch((err) => {
            console.warn('[RobotAudio] Autoplay blocked, falling back to speech synthesis:', err)
            this.currentAudioElement = null
            resolve(false)
          })
        }
      } catch (err) {
        console.warn('[RobotAudio] Audio init error:', err)
        resolve(false)
      }
    })
  }

  // Melodic robotic carrier blip
  public playChirp(type: 'startup' | 'blip' | 'curious' | 'explore') {
    if (this.isMuted) return
    try {
      this.initAudioContext()
      if (!this.audioCtx) return

      const now = this.audioCtx.currentTime

      if (type === 'startup') {
        const notes = [440, 554.37, 659.25, 880]
        notes.forEach((freq, idx) => {
          const osc = this.audioCtx!.createOscillator()
          const gain = this.audioCtx!.createGain()
          osc.type = 'sine'
          const t = now + idx * 0.06
          osc.frequency.setValueAtTime(freq, t)
          gain.gain.setValueAtTime(0.04, t)
          gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.25)
          osc.connect(gain)
          gain.connect(this.audioCtx!.destination)
          osc.start(t)
          osc.stop(t + 0.25)
        })
      } else if (type === 'curious') {
        const osc = this.audioCtx.createOscillator()
        const gain = this.audioCtx.createGain()
        osc.type = 'triangle'
        osc.frequency.setValueAtTime(480, now)
        osc.frequency.exponentialRampToValueAtTime(880, now + 0.16)
        gain.gain.setValueAtTime(0.035, now)
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.16)
        osc.connect(gain)
        gain.connect(this.audioCtx.destination)
        osc.start(now)
        osc.stop(now + 0.16)
      } else if (type === 'explore') {
        const freqs = [659.25, 830.61, 987.77, 1318.51]
        freqs.forEach((freq, i) => {
          const osc = this.audioCtx!.createOscillator()
          const gain = this.audioCtx!.createGain()
          osc.type = 'sine'
          const t = now + i * 0.05
          osc.frequency.setValueAtTime(freq, t)
          gain.gain.setValueAtTime(0.04, t)
          gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.35)
          osc.connect(gain)
          gain.connect(this.audioCtx!.destination)
          osc.start(t)
          osc.stop(t + 0.35)
        })
      } else {
        const osc = this.audioCtx.createOscillator()
        const gain = this.audioCtx.createGain()
        osc.type = 'sine'
        const freq = 680 + Math.random() * 200
        osc.frequency.setValueAtTime(freq, now)
        gain.gain.setValueAtTime(0.025, now)
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.05)
        osc.connect(gain)
        gain.connect(this.audioCtx.destination)
        osc.start(now)
        osc.stop(now + 0.05)
      }
    } catch {
      // Ignore
    }
  }

  // Web Speech API fallback
  public speak(text: string, onEnd?: () => void) {
    this.speakFallback(text, onEnd)
  }

  public speakFallback(text: string, onEnd?: () => void) {
    if (this.isMuted || typeof window === 'undefined' || !('speechSynthesis' in window)) {
      onEnd?.()
      return
    }

    try {
      window.speechSynthesis.cancel()
      const utterance = new SpeechSynthesisUtterance(text)

      const voices = window.speechSynthesis.getVoices()
      const preferred =
        voices.find(
          (v) =>
            v.lang.startsWith('en') &&
            (v.name.includes('Natural') ||
              v.name.includes('Google') ||
              v.name.includes('Samantha') ||
              v.name.includes('David') ||
              v.name.includes('Daniel') ||
              v.name.includes('Alex'))
        ) ||
        voices.find((v) => v.lang.startsWith('en')) ||
        voices[0]

      if (preferred) {
        utterance.voice = preferred
      }

      utterance.pitch = 1.05
      utterance.rate = 1.0
      utterance.volume = 1.0

      utterance.onstart = () => {
        this.playChirp('blip')
      }

      utterance.onend = () => {
        onEnd?.()
      }

      utterance.onerror = () => {
        onEnd?.()
      }

      window.speechSynthesis.speak(utterance)
    } catch {
      onEnd?.()
    }
  }

  // Universal speak: Try real audio file first; if unplayable or blocked, fallback to Web Speech
  public async speakDialogue(lineIndex: number, text: string, onEnd?: () => void) {
    if (this.isMuted) {
      onEnd?.()
      return
    }

    // Try playing the pre-recorded crystal-clear WAV audio
    const played = await this.playLineAudio(lineIndex)
    if (played) {
      onEnd?.()
    } else {
      // Fallback to speech synthesis
      this.speakFallback(text, onEnd)
    }
  }

  public stop() {
    if (this.currentAudioElement) {
      this.currentAudioElement.pause()
      this.currentAudioElement.currentTime = 0
      this.currentAudioElement = null
    }
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel()
    }
  }
}

export const robotSpeech = new RobotSpeechEngine()
