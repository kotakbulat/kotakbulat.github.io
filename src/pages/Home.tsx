import Hero from "../components/Hero/Hero"
import Jobdesks from "../components/Jobdesk/Jobdesk"
import FeaturedPosts from "../components/Blog/FeaturedPosts"
import FeaturedProjects from "../components/Project/FeaturedProjects"
import RepoSection from "../components/GitRepo/RepoSection"
import ContactCTA from "../components/Contact/ContactCTA"
import Footer from "../components/Footer/Footer"
import "../styles/home.css"

function Home() {

    return (
        <>
            <div className="home">
                <Hero />
                <Jobdesks />
                <FeaturedPosts />
                <FeaturedProjects />
                <RepoSection />
                <ContactCTA />
                <Footer />
            </div>

        </>
    )
}

export default Home