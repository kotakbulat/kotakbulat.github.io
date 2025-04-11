// src/components/ThemeToggleButton.tsx
import { motion } from 'framer-motion';
import { SunIcon, MoonIcon } from '@heroicons/react/24/solid';

interface ThemeToggleButtonProps {
  toggleTheme: () => void;
  currentTheme: string;
}

const ThemeToggleButton = ({ toggleTheme, currentTheme }: ThemeToggleButtonProps) => {
  return (
    <motion.button
      onClick={toggleTheme}
      className="fixed bottom-6 right-6 z-[100] p-3 bg-gray-200 dark:bg-gray-700 rounded-full shadow-lg text-yellow-500 dark:text-yellow-400 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors duration-200"
      aria-label="Toggle theme"
      whileHover={{
        scale: 1.1,
        rotate: 15 // <<< Simplified rotate to a single value
      }}
      whileTap={{ scale: 0.9 }}
      // Keep the spring transition - it works well with single target values
      transition={{ type: 'spring', stiffness: 400, damping: 17 }}
      key={currentTheme}
    >
      <motion.div
        // Keep the icon animation as is
        initial={{ opacity: 0, rotate: -90, scale: 0.5 }}
        animate={{ opacity: 1, rotate: 0, scale: 1 }}
        exit={{ opacity: 0, rotate: 90, scale: 0.5 }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
      >
        {currentTheme === 'dark' ? (
          <SunIcon className="w-6 h-6" />
        ) : (
          <MoonIcon className="w-6 h-6 text-indigo-600" />
        )}
      </motion.div>
    </motion.button>
  );
};

export default ThemeToggleButton;