import { useState, useEffect } from 'react'
import { ThemeProvider } from './context/ThemeContext'
import { PortfolioDataProvider } from './context/PortfolioDataContext'
import { ParticleBackground } from './components/common/ParticleBackground'
import { CustomCursor } from './components/common/CustomCursor'
import { Navbar } from './components/common/Navbar'
import { HeroSection } from './components/sections/HeroSection'
import { TechMarquee } from './components/common/TechMarquee'
import { ProjectsSection } from './components/sections/ProjectsSection'
import { ArsenalSection } from './components/sections/ArsenalSection'
import { TimelineSection } from './components/sections/TimelineSection'
import { ContactSection } from './components/sections/ContactSection'
import { Footer } from './components/common/Footer'
import { TerminalModal } from './components/terminal/TerminalModal'
import { CommandPalette } from './components/command/CommandPalette'
import { RobotOpeningScene } from './components/cinematic/RobotOpeningScene'
import { RobotCompanionOverlay } from './components/common/RobotCompanionOverlay'
import { AdminPage } from './components/admin/AdminPage'

export function App() {
  const [showRobotIntro, setShowRobotIntro] = useState<boolean>(true)
  const [isAdminView, setIsAdminView] = useState<boolean>(() => {
    return typeof window !== 'undefined' && window.location.hash === '#admin'
  })

  // Hash-based navigation listener for #admin
  useEffect(() => {
    const handleHashChange = () => {
      setIsAdminView(window.location.hash === '#admin')
    }
    window.addEventListener('hashchange', handleHashChange)
    return () => window.removeEventListener('hashchange', handleHashChange)
  }, [])

  return (
    <ThemeProvider>
      <PortfolioDataProvider>
        {isAdminView ? (
          // Secure Admin CMS Page (Access restricted to Lohith Varma)
          <AdminPage
            onBackToSite={() => {
              window.location.hash = ''
              setIsAdminView(false)
            }}
          />
        ) : (
          // Main Public Portfolio Experience
          <div className="relative min-h-screen bg-[#050508] text-neutral-200 overflow-x-hidden selection:bg-cyan-500/25 selection:text-cyan-200">
            {/* Animated Robot Opening Scene & Visitor Guide */}
            {showRobotIntro && (
              <RobotOpeningScene onEnterPortfolio={() => setShowRobotIntro(false)} />
            )}

            {/* Interactive Custom Cursor */}
            <CustomCursor />

            {/* Dynamic GPU Canvas Particle Mesh */}
            <ParticleBackground />

            {/* Global Floating Navigation Bar */}
            <Navbar onReplayRobot={() => setShowRobotIntro(true)} />

            {/* Main Pages Flow */}
            <main className="relative z-10 flex flex-col">
              {/* Animated Hero with 3D Cursor-Tracking Character */}
              <HeroSection />

              {/* Continuous Tech Ticker */}
              <TechMarquee />

              {/* Main Page 01: Selected Work / Projects */}
              <ProjectsSection />

              {/* Main Page 02: Technical Arsenal & Credentials Hub (Skills, Experience, Certs, OSS, Honors) */}
              <ArsenalSection />

              {/* Main Page 03: About & Journey */}
              <TimelineSection />

              {/* Main Page 04: Contact Console */}
              <ContactSection />
            </main>

            {/* Minimal Footer */}
            <Footer onOpenAdmin={() => {
              window.location.hash = '#admin'
              setIsAdminView(true)
            }} />

            {/* Persistent In-Portfolio Robot Companion Guide */}
            {!showRobotIntro && <RobotCompanionOverlay />}

            {/* Interactive Developer Tools */}
            <TerminalModal />
            <CommandPalette />
          </div>
        )}
      </PortfolioDataProvider>
    </ThemeProvider>
  )
}

export default App
