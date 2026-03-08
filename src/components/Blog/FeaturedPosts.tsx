import { loadPosts } from "../../utils/loadPosts";
import ArticleCard from "./ArticleCard";
import "./blog.css"

const posts = loadPosts().slice(0, 3);

function FeaturedPosts() {

    return (
        <section className="featured-posts">

            <div className="featured-header">
                <h2>
                    Featured <span>Posts</span>
                </h2>
                <p>Some Articles i've written</p>
            </div>

            <div className="featured-list">

                {posts.map((post, index) => (
                    <div key={post.slug}>
                        <ArticleCard key={post.slug} article={post} variant="featured" />
                    
                        {index < posts.length - 1 && <hr className="post-divider" />}
                    </div>
                ))}

            </div>

        </section>
    )
}

export default FeaturedPosts