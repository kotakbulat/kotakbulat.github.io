// src/pages/index.tsx
import Head from 'next/head';
import Navbar from '../components/Navbar';
import { motion } from 'framer-motion';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { EnvelopeIcon } from '@heroicons/react/24/outline';
// ScrollTrigger should be registered globally in _app.tsx or imported if not
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import MagneticLink from '../components/MagneticLink';

gsap.registerPlugin(ScrollTrigger); 

// --- Contact Details ---
const contactDetails = {
  email1: "hokicoc@mail.ugm.ac.id",
  email2: "hokilimpahwijaya@gmail.com",
  linkedin: "https://www.linkedin.com/in/hoki-wijaya-80528b144",
  github: "https://github.com/kotakbulat",
};

// --- Component Start ---
export default function Home() {
  // --- Refs ---
  const heroContainerRef = useRef<HTMLDivElement>(null);
  const scrollingTextContainerRef = useRef<HTMLDivElement>(null); // Container for the scrolling text
  const scrollingTextRef = useRef<HTMLHeadingElement>(null);      // The H1 with repeated text
  // Refs for GSAP section reveals
  const aboutSectionRef = useRef<HTMLDivElement>(null);
  const aboutHeadingRef = useRef<HTMLHeadingElement>(null);
  const aboutParagraphRef = useRef<HTMLParagraphElement>(null);
  const skillsSectionRef = useRef<HTMLDivElement>(null);
  const skillsHeadingRef = useRef<HTMLHeadingElement>(null);
  const featuredWorkSectionRef = useRef<HTMLDivElement>(null);
  const featuredWorkHeadingRef = useRef<HTMLHeadingElement>(null);

  const skills = ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'GSAP', 'Node.js', 'Framer Motion', 'Git'];

  // --- GSAP Animations ---
  useEffect(() => {
    // --- Ensure ScrollTrigger is Registered ---
    // Do this either here or preferably once globally in _app.tsx
    // gsap.registerPlugin(ScrollTrigger); // Uncomment if not registered globally

    // --- Constants for Scrolling Text Tuning ---
    const SCROLL_VELOCITY_MULTIPLIER = 0.006;
    const MAX_TEXT_SPEED = 2.5;
    const TIMESCALE_SMOOTHING_DURATION = 0.2;
    const IDLE_SLOWDOWN_DURATION = 0.5;

    // Delay slightly for stable layout calculations
    const timer = setTimeout(() => {
      const textEl = scrollingTextRef.current;
      const containerEl = heroContainerRef.current;

      if (!textEl || !containerEl) {
        console.warn("Hero elements for animations not found.");
        return;
      }

      // Scope GSAP animations for proper cleanup
      const ctx = gsap.context(() => {

        // --- Function to Setup Scrolling Text Animation ---
        const setupScrollingText = () => {
          gsap.set(textEl, { force3D: true });
          let distanceToMove = textEl.offsetWidth / 2;

          // Check if distance calculation is valid
          if (!distanceToMove || distanceToMove <= 0) {
            console.error("Scrolling text setup failed: Invalid distance", distanceToMove);
            return null; // Indicate failure
          }
          console.log("Setting up scrolling text, distance:", distanceToMove);

          const scrollTween = gsap.to(textEl, {
            x: () => `-=${distanceToMove}`, // Use function for dynamic value on refresh
            duration: 20,
            ease: "none",
            repeat: -1,
            paused: true,
            modifiers: {
              x: gsap.utils.unitize(x => (parseFloat(x) % -distanceToMove) || 0) // Keep fallback just in case
            },
            invalidateOnRefresh: true
          });

          const st = ScrollTrigger.create({
            trigger: document.body,
            start: "top top",
            end: "bottom bottom",
            onUpdate: (self) => {
              const velocity = self.getVelocity() * SCROLL_VELOCITY_MULTIPLIER;
              const targetTimeScale = gsap.utils.clamp(-MAX_TEXT_SPEED, MAX_TEXT_SPEED, velocity);
              gsap.to(scrollTween, { timeScale: targetTimeScale, duration: TIMESCALE_SMOOTHING_DURATION, ease: "power1.out", overwrite: true });
              if (Math.abs(velocity) < 0.05) {
                gsap.to(scrollTween, { timeScale: 0, duration: IDLE_SLOWDOWN_DURATION, ease: "power1.out", overwrite: true });
              }
            }
          });

          // Return the tween and trigger for potential reference (though not strictly needed here)
           if (scrollTween.timeScale() !== 0) scrollTween.play();
           return { scrollTween, st };
        };

        // --- Attempt to Set Up Scrolling Text (with Retry) ---
        let scrollAnimation = setupScrollingText(); // Initial attempt
        if (!scrollAnimation) {
          console.log("Initial distance calculation failed, retrying...");
          gsap.delayedCall(0.3, () => { // Wait a bit longer
              scrollAnimation = setupScrollingText(); // Retry attempt
              if (!scrollAnimation) {
                  console.error("Scrolling text animation aborted after retry.");
              }
          });
        }

         // --- Recalculate distance on resize ---
         // Moved listener setup outside the setup function to avoid duplicates
         const handleRefresh = () => {
             if(textEl && textEl.offsetWidth) {
                 let distanceToMove = textEl.offsetWidth / 2;
                  console.log("Recalculated distance on refresh:", distanceToMove);
             }
         }
         ScrollTrigger.addEventListener("refreshInit", handleRefresh);


        // --- Setup Other Section Reveal Animations ---
        // About Section
        if (aboutSectionRef.current && aboutHeadingRef.current && aboutParagraphRef.current) {
          gsap.timeline({ scrollTrigger: { trigger: aboutSectionRef.current, start: 'top 80%', toggleActions: 'play none none reverse' } })
            .from(aboutHeadingRef.current, { opacity: 0, y: 50, duration: 0.8, ease: 'power3.out' })
            .from(aboutParagraphRef.current, { opacity: 0, y: 30, duration: 0.8, ease: 'power3.out' }, "-=0.5");
        }
        // Skills Section Heading
        if (skillsSectionRef.current && skillsHeadingRef.current) {
          gsap.from(skillsHeadingRef.current, { opacity: 0, y: 50, duration: 0.8, ease: 'power3.out', scrollTrigger: { trigger: skillsSectionRef.current, start: 'top 85%', toggleActions: 'play none none reverse' } });
        }
        // Featured Work Section Heading
        if (featuredWorkSectionRef.current && featuredWorkHeadingRef.current) {
          gsap.from(featuredWorkHeadingRef.current, { opacity: 0, y: 50, duration: 0.8, ease: 'power3.out', scrollTrigger: { trigger: featuredWorkSectionRef.current, start: 'top 85%', toggleActions: 'play none none reverse' } });
        }

      }, containerEl); // Scope context

      // Cleanup GSAP context on unmount
      return () => {
        console.log("Reverting GSAP context for Home page");
        ctx.revert();
        // Also remove the specific listener if added outside context scope
        // ScrollTrigger.removeEventListener("refreshInit", handleRefresh); // Usually ctx.revert() handles this
      };
    }, 150); // Delay

    // Cleanup the timeout itself
    return () => clearTimeout(timer);
  }, []);
 // Run animations once on mount

  // --- Framer Motion Variants (Used for list items, hover effects etc.) ---
  const staggerContainer = { hidden: { opacity: 1 }, visible: { opacity: 1, transition: { staggerChildren: 0.1 } } };
  const skillItemVariant = { hidden: { opacity: 0, scale: 0.8 }, visible: { opacity: 1, scale: 1, transition: { duration: 0.4 } } };
  const featuredCardVariant = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } };
  // Can use sectionVariants for Framer Motion based section reveals if not using GSAP for them
  const sectionVariants = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } } };

  // --- Component Render ---
  return (
    <>
      <Navbar /> {/* Include Navbar component */}
      {/* --- Head Section --- */}
      <Head>
        <title>Hoki Wijaya - Creative Developer</title>
        <meta name="description" content="Personal portfolio showcasing skills and projects of Hoki Wijaya." />
      </Head>

      {/* --- Hero Section --- */}
      <section
        ref={heroContainerRef}
        className="h-screen flex flex-row items-center justify-center text-center bg-gray-400 dark:bg-gray-600 text-white overflow-hidden px-4 relative"
      >
        {/* Scrolling Text Background */}
        <div
          ref={scrollingTextContainerRef}
          className="absolute inset-x-0 top-3/4 -translate-y-1/2 z-30 pointer-events-none" // Positioned center, behind content
          style={{ overflow: 'hidden', whiteSpace: 'nowrap' }}
        >
          <h1
            ref={scrollingTextRef}
            className="text-[14vw] md:text-[12vw] lg:text-[14vw] font-custom text-white/90 dark:text-white/60 select-none inline-block"
            style={{ transform: 'translateZ(0)', willChange: 'transform' }} // Performance hints
          >
            {/* Ensure two identical halves for seamless loop */}
            Hoki Limpah Wijaya - Hoki Limpah Wijaya - Hoki Limpah Wijaya - {/* (Unit 1) (Unit 2) */}
          </h1>
        </div>

        {/* Picture - Top Layer */}
        <div className="relative flex justify-center items-center mt-11 z-10 gap-10">
          <img
            src="/images/picture.png" // Replace with actual image path
            alt="Hoki Limpah Wijaya"
            className="max-h-[80vh] md:max-h-[60vh] lg:max-h-[150vh] w-auto"
          />
        </div>

        {/* Foreground Hero Content */}
        <motion.p
          className="absolute left-2/3 translate-x-6 text-left z-30 text-gray-100 font-custom dark:text-gray-300 text-2xl md:text-4xl lg:text-2xl leading-relaxed"                // Ensure z-10
          initial={{ opacity: 0.8 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <svg className="w-10 h-10 text-white transform rotate-[-45deg]" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor"><path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path></svg>
          
            Vibe Developer <br />
            AI and Web3 Enthusiast
          
        </motion.p>

        {/* Scroll Down Arrow */}
        <motion.div
           className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-10" // Ensure z-10
           initial={{ opacity: 0 }}
           animate={{ opacity: 1 }}
           transition={{ delay: 1.2, duration: 0.5 }}
        >
           <motion.div animate={{ y: [0, -5, 0] }} transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}>
                <svg className="w-6 h-6 text-white" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor"><path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path></svg>
           </motion.div>
        </motion.div>
      </section>
      {/* --- End Hero Section --- */}

      {/* --- Featured Work Teaser --- */}
      <section ref={featuredWorkSectionRef} id="featured-work" className="container mx-auto py-24 md:py-32 px-6 md:px-10 lg:px-4">
        <h2 ref={featuredWorkHeadingRef} className="text-4xl md:text-5xl font-custom font-bold mb-16 text-center text-gray-800 dark:text-gray-100">Featured Projects</h2>
        <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10" variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }}>
          {[1, 2, 3].map((item) => ( // Placeholder Data
             <motion.div key={item} className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 text-center h-64 flex flex-col justify-center items-center border border-gray-200 dark:border-gray-700" variants={featuredCardVariant} whileHover={{ scale: 1.03, boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -4px rgba(0,0,0,0.1)' }}>
                <h3 className="text-2xl font-semibold font-custom mb-3 text-gray-900 dark:text-white">Featured Project {item}</h3>
                <p className="text-gray-500 font-custom dark:text-gray-400">A short teaser description.</p>
             </motion.div>
          ))}
        </motion.div>
        <motion.div className="text-center mt-16" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.5 }}>
          {/*<MagneticButton className="inline-block bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white font-bold py-3 px-8 rounded-lg text-lg transition-colors duration-300 shadow-md hover:shadow-lg" onClick={() => window.location.href = '/portfolio'}> See All My Work </MagneticButton>*/}
          <MagneticLink href='/portfolio' target="_blank" rel="noopener noreferrer" className="inline-flex items-center bg-gray-800 font-custom dark:bg-gray-700 text-white font-medium shadow hover:shadow-md text-sm"> See All My Work </MagneticLink>
        </motion.div>
      </section>


      {/* --- About Section --- */}
      <section ref={aboutSectionRef} id="about" className="container mx-auto py-24 md:py-32 px-6 md:px-10 lg:px-4">
        <h2 ref={aboutHeadingRef} className="text-4xl md:text-5xl font-bold font-custom mb-10 text-center text-gray-800 dark:text-gray-100">About Me</h2>
        <p ref={aboutParagraphRef} className="max-w-3xl mx-auto text-lg md:text-xl text-center font-custom leading-relaxed text-gray-600 dark:text-gray-300">
          Passionate about building beautiful, interactive, and performant web experiences...
        </p>
      </section>


      {/* --- Contact/CTA Section --- */}
       {/* Added ref for potential GSAP reveal */}
       <motion.section ref={/* contactSectionRef - declare ref if using GSAP */ null} id="contact" className="bg-gradient-to-t from-gray-200 to-gray-100 dark:from-gray-900 dark:to-gray-800 py-24 md:py-32 px-6 text-center" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} variants={sectionVariants}>
        <h2 ref={/* contactHeadingRef - declare ref if using GSAP */ null} className="text-4xl md:text-5xl font-custom font-bold mb-6 text-gray-800 dark:text-gray-100">Get In Touch</h2>
        <p ref={/* contactParagraphRef - declare ref if using GSAP */ null} className="mb-10 text-lg md:text-xl text-gray-600 font-custom dark:text-gray-300 max-w-2xl mx-auto"> I'm always open to discussing new projects, creative ideas, or opportunities. Let's connect! </p>
        {/* Consider wrapping buttons in motion.div for stagger if using Framer Motion reveal */}
        <div className="flex flex-wrap justify-center items-center gap-4 md:gap-6">
        <MagneticLink href={`mailto:${contactDetails.email1}`} className="inline-flex items-center bg-gray-800 font-custom dark:bg-gray-700 text-white font-medium shadow hover:shadow-md text-sm" pullContainerForce={0.3} pullTextForce={0.5}> Email (UGM) {/* Icon removed, add if desired inside */} </MagneticLink>
        <MagneticLink href={`mailto:${contactDetails.email2}`} className="inline-flex items-center bg-gray-800 font-custom dark:bg-gray-700 text-white font-medium shadow hover:shadow-md text-sm"> Email (Personal) </MagneticLink>
        <MagneticLink href={contactDetails.linkedin} target="_blank" rel="noopener noreferrer" className="inline-flex items-center bg-gray-800 font-custom dark:bg-gray-700 text-white font-medium shadow hover:shadow-md text-sm"> LinkedIn </MagneticLink>
        <MagneticLink href={contactDetails.github} target="_blank" rel="noopener noreferrer" className="inline-flex items-center bg-gray-800 font-custom dark:bg-gray-700 text-white font-medium shadow hover:shadow-md text-sm" > GitHub </MagneticLink>
        </div>
         <motion.div className="mt-12" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
             <a href="/experience" className="text-blue-600 font-custom dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 underline transition-colors"> View Detailed Experience / CV </a>
         </motion.div>
      </motion.section>


      {/* --- Skills Section --- */}
      <section ref={skillsSectionRef} id="skills" className="bg-gray-200 dark:bg-gray-800 py-24 md:py-32 px-6 md:px-10 lg:px-4">
        <h2 ref={skillsHeadingRef} className="text-4xl md:text-5xl font-bold font-custom mb-16 text-center text-gray-800 dark:text-gray-100">My Tech Stack</h2>
        <motion.div
          className="container mx-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 md:gap-8 text-center"
          variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }}
         >
          {skills.map((skill) => (
            <motion.div key={skill} className="p-4 md:p-6 bg-white dark:bg-gray-700 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300" variants={skillItemVariant} whileHover={{ scale: 1.05, y: -3 }}>
              <span className="text-base md:text-lg font-medium font-custom text-gray-700 dark:text-gray-200">{skill}</span>
            </motion.div>
          ))}
        </motion.div>
      </section>

      

       

      {/* --- Footer --- */}
      <footer className="text-center py-8 bg-gray-200 dark:bg-gray-900 text-gray-600 dark:text-gray-500 text-sm">
        © {new Date().getFullYear()} Hoki Wijaya. Reference by dennissnellenberg
      </footer>
    </>
  );
} // End of Home Component