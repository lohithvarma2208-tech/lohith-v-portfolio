import React, { useState } from 'react'
import { ArrowUpRight } from 'lucide-react'
import type { Project } from '../../types'
import { SpotlightCard } from '../common/SpotlightCard'
import { Badge } from '../common/Badge'
import { ProjectModal } from './ProjectModal'
import { sound } from '../../utils/sound'
import { usePortfolioData } from '../../context/PortfolioDataContext'

export const ProjectsSection: React.FC = () => {
  const { projects } = usePortfolioData()
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)

  const handleOpenProject = (p: Project) => {
    sound.playChime()
    setSelectedProject(p)
  }

  // Display all active projects (or top 6)
  const featured = projects.slice(0, 6)

  return (
    <section id="projects" className="py-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto relative">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10 border-b border-white/[0.08] pb-5">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono tracking-widest text-neutral-400 uppercase mb-1">
            <span className="w-2 h-2 rounded-full bg-cyan-400" />
            <span>01 / SELECTED WORK</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white font-heading">
            Featured Projects
          </h2>
        </div>
        <p className="text-xs sm:text-sm text-neutral-400 max-w-sm">
          High-performance distributed systems, low-level storage engines, and browser runtimes.
        </p>
      </div>

      {/* Modern Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {featured.map((project, idx) => (
          <SpotlightCard
            key={project.id}
            id={`card-${project.id}`}
            className="flex flex-col justify-between group cursor-pointer p-6 sm:p-7"
            onClick={() => handleOpenProject(project)}
          >
            <div className="space-y-3">
              {/* Card Meta */}
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-neutral-500">
                  0{idx + 1}
                </span>
                <Badge variant={project.featured ? 'accent' : 'outline'} size="sm">
                  {project.category}
                </Badge>
              </div>

              {/* Title & Concise Subtitle */}
              <div>
                <div className="flex items-center justify-between">
                  <h3 className="text-xl sm:text-2xl font-bold text-white group-hover:text-cyan-300 transition-colors font-heading">
                    {project.title}
                  </h3>
                  <div className="p-1 rounded-full bg-white/5 group-hover:bg-cyan-500/20 group-hover:text-cyan-300 transition-colors">
                    <ArrowUpRight className="w-4 h-4" />
                  </div>
                </div>
                <p className="text-xs text-neutral-400 font-mono mt-0.5">
                  {project.subtitle}
                </p>
              </div>

              {/* Precise 1-2 sentence description */}
              <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed line-clamp-2">
                {project.description}
              </p>

              {/* 2 Key Metrics */}
              <div className="grid grid-cols-2 gap-2 pt-1">
                {project.metrics.slice(0, 2).map((m, mIdx) => (
                  <div
                    key={mIdx}
                    className="px-3 py-2 rounded-lg bg-black/40 border border-white/[0.06]"
                  >
                    <div className="text-[10px] font-mono text-neutral-400 uppercase">
                      {m.label}
                    </div>
                    <div className="text-xs font-bold text-white font-mono mt-0.5">
                      {m.value}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Card Footer: Tech Stack Badges */}
            <div className="pt-4 mt-4 border-t border-white/[0.07] flex items-center justify-between">
              <div className="flex flex-wrap gap-1.5">
                {project.techStack.slice(0, 3).map((tech, tIdx) => (
                  <span
                    key={tIdx}
                    className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/[0.04] text-neutral-300 border border-white/[0.05]"
                  >
                    {tech}
                  </span>
                ))}
              </div>
              <span className="text-xs font-mono text-cyan-400 group-hover:underline">
                Inspect →
              </span>
            </div>
          </SpotlightCard>
        ))}
      </div>

      {/* Project Architecture Deep-Dive Modal */}
      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </section>
  )
}
