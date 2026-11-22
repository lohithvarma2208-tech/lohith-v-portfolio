import React, { useEffect } from 'react'
import { X, ExternalLink, Cpu, CheckCircle2, AlertTriangle, Layers } from 'lucide-react'
import { GithubIcon } from '../common/Icons'
import type { Project } from '../../types'
import { sound } from '../../utils/sound'
import { Badge } from '../common/Badge'

interface ProjectModalProps {
  project: Project | null
  onClose: () => void
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }
    if (project) {
      document.body.style.overflow = 'hidden'
      window.addEventListener('keydown', handleKeyDown)
    }
    return () => {
      document.body.style.overflow = 'unset'
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [project, onClose])

  if (!project) return null

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div
        className="relative w-full max-w-4xl max-h-[90vh] bg-[#090b12] border border-white/20 rounded-2xl shadow-[0_25px_80px_rgba(0,0,0,0.95)] flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-[#0d101a] border-b border-white/10">
          <div className="flex items-center gap-3">
            <Badge variant="accent" dot>
              {project.category}
            </Badge>
            <span className="text-xs font-mono text-neutral-400">
              ARCHITECTURAL SPECIFICATION • {project.year}
            </span>
          </div>

          <button
            onClick={() => {
              sound.playClick()
              onClose()
            }}
            className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-neutral-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Content */}
        <div className="overflow-y-auto p-6 space-y-6">
          {/* Title & Subtitle */}
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white font-heading">
              {project.title}
            </h2>
            <p className="text-sm sm:text-base text-neutral-400 mt-1">
              {project.subtitle}
            </p>
          </div>

          {/* Metrics Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {project.metrics.map((m, idx) => (
              <div
                key={idx}
                className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.07]"
              >
                <div className="text-[11px] font-mono text-neutral-400 uppercase">
                  {m.label}
                </div>
                <div className="text-lg font-bold text-cyan-300 font-mono mt-0.5">
                  {m.value}
                </div>
              </div>
            ))}
          </div>

          {/* Architecture Overview */}
          <div className="space-y-2">
            <h3 className="text-xs font-mono uppercase tracking-wider text-neutral-400 flex items-center gap-2">
              <Cpu className="w-3.5 h-3.5 text-cyan-400" />
              <span>Systems Architecture Overview</span>
            </h3>
            <p className="text-sm text-neutral-300 leading-relaxed bg-[#0b0d14] p-4 rounded-xl border border-white/5">
              {project.architectureOverview}
            </p>
          </div>

          {/* System Diagram ASCII */}
          {project.systemDiagramText && (
            <div className="space-y-2">
              <h3 className="text-xs font-mono uppercase tracking-wider text-neutral-400 flex items-center gap-2">
                <Layers className="w-3.5 h-3.5 text-emerald-400" />
                <span>Data Flow & Topology</span>
              </h3>
              <pre className="p-4 rounded-xl bg-black border border-white/10 text-xs font-mono text-cyan-400 overflow-x-auto leading-tight">
                {project.systemDiagramText}
              </pre>
            </div>
          )}

          {/* Key Features */}
          <div className="space-y-2">
            <h3 className="text-xs font-mono uppercase tracking-wider text-neutral-400 flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
              <span>Key Technical Engineering Decisions</span>
            </h3>
            <ul className="space-y-2">
              {project.keyFeatures.map((feat, i) => (
                <li
                  key={i}
                  className="flex items-start gap-2.5 text-xs sm:text-sm text-neutral-300"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-2 flex-shrink-0" />
                  <span>{feat}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Challenges & Trade-offs */}
          <div className="space-y-2">
            <h3 className="text-xs font-mono uppercase tracking-wider text-amber-400 flex items-center gap-2">
              <AlertTriangle className="w-3.5 h-3.5" />
              <span>Critical Bottlenecks & Trade-offs Solved</span>
            </h3>
            <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed bg-amber-500/[0.04] p-4 rounded-xl border border-amber-500/20">
              {project.challengesSolved}
            </p>
          </div>

          {/* Tech Stack Pills */}
          <div className="space-y-2">
            <h3 className="text-xs font-mono uppercase tracking-wider text-neutral-400">
              Technology Stack
            </h3>
            <div className="flex flex-wrap gap-2">
              {project.techStack.map((tech, i) => (
                <span
                  key={i}
                  className="px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-xs font-mono text-neutral-300"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Footer Actions */}
        <div className="flex items-center justify-between px-6 py-4 bg-[#0d101a] border-t border-white/10">
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noreferrer"
            onMouseEnter={() => sound.playHover()}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-mono transition-colors"
          >
            <GithubIcon className="w-4 h-4" />
            <span>View Source Repository</span>
          </a>

          {project.demoUrl && (
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noreferrer"
              onMouseEnter={() => sound.playHover()}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black font-semibold text-xs font-mono transition-colors"
            >
              <span>Launch Live Interface</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          )}
        </div>
      </div>
    </div>
  )
}
