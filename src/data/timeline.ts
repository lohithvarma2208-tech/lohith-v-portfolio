import type { TimelineItem } from '../types'

export const timelineData: TimelineItem[] = [
  {
    id: 'undergrad-cs',
    year: '2024 — Present',
    period: 'Current Academic Focus',
    title: 'Bachelor of Technology in Computer Science & Engineering',
    organization: 'KL University (KLEF)',
    type: 'education',
    description:
      'Pursuing computer science degree with focus on Java, Data Structures & Algorithms, Object-Oriented Software Design, and Web Technologies.',
    achievements: [
      'Core Coursework: Java Programming, Data Structures & Algorithms, Database Systems, Computer Networks, Software Engineering',
      'Completed Scaler Topics Certificate of Excellence: Java Course - Mastering the Fundamentals (86 tutorials, 12 modules, 9 challenges)',
      'Actively solving algorithmic challenges on LeetCode (@_CodeMaster_1) to strengthen core computer science problem-solving'
    ],
    status: 'current'
  },
  {
    id: 'campus-tooling-2026',
    year: '2026',
    period: 'Active Engineering Arc',
    title: 'Campus Utilities & Student Productivity Platforms',
    organization: 'Independent Open-Source Projects',
    type: 'engineering',
    description:
      'Created VSS75 (Virtual Student Space) and KL ERP Buddy to solve everyday student academic workflow challenges.',
    achievements: [
      'Built VSS75: Collaborative academic resource-sharing network transforming ephemeral notes into a discoverable repository for KL University students',
      'Engineered KL ERP Buddy: Automated attendance tracking with smart bunk safety calculators (>= 75% threshold) and timetable scheduling',
      'Designed Notely: Structured marketplace prototype for student study material preparation and peer collaboration'
    ],
    status: 'current'
  },
  {
    id: 'web-universe-2026',
    year: '2026',
    period: 'Interactive Systems Development',
    title: 'Interactive 3D WebGL Portfolio & Live Telemetry',
    organization: 'Personal Production Space',
    type: 'milestone',
    description:
      'Built a 3D personal universe featuring real-time LeetCode and GitHub telemetry, interactive Three.js developer avatar, and cloud database integrations.',
    achievements: [
      'Engineered responsive 3D WebGL cyber developer avatar with cursor-tracking mechanics',
      'Built automated live sync engine fetching public LeetCode and GitHub stats dynamically',
      'Integrated vendor code splitting achieving an ultralight 188 kB entry bundle, deployed to Vercel global edge CDN'
    ],
    status: 'completed'
  },
  {
    id: 'future-trajectory',
    year: '2026 — 2027',
    period: 'Forward Horizon',
    title: 'Software Engineering Internships & Roles',
    organization: 'Seeking High-Impact Opportunities',
    type: 'research',
    description:
      'Actively preparing for 2027 Software Engineering internships to contribute to production web platforms, systems software, and modern cloud applications.',
    achievements: [
      'Targeting Summer/Fall 2027 Software Engineering & Developer roles',
      'Continuously expanding real-world full-stack and student utility projects on GitHub',
      'Deepening algorithmic problem solving and scalable architecture skills'
    ],
    status: 'future'
  }
]
