import RepoCard from "./RepoCard";
import { repos } from "../../data/Repo";
import { ArrowRight } from "lucide-react";
import "../../styles/repo.css"

export default function RepoSection() {

    return (
        <section className="repo">

            <div className="repos-header">

                <h2>
                    Github <span>Open Source</span>
                </h2>

                <p>Some open source I've created</p>

            </div>

            <div className="repos-grid">

                {repos.map(repo => (
                    <RepoCard 
                        key={repo.name}
                        repo={repo}
                    />
                ))}

            </div>

            <a
                className="repo-more"
                href="https://github.com/kotakbulat"
                target="_blank"
            >
                See more open source
                <ArrowRight size={18} />
            </a>

        </section>
    )
}