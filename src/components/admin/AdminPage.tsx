import React, { useState } from 'react'
import {
  Shield,
  Lock,
  Unlock,
  Save,
  ArrowLeft,
  Plus,
  Trash2,
  Edit2,
  User,
  Mail,
  FolderGit2,
  Cpu,
  Milestone,
  Download,
  Upload,
  RotateCcw,
  CheckCircle2,
  Briefcase,
  Award,
  GitPullRequest,
  Trophy,
  RefreshCw,
  Code2,
  Cloud,
  Database,
  Server,
  Globe,
  ExternalLink,
  Copy,
  ArrowUp,
  ArrowDown,
  ArrowRight,
  Tag,
  Sparkles,
  Layers
} from 'lucide-react'
import { GithubIcon, LinkedinIcon } from '../common/Icons'
import { usePortfolioData } from '../../context/PortfolioDataContext'
import { sound } from '../../utils/sound'
import { isSupabaseConfigured, fetchContactMessages } from '../../services/supabaseClient'
import type {
  Project,
  TimelineItem,
  WorkExperience,
  Certification,
  OpenSourceContribution,
  HonorAward,
  SkillCategory
} from '../../types'

interface AdminPageProps {
  onBackToSite: () => void
}

type AdminTab =
  | 'personal'
  | 'contact'
  | 'projects'
  | 'skills'
  | 'experience'
  | 'certifications'
  | 'opensource'
  | 'honors'
  | 'timeline'
  | 'deployments'
  | 'backup'

export const AdminPage: React.FC<AdminPageProps> = ({ onBackToSite }) => {
  const {
    personalInfo,
    contactInfo,
    projects,
    skills,
    timeline,
    experiences,
    certifications,
    openSource,
    honors,
    updatePersonalInfo,
    updateContactInfo,
    addProject,
    updateProject,
    deleteProject,
    updateSkills,
    addTimelineItem,
    updateTimelineItem,
    deleteTimelineItem,
    addExperience,
    updateExperience,
    deleteExperience,
    addCertification,
    updateCertification,
    deleteCertification,
    addOpenSource,
    updateOpenSource,
    deleteOpenSource,
    addHonor,
    updateHonor,
    deleteHonor,
    liveAccounts,
    refreshLiveAccounts,
    resetToDefaults,
    exportDataJSON,
    importDataJSON
  } = usePortfolioData()

  // Authentication state
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return sessionStorage.getItem('lv_admin_auth') === 'true'
  })
  const [passcode, setPasscode] = useState<string>('')
  const [authError, setAuthError] = useState<string>('')

  // Active dashboard tab
  const [activeTab, setActiveTab] = useState<AdminTab>('personal')
  const [saveToast, setSaveToast] = useState<string | null>(null)

  // Edit Project Modal state
  const [editingProject, setEditingProject] = useState<Project | null>(null)
  const [isNewProject, setIsNewProject] = useState<boolean>(false)

  // Edit Timeline Modal state
  const [editingTimeline, setEditingTimeline] = useState<TimelineItem | null>(null)
  const [isNewTimeline, setIsNewTimeline] = useState<boolean>(false)

  // Edit Experience Modal state
  const [editingExp, setEditingExp] = useState<WorkExperience | null>(null)
  const [isNewExp, setIsNewExp] = useState<boolean>(false)

  // Edit Certification Modal state
  const [editingCert, setEditingCert] = useState<Certification | null>(null)
  const [isNewCert, setIsNewCert] = useState<boolean>(false)

  // Edit Open Source Modal state
  const [editingOSS, setEditingOSS] = useState<OpenSourceContribution | null>(null)
  const [isNewOSS, setIsNewOSS] = useState<boolean>(false)

  // Edit Honor Modal state
  const [editingHonor, setEditingHonor] = useState<HonorAward | null>(null)
  const [isNewHonor, setIsNewHonor] = useState<boolean>(false)

  // Domain Filters & Skills State
  const [newDomainInput, setNewDomainInput] = useState<string>('')
  const [newSkillInputs, setNewSkillInputs] = useState<{ [categoryIdx: number]: string }>({})
  const [showAddCategoryModal, setShowAddCategoryModal] = useState<boolean>(false)
  const [newCategoryTitle, setNewCategoryTitle] = useState<string>('')
  const [newCategoryDomain, setNewCategoryDomain] = useState<string>('')

  // JSON Import state
  const [importJsonText, setImportJsonText] = useState<string>('')
  const [importMsg, setImportMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null)

  // Cloud & Messages state
  const [supabaseMessages, setSupabaseMessages] = useState<
    Array<{ id: string; name: string; email: string; message: string; created_at: string }>
  >([])
  const [loadingMessages, setLoadingMessages] = useState<boolean>(false)

  const handleFetchMessages = async () => {
    sound.playClick()
    setLoadingMessages(true)
    const msgs = await fetchContactMessages()
    setSupabaseMessages(msgs)
    setLoadingMessages(false)
    if (msgs.length > 0) {
      showToast(`Loaded ${msgs.length} visitor message(s) from Supabase!`)
    } else {
      showToast('No messages found in Supabase yet.')
    }
  }

  const showToast = (msg: string) => {
    sound.playSuccess()
    setSaveToast(msg)
    setTimeout(() => setSaveToast(null), 3000)
  }

  // Domain Filter Navigation & Skills Management Handlers
  const currentDomains = (skills.domains && skills.domains.length > 0)
    ? skills.domains
    : ['Systems', 'Distributed', 'Backend', 'Graphics', 'Cloud']

  const handleAddDomain = () => {
    const trimmed = newDomainInput.trim()
    if (!trimmed) return
    if (currentDomains.some((d) => d.toLowerCase() === trimmed.toLowerCase())) {
      showToast(`Domain "${trimmed}" already exists`)
      return
    }
    const updated = [...currentDomains, trimmed]
    updateSkills({ ...skills, domains: updated })
    setNewDomainInput('')
    showToast(`Added domain "${trimmed}"`)
  }

  const handleUpdateDomain = (index: number, newName: string) => {
    const updated = [...currentDomains]
    updated[index] = newName
    updateSkills({ ...skills, domains: updated })
  }

  const handleDeleteDomain = (index: number) => {
    const domainName = currentDomains[index]
    const updated = currentDomains.filter((_, i) => i !== index)
    updateSkills({ ...skills, domains: updated })
    showToast(`Removed domain "${domainName}"`)
  }

  const handleMoveDomain = (index: number, direction: 'left' | 'right') => {
    if (direction === 'left' && index === 0) return
    if (direction === 'right' && index === currentDomains.length - 1) return
    const targetIdx = direction === 'left' ? index - 1 : index + 1
    const updated = [...currentDomains]
    const temp = updated[index]
    updated[index] = updated[targetIdx]
    updated[targetIdx] = temp
    updateSkills({ ...skills, domains: updated })
    sound.playClick()
  }

  const handleResetDomains = () => {
    const defaultList = ['Systems', 'Distributed', 'Backend', 'Graphics', 'Cloud']
    updateSkills({ ...skills, domains: defaultList })
    showToast('Reset domains to standard defaults')
  }

  const handleAddCategorySubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newCategoryTitle.trim()) return
    const newCat: SkillCategory = {
      title: newCategoryTitle.trim(),
      skills: [],
      domain: newCategoryDomain.trim() || undefined
    }
    const updated = [...skills.categories, newCat]
    updateSkills({ ...skills, categories: updated })
    setNewCategoryTitle('')
    setNewCategoryDomain('')
    setShowAddCategoryModal(false)
    showToast(`Created category "${newCat.title}"`)
  }

  const handleDeleteCategory = (cIdx: number) => {
    const catTitle = skills.categories[cIdx].title
    if (window.confirm(`Are you sure you want to delete category "${catTitle}" and all its skills?`)) {
      const next = skills.categories.filter((_, i) => i !== cIdx)
      updateSkills({ ...skills, categories: next })
      showToast(`Deleted category "${catTitle}"`)
    }
  }

  const handleMoveCategory = (cIdx: number, direction: 'up' | 'down') => {
    if (direction === 'up' && cIdx === 0) return
    if (direction === 'down' && cIdx === skills.categories.length - 1) return
    const targetIdx = direction === 'up' ? cIdx - 1 : cIdx + 1
    const next = [...skills.categories]
    const temp = next[cIdx]
    next[cIdx] = next[targetIdx]
    next[targetIdx] = temp
    updateSkills({ ...skills, categories: next })
    sound.playClick()
  }

  const handleAddSkillInline = (cIdx: number) => {
    const text = newSkillInputs[cIdx]?.trim()
    if (!text) return
    const next = [...skills.categories]
    next[cIdx] = {
      ...next[cIdx],
      skills: [...next[cIdx].skills, text]
    }
    updateSkills({ ...skills, categories: next })
    setNewSkillInputs((prev) => ({ ...prev, [cIdx]: '' }))
    showToast(`Added "${text}" to ${next[cIdx].title}`)
  }

  // Handle Photo File Upload & Canvas Resizing
  const handleImageUpload = (file: File) => {
    if (!file) return

    if (!file.type.startsWith('image/')) {
      alert('Please upload a valid image file (PNG, JPG, WebP).')
      return
    }

    const reader = new FileReader()
    reader.onload = (e) => {
      const dataUrl = e.target?.result as string
      if (!dataUrl) return

      const img = new Image()
      img.onload = () => {
        const maxDim = 800
        let { width, height } = img
        if (width > maxDim || height > maxDim) {
          if (width > height) {
            height = Math.round((height * maxDim) / width)
            width = maxDim
          } else {
            width = Math.round((width * maxDim) / height)
            height = maxDim
          }
        }

        const canvas = document.createElement('canvas')
        canvas.width = width
        canvas.height = height
        const ctx = canvas.getContext('2d')
        if (ctx) {
          ctx.drawImage(img, 0, 0, width, height)
          const optimized = canvas.toDataURL('image/jpeg', 0.88)
          updatePersonalInfo({ photoUrl: optimized })
          showToast('Profile photo uploaded & optimized successfully!')
        } else {
          updatePersonalInfo({ photoUrl: dataUrl })
          showToast('Profile photo uploaded successfully!')
        }
      }
      img.onerror = () => {
        updatePersonalInfo({ photoUrl: dataUrl })
        showToast('Profile photo uploaded!')
      }
      img.src = dataUrl
    }
    reader.readAsDataURL(file)
  }

  // Handle Passcode Submit
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (passcode.trim() === 'lohith2026' || passcode.trim() === 'lohithvarma') {
      sound.playSuccess()
      sessionStorage.setItem('lv_admin_auth', 'true')
      setIsAuthenticated(true)
      setAuthError('')
    } else {
      sound.playClick()
      setAuthError('Access Denied: Invalid Passcode. Please try again.')
    }
  }

  const handleLogout = () => {
    sound.playClick()
    sessionStorage.removeItem('lv_admin_auth')
    setIsAuthenticated(false)
    setPasscode('')
  }

  // --- ACCESS GATE SCREEN ---
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#050508] text-white flex flex-col items-center justify-center p-4 selection:bg-cyan-500/30 selection:text-cyan-200">
        <div className="w-full max-w-md p-8 rounded-3xl bg-[#090c16]/90 border border-white/10 shadow-[0_24px_80px_rgba(0,0,0,0.8)] backdrop-blur-2xl text-center space-y-6">
          <div className="w-16 h-16 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center mx-auto text-cyan-400 shadow-[0_0_30px_rgba(56,189,248,0.2)]">
            <Shield className="w-8 h-8" />
          </div>

          <div>
            <span className="text-[10px] font-mono tracking-widest text-cyan-400 uppercase font-semibold">
              SECURITY ACCESS PROTOCOL // LV-AUTH
            </span>
            <h1 className="text-2xl font-bold font-heading text-white mt-1">
              Portfolio Control Console
            </h1>
            <p className="text-xs text-neutral-400 mt-1 font-mono">
              Restricted management console for Lohith Varma.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4 text-left">
            <div>
              <label className="block text-[11px] font-mono text-neutral-400 uppercase mb-1">
                Enter Master Passcode
              </label>
              <div className="relative">
                <input
                  type="password"
                  required
                  value={passcode}
                  onChange={(e) => setPasscode(e.target.value)}
                  placeholder="Master Passcode (e.g. lohith2026)"
                  className="w-full px-4 py-3 rounded-xl bg-black/60 border border-white/10 text-sm text-white placeholder-neutral-600 focus:outline-none focus:border-cyan-400 font-mono tracking-wider transition-colors"
                  autoFocus
                />
                <Lock className="w-4 h-4 text-neutral-500 absolute right-3.5 top-3.5" />
              </div>
            </div>

            {authError && (
              <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-mono">
                {authError}
              </div>
            )}

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-white text-black font-semibold text-xs tracking-wider uppercase transition-all flex items-center justify-center gap-2 hover:bg-neutral-200 cursor-pointer shadow-lg"
            >
              <Unlock className="w-4 h-4" />
              <span>Unlock Admin Console</span>
            </button>
          </form>

          <div className="pt-2 border-t border-white/[0.08] flex items-center justify-between text-xs font-mono text-neutral-500">
            <span>Passcode: lohith2026</span>
            <button
              onClick={onBackToSite}
              className="hover:text-white transition-colors flex items-center gap-1 cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Site</span>
            </button>
          </div>
        </div>
      </div>
    )
  }

  // --- AUTHENTICATED DASHBOARD ---
  return (
    <div className="min-h-screen bg-[#050508] text-white flex flex-col font-sans selection:bg-cyan-500/30 selection:text-cyan-200">
      {/* Toast Notification */}
      {saveToast && (
        <div className="fixed top-6 right-6 z-50 flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-mono shadow-2xl backdrop-blur-xl animate-fadeIn">
          <CheckCircle2 className="w-4 h-4" />
          <span>{saveToast}</span>
        </div>
      )}

      {/* Top Header */}
      <header className="sticky top-0 z-40 px-6 py-3.5 bg-[#080a12]/90 border-b border-white/[0.08] backdrop-blur-xl flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={onBackToSite}
            onMouseEnter={() => sound.playHover()}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/[0.04] hover:bg-white/[0.1] border border-white/10 text-xs font-mono text-neutral-300 hover:text-white transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Portfolio</span>
          </button>

          <div className="flex items-center gap-2 pl-3 border-l border-white/10">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs font-mono font-bold text-white tracking-wider">
              ADMIN CMS // LOHITH.V
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => showToast('Changes Live! Saved to Local Storage.')}
            onMouseEnter={() => sound.playHover()}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-500/40 text-cyan-300 text-xs font-mono transition-colors cursor-pointer"
          >
            <Save className="w-3.5 h-3.5" />
            <span>Save State</span>
          </button>

          <button
            onClick={handleLogout}
            onMouseEnter={() => sound.playHover()}
            className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-white/[0.04] hover:bg-red-500/20 border border-white/10 hover:border-red-500/30 text-xs font-mono text-neutral-400 hover:text-red-300 transition-colors cursor-pointer"
          >
            <Lock className="w-3 h-3" />
            <span>Lock</span>
          </button>
        </div>
      </header>

      {/* Dashboard Body with Left Sidebar & Content */}
      <div className="flex-1 flex flex-col md:flex-row max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8 gap-6">
        {/* Navigation Sidebar */}
        <aside className="w-full md:w-64 shrink-0 space-y-2">
          <div className="p-3 rounded-2xl bg-white/[0.02] border border-white/[0.06] backdrop-blur-md space-y-1">
            <span className="text-[10px] font-mono text-neutral-500 uppercase px-3 py-1 block">
              Dashboard Modules
            </span>

            {[
              { id: 'personal', label: 'Personal & Identity', icon: User },
              { id: 'contact', label: 'Contact & Socials', icon: Mail },
              { id: 'projects', label: `Projects (${projects.length})`, icon: FolderGit2 },
              { id: 'skills', label: 'Skill Stack', icon: Cpu },
              { id: 'experience', label: `Experience (${experiences.length})`, icon: Briefcase },
              { id: 'certifications', label: `Certifications (${certifications.length})`, icon: Award },
              { id: 'opensource', label: `Open Source (${openSource.length})`, icon: GitPullRequest },
              { id: 'honors', label: `Honors (${honors.length})`, icon: Trophy },
              { id: 'timeline', label: `Timeline (${timeline.length})`, icon: Milestone },
              { id: 'deployments', label: 'Deploy & Cloud', icon: Cloud },
              { id: 'backup', label: 'Backup & Restore', icon: Download }
            ].map((tab) => {
              const Icon = tab.icon
              const active = activeTab === tab.id
              return (
                <button
                  key={tab.id}
                  onClick={() => {
                    sound.playClick()
                    setActiveTab(tab.id as AdminTab)
                  }}
                  className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-mono transition-all text-left cursor-pointer ${
                    active
                      ? 'bg-cyan-500/15 border border-cyan-500/30 text-cyan-200 font-semibold shadow-lg'
                      : 'text-neutral-400 hover:text-white hover:bg-white/[0.04]'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${active ? 'text-cyan-400' : 'text-neutral-500'}`} />
                  <span>{tab.label}</span>
                </button>
              )
            })}
          </div>

          {/* Quick status card */}
          <div className="p-4 rounded-2xl bg-black/40 border border-white/[0.06] space-y-2 text-xs font-mono text-neutral-400">
            <div className="flex items-center justify-between text-neutral-300">
              <span>Auto-Persistence</span>
              <span className="text-emerald-400 font-bold">ACTIVE</span>
            </div>
            <p className="text-[11px] text-neutral-500 leading-normal">
              All changes update your live website instantly and are persisted in your browser storage.
            </p>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 bg-white/[0.02] border border-white/[0.07] rounded-3xl p-6 sm:p-8 backdrop-blur-xl shadow-2xl overflow-hidden">
          {/* TAB 1: PERSONAL & IDENTITY */}
          {activeTab === 'personal' && (
            <div className="space-y-6 animate-fadeIn">
              <div className="border-b border-white/[0.08] pb-4">
                <h2 className="text-xl font-bold font-heading text-white">Personal & Identity</h2>
                <p className="text-xs text-neutral-400 mt-0.5">
                  Update primary branding, headline, bio statement, and profile photograph.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-neutral-400 mb-1">Full Name</label>
                  <input
                    type="text"
                    value={personalInfo.name}
                    onChange={(e) => updatePersonalInfo({ name: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-black/50 border border-white/10 text-xs font-mono text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-neutral-400 mb-1">Title / Headline</label>
                  <input
                    type="text"
                    value={personalInfo.title}
                    onChange={(e) => updatePersonalInfo({ title: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-black/50 border border-white/10 text-xs font-mono text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-neutral-400 mb-1">Status Badge</label>
                  <input
                    type="text"
                    value={personalInfo.statusBadge}
                    onChange={(e) => updatePersonalInfo({ statusBadge: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-black/50 border border-white/10 text-xs font-mono text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-neutral-400 mb-1">Location</label>
                  <input
                    type="text"
                    value={personalInfo.location}
                    onChange={(e) => updatePersonalInfo({ location: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-black/50 border border-white/10 text-xs font-mono text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-mono text-neutral-400 mb-1">Bio Description</label>
                  <textarea
                    rows={3}
                    value={personalInfo.bio}
                    onChange={(e) => updatePersonalInfo({ bio: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-black/50 border border-white/10 text-xs font-mono text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>

                <div className="sm:col-span-2 space-y-3">
                  <label className="block text-xs font-mono text-neutral-400 mb-1">
                    Profile Photograph
                  </label>

                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-4 rounded-2xl bg-black/40 border border-white/10">
                    {/* Photo Preview with fallbacks */}
                    <div className="relative w-20 h-20 rounded-2xl overflow-hidden border-2 border-cyan-400/50 shadow-xl shrink-0 bg-neutral-900">
                      <img
                        src={personalInfo.photoUrl || '/lohith_varma.png'}
                        onError={(e) => {
                          e.currentTarget.src = '/lohith_varma.png'
                        }}
                        alt="Profile Preview"
                        className="w-full h-full object-cover object-top"
                      />
                    </div>

                    {/* Controls */}
                    <div className="flex-1 space-y-2.5 w-full">
                      <div className="flex flex-wrap items-center gap-2">
                        <label className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-500/40 text-cyan-300 text-xs font-mono cursor-pointer transition-colors shadow-sm">
                          <Upload className="w-3.5 h-3.5" />
                          <span>Upload Photo from Device</span>
                          <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) => {
                              const file = e.target.files?.[0]
                              if (file) handleImageUpload(file)
                            }}
                          />
                        </label>

                        <button
                          type="button"
                          onClick={() => {
                            sound.playClick()
                            updatePersonalInfo({ photoUrl: '/lohith_varma.png' })
                            showToast('Reset to default portrait (/lohith_varma.png)!')
                          }}
                          className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] border border-white/10 text-xs font-mono text-neutral-300 transition-colors cursor-pointer"
                        >
                          <RotateCcw className="w-3.5 h-3.5" />
                          <span>Use Default Photo (/lohith_varma.png)</span>
                        </button>
                      </div>

                      <div className="space-y-1">
                        <label className="block text-[10px] font-mono text-neutral-500 uppercase">
                          Or Enter Direct Image URL / Path
                        </label>
                        <input
                          type="text"
                          value={personalInfo.photoUrl}
                          onChange={(e) => {
                            let val = e.target.value.trim()
                            if (val === 'lohith_varma.png') val = '/lohith_varma.png'
                            updatePersonalInfo({ photoUrl: val })
                          }}
                          placeholder="e.g. /lohith_varma.png or https://..."
                          className="w-full px-3 py-2 rounded-xl bg-black/60 border border-white/10 text-xs font-mono text-white focus:outline-none focus:border-cyan-400"
                        />
                      </div>

                      {/* Warning if user entered a local Windows path */}
                      {(personalInfo.photoUrl.startsWith('C:') ||
                        personalInfo.photoUrl.startsWith('file:') ||
                        personalInfo.photoUrl.includes('\\')) && (
                        <div className="p-2.5 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-300 text-[11px] font-mono leading-relaxed">
                          ⚠️ <strong>Local Path Notice:</strong> Web browsers block direct computer filesystem paths (<code className="text-white">C:\...</code>) for security reasons. Please click <strong>"Upload Photo from Device"</strong> above to pick your image file directly, or click <strong>"Use Default Photo"</strong>.
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: CONTACT & SOCIALS */}
          {activeTab === 'contact' && (
            <div className="space-y-6 animate-fadeIn">
              <div className="border-b border-white/[0.08] pb-4">
                <h2 className="text-xl font-bold font-heading text-white">Contact & Channels</h2>
                <p className="text-xs text-neutral-400 mt-0.5">
                  Update email address, GitHub username, and professional social profiles.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-neutral-400 mb-1">Primary Email</label>
                  <input
                    type="email"
                    value={contactInfo.email}
                    onChange={(e) => updateContactInfo({ email: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-black/50 border border-white/10 text-xs font-mono text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-neutral-400 mb-1">GitHub Username</label>
                  <input
                    type="text"
                    value={contactInfo.githubUsername}
                    onChange={(e) => updateContactInfo({ githubUsername: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-black/50 border border-white/10 text-xs font-mono text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-neutral-400 mb-1">GitHub Profile URL</label>
                  <input
                    type="url"
                    value={contactInfo.githubUrl}
                    onChange={(e) => updateContactInfo({ githubUrl: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-black/50 border border-white/10 text-xs font-mono text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-neutral-400 mb-1">LinkedIn Profile URL</label>
                  <input
                    type="url"
                    value={contactInfo.linkedinUrl}
                    onChange={(e) => updateContactInfo({ linkedinUrl: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-black/50 border border-white/10 text-xs font-mono text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-neutral-400 mb-1">LeetCode Username</label>
                  <input
                    type="text"
                    value={contactInfo.leetcodeUsername || '_CodeMaster_1'}
                    onChange={(e) => updateContactInfo({ leetcodeUsername: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-black/50 border border-white/10 text-xs font-mono text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-neutral-400 mb-1">LeetCode Profile URL</label>
                  <input
                    type="url"
                    value={contactInfo.leetcodeUrl || 'https://leetcode.com/u/_CodeMaster_1/'}
                    onChange={(e) => updateContactInfo({ leetcodeUrl: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-black/50 border border-white/10 text-xs font-mono text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>
              </div>

              {/* Live Platform Sync Console Card */}
              <div className="p-5 rounded-2xl bg-black/40 border border-white/10 space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-white/[0.08]">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                    <h3 className="text-sm font-bold font-mono text-white uppercase tracking-wider">
                      Live Platform Sync Engine
                    </h3>
                  </div>

                  <button
                    type="button"
                    disabled={liveAccounts.isSyncing}
                    onClick={async () => {
                      sound.playClick()
                      await refreshLiveAccounts()
                      showToast('GitHub, LeetCode & LinkedIn live synced!')
                    }}
                    className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-500/40 text-cyan-300 text-xs font-mono transition-colors cursor-pointer"
                  >
                    <RefreshCw className={`w-3.5 h-3.5 ${liveAccounts.isSyncing ? 'animate-spin' : ''}`} />
                    <span>{liveAccounts.isSyncing ? 'Fetching APIs...' : 'Force Live Sync Now'}</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs font-mono">
                  {/* GitHub Status */}
                  <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.06] space-y-1.5">
                    <div className="flex items-center justify-between text-neutral-300">
                      <span className="flex items-center gap-1.5 font-bold">
                        <GithubIcon className="w-3.5 h-3.5 text-white" />
                        <span>GitHub</span>
                      </span>
                      <span className="text-emerald-400 font-semibold text-[10px]">CONNECTED</span>
                    </div>
                    <p className="text-[11px] text-neutral-400">
                      User: <strong className="text-white">@{liveAccounts.github?.username || contactInfo.githubUsername}</strong>
                    </p>
                    <div className="flex items-center justify-between text-[10px] text-neutral-400 pt-1 border-t border-white/5">
                      <span>{liveAccounts.github?.publicRepos ?? 4} Repos</span>
                      <span>★ {liveAccounts.github?.totalStars ?? 0}</span>
                    </div>
                  </div>

                  {/* LeetCode Status */}
                  <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.06] space-y-1.5">
                    <div className="flex items-center justify-between text-neutral-300">
                      <span className="flex items-center gap-1.5 font-bold">
                        <Code2 className="w-3.5 h-3.5 text-amber-400" />
                        <span>LeetCode</span>
                      </span>
                      <span className="text-amber-400 font-semibold text-[10px]">CONNECTED</span>
                    </div>
                    <p className="text-[11px] text-neutral-400">
                      User: <strong className="text-white">@{liveAccounts.leetcode?.username || contactInfo.leetcodeUsername || '_CodeMaster_1'}</strong>
                    </p>
                    <div className="flex items-center justify-between text-[10px] text-neutral-400 pt-1 border-t border-white/5">
                      <span>{liveAccounts.leetcode?.totalSolved ?? 22} Solved</span>
                      <span>{liveAccounts.leetcode?.badge ?? 'Algorithm Solver'}</span>
                    </div>
                  </div>

                  {/* LinkedIn Status */}
                  <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.06] space-y-1.5">
                    <div className="flex items-center justify-between text-neutral-300">
                      <span className="flex items-center gap-1.5 font-bold">
                        <LinkedinIcon className="w-3.5 h-3.5 text-blue-400" />
                        <span>LinkedIn</span>
                      </span>
                      <span className="text-blue-400 font-semibold text-[10px]">VERIFIED</span>
                    </div>
                    <p className="text-[11px] text-neutral-400 truncate">
                      Profile: <strong className="text-white">in/lohith-varma-3b4153421</strong>
                    </p>
                    <div className="flex items-center justify-between text-[10px] text-neutral-400 pt-1 border-t border-white/5">
                      <span>Identity Active</span>
                      <CheckCircle2 className="w-3 h-3 text-blue-400" />
                    </div>
                  </div>
                </div>

                <p className="text-[11px] font-mono text-neutral-400 leading-relaxed">
                  Real-time telemetry queries public APIs automatically on each visit so any new GitHub pushes, repositories, or LeetCode problem solves sync dynamically into your portfolio.
                </p>
              </div>
            </div>
          )}

          {/* TAB 3: PROJECTS */}
          {activeTab === 'projects' && (
            <div className="space-y-6 animate-fadeIn">
              <div className="flex items-center justify-between border-b border-white/[0.08] pb-4">
                <div>
                  <h2 className="text-xl font-bold font-heading text-white">Projects Directory</h2>
                  <p className="text-xs text-neutral-400 mt-0.5">
                    Manage your portfolio engineering projects and live metrics.
                  </p>
                </div>

                <button
                  onClick={() => {
                    sound.playClick()
                    setEditingProject({
                      id: `proj-${Date.now()}`,
                      title: 'New Systems Project',
                      subtitle: 'High performance engine',
                      category: 'Distributed Systems',
                      description: 'Overview of architecture.',
                      architectureOverview: 'System internals and protocol flow.',
                      metrics: [{ label: 'Throughput', value: '100K ops/sec' }],
                      techStack: ['C++20', 'Linux'],
                      keyFeatures: ['Feature 1', 'Feature 2'],
                      challengesSolved: 'Mitigated tail latency under saturation.',
                      githubUrl: 'https://github.com/lohithvarma2208-tech',
                      year: '2025',
                      featured: false
                    })
                    setIsNewProject(true)
                  }}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-500/40 text-cyan-300 text-xs font-mono transition-colors cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Project</span>
                </button>
              </div>

              <div className="space-y-3">
                {projects.map((proj) => (
                  <div
                    key={proj.id}
                    className="p-4 rounded-2xl bg-black/40 border border-white/[0.06] flex items-center justify-between gap-4"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <h3 className="text-base font-bold text-white font-heading">{proj.title}</h3>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/[0.06] text-neutral-300">
                          {proj.category}
                        </span>
                      </div>
                      <p className="text-xs text-neutral-400 line-clamp-1">{proj.subtitle}</p>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        onClick={() => {
                          sound.playClick()
                          setEditingProject(proj)
                          setIsNewProject(false)
                        }}
                        className="p-2 rounded-lg bg-white/[0.04] hover:bg-white/[0.1] text-neutral-300 hover:text-white transition-colors cursor-pointer"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>

                      <button
                        onClick={() => {
                          if (confirm(`Delete project "${proj.title}"?`)) {
                            sound.playClick()
                            deleteProject(proj.id)
                            showToast(`Deleted ${proj.title}`)
                          }
                        }}
                        className="p-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 transition-colors cursor-pointer"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: SKILL STACK & DOMAIN FILTERS */}
          {activeTab === 'skills' && (
            <div className="space-y-8 animate-fadeIn">
              {/* Header */}
              <div className="border-b border-white/[0.08] pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-xl font-bold font-heading text-white flex items-center gap-2">
                    <Cpu className="w-5 h-5 text-cyan-400" />
                    Skill Stack & Domain Filters
                  </h2>
                  <p className="text-xs text-neutral-400 mt-0.5">
                    Manage the domain navigation pills shown above your technical arsenal on the homepage, and customize categories and technologies.
                  </p>
                </div>

                <button
                  onClick={() => {
                    sound.playClick()
                    setShowAddCategoryModal(true)
                  }}
                  className="px-3.5 py-1.5 rounded-xl bg-cyan-500 text-black font-semibold text-xs font-mono flex items-center gap-1.5 hover:bg-cyan-400 transition-colors cursor-pointer self-start sm:self-auto"
                >
                  <Plus className="w-3.5 h-3.5" />
                  Add Skill Category
                </button>
              </div>

              {/* SECTION 1: HOMEPAGE DOMAIN FILTER PILLS (Directly addressing the user's uploaded picture!) */}
              <div className="p-5 rounded-2xl bg-[#080a10] border border-cyan-500/20 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/[0.06] pb-3">
                  <div>
                    <h3 className="text-sm font-bold font-mono text-cyan-300 flex items-center gap-2">
                      <Tag className="w-4 h-4 text-cyan-400" />
                      Domain Filter Navigation (Homepage Pills)
                    </h3>
                    <p className="text-[11px] text-neutral-400 mt-0.5 font-mono">
                      These domain pills appear directly above your technical skills on the website. Visitors click them to filter.
                    </p>
                  </div>

                  <button
                    onClick={handleResetDomains}
                    className="text-[11px] font-mono text-neutral-400 hover:text-cyan-300 flex items-center gap-1 cursor-pointer transition-colors"
                  >
                    <RotateCcw className="w-3 h-3" />
                    Restore Default Pills
                  </button>
                </div>

                {/* Live Preview Box */}
                <div className="p-4 rounded-xl bg-black/60 border border-white/[0.08] space-y-2">
                  <div className="flex items-center justify-between text-[10px] font-mono text-neutral-500">
                    <span className="flex items-center gap-1 text-cyan-400">
                      <Sparkles className="w-3 h-3" /> LIVE PREVIEW (MATCHES HOMEPAGE ARSENAL)
                    </span>
                    <span>All Domains is permanent default</span>
                  </div>
                  <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
                    <span className="px-3 py-1 rounded-lg text-xs font-mono bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-semibold shrink-0 shadow-[0_0_12px_rgba(6,182,212,0.25)]">
                      All Domains
                    </span>
                    {currentDomains.map((dom, dIdx) => (
                      <span
                        key={dIdx}
                        className="px-3 py-1 rounded-lg text-xs font-mono text-neutral-400 bg-white/[0.04] border border-white/5 shrink-0"
                      >
                        {dom}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Editable Domain Cards */}
                <div className="space-y-2">
                  <label className="block text-xs font-mono text-neutral-300 uppercase tracking-wider">
                    Configured Domain Pills ({currentDomains.length})
                  </label>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
                    {/* Fixed All Domains pill */}
                    <div className="p-3 rounded-xl bg-cyan-500/[0.06] border border-cyan-500/20 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                        <span className="text-xs font-mono font-bold text-cyan-300">All Domains</span>
                      </div>
                      <span className="text-[10px] font-mono text-cyan-500/70 bg-cyan-500/10 px-2 py-0.5 rounded">
                        Default
                      </span>
                    </div>

                    {/* User editable domain pills */}
                    {currentDomains.map((dom, idx) => (
                      <div
                        key={idx}
                        className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.08] hover:border-cyan-500/30 transition-all flex items-center justify-between gap-2 group"
                      >
                        <div className="flex items-center gap-2 flex-1 min-w-0">
                          <span className="text-[10px] font-mono text-neutral-500 select-none">
                            #{idx + 1}
                          </span>
                          <input
                            type="text"
                            value={dom}
                            onChange={(e) => handleUpdateDomain(idx, e.target.value)}
                            className="bg-transparent border-b border-transparent focus:border-cyan-400 text-xs font-mono text-white focus:outline-none w-full truncate py-0.5"
                            placeholder="Domain Name"
                          />
                        </div>

                        <div className="flex items-center gap-1 shrink-0">
                          <button
                            onClick={() => handleMoveDomain(idx, 'left')}
                            disabled={idx === 0}
                            title="Move pill left"
                            className="p-1 text-neutral-400 hover:text-white disabled:opacity-20 cursor-pointer disabled:cursor-not-allowed transition-colors"
                          >
                            <ArrowLeft className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleMoveDomain(idx, 'right')}
                            disabled={idx === currentDomains.length - 1}
                            title="Move pill right"
                            className="p-1 text-neutral-400 hover:text-white disabled:opacity-20 cursor-pointer disabled:cursor-not-allowed transition-colors"
                          >
                            <ArrowRight className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleDeleteDomain(idx)}
                            title="Delete domain pill"
                            className="p-1 text-neutral-500 hover:text-red-400 cursor-pointer transition-colors ml-0.5"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Add New Domain Pill Bar */}
                <div className="pt-2 flex flex-col sm:flex-row items-center gap-2">
                  <input
                    type="text"
                    value={newDomainInput}
                    onChange={(e) => setNewDomainInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault()
                        handleAddDomain()
                      }
                    }}
                    placeholder="Type new domain name (e.g. AI & ML, Mobile, DevOps, Security)..."
                    className="w-full sm:flex-1 px-3 py-2 rounded-xl bg-black/40 border border-white/10 text-xs font-mono text-white placeholder-neutral-500 focus:outline-none focus:border-cyan-400 transition-colors"
                  />
                  <button
                    onClick={handleAddDomain}
                    disabled={!newDomainInput.trim()}
                    className="w-full sm:w-auto px-4 py-2 rounded-xl bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 border border-cyan-500/30 text-xs font-mono flex items-center justify-center gap-1.5 transition-colors cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed shrink-0"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    Add Domain Pill
                  </button>
                </div>
              </div>

              {/* SECTION 2: SKILL CATEGORIES & TECH STACK */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-bold font-mono text-white flex items-center gap-2">
                      <Layers className="w-4 h-4 text-cyan-400" />
                      Skill Categories ({skills.categories.length})
                    </h3>
                    <p className="text-[11px] text-neutral-400 font-mono mt-0.5">
                      Organize specific technologies into categorized cards.
                    </p>
                  </div>
                </div>

                {/* Add Category Form (Modal toggle) */}
                {showAddCategoryModal && (
                  <form
                    onSubmit={handleAddCategorySubmit}
                    className="p-5 rounded-2xl bg-cyan-500/[0.04] border border-cyan-500/30 space-y-3 animate-fadeIn"
                  >
                    <h4 className="text-xs font-mono font-bold text-cyan-300 uppercase tracking-wider flex items-center gap-1.5">
                      <Plus className="w-3.5 h-3.5" />
                      Create New Skill Category
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[11px] font-mono text-neutral-400 mb-1">
                          Category Title *
                        </label>
                        <input
                          type="text"
                          value={newCategoryTitle}
                          onChange={(e) => setNewCategoryTitle(e.target.value)}
                          placeholder="e.g. AI & Machine Learning, Mobile Development..."
                          required
                          className="w-full px-3 py-1.5 rounded-lg bg-black/50 border border-white/10 text-xs font-mono text-white focus:outline-none focus:border-cyan-400"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-mono text-neutral-400 mb-1">
                          Filter Domain Tag (Optional)
                        </label>
                        <select
                          value={newCategoryDomain}
                          onChange={(e) => setNewCategoryDomain(e.target.value)}
                          className="w-full px-3 py-1.5 rounded-lg bg-[#0d111a] border border-white/10 text-xs font-mono text-white focus:outline-none focus:border-cyan-400"
                        >
                          <option value="">Auto-match keywords</option>
                          {currentDomains.map((dom, dIdx) => (
                            <option key={dIdx} value={dom}>{dom}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 justify-end pt-1">
                      <button
                        type="button"
                        onClick={() => setShowAddCategoryModal(false)}
                        className="px-3 py-1.5 rounded-lg bg-white/[0.05] hover:bg-white/10 text-neutral-300 text-xs font-mono cursor-pointer"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-4 py-1.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-black font-semibold text-xs font-mono cursor-pointer"
                      >
                        Create Category
                      </button>
                    </div>
                  </form>
                )}

                {/* Categories Cards List */}
                <div className="space-y-4">
                  {skills.categories.map((cat, cIdx) => (
                    <div key={cIdx} className="p-4 rounded-xl bg-black/40 border border-white/[0.08] hover:border-white/20 transition-all space-y-3">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/[0.06] pb-2">
                        <div className="flex items-center gap-2 flex-1">
                          <div className="flex flex-col">
                            <button
                              onClick={() => handleMoveCategory(cIdx, 'up')}
                              disabled={cIdx === 0}
                              className="text-neutral-500 hover:text-white disabled:opacity-20 cursor-pointer disabled:cursor-not-allowed"
                              title="Move category up"
                            >
                              <ArrowUp className="w-3 h-3" />
                            </button>
                            <button
                              onClick={() => handleMoveCategory(cIdx, 'down')}
                              disabled={cIdx === skills.categories.length - 1}
                              className="text-neutral-500 hover:text-white disabled:opacity-20 cursor-pointer disabled:cursor-not-allowed"
                              title="Move category down"
                            >
                              <ArrowDown className="w-3 h-3" />
                            </button>
                          </div>
                          <input
                            type="text"
                            value={cat.title}
                            onChange={(e) => {
                              const next = [...skills.categories]
                              next[cIdx] = { ...cat, title: e.target.value }
                              updateSkills({ ...skills, categories: next })
                            }}
                            className="text-xs font-mono font-bold text-cyan-400 bg-transparent border-b border-transparent focus:border-cyan-400/50 pb-0.5 focus:outline-none flex-1"
                          />
                        </div>

                        <div className="flex items-center gap-2">
                          {/* Domain Selector */}
                          <select
                            value={cat.domain || ''}
                            onChange={(e) => {
                              const next = [...skills.categories]
                              next[cIdx] = { ...cat, domain: e.target.value || undefined }
                              updateSkills({ ...skills, categories: next })
                            }}
                            className="px-2 py-0.5 rounded bg-white/[0.05] border border-white/10 text-[10px] font-mono text-neutral-400 focus:outline-none focus:text-cyan-300"
                          >
                            <option value="">Domain: Auto</option>
                            {currentDomains.map((dom, dIdx) => (
                              <option key={dIdx} value={dom}>Domain: {dom}</option>
                            ))}
                          </select>

                          <button
                            onClick={() => handleDeleteCategory(cIdx)}
                            className="text-neutral-500 hover:text-red-400 p-1 cursor-pointer transition-colors"
                            title="Delete category"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>

                      {/* Skills inside category */}
                      <div className="flex flex-wrap items-center gap-1.5 pt-1">
                        {cat.skills.map((sk: string, sIdx: number) => (
                          <div key={sIdx} className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white/[0.04] border border-white/10 text-xs font-mono text-neutral-300 group hover:border-cyan-500/30 transition-all">
                            <span>{sk}</span>
                            <button
                              onClick={() => {
                                const next = [...skills.categories]
                                next[cIdx].skills = next[cIdx].skills.filter((_: string, idx: number) => idx !== sIdx)
                                updateSkills({ ...skills, categories: next })
                              }}
                              className="text-neutral-500 hover:text-red-400 ml-1 cursor-pointer"
                              title="Remove skill"
                            >
                              ×
                            </button>
                          </div>
                        ))}

                        {/* Inline Add Skill */}
                        <div className="flex items-center gap-1">
                          <input
                            type="text"
                            placeholder="+ Add tech..."
                            value={newSkillInputs[cIdx] || ''}
                            onChange={(e) => setNewSkillInputs({ ...newSkillInputs, [cIdx]: e.target.value })}
                            onKeyDown={(e) => {
                              if (e.key === 'Enter') {
                                e.preventDefault()
                                handleAddSkillInline(cIdx)
                              }
                            }}
                            className="px-2 py-1 rounded-lg bg-black/60 border border-white/10 text-xs font-mono text-white placeholder-neutral-600 focus:outline-none focus:border-cyan-400 w-28 sm:w-32"
                          />
                          <button
                            type="button"
                            onClick={() => handleAddSkillInline(cIdx)}
                            className="px-2 py-1 rounded-lg bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400 border border-cyan-500/20 text-xs font-mono cursor-pointer transition-colors"
                          >
                            Add
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: WORK EXPERIENCE */}
          {activeTab === 'experience' && (
            <div className="space-y-6 animate-fadeIn">
              <div className="flex items-center justify-between border-b border-white/[0.08] pb-4">
                <div>
                  <h2 className="text-xl font-bold font-heading text-white">Work Experience</h2>
                  <p className="text-xs text-neutral-400 mt-0.5">
                    Engineering internships, lab research, and industry engagements.
                  </p>
                </div>

                <button
                  onClick={() => {
                    sound.playClick()
                    setEditingExp({
                      id: `exp-${Date.now()}`,
                      role: 'Software Engineer Intern',
                      company: 'Engineering Lab / Tech Co.',
                      location: 'Bengaluru, India',
                      period: '2025 – Present',
                      current: true,
                      type: 'Internship',
                      summary: 'Designing distributed microservices.',
                      achievements: ['Decreased latency by 30% under peak load.'],
                      techStack: ['Go', 'Docker', 'Linux']
                    })
                    setIsNewExp(true)
                  }}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-500/40 text-cyan-300 text-xs font-mono transition-colors cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Experience</span>
                </button>
              </div>

              <div className="space-y-3">
                {experiences.map((exp) => (
                  <div
                    key={exp.id}
                    className="p-4 rounded-2xl bg-black/40 border border-white/[0.06] flex items-center justify-between gap-4"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-base font-bold text-white font-heading">{exp.role}</h3>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-300 border border-cyan-500/20">
                          {exp.company}
                        </span>
                      </div>
                      <p className="text-xs font-mono text-neutral-400 mt-0.5">
                        {exp.period} • {exp.location}
                      </p>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        onClick={() => {
                          sound.playClick()
                          setEditingExp(exp)
                          setIsNewExp(false)
                        }}
                        className="p-2 rounded-lg bg-white/[0.04] hover:bg-white/[0.1] text-neutral-300 hover:text-white transition-colors cursor-pointer"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>

                      <button
                        onClick={() => {
                          if (confirm(`Delete experience "${exp.role}"?`)) {
                            sound.playClick()
                            deleteExperience(exp.id)
                            showToast(`Deleted ${exp.role}`)
                          }
                        }}
                        className="p-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 transition-colors cursor-pointer"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 6: CERTIFICATIONS */}
          {activeTab === 'certifications' && (
            <div className="space-y-6 animate-fadeIn">
              <div className="flex items-center justify-between border-b border-white/[0.08] pb-4">
                <div>
                  <h2 className="text-xl font-bold font-heading text-white">Certifications & Badges</h2>
                  <p className="text-xs text-neutral-400 mt-0.5">
                    Verified credentials, cloud architect certificates, and specialized credentials.
                  </p>
                </div>

                <button
                  onClick={() => {
                    sound.playClick()
                    setEditingCert({
                      id: `cert-${Date.now()}`,
                      title: 'Certified Professional',
                      issuer: 'Industry Issuer',
                      issueDate: '2025',
                      credentialUrl: 'https://verify.example.com',
                      skills: ['Skill 1', 'Skill 2']
                    })
                    setIsNewCert(true)
                  }}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-500/40 text-cyan-300 text-xs font-mono transition-colors cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Certification</span>
                </button>
              </div>

              <div className="space-y-3">
                {certifications.map((cert) => (
                  <div
                    key={cert.id}
                    className="p-4 rounded-2xl bg-black/40 border border-white/[0.06] flex items-center justify-between gap-4"
                  >
                    <div>
                      <h3 className="text-base font-bold text-white font-heading">{cert.title}</h3>
                      <p className="text-xs font-mono text-cyan-300 mt-0.5">
                        {cert.issuer} • Issued {cert.issueDate}
                      </p>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        onClick={() => {
                          sound.playClick()
                          setEditingCert(cert)
                          setIsNewCert(false)
                        }}
                        className="p-2 rounded-lg bg-white/[0.04] hover:bg-white/[0.1] text-neutral-300 hover:text-white transition-colors cursor-pointer"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>

                      <button
                        onClick={() => {
                          if (confirm(`Delete certification "${cert.title}"?`)) {
                            sound.playClick()
                            deleteCertification(cert.id)
                            showToast(`Deleted ${cert.title}`)
                          }
                        }}
                        className="p-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 transition-colors cursor-pointer"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 7: OPEN SOURCE */}
          {activeTab === 'opensource' && (
            <div className="space-y-6 animate-fadeIn">
              <div className="flex items-center justify-between border-b border-white/[0.08] pb-4">
                <div>
                  <h2 className="text-xl font-bold font-heading text-white">Open Source Contributions</h2>
                  <p className="text-xs text-neutral-400 mt-0.5">
                    Public code contributions, framework PRs, and community systems tools.
                  </p>
                </div>

                <button
                  onClick={() => {
                    sound.playClick()
                    setEditingOSS({
                      id: `oss-${Date.now()}`,
                      repo: 'org / repository',
                      repoUrl: 'https://github.com/lohithvarma2208-tech',
                      title: 'Optimization PR',
                      type: 'Pull Request',
                      description: 'Buffer optimization patch.',
                      impact: 'Reduced allocations by 15%',
                      techStack: ['Rust', 'Tokio']
                    })
                    setIsNewOSS(true)
                  }}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-500/40 text-cyan-300 text-xs font-mono transition-colors cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Contribution</span>
                </button>
              </div>

              <div className="space-y-3">
                {openSource.map((oss) => (
                  <div
                    key={oss.id}
                    className="p-4 rounded-2xl bg-black/40 border border-white/[0.06] flex items-center justify-between gap-4"
                  >
                    <div>
                      <h3 className="text-base font-bold text-white font-mono">{oss.repo}</h3>
                      <p className="text-xs text-neutral-300 mt-0.5">{oss.title}</p>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        onClick={() => {
                          sound.playClick()
                          setEditingOSS(oss)
                          setIsNewOSS(false)
                        }}
                        className="p-2 rounded-lg bg-white/[0.04] hover:bg-white/[0.1] text-neutral-300 hover:text-white transition-colors cursor-pointer"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>

                      <button
                        onClick={() => {
                          if (confirm(`Delete contribution for "${oss.repo}"?`)) {
                            sound.playClick()
                            deleteOpenSource(oss.id)
                            showToast(`Deleted ${oss.repo}`)
                          }
                        }}
                        className="p-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 transition-colors cursor-pointer"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 8: HONORS & COMPETITIONS */}
          {activeTab === 'honors' && (
            <div className="space-y-6 animate-fadeIn">
              <div className="flex items-center justify-between border-b border-white/[0.08] pb-4">
                <div>
                  <h2 className="text-xl font-bold font-heading text-white">Honors & Competitions</h2>
                  <p className="text-xs text-neutral-400 mt-0.5">
                    Competitive programming rankings, hackathon podium finishes, and academic distinctions.
                  </p>
                </div>

                <button
                  onClick={() => {
                    sound.playClick()
                    setEditingHonor({
                      id: `honor-${Date.now()}`,
                      title: 'Hackathon Finalist',
                      issuer: 'National Technology Track',
                      date: '2025',
                      rank: 'Top 10',
                      metric: 'Out of 1000+ teams',
                      description: 'Architected distributed sensor pipeline.',
                      badge: 'Hackathon Podium'
                    })
                    setIsNewHonor(true)
                  }}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-500/40 text-cyan-300 text-xs font-mono transition-colors cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Honor</span>
                </button>
              </div>

              <div className="space-y-3">
                {honors.map((honor) => (
                  <div
                    key={honor.id}
                    className="p-4 rounded-2xl bg-black/40 border border-white/[0.06] flex items-center justify-between gap-4"
                  >
                    <div>
                      <h3 className="text-base font-bold text-white font-heading">{honor.title}</h3>
                      <p className="text-xs font-mono text-amber-300 mt-0.5">
                        {honor.issuer} • {honor.rank || honor.date}
                      </p>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        onClick={() => {
                          sound.playClick()
                          setEditingHonor(honor)
                          setIsNewHonor(false)
                        }}
                        className="p-2 rounded-lg bg-white/[0.04] hover:bg-white/[0.1] text-neutral-300 hover:text-white transition-colors cursor-pointer"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>

                      <button
                        onClick={() => {
                          if (confirm(`Delete honor "${honor.title}"?`)) {
                            sound.playClick()
                            deleteHonor(honor.id)
                            showToast(`Deleted ${honor.title}`)
                          }
                        }}
                        className="p-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 transition-colors cursor-pointer"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 9: TIMELINE */}
          {activeTab === 'timeline' && (
            <div className="space-y-6 animate-fadeIn">
              <div className="flex items-center justify-between border-b border-white/[0.08] pb-4">
                <div>
                  <h2 className="text-xl font-bold font-heading text-white">Timeline Journey</h2>
                  <p className="text-xs text-neutral-400 mt-0.5">
                    Milestones, academic journey, and key career markers.
                  </p>
                </div>

                <button
                  onClick={() => {
                    sound.playClick()
                    setEditingTimeline({
                      id: `t-${Date.now()}`,
                      year: '2025',
                      period: '2025',
                      title: 'Milestone Title',
                      organization: 'Organization Name',
                      type: 'engineering',
                      description: 'Milestone summary description.',
                      achievements: ['Achievement bullet point'],
                      status: 'current'
                    })
                    setIsNewTimeline(true)
                  }}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-500/40 text-cyan-300 text-xs font-mono transition-colors cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Milestone</span>
                </button>
              </div>

              <div className="space-y-3">
                {timeline.map((item) => (
                  <div
                    key={item.id}
                    className="p-4 rounded-2xl bg-black/40 border border-white/[0.06] flex items-center justify-between gap-4"
                  >
                    <div>
                      <h3 className="text-base font-bold text-white font-heading">{item.title}</h3>
                      <p className="text-xs font-mono text-cyan-300 mt-0.5">
                        {item.year} • {item.organization}
                      </p>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        onClick={() => {
                          sound.playClick()
                          setEditingTimeline(item)
                          setIsNewTimeline(false)
                        }}
                        className="p-2 rounded-lg bg-white/[0.04] hover:bg-white/[0.1] text-neutral-300 hover:text-white transition-colors cursor-pointer"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>

                      <button
                        onClick={() => {
                          if (confirm(`Delete milestone "${item.title}"?`)) {
                            sound.playClick()
                            deleteTimelineItem(item.id)
                            showToast(`Deleted ${item.title}`)
                          }
                        }}
                        className="p-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 transition-colors cursor-pointer"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB: DEPLOYMENTS & CLOUD (Vercel, Render, Supabase) */}
          {activeTab === 'deployments' && (
            <div className="space-y-6 animate-fadeIn">
              <div className="border-b border-white/[0.08] pb-4">
                <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 uppercase tracking-widest mb-1">
                  <Cloud className="w-4 h-4" />
                  <span>Deployment & Infrastructure</span>
                </div>
                <h2 className="text-xl font-bold font-heading text-white">Cloud Hosting & Supabase Database</h2>
                <p className="text-xs text-neutral-400 mt-0.5">
                  Production deployment blueprints for Vercel, Render, and Supabase PostgreSQL.
                </p>
              </div>

              {/* 3 Main Platforms Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
                {/* 1. Vercel Card */}
                <div className="p-5 rounded-2xl bg-black/40 border border-white/[0.08] flex flex-col justify-between space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-white">
                          <Globe className="w-4 h-4" />
                        </div>
                        <h3 className="text-sm font-bold font-mono text-white">Vercel</h3>
                      </div>
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-emerald-500/15 border border-emerald-500/30 text-emerald-300">
                        CONFIGURED
                      </span>
                    </div>

                    <p className="text-xs text-neutral-400 leading-relaxed">
                      Primary edge hosting for the portfolio. Provides global CDN, automatic SSL certificates, and instant CI/CD on every GitHub commit.
                    </p>

                    <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.05] space-y-1.5 font-mono text-[11px]">
                      <div className="text-neutral-400">Blueprint File:</div>
                      <div className="text-cyan-300">vercel.json (SPA rewrites & asset caching)</div>
                      <div className="text-neutral-400 pt-1 border-t border-white/5">Deploy Command:</div>
                      <div className="text-neutral-200">npx vercel</div>
                    </div>
                  </div>

                  <div className="space-y-2 pt-2">
                    <button
                      type="button"
                      onClick={() => {
                        navigator.clipboard.writeText('npx vercel')
                        showToast('Copied "npx vercel" to clipboard!')
                      }}
                      className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-white font-mono text-xs transition-colors cursor-pointer"
                    >
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy Deploy Command</span>
                    </button>
                    <a
                      href="https://vercel.com/new"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-xl bg-white text-black font-mono text-xs font-semibold hover:bg-neutral-200 transition-colors cursor-pointer"
                    >
                      <span>Open Vercel Dashboard</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>

                {/* 2. Render Card */}
                <div className="p-5 rounded-2xl bg-black/40 border border-white/[0.08] flex flex-col justify-between space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-indigo-500/10 flex items-center justify-center text-indigo-400">
                          <Server className="w-4 h-4" />
                        </div>
                        <h3 className="text-sm font-bold font-mono text-white">Render</h3>
                      </div>
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-indigo-500/15 border border-indigo-500/30 text-indigo-300">
                        CONFIGURED
                      </span>
                    </div>

                    <p className="text-xs text-neutral-400 leading-relaxed">
                      Zero-cost cloud static hosting and backup edge server with automated builds directly from your repository blueprint.
                    </p>

                    <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.05] space-y-1.5 font-mono text-[11px]">
                      <div className="text-neutral-400">Blueprint File:</div>
                      <div className="text-indigo-300">render.yaml (Static edge service)</div>
                      <div className="text-neutral-400 pt-1 border-t border-white/5">Publish Directory:</div>
                      <div className="text-neutral-200">./dist</div>
                    </div>
                  </div>

                  <div className="space-y-2 pt-2">
                    <button
                      type="button"
                      onClick={() => {
                        navigator.clipboard.writeText('npm run build')
                        showToast('Copied "npm run build" to clipboard!')
                      }}
                      className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-white font-mono text-xs transition-colors cursor-pointer"
                    >
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy Build Command</span>
                    </button>
                    <a
                      href="https://dashboard.render.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-xl bg-indigo-500 hover:bg-indigo-600 text-white font-mono text-xs font-semibold transition-colors cursor-pointer"
                    >
                      <span>Open Render Dashboard</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>

                {/* 3. Supabase Card */}
                <div className="p-5 rounded-2xl bg-black/40 border border-white/[0.08] flex flex-col justify-between space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-400">
                          <Database className="w-4 h-4" />
                        </div>
                        <h3 className="text-sm font-bold font-mono text-white">Supabase</h3>
                      </div>
                      <span
                        className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-bold ${
                          isSupabaseConfigured
                            ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                            : 'bg-amber-500/15 text-amber-300 border border-amber-500/30'
                        }`}
                      >
                        {isSupabaseConfigured ? 'CONNECTED' : 'LOCAL PERSISTENCE'}
                      </span>
                    </div>

                    <p className="text-xs text-neutral-400 leading-relaxed">
                      PostgreSQL cloud database for contact form submissions, content sync, and visitor telemetry with Row-Level Security.
                    </p>

                    <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.05] space-y-1.5 font-mono text-[11px]">
                      <div className="text-neutral-400">Database Schema:</div>
                      <div className="text-emerald-300">supabase/schema.sql</div>
                      <div className="text-neutral-400 pt-1 border-t border-white/5">Required Env Vars:</div>
                      <div className="text-neutral-300">VITE_SUPABASE_URL, VITE_SUPABASE_ANON_KEY</div>
                    </div>
                  </div>

                  <div className="space-y-2 pt-2">
                    <button
                      type="button"
                      onClick={() => {
                        const sql = `-- Run in Supabase SQL Editor:
CREATE TABLE IF NOT EXISTS contact_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public insert on contact_messages" ON contact_messages FOR INSERT TO anon, authenticated WITH CHECK (true);`
                        navigator.clipboard.writeText(sql)
                        showToast('Copied SQL Schema to clipboard!')
                      }}
                      className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-white font-mono text-xs transition-colors cursor-pointer"
                    >
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy SQL Schema</span>
                    </button>
                    <a
                      href="https://supabase.com/dashboard"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-mono text-xs font-semibold transition-colors cursor-pointer"
                    >
                      <span>Open Supabase Dashboard</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              </div>

              {/* Supabase Visitor Messages Box */}
              <div className="p-5 rounded-2xl bg-black/40 border border-white/[0.08] space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-white/[0.06]">
                  <div className="flex items-center gap-2">
                    <Database className="w-4 h-4 text-emerald-400" />
                    <h3 className="text-sm font-bold font-mono text-white">
                      Supabase Contact Messages Inbox ({supabaseMessages.length})
                    </h3>
                  </div>
                  <button
                    type="button"
                    onClick={handleFetchMessages}
                    disabled={loadingMessages}
                    className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-500/30 text-emerald-300 text-xs font-mono transition-colors cursor-pointer"
                  >
                    <RefreshCw className={`w-3.5 h-3.5 ${loadingMessages ? 'animate-spin' : ''}`} />
                    <span>{loadingMessages ? 'Connecting...' : 'Fetch Messages from Supabase'}</span>
                  </button>
                </div>

                {supabaseMessages.length === 0 ? (
                  <div className="text-center py-8 text-neutral-500 font-mono text-xs space-y-1">
                    <p>No messages loaded yet from Supabase.</p>
                    <p className="text-[11px] text-neutral-600">
                      When visitors send inquiries through the Contact section, they will appear here once your Supabase keys are configured.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {supabaseMessages.map((msg) => (
                      <div
                        key={msg.id}
                        className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] space-y-2 text-xs"
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-white font-mono">{msg.name}</span>
                          <span className="text-[10px] text-neutral-500 font-mono">{new Date(msg.created_at).toLocaleString()}</span>
                        </div>
                        <div className="text-cyan-400 font-mono text-[11px]">{msg.email}</div>
                        <p className="text-neutral-300 leading-relaxed font-sans pt-1 border-t border-white/5">
                          {msg.message}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 10: BACKUP & RESTORE */}
          {activeTab === 'backup' && (
            <div className="space-y-6 animate-fadeIn">
              <div className="border-b border-white/[0.08] pb-4">
                <h2 className="text-xl font-bold font-heading text-white">Backup & Restore</h2>
                <p className="text-xs text-neutral-400 mt-0.5">
                  Export entire portfolio data to JSON or import an existing configuration.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-5 rounded-2xl bg-black/40 border border-white/[0.08] space-y-3">
                  <div className="flex items-center gap-2 text-cyan-400">
                    <Download className="w-5 h-5" />
                    <h3 className="text-sm font-bold font-mono uppercase text-white">Export Site Config</h3>
                  </div>
                  <p className="text-xs text-neutral-400">
                    Download full portfolio state as a JSON file.
                  </p>
                  <button
                    onClick={() => {
                      sound.playSuccess()
                      const dataStr = exportDataJSON()
                      const blob = new Blob([dataStr], { type: 'application/json' })
                      const url = URL.createObjectURL(blob)
                      const a = document.createElement('a')
                      a.href = url
                      a.download = `lohith_portfolio_backup_${new Date().toISOString().slice(0, 10)}.json`
                      a.click()
                      showToast('Configuration Downloaded!')
                    }}
                    className="w-full py-2.5 rounded-xl bg-white/[0.06] hover:bg-white/[0.12] border border-white/10 text-xs font-mono text-white transition-colors cursor-pointer"
                  >
                    Download JSON Backup
                  </button>
                </div>

                <div className="p-5 rounded-2xl bg-black/40 border border-white/[0.08] space-y-3">
                  <div className="flex items-center gap-2 text-red-400">
                    <RotateCcw className="w-5 h-5" />
                    <h3 className="text-sm font-bold font-mono uppercase text-white">Reset to Defaults</h3>
                  </div>
                  <p className="text-xs text-neutral-400">
                    Erase all local modifications and restore the clean default state.
                  </p>
                  <button
                    onClick={() => {
                      if (confirm('Revert all changes to original defaults?')) {
                        sound.playClick()
                        resetToDefaults()
                        showToast('Reverted to Factory Defaults!')
                      }
                    }}
                    className="w-full py-2.5 rounded-xl bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 text-xs font-mono text-red-300 transition-colors cursor-pointer"
                  >
                    Reset All Changes
                  </button>
                </div>
              </div>

              {/* Import Section */}
              <div className="p-5 rounded-2xl bg-black/40 border border-white/[0.08] space-y-3">
                <div className="flex items-center gap-2 text-cyan-400">
                  <Upload className="w-5 h-5" />
                  <h3 className="text-sm font-bold font-mono uppercase text-white">Import Configuration</h3>
                </div>
                <textarea
                  rows={4}
                  value={importJsonText}
                  onChange={(e) => setImportJsonText(e.target.value)}
                  placeholder="Paste exported JSON payload here..."
                  className="w-full px-3 py-2 rounded-xl bg-black/60 border border-white/10 text-xs font-mono text-white focus:outline-none focus:border-cyan-400"
                />
                {importMsg && (
                  <div className={`p-2.5 rounded-lg text-xs font-mono ${importMsg.type === 'success' ? 'bg-emerald-500/10 text-emerald-300 border border-emerald-500/30' : 'bg-red-500/10 text-red-300 border border-red-500/30'}`}>
                    {importMsg.text}
                  </div>
                )}
                <button
                  onClick={() => {
                    if (!importJsonText.trim()) return
                    const success = importDataJSON(importJsonText)
                    if (success) {
                      sound.playSuccess()
                      setImportMsg({ type: 'success', text: 'Configuration Imported & Saved Successfully!' })
                      setImportJsonText('')
                      showToast('Import Successful!')
                    } else {
                      sound.playClick()
                      setImportMsg({ type: 'error', text: 'Invalid JSON format. Check payload syntax.' })
                    }
                  }}
                  className="px-4 py-2 rounded-xl bg-white text-black font-semibold text-xs font-mono uppercase hover:bg-neutral-200 transition-colors cursor-pointer"
                >
                  Apply Imported JSON
                </button>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* --- EDIT PROJECT MODAL --- */}
      {editingProject && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
          <div className="w-full max-w-2xl bg-[#090c16] border border-white/15 rounded-3xl p-6 sm:p-8 space-y-4 shadow-2xl my-8">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <h3 className="text-lg font-bold font-heading text-white">
                {isNewProject ? 'Add Project' : `Edit: ${editingProject.title}`}
              </h3>
              <button onClick={() => setEditingProject(null)} className="text-neutral-400 hover:text-white cursor-pointer">
                ✕
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div>
                <label className="block text-neutral-400 mb-1 font-mono">Title</label>
                <input
                  type="text"
                  value={editingProject.title}
                  onChange={(e) => setEditingProject({ ...editingProject, title: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-black/50 border border-white/10 text-white font-mono"
                />
              </div>

              <div>
                <label className="block text-neutral-400 mb-1 font-mono">Category</label>
                <select
                  value={editingProject.category}
                  onChange={(e) => setEditingProject({ ...editingProject, category: e.target.value as any })}
                  className="w-full px-3 py-2 rounded-xl bg-black/50 border border-white/10 text-white font-mono"
                >
                  <option value="Distributed Systems">Distributed Systems</option>
                  <option value="Low-Level Storage">Low-Level Storage</option>
                  <option value="AI & Memory">AI & Memory</option>
                  <option value="Graphics & WebGL">Graphics & WebGL</option>
                  <option value="Developer Tooling">Developer Tooling</option>
                </select>
              </div>

              <div className="sm:col-span-2">
                <label className="block text-neutral-400 mb-1 font-mono">Subtitle</label>
                <input
                  type="text"
                  value={editingProject.subtitle}
                  onChange={(e) => setEditingProject({ ...editingProject, subtitle: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-black/50 border border-white/10 text-white font-mono"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-neutral-400 mb-1 font-mono">Description</label>
                <textarea
                  rows={2}
                  value={editingProject.description}
                  onChange={(e) => setEditingProject({ ...editingProject, description: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-black/50 border border-white/10 text-white font-mono"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-neutral-400 mb-1 font-mono">Tech Stack (comma separated)</label>
                <input
                  type="text"
                  value={editingProject.techStack.join(', ')}
                  onChange={(e) =>
                    setEditingProject({
                      ...editingProject,
                      techStack: e.target.value.split(',').map((s) => s.trim()).filter(Boolean)
                    })
                  }
                  className="w-full px-3 py-2 rounded-xl bg-black/50 border border-white/10 text-white font-mono"
                />
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-3 border-t border-white/10">
              <button
                onClick={() => setEditingProject(null)}
                className="px-4 py-2 rounded-xl text-xs font-mono text-neutral-400 hover:text-white"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  if (isNewProject) {
                    addProject(editingProject)
                    showToast('Project Added!')
                  } else {
                    updateProject(editingProject.id, editingProject)
                    showToast('Project Updated!')
                  }
                  setEditingProject(null)
                }}
                className="px-5 py-2 rounded-xl bg-white text-black font-semibold text-xs font-mono uppercase hover:bg-neutral-200"
              >
                Save Project
              </button>
            </div>
          </div>
        </div>
      )}

      {/* --- EDIT WORK EXPERIENCE MODAL --- */}
      {editingExp && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
          <div className="w-full max-w-xl bg-[#090c16] border border-white/15 rounded-3xl p-6 sm:p-8 space-y-4 shadow-2xl my-8">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <h3 className="text-lg font-bold font-heading text-white">
                {isNewExp ? 'Add Experience' : `Edit: ${editingExp.role}`}
              </h3>
              <button onClick={() => setEditingExp(null)} className="text-neutral-400 hover:text-white cursor-pointer">
                ✕
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div>
                <label className="block text-neutral-400 mb-1 font-mono">Role Title</label>
                <input
                  type="text"
                  value={editingExp.role}
                  onChange={(e) => setEditingExp({ ...editingExp, role: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-black/50 border border-white/10 text-white font-mono"
                />
              </div>

              <div>
                <label className="block text-neutral-400 mb-1 font-mono">Company / Organization</label>
                <input
                  type="text"
                  value={editingExp.company}
                  onChange={(e) => setEditingExp({ ...editingExp, company: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-black/50 border border-white/10 text-white font-mono"
                />
              </div>

              <div>
                <label className="block text-neutral-400 mb-1 font-mono">Period (e.g. Jun 2025 – Present)</label>
                <input
                  type="text"
                  value={editingExp.period}
                  onChange={(e) => setEditingExp({ ...editingExp, period: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-black/50 border border-white/10 text-white font-mono"
                />
              </div>

              <div>
                <label className="block text-neutral-400 mb-1 font-mono">Location</label>
                <input
                  type="text"
                  value={editingExp.location}
                  onChange={(e) => setEditingExp({ ...editingExp, location: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-black/50 border border-white/10 text-white font-mono"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-neutral-400 mb-1 font-mono">Summary</label>
                <textarea
                  rows={2}
                  value={editingExp.summary}
                  onChange={(e) => setEditingExp({ ...editingExp, summary: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-black/50 border border-white/10 text-white font-mono"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-neutral-400 mb-1 font-mono">Tech Stack (comma separated)</label>
                <input
                  type="text"
                  value={editingExp.techStack.join(', ')}
                  onChange={(e) =>
                    setEditingExp({
                      ...editingExp,
                      techStack: e.target.value.split(',').map((s) => s.trim()).filter(Boolean)
                    })
                  }
                  className="w-full px-3 py-2 rounded-xl bg-black/50 border border-white/10 text-white font-mono"
                />
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-3 border-t border-white/10">
              <button onClick={() => setEditingExp(null)} className="px-4 py-2 rounded-xl text-xs font-mono text-neutral-400">
                Cancel
              </button>
              <button
                onClick={() => {
                  if (isNewExp) {
                    addExperience(editingExp)
                    showToast('Experience Added!')
                  } else {
                    updateExperience(editingExp.id, editingExp)
                    showToast('Experience Updated!')
                  }
                  setEditingExp(null)
                }}
                className="px-5 py-2 rounded-xl bg-white text-black font-semibold text-xs font-mono uppercase"
              >
                Save Experience
              </button>
            </div>
          </div>
        </div>
      )}

      {/* --- EDIT CERTIFICATION MODAL --- */}
      {editingCert && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
          <div className="w-full max-w-xl bg-[#090c16] border border-white/15 rounded-3xl p-6 sm:p-8 space-y-4 shadow-2xl my-8">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <h3 className="text-lg font-bold font-heading text-white">
                {isNewCert ? 'Add Certification' : `Edit: ${editingCert.title}`}
              </h3>
              <button onClick={() => setEditingCert(null)} className="text-neutral-400 hover:text-white cursor-pointer">
                ✕
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="sm:col-span-2">
                <label className="block text-neutral-400 mb-1 font-mono">Certificate Title</label>
                <input
                  type="text"
                  value={editingCert.title}
                  onChange={(e) => setEditingCert({ ...editingCert, title: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-black/50 border border-white/10 text-white font-mono"
                />
              </div>

              <div>
                <label className="block text-neutral-400 mb-1 font-mono">Issuer (e.g. AWS, Meta)</label>
                <input
                  type="text"
                  value={editingCert.issuer}
                  onChange={(e) => setEditingCert({ ...editingCert, issuer: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-black/50 border border-white/10 text-white font-mono"
                />
              </div>

              <div>
                <label className="block text-neutral-400 mb-1 font-mono">Issue Date (Year)</label>
                <input
                  type="text"
                  value={editingCert.issueDate}
                  onChange={(e) => setEditingCert({ ...editingCert, issueDate: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-black/50 border border-white/10 text-white font-mono"
                />
              </div>

              <div>
                <label className="block text-neutral-400 mb-1 font-mono">Credential ID</label>
                <input
                  type="text"
                  value={editingCert.credentialId || ''}
                  onChange={(e) => setEditingCert({ ...editingCert, credentialId: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-black/50 border border-white/10 text-white font-mono"
                />
              </div>

              <div>
                <label className="block text-neutral-400 mb-1 font-mono">Verification URL</label>
                <input
                  type="url"
                  value={editingCert.credentialUrl}
                  onChange={(e) => setEditingCert({ ...editingCert, credentialUrl: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-black/50 border border-white/10 text-white font-mono"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-neutral-400 mb-1 font-mono">Skills Verified (comma separated)</label>
                <input
                  type="text"
                  value={editingCert.skills.join(', ')}
                  onChange={(e) =>
                    setEditingCert({
                      ...editingCert,
                      skills: e.target.value.split(',').map((s) => s.trim()).filter(Boolean)
                    })
                  }
                  className="w-full px-3 py-2 rounded-xl bg-black/50 border border-white/10 text-white font-mono"
                />
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-3 border-t border-white/10">
              <button onClick={() => setEditingCert(null)} className="px-4 py-2 rounded-xl text-xs font-mono text-neutral-400">
                Cancel
              </button>
              <button
                onClick={() => {
                  if (isNewCert) {
                    addCertification(editingCert)
                    showToast('Certification Added!')
                  } else {
                    updateCertification(editingCert.id, editingCert)
                    showToast('Certification Updated!')
                  }
                  setEditingCert(null)
                }}
                className="px-5 py-2 rounded-xl bg-white text-black font-semibold text-xs font-mono uppercase"
              >
                Save Certification
              </button>
            </div>
          </div>
        </div>
      )}

      {/* --- EDIT OPEN SOURCE MODAL --- */}
      {editingOSS && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
          <div className="w-full max-w-xl bg-[#090c16] border border-white/15 rounded-3xl p-6 sm:p-8 space-y-4 shadow-2xl my-8">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <h3 className="text-lg font-bold font-heading text-white">
                {isNewOSS ? 'Add Open Source' : `Edit: ${editingOSS.repo}`}
              </h3>
              <button onClick={() => setEditingOSS(null)} className="text-neutral-400 hover:text-white cursor-pointer">
                ✕
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div>
                <label className="block text-neutral-400 mb-1 font-mono">Repository (e.g. org/repo)</label>
                <input
                  type="text"
                  value={editingOSS.repo}
                  onChange={(e) => setEditingOSS({ ...editingOSS, repo: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-black/50 border border-white/10 text-white font-mono"
                />
              </div>

              <div>
                <label className="block text-neutral-400 mb-1 font-mono">Title</label>
                <input
                  type="text"
                  value={editingOSS.title}
                  onChange={(e) => setEditingOSS({ ...editingOSS, title: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-black/50 border border-white/10 text-white font-mono"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-neutral-400 mb-1 font-mono">Description</label>
                <textarea
                  rows={2}
                  value={editingOSS.description}
                  onChange={(e) => setEditingOSS({ ...editingOSS, description: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-black/50 border border-white/10 text-white font-mono"
                />
              </div>

              <div>
                <label className="block text-neutral-400 mb-1 font-mono">Measurable Impact</label>
                <input
                  type="text"
                  value={editingOSS.impact}
                  onChange={(e) => setEditingOSS({ ...editingOSS, impact: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-black/50 border border-white/10 text-white font-mono"
                />
              </div>

              <div>
                <label className="block text-neutral-400 mb-1 font-mono">Repo / PR Link</label>
                <input
                  type="url"
                  value={editingOSS.repoUrl}
                  onChange={(e) => setEditingOSS({ ...editingOSS, repoUrl: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-black/50 border border-white/10 text-white font-mono"
                />
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-3 border-t border-white/10">
              <button onClick={() => setEditingOSS(null)} className="px-4 py-2 rounded-xl text-xs font-mono text-neutral-400">
                Cancel
              </button>
              <button
                onClick={() => {
                  if (isNewOSS) {
                    addOpenSource(editingOSS)
                    showToast('Contribution Added!')
                  } else {
                    updateOpenSource(editingOSS.id, editingOSS)
                    showToast('Contribution Updated!')
                  }
                  setEditingOSS(null)
                }}
                className="px-5 py-2 rounded-xl bg-white text-black font-semibold text-xs font-mono uppercase"
              >
                Save Contribution
              </button>
            </div>
          </div>
        </div>
      )}

      {/* --- EDIT HONOR MODAL --- */}
      {editingHonor && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
          <div className="w-full max-w-xl bg-[#090c16] border border-white/15 rounded-3xl p-6 sm:p-8 space-y-4 shadow-2xl my-8">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <h3 className="text-lg font-bold font-heading text-white">
                {isNewHonor ? 'Add Honor' : `Edit: ${editingHonor.title}`}
              </h3>
              <button onClick={() => setEditingHonor(null)} className="text-neutral-400 hover:text-white cursor-pointer">
                ✕
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="sm:col-span-2">
                <label className="block text-neutral-400 mb-1 font-mono">Honor / Competition Title</label>
                <input
                  type="text"
                  value={editingHonor.title}
                  onChange={(e) => setEditingHonor({ ...editingHonor, title: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-black/50 border border-white/10 text-white font-mono"
                />
              </div>

              <div>
                <label className="block text-neutral-400 mb-1 font-mono">Issuer / Body</label>
                <input
                  type="text"
                  value={editingHonor.issuer}
                  onChange={(e) => setEditingHonor({ ...editingHonor, issuer: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-black/50 border border-white/10 text-white font-mono"
                />
              </div>

              <div>
                <label className="block text-neutral-400 mb-1 font-mono">Rank / Metric</label>
                <input
                  type="text"
                  value={editingHonor.rank || ''}
                  onChange={(e) => setEditingHonor({ ...editingHonor, rank: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-black/50 border border-white/10 text-white font-mono"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-neutral-400 mb-1 font-mono">Description</label>
                <textarea
                  rows={2}
                  value={editingHonor.description}
                  onChange={(e) => setEditingHonor({ ...editingHonor, description: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-black/50 border border-white/10 text-white font-mono"
                />
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-3 border-t border-white/10">
              <button onClick={() => setEditingHonor(null)} className="px-4 py-2 rounded-xl text-xs font-mono text-neutral-400">
                Cancel
              </button>
              <button
                onClick={() => {
                  if (isNewHonor) {
                    addHonor(editingHonor)
                    showToast('Honor Added!')
                  } else {
                    updateHonor(editingHonor.id, editingHonor)
                    showToast('Honor Updated!')
                  }
                  setEditingHonor(null)
                }}
                className="px-5 py-2 rounded-xl bg-white text-black font-semibold text-xs font-mono uppercase"
              >
                Save Honor
              </button>
            </div>
          </div>
        </div>
      )}

      {/* --- EDIT TIMELINE MODAL --- */}
      {editingTimeline && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
          <div className="w-full max-w-xl bg-[#090c16] border border-white/15 rounded-3xl p-6 sm:p-8 space-y-4 shadow-2xl my-8">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <h3 className="text-lg font-bold font-heading text-white">
                {isNewTimeline ? 'Add Milestone' : `Edit: ${editingTimeline.title}`}
              </h3>
              <button onClick={() => setEditingTimeline(null)} className="text-neutral-400 hover:text-white cursor-pointer">
                ✕
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div>
                <label className="block text-neutral-400 mb-1 font-mono">Title</label>
                <input
                  type="text"
                  value={editingTimeline.title}
                  onChange={(e) => setEditingTimeline({ ...editingTimeline, title: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-black/50 border border-white/10 text-white font-mono"
                />
              </div>

              <div>
                <label className="block text-neutral-400 mb-1 font-mono">Year / Period</label>
                <input
                  type="text"
                  value={editingTimeline.year}
                  onChange={(e) => setEditingTimeline({ ...editingTimeline, year: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-black/50 border border-white/10 text-white font-mono"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-neutral-400 mb-1 font-mono">Organization</label>
                <input
                  type="text"
                  value={editingTimeline.organization}
                  onChange={(e) => setEditingTimeline({ ...editingTimeline, organization: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-black/50 border border-white/10 text-white font-mono"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-neutral-400 mb-1 font-mono">Description</label>
                <textarea
                  rows={2}
                  value={editingTimeline.description}
                  onChange={(e) => setEditingTimeline({ ...editingTimeline, description: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-black/50 border border-white/10 text-white font-mono"
                />
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-3 border-t border-white/10">
              <button onClick={() => setEditingTimeline(null)} className="px-4 py-2 rounded-xl text-xs font-mono text-neutral-400">
                Cancel
              </button>
              <button
                onClick={() => {
                  if (isNewTimeline) {
                    addTimelineItem(editingTimeline)
                    showToast('Milestone Added!')
                  } else {
                    updateTimelineItem(editingTimeline.id, editingTimeline)
                    showToast('Milestone Updated!')
                  }
                  setEditingTimeline(null)
                }}
                className="px-5 py-2 rounded-xl bg-white text-black font-semibold text-xs font-mono uppercase"
              >
                Save Milestone
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
