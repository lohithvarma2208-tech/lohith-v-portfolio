import React, { useState, useEffect, useRef } from 'react'
import { X, Minus, Terminal as TerminalIcon, Sparkles } from 'lucide-react'
import { useTheme } from '../../context/ThemeContext'
import { sound } from '../../utils/sound'
import type { AccentTheme, TerminalLogEntry } from '../../types'

export const TerminalModal: React.FC = () => {
  const { isTerminalOpen, setTerminalOpen, setTheme } = useTheme()
  const [inputVal, setInputVal] = useState('')
  const [historyIndex, setHistoryIndex] = useState<number>(-1)
  const [cmdHistory, setCmdHistory] = useState<string[]>([])
  const [matrixMode, setMatrixMode] = useState(false)
  const [logs, setLogs] = useState<TerminalLogEntry[]>([
    {
      type: 'system',
      text: 'LOHITH.V OS [Kernel v6.12-x86_64-arch-lv] — Interactive Shell v2.6'
    },
    {
      type: 'system',
      text: 'Type "help" to display available commands, or "neofetch" for system telemetry.'
    }
  ])

  const bottomRef = useRef<HTMLDivElement | null>(null)
  const inputRef = useRef<HTMLInputElement | null>(null)
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {
    if (isTerminalOpen) {
      setTimeout(() => inputRef.current?.focus(), 100)
    }
  }, [isTerminalOpen])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [logs])

  // Matrix Rain Animation when activated
  useEffect(() => {
    if (!matrixMode) return
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    canvas.width = canvas.parentElement?.clientWidth || 600
    canvas.height = canvas.parentElement?.clientHeight || 400

    const chars = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン'
    const fontSize = 14
    const columns = Math.floor(canvas.width / fontSize)
    const drops = Array(columns).fill(1)

    let animId: number
    const draw = () => {
      ctx.fillStyle = 'rgba(5, 5, 8, 0.08)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      ctx.fillStyle = '#00ff88'
      ctx.font = `${fontSize}px monospace`

      for (let i = 0; i < drops.length; i++) {
        const char = chars.charAt(Math.floor(Math.random() * chars.length))
        ctx.fillText(char, i * fontSize, drops[i] * fontSize)

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0
        }
        drops[i]++
      }
      animId = requestAnimationFrame(draw)
    }

    draw()
    return () => cancelAnimationFrame(animId)
  }, [matrixMode])

  if (!isTerminalOpen) return null

  const handleCommand = (rawCmd: string) => {
    const trimmed = rawCmd.trim()
    if (!trimmed) return

    sound.playClick()
    setCmdHistory((prev) => [...prev, trimmed])
    setHistoryIndex(-1)

    // Log the typed command
    const newLogs: TerminalLogEntry[] = [...logs, { type: 'command', text: `$ ${trimmed}` }]
    const parts = trimmed.split(' ')
    const command = parts[0].toLowerCase()
    const args = parts.slice(1)

    switch (command) {
      case 'help':
        newLogs.push({
          type: 'output',
          text: `AVAILABLE COMMANDS:
  neofetch       - Display system specifications & brand identity
  about          - Overview of Lohith Varma (CS undergrad, focus, ambitions)
  contact        - Direct contact coordinates & links
  projects       - Index of flagship distributed systems & research projects
  skills         - Comprehensive technical capability matrix
  admin          - Launch Secure Management CMS Dashboard (#admin)
  ethos          - First-principles engineering philosophy & values
  matrix         - Toggle dynamic green phosphor Matrix rain mode
  theme <color>  - Switch theme palette: cyan | emerald | amber | violet
  time           - Current timestamp (Bangalore / IST)
  clear          - Clear terminal logs
  exit           - Close terminal interface`
        })
        break

      case 'admin':
      case 'cms':
        newLogs.push({
          type: 'output',
          text: `[LV-AUTH] Launching Secure Portfolio Admin Console...`
        })
        setTimeout(() => {
          setTerminalOpen(false)
          window.location.hash = '#admin'
        }, 500)
        break

      case 'contact':
      case 'socials':
      case 'email':
        newLogs.push({
          type: 'output',
          text: `DIRECT COORDINATES:
----------------------------------------
Email:    lohithvarma2208@gmail.com
GitHub:   https://github.com/lohithvarma2208-tech
LinkedIn: https://www.linkedin.com/in/lohith-varma-3b4153421/
Location: Bengaluru, India (IST)`
        })
        break

      case 'about':
        newLogs.push({
          type: 'output',
          text: `LOHITH VARMA (LOHITH.V)
----------------------------------------
Role:       Computer Science Undergraduate & Systems Builder
Focus:      Distributed Systems, High-Throughput Storage, AI Agent Runtimes
Tagline:    "Learning relentlessly. Building deliberately. Evolving continuously."
Location:   Bengaluru, India (UTC+5:30)
Philosophy: Build from first principles. Speed is a feature. Details make the product.
Seeking:    2027 Summer/Fall SWE Internships & High-Impact Engineering Roles`
        })
        break

      case 'neofetch':
      case 'specs':
        newLogs.push({
          type: 'ascii',
          text: `
     .------.         User:        guntur-lohith-varma@kluniversity
    /  LV.   \\        Host:        KL University Student Node
   |  (====)  |       Degree:      B.Tech Computer Science & Engineering
    \\        /        Uptime:      Active since 2024
     '------'         Languages:   Java, TypeScript, JavaScript, SQL
                      Focus:       Campus Utilities, Full-Stack Web, LeetCode
                      Status:      Available for 2027 SWE Internships & Roles
          `
        })
        break

      case 'projects':
        newLogs.push({
          type: 'output',
          text: `FEATURED PROJECTS:
1. VSS75        - Virtual Student Space: Campus Academic Knowledge Network (TypeScript)
2. KL ERP Buddy - Student Academic Dashboard & Attendance Bunk Calculator (JavaScript)
3. Notely       - Student Note-Writing & Academic Services Marketplace (TypeScript)
4. Lohith.V     - 3D Personal Digital Universe & Engineering Portfolio (React 19, Three.js)`
        })
        break

      case 'skills':
        newLogs.push({
          type: 'output',
          text: `TECHNICAL ARSENAL:
- Core:         Java (OOP & Scaler Topics Certified), TypeScript, JavaScript, C/C++, Python
- Web & UI:     React 19, Three.js (WebGL), Tailwind CSS, Vite, HTML5/CSS3
- Data & Cloud: Supabase (PostgreSQL), REST APIs, Vercel Edge, Render, Git/GitHub
- CS Core:      Data Structures, Algorithms (LeetCode), OOP, DBMS, OS Fundamentals`
        })
        break

      case 'ethos':
      case 'philosophy':
        newLogs.push({
          type: 'output',
          text: `CORE ENGINEERING MANIFESTO:
1. Understand the hardware. Abstractions change; physics does not.
2. Respect the 16.6ms frame budget. Software should feel tactile and immediate.
3. Build deliberately. Real learning begins when you write the engine from scratch.
4. Quiet confidence through verifiable excellence.`
        })
        break

      case 'matrix':
        setMatrixMode((prev) => !prev)
        newLogs.push({
          type: 'system',
          text: matrixMode ? 'Matrix visual mode deactivated.' : 'Matrix visual mode initialized.'
        })
        break

      case 'theme':
        if (args[0] && ['cyan', 'emerald', 'amber', 'violet'].includes(args[0])) {
          setTheme(args[0] as AccentTheme)
          newLogs.push({
            type: 'system',
            text: `System theme accent set to: ${args[0].toUpperCase()}`
          })
        } else {
          newLogs.push({
            type: 'error',
            text: 'Usage: theme <cyan | emerald | amber | violet>'
          })
        }
        break

      case 'clear':
        setLogs([])
        setInputVal('')
        return

      case 'exit':
      case 'quit':
        setTerminalOpen(false)
        return

      case 'time':
      case 'date':
        newLogs.push({
          type: 'output',
          text: `Current System Time: ${new Date().toLocaleString('en-US', { timeZone: 'Asia/Kolkata' })} (IST)`
        })
        break

      case 'sudo':
        newLogs.push({
          type: 'error',
          text: 'Permission denied: user "visitor" is not in sudoers file. This incident will be reported.'
        })
        break

      case 'echo':
        newLogs.push({
          type: 'output',
          text: args.join(' ')
        })
        break

      default:
        newLogs.push({
          type: 'error',
          text: `Command not found: "${command}". Type "help" for a list of valid commands.`
        })
        break
    }

    setLogs(newLogs)
    setInputVal('')
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    sound.playKeystroke()

    if (e.key === 'Enter') {
      handleCommand(inputVal)
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      if (cmdHistory.length > 0) {
        const nextIdx = historyIndex + 1 < cmdHistory.length ? historyIndex + 1 : historyIndex
        setHistoryIndex(nextIdx)
        setInputVal(cmdHistory[cmdHistory.length - 1 - nextIdx] || '')
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      if (historyIndex > 0) {
        const nextIdx = historyIndex - 1
        setHistoryIndex(nextIdx)
        setInputVal(cmdHistory[cmdHistory.length - 1 - nextIdx] || '')
      } else {
        setHistoryIndex(-1)
        setInputVal('')
      }
    } else if (e.key === 'Escape') {
      setTerminalOpen(false)
    }
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-fadeIn">
      <div
        className="relative w-full max-w-3xl h-[560px] max-h-[85vh] rounded-2xl bg-[#08090f]/95 border border-white/15 shadow-[0_24px_70px_rgba(0,0,0,0.85)] flex flex-col overflow-hidden font-mono"
        onClick={() => inputRef.current?.focus()}
      >
        {/* Terminal Header Bar */}
        <div className="flex items-center justify-between px-4 py-3 bg-[#0c0e17] border-b border-white/10 select-none">
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                sound.playClick()
                setTerminalOpen(false)
              }}
              title="Close terminal"
              className="w-3 h-3 rounded-full bg-red-500/80 hover:bg-red-400 transition-colors flex items-center justify-center group"
            >
              <X className="w-2 h-2 text-black opacity-0 group-hover:opacity-100" />
            </button>
            <button
              onClick={() => {
                sound.playClick()
                setTerminalOpen(false)
              }}
              title="Minimize terminal"
              className="w-3 h-3 rounded-full bg-yellow-500/80 hover:bg-yellow-400 transition-colors flex items-center justify-center group"
            >
              <Minus className="w-2 h-2 text-black opacity-0 group-hover:opacity-100" />
            </button>
            <button
              onClick={() => {
                sound.playClick()
                setMatrixMode(!matrixMode)
              }}
              title="Toggle Matrix Rain"
              className={`w-3 h-3 rounded-full ${
                matrixMode ? 'bg-emerald-400 animate-pulse' : 'bg-green-500/80'
              } hover:bg-green-400 transition-colors flex items-center justify-center group`}
            >
              <Sparkles className="w-2 h-2 text-black opacity-0 group-hover:opacity-100" />
            </button>
          </div>

          <div className="flex items-center gap-2 text-xs text-neutral-400">
            <TerminalIcon className="w-3.5 h-3.5 text-cyan-400" />
            <span className="font-semibold text-neutral-200">lohith@core-vault:~ (zsh)</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                sound.playClick()
                setMatrixMode(!matrixMode)
              }}
              className={`px-2 py-0.5 rounded text-[10px] font-mono border transition-colors ${
                matrixMode
                  ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                  : 'bg-white/5 text-neutral-400 border-white/10 hover:text-white'
              }`}
            >
              MATRIX
            </button>
            <button
              onClick={() => {
                sound.playClick()
                setLogs([])
              }}
              className="px-2 py-0.5 rounded text-[10px] font-mono bg-white/5 text-neutral-400 border border-white/10 hover:text-white transition-colors"
            >
              CLEAR
            </button>
          </div>
        </div>

        {/* Matrix Canvas Overlay */}
        {matrixMode && (
          <canvas
            ref={canvasRef}
            className="absolute inset-0 pointer-events-none opacity-30 z-0"
          />
        )}

        {/* Terminal Body Logs */}
        <div className="relative z-10 flex-1 p-5 overflow-y-auto space-y-3 text-xs leading-relaxed select-text">
          {logs.map((log, index) => {
            if (log.type === 'command') {
              return (
                <div key={index} className="flex items-start gap-2 text-cyan-300 font-semibold">
                  <span>{log.text}</span>
                </div>
              )
            }
            if (log.type === 'system') {
              return (
                <div key={index} className="text-neutral-400 italic">
                  [sys] {log.text}
                </div>
              )
            }
            if (log.type === 'error') {
              return (
                <div key={index} className="text-red-400 bg-red-500/10 p-2 rounded border border-red-500/20">
                  {log.text}
                </div>
              )
            }
            if (log.type === 'ascii') {
              return (
                <pre key={index} className="text-cyan-400 whitespace-pre overflow-x-auto leading-tight font-mono">
                  {log.text}
                </pre>
              )
            }
            return (
              <pre
                key={index}
                className="text-neutral-300 whitespace-pre-wrap font-mono leading-relaxed"
              >
                {log.text}
              </pre>
            )
          })}

          <div ref={bottomRef} />
        </div>

        {/* Active Command Prompt Line */}
        <div className="relative z-10 flex items-center gap-2 px-5 py-3.5 bg-[#0a0c14] border-t border-white/10">
          <span className="text-cyan-400 font-bold">$</span>
          <input
            ref={inputRef}
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type 'help', 'neofetch', 'projects', 'about'..."
            className="flex-1 bg-transparent text-white placeholder-neutral-500 focus:outline-none text-xs font-mono"
            autoFocus
          />
          <span className="text-[10px] text-neutral-500 hidden sm:inline">
            Press ESC to close
          </span>
        </div>
      </div>
    </div>
  )
}
