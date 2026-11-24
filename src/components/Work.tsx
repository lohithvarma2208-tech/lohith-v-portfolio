import "./styles/Work.css";
import WorkImage from "./WorkImage";
import { MdArrowOutward } from "react-icons/md";

interface ProjectItem {
  id: string;
  name: string;
  category: string;
  tools: string;
  link: string;
  image: string;
}

const projects: ProjectItem[] = [
  {
    id: "01",
    name: "VSS 75",
    category: "Academic Space & Community",
    tools: "TypeScript, React, Tailwind CSS, Full-Stack Architecture",
    link: "https://github.com/lohithvarma2208-tech/vss-75",
    image: "/images/vss75.jpg",
  },
  {
    id: "02",
    name: "AI & ML LABS",
    category: "Intelligent Systems & Neural Models",
    tools: "Python, Machine Learning, Agentic Web Dev, Data Intelligence",
    link: "https://github.com/lohithvarma2208-tech",
    image: "/images/aiml-labs.jpg",
  },
  {
    id: "03",
    name: "ALGORITHMIC PRACTICE",
    category: "Data Structures & Complex Systems",
    tools: "Java, Python, High-Efficiency Algorithms",
    link: "https://github.com/lohithvarma2208-tech",
    image: "/images/algo-practice.jpg",
  },
];

const Work = () => {
  return (
    <div className="work-section" id="work">
      <div className="work-container section-container">
        <h2>
          Featured <span>Work</span>
        </h2>
        <div className="work-flex">
          {projects.map((project) => (
            <div className="work-box" key={project.id}>
              <div className="work-info">
                <div className="work-title">
                  <h3>{project.id}</h3>
                  <div>
                    <h4>{project.name}</h4>
                    <p>{project.category}</p>
                  </div>
                </div>
                <h4>Tools & Architecture</h4>
                <p>{project.tools}</p>
                <div style={{ marginTop: "16px" }}>
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-cursor="disable"
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "6px",
                      color: "var(--accentColor)",
                      fontSize: "14px",
                      letterSpacing: "1px",
                      textTransform: "uppercase",
                      textDecoration: "none",
                      fontWeight: 500,
                    }}
                  >
                    View Project <MdArrowOutward />
                  </a>
                </div>
              </div>
              <WorkImage
                image={project.image}
                alt={project.name}
                link={project.link}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Work;
