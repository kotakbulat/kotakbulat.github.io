type MetaProps = {
    title: string
    value: string
}

export default function ExperienceMetaCard({ title, value }: MetaProps) {

    return (
        <div className="meta-card">

            <p className="meta-title">{title}</p>

            <p className="meta-value">{value}</p>

        </div>
    )
}