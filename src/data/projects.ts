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
  }
]
