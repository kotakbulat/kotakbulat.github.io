import "../../styles/animation.css"
import type { LucideIcon } from "lucide-react"

type MetaProps = {
    title: string
    value: string
    icon: LucideIcon
}

export default function ExperienceMetaCard({ title, value, icon: Icon }: MetaProps) {

    return (
        <div className="meta-card loader-ring">            

            <p className="meta-title"> 
                <div className="icon-wrapper"><Icon size={16} className="icon"/></div> 
                {title}
            </p>

            <p className="meta-value">{value}</p>

        </div>
    )
}