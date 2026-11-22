import React from 'react'
import { ArrowRight, Mail } from 'lucide-react'
import { sound } from '../../utils/sound'
import { DeveloperAvatar3D } from '../3d/DeveloperAvatar3D'
import { usePortfolioData } from '../../context/PortfolioDataContext'

export const HeroSection: React.FC = () => {
  const { personalInfo } = usePortfolioData()

  const scrollToProjects = () => {
    sound.playClick()
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })
  }

  const scrollToContact = () => {
    sound.playClick()
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      id="hero"
      className="relative min-h-[92vh] flex flex-col justify-center items-center pt-24 pb-12 px-4 sm:px-6 lg:px-8 text-center overflow-hidden"
    >
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[350px] bg-cyan-500/[0.08] rounded-full blur-[140px] pointer-events-none -z-10" />

      {/* Status Pill Badge with Profile Pic */}
      <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.08] backdrop-blur-xl mb-4">
        <img
          src={personalInfo.photoUrl || '/lohith_varma.png'}
          onError={(e) => {
            e.currentTarget.src = '/lohith_varma.png'
          }}
          alt={personalInfo.name}
          className="w-5 h-5 rounded-full object-cover border border-cyan-400/50 shrink-0"
        />
        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
        <span className="text-[11px] font-mono tracking-wider text-neutral-300 uppercase">
          {personalInfo.statusBadge}
        </span>
      </div>

      {/* Main Title & Role */}
      <div className="max-w-4xl mx-auto space-y-2">
        <h1 className="text-5xl sm:text-7xl md:text-8xl font-extrabold tracking-tight text-white font-heading leading-tight">
          {personalInfo.name}
        </h1>

        <p className="text-xl sm:text-2xl md:text-3xl font-medium text-transparent bg-clip-text bg-gradient-to-r from-neutral-200 via-cyan-200 to-blue-400 font-display">
          {personalInfo.title}
        </p>

        <p className="text-sm sm:text-base text-neutral-400 max-w-xl mx-auto font-normal pt-2 leading-relaxed">
          {personalInfo.bio}
        </p>
      </div>

      {/* Moncy Dev Signature: Interactive 3D Developer Avatar (Tracks Mouse) */}
      <div className="relative w-full max-w-lg mx-auto h-[360px] sm:h-[420px] md:h-[460px] my-3 flex items-center justify-center">
        <DeveloperAvatar3D />
      </div>

      {/* Precise Action Buttons */}
      <div className="flex flex-wrap items-center justify-center gap-4 pt-3 relative z-20">
        <button
          onClick={scrollToProjects}
          onMouseEnter={() => sound.playHover()}
          className="px-7 py-3.5 rounded-full bg-white text-black font-semibold text-xs tracking-wider uppercase transition-all flex items-center gap-2 shadow-[0_0_25px_rgba(255,255,255,0.2)] hover:bg-neutral-200 hover:scale-105 cursor-pointer"
        >
          <span>View Projects</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>

        <button
          onClick={scrollToContact}
          onMouseEnter={() => sound.playHover()}
          className="px-7 py-3.5 rounded-full bg-white/[0.06] hover:bg-white/[0.12] border border-white/15 text-white font-mono text-xs tracking-wider uppercase transition-all flex items-center gap-2 backdrop-blur-xl hover:scale-105 cursor-pointer"
        >
          <Mail className="w-3.5 h-3.5 text-cyan-400" />
          <span>Get In Touch</span>
        </button>
      </div>
    </section>
  )
}
