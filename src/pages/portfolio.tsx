// src/pages/portfolio.tsx
import { GetStaticProps } from 'next';
import Head from 'next/head';
import { motion } from 'framer-motion';
import ProjectCard from '../components/ProjectCard'; // Ensure this component uses repo.cover_image_url

// --- Repo Interface and Props ---
interface Repo {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  homepage: string | null; // Live demo URL
  topics: string[];
  cover_image_url?: string; // Optional path to the cover image (relative to /public)
}
interface PortfolioProps {
  repos: Repo[];
  // Optional: Add an error flag if needed for more complex UI error handling
  // error?: string;
}

export default function Portfolio({ repos }: PortfolioProps) {
  // --- Framer Motion Variants ---
  const gridContainerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.2 } },
  };

  // Optional: Handle error state in UI if passed from getStaticProps
  // if (error) {
  //   return <div>Error loading portfolio: {error}</div>;
  // }

  return (
    <>
      <Head>
        <title>Portfolio - Hoki Wijaya Projects</title>
        <meta name="description" content="A selection of development projects by Hoki Wijaya." />
      </Head>

      {/* Main Portfolio Section with ARIA labelling */}
      <section
        aria-labelledby="portfolio-heading" // Link section to its heading for accessibility
        className="container mx-auto py-16 md:py-24 px-6 md:px-10 lg:px-4 min-h-screen"
      >
        <motion.h1
          id="portfolio-heading" // ID for aria-labelledby
          className="text-4xl md:text-5xl font-bold mb-12 md:mb-16 text-center text-gray-800 dark:text-gray-100"
          initial={{ opacity: 0, y: -30 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
        >
          My Portfolio
        </motion.h1>

        {repos.length > 0 ? (
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10"
            variants={gridContainerVariants} initial="hidden" animate="visible"
          >
            {/* Map through the repositories and render ProjectCard for each */}
            {repos.map((repo) => (
              <ProjectCard key={repo.id} repo={repo} />
            ))}
          </motion.div>
        ) : (
          // Display message if no repositories are found/loaded
          <motion.p className="text-center text-xl text-gray-500 dark:text-gray-400" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
              Looks like I need to add some projects here or check the configuration! Check back soon.
          </motion.p>
        )}
      </section>

      {/* Footer */}
       <footer className="text-center py-8 bg-gray-200 dark:bg-gray-900 text-gray-600 dark:text-gray-500 text-sm">
         © {new Date().getFullYear()} Hoki Wijaya. All Rights Reserved.
       </footer>
    </>
  );
}

// --- getStaticProps function: Fetches data at build time ---
export const getStaticProps: GetStaticProps<PortfolioProps> = async () => {
   console.log("Portfolio getStaticProps: Starting data fetch...");
   let repos: Repo[] = []; // Initialize empty array
   const username = process.env.GITHUB_USERNAME;
   const token = process.env.GITHUB_TOKEN;

   // Crucial check for environment variables during build
   if (!username || !token) {
     console.error("Portfolio getStaticProps Error: GITHUB_USERNAME or GITHUB_TOKEN is missing in environment variables.");
     // Return empty props, UI will show the "no projects" message
     return { props: { repos: [] } };
   }

   // GitHub API URL to fetch user repositories, sorted by last push, limit results
   const GITHUB_API_URL = `https://api.github.com/users/${username}/repos?sort=pushed&direction=desc&per_page=50`;
   const fetchOptions = {
       headers: {
           // Use token for higher rate limits and access to private repo info if needed (though we filter public ones)
           Authorization: `token ${token}`,
           Accept: 'application/vnd.github.v3+json', // Recommended Accept header
       },
   };

  try {
    console.log(`Portfolio getStaticProps: Fetching from ${GITHUB_API_URL}`);
    const response = await fetch(GITHUB_API_URL, fetchOptions);

    if (!response.ok) {
      // Log detailed error message from GitHub API if available
      const errorBody = await response.text();
      console.error(`Portfolio getStaticProps Error: GitHub API request failed with status ${response.status}. Response: ${errorBody}`);
      // Throwing error here will cause the build to fail if desired, or return empty props below
      throw new Error(`Failed to fetch repos: ${response.status}`);
    }

     let fetchedRepos: any[] = await response.json();
     console.log(`Portfolio getStaticProps: Fetched ${fetchedRepos.length} total repos.`);

     // --- Filtering Logic ---
     // Filter repositories based on specific topics (adjust as needed)
     const portfolioTopics = ['portfolio', 'showcase', 'featured']; // Add more topics if you use them
     repos = fetchedRepos
       .filter(repo =>
           !repo.fork && // Often good to exclude forks
           repo.topics?.some((topic: string) => portfolioTopics.includes(topic.toLowerCase()))
       )
       .map(repo => ({ // Map to your stricter Repo interface
         id: repo.id,
         name: repo.name,
         description: repo.description,
         html_url: repo.html_url,
         homepage: repo.homepage, // This comes directly from the 'Website' field on GitHub repo settings
         topics: repo.topics || [],
         // cover_image_url will be added next
       }));

     console.log(`Portfolio getStaticProps: Filtered down to ${repos.length} repos based on topics: [${portfolioTopics.join(', ')}]`);

     // --- (Optional) Additional Sorting Logic ---
     // Example: Sort alphabetically by name AFTER filtering (API already sorts by pushed date)
     // repos.sort((a, b) => a.name.localeCompare(b.name));

     // --- Cover Image Mapping ---
     // Define a map where keys are EXACT repository names and values are paths
     // relative to the /public directory.
     const coverImageMap: { [key: string]: string } = {
         // --- ADD YOUR REPOSITORY NAMES AND IMAGE PATHS HERE ---
         'learn-restfulapi': '/images/covers/restfulapi.jpg', // Example
         'learn-nextjs-more': '/images/covers/nextjs.jpg',  
         'learn-analysis-visual': '/images/covers/data.jpg',
         'learn-nodejs': '/images/covers/nodejs.jpg',     // Example
         'kotakbulat.github.io': '/images/covers/cover.png',  // Example
         // 'another-repo': '/images/covers/another-cover.webp',
         // ... add more entries for each project you want a cover for
     };

     // Add the cover_image_url to each repo object based on the map
     repos = repos.map(repo => ({
         ...repo,
         cover_image_url: coverImageMap[repo.name], // Assigns the path if repo.name matches a key in coverImageMap
     }));

     console.log("Portfolio getStaticProps: Cover images mapped.");


  } catch (error: any) { // Catch any error during fetch or processing
     console.error("Portfolio getStaticProps Error: Failed to fetch or process portfolio repos.", error.message);
     repos = []; // Ensure repos is empty on any error to prevent build issues
     // Optional: pass error message to props if you want to display it
     // return { props: { repos: [], error: error.message } };
  }

  // Return the fetched and processed data as props
  return {
      props: {
          repos, // Pass the final array of repos
      },
      // Incremental Static Regeneration (ISR) - Optional
      // Re-fetches data in the background after 'revalidate' seconds without needing a full rebuild
      // Good for portfolios that don't change every minute but might update daily/hourly
      revalidate: 3600, // Revalidate approx every 1 hour (in seconds)
  };
};