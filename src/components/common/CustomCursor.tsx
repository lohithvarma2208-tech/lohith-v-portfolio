import React, { useEffect, useState, useRef } from 'react'
import { useTheme } from '../../context/ThemeContext'

export const CustomCursor: React.FC = () => {
  const { theme } = useTheme()
  const [enabled, setEnabled] = useState(false)
  const [hovered, setHovered] = useState(false)
  const [clicked, setClicked] = useState(false)

  const cursorRef = useRef<{ x: number; y: number }>({ x: -100, y: -100 })
  const followerRef = useRef<{ x: number; y: number }>({ x: -100, y: -100 })
  const dotElRef = useRef<HTMLDivElement | null>(null)
  const ringElRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    // Only enable on desktop pointer devices
    const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0
    if (isTouch) return
    setEnabled(true)

    const onMouseMove = (e: MouseEvent) => {
      cursorRef.current = { x: e.clientX, y: e.clientY }

      // Check if hovering over clickable elements
      const target = e.target as HTMLElement | null
      if (target) {
        const isClickable = !!target.closest('button, a, input, textarea, select, [role="button"], .interactive')
        setHovered(isClickable)
      }
    }

    const onMouseDown = () => setClicked(true)
    const onMouseUp = () => setClicked(false)

    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('mousedown', onMouseDown)
    window.addEventListener('mouseup', onMouseUp)

    let animId: number
    const loop = () => {
      // Lerp follower
      followerRef.current.x += (cursorRef.current.x - followerRef.current.x) * 0.18
      followerRef.current.y += (cursorRef.current.y - followerRef.current.y) * 0.18

      if (dotElRef.current) {
        dotElRef.current.style.transform = `translate3d(${cursorRef.current.x}px, ${cursorRef.current.y}px, 0) translate(-50%, -50%)`
      }
      if (ringElRef.current) {
        ringElRef.current.style.transform = `translate3d(${followerRef.current.x}px, ${followerRef.current.y}px, 0) translate(-50%, -50%)`
      }

      animId = requestAnimationFrame(loop)
    }

    animId = requestAnimationFrame(loop)

    return () => {
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('mousedown', onMouseDown)
      window.removeEventListener('mouseup', onMouseUp)
      cancelAnimationFrame(animId)
    }
  }, [])

  if (!enabled) return null

  const ringColorMap = {
    cyan: 'border-cyan-400/50 shadow-[0_0_15px_rgba(56,189,248,0.3)]',
    emerald: 'border-emerald-400/50 shadow-[0_0_15px_rgba(52,211,153,0.3)]',
    amber: 'border-amber-400/50 shadow-[0_0_15px_rgba(251,191,36,0.3)]',
    violet: 'border-purple-400/50 shadow-[0_0_15px_rgba(192,132,252,0.3)]'
  }

  const dotColorMap = {
    cyan: 'bg-cyan-400',
    emerald: 'bg-emerald-400',
    amber: 'bg-amber-400',
    violet: 'bg-purple-400'
  }

  return (
    <>
      {/* Precision center dot */}
      <div
        ref={dotElRef}
        className={`fixed top-0 left-0 pointer-events-none z-[9999] rounded-full transition-transform duration-75 ${
          clicked ? 'w-1.5 h-1.5' : 'w-1 h-1'
        } ${dotColorMap[theme]}`}
      />

      {/* Fluid outer ring */}
      <div
        ref={ringElRef}
        className={`fixed top-0 left-0 pointer-events-none z-[9998] rounded-full border transition-all duration-200 ease-out ${
          ringColorMap[theme]
        } ${
          hovered
            ? 'w-12 h-12 bg-white/[0.04] backdrop-blur-[1px] scale-110'
            : clicked
            ? 'w-6 h-6 scale-90'
            : 'w-8 h-8 opacity-70'
        }`}
      />
    </>
  )
}
