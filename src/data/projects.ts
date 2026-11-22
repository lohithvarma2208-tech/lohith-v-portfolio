import type { Project } from '../types'

export const projectsData: Project[] = [
  {
    id: 'nexus-flow',
    title: 'NexusFlow',
    subtitle: 'High-Throughput Distributed Event Streaming & Memory Architecture',
    category: 'Distributed Systems',
    description: 'A distributed message broker and temporal memory substrate designed for autonomous multi-agent pipelines. Implements zero-copy ring buffers and Raft consensus for deterministic event ordering.',
    architectureOverview: 'Architected with a custom ring-buffer transport layer over TCP using epoll/kqueue event multiplexing. Implemented partitioned write-ahead logs (WAL) with mmap page cache integration, achieving sub-millisecond end-to-end fanout across 32 concurrent broker partitions.',
    metrics: [
      { label: 'Throughput', value: '142,000 msg/sec' },
      { label: 'p99 Latency', value: '< 2.4 ms' },
      { label: 'Partition Count', value: '32 Shards' },
      { label: 'Zero-Copy Buffer', value: '100% Ring Cache' }
    ],
    techStack: ['Rust', 'Tokio', 'Raft Consensus', 'Zero-Copy mmap', 'gRPC / Protobuf', 'Prometheus'],
    keyFeatures: [
      'Zero-allocation ring buffer eliminating GC spikes during high ingress surges',
      'Pluggable Raft consensus cluster with automated leader election in <150ms',
      'Dual-tier indexing: in-memory sparse index with secondary disk-backed offsets',
      'Native backpressure propagation preventing downstream agent starvation'
    ],
    challengesSolved: 'Tackled kernel context-switch overhead during massive concurrent client fanouts by migrating from standard socket blocking I/O to vectorized io_uring batch submits with memory-pinned ring buffers.',
    systemDiagramText: `
+------------------+      +-------------------+      +------------------+
| Client Publisher | ---> | Ingress Demux TCP | ---> | Lock-Free Ring   |
+------------------+      +-------------------+      +--------+---------+
                                                              |
                                                     [ Raft Consensus ]
                                                              |
                                     +------------------------v-----------------------+
                                     | Partitioned Write-Ahead Log (WAL via mmap)      |
                                     +------------------------+-----------------------+
                                                              |
                                     +------------------------v-----------------------+
                                     | Egress Fanout Engine (Zero-Copy Sendfile)      |
                                     +------------------------------------------------+
    `,
    githubUrl: 'https://github.com/lohithvarma2208-tech/nexus-flow',
    demoUrl: 'https://nexusflow.dev',
    year: '2026',
    featured: true
  },
  {
    id: 'hyperion-lsm',
    title: 'HyperionDB',
    subtitle: 'High-Performance Log-Structured Merge Tree Key-Value Engine',
    category: 'Low-Level Storage',
    description: 'An embedded key-value storage engine engineered from scratch with a lock-free SkipList MemTable, Write-Ahead Logging (WAL) with CRC32 integrity validation, and size-tiered SSTable compaction.',
    architectureOverview: 'Designed around first principles of storage hierarchy. Writes land append-only in sequential WAL before insertion into an concurrent SkipList MemTable. Once threshold is hit, immutable MemTables flush to Level-0 SSTables with block-level Bloom filters for O(1) negative lookups.',
    metrics: [
      { label: 'Write Amplification', value: '1.42x' },
      { label: 'SST Bloom Efficiency', value: '99.4% filter' },
      { label: 'Sequential Ingestion', value: '280 MB/sec' },
      { label: 'Crash Recovery', value: '< 400 ms' }
    ],
    techStack: ['C++20', 'Atomic Memory Models', 'Bloom Filters', 'Linux AIO', 'Google Benchmark', 'CMake'],
    keyFeatures: [
      'Concurrent lock-free SkipList MemTable utilizing atomic compare-and-swap (CAS)',
      'CRC32 checksummed binary WAL format resilient to partial crash writes',
      'Size-tiered background compaction thread pool minimizing write stalls',
      'Multi-level Block Cache with two-queue (2Q) eviction algorithm'
    ],
    challengesSolved: 'Resolved compaction tail latency spikes by implementing dynamic rate-limiting write credits: writes throttle smoothly during heavy background merge phases rather than stalling abruptly.',
    systemDiagramText: `
  [ Put(k, v) ]
        |
   +----+--------------------------+
   |                               |
   v                               v
[ Append WAL (sync/async) ]  [ MemTable: SkipList ]
                                   | (Threshold Hit)
                             [ Immutable MemTable ]
                                   | (Background Worker)
                             +-----v-------------------+
                             | SSTable Level 0         |
                             | [Index | Bloom | Blocks]|
                             +-----+-------------------+
                                   | (Compaction)
                             +-----v-------------------+
                             | SSTable Level 1..N      |
                             +-------------------------+
    `,
    githubUrl: 'https://github.com/lohithvarma2208-tech/hyperion-lsm',
    year: '2025',
    featured: true
  },
  {
    id: 'aether-os',
    title: 'AetherOS',
    subtitle: 'Microkernel-Inspired Web Desktop & WebAssembly Virtual Machine',
    category: 'Developer Tooling',
    description: 'A futuristic browser-based operating system runtime simulating virtual memory paging, cooperative thread scheduling, a hierarchical VFS filesystem, and sandboxed WebAssembly application execution.',
    architectureOverview: 'Constructed an in-browser operating system kernel that treats Web Workers as preemptible hardware cores. Features an indexedDB-backed virtual file system with POSIX-like syscall abstractions (`open`, `read`, `write`, `fork`), and a hardware-accelerated compositor.',
    metrics: [
      { label: 'Boot Time', value: '< 180 ms' },
      { label: 'Frame Budget', value: 'Locked 60 FPS' },
      { label: 'Memory Footprint', value: '14.8 MB Idle' },
      { label: 'Syscall Latency', value: '< 0.08 ms' }
    ],
    techStack: ['TypeScript', 'WebAssembly / Rust', 'Web Workers', 'SharedArrayBuffer', 'Canvas / WebGL', 'IndexedDB'],
    keyFeatures: [
      'Custom window compositor supporting blur transparency and spatial window tiling',
      'POSIX-compliant Virtual File System (VFS) with journaling and directory trees',
      'Sandboxed WASM runtime executing compiled C/Rust binaries in isolated browser threads',
      'Integrated text editor, system monitor, and VT100-compatible shell terminal'
    ],
    challengesSolved: 'Engineered lockless inter-thread communication between the UI render loop and background worker kernel using `SharedArrayBuffer` and `Atomics` memory fences.',
    systemDiagramText: `
[ Browser UI Compositor (60 FPS) ] <--- SharedArrayBuffer ---> [ Kernel Worker Core ]
                |                                                      |
    [ Spatial Window Manager ]                                 [ Process Scheduler ]
                |                                                      |
        [ Window Canvas ]                                  +-----------+-----------+
                                                           |                       |
                                                   [ WASM Sandbox ]         [ POSIX VFS ]
    `,
    githubUrl: 'https://github.com/lohithvarma2208-tech/aether-os',
    demoUrl: 'https://aether-os.internal',
    year: '2026',
    featured: true
  },
  {
    id: 'spectral-dsp',
    title: 'SpectralDSP',
    subtitle: 'Real-Time Audio-Reactive Shader Synthesizer & Waveform Engine',
    category: 'Graphics & WebGL',
    description: 'An interactive mathematical graphics synthesis sandbox. Combines Web Audio DSP fast-Fourier transforms (FFT) with custom GLSL fragment shaders to visualize harmonic audio frequencies in real-time.',
    architectureOverview: 'Pipelines 2048-point audio FFT frequency spectrums directly into WebGL2 floating-point textures. Fragment shaders compute raymarched signed distance fields (SDF) and volumetric bloom entirely on the GPU at 120 FPS.',
    metrics: [
      { label: 'FFT Resolution', value: '2048 Bands' },
      { label: 'Shader Render Rate', value: '120 FPS V-Sync' },
      { label: 'DSP Latency', value: '< 12 ms buffer' },
      { label: 'GPU Utilization', value: '< 8% on discrete' }
    ],
    techStack: ['WebGL2', 'GLSL Shaders', 'Web Audio API', 'TypeScript', 'Raymarching / SDFs', 'DSP FFT'],
    keyFeatures: [
      'Volumetric raymarched fractal geometry modulated by real-time bass/treble harmonics',
      'Dual-pass Bloom and chromatic aberration post-processing pipeline',
      'Zero-latency procedural sound synthesizer generates harmonic chord scales',
      'Real-time GLSL live-reloader with instantaneous shader error diagnostic overlays'
    ],
    challengesSolved: 'Eliminated CPU-to-GPU data transmission bottlenecks by packing audio frequency histograms into a single dynamic 1D texture strip updated via `texSubImage2D`.',
    systemDiagramText: `
[ Audio Input / Mic / Oscillator ]
               |
    [ Web Audio AnalyserNode (FFT 2048) ]
               | (Normalized Frequency Histogram)
   [ 1D Floating-Point Texture Binding ]
               |
  +------------v--------------------------+
  | WebGL2 Vertex / Fragment Pipeline     |
  | - Raymarching Signed Distance Fields  |
  | - Volumetric Light & Chromatic Shift  |
  +------------+--------------------------+
               |
      [ Display 120 FPS ]
    `,
    githubUrl: 'https://github.com/lohithvarma2208-tech/spectral-dsp',
    demoUrl: 'https://spectral.lab',
    year: '2025',
    featured: false
  },
  {
    id: 'sentience-ai',
    title: 'Sentience Core',
    subtitle: 'Deterministic Tool-Orchestration & Episodic Memory Agent Engine',
    category: 'AI & Memory',
    description: 'A local-first autonomous agent architecture decoupling planning, tool invocation, and long-term memory retrieval using deterministic state machines and hierarchical vector clustering.',
    architectureOverview: 'Replaces hallucination-prone loose prompting loops with strict finite state machine (FSM) contracts. Incorporates an episodic memory store with HNSW vector indexing and cosine similarity reranking for lightning-fast semantic retrieval.',
    metrics: [
      { label: 'Tool Success Rate', value: '98.7%' },
      { label: 'Context Compression', value: '4.2x ratio' },
      { label: 'Semantic Lookup', value: '< 18 ms' },
      { label: 'State Transitions', value: '100% Deterministic' }
    ],
    techStack: ['Python', 'Rust Bindings', 'HNSW Vector Index', 'FastAPI', 'Structured Outputs', 'Docker'],
    keyFeatures: [
      'Deterministic JSON Schema tool validator enforcing strict type adherence',
      'Hierarchical episodic memory clustering summarizing old conversation turns',
      'Pluggable LLM provider abstraction with automatic fallbacks and rate-limit backoff',
      'Streaming token observability dashboard tracking token economics in real-time'
    ],
    challengesSolved: 'Tackled context-window bloat by engineering an incremental semantic summarizer that compresses conversational history into hierarchical knowledge graphs.',
    systemDiagramText: `
[ User Goal ] ---> [ FSM Orchestrator ] <---> [ Tool Registry & Schema Guard ]
                           |
            +--------------+--------------+
            |                             |
  [ HNSW Episodic Memory ]       [ LLM Inference Engine ]
  (Semantic Knowledge Graph)     (Streaming Tokens)
    `,
    githubUrl: 'https://github.com/lohithvarma2208-tech/sentience-core',
    year: '2026',
    featured: false
  }
]
