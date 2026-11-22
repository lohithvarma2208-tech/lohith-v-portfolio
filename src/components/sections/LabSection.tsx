import React, { useState, useEffect, useRef } from 'react'
import {
  RotateCcw,
  Cpu,
  Sparkles
} from 'lucide-react'
import { sound } from '../../utils/sound'
import { Badge } from '../common/Badge'

interface MemoryBlock {
  id: number
  size: number
  offset: number
  allocated: boolean
  label: string
}

export const LabSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'particles' | 'allocator'>('particles')

  // --- EXPERIMENT 1: PARTICLE PHYSICS SANDBOX ---
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const [particleDensity, setParticleDensity] = useState(60)
  const [speedMultiplier, setSpeedMultiplier] = useState(1)
  const [gravityPull, setGravityPull] = useState(1.5)
  const [fps, setFps] = useState(60)

  useEffect(() => {
    if (activeTab !== 'particles') return
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animId: number
    let width = (canvas.width = canvas.parentElement?.clientWidth || 700)
    let height = (canvas.height = 360)

    const particles: Array<{
      x: number
      y: number
      vx: number
      vy: number
      size: number
      color: string
    }> = []

    const colors = ['#38bdf8', '#34d399', '#fbbf24', '#c084fc']

    for (let i = 0; i < particleDensity; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 1.5 * speedMultiplier,
        vy: (Math.random() - 0.5) * 1.5 * speedMultiplier,
        size: Math.random() * 2.5 + 1.2,
        color: colors[i % colors.length]
      })
    }

    let mouse = { x: -1000, y: -1000, active: false }

    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      mouse = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
        active: true
      }
    }

    const onMouseLeave = () => {
      mouse.active = false
    }

    canvas.addEventListener('mousemove', onMouseMove)
    canvas.addEventListener('mouseleave', onMouseLeave)

    let lastTime = performance.now()
    let frameCount = 0

    const loop = (currentTime: number) => {
      frameCount++
      if (currentTime - lastTime >= 1000) {
        setFps(frameCount)
        frameCount = 0
        lastTime = currentTime
      }

      ctx.fillStyle = 'rgba(8, 10, 16, 0.25)'
      ctx.fillRect(0, 0, width, height)

      // Draw grid
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.02)'
      ctx.lineWidth = 1
      for (let x = 0; x < width; x += 40) {
        ctx.beginPath()
        ctx.moveTo(x, 0)
        ctx.lineTo(x, height)
        ctx.stroke()
      }

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i]
        p.x += p.vx * speedMultiplier
        p.y += p.vy * speedMultiplier

        if (p.x < 0 || p.x > width) p.vx *= -1
        if (p.y < 0 || p.y > height) p.vy *= -1

        // Mouse gravity vortex
        if (mouse.active) {
          const dx = mouse.x - p.x
          const dy = mouse.y - p.y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < 180 && dist > 1) {
            const force = (180 - dist) / 180 * 0.4 * gravityPull
            p.vx += (dx / dist) * force
            p.vy += (dy / dist) * force
          }
        }

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fillStyle = p.color
        ctx.shadowColor = p.color
        ctx.shadowBlur = 8
        ctx.fill()
        ctx.shadowBlur = 0

        // Connections
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j]
          const dx = p.x - p2.x
          const dy = p.y - p2.y
          const d = Math.sqrt(dx * dx + dy * dy)
          if (d < 90) {
            ctx.beginPath()
            ctx.moveTo(p.x, p.y)
            ctx.lineTo(p2.x, p2.y)
            ctx.strokeStyle = `rgba(56, 189, 248, ${(1 - d / 90) * 0.2})`
            ctx.stroke()
          }
        }
      }

      animId = requestAnimationFrame(loop)
    }

    animId = requestAnimationFrame(loop)

    return () => {
      canvas.removeEventListener('mousemove', onMouseMove)
      canvas.removeEventListener('mouseleave', onMouseLeave)
      cancelAnimationFrame(animId)
    }
  }, [activeTab, particleDensity, speedMultiplier, gravityPull])

  // --- EXPERIMENT 2: HEAP MEMORY ALLOCATOR SIMULATOR ---
  const TOTAL_MEMORY = 512
  const [memoryBlocks, setMemoryBlocks] = useState<MemoryBlock[]>([
    { id: 1, size: 64, offset: 0, allocated: true, label: 'PageTable_0' },
    { id: 2, size: 32, offset: 64, allocated: true, label: 'WAL_Buffer' },
    { id: 3, size: 128, offset: 96, allocated: false, label: 'Free_Hole' },
    { id: 4, size: 96, offset: 224, allocated: true, label: 'Ring_Cache' },
    { id: 5, size: 192, offset: 320, allocated: false, label: 'Free_Hole' }
  ])

  const allocateMemory = (size: number) => {
    sound.playClick()
    const freeBlockIndex = memoryBlocks.findIndex((b) => !b.allocated && b.size >= size)
    if (freeBlockIndex === -1) {
      alert('Out of Memory: Fragmentation or pool exhausted! Try running compaction.')
      return
    }

    const freeBlock = memoryBlocks[freeBlockIndex]
    const newAllocated: MemoryBlock = {
      id: Date.now(),
      size,
      offset: freeBlock.offset,
      allocated: true,
      label: `Alloc_${size}B`
    }

    const remainingSize = freeBlock.size - size
    const newBlocks = [...memoryBlocks]

    if (remainingSize > 0) {
      const remainingBlock: MemoryBlock = {
        id: Date.now() + 1,
        size: remainingSize,
        offset: freeBlock.offset + size,
        allocated: false,
        label: 'Free_Hole'
      }
      newBlocks.splice(freeBlockIndex, 1, newAllocated, remainingBlock)
    } else {
      newBlocks.splice(freeBlockIndex, 1, newAllocated)
    }

    setMemoryBlocks(newBlocks)
  }

  const freeRandomBlock = () => {
    sound.playClick()
    const allocatedBlocks = memoryBlocks.filter((b) => b.allocated)
    if (allocatedBlocks.length === 0) return

    const target = allocatedBlocks[Math.floor(Math.random() * allocatedBlocks.length)]
    setMemoryBlocks(
      memoryBlocks.map((b) => (b.id === target.id ? { ...b, allocated: false, label: 'Free_Hole' } : b))
    )
  }

  const compactHeap = () => {
    sound.playSuccess()
    let currentOffset = 0
    const allocated = memoryBlocks.filter((b) => b.allocated)
    const compacted: MemoryBlock[] = allocated.map((b) => {
      const block = { ...b, offset: currentOffset }
      currentOffset += b.size
      return block
    })

    const remainingFree = TOTAL_MEMORY - currentOffset
    if (remainingFree > 0) {
      compacted.push({
        id: Date.now(),
        size: remainingFree,
        offset: currentOffset,
        allocated: false,
        label: 'Compacted_Free_Pool'
      })
    }
    setMemoryBlocks(compacted)
  }

  const resetHeap = () => {
    sound.playClick()
    setMemoryBlocks([
      { id: 1, size: 64, offset: 0, allocated: true, label: 'PageTable_0' },
      { id: 2, size: 32, offset: 64, allocated: true, label: 'WAL_Buffer' },
      { id: 3, size: 128, offset: 96, allocated: false, label: 'Free_Hole' },
      { id: 4, size: 96, offset: 224, allocated: true, label: 'Ring_Cache' },
      { id: 5, size: 192, offset: 320, allocated: false, label: 'Free_Hole' }
    ])
  }

  const allocatedBytes = memoryBlocks.filter((b) => b.allocated).reduce((acc, b) => acc + b.size, 0)
  const fragmentationRate = Math.round(
    (memoryBlocks.filter((b) => !b.allocated).length / Math.max(memoryBlocks.length, 1)) * 100
  )

  return (
    <section id="lab" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 border-b border-white/[0.08] pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono tracking-widest text-neutral-400 uppercase mb-2">
            <span className="w-2 h-2 rounded-full bg-purple-400" />
            <span>03 / THE EXPERIMENTAL LAB</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white font-heading">
            Interactive Sandboxes
          </h2>
          <p className="text-neutral-400 text-sm sm:text-base max-w-xl mt-2">
            Live interactive simulations showcasing GPU particle kinematics and low-level memory defragmentation directly in your browser.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex gap-2 p-1 rounded-xl bg-black/60 border border-white/10">
          <button
            onClick={() => {
              sound.playClick()
              setActiveTab('particles')
            }}
            className={`px-4 py-2 rounded-lg text-xs font-mono transition-all flex items-center gap-2 ${
              activeTab === 'particles'
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>01 / Gravitational Mesh</span>
          </button>
          <button
            onClick={() => {
              sound.playClick()
              setActiveTab('allocator')
            }}
            className={`px-4 py-2 rounded-lg text-xs font-mono transition-all flex items-center gap-2 ${
              activeTab === 'allocator'
                ? 'bg-purple-500/20 text-purple-300 border border-purple-500/40'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            <Cpu className="w-3.5 h-3.5" />
            <span>02 / Memory Allocator</span>
          </button>
        </div>
      </div>

      {/* Main Interactive Stage */}
      <div className="rounded-2xl bg-[#090b12] border border-white/15 overflow-hidden shadow-2xl p-6 sm:p-8">
        {activeTab === 'particles' ? (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
              <div>
                <h3 className="text-lg font-bold text-white font-heading flex items-center gap-2">
                  <span>Interactive Particle Kinematics & Vortex</span>
                  <Badge variant="accent">{fps} FPS V-Sync</Badge>
                </h3>
                <p className="text-xs text-neutral-400 mt-0.5">
                  Move your cursor over the canvas to dynamically bend particle trajectories and generate gravitational fields.
                </p>
              </div>

              {/* Controls bar */}
              <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-neutral-300">
                <div className="flex items-center gap-2">
                  <span className="text-neutral-400">Particles:</span>
                  <input
                    type="range"
                    min="20"
                    max="100"
                    value={particleDensity}
                    onChange={(e) => setParticleDensity(Number(e.target.value))}
                    className="w-20 accent-cyan-400 cursor-pointer"
                  />
                  <span>{particleDensity}</span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-neutral-400">Speed:</span>
                  <input
                    type="range"
                    min="0.5"
                    max="2.5"
                    step="0.5"
                    value={speedMultiplier}
                    onChange={(e) => setSpeedMultiplier(Number(e.target.value))}
                    className="w-16 accent-cyan-400 cursor-pointer"
                  />
                  <span>{speedMultiplier}x</span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-neutral-400">Vortex:</span>
                  <input
                    type="range"
                    min="0.5"
                    max="3.0"
                    step="0.5"
                    value={gravityPull}
                    onChange={(e) => setGravityPull(Number(e.target.value))}
                    className="w-16 accent-cyan-400 cursor-pointer"
                  />
                  <span>{gravityPull}x</span>
                </div>
              </div>
            </div>

            {/* Canvas Viewport */}
            <div className="relative rounded-xl overflow-hidden border border-white/10 bg-[#06070a] h-[360px]">
              <canvas ref={canvasRef} className="w-full h-full cursor-crosshair" />
              <div className="absolute bottom-3 right-3 text-[10px] font-mono text-neutral-500 bg-black/60 px-2 py-1 rounded border border-white/5 pointer-events-none">
                WEBGL/CANVAS HARDWARE ACCELERATED
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
              <div>
                <h3 className="text-lg font-bold text-white font-heading flex items-center gap-2">
                  <span>Virtual Heap Allocation & Fragmentation Simulator</span>
                  <Badge variant="warning">{fragmentationRate}% Fragmented</Badge>
                </h3>
                <p className="text-xs text-neutral-400 mt-0.5">
                  Simulates dynamic C-style memory allocations, memory hole fragmentation, and garbage compaction.
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-2">
                <button
                  onClick={() => allocateMemory(32)}
                  className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-xs font-mono text-white transition-colors"
                >
                  + malloc(32B)
                </button>
                <button
                  onClick={() => allocateMemory(64)}
                  className="px-3 py-1.5 rounded-lg bg-cyan-500/20 hover:bg-cyan-500/30 text-xs font-mono text-cyan-300 border border-cyan-500/30 transition-colors"
                >
                  + malloc(64B)
                </button>
                <button
                  onClick={freeRandomBlock}
                  className="px-3 py-1.5 rounded-lg bg-red-500/20 hover:bg-red-500/30 text-xs font-mono text-red-300 border border-red-500/30 transition-colors"
                >
                  free(random)
                </button>
                <button
                  onClick={compactHeap}
                  className="px-3 py-1.5 rounded-lg bg-emerald-500/20 hover:bg-emerald-500/30 text-xs font-mono text-emerald-300 border border-emerald-500/30 transition-colors"
                >
                  compact()
                </button>
                <button
                  onClick={resetHeap}
                  className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-neutral-400 transition-colors"
                  title="Reset Heap"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Visual Memory Blocks Tape */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-mono text-neutral-400">
                <span>HEAP OFFSET: 0x0000</span>
                <span>
                  UTILIZATION: {allocatedBytes} / {TOTAL_MEMORY} BYTES (
                  {Math.round((allocatedBytes / TOTAL_MEMORY) * 100)}%)
                </span>
                <span>HEAP OFFSET: 0x0200</span>
              </div>

              {/* Continuous Memory Tape */}
              <div className="w-full h-16 rounded-xl bg-black/60 border border-white/15 p-1.5 flex gap-1 overflow-x-auto">
                {memoryBlocks.map((block) => {
                  const widthPercent = (block.size / TOTAL_MEMORY) * 100
                  return (
                    <div
                      key={block.id}
                      style={{ width: `${widthPercent}%` }}
                      className={`h-full rounded-lg transition-all duration-300 flex flex-col items-center justify-center p-1 relative group cursor-pointer ${
                        block.allocated
                          ? 'bg-gradient-to-br from-cyan-600/80 to-blue-700/80 border border-cyan-400/50 text-white shadow-md'
                          : 'bg-white/[0.04] border border-dashed border-white/20 text-neutral-500 hover:border-white/40'
                      }`}
                      onClick={() => {
                        if (block.allocated) {
                          sound.playClick()
                          setMemoryBlocks(
                            memoryBlocks.map((b) =>
                              b.id === block.id ? { ...b, allocated: false, label: 'Free_Hole' } : b
                            )
                          )
                        }
                      }}
                    >
                      <span className="text-[10px] font-mono font-bold truncate max-w-full">
                        {block.size}B
                      </span>
                      <span className="text-[9px] font-mono opacity-80 truncate max-w-full">
                        {block.label}
                      </span>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Legend & Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 text-xs font-mono">
              <div className="p-3 rounded-lg bg-white/[0.02] border border-white/5">
                <div className="text-neutral-500">ACTIVE BLOCKS</div>
                <div className="text-base font-bold text-white mt-0.5">
                  {memoryBlocks.filter((b) => b.allocated).length} Allocated
                </div>
              </div>
              <div className="p-3 rounded-lg bg-white/[0.02] border border-white/5">
                <div className="text-neutral-500">FREE HOLES</div>
                <div className="text-base font-bold text-amber-300 mt-0.5">
                  {memoryBlocks.filter((b) => !b.allocated).length} Holes
                </div>
              </div>
              <div className="p-3 rounded-lg bg-white/[0.02] border border-white/5">
                <div className="text-neutral-500">MAX FREE CHUNK</div>
                <div className="text-base font-bold text-emerald-300 mt-0.5">
                  {Math.max(...memoryBlocks.filter((b) => !b.allocated).map((b) => b.size), 0)} Bytes
                </div>
              </div>
              <div className="p-3 rounded-lg bg-white/[0.02] border border-white/5">
                <div className="text-neutral-500">ALLOCATION STRATEGY</div>
                <div className="text-base font-bold text-cyan-300 mt-0.5">
                  First-Fit Scan
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
