import type { PhilosophyPrinciple } from '../types'

export const philosophyData: PhilosophyPrinciple[] = [
  {
    number: '01',
    title: 'First Principles Over Superficial Dogma',
    thesis: 'Do not just memorize APIs—understand the underlying physical and theoretical constraints.',
    description: 'Frameworks and tooling libraries are ephemeral; the physics of computation, memory hierarchies, network packet latencies, and algorithmic complexities are enduring invariants. By understanding the machine at the lowest necessary layer, one solves problems that surface-level developers consider unsolvable.',
    quote: 'Knowledge compounds best when anchored to invariants rather than ephemeral trends.'
  },
  {
    number: '02',
    title: 'Extreme Craftsmanship & The 16ms Rule',
    thesis: 'Software is tactile. A product should feel immediate, deliberate, and respectful of human attention.',
    description: 'Whether it is a zero-latency terminal keystroke, a 60 FPS compositor frame budget, or a 1-pixel border that subtly reflects light on hover, micro-details define the distinction between software that merely works and software that inspires trust and delight.',
    quote: 'Details are not details; they make the product.'
  },
  {
    number: '03',
    title: 'Build Deliberately, Ship Continuously',
    thesis: 'Theory without implementation is sterile; code without architecture is chaotic.',
    description: 'The truest test of understanding is the ability to build a system from scratch. Writing a custom LSM tree, an event broker, or an in-browser operating system simulator transforms theoretical concepts into instinctual engineering intuition.',
    quote: 'Learning relentlessly. Building deliberately. Evolving continuously.'
  },
  {
    number: '04',
    title: 'Quiet Confidence Through Verifiable Excellence',
    thesis: 'Let the quality of the engineering, the elegance of the interface, and the rigor of the thought speak.',
    description: 'True technical authority does not require boastful proclamation. It reveals itself quietly through clean commits, rigorous benchmarks, well-reasoned trade-offs, and an authentic humility in the face of complex problems.',
    quote: 'Great engineering speaks with precision, not volume.'
  }
]
