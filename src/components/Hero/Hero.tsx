import "../../styles/Hero.css"
import { Instagram, Linkedin, Github, Mail } from "lucide-react";
import Tooltip from "../Tooltip/Tooltip";
import MagneticTooltip from "../Tooltip/MagneticTooltip";
import profile from "../../assets/images/profile.jpeg";

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
                    src={profile}
                    alt="profile"
                    className="profile-image"
                />

                <div className="socials">
                    <a href="#">
                        <MagneticTooltip text="this is using magnetic">
                            <Instagram />
                        </MagneticTooltip>
                    </a>
                    <a href="#">
                        <Tooltip text="this is tooltip">
                            <Github />
                        </Tooltip>
                    </a>
                    <a href="#"><Linkedin /></a>
                    <a href="#"><Mail /></a>
                </div>
            </div>
        </section>
    )
}

export default Hero;