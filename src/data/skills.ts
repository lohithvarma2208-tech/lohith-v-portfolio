import type { SkillGroup } from '../types'

export const skillsData: SkillGroup[] = [
  {
    category: 'Core Languages & Systems',
    iconName: 'Cpu',
    description: 'Object-oriented programming, systems fundamentals, memory management, and algorithmic problem solving.',
    skills: [
      { name: 'Java', level: 92, note: 'Scaler Topics Certified, OOP, Collections Framework, Multithreading, Algorithms', badge: 'Certified' },
      { name: 'TypeScript / JS', level: 90, note: 'Strict typing, modern ESNext, async programming, browser APIs', badge: 'Fluent' },
      { name: 'C / C++', level: 80, note: 'Pointers, memory management, data structures, performance optimization', badge: 'Core' },
      { name: 'Python', level: 82, note: 'Scripting, backend logic, data processing, automation', badge: 'Proficient' },
      { name: 'SQL', level: 85, note: 'Relational schema design, queries, joins, indexing, PostgreSQL', badge: 'Proficient' }
    ]
  },
  {
    category: 'Modern Web, Graphics & Frontend',
    iconName: 'Monitor',
    description: 'Crafting responsive user interfaces, interactive 3D WebGL scenes, and reactive state architectures.',
    skills: [
      { name: 'React 19 & Vite', level: 92, note: 'Functional components, hooks, concurrent rendering, modular state', badge: 'Primary' },
      { name: 'Three.js & WebGL', level: 82, note: '3D scene graph, mesh rendering, lighting, materials, camera controls' },
      { name: 'Tailwind CSS', level: 95, note: 'Design systems, responsive layouts, modern glassmorphism, micro-animations' },
      { name: 'HTML5 & Modern CSS', level: 94, note: 'Semantic structure, Flexbox/Grid, CSS variables, accessibility' },
      { name: 'Web Audio API', level: 78, note: 'Sound synthesis, interactive UI audio feedback, oscillator nodes' }
    ]
  },
  {
    category: 'Backend, Database & Cloud Hosting',
    iconName: 'Server',
    description: 'Database schemas, authentication, API integrations, and cloud continuous deployment pipelines.',
    skills: [
      { name: 'Supabase & PostgreSQL', level: 88, note: 'Relational data modeling, Row-Level Security (RLS), real-time subscriptions' },
      { name: 'RESTful APIs', level: 90, note: 'HTTP methods, JSON payloads, error handling, third-party integrations' },
      { name: 'Vercel Edge & Render', level: 88, note: 'Serverless deployment, custom build configurations, zero-downtime rollouts' },
      { name: 'Git & GitHub CI/CD', level: 92, note: 'Branching models, automated build pipelines, semantic versioning' },
      { name: 'Docker Fundamentals', level: 78, note: 'Containerization, reproducible runtime environments, multi-stage builds' }
    ]
  },
  {
    category: 'Computer Science Foundations & Tools',
    iconName: 'Brain',
    description: 'Algorithmic efficiency, campus software development, and modern development toolchains.',
    skills: [
      { name: 'Data Structures & Algorithms', level: 85, note: 'LeetCode practice (_CodeMaster_1), time & space complexity analysis' },
      { name: 'Object-Oriented Design', level: 90, note: 'SOLID principles, modular architecture, reusable design patterns' },
      { name: 'Operating Systems & Linux', level: 80, note: 'Process lifecycle, memory hierarchy, shell scripting, terminal navigation' },
      { name: 'Campus Utility Architecture', level: 92, note: 'Real-world problem solving: VSS75 academic portal & KL ERP Buddy' }
    ]
  }
]
