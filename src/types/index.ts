export type AccentTheme = 'cyan' | 'emerald' | 'amber' | 'violet'

export interface ProjectMetric {
  label: string
  value: string
}

export interface Project {
  id: string
  title: string
  subtitle: string
  category: 'Distributed Systems' | 'AI & Memory' | 'Low-Level Storage' | 'Graphics & WebGL' | 'Developer Tooling' | 'Collaborative Platform' | 'Productivity & Tools' | 'Full-Stack Platform' | 'Interactive Systems' | string
  description: string
  architectureOverview: string
  metrics: ProjectMetric[]
  techStack: string[]
  keyFeatures: string[]
  challengesSolved: string
  systemDiagramText?: string
  githubUrl: string
  demoUrl?: string
  year: string
  featured: boolean
}

export interface Essay {
  id: string
  title: string
  subtitle: string
  readTime: string
  date: string
  tags: string[]
  excerpt: string
  content: string[]
}

export interface SkillCategory {
  title: string
  skills: string[]
  domain?: string
}

export interface SkillItem {
  name: string
  level: number // 1 - 100
  note: string
  badge?: string
}

export interface SkillGroup {
  category: string
  iconName: string
  description: string
  skills: SkillItem[]
}

export interface TimelineItem {
  id: string
  year: string
  period: string
  title: string
  organization: string
  type: 'education' | 'engineering' | 'research' | 'milestone'
  description: string
  achievements: string[]
  status: 'completed' | 'current' | 'future'
}

export interface PhilosophyPrinciple {
  number: string
  title: string
  thesis: string
  description: string
  quote: string
}

export interface TerminalLogEntry {
  type: 'command' | 'output' | 'error' | 'system' | 'ascii'
  text: string
  time?: string
}

export interface WorkExperience {
  id: string
  role: string
  company: string
  companyUrl?: string
  location: string
  period: string
  current?: boolean
  type: 'Full-Time' | 'Internship' | 'Fellowship' | 'Contract' | 'Research' | 'Academic & Projects' | 'Degree Program' | string
  summary: string
  achievements: string[]
  techStack: string[]
}

export interface Certification {
  id: string
  title: string
  issuer: string
  issueDate: string
  expiryDate?: string
  credentialId?: string
  credentialUrl?: string
  badgeColor?: string
  skills: string[]
}

export interface OpenSourceContribution {
  id: string
  repo: string
  repoUrl: string
  title: string
  prUrl?: string
  prNumber?: string
  type: 'Pull Request' | 'Maintainer' | 'Core Architecture' | 'Module' | 'Tool' | 'Core Creator' | string
  description: string
  impact: string
  stars?: string
  techStack: string[]
}

export interface HonorAward {
  id: string
  title: string
  issuer: string
  date: string
  rank?: string
  metric?: string
  description: string
  badge: string
  link?: string
}

export interface LiveGitHubRepo {
  name: string
  description?: string
  language?: string
  stars: number
  url: string
  updatedAt: string
}

export interface LiveGitHubData {
  username: string
  profileUrl: string
  avatarUrl: string
  publicRepos: number
  followers: number
  following: number
  totalStars: number
  lastUpdated: string
  latestActivity?: string
  repos: LiveGitHubRepo[]
}

export interface LiveLeetCodeData {
  username: string
  profileUrl: string
  totalSolved: number
  easySolved: number
  mediumSolved: number
  hardSolved: number
  acceptanceRate?: string
  ranking?: string
  rating?: number
  badge?: string
  lastUpdated: string
}

export interface LiveLinkedInData {
  profileUrl: string
  username: string
  status: 'connected' | 'verified'
  lastChecked: string
}

export interface LiveAccountsState {
  github: LiveGitHubData | null
  leetcode: LiveLeetCodeData | null
  linkedin: LiveLinkedInData
  isSyncing: boolean
  lastSyncedAt: string | null
  error?: string | null
}


