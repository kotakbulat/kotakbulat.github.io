import { useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import { loadPosts } from "../utils/loadPosts";
import "../styles/blog.css"

const posts = loadPosts();

function ArticlePage() {

    const { slug } = useParams();

    const post = posts.find(p => p.slug === slug)

    if (!post) return <p>Article Not Found</p>

    return (
        <article className="article-page">

            <h1>{post.title}</h1>

            <div className="article-tags">
                    {post.tags.map((tag, i) => (
                        <span key={i} className="tag">
                            {tag}
                        </span>
                    ))}
                </div>
            <br />
            
            
            <span className="article-date">{post.date}</span>

            <ReactMarkdown>
                {post.content}
            </ReactMarkdown>

        </article>
    )
}

export default ArticlePage