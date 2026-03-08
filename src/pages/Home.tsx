import Hero from "../components/Hero/Hero"
import Jobdesks from "../components/Jobdesk/Jobdesk"
import FeaturedPosts from "../components/Blog/FeaturedPosts"

function Home() {

    return (
        <>
            <div>
                <Hero />
                <Jobdesks />
                <FeaturedPosts />
            </div>

        </>
    )
}

export default Home