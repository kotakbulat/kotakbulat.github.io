type ListProps = {
    title: string
    items: string[]
}

export default function ExperienceListItem({ title, items}: ListProps) {

    return (
        <div className="exp-list">

            <p className="list-title">{title}:</p>

            {items.map((item, i) => (
                <div key={i} className="list-item">
                    {item}
                </div>
            ))}

        </div>
    )
}