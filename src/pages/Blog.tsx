import ArticlesList from "../components/Blog/ArticleList"
import "../styles/blog.css"

function Blog() {
    return (
        <div className="blog-page">
            
            <section className="blog-hero">
                <h1>Blog</h1>
                <p>
                    My thoughts and experiences on software development and web technologies
                </p>
            </section>

            <ArticlesList />

        </div>
    )
}

export default Blog