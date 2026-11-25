import { useState } from "react";
import "./styles/WhatIDo.css";

interface Discipline {
  id: string;
  num: string;
  tabLabel: string;
  title: string;
  subtitle: string;
  description: string;
  tags: string[];
}

const disciplines: Discipline[] = [
  {
    id: "ai-ml",
    num: "01",
    tabLabel: "AI & Machine Learning",
    title: "AI & MACHINE LEARNING",
    subtitle: "Focus & Architecture",
    description:
      "Developing intelligent models, neural network architectures, and data-driven solutions with Python and modern ML algorithms to solve complex real-world problems.",
    tags: [
      "Python",
      "Machine Learning",
      "Deep Learning",
      "Data Intelligence",
      "Algorithmic Problem Solving",
    ],
  },
  {
    id: "full-stack",
    num: "02",
    tabLabel: "Full-Stack Development",
    title: "FULL-STACK DEVELOPMENT",
    subtitle: "Modern Web Engineering",
    description:
      "Building responsive, high-performance web applications and agentic systems with clean state management, modular component architecture, and seamless user experiences.",
    tags: [
      "React & Next.js",
      "Agentic Web Dev",
      "TypeScript",
      "Tailwind CSS",
      "Git & GitHub",
    ],
  },
];

const WhatIDo = () => {
  const [activeTab, setActiveTab] = useState<string>("ai-ml");
  const current = disciplines.find((d) => d.id === activeTab) || disciplines[0];

  return (
    <div className="whatIDO" id="what-i-do">
      <div className="what-box">
        <h2 className="title">
          W<span className="hat-h2">HAT</span>
          <div>
            I<span className="do-h2"> DO</span>
          </div>
        </h2>
      </div>

      <div className="what-box">
        <div className="what-tab-wrapper">
          <div className="what-tab-bar" role="tablist" aria-label="Disciplines">
            {disciplines.map((item) => {
              const isActive = item.id === activeTab;
              return (
                <button
                  key={item.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  className={`what-tab-btn ${isActive ? "is-active" : ""}`}
                  onClick={() => setActiveTab(item.id)}
                  data-cursor="disable"
                >
                  <span className="what-tab-num">{item.num}</span>
                  <span>{item.tabLabel}</span>
                </button>
              );
            })}
          </div>

          <div className="what-tab-panel" key={current.id}>
            <span className="what-panel-sub">{current.subtitle}</span>
            <h3>{current.title}</h3>
            <p>{current.description}</p>
            <h5>Skillset &amp; tools</h5>
            <div className="what-content-flex">
              {current.tags.map((tag) => (
                <div className="what-tags" key={tag}>
                  {tag}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhatIDo;
