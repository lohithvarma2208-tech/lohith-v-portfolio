import type { Essay } from '../types'

export const essaysData: Essay[] = [
  {
    id: 'lsm-tree-architecture',
    title: 'On Building Storage Engines: What Writing an LSM Tree Taught Me About Disks and Memory',
    subtitle: 'From random I/O penalties to sequential append guarantees: A deep dive into modern storage mechanics.',
    readTime: '7 min read',
    date: 'February 2026',
    tags: ['Systems', 'Storage Engines', 'C++', 'Data Structures'],
    excerpt: 'When you first learn about databases in university, B-Trees reign supreme. But the moment write throughput dominates read latency in distributed environments, the Log-Structured Merge Tree turns traditional storage assumptions upside down.',
    content: [
      'When you first learn about databases in an academic curriculum, B-Trees reign supreme. They are elegant, self-balancing, and minimize disk seeks for point queries. However, the physical reality of hardware—whether spinning magnetic platters or NVMe SSD flash memory—harshly penalizes random in-place updates.',
      'Deep diving into storage engine architectures and LSM tree implementations forced me to confront the physical nature of write amplification. In an in-place update engine like a standard B+ Tree, modifying a single 32-byte key-value pair necessitates rewriting an entire 4KB or 16KB page to disk. If that page is randomly located, you encounter the bottleneck that has plagued systems engineers for forty years.',
      'The LSM Tree resolves this with an audacious philosophical shift: never modify existing data in place. All mutations—inserts, updates, and deletes (represented as tombstones)—are appended sequentially to a Write-Ahead Log (WAL) and inserted into an in-memory sorted buffer (the MemTable).',
      'By deferring sorting and deduplication to asynchronous background compaction passes, write operations become purely sequential. On modern NVMe drives, sequential writes easily exceed 2,000 MB/s, whereas random small-block syncs struggle to reach a fraction of that figure.',
      'The real engineering hurdle is not the write path—it is compaction orchestration. If your compaction threads cannot keep pace with ingress traffic, Level-0 SSTables accumulate, point read latencies degrade exponentially, and the database suffers write stalls. Designing rate-limited write credits and tuning Bloom filter bit-densities taught me that software engineering is ultimately the art of navigating mechanical trade-offs.'
    ]
  },
  {
    id: 'autonomous-agent-memory',
    title: 'The Architecture of Autonomous Memory: How LLMs Think Across Time',
    subtitle: 'Beyond simple prompt chaining: State machines, hierarchical episodic vectors, and working context.',
    readTime: '6 min read',
    date: 'January 2026',
    tags: ['AI Agents', 'Distributed Systems', 'Vector Search', 'Architecture'],
    excerpt: 'Most early AI agent demos treat the LLM as an oracle wrapped in a while loop. Real production software requires deterministic state guarantees, structured memory hierarchies, and bounded context economics.',
    content: [
      'The biggest myth in modern AI engineering is that prompt engineering is enough. When you examine brittle agent architectures that stall or loop infinitely, the culprit is almost always the lack of state discipline.',
      'In traditional operating systems, a thread possesses a stack, a heap, registers, and a program counter. When we design an autonomous agent, what is the equivalent substrate? We cannot simply shove thousands of conversational turns into a monolithic prompt window without hitting quadratic attention computation costs and cognitive degradation.',
      'In autonomous agent system design, I decouple memory into three distinct tiers: (1) Working Context: the immediate scratchpad of the active task; (2) Episodic Memory: an HNSW vector index storing past task trajectories and outcomes; and (3) Semantic Knowledge Graph: structured entities and relationships updated deterministically.',
      'By placing a strict Finite State Machine (FSM) around the model, the language model is no longer deciding execution control flow. It merely determines parameter values within bounded, verifiable transitions. The outcome is software that behaves like an enterprise-grade compiler rather than a roulette wheel.'
    ]
  },
  {
    id: '60fps-frontend-craft',
    title: 'The Anatomy of 60 FPS: Rendering Pipelines, Garbage Collection, and Frame Budgets',
    subtitle: 'Why micro-interactions and performance optimization define the frontier of software craftsmanship.',
    readTime: '5 min read',
    date: 'November 2025',
    tags: ['Frontend', 'WebGL', 'Performance', 'Design Engineering'],
    excerpt: 'A 60 frames-per-second interaction budget grants exactly 16.6 milliseconds per frame. At 120 FPS, that budget shrinks to 8.3 milliseconds. What happens inside the browser during those fleeting milliseconds?',
    content: [
      'There is a palpable distinction between a website that works and an interface that feels alive. When you interact with tools like Linear, Apple, or Raycast, your nervous system perceives a fluid immediacy that feels almost physical.',
      'That sensation is not magic; it is rigorous mechanical sympathy with the browser rendering pipeline. Every frame involves JavaScript execution, style calculation, layout reflow, paint rasterization, and composite layer updates on the GPU.',
      'The most frequent culprit behind micro-stutters is unexpected garbage collection pauses. When React components recreate transient closures, objects, or arrays on every mouse movement tick, memory allocation churns through the V8 young generation space, triggering stop-the-world scavenge collections.',
      'By leveraging hardware-accelerated CSS transforms, decoupled requestAnimationFrame render loops, and offloading heavy vector computations to Web Workers and WebGL shaders, you preserve that sacred 16.6ms budget. True craftsmanship in frontend engineering means respecting the user’s senses through uncompromising speed.'
    ]
  },
  {
    id: 'first-principles-engineering',
    title: 'First-Principles Engineering: Why Understanding the Metal Makes You a Better Architect',
    subtitle: 'From cache lines and page faults to cloud microservices: The enduring value of systems fundamentals.',
    readTime: '6 min read',
    date: 'October 2025',
    tags: ['Philosophy', 'Systems', 'Computer Science', 'Career'],
    excerpt: 'In an era where frameworks and high-level abstractions change every six months, mastering computer architecture, operating system fundamentals, and networking protocols is the ultimate compound interest.',
    content: [
      'As a computer science student, it is easy to become overwhelmed by the rapid churn of libraries, frameworks, and deployment paradigms. Every week presents a new buzzword or tool promising to revolutionize development.',
      'Early in my journey, I decided to anchor my attention to invariants rather than ephemeral trends. The physics of computation do not change every six months. A CPU still fetches instructions from L1/L2/L3 cache lines; memory addresses still translate through the TLB and page tables; TCP packets still experience congestion windows and round-trip delays.',
      'When you understand why a cache miss costs 200 CPU cycles while an L1 hit takes 4 cycles, you write better code in TypeScript, Python, or Go—even without writing assembly. You begin to anticipate how memory is laid out, why sequential array traversals beat scattered pointer trees, and where latency actually hides.',
      'Mastering the foundations does not make you old-fashioned; it makes you fearless. When a production system crashes or an unknown bottleneck manifests at 3 AM, abstractions peel away, and all that remains is the machine.'
    ]
  }
]
