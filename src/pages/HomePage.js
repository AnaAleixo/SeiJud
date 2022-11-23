import { Link } from "react-router-dom";

function HomePage({allProjects}) {
  

  return (
    <div className="projects">
      {allProjects.map((project) => {
        return (
          <div key={project.id} className="project">
            <p>{project.student}</p>
            <p>{project.projectName}</p>
            <small>{project.id}</small>
            <Link to={`/projects/${project.id}`} className="link">Ver mais detalhes</Link>
          </div>
        );
      })}
    </div>
  );
}

export default HomePage;
