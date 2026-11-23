import React, { useState } from 'react'
import { Send, Mail, Copy, CheckCircle2, FileText } from 'lucide-react'
import { GithubIcon, LinkedinIcon } from '../common/Icons'
import { sound } from '../../utils/sound'
import { SpotlightCard } from '../common/SpotlightCard'
import confetti from 'canvas-confetti'
import { usePortfolioData } from '../../context/PortfolioDataContext'
import { LiveAccountsHub } from '../common/LiveAccountsHub'

export const ContactSection: React.FC = () => {
  const { personalInfo, contactInfo } = usePortfolioData()

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [copiedEmail, setCopiedEmail] = useState(false)

  const handleCopyEmail = () => {
    sound.playSuccess()
    navigator.clipboard.writeText(contactInfo.email)
    setCopiedEmail(true)
    confetti({ particleCount: 30, spread: 50 })
    setTimeout(() => setCopiedEmail(false), 2500)
  }

  const handleDownloadCV = () => {
    sound.playSuccess()
    confetti({ particleCount: 50, spread: 60 })
    window.open(contactInfo.resumeUrl, '_blank')
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.name || !formData.email || !formData.message) return

    sound.playClick()
    setIsSubmitting(true)

    setTimeout(() => {
      sound.playSuccess()
      setIsSubmitting(false)
      setIsSubmitted(true)
      confetti({ particleCount: 70, spread: 70 })
    }, 1000)
  }

  return (
    <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto relative">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10 border-b border-white/[0.08] pb-5">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono tracking-widest text-neutral-400 uppercase mb-1">
            <span className="w-2 h-2 rounded-full bg-cyan-400" />
            <span>04 / GET IN TOUCH</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white font-heading">
            Let&apos;s Build Together
          </h2>
        </div>
        <p className="text-xs sm:text-sm text-neutral-400 max-w-sm">
          Open to 2027 software engineering internships, systems architecture, and ambitious projects.
        </p>
      </div>

      {/* Live Connected Channels & Real-Time Sync Hub */}
      <LiveAccountsHub className="mb-10" />

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Left Column: Direct Links & Resume (2 cols) */}
        <div className="lg:col-span-2 space-y-4">
          <SpotlightCard className="p-6 space-y-5">
            {/* Profile Avatar & Title */}
            <div className="flex items-center gap-3.5 pb-2 border-b border-white/[0.08]">
              <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-cyan-400/40 shadow-lg shrink-0">
                <img
                  src={personalInfo.photoUrl || '/lohith_varma.png'}
                  srcSet="/lohith_varma.png 1x, /lohith_varma_hd.png 2x"
                  onError={(e) => {
                    e.currentTarget.src = '/lohith_varma.png'
                  }}
                  alt={personalInfo.name}
                  style={{ imageRendering: '-webkit-optimize-contrast' }}
                  className="w-full h-full object-cover filter contrast-[1.03] brightness-[1.01]"
                />
              </div>
              <div>
                <h3 className="text-base font-bold text-white font-heading">{personalInfo.name}</h3>
                <p className="text-xs text-neutral-400 font-mono">
                  {personalInfo.title}
                </p>
              </div>
            </div>

            {/* Email Pill with Copy */}
            <div className="p-3.5 rounded-xl bg-black/40 border border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-2.5 overflow-hidden">
                <Mail className="w-4 h-4 text-cyan-400 shrink-0" />
                <span className="text-xs font-mono text-white truncate">{contactInfo.email}</span>
              </div>
              <button
                onClick={handleCopyEmail}
                onMouseEnter={() => sound.playHover()}
                className="p-1.5 rounded-md hover:bg-white/10 text-neutral-400 hover:text-white transition-colors cursor-pointer shrink-0 ml-2"
                title="Copy Email"
              >
                {copiedEmail ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </button>
            </div>

            {/* Social Links & Resume Button */}
            <div className="flex flex-wrap gap-2 pt-1">
              <a
                href={contactInfo.githubUrl}
                target="_blank"
                rel="noreferrer"
                onMouseEnter={() => sound.playHover()}
                className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-xs font-mono text-neutral-300 hover:text-white transition-colors"
              >
                <GithubIcon className="w-3.5 h-3.5" />
                <span>GitHub</span>
              </a>

              <a
                href={contactInfo.linkedinUrl}
                target="_blank"
                rel="noreferrer"
                onMouseEnter={() => sound.playHover()}
                className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-xs font-mono text-neutral-300 hover:text-white transition-colors"
              >
                <LinkedinIcon className="w-3.5 h-3.5" />
                <span>LinkedIn</span>
              </a>

              <button
                onClick={handleDownloadCV}
                onMouseEnter={() => sound.playHover()}
                className="flex items-center gap-2 px-3 py-2 rounded-lg bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 text-xs font-mono text-cyan-300 transition-colors cursor-pointer"
              >
                <FileText className="w-3.5 h-3.5" />
                <span>Resume (PDF)</span>
              </button>
            </div>
          </SpotlightCard>
        </div>

        {/* Right Column: Contact Form (3 cols) */}
        <div className="lg:col-span-3">
          <SpotlightCard className="p-6">
            {isSubmitted ? (
              <div className="py-12 flex flex-col items-center justify-center text-center space-y-3">
                <div className="p-3 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-lg font-bold text-white font-heading">Message Dispatched</h3>
                <p className="text-xs text-neutral-400 max-w-sm">
                  Thanks for reaching out! I will respond directly to your email shortly.
                </p>
                <button
                  onClick={() => {
                    setIsSubmitted(false)
                    setFormData({ name: '', email: '', message: '' })
                  }}
                  className="mt-4 px-4 py-2 rounded-full bg-white/10 hover:bg-white/15 text-xs font-mono text-white transition-colors cursor-pointer"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-mono text-neutral-400 uppercase mb-1">
                      Your Name
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Alex Chen"
                      className="w-full px-3.5 py-2.5 rounded-lg bg-black/40 border border-white/10 text-xs text-white placeholder-neutral-600 focus:outline-none focus:border-cyan-400 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono text-neutral-400 uppercase mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="e.g. alex@company.com"
                      className="w-full px-3.5 py-2.5 rounded-lg bg-black/40 border border-white/10 text-xs text-white placeholder-neutral-600 focus:outline-none focus:border-cyan-400 transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-mono text-neutral-400 uppercase mb-1">
                    Message
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell me about your team, role, or project..."
                    className="w-full px-3.5 py-2.5 rounded-lg bg-black/40 border border-white/10 text-xs text-white placeholder-neutral-600 focus:outline-none focus:border-cyan-400 transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  onMouseEnter={() => sound.playHover()}
                  className="w-full py-3 rounded-lg bg-white text-black font-semibold text-xs tracking-wider uppercase transition-all flex items-center justify-center gap-2 hover:bg-neutral-200 cursor-pointer disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <span>Dispatching...</span>
                  ) : (
                    <>
                      <span>Send Message</span>
                      <Send className="w-3.5 h-3.5" />
                    </>
                  )}
                </button>
              </form>
            )}
          </SpotlightCard>
        </div>
      </div>
    </section>
  )
}
