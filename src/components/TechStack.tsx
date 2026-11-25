import React, { useState } from "react";
import { FaPython, FaJava, FaReact, FaGitAlt } from "react-icons/fa6";
import { SiTypescript } from "react-icons/si";
import { TbRobot, TbActivity, TbCpu } from "react-icons/tb";
import "./styles/TechStack.css";

interface SkillNode {
  id: string;
  name: string;
  category: string;
  icon: React.ReactNode;
  level: string;
  description: string;
  color: string;
  glow: string;
  tags: string[];
  x: number; // percentage 0-100
  y: number; // percentage 0-100
  connections: string[];
}

const skills: SkillNode[] = [
  {
    id: "python",
    name: "Python",
    category: "AI / ML Core",
    icon: <FaPython />,
    level: "Core Stack",
    description: "Machine learning models, neural nets & data pipelines.",
    color: "#4584b6",
    glow: "rgba(69, 132, 182, 0.55)",
    tags: ["ML", "Neural Nets", "NumPy"],
    x: 24,
    y: 22,
    connections: ["core", "agentic", "java"],
  },
  {
    id: "agentic",
    name: "Agentic Web Dev",
    category: "Autonomous Systems",
    icon: <TbRobot />,
    level: "Specialization",
    description: "Autonomous agent loops, tool calling & LLM workflows.",
    color: "#c084fc",
    glow: "rgba(192, 132, 252, 0.6)",
    tags: ["Agentic AI", "Tool Calling", "Workflows"],
    x: 74,
    y: 22,
    connections: ["core", "python", "react"],
  },
  {
    id: "java",
    name: "Java",
    category: "Core CS",
    icon: <FaJava />,
    level: "Foundation",
    description: "OOP, data structures & algorithmic problem solving.",
    color: "#f89820",
    glow: "rgba(248, 152, 32, 0.55)",
    tags: ["OOP", "DSA", "Algorithms"],
    x: 15,
    y: 55,
    connections: ["core", "python", "git"],
  },
  {
    id: "react",
    name: "React & Next.js",
    category: "Frontend",
    icon: <FaReact />,
    level: "Full-Stack",
    description: "Responsive, component-driven full-stack interfaces.",
    color: "#61dafb",
    glow: "rgba(97, 218, 251, 0.55)",
    tags: ["React", "Next.js", "Tailwind"],
    x: 85,
    y: 55,
    connections: ["core", "agentic", "typescript"],
  },
  {
    id: "git",
    name: "Git & GitHub",
    category: "DevOps",
    icon: <FaGitAlt />,
    level: "Workflow",
    description: "Version control, branching & CI/CD workflows.",
    color: "#f1502f",
    glow: "rgba(241, 80, 47, 0.55)",
    tags: ["Git", "CI/CD", "Open Source"],
    x: 28,
    y: 84,
    connections: ["core", "java", "typescript"],
  },
  {
    id: "typescript",
    name: "TypeScript",
    category: "Type Safety",
    icon: <SiTypescript />,
    level: "Architecture",
    description: "Type-safe architectures & clean API contracts.",
    color: "#3178c6",
    glow: "rgba(49, 120, 198, 0.55)",
    tags: ["Types", "Interfaces", "Clean Code"],
    x: 72,
    y: 84,
    connections: ["core", "react", "git"],
  },
];

const CORE_POS = { x: 50, y: 52 };

const TechStack = () => {
  const [activeId, setActiveId] = useState<string>("python");
  const activeSkill = skills.find((s) => s.id === activeId) || skills[0];

  // Build unique edges for SVG
  const edges: { id: string; x1: number; y1: number; x2: number; y2: number; linked: boolean; color: string }[] = [];
  const seen = new Set<string>();

  skills.forEach((node) => {
    node.connections.forEach((targetId) => {
      const key = [node.id, targetId].sort().join("-");
      if (seen.has(key)) return;
      seen.add(key);

      const target =
        targetId === "core"
          ? CORE_POS
          : skills.find((s) => s.id === targetId) || CORE_POS;
      const isLinked =
        node.id === activeId || targetId === activeId;

      edges.push({
        id: key,
        x1: node.x,
        y1: node.y,
        x2: target.x,
        y2: target.y,
        linked: isLinked,
        color: isLinked ? activeSkill.color : "rgba(196, 129, 255, 0.2)",
      });
    });
  });

  return (
    <div className="tech-bento-section section-container" id="tech-stack">
      <div className="tech-bento-header">
        <div className="tech-bento-badge">
          <TbActivity className="badge-pulse-icon" />
          <span>NEURAL CONSTELLATION MATRIX</span>
        </div>
        <h2>
          Technical <span>Arsenal</span>
        </h2>
        <p className="tech-bento-subtitle">
          Hover or tap any neural node to inspect my core stack.
        </p>
      </div>

      <div className="neural-constellation-layout">
        {/* Interactive Neural Graph */}
        <div className="neural-graph-stage">
          <div className="neural-grid-bg"></div>

          <svg
            className="neural-svg-layer"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
          >
            {edges.map((edge) => (
              <g key={edge.id}>
                <line
                  x1={edge.x1}
                  y1={edge.y1}
                  x2={edge.x2}
                  y2={edge.y2}
                  stroke={edge.color}
                  strokeWidth={edge.linked ? "0.55" : "0.28"}
                  strokeDasharray={edge.linked ? "none" : "1.5 1.5"}
                  className={edge.linked ? "neural-line-active" : "neural-line-idle"}
                />
                {edge.linked && (
                  <circle r="0.7" fill={activeSkill.color} className="neural-pulse-dot">
                    <animateMotion
                      dur="2.2s"
                      repeatCount="indefinite"
                      path={`M ${edge.x1} ${edge.y1} L ${edge.x2} ${edge.y2}`}
                    />
                  </circle>
                )}
              </g>
            ))}
          </svg>

          {/* Central AI Core Hub */}
          <div
            className="neural-core-hub"
            style={{
              left: `${CORE_POS.x}%`,
              top: `${CORE_POS.y}%`,
              borderColor: activeSkill.color,
              boxShadow: `0 0 28px ${activeSkill.glow}`,
            }}
          >
            <TbCpu className="neural-core-icon" style={{ color: activeSkill.color }} />
            <span className="neural-core-label">GLV CORE</span>
          </div>

          {/* Interactive Skill Nodes */}
          {skills.map((skill) => {
            const isSelected = skill.id === activeId;
            const isConnected = activeSkill.connections.includes(skill.id);

            return (
              <button
                key={skill.id}
                type="button"
                className={`neural-node ${isSelected ? "is-selected" : ""} ${
                  isConnected ? "is-connected" : ""
                }`}
                style={{
                  left: `${skill.x}%`,
                  top: `${skill.y}%`,
                  ["--node-color" as string]: skill.color,
                  ["--node-glow" as string]: skill.glow,
                }}
                onMouseEnter={() => setActiveId(skill.id)}
                onClick={() => setActiveId(skill.id)}
                data-cursor="disable"
              >
                <span className="neural-node-ring"></span>
                <span className="neural-node-icon" style={{ color: skill.color }}>
                  {skill.icon}
                </span>
                <span className="neural-node-name">{skill.name}</span>
              </button>
            );
          })}
        </div>

        {/* Sleek Node Inspector HUD */}
        <div
          className="neural-inspector-card"
          style={{
            ["--node-color" as string]: activeSkill.color,
            ["--node-glow" as string]: activeSkill.glow,
          }}
        >
          <div className="inspector-top">
            <div className="inspector-icon" style={{ color: activeSkill.color }}>
              {activeSkill.icon}
            </div>
            <div className="inspector-meta">
              <span className="inspector-cat">{activeSkill.category}</span>
              <span className="inspector-level">{activeSkill.level}</span>
            </div>
          </div>

          <h3 className="inspector-title">{activeSkill.name}</h3>
          <p className="inspector-desc">{activeSkill.description}</p>

          <div className="inspector-tags">
            {activeSkill.tags.map((tag) => (
              <span key={tag} className="inspector-tag">
                {tag}
              </span>
            ))}
          </div>

          <div className="inspector-links">
            <span className="inspector-links-label">SYNAPSE LINKS</span>
            <div className="inspector-link-chips">
              {activeSkill.connections
                .filter((id) => id !== "core")
                .map((connId) => {
                  const target = skills.find((s) => s.id === connId);
                  if (!target) return null;
                  return (
                    <button
                      key={connId}
                      type="button"
                      className="inspector-link-chip"
                      onClick={() => setActiveId(target.id)}
                      data-cursor="disable"
                    >
                      {target.name}
                    </button>
                  );
                })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TechStack;
