import { useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import { loadProjects } from "../utils/loadProjects";
import "../styles/project.css"

const projects = loadProjects();

function ProjectPage() {

    const { slug } = useParams();

    const project = projects.find(p => p.slug === slug)

    if (!project) return <p>Project Not Found</p>

    return (
        <article className="project-page">

            <h1>{project.title}</h1>

            <div className="project-tags">
                    {project.tags.map((tag, i) => (
                        <span key={i} className="tag">
                            {tag}
                        </span>
                    ))}
                </div>
            <br />
            
            
            <span className="project-date">{project.date}</span>

            <img    
                src={project.image}
                alt={project.title}
                className="project-image"
            />

            <ReactMarkdown>
                {project.content}
            </ReactMarkdown>

        </article>
    )
}

export default ProjectPage