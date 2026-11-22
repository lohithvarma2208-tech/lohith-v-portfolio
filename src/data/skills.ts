import type { SkillGroup } from '../types'

export const skillsData: SkillGroup[] = [
  {
    category: 'Core Systems & Languages',
    iconName: 'Cpu',
    description: 'High-performance computing, memory safety, and systems programming from bare-metal to high-level concurrency.',
    skills: [
      { name: 'C / C++20', level: 88, note: 'Memory layout, RAII, move semantics, multithreading & atomic primitives', badge: 'Core' },
      { name: 'Rust', level: 85, note: 'Async Tokio, fearless concurrency, ownership semantics, zero-cost abstractions', badge: 'Active' },
      { name: 'TypeScript / JS', level: 94, note: 'Strict typing, AST manipulation, event-loop internals, high-perf DOM', badge: 'Fluent' },
      { name: 'Python', level: 90, note: 'Systems scripting, DSP pipelines, PyTorch fundamentals, async IO', badge: 'Fluent' },
      { name: 'Go', level: 82, note: 'Goroutines, channels, microservices, gRPC interfaces', badge: 'Proficient' }
    ]
  },
  {
    category: 'Distributed Systems & Infrastructure',
    iconName: 'Server',
    description: 'Building resilient, fault-tolerant networks, storage backbones, and low-latency message streaming protocols.',
    skills: [
      { name: 'Distributed Consensus', level: 84, note: 'Raft protocol, leader election, split-brain mitigation, replication logs' },
      { name: 'Storage & LSM Trees', level: 86, note: 'SkipLists, write-ahead logging (WAL), SSTable compaction, Bloom filters' },
      { name: 'Docker & Linux Internals', level: 88, note: 'Namespaces, cgroups, epoll/kqueue, POSIX syscalls, systemd' },
      { name: 'Redis & Caching Strategy', level: 90, note: 'In-memory data structures, pub/sub, Lua scripting, eviction policies' },
      { name: 'Kafka / Event Streaming', level: 82, note: 'Partitioning semantics, consumer groups, offset tracking, exactly-once delivery' },
      { name: 'PostgreSQL & Database Design', level: 89, note: 'ACID guarantees, B-tree indexes, EXPLAIN ANALYZE query planning' }
    ]
  },
  {
    category: 'Modern Web, Graphics & Architecture',
    iconName: 'Monitor',
    description: 'Crafting fluid 60/120 FPS user interfaces, GPU shader pipelines, and production web applications.',
    skills: [
      { name: 'React 19 & Next.js', level: 95, note: 'Server components, concurrent rendering, memoization architectures', badge: 'Mastery' },
      { name: 'WebGL2 & GLSL Shaders', level: 78, note: 'Fragment/vertex pipelines, raymarching, framebuffer objects (FBO)' },
      { name: 'Tailwind CSS & Design Systems', level: 96, note: 'Custom tokens, responsive micro-layouts, glassmorphism, fluid type' },
      { name: 'Web Audio API & DSP', level: 82, note: 'Synthesizer graphs, AnalyserNode FFT, oscillator modulation, zero-latency DSP' },
      { name: 'WebAssembly (WASM)', level: 80, note: 'Compiling Rust/C to browser binaries, SharedArrayBuffer memory bridges' }
    ]
  },
  {
    category: 'AI Architectures & Applied Intelligence',
    iconName: 'Brain',
    description: 'Autonomous agent design, deterministic tool-calling runtimes, and local vector retrieval pipelines.',
    skills: [
      { name: 'Autonomous Agent Frameworks', level: 88, note: 'Finite state machine (FSM) control loops, schema validation, tool sandboxes' },
      { name: 'Vector Databases & HNSW', level: 85, note: 'High-dimensional embeddings, semantic retrieval, cosine reranking' },
      { name: 'Prompt & Context Engineering', level: 92, note: 'Few-shot structured outputs, context window compaction, tool routing' },
      { name: 'LLM Observability & Benchmarks', level: 86, note: 'Latency profiling, token economics, evaluation harnesses' }
    ]
  }
]
