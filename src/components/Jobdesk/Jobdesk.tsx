import "../../styles/Jobdesk.css"
import { CodeXml, Palette, CirclePile, DatabaseSearch, Cable, Speech } from "lucide-react";

type Jobdesk = {
    icon: React.ReactNode
    title: string
    description: string
};

const jobdesks : Jobdesk[] = [
    {
        icon: <CodeXml size={28}/>,
        title: "Frontend Developtment",
        description: "Creating responsive and user-friendly interfaces using React, Next.js, and Tailwind CSS",
    },
    {
        icon: <Palette size={28} />,
        title: "UI/UX Implementation",
        description: "I translate Figma and design mockups into responsive, pixel perfect user interfaces.",
    },
    {
        icon: <CirclePile size={28} />,
        title: "Third Party Integration",
        description: "I integrate third-party services and API's to enchance functionality and user experience",
    },
    {
        icon: <DatabaseSearch size={28} />,
        title: "Backend Developtment",
        description: "Build a scalable and secure backend using Node.js and Typescript",
    },
    {
        icon: <Cable size={28} />,
        title: "DevOps",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque feugiat odio sapien, nec efficitur ligula volutpat sit amet",
    },
    {
        icon: <Speech size={28} />,
        title: "Technical Leadership",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque feugiat odio sapien, nec efficitur ligula volutpat sit amet",
    },
]


function Jobdesks() {
    return (
        <section className="jobdesks">
            <div className="jobdesks-header">
                <h2>What I do</h2>
                <p>
                    Delivering high-quality web solutions with modern technologies and best practices
                </p>
            </div>

            <div className="jobdesk-grid">
                {jobdesks.map((jobdesk, index) => (
                    <div key={index} className="jobdesk-card"> 
                        <div className="jobdesk-icon">{jobdesk.icon}</div>

                        <h3>{jobdesk.title}</h3>

                        <p>{jobdesk.description}</p>
                    </div>
                ))}
            </div>
        </section>
    )
}

export default Jobdesks