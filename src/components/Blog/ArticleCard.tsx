import type { Article } from "../../types/Article";
import "./blog.css"
import { Link } from "react-router-dom";

type Props = {
    article: Article
};

function ArticleCard({ article }: Props) {
    return (

        <Link to={`/blog/${article.slug}`} className="article-card">

            <div className="article-content">
                <span className="article-date">{article.date}</span>

                <h2>{article.title}</h2>
                <p>{article.description}</p>

                <div className="article-tags">
                    {article.tags.map((tag, i) => (
                        <span key={i} className="tag">
                            {tag}
                        </span>
                    ))}
                </div>
            </div>

            <div className="article-image">
                <img src={article.image} alt={article.title} />
            </div>

        </Link>
    )
}

export default ArticleCard