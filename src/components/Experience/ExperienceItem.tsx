import ExperienceListItem from "./ExperienceListItem";
import ExperienceMetaCard from "./ExperienceMetaCard";
import type { Experience } from "../../types/Experience";
import { MapPin, BriefcaseBusiness, Award, Zap, Target, Calendar, Users } from "lucide-react";

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
                    <p><BriefcaseBusiness size={18}/> {exp.type}</p>
                    <p><MapPin size={20} /> {exp.location}</p>
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
                        icon={Calendar}
                    />

                    <ExperienceMetaCard
                        title="Team Size"
                        value={exp.teamSize}
                        icon={Users}
                    />

                    <ExperienceMetaCard
                        title="Project"
                        value={exp.project}
                        icon={Target}
                    />
                </div>

                <ExperienceListItem 
                    title="Contribution"
                    items={exp.contributions}
                    icon={Zap}
                />

                {exp.achievements && (
                    <ExperienceListItem
                        title="Achievements"
                        items={exp.achievements}
                        icon={Award}
                    />
                )}

            </div>

        </div>
    )
}