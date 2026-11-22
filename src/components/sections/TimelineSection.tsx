import React from 'react'
import { CheckCircle2, CircleDot, MapPin, Mail } from 'lucide-react'
import { GithubIcon, LinkedinIcon } from '../common/Icons'
import { SpotlightCard } from '../common/SpotlightCard'
import { Badge } from '../common/Badge'
import { sound } from '../../utils/sound'
import { usePortfolioData } from '../../context/PortfolioDataContext'
import type { TimelineItem } from '../../types'

export const TimelineSection: React.FC = () => {
  const { personalInfo, contactInfo, timeline } = usePortfolioData()

  return (
    <section id="journey" className="py-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto relative">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10 border-b border-white/[0.08] pb-5">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono tracking-widest text-neutral-400 uppercase mb-1">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span>03 / ABOUT & TRAJECTORY</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white font-heading">
            The Builder & Milestones
          </h2>
        </div>
        <p className="text-xs sm:text-sm text-neutral-400 max-w-sm">
          {personalInfo.bio}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Authentic Builder Profile Card (5 cols) */}
        <div className="lg:col-span-5 lg:sticky lg:top-24">
          <SpotlightCard className="p-5 sm:p-6 space-y-5">
            {/* Real Portrait Photo */}
            <div className="relative w-full aspect-[4/5] rounded-xl overflow-hidden border border-white/10 shadow-2xl group">
              <img
                src={personalInfo.photoUrl || '/lohith_varma.png'}
                onError={(e) => {
                  e.currentTarget.src = '/lohith_varma.png'
                }}
                alt={personalInfo.name}
                className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />

              {/* Bottom Photo Overlay */}
              <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs font-mono">
                <span className="px-2.5 py-1 rounded-md bg-black/60 backdrop-blur-md border border-white/15 text-white font-semibold">
                  {personalInfo.name}
                </span>
                <span className="px-2 py-1 rounded-md bg-emerald-500/20 backdrop-blur-md border border-emerald-500/30 text-emerald-300 text-[11px] flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Available 2027
                </span>
              </div>
            </div>

            {/* Profile Bio Details */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-mono text-neutral-400">
                <span className="flex items-center gap-1 text-neutral-300">
                  <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                  {personalInfo.location}
                </span>
                <span className="text-cyan-400 font-semibold">CS Undergrad</span>
              </div>

              <p className="text-xs text-neutral-300 leading-relaxed font-sans">
                {personalInfo.bio}
              </p>

              <blockquote className="text-[11px] font-mono italic text-neutral-400 border-l-2 border-cyan-400/50 pl-2.5 py-0.5">
                &ldquo;{personalInfo.tagline}&rdquo;
              </blockquote>
            </div>

            {/* Direct Connect Buttons */}
            <div className="flex items-center gap-2 pt-1 border-t border-white/[0.08]">
              <a
                href={contactInfo.githubUrl}
                target="_blank"
                rel="noreferrer"
                onMouseEnter={() => sound.playHover()}
                className="flex-1 py-2 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-xs font-mono text-neutral-300 hover:text-white transition-colors flex items-center justify-center gap-1.5"
                title={`GitHub: ${contactInfo.githubUsername}`}
              >
                <GithubIcon className="w-3.5 h-3.5" />
                <span>GitHub</span>
              </a>

              <a
                href={contactInfo.linkedinUrl}
                target="_blank"
                rel="noreferrer"
                onMouseEnter={() => sound.playHover()}
                className="flex-1 py-2 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-xs font-mono text-neutral-300 hover:text-white transition-colors flex items-center justify-center gap-1.5"
                title="LinkedIn Profile"
              >
                <LinkedinIcon className="w-3.5 h-3.5" />
                <span>LinkedIn</span>
              </a>

              <a
                href={`mailto:${contactInfo.email}`}
                onMouseEnter={() => sound.playHover()}
                className="p-2 rounded-lg bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 text-cyan-300 transition-colors flex items-center justify-center"
                title={`Email: ${contactInfo.email}`}
              >
                <Mail className="w-3.5 h-3.5" />
              </a>
            </div>
          </SpotlightCard>
        </div>

        {/* Right Column: Concise Timeline Stream (7 cols) */}
        <div className="lg:col-span-7 relative border-l border-white/10 ml-3 sm:ml-6 pl-5 sm:pl-8 space-y-6">
          {timeline.map((item: TimelineItem) => (
            <div key={item.id} className="relative group">
              {/* Timeline Dot */}
              <div className="absolute -left-[27px] sm:-left-[39px] top-3 flex items-center justify-center w-5 h-5 rounded-full bg-[#050508] border border-white/20 group-hover:border-cyan-400 transition-colors">
                {item.status === 'current' ? (
                  <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                ) : item.status === 'completed' ? (
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                ) : (
                  <CircleDot className="w-3 h-3 text-neutral-500" />
                )}
              </div>

              {/* Timeline Card */}
              <SpotlightCard className="p-5 sm:p-6 space-y-2.5">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold text-cyan-400 bg-cyan-500/10 px-2.5 py-0.5 rounded border border-cyan-500/20">
                      {item.year}
                    </span>
                    <Badge variant={item.status === 'current' ? 'accent' : 'outline'} size="sm">
                      {item.period}
                    </Badge>
                  </div>
                  <span className="text-xs font-mono text-neutral-400">
                    {item.organization}
                  </span>
                </div>

                <div>
                  <h3 className="text-base sm:text-lg font-bold text-white font-heading">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-neutral-300 mt-1 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                {/* Concise Highlights */}
                <div className="pt-2 border-t border-white/[0.06] flex flex-wrap gap-2">
                  {item.achievements.slice(0, 2).map((ach, i) => (
                    <span
                      key={i}
                      className="text-[11px] font-mono text-neutral-400 bg-white/[0.02] px-2 py-0.5 rounded"
                    >
                      • {ach}
                    </span>
                  ))}
                </div>
              </SpotlightCard>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
