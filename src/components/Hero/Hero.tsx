import "../../styles/Hero.css"
import { Instagram, Linkedin, Github, Mail, FileText } from "lucide-react";
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
                <div className="image-wrapper">
                        <img    
                        src={profile}
                        alt="profile"
                        className="profile-image"
                    />
                </div>

                <div className="socials">
                    <a href="https://instagram.com/urmyhoki"><MagneticTooltip text="Instagram"><Instagram /></MagneticTooltip></a>
                    <a href="https://github.com/kotakbulat"><Tooltip text="Github"><Github /></Tooltip></a>
                    <a href="https://www.linkedin.com/in/hoki-wijaya-80528b144"><Tooltip text="Linkedin"><Linkedin /></Tooltip></a>
                    <a href="mailto:hokicoc@mail.ugm.ac.id"><Tooltip text="Email"><Mail /></Tooltip></a>
                    <a href="#"><Tooltip text="Resume"><FileText /></Tooltip></a>
                </div>
            </div>
        </section>
    )
}

export default Hero;