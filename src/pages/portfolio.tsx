// src/pages/portfolio.tsx
import { GetStaticProps } from 'next';
import Head from 'next/head';
import { motion } from 'framer-motion';
import ProjectCard from '../components/ProjectCard'; // Ensure this component uses repo.cover_image_url
import Navbar from '../components/Navbar'; // Assuming Navbar is used, adjust path if needed

// --- Interfaces ---

// Interface for the final data structure used by the Portfolio component
interface Repo {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  homepage: string | null; // Live demo URL from GitHub 'Website' field
  topics: string[];
  cover_image_url?: string; // Optional path relative to /public
}

// Interface matching the relevant parts of the raw GitHub API response
// Needed because the API response has more fields than our final 'Repo' interface
interface GitHubRepoAPIResponse {
    id: number;
    name: string;
    description: string | null;
    html_url: string;
    homepage: string | null;
    topics?: string[]; // Topics array might be missing
    fork: boolean;    // Property used for filtering
    // Add other fields here if needed for filtering/sorting (e.g., pushed_at, stargazers_count)
}

// Props for the Portfolio page component
interface PortfolioProps {
  repos: Repo[];
  // Optional: You could pass an error message for more specific UI feedback
  // error?: string;
}

// --- Portfolio Page Component ---
export default function Portfolio({ repos }: PortfolioProps) {

  // --- Framer Motion Variants ---
  const gridContainerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.2 } },
  };

  return (
    <>
      {/* Assume Navbar is used globally or imported here */}
      <Navbar />

      <Head>
        <title>Portfolio - Hoki Wijaya Projects</title>
        <meta name="description" content="A selection of development projects by Hoki Wijaya." />
        {/* Add other meta tags as needed (Open Graph, etc.) */}
      </Head>

      {/* Main Portfolio Section */}
      <section
        aria-labelledby="portfolio-heading" // Accessibility: Links heading to section
        className="container mx-auto py-16 md:py-24 px-6 md:px-10 lg:px-4 min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-300" // Added background and transition
      >
        <motion.h1
          id="portfolio-heading" // Target for aria-labelledby
          className="text-4xl md:text-5xl font-bold mb-12 md:mb-16 text-center text-gray-900 dark:text-white"
          initial={{ opacity: 0, y: -30 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
        >
          My Portfolio
        </motion.h1>

        {/* Conditional Rendering: Show grid if repos exist, otherwise show message */}
        {repos && repos.length > 0 ? (
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10"
            variants={gridContainerVariants} initial="hidden" animate="visible"
          >
            {/* Map through the repositories and render ProjectCard for each */}
            {repos.map((repo) => (
              // Ensure ProjectCard handles the 'repo' object correctly
              <ProjectCard key={repo.id} repo={repo} />
            ))}
          </motion.div>
        ) : (
          // Display message if no repositories are found or an error occurred during fetch
          <motion.p
            className="text-center text-xl text-gray-600 dark:text-gray-400"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
          >
            Looks like I need to add some projects here, tag them correctly on GitHub, or check the configuration!
          </motion.p>
        )}
      </section>

      {/* Footer */}
       <footer className="text-center py-8 bg-gray-200 dark:bg-gray-900 text-gray-600 dark:text-gray-500 text-sm transition-colors duration-300">
         © {new Date().getFullYear()} Hoki Wijaya. All Rights Reserved.
         {/* Optional: Add link back to Dennis Snellenberg if desired for credit */}
         {/* <span className="block mt-1">Inspired by dennissnellenberg.com</span> */}
       </footer>
    </>
  );
}

// --- getStaticProps: Fetches data at build time ---
export const getStaticProps: GetStaticProps<PortfolioProps> = async () => {
   console.log("Portfolio getStaticProps: Starting data fetch...");

   const username = process.env.GITHUB_USERNAME;
   const token = process.env.GITHUB_TOKEN;

   // --- Environment Variable Check ---
   if (!username || !token) {
     console.error("Portfolio getStaticProps CRITICAL ERROR: GITHUB_USERNAME or GITHUB_TOKEN environment variable is missing.");
     // Return empty props; the page component will display the "no projects" message.
     return { props: { repos: [] } };
     // For stricter builds, you might want to throw an error:
     // throw new Error("Missing GitHub credentials in environment variables.");
   }

   // --- GitHub API Fetch Setup ---
   const GITHUB_API_URL = `https://api.github.com/users/${username}/repos?sort=pushed&direction=desc&per_page=100`; // Fetch more initially if needed
   const fetchOptions = {
       headers: {
           Authorization: `token ${token}`,
           Accept: 'application/vnd.github.v3+json',
       },
       // Optional: Increase timeout if GitHub API is slow
       // signal: AbortSignal.timeout(15000) // 15 second timeout
   };

   let finalRepos: Repo[] = []; // Initialize empty array for final results

   try {
       // --- Fetch Data ---
       console.log(`Portfolio getStaticProps: Fetching from ${GITHUB_API_URL}`);
       const response = await fetch(GITHUB_API_URL, fetchOptions);

       if (!response.ok) {
           const errorBody = await response.text();
           console.error(`Portfolio getStaticProps Error: GitHub API request failed! Status: ${response.status}. Response: ${errorBody}`);
           // Decide how to handle API errors: return empty or throw to fail build
           // Option 1: Return empty (graceful degradation)
            return { props: { repos: [] } };
           // Option 2: Throw error (fails the build)
           // throw new Error(`GitHub API Error (${response.status}): ${errorBody}`);
       }

       // --- Parse and Type Raw Data ---
       // Use the broader interface for the initial fetch result
       const fetchedReposRaw: GitHubRepoAPIResponse[] = await response.json();
       console.log(`Portfolio getStaticProps: Fetched ${fetchedReposRaw.length} total repos from GitHub.`);

       // --- Filtering Logic ---
       const portfolioTopics = ['portfolio', 'showcase', 'featured', 'project']; // Add/remove topics as needed
       const filteredReposRaw = fetchedReposRaw.filter(repo =>
           !repo.fork && // Exclude repositories that are forks
           repo.topics && // Ensure topics array exists
           repo.topics.some(topic => portfolioTopics.includes(topic.toLowerCase())) // Check if any topic matches
       );
       console.log(`Portfolio getStaticProps: Filtered down to ${filteredReposRaw.length} repos based on topics: [${portfolioTopics.join(', ')}] and not being forks.`);


       // --- Mapping to Final Data Structure ---
       // Transform the raw filtered data into the 'Repo' structure needed by the component
       finalRepos = filteredReposRaw.map(rawRepo => ({
           id: rawRepo.id,
           name: rawRepo.name,
           description: rawRepo.description,
           html_url: rawRepo.html_url,
           homepage: rawRepo.homepage,
           topics: rawRepo.topics || [], // Default to empty array if topics were missing (shouldn't happen after filter)
           // cover_image_url will be added in the next step
       }));

       // --- Cover Image Mapping ---
       const coverImageMap: { [key: string]: string } = {
           // --- RepositoryNameOnGitHub: '/path/to/image/in/public/folder.jpg' ---
           'learn-restfulapi': '/images/covers/restfulapi.jpg',
           'learn-nextjs-more': '/images/covers/nextjs.jpg',
           'learn-analysis-visual': '/images/covers/data.jpg',
           'learn-nodejs': '/images/covers/nodejs.jpg',
           'kotakbulat.github.io': '/images/covers/cover.png',
           'hoki-portofolio': '/images/covers/portfolio-cover.png', // Added from previous example
           // Add more entries here... Ensure keys EXACTLY match GitHub repo names
       };

       finalRepos = finalRepos.map(repo => ({
           ...repo,
           cover_image_url: coverImageMap[repo.name] || undefined, // Assign path or undefined if no match
       }));
       console.log("Portfolio getStaticProps: Cover images mapped.");

       // --- (Optional) Additional Sorting ---
       // finalRepos.sort((a, b) => a.name.localeCompare(b.name)); // Example: Sort alphabetically

   } catch (error: unknown) { // Catch network errors or other unexpected issues
       console.error("Portfolio getStaticProps UNEXPECTED Error:", error instanceof Error ? error.message : String(error));
       finalRepos = []; // Ensure result is empty on failure
       // Optional: Pass error message to props
       // return { props: { repos: [], error: error instanceof Error ? error.message : "An unknown error occurred" } };
   }

   console.log(`Portfolio getStaticProps: Fetch process complete. Returning ${finalRepos.length} repos.`);

   // --- Return Props ---
   return {
       props: {
           repos: finalRepos,
       },
       // Incremental Static Regeneration (ISR) Configuration
       revalidate: 3600, // Re-generate the page in the background at most once per hour (3600 seconds)
       // Use 'false' for pure SSG (only rebuild on new deployment)
       // Use a smaller number (e.g., 60) for more frequent updates, but consider build server load/costs
   };
};