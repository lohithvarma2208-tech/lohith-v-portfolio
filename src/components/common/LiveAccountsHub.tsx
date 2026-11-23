import React from 'react'
import {
  Code2,
  RefreshCw,
  ExternalLink,
  CheckCircle2,
  GitBranch,
  Flame,
  Award
} from 'lucide-react'
import { GithubIcon, LinkedinIcon } from './Icons'
import { usePortfolioData } from '../../context/PortfolioDataContext'
import { sound } from '../../utils/sound'

interface LiveAccountsHubProps {
  compact?: boolean
  className?: string
}

export const LiveAccountsHub: React.FC<LiveAccountsHubProps> = ({
  compact = false,
  className = ''
}) => {
  const { liveAccounts, refreshLiveAccounts } = usePortfolioData()
  const { github, leetcode, linkedin, isSyncing, lastSyncedAt } = liveAccounts

  const handleSyncClick = () => {
    sound.playClick()
    refreshLiveAccounts()
  }

  // Format relative or readable time
  const formatSyncTime = (isoString: string | null) => {
    if (!isoString) return 'Just now'
    try {
      const date = new Date(isoString)
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })
    } catch {
      return 'Just now'
    }
  }

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Header Bar with Live Sync Indicator */}
      <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-2.5 rounded-2xl bg-white/[0.02] border border-white/[0.08] backdrop-blur-xl">
        <div className="flex items-center gap-2.5">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
          </span>
          <span className="text-[11px] font-mono tracking-wider text-emerald-400 uppercase font-semibold">
            LIVE CONNECTED CHANNELS // REAL-TIME SYNC
          </span>
          <span className="hidden sm:inline text-[11px] font-mono text-neutral-500">
            • Auto-syncing GitHub, LeetCode & LinkedIn
          </span>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-[10px] font-mono text-neutral-400">
            Last Synced: <span className="text-neutral-200">{formatSyncTime(lastSyncedAt)}</span>
          </span>

          <button
            onClick={handleSyncClick}
            disabled={isSyncing}
            onMouseEnter={() => sound.playHover()}
            title="Fetch latest stats from GitHub and LeetCode"
            className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] border border-white/10 text-[11px] font-mono text-neutral-300 hover:text-white transition-all cursor-pointer disabled:opacity-50"
          >
            <RefreshCw className={`w-3 h-3 ${isSyncing ? 'animate-spin text-cyan-400' : ''}`} />
            <span>{isSyncing ? 'Syncing...' : 'Sync Now'}</span>
          </button>
        </div>
      </div>

      {/* Grid of 3 Live Account Cards */}
      <div className={`grid grid-cols-1 ${compact ? 'md:grid-cols-3' : 'md:grid-cols-3'} gap-4`}>
        {/* 1. GITHUB LIVE CARD */}
        <div className="group p-5 rounded-2xl bg-[#090c16]/85 border border-white/[0.08] hover:border-cyan-500/40 transition-all duration-300 backdrop-blur-xl flex flex-col justify-between relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-cyan-500/[0.04] rounded-full blur-2xl pointer-events-none" />

          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-white/[0.05] border border-white/10 text-white">
                  <GithubIcon className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-mono font-bold text-white uppercase tracking-wider">
                    GitHub Live
                  </h4>
                  <span className="text-[10px] font-mono text-neutral-400">
                    @{github?.username || 'lohithvarma2208-tech'}
                  </span>
                </div>
              </div>

              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-[9px] font-mono text-emerald-300">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>ONLINE</span>
              </span>
            </div>

            {/* Live Metrics */}
            <div className="grid grid-cols-3 gap-2 my-3 p-2.5 rounded-xl bg-black/40 border border-white/5 text-center">
              <div>
                <span className="text-sm font-bold font-mono text-white block">
                  {github?.publicRepos ?? 3}
                </span>
                <span className="text-[9px] font-mono text-neutral-400 uppercase">Repos</span>
              </div>
              <div>
                <span className="text-sm font-bold font-mono text-cyan-300 block">
                  {github?.totalStars ?? 235}
                </span>
                <span className="text-[9px] font-mono text-neutral-400 uppercase">Stars</span>
              </div>
              <div>
                <span className="text-sm font-bold font-mono text-white block">
                  {github?.followers ?? 1}
                </span>
                <span className="text-[9px] font-mono text-neutral-400 uppercase">Followers</span>
              </div>
            </div>

            <div className="flex items-start gap-1.5 text-[11px] font-mono text-neutral-400 mb-3">
              <GitBranch className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
              <span className="line-clamp-2 leading-relaxed">
                {github?.latestActivity || 'Active repository pushes and systems commits'}
              </span>
            </div>
          </div>

          <div className="pt-3 border-t border-white/[0.06] flex items-center justify-between">
            <span className="text-[10px] font-mono text-neutral-500">Live API Verified</span>
            <a
              href={github?.profileUrl || 'https://github.com/lohithvarma2208-tech'}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-xs font-mono text-cyan-300 hover:text-white transition-colors"
            >
              <span>Explore GitHub</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>

        {/* 2. LEETCODE LIVE CARD */}
        <div className="group p-5 rounded-2xl bg-[#090c16]/85 border border-white/[0.08] hover:border-amber-500/40 transition-all duration-300 backdrop-blur-xl flex flex-col justify-between relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-amber-500/[0.04] rounded-full blur-2xl pointer-events-none" />

          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-300">
                  <Code2 className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-mono font-bold text-white uppercase tracking-wider">
                    LeetCode Live
                  </h4>
                  <span className="text-[10px] font-mono text-neutral-400">
                    @{leetcode?.username || '_CodeMaster_1'}
                  </span>
                </div>
              </div>

              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-[9px] font-mono text-amber-300">
                <Flame className="w-3 h-3 text-amber-400" />
                <span>{leetcode?.badge || 'Algorithm Solver'}</span>
              </span>
            </div>

            {/* Live Metrics */}
            <div className="grid grid-cols-3 gap-2 my-3 p-2.5 rounded-xl bg-black/40 border border-white/5 text-center">
              <div>
                <span className="text-sm font-bold font-mono text-white block">
                  {leetcode?.totalSolved ?? 22}
                </span>
                <span className="text-[9px] font-mono text-neutral-400 uppercase">Solved</span>
              </div>
              <div>
                <span className="text-sm font-bold font-mono text-amber-300 block">
                  {leetcode?.rating ?? 1450}
                </span>
                <span className="text-[9px] font-mono text-neutral-400 uppercase">Rating</span>
              </div>
              <div>
                <span className="text-sm font-bold font-mono text-emerald-400 block">
                  {leetcode?.ranking ?? '#4.4M'}
                </span>
                <span className="text-[9px] font-mono text-neutral-400 uppercase">Rank</span>
              </div>
            </div>

            {/* Difficulty Breakdown */}
            <div className="flex items-center justify-between gap-1 text-[10px] font-mono text-neutral-400 mb-3 px-1">
              <span>Easy: <strong className="text-emerald-300">{leetcode?.easySolved ?? 21}</strong></span>
              <span>Med: <strong className="text-amber-300">{leetcode?.mediumSolved ?? 1}</strong></span>
              <span>Hard: <strong className="text-rose-400">{leetcode?.hardSolved ?? 0}</strong></span>
            </div>
          </div>

          <div className="pt-3 border-t border-white/[0.06] flex items-center justify-between">
            <span className="text-[10px] font-mono text-neutral-500">Problems & Contests</span>
            <a
              href={leetcode?.profileUrl || 'https://leetcode.com/u/_CodeMaster_1/'}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-xs font-mono text-amber-300 hover:text-white transition-colors"
            >
              <span>View LeetCode</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>

        {/* 3. LINKEDIN VERIFIED CARD */}
        <div className="group p-5 rounded-2xl bg-[#090c16]/85 border border-white/[0.08] hover:border-blue-500/40 transition-all duration-300 backdrop-blur-xl flex flex-col justify-between relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/[0.04] rounded-full blur-2xl pointer-events-none" />

          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-300">
                  <LinkedinIcon className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-mono font-bold text-white uppercase tracking-wider">
                    LinkedIn Verified
                  </h4>
                  <span className="text-[10px] font-mono text-neutral-400">
                    in/{linkedin?.username || 'lohith-varma-3b4153421'}
                  </span>
                </div>
              </div>

              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-blue-500/10 border border-blue-500/30 text-[9px] font-mono text-blue-300">
                <CheckCircle2 className="w-3 h-3" />
                <span>VERIFIED</span>
              </span>
            </div>

            {/* Profile Overview */}
            <div className="my-3 p-3 rounded-xl bg-black/40 border border-white/5 space-y-1">
              <div className="flex items-center gap-2">
                <Award className="w-3.5 h-3.5 text-blue-400" />
                <span className="text-xs font-mono font-semibold text-white">
                  Lohith Varma
                </span>
              </div>
              <p className="text-[10px] font-mono text-neutral-400 line-clamp-2">
                Computer Science Undergraduate & Systems Builder • Bengaluru, India
              </p>
            </div>

            <div className="flex items-center gap-1.5 text-[11px] font-mono text-emerald-400 mb-3">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Available for 2027 SWE Internships & Roles</span>
            </div>
          </div>

          <div className="pt-3 border-t border-white/[0.06] flex items-center justify-between">
            <span className="text-[10px] font-mono text-neutral-500">Official Channel</span>
            <a
              href={linkedin?.profileUrl || 'https://www.linkedin.com/in/lohith-varma-3b4153421/'}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-xs font-mono text-blue-300 hover:text-white transition-colors"
            >
              <span>Connect on LinkedIn</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
