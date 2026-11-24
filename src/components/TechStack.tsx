import React, { useState, useRef } from "react";
import { FaPython, FaJava, FaReact, FaGitAlt } from "react-icons/fa6";
import { SiTypescript } from "react-icons/si";
import { TbRobot, TbCpu, TbActivity, TbAtom } from "react-icons/tb";
import "./styles/TechStack.css";

interface SkillCard {
  name: string;
  category: string;
  icon: React.ReactNode;
  level: string;
  description: string;
  color: string;
  glow: string;
  tags: string[];
}

const skills: SkillCard[] = [
  {
    name: "Python",
    category: "AI / ML Core Engine",
    icon: <FaPython />,
    level: "Core Competency",
    description: "Primary engineering language for machine learning algorithms, deep neural architectures, and intelligent data systems.",
    color: "#4584b6",
    glow: "rgba(69, 132, 182, 0.4)",
    tags: ["Machine Learning", "Neural Nets", "Data Science", "NumPy"],
  },
  {
    name: "Agentic Web Dev",
    category: "Autonomous Systems",
    icon: <TbRobot />,
    level: "Advanced Specialization",
    description: "Architecting autonomous agent workflows, LLM orchestration, structured tool execution, and reactive intelligent web loops.",
    color: "#c084fc",
    glow: "rgba(192, 132, 252, 0.45)",
    tags: ["Agentic AI", "Tool Calling", "Workflows", "Automation"],
  },
  {
    name: "Java",
    category: "Software Foundations",
    icon: <FaJava />,
    level: "Strong Foundation",
    description: "Robust object-oriented programming, computational complexity mastery, advanced data structures, and algorithmic rigor.",
    color: "#f89820",
    glow: "rgba(248, 152, 32, 0.4)",
    tags: ["OOP", "Data Structures", "Algorithms", "System Design"],
  },
  {
    name: "React & Next.js",
    category: "Modern UI Engineering",
    icon: <FaReact />,
    level: "Full-Stack Web",
    description: "Modern component-driven web architectures, state synchronization, server-side rendering, and responsive UI design.",
    color: "#61dafb",
    glow: "rgba(97, 218, 251, 0.4)",
    tags: ["React 19", "Next.js", "TypeScript", "Tailwind CSS"],
  },
  {
    name: "Git & GitHub",
    category: "DevOps & Collaboration",
    icon: <FaGitAlt />,
    level: "Daily Workflow",
    description: "Structured source control, branch orchestration, version management, and continuous CI/CD deployment pipelines.",
    color: "#f1502f",
    glow: "rgba(241, 80, 47, 0.4)",
    tags: ["Version Control", "CI/CD", "Open Source", "Workflow"],
  },
  {
    name: "TypeScript",
    category: "Type-Safe Systems",
    icon: <SiTypescript />,
    level: "Architecture",
    description: "Type-safe robust application development, compile-time error prevention, and clean interface contracts.",
    color: "#3178c6",
    glow: "rgba(49, 120, 198, 0.4)",
    tags: ["Type Safety", "Interfaces", "Clean Architecture"],
  },
];

const TechStack = () => {
  const [activeCard, setActiveCard] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = ((y - centerY) / centerY) * -10;
    const rotateY = ((x - centerX) / centerX) * 10;

    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(12px)`;
    card.style.setProperty("--mouse-x", `${x}px`);
    card.style.setProperty("--mouse-y", `${y}px`);
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    card.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)";
  };

  return (
    <div className="tech-bento-section section-container" id="tech-stack">
      <div className="tech-bento-header">
        <div className="tech-bento-badge">
          <TbActivity className="badge-pulse-icon" />
          <span>CYBERPUNK HOLOGRAPHIC MATRIX</span>
        </div>
        <h2>
          Technical <span>Arsenal</span>
        </h2>
        <p className="tech-bento-subtitle">
          Core technologies, neural architectures, and software engineering tools powering my development.
        </p>
      </div>

      <div className="tech-bento-grid" ref={containerRef}>
        {skills.map((skill, index) => (
          <div
            key={skill.name}
            className={`tech-glass-card ${activeCard === index ? "card-active" : ""}`}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onClick={() => setActiveCard(activeCard === index ? null : index)}
            style={{
              ["--card-color" as string]: skill.color,
              ["--card-glow" as string]: skill.glow,
            }}
          >
            <div className="card-border-glow"></div>
            <div className="card-ambient-flare"></div>
            <div className="card-inner">
              <div className="card-top-row">
                <div className="skill-icon-wrapper" style={{ color: skill.color }}>
                  {skill.icon}
                </div>
                <div className="skill-meta">
                  <span className="skill-cat">{skill.category}</span>
                  <span className="skill-status-dot"></span>
                </div>
              </div>

              <div className="skill-info-block">
                <h3 className="skill-title">{skill.name}</h3>
                <span className="skill-level-pill">{skill.level}</span>
                <p className="skill-desc">{skill.description}</p>
              </div>

              <div className="skill-tag-row">
                {skill.tags.map((tag) => (
                  <span key={tag} className="skill-tag">
                    {tag}
                  </span>
                ))}
              </div>

              <div className="card-hologram-grid"></div>
            </div>
          </div>
        ))}
      </div>

      <div className="tech-hud-footer">
        <div className="hud-metric">
          <TbCpu className="hud-icon" />
          <span>ARCHITECTURE: AI & SCALABLE SYSTEMS</span>
        </div>
        <div className="hud-metric">
          <TbAtom className="hud-icon" />
          <span>STATUS: ALL RUNTIMES OPTIMAL</span>
        </div>
      </div>
    </div>
  );
};

export default TechStack;
