import { loadPosts } from "../../utils/loadPosts";
import ArticleCard from "./ArticleCard";
import "./blog.css"
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const posts = loadPosts().slice(0, 3);

function FeaturedPosts() {

    return (
        <section className="featured-posts">

            <div className="featured-header">
                <h2>
                    Featured <span>Blogs</span>
                </h2>
                <p>Some Blogs i've written</p>
            </div>

            <div className="featured-list">

                {posts.map((post, index) => (
                    <div key={post.slug}>
                        <ArticleCard key={post.slug} article={post} variant="featured" />
                    
                        {index < posts.length && <hr className="post-divider" />}
                    </div>
                ))}

            </div>

            <div>
                <Link 
                    to="/blog" className="link-blog">
                        <p>See more posts <ArrowRight /></p>
                </Link> 
            </div>

        </section>
    )
}

export default FeaturedPosts