import React from 'react'
import { ArrowUp, Mail, Lock } from 'lucide-react'
import { GithubIcon, LinkedinIcon } from './Icons'
import { sound } from '../../utils/sound'
import { usePortfolioData } from '../../context/PortfolioDataContext'

interface FooterProps {
  onOpenAdmin?: () => void
}

export const Footer: React.FC<FooterProps> = ({ onOpenAdmin }) => {
  const { personalInfo, contactInfo } = usePortfolioData()

  const scrollToTop = () => {
    sound.playClick()
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleAdminClick = () => {
    sound.playChime()
    if (onOpenAdmin) {
      onOpenAdmin()
    } else {
      window.location.hash = '#admin'
    }
  }

  return (
    <footer className="relative border-t border-white/[0.08] bg-[#07080c] py-12 overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pb-8 border-b border-white/[0.06]">
          {/* Brand */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-black/80 border border-white/15 flex items-center justify-center font-mono text-xs font-bold text-white">
              LV.
            </div>
            <div>
              <span className="font-mono text-sm font-bold tracking-wider text-white">
                {personalInfo.name.toUpperCase()}
              </span>
              <p className="text-xs text-neutral-400 font-mono">
                {personalInfo.title}
              </p>
            </div>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-4 text-xs font-mono text-neutral-400">
            <a
              href={contactInfo.githubUrl}
              target="_blank"
              rel="noreferrer"
              onMouseEnter={() => sound.playHover()}
              className="hover:text-white transition-colors flex items-center gap-1.5"
            >
              <GithubIcon className="w-4 h-4" />
              <span>GitHub</span>
            </a>
            <a
              href={contactInfo.linkedinUrl}
              target="_blank"
              rel="noreferrer"
              onMouseEnter={() => sound.playHover()}
              className="hover:text-white transition-colors flex items-center gap-1.5"
            >
              <LinkedinIcon className="w-4 h-4" />
              <span>LinkedIn</span>
            </a>
            <a
              href={`mailto:${contactInfo.email}`}
              onMouseEnter={() => sound.playHover()}
              className="hover:text-white transition-colors flex items-center gap-1.5"
            >
              <Mail className="w-4 h-4" />
              <span>Email</span>
            </a>
          </div>
        </div>

        {/* Bottom Strip */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-neutral-500">
          <div className="flex items-center gap-3">
            <span>© {new Date().getFullYear()} {personalInfo.name.toUpperCase()}. All rights reserved.</span>
            <span>•</span>
            <button
              onClick={handleAdminClick}
              onMouseEnter={() => sound.playHover()}
              className="hover:text-cyan-400 transition-colors flex items-center gap-1 text-[11px] text-neutral-500 cursor-pointer"
              title="Restricted Admin Control Panel"
            >
              <Lock className="w-3 h-3" />
              <span>Admin CMS</span>
            </button>
          </div>

          <button
            onClick={scrollToTop}
            onMouseEnter={() => sound.playHover()}
            className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] text-neutral-300 hover:text-white transition-all cursor-pointer"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  )
}
