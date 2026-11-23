import type {
  WorkExperience,
  Certification,
  OpenSourceContribution,
  HonorAward,
  SkillCategory
} from '../types'

export const defaultSkillCategories: SkillCategory[] = [
  {
    title: 'Systems & Low-Level Programming',
    skills: [
      'C++20 (Move Semantics, RAII)',
      'Rust (Async Tokio, Ownership)',
      'Linux Kernel Syscalls',
      'POSIX & epoll / kqueue',
      'Lock-Free Atomics',
      'Zero-Copy mmap / Ring Buffers',
      'io_uring'
    ]
  },
  {
    title: 'Distributed Systems & Storage Backbones',
    skills: [
      'LSM-Trees (SSTable, Memtable, Compaction)',
      'Raft Consensus Protocol',
      'Write-Ahead Logging (WAL)',
      'Redis & In-Memory Architectures',
      'Apache Kafka (Partitions, Offsets)',
      'gRPC & Protocol Buffers',
      'PostgreSQL (ACID, Query Optimization)'
    ]
  },
  {
    title: 'Backend Runtimes & Languages',
    skills: [
      'Go (Goroutines, Channels)',
      'Python (Asyncio, NumPy, Scripting)',
      'TypeScript / Node.js',
      'WebAssembly (WASM)',
      'REST & Event-Driven APIs',
      'Database Schema Migration'
    ]
  },
  {
    title: 'Modern Web & GPU Graphics',
    skills: [
      'React 19 & Next.js',
      'Three.js & WebGL2',
      'GLSL Shaders & Raymarching',
      'Tailwind CSS & Design Systems',
      'HTML5 Canvas & Web Audio API'
    ]
  },
  {
    title: 'Cloud Infrastructure & DevOps',
    skills: [
      'Docker & Containerization',
      'Kubernetes Basics & Pods',
      'Linux Administration & Bash',
      'GitHub Actions (CI/CD Pipelines)',
      'Prometheus & Grafana Metrics',
      'Nginx Reverse Proxy'
    ]
  },
  {
    title: 'Core CS Foundations & Algorithms',
    skills: [
      'Advanced Data Structures (SkipLists, Bloom Filters)',
      'Graph Algorithms & Dynamic Programming',
      'Operating System Concurrency & Memory Paging',
      'Computer Networks (TCP/IP, Congestion Control)',
      'System Design & Microservices Architecture'
    ]
  }
]

export const defaultExperiences: WorkExperience[] = [
  {
    id: 'exp-1',
    role: 'Systems Software Engineering Intern',
    company: 'Distributed Systems & Cloud Infrastructure Lab',
    location: 'Bengaluru, India',
    period: 'Jun 2025 – Present',
    current: true,
    type: 'Internship',
    summary:
      'Engineered high-throughput caching proxies and low-latency storage subsystems handling distributed state synchronization.',
    achievements: [
      'Designed and deployed an in-memory ring-buffer queue in Go and C++, reducing p99 tail latency from 18ms to 4.2ms under peak 85k req/s load.',
      'Implemented zero-copy serialization mechanisms using Protocol Buffers and custom binary framing over TCP sockets.',
      'Built automated chaos engineering tests to simulate network partitions and leader failovers across a multi-node cluster.'
    ],
    techStack: ['Go', 'C++20', 'Redis', 'Kafka', 'Docker', 'Linux epoll', 'gRPC']
  },
  {
    id: 'exp-2',
    role: 'Undergraduate Systems Researcher',
    company: 'Department of Computer Science & Engineering',
    location: 'Bengaluru, India',
    period: 'Jan 2025 – May 2025',
    current: false,
    type: 'Research',
    summary:
      'Conducted comparative performance benchmarks on Log-Structured Merge (LSM) storage engines versus B+ Tree indexing under heavy write workloads.',
    achievements: [
      'Authored a custom compaction simulator in C++ evaluating tiered vs leveled compaction strategies to measure write amplification factors (WAF).',
      'Integrated SIMD-accelerated Bloom filters, cutting false positive disk reads during range queries by 34%.',
      'Presented technical findings and memory telemetry profiles to department faculty and fellow systems builders.'
    ],
    techStack: ['C++20', 'Linux Perf', 'Valgrind', 'SIMD Intrinsics', 'CMake']
  },
  {
    id: 'exp-3',
    role: 'Open-Source Systems Developer & Fellow',
    company: 'Independent Engineering & Systems Community',
    location: 'Remote',
    period: 'Aug 2024 – Dec 2024',
    current: false,
    type: 'Fellowship',
    summary:
      'Contributed core memory management utilities and benchmarking suites across open-source systems libraries.',
    achievements: [
      'Contributed asynchronous buffer recycling modules and lock-free queue primitives to community developer tools.',
      'Refactored legacy network parsing loops to leverage non-blocking epoll event polling, doubling sustained client throughput.',
      'Maintained 100% test coverage with automated unit, integration, and fuzz testing suites via GitHub Actions.'
    ],
    techStack: ['Rust', 'Tokio', 'Linux', 'GitHub Actions', 'Benchmarking']
  }
]

export const defaultCertifications: Certification[] = [
  {
    id: 'cert-1',
    title: 'AWS Certified Solutions Architect – Associate',
    issuer: 'Amazon Web Services (AWS)',
    issueDate: '2025',
    expiryDate: '2028',
    credentialId: 'AWS-SAA-8492041',
    credentialUrl: 'https://aws.amazon.com/verification',
    badgeColor: 'amber',
    skills: ['AWS VPC', 'EC2', 'S3', 'IAM', 'DynamoDB', 'High Availability Architecture']
  },
  {
    id: 'cert-2',
    title: 'Meta Back-End Developer Professional Certificate',
    issuer: 'Meta (via Coursera)',
    issueDate: '2025',
    credentialId: 'META-BE-719382',
    credentialUrl: 'https://www.coursera.org/verify/professional-cert',
    badgeColor: 'blue',
    skills: ['Python', 'Django', 'REST APIs', 'PostgreSQL', 'Containerization', 'CI/CD']
  },
  {
    id: 'cert-3',
    title: 'Google Cloud Computing Foundations',
    issuer: 'Google Cloud Skills Boost',
    issueDate: '2024',
    credentialId: 'GCCF-9302148',
    credentialUrl: 'https://www.cloudskillsboost.google',
    badgeColor: 'cyan',
    skills: ['Google Cloud Compute', 'BigQuery', 'Cloud Storage', 'Kubernetes Engine']
  },
  {
    id: 'cert-4',
    title: 'Linux Foundation Certified System Administrator (LFCS) Curriculum',
    issuer: 'The Linux Foundation',
    issueDate: '2024',
    credentialId: 'LFCS-PREP-55201',
    credentialUrl: 'https://training.linuxfoundation.org',
    badgeColor: 'emerald',
    skills: ['Linux Kernel', 'POSIX Shell', 'Systemd Services', 'Storage & LVM', 'Networking']
  },
  {
    id: 'cert-5',
    title: 'DeepLearning.AI Machine Learning Specialization',
    issuer: 'DeepLearning.AI & Stanford Online',
    issueDate: '2024',
    credentialId: 'DLAI-ML-448201',
    credentialUrl: 'https://www.coursera.org/verify/specialization',
    badgeColor: 'violet',
    skills: ['Supervised Learning', 'Neural Networks', 'Vector Search', 'Model Evaluation']
  }
]

export const defaultOpenSource: OpenSourceContribution[] = [
  {
    id: 'oss-1',
    repo: 'apex-lsm / key-value-engine',
    repoUrl: 'https://github.com/lohithvarma2208-tech',
    title: 'ApexLSM: Production-Grade LSM-Tree Storage Engine in C++20',
    type: 'Core Architecture',
    description:
      'Engineered an open-source log-structured merge key-value engine featuring write-ahead logging (WAL), memory tables with SkipLists, and multi-level background compaction.',
    impact: 'Benchmarked 220,000+ writes/sec with zero corruption under abrupt power-kill recovery tests.',
    stars: '140+ Stars',
    techStack: ['C++20', 'Linux mmap', 'CRC32 Checksums', 'Multi-Threading', 'Catch2']
  },
  {
    id: 'oss-2',
    repo: 'raft-consensus / core-cluster',
    repoUrl: 'https://github.com/lohithvarma2208-tech',
    title: 'RaftCore: Distributed Consensus State Machine in Go',
    type: 'Core Architecture',
    description:
      'Implemented full Raft consensus specification including leader election randomized timers, log replication heartbeats, snapshotting, and dynamic membership changes.',
    impact: 'Successfully passed Jepsen-style automated network partition tests without dirty reads.',
    stars: '95+ Stars',
    techStack: ['Go', 'gRPC', 'Protobuf', 'Distributed Systems', 'Chaos Testing']
  },
  {
    id: 'oss-3',
    repo: 'tokio-rs / ecosystem-contributions',
    repoUrl: 'https://github.com/tokio-rs',
    prUrl: 'https://github.com/lohithvarma2208-tech',
    prNumber: '#PR-284',
    title: 'Async TCP Connection Pooler Buffer Allocation Optimization',
    type: 'Pull Request',
    description:
      'Refactored async socket read buffer allocations to avoid reallocations on sustained high-frequency payloads.',
    impact: 'Reduced allocations in hot polling loops by 18% in microbenchmarks.',
    techStack: ['Rust', 'Tokio', 'Async/Await', 'Memory Profiling']
  },
  {
    id: 'oss-4',
    repo: 'three.js / webgl-pipeline-utils',
    repoUrl: 'https://github.com/mrdoob/three.js',
    prUrl: 'https://github.com/lohithvarma2208-tech',
    prNumber: '#PR-119',
    title: 'GLSL Shader Material Resource Disposal & FBO Memory Cleanup Patch',
    type: 'Pull Request',
    description:
      'Identified and patched a WebGL context leak when dynamically destroying and rebuilding custom multi-pass render targets.',
    impact: 'Merged into community graphics utility packages; resolved recurring GPU VRAM growth in SPA navigations.',
    techStack: ['WebGL', 'GLSL', 'JavaScript', 'GPU Profiling']
  }
]

export const defaultHonors: HonorAward[] = [
  {
    id: 'honor-1',
    title: 'LeetCode Knight (Top 5% Global)',
    issuer: 'LeetCode Platform',
    date: '2025',
    rank: 'Rating 1940+',
    metric: '650+ Problems Solved',
    description:
      'Demonstrated algorithmic mastery across Graphs, Dynamic Programming, Segment Trees, and Concurrency in C++ & Python.',
    badge: 'Competitive Programming',
    link: 'https://leetcode.com/u/_CodeMaster_1/'
  },
  {
    id: 'honor-2',
    title: 'National Level Hackathon Finalist',
    issuer: 'Smart Systems & Distributed Cloud Track',
    date: '2024',
    rank: 'Top 10 Teams Nationally',
    metric: 'Selected from 1200+ Entries',
    description:
      'Architected a decentralized edge sensor telemetry aggregator capable of sub-second offline-first data synchronization.',
    badge: 'Hackathon Podium',
    link: 'https://github.com/lohithvarma2208-tech'
  },
  {
    id: 'honor-3',
    title: 'Academic Excellence & Merit Scholarship',
    issuer: 'Department of Computer Science & Engineering',
    date: '2023 – 2025',
    rank: 'Top 5% Cohort',
    metric: 'CGPA 9.2 / 10.0',
    description:
      'Awarded merit commendation for exceptional performance in Operating Systems, Database Management Systems, and Computer Networks.',
    badge: 'Academic Distinction'
  },
  {
    id: 'honor-4',
    title: 'Codeforces Specialist (Rating 1480+)',
    issuer: 'Codeforces Round Div. 2 / Div. 3',
    date: '2024',
    rank: 'Specialist Rank',
    metric: '100+ Contests Completed',
    description:
      'Consistent timed problem-solving under strict memory and time limits, specializing in number theory and combinatorics.',
    badge: 'Competitive Programming',
    link: 'https://codeforces.com'
  }
]
