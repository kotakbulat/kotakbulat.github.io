import ProjectCard from "./ProjectCard";
import "./project.css"
import { useState } from "react";
import { loadProjects } from "../../utils/loadProjects";


const allProjects = loadProjects();


function ProjectsList() {

    const [search, setSearch] = useState("");

    const filtered = allProjects.filter(project => 
        project.title.toLowerCase().includes(search.toLowerCase()) ||
        project.description.toLowerCase().includes(search.toLowerCase())
    )


    return (
        <section>
            <input
                placeholder="Search project..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="project-search"
            />

            <div className="project-list">
                {filtered.map(project => (
                    <ProjectCard key={project.slug} project={project} />
                ))}

            </div>
        </section>
    )
}

export default ProjectsList