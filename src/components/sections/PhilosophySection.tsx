import React from 'react'
import { Quote } from 'lucide-react'
import { philosophyData } from '../../data/philosophy'
import { SpotlightCard } from '../common/SpotlightCard'

export const PhilosophySection: React.FC = () => {
  return (
    <section id="philosophy" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 border-b border-white/[0.08] pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono tracking-widest text-neutral-400 uppercase mb-2">
            <span className="w-2 h-2 rounded-full bg-cyan-400" />
            <span>06 / ENGINEERING ETHOS & MANIFESTO</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white font-heading">
            First Principles & Tenets
          </h2>
          <p className="text-neutral-400 text-sm sm:text-base max-w-xl mt-2">
            The philosophical compass that guides my technical decisions, architecture, and craftsmanship as a builder.
          </p>
        </div>

        <div className="text-xs font-mono text-neutral-400 self-start md:self-auto">
          CRAFT • SPEED • DISCIPLINE
        </div>
      </div>

      {/* Hero Quote Card */}
      <div className="mb-12 p-8 sm:p-10 rounded-2xl bg-gradient-to-r from-cyan-950/20 via-black to-blue-950/20 border border-cyan-500/20 shadow-2xl relative overflow-hidden">
        <Quote className="absolute top-4 right-4 w-16 h-16 text-cyan-500/10 pointer-events-none" />
        <div className="relative z-10 max-w-3xl space-y-4">
          <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest">
            BRAND CORE STATEMENT
          </span>
          <p className="text-2xl sm:text-3xl font-bold text-white font-display leading-snug">
            &ldquo;Learning relentlessly. Building deliberately. Evolving continuously.&rdquo;
          </p>
          <p className="text-xs sm:text-sm text-neutral-400 font-mono">
            True confidence does not require loud self-promotion. It communicates itself through design quality, systems resilience, and relentless attention to detail.
          </p>
        </div>
      </div>

      {/* Grid of 4 Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {philosophyData.map((principle) => (
          <SpotlightCard key={principle.number} className="flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-2xl font-black font-mono text-cyan-400/40">
                  {principle.number}
                </span>
                <span className="text-[10px] font-mono text-neutral-500 uppercase tracking-wider">
                  CORE TENET
                </span>
              </div>

              <div>
                <h3 className="text-lg sm:text-xl font-bold text-white font-heading">
                  {principle.title}
                </h3>
                <p className="text-xs sm:text-sm font-semibold text-cyan-300 mt-1 font-mono">
                  {principle.thesis}
                </p>
              </div>

              <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">
                {principle.description}
              </p>
            </div>

            <div className="pt-4 border-t border-white/[0.06] text-xs italic text-neutral-300 font-mono">
              &ldquo;{principle.quote}&rdquo;
            </div>
          </SpotlightCard>
        ))}
      </div>
    </section>
  )
}
