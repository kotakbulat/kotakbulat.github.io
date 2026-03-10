import Hero from "../components/Hero/Hero"
import Jobdesks from "../components/Jobdesk/Jobdesk"
import FeaturedPosts from "../components/Blog/FeaturedPosts"
import FeaturedProjects from "../components/Project/FeaturedProjects"
import RepoSection from "../components/GitRepo/RepoSection"
import ContactCTA from "../components/Contact/ContactCTA"

function Home() {

    return (
        <>
            <div>
                <Hero />
                <Jobdesks />
                <FeaturedPosts />
                <FeaturedProjects />
                <RepoSection />
                <ContactCTA />
            </div>

        </>
    )
}

export default Home