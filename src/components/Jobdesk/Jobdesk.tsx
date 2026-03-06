import "./Jobdesk.css"

type Jobdesk = {
    icon: string
    title: string
    description: string
};

const jobdesks : Jobdesk[] = [
    {
        icon: "💻",
        title: "Frontend Developtment",
        description: "Creating responsive and user-friendly interfaces using React, Next.js, and Tailwind CSS",
    },
    {
        icon: "💡",
        title: "UI/UX Implementation",
        description: "I translate Figma and design mockups into responsive, pixel perfect user interfaces.",
    },
    {
        icon: "🔗",
        title: "Third Party Integration",
        description: "I integrate third-party services and API's to enchance functionnality and user experience",
    },
    {
        icon: "🗄️",
        title: "Backend Developtment",
        description: "Bui;d a scalable and secure backend using Node.js, Typescript, Laravel, and Golang",
    },
    {
        icon: "⚙️",
        title: "DevOps",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque feugiat odio sapien, nec efficitur ligula volutpat sit amet",
    },
    {
        icon: "💬",
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