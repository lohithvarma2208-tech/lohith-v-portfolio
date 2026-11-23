import type { Project } from '../types'

export const projectsData: Project[] = [
  {
    id: 'vss75',
    title: 'VSS75',
    subtitle: 'Virtual Student Space — Campus Academic Knowledge Network',
    category: 'Collaborative Platform',
    description:
      'A student academic resource-sharing network transforming scattered, ephemeral coursework into a permanent, discoverable collegiate knowledge repository for KL University students.',
    architectureOverview:
      'Architected with modern TypeScript and responsive UI components. Features categorized course notes, study material discovery, semester filter indexes, and collaborative peer resource indexing.',
    metrics: [
      { label: 'Platform Focus', value: 'KL University' },
      { label: 'Access Tier', value: 'Open Campus' },
      { label: 'Coursework Scope', value: 'Multi-Semester' },
      { label: 'Language', value: 'TypeScript' }
    ],
    techStack: ['TypeScript', 'React', 'Tailwind CSS', 'Vite', 'Client Routing'],
    keyFeatures: [
      'Campus-wide knowledge hub organizing coursework across academic semesters',
      'Categorized repository for lecture materials, assignments, and exam references',
      'Clean, accessible interface designed for fast mobile and desktop navigation',
      'Community-first resource discovery to help peers excel academically'
    ],
    challengesSolved:
      'Addressed the problem of critical student study notes getting buried in ephemeral WhatsApp chat groups by building a permanent, categorized, discoverable web network.',
    systemDiagramText: `
+--------------------+      +--------------------+      +--------------------+
| Course Submission  | ---> | Semester Categorizer| ---> | Search & Filter    |
+--------------------+      +--------------------+      +---------+----------+
                                                                  |
                                                                  v
                                                        +--------------------+
                                                        | Student Repository |
                                                        +--------------------+
    `,
    githubUrl: 'https://github.com/lohithvarma2208-tech/VSS75',
    year: '2026',
    featured: true
  },
  {
    id: 'kl-erp-buddy',
    title: 'KL ERP Buddy',
    subtitle: 'Automated Student Academic Dashboard & Attendance Bunk Calculator',
    category: 'Productivity & Tools',
    description:
      'A personal utility dashboard for KL University students — timetable schedules, real-time attendance tracking with smart bunk safety calculators, grades, and exam hall seating pulled straight from the university portal.',
    architectureOverview:
      'Designed to streamline student administrative routines. Implements session-based portal integration, automated percentage calculations with threshold warnings (keeping attendance safely above 75% / 85%), and offline timetable caching.',
    metrics: [
      { label: 'Bunk Calculator', value: 'Real-Time %' },
      { label: 'Attendance Goal', value: '>= 75% Safe' },
      { label: 'Portal Integration', value: 'newerp.kluniversity.in' },
      { label: 'Language', value: 'JavaScript' }
    ],
    techStack: ['JavaScript', 'HTML5', 'CSS3', 'DOM APIs', 'Local Storage'],
    keyFeatures: [
      'Smart Bunk Calculator predicting how many classes a student can safely miss or must attend to hit 75%/85%',
      'Daily class schedule and timetable display without tedious manual login steps',
      'Examination seating and hall ticket lookups formatted cleanly for mobile viewports',
      'Client-side persistence safeguarding student preferences locally'
    ],
    challengesSolved:
      'Engineered an intuitive attendance simulator that helps students manage their attendance margins mathematically, eliminating last-minute exam debarment surprises.',
    systemDiagramText: `
[ Student Credentials ]
         |
         v
+--------------------------+
| Portal Session Engine    |
+------------+-------------+
             |
   +---------+---------+
   |                   |
   v                   v
[ Attendance Engine ] [ Timetable & Seating ]
   |
   v
[ Bunk Safety Matrix ] (>=75% Threshold Alert)
    `,
    githubUrl: 'https://github.com/lohithvarma2208-tech/kl-erp-buddy',
    year: '2026',
    featured: true
  },
  {
    id: 'notely',
    title: 'Notely',
    subtitle: 'Student Note-Writing & Academic Preparation Services Marketplace',
    category: 'Full-Stack Platform',
    description:
      'A specialized student marketplace for academic note-writing. Students who miss lectures post requests with subjects, source materials, pages, handwriting style, deadlines, and budgets; peer writers submit bids to prepare tailored study packages.',
    architectureOverview:
      'Features request management workflows, handwriting style classifications, bid proposal exchanges, and an order state machine from request creation to document review and handover.',
    metrics: [
      { label: 'Marketplace Model', value: 'Student-to-Writer' },
      { label: 'Workflow', value: 'Bids & Handover' },
      { label: 'Request Engine', value: 'Dynamic Forms' },
      { label: 'Language', value: 'TypeScript' }
    ],
    techStack: ['TypeScript', 'React', 'Tailwind CSS', 'Vite', 'State Management'],
    keyFeatures: [
      'Structured note request posting: subject, source slides, deadline, and style',
      'Peer writer bidding system enabling students to pick preferred handwriting and turnaround times',
      'Stage-by-stage status tracker from request submission to completed note delivery',
      'Responsive design tailored for rapid student interaction'
    ],
    challengesSolved:
      'Created an organized alternative to chaotic peer-to-peer note requests, providing a fair exchange framework for students needing class material and writers willing to assist.',
    systemDiagramText: `
+------------------+      +------------------+      +------------------+
| Student Request  | ---> | Writer Proposal  | ---> | Review & Handover|
+------------------+      +------------------+      +------------------+
    `,
    githubUrl: 'https://github.com/lohithvarma2208-tech/Notely',
    year: '2026',
    featured: true
  },
  {
    id: 'lohith-v-portfolio',
    title: 'Lohith.V Digital Universe',
    subtitle: 'Interactive 3D Engineering Portfolio & Cloud CMS',
    category: 'Interactive Systems',
    description:
      'Personal production digital universe featuring real-time LeetCode and GitHub telemetry, interactive Three.js 3D developer avatar with cursor-tracking mechanics, dark cyber aesthetics, and continuous edge deployment.',
    architectureOverview:
      'Engineered with React 19, TypeScript, and Three.js WebGL rendering. Features dual-tier code splitting (188 kB entry bundle), Supabase PostgreSQL database integration, and continuous Vercel edge deployment.',
    metrics: [
      { label: 'Initial Bundle', value: '188 kB' },
      { label: '3D Graphics', value: 'Three.js WebGL' },
      { label: 'Live Telemetry', value: 'LeetCode & GitHub' },
      { label: 'Edge Hosting', value: 'Vercel & Render' }
    ],
    techStack: ['React 19', 'TypeScript', 'Three.js', 'Tailwind CSS', 'Supabase', 'Vercel'],
    keyFeatures: [
      'Interactive 3D Cyber Developer Avatar tracking visitor cursor in real-time',
      'Dynamic telemetry queried from public LeetCode and GitHub APIs on each visit',
      'Password-protected Admin CMS (#admin) for instant in-browser data updates',
      'Dual edge deployment on Vercel and Render with Supabase PostgreSQL backend'
    ],
    challengesSolved:
      'Achieved a rich 3D WebGL user experience while maintaining an ultralight 188 kB initial load footprint via fine-grained Rollup vendor chunking and React Suspense lazy loading.',
    systemDiagramText: `
+--------------------+      +--------------------+      +--------------------+
| 3D Avatar (Three)  | ---> | React 19 / Vite UI | ---> | Live Telemetry Hub |
+--------------------+      +---------+----------+      +---------+----------+
                                      |                           |
                                      v                           v
                           [ Vercel Edge Global ]     [ LeetCode & GitHub APIs ]
    `,
    githubUrl: 'https://github.com/lohithvarma2208-tech/lohith-v-portfolio',
    demoUrl: 'https://lohith-v-portfolio.vercel.app/',
    year: '2026',
    featured: true
  }
]
