import ProjectsList from "../components/Project/ProjectsList"
import "../styles/project.css"

function Project() {
    return (
        <div className="project-page">
            
            <section className="project-hero">
                <h1>Project</h1>
                <p>
                    My thoughts and experiences on software development and web technologies
                </p>
            </section>

            <ProjectsList />

        </div>
    )
}

export default Project