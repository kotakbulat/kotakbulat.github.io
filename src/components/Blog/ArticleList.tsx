import ArticleCard from "./ArticleCard";
import { articles } from "../../data/articles";
import "./blog.css"

function ArticlesList() {
    return (
        <section className="article-list">
            {articles.map((article, i) => (
                <ArticleCard key={i} article={article} />
            ))}

        </section>
    )
}

export default ArticlesList