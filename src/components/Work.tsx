import "./styles/Work.css";
import { MdArrowOutward } from "react-icons/md";

interface ProjectItem {
  id: string;
  name: string;
  category: string;
  description: string;
  tools: string[];
  link: string;
}

const projects: ProjectItem[] = [
  {
    id: "01",
    name: "VSS 75",
    category: "Academic Space & Community",
    description:
      "Collaborative academic platform built with clean modular architecture and responsive UI.",
    tools: ["TypeScript", "React", "Tailwind CSS"],
    link: "https://github.com/lohithvarma2208-tech/vss-75",
  },
  {
    id: "02",
    name: "Algorithmic Practice",
    category: "Data Structures & Systems",
    description:
      "Structured problem-solving repository covering core algorithms, complexity, and system patterns.",
    tools: ["Java", "Python", "Algorithms"],
    link: "https://github.com/lohithvarma2208-tech",
  },
];

const Work = () => {
  return (
    <div className="work-section" id="work">
      <div className="work-container section-container">
        <div className="work-header">
          <h2>
            Featured <span>Work</span>
          </h2>
          <p className="work-subtitle">
            Selected builds across full-stack web and core algorithms.
          </p>
        </div>

        <div className="work-minimal-list">
          {projects.map((project) => (
            <a
              key={project.id}
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="work-minimal-row"
              data-cursor="disable"
            >
              <span className="work-minimal-num">{project.id}</span>

              <div className="work-minimal-main">
                <div className="work-minimal-top">
                  <h3>{project.name}</h3>
                  <span className="work-minimal-cat">{project.category}</span>
                </div>
                <p className="work-minimal-desc">{project.description}</p>
                <div className="work-minimal-tags">
                  {project.tools.map((tool) => (
                    <span className="work-minimal-tag" key={tool}>
                      {tool}
                    </span>
                  ))}
                </div>
              </div>

              <span className="work-minimal-arrow" aria-hidden="true">
                <MdArrowOutward />
              </span>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Work;
