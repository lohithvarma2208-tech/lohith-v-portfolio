import React from 'react'
import { cn } from '../../utils/cn'

interface BadgeProps {
  children: React.ReactNode
  variant?: 'default' | 'accent' | 'outline' | 'success' | 'warning'
  size?: 'sm' | 'md'
  className?: string
  dot?: boolean
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'default',
  size = 'sm',
  className,
  dot = false
}) => {
  const sizeClasses = {
    sm: 'text-[11px] px-2.5 py-0.5 tracking-wider font-mono',
    md: 'text-xs px-3 py-1 font-mono'
  }

  const variantClasses = {
    default: 'bg-white/[0.04] text-neutral-300 border border-white/[0.08]',
    accent: 'bg-cyan-500/10 text-cyan-300 border border-cyan-500/25',
    outline: 'border border-neutral-700/60 text-neutral-400 bg-transparent',
    success: 'bg-emerald-500/10 text-emerald-300 border border-emerald-500/25',
    warning: 'bg-amber-500/10 text-amber-300 border border-amber-500/25'
  }

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full uppercase font-medium transition-colors',
        sizeClasses[size],
        variantClasses[variant],
        className
      )}
    >
      {dot && (
        <span className="relative flex h-1.5 w-1.5">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-current opacity-75" />
          <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-current" />
        </span>
      )}
      {children}
    </span>
  )
}
