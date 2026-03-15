import "../../styles/experience.css";
import { ExperiencesData } from "../../data/ExperiencesData";
import ExperienceItem from "./ExperienceItem";


export default function ExperienceSection () {
    
    return (
        <section className="experience">

            <h2 className="experience-title">
                Professional <span>Experience</span> 
            </h2>

            <p className="experience-sub">
                Detailed career journey and achievements
            </p>

            <div className="experience-list">
                {ExperiencesData.map((exp, i) => (
                    <ExperienceItem key={i} exp={exp} />
                ))}
            </div>
        </section>
    )
}

