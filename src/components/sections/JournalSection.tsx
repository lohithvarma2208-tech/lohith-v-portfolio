import React, { useState } from 'react'
import { ArrowUpRight, Clock } from 'lucide-react'
import { essaysData } from '../../data/essays'
import type { Essay } from '../../types'
import { SpotlightCard } from '../common/SpotlightCard'
import { Badge } from '../common/Badge'
import { ArticleReaderModal } from './ArticleReaderModal'
import { sound } from '../../utils/sound'

export const JournalSection: React.FC = () => {
  const [selectedEssay, setSelectedEssay] = useState<Essay | null>(null)

  const handleOpenEssay = (essay: Essay) => {
    sound.playChime()
    setSelectedEssay(essay)
  }

  return (
    <section id="journal" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 border-b border-white/[0.08] pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono tracking-widest text-neutral-400 uppercase mb-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span>02 / ENGINEERING JOURNAL & ESSAYS</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white font-heading">
            Thought & Systems Rigor
          </h2>
          <p className="text-neutral-400 text-sm sm:text-base max-w-xl mt-2">
            Dispatches from the metal: architectural post-mortems, storage mechanics, agent runtimes, and the mathematics of frame latency.
          </p>
        </div>

        <div className="text-xs font-mono text-neutral-400 self-start md:self-auto">
          PUBLISHED PAPERS & ESSAYS ({essaysData.length})
        </div>
      </div>

      {/* Essays Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {essaysData.map((essay) => (
          <SpotlightCard
            key={essay.id}
            className="flex flex-col justify-between group cursor-pointer"
            onClick={() => handleOpenEssay(essay)}
          >
            <div className="space-y-4">
              {/* Meta strip */}
              <div className="flex items-center justify-between text-xs font-mono text-neutral-400">
                <div className="flex items-center gap-2">
                  <span>{essay.date}</span>
                  <span>•</span>
                  <span className="text-cyan-400 flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {essay.readTime}
                  </span>
                </div>

                <div className="p-1 rounded-full bg-white/5 group-hover:bg-emerald-500/20 group-hover:text-emerald-300 transition-colors">
                  <ArrowUpRight className="w-4 h-4" />
                </div>
              </div>

              {/* Title & Subtitle */}
              <div>
                <h3 className="text-lg sm:text-xl font-bold text-white group-hover:text-emerald-300 transition-colors font-heading leading-snug">
                  {essay.title}
                </h3>
                <p className="text-xs sm:text-sm text-neutral-400 mt-1 line-clamp-1">
                  {essay.subtitle}
                </p>
              </div>

              {/* Excerpt */}
              <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed line-clamp-3">
                {essay.excerpt}
              </p>
            </div>

            {/* Bottom tags */}
            <div className="pt-6 mt-6 border-t border-white/[0.07] flex items-center justify-between">
              <div className="flex flex-wrap gap-1.5">
                {essay.tags.slice(0, 3).map((tag) => (
                  <Badge key={tag} variant="outline">
                    {tag}
                  </Badge>
                ))}
              </div>

              <span className="text-xs font-mono text-emerald-400 group-hover:underline">
                Read Essay →
              </span>
            </div>
          </SpotlightCard>
        ))}
      </div>

      {/* Reader Modal */}
      <ArticleReaderModal
        essay={selectedEssay}
        onClose={() => setSelectedEssay(null)}
      />
    </section>
  )
}
