import type { Project } from "../../types/Project";
import "../../styles/project.css"
import { Link } from "react-router-dom";

type Props = {
    project: Project
    variant?: "default" | "featured"
};

function ProjectCard({ project, variant = "default" }: Props) {
    return (

        <Link 
            to={`/project/${project.slug}`} 
            className={`project-card article-card--${variant}`}>

            <div className="project-content">
                <span className="project-date">{project.date}</span>

                <h2 className={"project-title"}>{project.title}</h2>
                <p>{project.description}</p>

                <div className="project-tags">
                    {project.tags.map((tag, i) => (
                        <span key={i} className="tag">
                            {tag}
                        </span>
                    ))}
                </div>
            </div>

            <div className="project-image">
                <img src={project.image} alt={project.title} />
            </div>

        </Link>
    )
}

export default ProjectCard