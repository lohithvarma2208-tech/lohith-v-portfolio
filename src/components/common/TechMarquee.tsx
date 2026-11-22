import React from 'react'
import { sound } from '../../utils/sound'
import { Sparkles, Terminal, Cpu, Database, Server, Shield, Layers } from 'lucide-react'

export const TechMarquee: React.FC = () => {
  const marqueeItems = [
    { label: 'DISTRIBUTED SYSTEMS', icon: Server, color: 'text-cyan-400' },
    { label: 'LSM STORAGE ENGINE', icon: Database, color: 'text-emerald-400' },
    { label: 'C++20 & CONCURRENCY', icon: Cpu, color: 'text-blue-400' },
    { label: 'RUST ZERO-OVERHEAD', icon: Shield, color: 'text-amber-400' },
    { label: 'RAFT CONSENSUS', icon: Layers, color: 'text-purple-400' },
    { label: 'THREE.JS / SHADERS', icon: Sparkles, color: 'text-pink-400' },
    { label: 'ZERO-COPY BUFFERING', icon: Terminal, color: 'text-cyan-400' },
    { label: 'LOCK-FREE ATOMICS', icon: Cpu, color: 'text-emerald-400' },
    { label: 'LINUX KERNEL EPOLL', icon: Server, color: 'text-orange-400' },
    { label: 'REACT 19 & NEXT-GEN WEB', icon: Sparkles, color: 'text-sky-400' }
  ]

  // Duplicate for seamless 50% infinite translation
  const doubledItems = [...marqueeItems, ...marqueeItems]

  return (
    <div className="relative w-full overflow-hidden py-4 border-y border-white/[0.08] bg-[#07090e]/80 backdrop-blur-md select-none group">
      {/* Edge Blur Gradients */}
      <div className="absolute left-0 top-0 bottom-0 w-24 sm:w-40 bg-gradient-to-r from-[#050508] to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-24 sm:w-40 bg-gradient-to-l from-[#050508] to-transparent z-10 pointer-events-none" />

      {/* Marquee Track */}
      <div className="animate-marquee flex items-center gap-8">
        {doubledItems.map((item, idx) => {
          const Icon = item.icon
          return (
            <div
              key={idx}
              onMouseEnter={() => sound.playHover()}
              className="flex items-center gap-3 px-3 py-1 rounded-full bg-white/[0.02] border border-white/[0.05] hover:border-cyan-500/30 hover:bg-white/[0.05] transition-all cursor-default flex-shrink-0"
            >
              <Icon className={`w-3.5 h-3.5 ${item.color}`} />
              <span className="text-xs font-mono font-semibold tracking-wider text-neutral-300 uppercase">
                {item.label}
              </span>
              <span className="text-[10px] text-white/20">◆</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
