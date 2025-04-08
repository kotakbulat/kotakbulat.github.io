// src/pages/_app.tsx (or pages/_app.tsx)
import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { useEffect } from 'react';
import Lenis from '@studio-freight/lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
// Optional: Import Layout component if you use one
// import Layout from '../components/Layout';

// Register GSAP ScrollTrigger plugin globally
gsap.registerPlugin(ScrollTrigger);

function MyApp({ Component, pageProps }: AppProps) {

  // Lenis Smooth Scroll Effect
  useEffect(() => {
    const lenis = new Lenis();

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    const rafId = requestAnimationFrame(raf);

    // Cleanup on component unmount
    return () => {
      cancelAnimationFrame(rafId); // Cancel the frame request
      lenis.destroy(); // Destroy the Lenis instance
    };
  }, []); // Empty dependency array ensures it runs only once

  // Optional: Wrap with Layout
  // return (
  //   <Layout>
  //      <Component {...pageProps} />
  //   </Layout>
  // )

  // Without Layout
  return <Component {...pageProps} />;
}

export default MyApp;