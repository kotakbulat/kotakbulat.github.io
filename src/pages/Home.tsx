import Hero from "../components/Hero/Hero"
import Jobdesks from "../components/Jobdesk/Jobdesk"
import FeaturedPosts from "../components/Blog/FeaturedPosts"
import FeaturedProjects from "../components/Project/FeaturedProjects"

function Home() {

    return (
        <>
            <div>
                <Hero />
                <Jobdesks />
                <FeaturedPosts />
                <FeaturedProjects />
            </div>

        </>
    )
}

export default Home