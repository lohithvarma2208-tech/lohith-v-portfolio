import "./styles/Work.css";
import WorkImage from "./WorkImage";
import { MdArrowOutward } from "react-icons/md";

interface ProjectItem {
  id: string;
  name: string;
  category: string;
  tools: string[];
  link: string;
  image: string;
}

const projects: ProjectItem[] = [
  {
    id: "01",
    name: "VSS 75",
    category: "Academic Space & Community",
    tools: ["TypeScript", "React", "Tailwind CSS"],
    link: "https://github.com/lohithvarma2208-tech/vss-75",
    image: "/images/vss75.jpg",
  },
  {
    id: "02",
    name: "Algorithmic Practice",
    category: "Data Structures & Systems",
    tools: ["Java", "Python", "Algorithms"],
    link: "https://github.com/lohithvarma2208-tech",
    image: "/images/algo-practice.jpg",
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
            Selected builds across AI, full-stack web, and core algorithms.
          </p>
        </div>

        <div className="work-grid">
          {projects.map((project) => (
            <a
              key={project.id}
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="work-card"
              data-cursor="disable"
            >
              <div className="work-card-media">
                <WorkImage image={project.image} alt={project.name} />
                <span className="work-card-arrow" aria-hidden="true">
                  <MdArrowOutward />
                </span>
              </div>

              <div className="work-card-body">
                <div className="work-card-meta">
                  <span className="work-card-num">{project.id}</span>
                  <span className="work-card-cat">{project.category}</span>
                </div>
                <h3 className="work-card-title">{project.name}</h3>
                <div className="work-card-tags">
                  {project.tools.map((tool) => (
                    <span className="work-card-tag" key={tool}>
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Work;
