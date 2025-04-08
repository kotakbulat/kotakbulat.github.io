// src/components/ProjectCard.tsx (or components/ProjectCard.tsx)
import { motion } from 'framer-motion';
import Image from 'next/image';

// Assuming Repo interface is accessible or defined here
interface Repo {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  topics: string[];
  cover_image_url?: string;
}

interface ProjectCardProps {
  repo: Repo;
}

// Framer Motion Variant for individual card entrance animation
const cardVariant = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: [0.6, 0.05, -0.01, 0.9], // Example custom ease
    },
  },
};

const ProjectCard = ({ repo }: ProjectCardProps) => {
  return (
    // Apply the variant defined above
    <motion.div
      className="bg-gray-800 rounded-lg shadow-lg overflow-hidden flex flex-col h-full border border-transparent hover:border-blue-500 transition-colors duration-300" // Ensure cards maintain height and add hover border
      variants={cardVariant} // This will be animated by the parent's stagger
      whileHover={{ y: -6, boxShadow: '0 15px 25px rgba(0, 0, 0, 0.4)' }} // Framer Motion hover effect
      // layout // Uncomment if card position might change due to filtering, helps animate layout shifts
    >
      {/* Cover Image */}
      <div className="relative h-48 w-full bg-gradient-to-br from-gray-600 to-gray-700">
        {repo.cover_image_url ? (
          <Image
            src={repo.cover_image_url}
            alt={`${repo.name} cover image`}
            layout="fill"
            objectFit="cover"
            unoptimized // Remember unoptimized is needed for next export
            className="transition-transform duration-300 group-hover:scale-105" // Optional scale on hover (group needed on parent if applying here)
          />
        ) : (
          <div className="flex items-center justify-center h-full">
             <span className="text-gray-400 text-sm italic">No Preview Available</span>
          </div>
        )}
      </div>

      {/* Card Content */}
      <div className="p-5 md:p-6 flex flex-col flex-grow">
        <h3 className="text-xl lg:text-2xl font-semibold mb-2 text-white">{repo.name}</h3>
        <p className="text-gray-400 text-sm mb-4 flex-grow">{repo.description || 'Click to view repository.'}</p>
        <div className="flex flex-wrap gap-2 mb-4">
          {repo.topics?.map(topic => (
            <span key={topic} className="bg-gray-700 text-xs font-semibold px-2.5 py-0.5 rounded text-gray-300">{topic}</span>
          ))}
        </div>
        <div className="flex justify-between items-center mt-auto pt-4 border-t border-gray-700/50">
          <motion.a
             href={repo.html_url} target="_blank" rel="noopener noreferrer"
             className="text-blue-400 hover:text-blue-300 transition-colors duration-300 text-sm font-medium"
             whileHover={{ x: -2 }} // Subtle shift on hover
          >
            View Code →
          </motion.a>
          {repo.homepage && (
            <motion.a
              href={repo.homepage} target="_blank" rel="noopener noreferrer"
              className="bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 text-white text-xs font-bold py-1.5 px-3 rounded-md transition-all duration-300 shadow hover:shadow-md"
              whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
            >
              Live Demo
            </motion.a>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;