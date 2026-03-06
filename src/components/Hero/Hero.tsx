import "./Hero.css"

function Hero() {
    return (
        <section className="hero">
            <div className="hero-left">
                <h1 >
                Hi, I'm <span className="highlight">Hoki L. W.</span><br />
                a <span className="underline">Software Engineer</span>. 
                </h1> 
                

                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                    Pellentesque eget erat nec dolor euismod sollicitudin. 
                    Sed dapibus metus quis porta condimentum. Nunc vitae nisi ut erat lacinia rutrum ut eu purus. 
                </p>

                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                    Pellentesque eget erat nec dolor euismod sollicitudin. 
                    Sed dapibus metus quis porta condimentum. Nunc vitae nisi ut erat lacinia rutrum ut eu purus.  
                </p>
            </div>

            <div className="hero-right">
                <img    
                    src="/profile.jpg"
                    alt="profile"
                    className="profile-image"
                />

                <div className="socials">
                    <a href="#">X</a>
                    <a href="#">Github</a>
                    <a href="#">Linkedin</a>
                    <a href="#">Email</a>
                </div>
            </div>
        </section>
    )
}

export default Hero;