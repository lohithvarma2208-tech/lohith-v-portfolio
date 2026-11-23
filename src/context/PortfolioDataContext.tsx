import React, { createContext, useContext, useState, useEffect } from 'react'
import type {
  Project,
  TimelineItem,
  WorkExperience,
  Certification,
  OpenSourceContribution,
  HonorAward,
  SkillCategory,
  LiveAccountsState
} from '../types'
import { projectsData as defaultProjects } from '../data/projects'
import { timelineData as defaultTimeline } from '../data/timeline'
import {
  defaultSkillCategories,
  defaultExperiences,
  defaultCertifications,
  defaultOpenSource,
  defaultHonors
} from '../data/qualifications'
import { getCachedLiveAccounts, syncAllLiveAccounts } from '../services/liveSyncService'
import { syncPortfolioToCloud, fetchPortfolioFromCloud } from '../services/supabaseClient'

export interface PersonalInfo {
  name: string
  title: string
  statusBadge: string
  tagline: string
  bio: string
  location: string
  photoUrl: string
}

export interface ContactInfo {
  email: string
  githubUrl: string
  githubUsername: string
  linkedinUrl: string
  resumeUrl: string
  leetcodeUsername?: string
  leetcodeUrl?: string
}

export interface PhysicsSkillBall {
  name: string
  color: string
  bg: string
}

export interface SkillsData {
  physicsBalls?: PhysicsSkillBall[]
  categories: SkillCategory[]
  domains?: string[]
}

export interface PortfolioDataContextType {
  personalInfo: PersonalInfo
  contactInfo: ContactInfo
  projects: Project[]
  skills: SkillsData
  timeline: TimelineItem[]
  experiences: WorkExperience[]
  certifications: Certification[]
  openSource: OpenSourceContribution[]
  honors: HonorAward[]
  liveAccounts: LiveAccountsState
  refreshLiveAccounts: () => Promise<void>

  updatePersonalInfo: (info: Partial<PersonalInfo>) => void
  updateContactInfo: (info: Partial<ContactInfo>) => void

  setProjects: (projects: Project[]) => void
  addProject: (project: Project) => void
  updateProject: (id: string, updated: Partial<Project>) => void
  deleteProject: (id: string) => void

  updateSkills: (skills: SkillsData) => void

  setTimeline: (timeline: TimelineItem[]) => void
  addTimelineItem: (item: TimelineItem) => void
  updateTimelineItem: (id: string, updated: Partial<TimelineItem>) => void
  deleteTimelineItem: (id: string) => void

  setExperiences: (exp: WorkExperience[]) => void
  addExperience: (exp: WorkExperience) => void
  updateExperience: (id: string, updated: Partial<WorkExperience>) => void
  deleteExperience: (id: string) => void

  setCertifications: (certs: Certification[]) => void
  addCertification: (cert: Certification) => void
  updateCertification: (id: string, updated: Partial<Certification>) => void
  deleteCertification: (id: string) => void

  setOpenSource: (oss: OpenSourceContribution[]) => void
  addOpenSource: (item: OpenSourceContribution) => void
  updateOpenSource: (id: string, updated: Partial<OpenSourceContribution>) => void
  deleteOpenSource: (id: string) => void

  setHonors: (honors: HonorAward[]) => void
  addHonor: (honor: HonorAward) => void
  updateHonor: (id: string, updated: Partial<HonorAward>) => void
  deleteHonor: (id: string) => void

  resetToDefaults: () => void
  exportDataJSON: () => string
  importDataJSON: (jsonStr: string) => boolean
}

const defaultPersonalInfo: PersonalInfo = {
  name: 'Lohith Varma',
  title: 'Software Engineer & Systems Builder',
  statusBadge: 'Available for 2027 SWE Internships & Roles',
  tagline: 'Learning relentlessly. Building deliberately. Evolving continuously.',
  bio: 'Computer Science Undergraduate at KL University. Building high-utility student ecosystems, full-stack applications, and interactive web software.',
  location: 'KL University, India',
  photoUrl: '/lohith_varma.png'
}

const defaultContactInfo: ContactInfo = {
  email: 'lohithvarma2208@gmail.com',
  githubUrl: 'https://github.com/lohithvarma2208-tech',
  githubUsername: 'lohithvarma2208-tech',
  linkedinUrl: 'https://www.linkedin.com/in/lohith-varma-3b4153421/',
  resumeUrl: '/resume.pdf',
  leetcodeUsername: '_CodeMaster_1',
  leetcodeUrl: 'https://leetcode.com/u/_CodeMaster_1/'
}

export const defaultDomains = ['Systems', 'Distributed', 'Backend', 'Graphics', 'Cloud']

const defaultSkillsData: SkillsData = {
  categories: defaultSkillCategories,
  domains: defaultDomains
}

const STORAGE_KEY = 'lv_portfolio_master_data_v3'

const PortfolioDataContext = createContext<PortfolioDataContextType | undefined>(undefined)

export const PortfolioDataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [personalInfo, setPersonalInfoState] = useState<PersonalInfo>(defaultPersonalInfo)
  const [contactInfo, setContactInfoState] = useState<ContactInfo>(defaultContactInfo)
  const [projects, setProjectsState] = useState<Project[]>(defaultProjects)
  const [skills, setSkillsState] = useState<SkillsData>(defaultSkillsData)
  const [timeline, setTimelineState] = useState<TimelineItem[]>(defaultTimeline)
  const [experiences, setExperiencesState] = useState<WorkExperience[]>(defaultExperiences)
  const [certifications, setCertificationsState] = useState<Certification[]>(defaultCertifications)
  const [openSource, setOpenSourceState] = useState<OpenSourceContribution[]>(defaultOpenSource)
  const [honors, setHonorsState] = useState<HonorAward[]>(defaultHonors)
  const [liveAccounts, setLiveAccounts] = useState<LiveAccountsState>(getCachedLiveAccounts)

  const refreshLiveAccounts = async () => {
    setLiveAccounts((prev) => ({ ...prev, isSyncing: true }))
    try {
      const updated = await syncAllLiveAccounts(
        contactInfo.githubUsername || 'lohithvarma2208-tech',
        contactInfo.leetcodeUsername || '_CodeMaster_1',
        contactInfo.linkedinUrl || 'https://www.linkedin.com/in/lohith-varma-3b4153421/'
      )
      setLiveAccounts(updated)
    } catch (err) {
      console.warn('[PortfolioData] Live sync error:', err)
      setLiveAccounts((prev) => ({ ...prev, isSyncing: false }))
    }
  }

  // Trigger auto-sync on mount and whenever usernames change
  useEffect(() => {
    refreshLiveAccounts()
  }, [contactInfo.githubUsername, contactInfo.leetcodeUsername, contactInfo.linkedinUrl])

  // Load persisted edits from localStorage first, then sync with Supabase Cloud Database for cross-device updates
  useEffect(() => {
    const hydrateState = (parsed: any) => {
      if (!parsed || typeof parsed !== 'object') return
      if (parsed.personalInfo) {
        if (
          parsed.personalInfo.photoUrl?.startsWith('C:') ||
          parsed.personalInfo.photoUrl?.startsWith('file:') ||
          parsed.personalInfo.photoUrl?.includes('\\') ||
          !parsed.personalInfo.photoUrl
        ) {
          parsed.personalInfo.photoUrl = '/lohith_varma.png'
        }
        setPersonalInfoState(parsed.personalInfo)
      }
      if (parsed.contactInfo) {
        if (!parsed.contactInfo.leetcodeUsername || parsed.contactInfo.leetcodeUsername === 'lohithvarma2208') {
          parsed.contactInfo.leetcodeUsername = '_CodeMaster_1'
          parsed.contactInfo.leetcodeUrl = 'https://leetcode.com/u/_CodeMaster_1/'
        }
        setContactInfoState(parsed.contactInfo)
      }
      if (parsed.projects && Array.isArray(parsed.projects)) setProjectsState(parsed.projects)
      if (parsed.skills?.categories) {
        setSkillsState({
          ...defaultSkillsData,
          ...parsed.skills,
          domains: Array.isArray(parsed.skills.domains) && parsed.skills.domains.length > 0
            ? parsed.skills.domains
            : defaultDomains
        })
      }
      if (parsed.timeline && Array.isArray(parsed.timeline)) setTimelineState(parsed.timeline)
      if (parsed.experiences && Array.isArray(parsed.experiences)) setExperiencesState(parsed.experiences)
      if (parsed.certifications && Array.isArray(parsed.certifications)) setCertificationsState(parsed.certifications)
      if (parsed.openSource && Array.isArray(parsed.openSource)) setOpenSourceState(parsed.openSource)
      if (parsed.honors && Array.isArray(parsed.honors)) setHonorsState(parsed.honors)
    }

    try {
      // Clean up legacy mock data caches
      localStorage.removeItem('lv_portfolio_master_data_v1')
      localStorage.removeItem('lv_portfolio_master_data_v2')

      const saved = localStorage.getItem(STORAGE_KEY)
      if (saved) {
        hydrateState(JSON.parse(saved))
      }
    } catch (err) {
      console.warn('[PortfolioData] Failed to load from localStorage:', err)
    }

    // Cross-device cloud sync: If Supabase has newer CMS updates, hydrate mobile phones and other devices
    fetchPortfolioFromCloud().then((cloudData) => {
      if (cloudData) {
        hydrateState(cloudData)
        try {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(cloudData))
        } catch {
          // ignore
        }
      }
    })
  }, [])

  // Helper to persist current state locally and to Supabase Cloud
  const persist = (
    newPersonal: PersonalInfo,
    newContact: ContactInfo,
    newProjects: Project[],
    newSkills: SkillsData,
    newTimeline: TimelineItem[],
    newExp: WorkExperience[],
    newCerts: Certification[],
    newOSS: OpenSourceContribution[],
    newHonors: HonorAward[]
  ) => {
    try {
      const payload = {
        personalInfo: newPersonal,
        contactInfo: newContact,
        projects: newProjects,
        skills: newSkills,
        timeline: newTimeline,
        experiences: newExp,
        certifications: newCerts,
        openSource: newOSS,
        honors: newHonors,
        updatedAt: new Date().toISOString()
      }
      localStorage.setItem(STORAGE_KEY, JSON.stringify(payload))
      // Universal cross-device sync: saves to Supabase cloud database if configured
      syncPortfolioToCloud(payload)
    } catch (err) {
      console.warn('[PortfolioData] Failed to persist data:', err)
    }
  }

  const updatePersonalInfo = (info: Partial<PersonalInfo>) => {
    setPersonalInfoState((prev) => {
      const next = { ...prev, ...info }
      persist(next, contactInfo, projects, skills, timeline, experiences, certifications, openSource, honors)
      return next
    })
  }

  const updateContactInfo = (info: Partial<ContactInfo>) => {
    setContactInfoState((prev) => {
      const next = { ...prev, ...info }
      persist(personalInfo, next, projects, skills, timeline, experiences, certifications, openSource, honors)
      return next
    })
  }

  const setProjects = (newProjects: Project[]) => {
    setProjectsState(newProjects)
    persist(personalInfo, contactInfo, newProjects, skills, timeline, experiences, certifications, openSource, honors)
  }

  const addProject = (project: Project) => {
    setProjectsState((prev) => {
      const next = [project, ...prev]
      persist(personalInfo, contactInfo, next, skills, timeline, experiences, certifications, openSource, honors)
      return next
    })
  }

  const updateProject = (id: string, updated: Partial<Project>) => {
    setProjectsState((prev) => {
      const next = prev.map((p) => (p.id === id ? { ...p, ...updated } : p))
      persist(personalInfo, contactInfo, next, skills, timeline, experiences, certifications, openSource, honors)
      return next
    })
  }

  const deleteProject = (id: string) => {
    setProjectsState((prev) => {
      const next = prev.filter((p) => p.id !== id)
      persist(personalInfo, contactInfo, next, skills, timeline, experiences, certifications, openSource, honors)
      return next
    })
  }

  const updateSkills = (newSkills: SkillsData) => {
    setSkillsState(newSkills)
    persist(personalInfo, contactInfo, projects, newSkills, timeline, experiences, certifications, openSource, honors)
  }

  const setTimeline = (newTimeline: TimelineItem[]) => {
    setTimelineState(newTimeline)
    persist(personalInfo, contactInfo, projects, skills, newTimeline, experiences, certifications, openSource, honors)
  }

  const addTimelineItem = (item: TimelineItem) => {
    setTimelineState((prev) => {
      const next = [item, ...prev]
      persist(personalInfo, contactInfo, projects, skills, next, experiences, certifications, openSource, honors)
      return next
    })
  }

  const updateTimelineItem = (id: string, updated: Partial<TimelineItem>) => {
    setTimelineState((prev) => {
      const next = prev.map((t) => (t.id === id ? { ...t, ...updated } : t))
      persist(personalInfo, contactInfo, projects, skills, next, experiences, certifications, openSource, honors)
      return next
    })
  }

  const deleteTimelineItem = (id: string) => {
    setTimelineState((prev) => {
      const next = prev.filter((t) => t.id !== id)
      persist(personalInfo, contactInfo, projects, skills, next, experiences, certifications, openSource, honors)
      return next
    })
  }

  // Work Experience Handlers
  const setExperiences = (newExp: WorkExperience[]) => {
    setExperiencesState(newExp)
    persist(personalInfo, contactInfo, projects, skills, timeline, newExp, certifications, openSource, honors)
  }

  const addExperience = (exp: WorkExperience) => {
    setExperiencesState((prev) => {
      const next = [exp, ...prev]
      persist(personalInfo, contactInfo, projects, skills, timeline, next, certifications, openSource, honors)
      return next
    })
  }

  const updateExperience = (id: string, updated: Partial<WorkExperience>) => {
    setExperiencesState((prev) => {
      const next = prev.map((e) => (e.id === id ? { ...e, ...updated } : e))
      persist(personalInfo, contactInfo, projects, skills, timeline, next, certifications, openSource, honors)
      return next
    })
  }

  const deleteExperience = (id: string) => {
    setExperiencesState((prev) => {
      const next = prev.filter((e) => e.id !== id)
      persist(personalInfo, contactInfo, projects, skills, timeline, next, certifications, openSource, honors)
      return next
    })
  }

  // Certification Handlers
  const setCertifications = (newCerts: Certification[]) => {
    setCertificationsState(newCerts)
    persist(personalInfo, contactInfo, projects, skills, timeline, experiences, newCerts, openSource, honors)
  }

  const addCertification = (cert: Certification) => {
    setCertificationsState((prev) => {
      const next = [cert, ...prev]
      persist(personalInfo, contactInfo, projects, skills, timeline, experiences, next, openSource, honors)
      return next
    })
  }

  const updateCertification = (id: string, updated: Partial<Certification>) => {
    setCertificationsState((prev) => {
      const next = prev.map((c) => (c.id === id ? { ...c, ...updated } : c))
      persist(personalInfo, contactInfo, projects, skills, timeline, experiences, next, openSource, honors)
      return next
    })
  }

  const deleteCertification = (id: string) => {
    setCertificationsState((prev) => {
      const next = prev.filter((c) => c.id !== id)
      persist(personalInfo, contactInfo, projects, skills, timeline, experiences, next, openSource, honors)
      return next
    })
  }

  // Open Source Handlers
  const setOpenSource = (newOSS: OpenSourceContribution[]) => {
    setOpenSourceState(newOSS)
    persist(personalInfo, contactInfo, projects, skills, timeline, experiences, certifications, newOSS, honors)
  }

  const addOpenSource = (item: OpenSourceContribution) => {
    setOpenSourceState((prev) => {
      const next = [item, ...prev]
      persist(personalInfo, contactInfo, projects, skills, timeline, experiences, certifications, next, honors)
      return next
    })
  }

  const updateOpenSource = (id: string, updated: Partial<OpenSourceContribution>) => {
    setOpenSourceState((prev) => {
      const next = prev.map((o) => (o.id === id ? { ...o, ...updated } : o))
      persist(personalInfo, contactInfo, projects, skills, timeline, experiences, certifications, next, honors)
      return next
    })
  }

  const deleteOpenSource = (id: string) => {
    setOpenSourceState((prev) => {
      const next = prev.filter((o) => o.id !== id)
      persist(personalInfo, contactInfo, projects, skills, timeline, experiences, certifications, next, honors)
      return next
    })
  }

  // Honors Handlers
  const setHonors = (newHonors: HonorAward[]) => {
    setHonorsState(newHonors)
    persist(personalInfo, contactInfo, projects, skills, timeline, experiences, certifications, openSource, newHonors)
  }

  const addHonor = (honor: HonorAward) => {
    setHonorsState((prev) => {
      const next = [honor, ...prev]
      persist(personalInfo, contactInfo, projects, skills, timeline, experiences, certifications, openSource, next)
      return next
    })
  }

  const updateHonor = (id: string, updated: Partial<HonorAward>) => {
    setHonorsState((prev) => {
      const next = prev.map((h) => (h.id === id ? { ...h, ...updated } : h))
      persist(personalInfo, contactInfo, projects, skills, timeline, experiences, certifications, openSource, next)
      return next
    })
  }

  const deleteHonor = (id: string) => {
    setHonorsState((prev) => {
      const next = prev.filter((h) => h.id !== id)
      persist(personalInfo, contactInfo, projects, skills, timeline, experiences, certifications, openSource, next)
      return next
    })
  }

  const resetToDefaults = () => {
    setPersonalInfoState(defaultPersonalInfo)
    setContactInfoState(defaultContactInfo)
    setProjectsState(defaultProjects)
    setSkillsState(defaultSkillsData)
    setTimelineState(defaultTimeline)
    setExperiencesState(defaultExperiences)
    setCertificationsState(defaultCertifications)
    setOpenSourceState(defaultOpenSource)
    setHonorsState(defaultHonors)
    localStorage.removeItem(STORAGE_KEY)
  }

  const exportDataJSON = (): string => {
    return JSON.stringify(
      {
        personalInfo,
        contactInfo,
        projects,
        skills,
        timeline,
        experiences,
        certifications,
        openSource,
        honors,
        exportedAt: new Date().toISOString()
      },
      null,
      2
    )
  }

  const importDataJSON = (jsonStr: string): boolean => {
    try {
      const parsed = JSON.parse(jsonStr)
      if (parsed.personalInfo) setPersonalInfoState(parsed.personalInfo)
      if (parsed.contactInfo) setContactInfoState(parsed.contactInfo)
      if (parsed.projects && Array.isArray(parsed.projects)) setProjectsState(parsed.projects)
      if (parsed.skills?.categories) setSkillsState(parsed.skills)
      if (parsed.timeline && Array.isArray(parsed.timeline)) setTimelineState(parsed.timeline)
      if (parsed.experiences && Array.isArray(parsed.experiences)) setExperiencesState(parsed.experiences)
      if (parsed.certifications && Array.isArray(parsed.certifications)) setCertificationsState(parsed.certifications)
      if (parsed.openSource && Array.isArray(parsed.openSource)) setOpenSourceState(parsed.openSource)
      if (parsed.honors && Array.isArray(parsed.honors)) setHonorsState(parsed.honors)

      persist(
        parsed.personalInfo || personalInfo,
        parsed.contactInfo || contactInfo,
        parsed.projects || projects,
        parsed.skills || skills,
        parsed.timeline || timeline,
        parsed.experiences || experiences,
        parsed.certifications || certifications,
        parsed.openSource || openSource,
        parsed.honors || honors
      )
      return true
    } catch (e) {
      console.error('[PortfolioData] Import failed:', e)
      return false
    }
  }

  return (
    <PortfolioDataContext.Provider
      value={{
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
        setProjects,
        addProject,
        updateProject,
        deleteProject,
        updateSkills,
        setTimeline,
        addTimelineItem,
        updateTimelineItem,
        deleteTimelineItem,
        setExperiences,
        addExperience,
        updateExperience,
        deleteExperience,
        setCertifications,
        addCertification,
        updateCertification,
        deleteCertification,
        setOpenSource,
        addOpenSource,
        updateOpenSource,
        deleteOpenSource,
        setHonors,
        addHonor,
        updateHonor,
        deleteHonor,
        liveAccounts,
        refreshLiveAccounts,
        resetToDefaults,
        exportDataJSON,
        importDataJSON
      }}
    >
      {children}
    </PortfolioDataContext.Provider>
  )
}

export const usePortfolioData = (): PortfolioDataContextType => {
  const context = useContext(PortfolioDataContext)
  if (!context) {
    throw new Error('usePortfolioData must be used within a PortfolioDataProvider')
  }
  return context
}
