import React, { useState } from 'react'
import {
  Cpu,
  Briefcase,
  Award,
  GitPullRequest,
  Trophy,
  ExternalLink,
  Calendar,
  MapPin,
  CheckCircle2,
  Sparkles,
  ArrowUpRight
} from 'lucide-react'
import { usePortfolioData } from '../../context/PortfolioDataContext'
import { sound } from '../../utils/sound'
import type { SkillCategory } from '../../types'

type OptionTab = 'skills' | 'experience' | 'certifications' | 'opensource' | 'honors'

export const ArsenalSection: React.FC = () => {
  const {
    skills,
    experiences,
    certifications,
    openSource,
    honors,
    liveAccounts
  } = usePortfolioData()

  const [activeTab, setActiveTab] = useState<OptionTab>('skills')
  const [skillSearch, setSkillSearch] = useState<string>('')
  const [selectedCategory, setSelectedCategory] = useState<string>('all')

  const skillCategories: SkillCategory[] = skills.categories || []

  const handleTabChange = (tab: OptionTab) => {
    sound.playClick()
    setActiveTab(tab)
  }

  // Filter skills by search query and category
  const filteredCategories = skillCategories
    .filter((cat: SkillCategory) => (selectedCategory === 'all' ? true : cat.title.toLowerCase().includes(selectedCategory.toLowerCase())))
    .map((cat: SkillCategory) => {
      if (!skillSearch.trim()) return cat
      const filtered = cat.skills.filter((s: string) =>
        s.toLowerCase().includes(skillSearch.toLowerCase())
      )
      return { ...cat, skills: filtered }
    })
    .filter((cat: SkillCategory) => cat.skills.length > 0)

  return (
    <section id="arsenal" className="py-24 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto relative">
      {/* Background Ambient Glow */}
      <div className="absolute top-20 right-1/4 w-[480px] h-[300px] bg-cyan-500/[0.04] rounded-full blur-[130px] pointer-events-none -z-10" />

      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10 border-b border-white/[0.08] pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono tracking-widest text-neutral-400 uppercase mb-1.5">
            <span className="w-2 h-2 rounded-full bg-cyan-400" />
            <span>02 / TECHNICAL ARSENAL & CREDENTIALS</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white font-heading">
            Engineering Stack & Qualifications
          </h2>
        </div>
        <p className="text-xs sm:text-sm text-neutral-400 max-w-sm font-normal">
          Verified capabilities, production engineering roles, cloud credentials, and open source architectures.
        </p>
      </div>

      {/* Main Options Switcher Tabs */}
      <div className="flex flex-wrap items-center gap-2 p-1.5 rounded-2xl bg-white/[0.03] border border-white/[0.08] backdrop-blur-xl mb-8">
        <button
          onClick={() => handleTabChange('skills')}
          onMouseEnter={() => sound.playHover()}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-mono transition-all cursor-pointer ${
            activeTab === 'skills'
              ? 'bg-white text-black font-semibold shadow-[0_0_20px_rgba(255,255,255,0.25)]'
              : 'text-neutral-400 hover:text-white hover:bg-white/[0.05]'
          }`}
        >
          <Cpu className="w-3.5 h-3.5" />
          <span>Skill Stack</span>
        </button>

        <button
          onClick={() => handleTabChange('experience')}
          onMouseEnter={() => sound.playHover()}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-mono transition-all cursor-pointer ${
            activeTab === 'experience'
              ? 'bg-white text-black font-semibold shadow-[0_0_20px_rgba(255,255,255,0.25)]'
              : 'text-neutral-400 hover:text-white hover:bg-white/[0.05]'
          }`}
        >
          <Briefcase className="w-3.5 h-3.5" />
          <span>Work Experience</span>
          <span
            className={`px-1.5 py-0.2 rounded-md text-[10px] font-mono ${
              activeTab === 'experience' ? 'bg-black/10 text-black' : 'bg-white/[0.08] text-neutral-300'
            }`}
          >
            {experiences.length}
          </span>
        </button>

        <button
          onClick={() => handleTabChange('certifications')}
          onMouseEnter={() => sound.playHover()}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-mono transition-all cursor-pointer ${
            activeTab === 'certifications'
              ? 'bg-white text-black font-semibold shadow-[0_0_20px_rgba(255,255,255,0.25)]'
              : 'text-neutral-400 hover:text-white hover:bg-white/[0.05]'
          }`}
        >
          <Award className="w-3.5 h-3.5" />
          <span>Certifications</span>
          <span
            className={`px-1.5 py-0.2 rounded-md text-[10px] font-mono ${
              activeTab === 'certifications' ? 'bg-black/10 text-black' : 'bg-white/[0.08] text-neutral-300'
            }`}
          >
            {certifications.length}
          </span>
        </button>

        <button
          onClick={() => handleTabChange('opensource')}
          onMouseEnter={() => sound.playHover()}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-mono transition-all cursor-pointer ${
            activeTab === 'opensource'
              ? 'bg-white text-black font-semibold shadow-[0_0_20px_rgba(255,255,255,0.25)]'
              : 'text-neutral-400 hover:text-white hover:bg-white/[0.05]'
          }`}
        >
          <GitPullRequest className="w-3.5 h-3.5" />
          <span>Open Source</span>
          <span
            className={`px-1.5 py-0.2 rounded-md text-[10px] font-mono ${
              activeTab === 'opensource' ? 'bg-black/10 text-black' : 'bg-white/[0.08] text-neutral-300'
            }`}
          >
            {openSource.length}
          </span>
        </button>

        <button
          onClick={() => handleTabChange('honors')}
          onMouseEnter={() => sound.playHover()}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-mono transition-all cursor-pointer ${
            activeTab === 'honors'
              ? 'bg-white text-black font-semibold shadow-[0_0_20px_rgba(255,255,255,0.25)]'
              : 'text-neutral-400 hover:text-white hover:bg-white/[0.05]'
          }`}
        >
          <Trophy className="w-3.5 h-3.5" />
          <span>Honors & Competitions</span>
          <span
            className={`px-1.5 py-0.2 rounded-md text-[10px] font-mono ${
              activeTab === 'honors' ? 'bg-black/10 text-black' : 'bg-white/[0.08] text-neutral-300'
            }`}
          >
            {honors.length}
          </span>
        </button>
      </div>

      {/* --- TAB CONTENT 1: SKILL STACK --- */}
      {activeTab === 'skills' && (
        <div className="space-y-6 animate-fadeIn">
          {/* Filter and Search Bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-3 rounded-xl bg-white/[0.02] border border-white/[0.06]">
            <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
              {['all', 'systems', 'distributed', 'backend', 'graphics', 'cloud'].map((catKey) => (
                <button
                  key={catKey}
                  onClick={() => {
                    sound.playClick()
                    setSelectedCategory(catKey)
                  }}
                  className={`px-3 py-1 rounded-lg text-xs font-mono capitalize transition-colors cursor-pointer ${
                    selectedCategory === catKey
                      ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-semibold'
                      : 'text-neutral-400 hover:text-white hover:bg-white/[0.04]'
                  }`}
                >
                  {catKey === 'all' ? 'All Domains' : catKey}
                </button>
              ))}
            </div>

            <div className="w-full sm:w-64">
              <input
                type="text"
                placeholder="Search technologies..."
                value={skillSearch}
                onChange={(e) => setSkillSearch(e.target.value)}
                className="w-full px-3 py-1.5 rounded-lg bg-black/40 border border-white/10 text-xs font-mono text-white placeholder-neutral-500 focus:outline-none focus:border-cyan-400 transition-colors"
              />
            </div>
          </div>

          {/* Categorized Skills Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredCategories.map((cat, idx) => (
              <div
                key={idx}
                className="group p-6 rounded-2xl bg-[#090b12]/80 border border-white/[0.07] hover:border-cyan-500/30 transition-all duration-300 backdrop-blur-xl relative overflow-hidden"
              >
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-500/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xs font-mono font-bold tracking-wider uppercase text-cyan-300 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                    <span>{cat.title}</span>
                  </h3>
                  <span className="text-[10px] font-mono text-neutral-500">
                    {cat.skills.length} techs
                  </span>
                </div>

                <div className="flex flex-wrap gap-2">
                  {cat.skills.map((skill: string, sIdx: number) => (
                    <span
                      key={sIdx}
                      className="px-2.5 py-1.5 rounded-lg bg-white/[0.03] border border-white/[0.08] text-xs font-mono text-neutral-300 hover:text-white hover:border-cyan-400/50 hover:bg-cyan-500/[0.08] transition-all"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* --- TAB CONTENT 2: WORK EXPERIENCE --- */}
      {activeTab === 'experience' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="grid grid-cols-1 gap-6">
            {experiences.map((exp) => (
              <div
                key={exp.id}
                className="group p-6 sm:p-7 rounded-2xl bg-[#090b12]/80 border border-white/[0.08] hover:border-cyan-500/40 transition-all duration-300 backdrop-blur-xl relative"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
                  <div>
                    <div className="flex items-center gap-2.5 mb-1">
                      <h3 className="text-lg sm:text-xl font-bold font-heading text-white">
                        {exp.role}
                      </h3>
                      {exp.current && (
                        <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-[10px] font-mono text-emerald-400">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                          <span>Present</span>
                        </span>
                      )}
                    </div>
                    <p className="text-sm font-medium text-cyan-300 font-mono">
                      {exp.company}
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-neutral-400">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-neutral-500" />
                      <span>{exp.period}</span>
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-neutral-500" />
                      <span>{exp.location}</span>
                    </span>
                    <span className="px-2 py-0.5 rounded-md bg-white/[0.05] border border-white/10 text-neutral-300">
                      {exp.type}
                    </span>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-neutral-300 mb-4 leading-relaxed font-normal">
                  {exp.summary}
                </p>

                {/* Measurable Achievements */}
                <div className="space-y-2 mb-5">
                  {exp.achievements.map((ach, aIdx) => (
                    <div key={aIdx} className="flex items-start gap-2.5 text-xs font-mono text-neutral-300">
                      <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                      <span className="leading-relaxed">{ach}</span>
                    </div>
                  ))}
                </div>

                {/* Tech Stack Pills */}
                <div className="flex flex-wrap items-center gap-1.5 pt-4 border-t border-white/[0.06]">
                  <span className="text-[11px] font-mono text-neutral-500 mr-2">Stack:</span>
                  {exp.techStack.map((tech, tIdx) => (
                    <span
                      key={tIdx}
                      className="px-2.5 py-1 rounded-md bg-white/[0.04] border border-white/5 text-[11px] font-mono text-neutral-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* --- TAB CONTENT 3: CERTIFICATIONS --- */}
      {activeTab === 'certifications' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {certifications.map((cert) => (
              <div
                key={cert.id}
                className="group p-6 rounded-2xl bg-[#090b12]/80 border border-white/[0.08] hover:border-cyan-500/40 transition-all duration-300 backdrop-blur-xl flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="text-[11px] font-mono tracking-wider uppercase text-cyan-400 font-semibold flex items-center gap-1.5">
                      <Sparkles className="w-3 h-3 text-cyan-400" />
                      <span>{cert.issuer}</span>
                    </span>
                    <span className="text-[11px] font-mono text-neutral-400">
                      Issued: {cert.issueDate}
                    </span>
                  </div>

                  <h3 className="text-base sm:text-lg font-bold font-heading text-white mb-2 leading-snug">
                    {cert.title}
                  </h3>

                  {cert.credentialId && (
                    <p className="text-[11px] font-mono text-neutral-400 mb-4">
                      ID: <span className="text-neutral-300">{cert.credentialId}</span>
                    </p>
                  )}

                  {/* Skills Covered */}
                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {cert.skills.map((s, sIdx) => (
                      <span
                        key={sIdx}
                        className="px-2 py-0.5 rounded-md bg-white/[0.03] border border-white/[0.06] text-[10px] font-mono text-neutral-300"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-3 border-t border-white/[0.06] flex items-center justify-between">
                  <span className="text-[10px] font-mono text-emerald-400 flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" />
                    <span>Verified Credential</span>
                  </span>

                  <a
                    href={cert.credentialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-xs font-mono text-neutral-300 hover:text-white transition-colors"
                  >
                    <span>Verify</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* --- TAB CONTENT 4: OPEN SOURCE CONTRIBUTIONS --- */}
      {activeTab === 'opensource' && (
        <div className="space-y-6 animate-fadeIn">
          {/* GitHub Live Telemetry Pill */}
          <div className="flex flex-wrap items-center justify-between gap-3 p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.08] text-xs font-mono">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-emerald-300 font-semibold uppercase">GitHub Live Telemetry:</span>
              <span className="text-neutral-300">@{liveAccounts.github?.username || 'lohithvarma2208-tech'}</span>
              <span className="text-neutral-500">•</span>
              <span className="text-amber-300">★ {liveAccounts.github?.totalStars ?? 235} Stars</span>
              <span className="text-neutral-500">•</span>
              <span className="text-cyan-300">{liveAccounts.github?.publicRepos ?? 3} Repositories</span>
            </div>
            <a
              href={liveAccounts.github?.profileUrl || 'https://github.com/lohithvarma2208-tech'}
              target="_blank"
              rel="noopener noreferrer"
              className="text-cyan-400 hover:text-white flex items-center gap-1 transition-colors"
            >
              <span>GitHub Profile</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {openSource.map((oss) => (
              <div
                key={oss.id}
                className="group p-6 rounded-2xl bg-[#090b12]/80 border border-white/[0.08] hover:border-cyan-500/40 transition-all duration-300 backdrop-blur-xl flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="px-2.5 py-0.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-[10px] font-mono text-cyan-300">
                      {oss.type} {oss.prNumber ? `// ${oss.prNumber}` : ''}
                    </span>
                    {oss.stars && (
                      <span className="text-[11px] font-mono text-amber-300">
                        ★ {oss.stars}
                      </span>
                    )}
                  </div>

                  <h3 className="text-base font-bold font-mono text-white mb-1">
                    {oss.repo}
                  </h3>

                  <p className="text-sm font-semibold text-neutral-200 mb-2">
                    {oss.title}
                  </p>

                  <p className="text-xs text-neutral-400 mb-3 leading-relaxed">
                    {oss.description}
                  </p>

                  <div className="p-2.5 rounded-lg bg-white/[0.02] border border-white/[0.05] mb-4">
                    <span className="text-[10px] font-mono text-cyan-400 uppercase block mb-0.5">
                      Impact
                    </span>
                    <span className="text-xs font-mono text-neutral-300">
                      {oss.impact}
                    </span>
                  </div>
                </div>

                <div className="pt-3 border-t border-white/[0.06] flex items-center justify-between">
                  <div className="flex flex-wrap gap-1">
                    {oss.techStack.map((tech, tIdx) => (
                      <span
                        key={tIdx}
                        className="px-2 py-0.5 rounded bg-white/[0.04] text-[10px] font-mono text-neutral-300"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <a
                    href={oss.prUrl || oss.repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-xs font-mono text-neutral-300 hover:text-white transition-colors shrink-0 ml-2"
                  >
                    <span>View Repository</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* --- TAB CONTENT 5: HONORS & COMPETITIONS --- */}
      {activeTab === 'honors' && (
        <div className="space-y-6 animate-fadeIn">
          {/* LeetCode Live Telemetry Pill */}
          <div className="flex flex-wrap items-center justify-between gap-3 p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.08] text-xs font-mono">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
              <span className="text-amber-300 font-semibold uppercase">LeetCode Live Telemetry:</span>
              <span className="text-neutral-300">@{liveAccounts.leetcode?.username || '_CodeMaster_1'}</span>
              <span className="text-neutral-500">•</span>
              <span className="text-emerald-400">{liveAccounts.leetcode?.totalSolved ?? 22} Solved</span>
              <span className="text-neutral-500">•</span>
              <span className="text-amber-300">{liveAccounts.leetcode?.badge ?? 'Algorithm Solver'}</span>
            </div>
            <a
              href={liveAccounts.leetcode?.profileUrl || 'https://leetcode.com/u/_CodeMaster_1/'}
              target="_blank"
              rel="noopener noreferrer"
              className="text-amber-400 hover:text-white flex items-center gap-1 transition-colors"
            >
              <span>LeetCode Profile</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {honors.map((honor) => (
              <div
                key={honor.id}
                className="group p-6 rounded-2xl bg-[#090b12]/80 border border-white/[0.08] hover:border-cyan-500/40 transition-all duration-300 backdrop-blur-xl flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="px-2.5 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-[10px] font-mono text-amber-300">
                      {honor.badge}
                    </span>
                    <span className="text-[11px] font-mono text-neutral-400">
                      {honor.date}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold font-heading text-white mb-1">
                    {honor.title}
                  </h3>

                  <p className="text-xs font-mono text-cyan-300 mb-2">
                    {honor.issuer}
                  </p>

                  <div className="flex items-center gap-3 my-3">
                    {honor.rank && (
                      <span className="px-2.5 py-1 rounded-md bg-white/[0.05] border border-white/10 text-xs font-mono font-semibold text-white">
                        {honor.rank}
                      </span>
                    )}
                    {honor.metric && (
                      <span className="text-xs font-mono text-emerald-400">
                        {honor.metric}
                      </span>
                    )}
                  </div>

                  <p className="text-xs text-neutral-300 leading-relaxed mb-4">
                    {honor.description}
                  </p>
                </div>

                {honor.link && (
                  <div className="pt-3 border-t border-white/[0.06] flex justify-end">
                    <a
                      href={honor.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-xs font-mono text-neutral-300 hover:text-white transition-colors"
                    >
                      <span>Verification & Proof</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </a>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  )
}
