import "./styles/Career.css";

const Career = () => {
  return (
    <div className="career-section section-container" id="career">
      <div className="career-container">
        <h2>
          Education <span>&</span>
          <br /> Journey
        </h2>
        <div className="career-info">
          <div className="career-timeline">
            <div className="career-dot"></div>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>B.Tech in Computer Science & Engineering</h4>
                <h5>KL University</h5>
              </div>
              <h3>2026 - 2030</h3>
            </div>
            <p>
              Pursuing computer science foundations with specialization in Artificial Intelligence, Machine Learning architectures, and scalable software systems.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>AI / ML & Full-Stack Development</h4>
                <h5>Independent Engineering</h5>
              </div>
              <h3>PRESENT</h3>
            </div>
            <p>
              Building real-world applications, exploring agentic workflows, and actively developing intelligent platforms such as VSS 75.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Career;
