import ArticleCard from "./ArticleCard";
import "./blog.css"
import { useState } from "react";
import { loadPosts } from "../../utils/loadPosts";


const allPosts = loadPosts();


function ArticlesList() {

    const [search, setSearch] = useState("");

    const filtered = allPosts.filter(post => 
        post.title.toLowerCase().includes(search.toLowerCase()) ||
        post.description.toLowerCase().includes(search.toLowerCase())
    )


    return (
        <section>
            <input
                placeholder="Search post..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="blog-search"
            />

            <div className="article-list">
                {filtered.map(post => (
                    <ArticleCard key={post.slug} article={post} />
                ))}

            </div>
        </section>
    )
}

export default ArticlesList