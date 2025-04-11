// src/pages/_app.tsx
import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { useState, useEffect } from 'react';
import Lenis from '@studio-freight/lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import ThemeToggleButton from '../components/ThemeToggleButton';

// Register GSAP Plugin
gsap.registerPlugin(ScrollTrigger);

function MyApp({ Component, pageProps }: AppProps) {
  // --- Theme State ---
  const [theme, setTheme] = useState('dark'); // Default theme

  // Load theme from localStorage on initial mount
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const initialTheme = savedTheme || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    setTheme(initialTheme); // Set state based on saved or system preference
    if (initialTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  // --- Lenis Smooth Scroll ---
  useEffect(() => {
    const lenis = new Lenis();
    function raf(time: number) { lenis.raf(time); requestAnimationFrame(raf); }
    const rafId = requestAnimationFrame(raf);
    return () => { cancelAnimationFrame(rafId); lenis.destroy(); };
  }, []);

  // --- Theme Toggle Function ---
  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme); // Save preference
    if (newTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  return (
    <>
      {/* Theme Toggle Button - Always visible */}
      <ThemeToggleButton currentTheme={theme} toggleTheme={toggleTheme} />
      {/* Render the current page */}
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;