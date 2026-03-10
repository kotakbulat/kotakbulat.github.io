import { loadProjects } from "../../utils/loadProjects";
import ProjectCard from "./ProjectCard";
import "../../styles/project.css"
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const projects = loadProjects().slice(0, 3);

function FeaturedProjects() {

    return (
        <section className="featured-projects">

            <div className="featured-header">
                <h2>
                    Featured <span>Projects</span>
                </h2>
                <p>Some projects I've created and open source projects</p>
            </div>

            <div className="featured-list">

                {projects.map((project, index) => (
                    <div key={project.slug}>
                        <ProjectCard key={project.slug} project={project} variant="featured" />
                    
                        {index < projects.length && <hr className="project-divider" />}
                    </div>
                ))}

            </div>

            <div>
                <Link 
                    to="/project" className="link-project">
                        <p>See more projects <ArrowRight /></p>
                </Link> 
            </div>

        </section>
    )
}

export default FeaturedProjects