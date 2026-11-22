import type { TimelineItem } from '../types'

export const timelineData: TimelineItem[] = [
  {
    id: 'undergrad-cs',
    year: '2024 — Present',
    period: 'Current Academic Focus',
    title: 'Bachelor of Technology in Computer Science & Engineering',
    organization: 'Undergraduate Program',
    type: 'education',
    description: 'Pursuing comprehensive computer science foundation with deliberate focus on low-level systems, concurrency, theoretical algorithms, and scalable network architectures.',
    achievements: [
      'Core Coursework: Operating Systems, Computer Organization & Architecture, Data Structures & Algorithms, Database Systems, Computer Networks, Theory of Computation',
      'Consistently maintains high academic standing while actively shipping real-world open-source systems software',
      'Led technical workshops on systems programming, Git internals, and modern full-stack web architecture for junior peers'
    ],
    status: 'current'
  },
  {
    id: 'systems-builder-2026',
    year: '2026',
    period: 'Active Engineering Arc',
    title: 'Distributed Systems & Agentic Memory Research',
    organization: 'Independent Lab & Open Source',
    type: 'engineering',
    description: 'Spearheaded development of NexusFlow (distributed broker with Raft consensus) and AetherOS (virtualized browser microkernel runtime).',
    achievements: [
      'Implemented zero-copy ring buffers and Raft consensus in Rust, handling 140k+ messages/second in synthetic benchmarks',
      'Designed sandboxed WebAssembly execution pipelines using Web Workers and SharedArrayBuffer memory bridges',
      'Authoring technical essays dissecting storage engine mechanics and latency optimization'
    ],
    status: 'current'
  },
  {
    id: 'foundations-2025',
    year: '2025',
    period: 'Deep Technical Grounding',
    title: 'Storage Engines & Graphics Synthesizers',
    organization: 'Personal Engineering Projects & Hackathons',
    type: 'milestone',
    description: 'Dedicated 12 months to understanding storage hierarchies, writing an LSM-tree key-value store in C++20, and experimenting with WebGL2 shader pipelines.',
    achievements: [
      'Completed HyperionDB with custom SkipList MemTable and CRC32-checked Write-Ahead Logging',
      'Engineered SpectralDSP: GPU audio visualizer processing real-time FFT audio spectrums via GLSL fragment shaders',
      'Top finalist in collegiate competitive hackathons building real-time collaboration platforms'
    ],
    status: 'completed'
  },
  {
    id: 'future-trajectory',
    year: '2026 — 2027',
    period: 'Forward Horizon',
    title: 'Software Engineering Internships & Core Infrastructure',
    organization: 'Seeking High-Impact Roles',
    type: 'research',
    description: 'Actively preparing for high-impact SWE internships at engineering-driven organizations building distributed infrastructure, AI developer platforms, or core cloud systems.',
    achievements: [
      'Targeting Summer/Fall 2027 Software Engineering & Systems roles',
      'Evolving open-source contributions to major distributed database and runtime ecosystems',
      'Deepening practical knowledge in Linux kernel tracing, eBPF, and high-concurrency network protocols'
    ],
    status: 'future'
  }
]
