import ExperienceListItem from "./ExperienceListItem";
import ExperienceMetaCard from "./ExperienceMetaCard";
import type { Experience } from "../../types/Experience";

type ExperienceItemProps = {
    exp: Experience
}

export default function ExperienceItem({ exp }: ExperienceItemProps) {

    return (
        <div className="experience-item">

            {/* LEFT */}
            <div className="experience-left">

                <h3 className="company">{exp.company}</h3>
                <p className="role">{exp.role}</p>

                <div className="meta">
                    <p>{exp.type}</p>
                    <p>{exp.location}</p>
                </div>

                <div className="description">
                    {exp.description}
                </div>

            </div>


            {/* RIGHT */}
            <div className="experience-right">

                <div className="meta-cards">

                    <ExperienceMetaCard
                        title="Duration"
                        value={exp.duration}
                    />

                    <ExperienceMetaCard
                        title="Team Size"
                        value={exp.teamSize}
                    />

                    <ExperienceMetaCard
                        title="Project"
                        value={exp.project}
                    />
                </div>

                <ExperienceListItem 
                    title="Contribution"
                    items={exp.contributions}
                />

                {exp.achievements && (
                    <ExperienceListItem
                        title="Achievements"
                        items={exp.achievements}
                    />
                )}

            </div>

        </div>
    )
}