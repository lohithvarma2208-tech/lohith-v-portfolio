import React, { useRef, useState } from 'react'
import { cn } from '../../utils/cn'
import { useTheme } from '../../context/ThemeContext'
import { sound } from '../../utils/sound'

interface SpotlightCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  className?: string
  spotlightColor?: string
}

export const SpotlightCard: React.FC<SpotlightCardProps> = ({
  children,
  className,
  spotlightColor,
  ...props
}) => {
  const cardRef = useRef<HTMLDivElement | null>(null)
  const [position, setPosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 })
  const [opacity, setOpacity] = useState(0)
  const { theme } = useTheme()

  const defaultSpotlightMap = {
    cyan: 'rgba(56, 189, 248, 0.12)',
    emerald: 'rgba(52, 211, 153, 0.12)',
    amber: 'rgba(251, 191, 36, 0.12)',
    violet: 'rgba(192, 132, 252, 0.12)'
  }

  const activeSpotlight = spotlightColor || defaultSpotlightMap[theme]

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    setPosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    })
  }

  const handleMouseEnter = () => {
    setOpacity(1)
    sound.playHover()
  }

  const handleMouseLeave = () => {
    setOpacity(0)
  }

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={cn(
        'relative overflow-hidden rounded-2xl border border-white/[0.08] bg-[#0c0e14]/70 p-6 backdrop-blur-xl transition-all duration-300 hover:border-white/[0.18]',
        className
      )}
      {...props}
    >
      {/* Dynamic spotlight layer */}
      <div
        className="pointer-events-none absolute -inset-px transition-opacity duration-300"
        style={{
          opacity,
          background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, ${activeSpotlight}, transparent 60%)`
        }}
      />
      {/* Content wrapper */}
      <div className="relative z-10">{children}</div>
    </div>
  )
}
