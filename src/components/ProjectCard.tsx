// src/components/ProjectCard.tsx
import { motion } from 'framer-motion';
import Image from 'next/image';
import { ArrowTopRightOnSquareIcon, CodeBracketIcon, LinkIcon } from '@heroicons/react/24/outline';

// --- Repo Interface ---
interface Repo { id: number; name: string; description: string | null; html_url: string; homepage: string | null; topics: string[]; cover_image_url?: string; }
interface ProjectCardProps { repo: Repo; }

// --- Framer Motion Variant ---
const cardVariant = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: [0.6, 0.05, -0.01, 0.9] } },
};

const ProjectCard = ({ repo }: ProjectCardProps) => {
  return (
    <motion.div
      className="bg-white dark:bg-gray-800 rounded-lg shadow-md dark:shadow-lg overflow-hidden flex flex-col h-full border border-gray-200 dark:border-gray-700 group relative transition-colors duration-300" // Added group, relative, border, theme colors
      variants={cardVariant}
      whileHover={{ y: -5, boxShadow: '0 10px 15px -3px rgba(0,0,0,0.07), 0 4px 6px -4px rgba(0,0,0,0.07)' /* Adjusted shadow */ }}
      layout // Keep layout animation
    >
      {/* Cover Image Container */}
      <div className="relative h-48 w-full bg-gradient-to-br from-gray-300 to-gray-400 dark:from-gray-600 dark:to-gray-700 overflow-hidden">
        {repo.cover_image_url ? (
          <Image
            src={repo.cover_image_url} alt={`${repo.name} cover image`}
            layout="fill" objectFit="cover" unoptimized
            className="transition-transform duration-400 ease-in-out group-hover:scale-110" // Image scale on group hover
          />
        ) : (
          <div className="flex items-center justify-center h-full"><span className="text-gray-500 dark:text-gray-400 text-sm italic">No Preview</span></div>
        )}

        {/* HOVER REVEAL ELEMENT */}
        <motion.div
          className="absolute inset-0 bg-black/60 dark:bg-black/75 flex items-center justify-center p-4 cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out" // Use group-hover for opacity transition
          // Remove Framer Motion animation props here, handled by CSS group-hover now for potentially better performance consistency
          onClick={() => repo.html_url && window.open(repo.html_url, '_blank')}
        >
          <div className="text-center transform scale-90 group-hover:scale-100 transition-transform duration-300 ease-in-out"> {/* Scale effect on hover */}
            <ArrowTopRightOnSquareIcon className="w-8 h-8 text-white mx-auto mb-2" />
            <p className="text-white font-semibold text-lg">View Project</p>
          </div>
        </motion.div>
      </div>

      {/* Card Content */}
      <div className="p-5 md:p-6 flex flex-col flex-grow">
        <h3 className="text-xl lg:text-2xl font-semibold mb-2 text-gray-900 dark:text-white">{repo.name}</h3>
        <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 flex-grow line-clamp-3">{repo.description || 'No description provided.'}</p>
        <div className="flex flex-wrap gap-1.5 mb-4">
          {repo.topics?.map(topic => (
            <span key={topic} className="bg-gray-200 dark:bg-gray-700 text-xs font-medium px-2.5 py-0.5 rounded-full text-gray-700 dark:text-gray-300">{topic}</span>
          ))}
        </div>
        <div className="flex justify-between items-center mt-auto pt-4 border-t border-gray-200 dark:border-gray-700/50">
          <a href={repo.html_url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors duration-300">
            <CodeBracketIcon className="w-4 h-4 mr-1.5" /> Code
          </a>
          {repo.homepage && (
            <a href={repo.homepage} target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-sm font-medium text-green-600 dark:text-green-400 hover:text-green-800 dark:hover:text-green-300 transition-colors duration-300">
              <LinkIcon className="w-4 h-4 mr-1.5" /> Live Demo
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;