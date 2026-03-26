import type { LucideIcon } from "lucide-react"

type ListProps = {
    title: string
    items: string[]
    icon: LucideIcon
}

export default function ExperienceListItem({ title, items, icon: Icon}: ListProps) {

    return (
        <div className="exp-list">

            <p className="list-title"> 
                <div className="icon-wrapper"><Icon size={16} className="icon" /> </div>
                {title}: 
            </p>

            {items.map((item, i) => (
                <div key={i} className="list-item">
                    {item}
                </div>
            ))}

        </div>
    )
}