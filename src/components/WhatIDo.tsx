import "./styles/WhatIDo.css";

interface Discipline {
  num: string;
  title: string;
  description: string;
  skills: string[];
}

const disciplines: Discipline[] = [
  {
    num: "01",
    title: "AI & Machine Learning",
    description:
      "Developing intelligent models, neural architectures, and data-driven Python solutions.",
    skills: ["Python", "Machine Learning", "Deep Learning", "Data Intelligence"],
  },
  {
    num: "02",
    title: "Full-Stack Development",
    description:
      "Building responsive web applications and agentic systems with clean architecture.",
    skills: ["React & Next.js", "Agentic Web Dev", "TypeScript", "Tailwind CSS", "Git"],
  },
];

const WhatIDo = () => {
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
        <div className="what-minimal-list">
          {disciplines.map((item) => (
            <div className="what-minimal-row" key={item.num}>
              <span className="what-minimal-num">{item.num}</span>
              <div className="what-minimal-body">
                <h3>{item.title}</h3>
                <p>{item.description}</p>
                <div className="what-minimal-skills">
                  {item.skills.map((skill) => (
                    <span className="what-minimal-pill" key={skill}>
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WhatIDo;
