// src/lib/github.ts
// REMOVED: import type { Repo, GitHubRepoAPIResponse } from '../types/github'; // No longer needed

// --- Define Interfaces Directly Here ---
// Make sure these are exported so other files (like index.tsx, portfolio.tsx) can import them
export interface Repo {
    id: number;
    name: string;
    description: string | null;
    html_url: string;
    homepage: string | null;
    topics: string[];
    cover_image_url?: string;
  }
  
  export interface GitHubRepoAPIResponse {
      id: number;
      name: string;
      description: string | null;
      html_url: string;
      homepage: string | null;
      topics?: string[]; // Topics array might be missing in raw response
      fork: boolean;
  }
  // --- End Interfaces ---
  
  // --- Cover Image Mapping ---
  const coverImageMap: { [key: string]: string } = {
      'learn-restfulapi': '/images/covers/restfulapi.jpg',
      'learn-nextjs-more': '/images/covers/nextjs.jpg',
      'learn-analysis-visual': '/images/covers/data.jpg',
      'learn-nodejs': '/images/covers/nodejs.jpg',
      'kotakbulat.github.io': '/images/covers/cover.png',
      'hoki-portofolio': '/images/covers/portfolio-cover.png',
      // Add more entries here...
  };
  
  // --- Main Fetching Function ---
  export async function fetchPortfolioRepos(): Promise<Repo[]> {
      console.log("fetchPortfolioRepos: Starting data fetch...");
  
      const username = process.env.GITHUB_USERNAME;
      const token = process.env.GITHUB_TOKEN;
  
      if (!username || !token) {
          console.error("fetchPortfolioRepos CRITICAL ERROR: GITHUB_USERNAME or GITHUB_TOKEN environment variable is missing.");
          return [];
      }
  
      const GITHUB_API_URL = `https://api.github.com/users/${username}/repos?sort=pushed&direction=desc&per_page=100`;
      const fetchOptions = {
          headers: {
              Authorization: `token ${token}`,
              Accept: 'application/vnd.github.v3+json',
          },
      };
  
      let finalRepos: Repo[] = [];
  
      try {
          console.log(`fetchPortfolioRepos: Fetching from ${GITHUB_API_URL}`);
          const response = await fetch(GITHUB_API_URL, fetchOptions);
  
          if (!response.ok) {
              const errorBody = await response.text();
              console.error(`fetchPortfolioRepos Error: GitHub API request failed! Status: ${response.status}. Response: ${errorBody}`);
              return [];
          }
  
          const fetchedReposRaw: GitHubRepoAPIResponse[] = await response.json();
          console.log(`fetchPortfolioRepos: Fetched ${fetchedReposRaw.length} total repos from GitHub.`);
  
          const portfolioTopics = ['portfolio', 'showcase', 'featured', 'project'];
          const filteredReposRaw = fetchedReposRaw.filter(repo =>
              !repo.fork &&
              repo.topics && // Ensure topics array exists before accessing it
              // FIX: Add explicit type ': string' to the topic parameter
              repo.topics.some((topic: string) => portfolioTopics.includes(topic.toLowerCase()))
          );
          console.log(`fetchPortfolioRepos: Filtered down to ${filteredReposRaw.length} repos.`);
  
          finalRepos = filteredReposRaw.map(rawRepo => ({
              id: rawRepo.id,
              name: rawRepo.name,
              description: rawRepo.description,
              html_url: rawRepo.html_url,
              homepage: rawRepo.homepage,
              topics: rawRepo.topics || [], // Use || [] as fallback, though filter should prevent undefined
              cover_image_url: coverImageMap[rawRepo.name] || undefined,
          }));
  
          console.log("fetchPortfolioRepos: Mapping complete.");
  
      } catch (error: unknown) {
          console.error("fetchPortfolioRepos UNEXPECTED Error:", error instanceof Error ? error.message : String(error));
          finalRepos = [];
      }
  
      console.log(`fetchPortfolioRepos: Fetch process complete. Returning ${finalRepos.length} repos.`);
      return finalRepos;
  }