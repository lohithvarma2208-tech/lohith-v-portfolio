import React from "react";
import { FaPython, FaJava, FaReact, FaGitAlt } from "react-icons/fa6";
import { SiTypescript } from "react-icons/si";
import { TbRobot } from "react-icons/tb";
import "./styles/TechStack.css";

interface SkillPill {
  name: string;
  tag: string;
  icon: React.ReactNode;
  color: string;
  glow: string;
}

const skills: SkillPill[] = [
  {
    name: "Python",
    tag: "AI / ML",
    icon: <FaPython />,
    color: "#4584b6",
    glow: "rgba(69, 132, 182, 0.35)",
  },
  {
    name: "Agentic Web Dev",
    tag: "Autonomous",
    icon: <TbRobot />,
    color: "#c084fc",
    glow: "rgba(192, 132, 252, 0.4)",
  },
  {
    name: "Java",
    tag: "Core CS",
    icon: <FaJava />,
    color: "#f89820",
    glow: "rgba(248, 152, 32, 0.35)",
  },
  {
    name: "React & Next.js",
    tag: "Frontend",
    icon: <FaReact />,
    color: "#61dafb",
    glow: "rgba(97, 218, 251, 0.35)",
  },
  {
    name: "Git & GitHub",
    tag: "DevOps",
    icon: <FaGitAlt />,
    color: "#f1502f",
    glow: "rgba(241, 80, 47, 0.35)",
  },
  {
    name: "TypeScript",
    tag: "Type-Safe",
    icon: <SiTypescript />,
    color: "#3178c6",
    glow: "rgba(49, 120, 198, 0.35)",
  },
];

const TechStack = () => {
  return (
    <div className="tech-strip-section section-container" id="tech-stack">
      <div className="tech-strip-header">
        <h2>
          Technical <span>Arsenal</span>
        </h2>
        <p className="tech-strip-subtitle">
          Core stack powering my AI &amp; web builds.
        </p>
      </div>

      <div className="tech-pill-strip">
        {skills.map((skill) => (
          <div
            key={skill.name}
            className="tech-pill-item"
            style={{
              ["--pill-color" as string]: skill.color,
              ["--pill-glow" as string]: skill.glow,
            }}
          >
            <span className="tech-pill-icon" style={{ color: skill.color }}>
              {skill.icon}
            </span>
            <div className="tech-pill-text">
              <span className="tech-pill-name">{skill.name}</span>
              <span className="tech-pill-tag">{skill.tag}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TechStack;
