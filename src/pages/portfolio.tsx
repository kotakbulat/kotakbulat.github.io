// src/pages/portfolio.tsx (or pages/portfolio.tsx)
import { GetStaticProps } from 'next';
import Head from 'next/head';
import { motion } from 'framer-motion';
import ProjectCard from '../components/ProjectCard'; // Make sure path is correct

// Assuming Repo interface and getStaticProps function are defined as before...
interface Repo {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  topics: string[];
  cover_image_url?: string; // Ensure this is populated if using covers
}

interface PortfolioProps {
  repos: Repo[];
}

export default function Portfolio({ repos }: PortfolioProps) {

  // Framer Motion Variants for the Grid
  const gridContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15, // Control delay between card animations
        delayChildren: 0.2, // Optional delay before starting children animation
      },
    },
  };

  return (
    <>
      <Head>
        <title>Portfolio - My Projects</title>
        <meta name="description" content="A selection of my development projects." />
      </Head>

      <section className="container mx-auto py-16 md:py-24 px-6 md:px-10 lg:px-4 min-h-screen">
        <motion.h1
          className="text-4xl md:text-5xl font-bold mb-12 md:mb-16 text-center text-gray-100"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
        >
          My Portfolio
        </motion.h1>

        {/* Optional Filters Section - Could use Framer Motion's AnimatePresence for filter changes */}

        {repos.length > 0 ? (
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10"
            variants={gridContainerVariants}
            initial="hidden"
            animate="visible" // Animate on initial load
          >
            {repos.map((repo) => (
              // Pass the variant to the ProjectCard, or handle animation within ProjectCard
              <ProjectCard key={repo.id} repo={repo} />
            ))}
          </motion.div>
        ) : (
          <motion.p
             className="text-center text-xl text-gray-400"
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             transition={{ delay: 0.5 }}
          >
              Looks like I need to add some projects here! Check back soon.
          </motion.p>
        )}
      </section>

      {/* Basic Footer (can be moved to Layout component) */}
       <footer className="text-center py-8 bg-gray-900 text-gray-500 text-sm">
         © {new Date().getFullYear()} Your Name. All Rights Reserved.
       </footer>
    </>
  );
}

// --- getStaticProps function remains the same as defined previously ---
export const getStaticProps: GetStaticProps<PortfolioProps> = async () => {
    // ... (Your existing GitHub API fetch logic) ...

    // Example structure (replace with your actual fetch logic)
    const repos: Repo[] = []; // Fetch your repos here

    return {
      props: {
        repos,
      },
      // revalidate: 60 * 60 * 1, // Optional: Revalidate every hour if needed
    };
};