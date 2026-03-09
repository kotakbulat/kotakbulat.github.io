import type { Repo } from "../../types/Repo";
import { Star, GitFork, Book, Shapes } from "lucide-react";
import "./repo.css"

type Props = {
    repo: Repo
}

export default function RepoCard({ repo }: Props) {

    return (
        <a 
            href={repo.url}
            target="_blank"
            className="repo-card"
        >
            <div className="repo-header">

                <div className="repo-title">
                    <Book size={18} />
                    <h3>{repo.name}</h3>
                </div>

                <span className="repo-badge">{repo.type}</span>

            </div>

            <p className="repo-description">
                {repo.description}
            </p>

            <div className="repo-footer">

                <div className="repo-language">
                    <span className="language-dot"><Shapes style={{color: repo.color}}/></span>
                    {repo.language}
                </div>

                <div className="repo-stats">

                    {repo.stars !== undefined && (
                        <span>
                            <Star size={14} /> {repo.stars}
                        </span>
                    )}

                    {repo.stars !== undefined && (
                        <span>
                            <GitFork size={14} /> {repo.stars}
                        </span>
                    )}

                </div>

            </div>
        </a>
    )
}