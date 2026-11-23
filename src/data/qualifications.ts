import type {
  WorkExperience,
  Certification,
  OpenSourceContribution,
  HonorAward,
  SkillCategory
} from '../types'

export const defaultSkillCategories: SkillCategory[] = [
  {
    title: 'Core Programming Languages',
    skills: [
      'Java (OOP, Core Algorithms, Collections)',
      'TypeScript',
      'JavaScript (ES6+)',
      'HTML5 & Modern CSS3',
      'SQL (PostgreSQL Basics)'
    ]
  },
  {
    title: 'Frontend & Web Technologies',
    skills: [
      'React 19',
      'Vite & Rolldown',
      'Tailwind CSS',
      'Responsive UI / UX Design',
      'Client-Side Routing',
      'DOM Manipulation & Event Handling'
    ]
  },
  {
    title: '3D Graphics & Interactive Web',
    skills: [
      'Three.js (Scene, Mesh, Lighting, Materials)',
      'WebGL Canvas Rendering',
      'Interactive Cursor Tracking',
      'Web Audio API Sound Synthesizer'
    ]
  },
  {
    title: 'Backend, Database & Cloud',
    skills: [
      'Supabase (PostgreSQL & Row-Level Security)',
      'REST API Integration',
      'Vercel Global Edge CDN',
      'Render Cloud Hosting',
      'Local Storage & Session Management'
    ]
  },
  {
    title: 'Developer Tooling & Workflows',
    skills: [
      'Git & GitHub Version Control',
      'Continuous Deployment (CI/CD)',
      'npm & Package Management',
      'Bash & PowerShell Scripting',
      'VS Code & Development Environments'
    ]
  },
  {
    title: 'Computer Science Foundations',
    skills: [
      'Data Structures & Algorithms',
      'Object-Oriented Design Principles',
      'Time & Space Complexity Analysis',
      'Database Management Systems (DBMS)',
      'Operating Systems Fundamentals'
    ]
  }
]

export const defaultExperiences: WorkExperience[] = [
  {
    id: 'exp-1',
    role: 'Undergraduate Software Developer & Project Creator',
    company: 'Independent Engineering & Campus Projects',
    location: 'KL University, India',
    period: '2024 – Present',
    current: true,
    type: 'Academic & Projects',
    summary:
      'Designing and engineering real-world software applications and campus utility platforms for students.',
    achievements: [
      'Architected and published VSS75 (Virtual Student Space), creating a collaborative academic knowledge repository for KL University students.',
      'Engineered KL ERP Buddy, streamlining daily timetable viewing and implementing an automated attendance bunk safety calculator.',
      'Developed Notely, a structured student marketplace platform facilitating peer-to-peer study material and note preparation services.',
      'Built a production-grade 3D interactive portfolio deployed on Vercel with automated GitHub CI/CD.'
    ],
    techStack: ['TypeScript', 'JavaScript', 'React', 'Tailwind CSS', 'Vite', 'Three.js', 'Git']
  },
  {
    id: 'exp-2',
    role: 'Computer Science & Engineering Undergrad',
    company: 'KL University (KLEF)',
    location: 'India',
    period: '2024 – 2028 (Expected)',
    current: true,
    type: 'Degree Program',
    summary:
      'Pursuing B.Tech in Computer Science & Engineering with an emphasis on Java, Data Structures, Algorithms, and Software Engineering.',
    achievements: [
      'Mastered core Java fundamentals, object-oriented programming paradigms, and algorithmic problem-solving.',
      'Active algorithmic practice on LeetCode with 22 problems solved, sharpening data structure foundations.',
      'Collaborating actively on open-source repositories and participating in campus technical initiatives.'
    ],
    techStack: ['Java', 'Data Structures', 'Algorithms', 'SQL', 'Git']
  }
]

export const defaultCertifications: Certification[] = [
  {
    id: 'cert-1',
    title: 'Java Course: Mastering the Fundamentals',
    issuer: 'Scaler Topics (Scaler Academy)',
    issueDate: 'Sep 24, 2026',
    credentialId: 'Guntur Lohith Varma — Certificate of Excellence',
    credentialUrl: '/scaler_java_certificate.png',
    badgeColor: 'amber',
    skills: [
      'Java Programming',
      'Object-Oriented Programming (OOP)',
      '86 Video Tutorials',
      '12 Course Modules',
      '9 Coding Challenges'
    ]
  },
  {
    id: 'cert-2',
    title: 'Algorithmic Problem Solving (Java)',
    issuer: 'LeetCode Platform',
    issueDate: '2026',
    credentialId: 'Handle: @_CodeMaster_1',
    credentialUrl: 'https://leetcode.com/u/_CodeMaster_1/',
    badgeColor: 'emerald',
    skills: ['Arrays & Strings', 'Hashing', 'Two Pointers', 'Recursion', 'Time Complexity Analysis']
  },
  {
    id: 'cert-3',
    title: 'Modern Web Engineering & Full-Stack Development',
    issuer: 'Self-Directed Engineering Curriculum',
    issueDate: '2025 – 2026',
    credentialUrl: 'https://github.com/lohithvarma2208-tech',
    badgeColor: 'cyan',
    skills: ['TypeScript', 'React 19', 'Tailwind CSS', 'Vite', 'Three.js 3D WebGL', 'Supabase PostgreSQL']
  }
]

export const defaultOpenSource: OpenSourceContribution[] = [
  {
    id: 'oss-1',
    repo: 'lohithvarma2208-tech / VSS75',
    repoUrl: 'https://github.com/lohithvarma2208-tech/VSS75',
    title: 'VSS75: Virtual Student Space Academic Knowledge Network',
    type: 'Core Creator',
    description:
      'Created an open-source campus knowledge repository transforming ephemeral class notes into a discoverable academic repository for KL University students.',
    impact: 'Provides an organized, permanent study repository for coursework across semesters.',
    techStack: ['TypeScript', 'React', 'Tailwind CSS', 'Vite']
  },
  {
    id: 'oss-2',
    repo: 'lohithvarma2208-tech / kl-erp-buddy',
    repoUrl: 'https://github.com/lohithvarma2208-tech/kl-erp-buddy',
    title: 'KL ERP Buddy: Automated Student Attendance & Timetable Dashboard',
    type: 'Core Creator',
    description:
      'Developed a student academic utility featuring an automated bunk safety calculator and schedule viewer directly connected to student portals.',
    impact: 'Empowers students to track and maintain safe 75%+ attendance margins accurately.',
    techStack: ['JavaScript', 'HTML5', 'CSS3', 'Local Storage']
  },
  {
    id: 'oss-3',
    repo: 'lohithvarma2208-tech / Notely',
    repoUrl: 'https://github.com/lohithvarma2208-tech/Notely',
    title: 'Notely: Student Academic Note-Writing Marketplace',
    type: 'Core Creator',
    description:
      'Architected a peer-to-peer student marketplace platform enabling custom note preparation and study collaboration.',
    impact: 'Structures academic preparation requests into an organized bidding and delivery exchange.',
    techStack: ['TypeScript', 'React', 'Tailwind CSS', 'State Management']
  },
  {
    id: 'oss-4',
    repo: 'lohithvarma2208-tech / lohith-v-portfolio',
    repoUrl: 'https://github.com/lohithvarma2208-tech/lohith-v-portfolio',
    title: 'Lohith.V: 3D Interactive WebGL Universe & Portfolio',
    type: 'Core Creator',
    description:
      'Created a production-ready personal digital space featuring Three.js 3D graphics, live LeetCode telemetry, and Supabase integration.',
    impact: 'Open-source reference for modern high-performance portfolio engineering.',
    techStack: ['React 19', 'TypeScript', 'Three.js', 'Vite', 'Tailwind CSS']
  }
]

export const defaultHonors: HonorAward[] = [
  {
    id: 'honor-1',
    title: 'Certificate of Excellence — Java Fundamentals',
    issuer: 'Scaler Topics (Co-founder Anshuman Singh)',
    date: 'September 2026',
    rank: 'Course Distinction',
    metric: '86 Video Tutorials • 12 Modules • 9 Challenges Completed',
    description:
      'Awarded Certificate of Excellence in recognition of completing the comprehensive Java Course: Mastering the Fundamentals.',
    badge: 'Certification Honor',
    link: '/scaler_java_certificate.png'
  },
  {
    id: 'honor-2',
    title: 'LeetCode Algorithm Solver',
    issuer: 'LeetCode Platform',
    date: '2026',
    rank: '#4,439,419 Global Rank',
    metric: '22 Solved (21 Easy, 1 Medium) • Rating 1450',
    description:
      'Consistent timed algorithmic problem-solving practice in Java covering fundamental data structures and logic.',
    badge: 'Algorithm Solver',
    link: 'https://leetcode.com/u/_CodeMaster_1/'
  },
  {
    id: 'honor-3',
    title: 'Academic & Campus Tooling Creator',
    issuer: 'KL University Student Community',
    date: '2026',
    rank: 'Active Project Builder',
    metric: 'Built VSS75 & KL ERP Buddy',
    description:
      'Engineered student-centric tools serving academic needs, attendance calculation, and study resource sharing.',
    badge: 'Campus Innovation',
    link: 'https://github.com/lohithvarma2208-tech'
  }
]
