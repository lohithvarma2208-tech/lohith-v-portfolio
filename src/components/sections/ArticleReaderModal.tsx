import React, { useEffect, useState } from 'react'
import { X, Clock, Calendar, Share2, Check, BookOpen } from 'lucide-react'
import type { Essay } from '../../types'
import { sound } from '../../utils/sound'
import { Badge } from '../common/Badge'

interface ArticleReaderModalProps {
  essay: Essay | null
  onClose: () => void
}

export const ArticleReaderModal: React.FC<ArticleReaderModalProps> = ({ essay, onClose }) => {
  const [copied, setCopied] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    if (essay) {
      document.body.style.overflow = 'hidden'
      window.addEventListener('keydown', handleKeyDown)
    }
    return () => {
      document.body.style.overflow = 'unset'
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [essay, onClose])

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const { scrollTop, scrollHeight, clientHeight } = e.currentTarget
    const progress = (scrollTop / (scrollHeight - clientHeight)) * 100
    setScrollProgress(progress)
  }

  const handleShare = () => {
    sound.playSuccess()
    navigator.clipboard.writeText(window.location.href)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  if (!essay) return null

  return (
    <div className="fixed inset-0 z-[115] flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div
        className="relative w-full max-w-3xl max-h-[92vh] bg-[#08090f] border border-white/20 rounded-2xl shadow-[0_25px_80px_rgba(0,0,0,0.95)] flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Reading Progress Bar */}
        <div
          className="absolute top-0 left-0 h-1 bg-gradient-to-r from-cyan-400 to-emerald-400 z-50 transition-all duration-75"
          style={{ width: `${scrollProgress}%` }}
        />

        {/* Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 bg-[#0d101a] border-b border-white/10">
          <div className="flex items-center gap-3">
            <BookOpen className="w-4 h-4 text-cyan-400" />
            <span className="text-xs font-mono text-neutral-400 uppercase">
              ENGINEERING JOURNAL ESSAY
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleShare}
              onMouseEnter={() => sound.playHover()}
              className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-neutral-400 hover:text-white transition-colors"
              title="Copy Link"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Share2 className="w-4 h-4" />}
            </button>
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
        </div>

        {/* Scrollable Essay Content */}
        <div
          onScroll={handleScroll}
          className="overflow-y-auto px-6 sm:px-10 py-8 space-y-6 text-neutral-200"
        >
          {/* Metadata */}
          <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-neutral-400">
            <span className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5" />
              {essay.date}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5 text-cyan-300">
              <Clock className="w-3.5 h-3.5" />
              {essay.readTime}
            </span>
          </div>

          {/* Title & Subtitle */}
          <div>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight font-heading leading-tight">
              {essay.title}
            </h1>
            <p className="text-base sm:text-lg text-neutral-400 mt-2 font-display italic">
              {essay.subtitle}
            </p>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 pt-1 pb-4 border-b border-white/10">
            {essay.tags.map((tag) => (
              <Badge key={tag} variant="outline">
                {tag}
              </Badge>
            ))}
          </div>

          {/* Excerpt callout */}
          <div className="p-4 rounded-xl bg-cyan-500/[0.05] border border-cyan-500/20 text-neutral-300 text-sm italic leading-relaxed">
            &ldquo;{essay.excerpt}&rdquo;
          </div>

          {/* Paragraphs */}
          <div className="space-y-5 text-sm sm:text-base leading-relaxed text-neutral-300 font-normal">
            {essay.content.map((paragraph, idx) => (
              <p key={idx} className="leading-loose">
                {paragraph}
              </p>
            ))}
          </div>

          {/* Author signature footer */}
          <div className="pt-8 mt-10 border-t border-white/10 flex items-center justify-between text-xs font-mono text-neutral-400">
            <div>
              <span>AUTHORED BY </span>
              <strong className="text-white">LOHITH VARMA</strong>
            </div>
            <span>BENGALURU • SYSTEMS LAB</span>
          </div>
        </div>
      </div>
    </div>
  )
}
