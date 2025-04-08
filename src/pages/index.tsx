// src/pages/index.tsx (or pages/index.tsx)
import Head from 'next/head';
import { motion } from 'framer-motion';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
// ScrollTrigger is already registered in _app.tsx

export default function Home() {
  // --- Refs for GSAP targets ---
  const heroContainerRef = useRef<HTMLDivElement>(null);
  const aboutSectionRef = useRef<HTMLDivElement>(null);
  const aboutHeadingRef = useRef<HTMLHeadingElement>(null);
  const aboutParagraphRef = useRef<HTMLParagraphElement>(null);
  const skillsSectionRef = useRef<HTMLDivElement>(null);
  const skillsHeadingRef = useRef<HTMLHeadingElement>(null);
  const featuredWorkSectionRef = useRef<HTMLDivElement>(null);
  const featuredWorkHeadingRef = useRef<HTMLHeadingElement>(null);
  // Add more refs as needed for specific GSAP animations

  // Example skills data
  const skills = ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'GSAP', 'Node.js', 'Framer Motion', 'Git'];

  // --- GSAP Animations ---
  useEffect(() => {
    const ctx = gsap.context(() => {
      // --- Hero Subtle Animation (Example: slight scale on scroll) ---
      // This requires the hero section to potentially have elements that can move/scale
      // gsap.to(heroElementsRef.current, { // Assuming you have refs to elements inside hero
      //   scale: 1.1,
      //   scrollTrigger: {
      //     trigger: heroContainerRef.current,
      //     start: 'top top',
      //     end: 'bottom top',
      //     scrub: true, // Smoothly animates based on scroll progress
      //   }
      // });

      // --- About Section Reveal ---
      if (aboutSectionRef.current && aboutHeadingRef.current && aboutParagraphRef.current) {
        gsap.timeline({
          scrollTrigger: {
            trigger: aboutSectionRef.current,
            start: 'top 80%', // Start animation when 80% of the section is visible
            // markers: true, // for debugging
            toggleActions: 'play none none reverse', // Play on enter, reverse if scrolled back up
          }
        })
        .from(aboutHeadingRef.current, { opacity: 0, y: 50, duration: 0.8, ease: 'power3.out' })
        .from(aboutParagraphRef.current, { opacity: 0, y: 30, duration: 0.8, ease: 'power3.out' }, "-=0.5"); // Overlap previous animation slightly
      }

      // --- Skills Section Heading Reveal ---
      if (skillsSectionRef.current && skillsHeadingRef.current) {
        gsap.from(skillsHeadingRef.current, {
          opacity: 0,
          y: 50,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: skillsSectionRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          }
        });
      }

       // --- Featured Work Section Heading Reveal ---
       if (featuredWorkSectionRef.current && featuredWorkHeadingRef.current) {
        gsap.from(featuredWorkHeadingRef.current, {
          opacity: 0,
          y: 50,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: featuredWorkSectionRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          }
        });
      }

      // Add more GSAP animations here...

    }); // End GSAP context

    // Cleanup function
    return () => ctx.revert(); // Revert animations and kill triggers
  }, []); // Run animations once on mount

  // --- Framer Motion Variants ---
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  const staggerContainer = {
    hidden: { opacity: 1 }, // Container itself is visible
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1, // Delay between children animations
      },
    },
  };

  const skillItemVariant = {
     hidden: { opacity: 0, scale: 0.8 },
     visible: { opacity: 1, scale: 1, transition: { duration: 0.4 } },
  };

  const featuredCardVariant = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <>
      <Head>
        <title>Your Name - Creative Developer</title>
        <meta name="description" content="Personal portfolio showcasing skills and projects." />
      </Head>

      {/* Hero Section */}
      <section
        ref={heroContainerRef}
        className="h-screen flex flex-col items-center justify-center text-center bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 text-white overflow-hidden px-4 relative"
      >
        {/* Add background elements for potential parallax here if desired */}
        <motion.h1
          className="text-5xl md:text-7xl lg:text-8xl font-bold mb-4 z-10"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
        >
          Your Name
        </motion.h1>
        <motion.p
          className="text-lg md:text-xl lg:text-2xl text-gray-300 mb-8 z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          Creative Developer | Designer | Problem Solver
        </motion.p>
        {/* Animated Scroll Down Arrow (Example) */}
        <motion.div
           className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-10"
           initial={{ opacity: 0, y: -10 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ delay: 1.2, duration: 0.5, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
        >
          <svg className="w-6 h-6 text-white" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
             <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
          </svg>
        </motion.div>
      </section>

      {/* About Section */}
      <section ref={aboutSectionRef} id="about" className="container mx-auto py-24 md:py-32 px-6 md:px-10 lg:px-4">
        <h2 ref={aboutHeadingRef} className="text-4xl md:text-5xl font-bold mb-10 text-center text-gray-100">About Me</h2>
        <p ref={aboutParagraphRef} className="max-w-3xl mx-auto text-lg md:text-xl text-center leading-relaxed text-gray-300">
          Passionate about building beautiful, interactive, and performant web experiences.
          I thrive on challenges and constantly seek to learn and improve my skills.
          {/* Add more about yourself */}
        </p>
      </section>

      {/* Skills Section */}
      <section ref={skillsSectionRef} id="skills" className="bg-gray-800 py-24 md:py-32 px-6 md:px-10 lg:px-4">
        <h2 ref={skillsHeadingRef} className="text-4xl md:text-5xl font-bold mb-16 text-center text-gray-100">My Tech Stack</h2>
        <motion.div
          className="container mx-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 md:gap-8 text-center"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible" // Trigger stagger animation when container is in view
          viewport={{ once: true, amount: 0.2 }} // amount determines how much needs to be visible
        >
          {skills.map((skill) => (
            <motion.div
              key={skill}
              className="p-4 md:p-6 bg-gray-700 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
              variants={skillItemVariant} // Use the defined variant for children
              whileHover={{ scale: 1.05, y: -3, backgroundColor: 'rgb(75 85 99)' }} // Hover effect from Framer Motion
            >
              {/* Add icons here if desired */}
              <span className="text-base md:text-lg font-medium text-gray-200">{skill}</span>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Featured Work Teaser */}
      <section ref={featuredWorkSectionRef} id="featured-work" className="container mx-auto py-24 md:py-32 px-6 md:px-10 lg:px-4">
        <h2 ref={featuredWorkHeadingRef} className="text-4xl md:text-5xl font-bold mb-16 text-center text-gray-100">Featured Projects</h2>
        {/* Use Framer Motion for stagger reveal of placeholder cards */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {/* --- Replace with actual featured project data/component --- */}
          {[1, 2, 3].map((item) => (
             <motion.div
                key={item}
                className="bg-gray-800 rounded-lg shadow-lg p-6 text-center h-64 flex flex-col justify-center items-center" // Placeholder style
                variants={featuredCardVariant}
                whileHover={{ scale: 1.03, boxShadow: '0 10px 20px rgba(0,0,0,0.3)' }}
             >
                <h3 className="text-2xl font-semibold mb-3 text-white">Featured Project {item}</h3>
                <p className="text-gray-400">A short teaser description.</p>
                 {/* Add placeholder image/visual later */}
             </motion.div>
          ))}
          {/* --- End Placeholder --- */}
        </motion.div>
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }} // Delay slightly after cards might appear
        >
          <motion.a
            href="/portfolio"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg text-lg transition duration-300 shadow-md hover:shadow-lg"
            whileHover={{ scale: 1.05, y: -2 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            See All My Work
          </motion.a>
        </motion.div>
      </section>

      {/* Contact/CTA Section */}
      <motion.section
        id="contact"
        className="bg-gradient-to-t from-gray-900 to-gray-800 py-24 md:py-32 px-6 text-center"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={fadeIn} // Simple fade-in for the whole section container
      >
        <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-100">Get In Touch</h2>
        <p className="mb-10 text-lg md:text-xl text-gray-300 max-w-2xl mx-auto">
          I&apos;m always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
        </p>
        <div className="space-x-4">
          <motion.a
            href="mailto:your.email@example.com"
            className="inline-block bg-purple-600 hover:bg-purple-700 text-white font-medium py-3 px-6 rounded-lg transition duration-300 shadow hover:shadow-md"
            whileHover={{ scale: 1.05, y: -2 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            Email Me
          </motion.a>
          {/* Add LinkedIn, GitHub Links with similar motion wrappers */}
          <motion.a
            href="https://github.com/your-github-username" target="_blank" rel="noopener noreferrer"
            className="inline-block bg-gray-600 hover:bg-gray-500 text-white font-medium py-3 px-6 rounded-lg transition duration-300 shadow hover:shadow-md"
            whileHover={{ scale: 1.05, y: -2 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            GitHub
          </motion.a>
        </div>
      </motion.section>

      {/* Basic Footer (can be moved to Layout component) */}
      <footer className="text-center py-8 bg-gray-900 text-gray-500 text-sm">
        © {new Date().getFullYear()} Your Name. All Rights Reserved.
      </footer>
    </>
  );
}