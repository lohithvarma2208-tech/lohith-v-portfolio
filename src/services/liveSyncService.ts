import type {
  LiveGitHubData,
  LiveLeetCodeData,
  LiveLinkedInData,
  LiveAccountsState,
  LiveGitHubRepo
} from '../types'

const CACHE_KEY = 'lv_live_accounts_cache_v2'

const defaultGitHubData: LiveGitHubData = {
  username: 'lohithvarma2208-tech',
  profileUrl: 'https://github.com/lohithvarma2208-tech',
  avatarUrl: 'https://avatars.githubusercontent.com/u/305896561?v=4',
  publicRepos: 4,
  followers: 1,
  following: 1,
  totalStars: 0,
  lastUpdated: new Date().toISOString(),
  latestActivity: 'Active full-stack and campus academic repository development',
  repos: [
    {
      name: 'VSS75',
      description: 'Virtual Student Space — Campus Academic Knowledge Network for KL University students',
      language: 'TypeScript',
      stars: 0,
      url: 'https://github.com/lohithvarma2208-tech/VSS75',
      updatedAt: '2026-11-21T20:03:50Z'
    },
    {
      name: 'kl-erp-buddy',
      description: 'Automated attendance dashboard with bunk safety calculator and timetable scheduler for KL University ERP',
      language: 'JavaScript',
      stars: 0,
      url: 'https://github.com/lohithvarma2208-tech/kl-erp-buddy',
      updatedAt: '2026-08-09T07:35:59Z'
    },
    {
      name: 'Notely',
      description: 'Student academic note-writing and note-preparation marketplace platform',
      language: 'TypeScript',
      stars: 0,
      url: 'https://github.com/lohithvarma2208-tech/Notely',
      updatedAt: '2026-11-18T15:11:17Z'
    },
    {
      name: 'lohith-v-portfolio',
      description: '3D interactive engineering portfolio with Three.js avatar and cloud database integration',
      language: 'TypeScript',
      stars: 0,
      url: 'https://github.com/lohithvarma2208-tech/lohith-v-portfolio',
      updatedAt: '2026-11-23T15:00:00Z'
    }
  ]
}

const defaultLeetCodeData: LiveLeetCodeData = {
  username: '_CodeMaster_1',
  profileUrl: 'https://leetcode.com/u/_CodeMaster_1/',
  totalSolved: 22,
  easySolved: 21,
  mediumSolved: 1,
  hardSolved: 0,
  acceptanceRate: '68.8%',
  ranking: '#4,439,419',
  rating: 1450,
  badge: 'Algorithm Solver',
  lastUpdated: new Date().toISOString()
}

const defaultLinkedInData: LiveLinkedInData = {
  profileUrl: 'https://www.linkedin.com/in/lohith-varma-3b4153421/',
  username: 'lohith-varma-3b4153421',
  status: 'verified',
  lastChecked: new Date().toISOString()
}

/**
 * Fetch live GitHub statistics directly from public GitHub REST API
 */
export async function fetchLiveGitHub(username = 'lohithvarma2208-tech'): Promise<LiveGitHubData> {
  try {
    const userRes = await fetch(`https://api.github.com/users/${username}`, {
      headers: { Accept: 'application/vnd.github.v3+json' }
    })

    if (!userRes.ok) {
      console.warn(`[LiveSync] GitHub API returned status ${userRes.status}`)
      return defaultGitHubData
    }

    const userData = await userRes.json()

    // Fetch public repositories
    let repos: LiveGitHubRepo[] = defaultGitHubData.repos
    let totalStars = 0

    try {
      const reposRes = await fetch(
        `https://api.github.com/users/${username}/repos?sort=updated&per_page=6`,
        { headers: { Accept: 'application/vnd.github.v3+json' } }
      )
      if (reposRes.ok) {
        const reposJson = await reposRes.json()
        if (Array.isArray(reposJson) && reposJson.length > 0) {
          repos = reposJson.map((r: any) => ({
            name: r.name,
            description: r.description || 'Public systems repository',
            language: r.language || 'Code',
            stars: r.stargazers_count || 0,
            url: r.html_url,
            updatedAt: r.updated_at
          }))
          totalStars = reposJson.reduce((sum: number, r: any) => sum + (r.stargazers_count || 0), 0)
        }
      }
    } catch (e) {
      console.warn('[LiveSync] Failed to fetch repos list:', e)
    }

    // Fetch latest activity event
    let latestActivity = 'Active on GitHub'
    try {
      const eventsRes = await fetch(`https://api.github.com/users/${username}/events/public?per_page=3`)
      if (eventsRes.ok) {
        const events = await eventsRes.json()
        if (Array.isArray(events) && events.length > 0) {
          const first = events[0]
          const repoName = first.repo?.name ? first.repo.name.split('/').pop() : 'repository'
          if (first.type === 'PushEvent') {
            latestActivity = `Pushed commits to ${repoName}`
          } else if (first.type === 'CreateEvent') {
            latestActivity = `Created ${first.payload?.ref_type || 'project'} in ${repoName}`
          } else {
            latestActivity = `Active in ${repoName}`
          }
        }
      }
    } catch {
      // ignore
    }

    return {
      username: userData.login || username,
      profileUrl: userData.html_url || `https://github.com/${username}`,
      avatarUrl: userData.avatar_url || defaultGitHubData.avatarUrl,
      publicRepos: userData.public_repos !== undefined ? userData.public_repos : defaultGitHubData.publicRepos,
      followers: userData.followers !== undefined ? userData.followers : defaultGitHubData.followers,
      following: userData.following !== undefined ? userData.following : defaultGitHubData.following,
      totalStars: totalStars > 0 ? totalStars : defaultGitHubData.totalStars,
      lastUpdated: new Date().toISOString(),
      latestActivity,
      repos
    }
  } catch (err) {
    console.warn('[LiveSync] Error fetching GitHub data:', err)
    return defaultGitHubData
  }
}

/**
 * Fetch live LeetCode stats with graceful fallback
 */
export async function fetchLiveLeetCode(username = '_CodeMaster_1'): Promise<LiveLeetCodeData> {
  try {
    // Attempt fast query to public stats gateway
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 5000)

    const res = await fetch(`https://alfa-leetcode-api.onrender.com/userProfile/${username}`, {
      signal: controller.signal
    }).catch(() => null)

    clearTimeout(timeoutId)

    if (res && res.ok) {
      const data = await res.json()
      if (data && data.totalSolved !== undefined) {
        return {
          username,
          profileUrl: `https://leetcode.com/u/${username}/`,
          totalSolved: !isNaN(Number(data.totalSolved)) ? Number(data.totalSolved) : defaultLeetCodeData.totalSolved,
          easySolved: !isNaN(Number(data.easySolved)) ? Number(data.easySolved) : defaultLeetCodeData.easySolved,
          mediumSolved: !isNaN(Number(data.mediumSolved)) ? Number(data.mediumSolved) : defaultLeetCodeData.mediumSolved,
          hardSolved: !isNaN(Number(data.hardSolved)) ? Number(data.hardSolved) : defaultLeetCodeData.hardSolved,
          acceptanceRate: data.acceptanceRate ? `${data.acceptanceRate}%` : '68.8%',
          ranking: data.ranking ? `#${Number(data.ranking).toLocaleString()}` : defaultLeetCodeData.ranking,
          rating: defaultLeetCodeData.rating,
          badge: defaultLeetCodeData.badge,
          lastUpdated: new Date().toISOString()
        }
      }
    }

    return defaultLeetCodeData
  } catch {
    return defaultLeetCodeData
  }
}

/**
 * Get cached live sync data or initialize with defaults
 */
export function getCachedLiveAccounts(): LiveAccountsState {
  if (typeof window === 'undefined') {
    return {
      github: defaultGitHubData,
      leetcode: defaultLeetCodeData,
      linkedin: defaultLinkedInData,
      isSyncing: false,
      lastSyncedAt: new Date().toISOString()
    }
  }

  try {
    const cached = localStorage.getItem(CACHE_KEY)
    if (cached) {
      const parsed = JSON.parse(cached)
      return {
        github: parsed.github || defaultGitHubData,
        leetcode: parsed.leetcode || defaultLeetCodeData,
        linkedin: parsed.linkedin || defaultLinkedInData,
        isSyncing: false,
        lastSyncedAt: parsed.lastSyncedAt || new Date().toISOString()
      }
    }
  } catch (e) {
    console.warn('[LiveSync] Failed to read cache:', e)
  }

  return {
    github: defaultGitHubData,
    leetcode: defaultLeetCodeData,
    linkedin: defaultLinkedInData,
    isSyncing: false,
    lastSyncedAt: new Date().toISOString()
  }
}

/**
 * Trigger full dynamic sync across all platforms and update localStorage
 */
export async function syncAllLiveAccounts(
  githubUser = 'lohithvarma2208-tech',
  leetcodeUser = '_CodeMaster_1',
  linkedinUrl = 'https://www.linkedin.com/in/lohith-varma-3b4153421/'
): Promise<LiveAccountsState> {
  const [github, leetcode] = await Promise.all([
    fetchLiveGitHub(githubUser),
    fetchLiveLeetCode(leetcodeUser)
  ])

  const linkedin: LiveLinkedInData = {
    profileUrl: linkedinUrl,
    username: linkedinUrl.split('/in/')[1]?.replace('/', '') || 'lohith-varma',
    status: 'verified',
    lastChecked: new Date().toISOString()
  }

  const state: LiveAccountsState = {
    github,
    leetcode,
    linkedin,
    isSyncing: false,
    lastSyncedAt: new Date().toISOString()
  }

  try {
    localStorage.setItem(CACHE_KEY, JSON.stringify(state))
  } catch (e) {
    console.warn('[LiveSync] Failed to cache state:', e)
  }

  return state
}
