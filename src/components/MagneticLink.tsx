// src/components/MagneticLink.tsx
import React, { useRef, useEffect, ReactNode, useState } from 'react';
import { gsap } from 'gsap';
import { motion } from 'framer-motion';

interface MagneticLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  children: ReactNode; // Expecting just the text string usually
  className?: string;
  pullContainerForce?: number; // How much the main link area pulls
  pullTextForce?: number; // How much the inner text pulls (less usually)
  maxDistance?: number;
  resetEase?: string;
  pullEaseDuration?: number;
}

const MagneticLink: React.FC<MagneticLinkProps> = ({
  children,
  className = '',
  pullContainerForce = 0.4, // Adjust this - Force for the main container
  pullTextForce = 0.6,      // Adjust this - Force for the inner text (often slightly more)
  maxDistance = 80,
  resetEase = 'elastic.out(1, 0.45)',
  pullEaseDuration = 0.3,
  href, // Expect href for navigation
  target,
  rel,
  'aria-label': ariaLabel,
  // Capture rest, but be cautious spreading unknown props to motion.a
  ...restProps
}) => {
  const linkRef = useRef<HTMLAnchorElement>(null);
  const textRef = useRef<HTMLSpanElement>(null); // Ref for the inner text span
  const [isHovering, setIsHovering] = useState(false);

  // Separate quickTo for container and text
  const xContainerTo = useRef<gsap.QuickToFunc | null>(null);
  const yContainerTo = useRef<gsap.QuickToFunc | null>(null);
  const xTextTo = useRef<gsap.QuickToFunc | null>(null);
  const yTextTo = useRef<gsap.QuickToFunc | null>(null);

  useEffect(() => {
    const linkElement = linkRef.current;
    const textElement = textRef.current;
    if (!linkElement || !textElement) return;

    // Initialize quickTo for both elements
    xContainerTo.current = gsap.quickTo(linkElement, "x", { duration: pullEaseDuration, ease: "power2.out" });
    yContainerTo.current = gsap.quickTo(linkElement, "y", { duration: pullEaseDuration, ease: "power2.out" });
    xTextTo.current = gsap.quickTo(textElement, "x", { duration: pullEaseDuration, ease: "power2.out" });
    yTextTo.current = gsap.quickTo(textElement, "y", { duration: pullEaseDuration, ease: "power2.out" });

    const handleMouseMove = (event: MouseEvent) => {
      if (!linkElement || !isHovering) return; // Only act if hovering

      const { clientX, clientY } = event;
      const { height, width, left, top } = linkElement.getBoundingClientRect();
      const centerX = left + width / 2;
      const centerY = top + height / 2;
      const deltaX = clientX - centerX;
      const deltaY = clientY - centerY;
      const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

      let targetContainerX = 0, targetContainerY = 0;
      let targetTextX = 0, targetTextY = 0;

      if (distance < maxDistance * 1.5) { // Only pull if reasonably close
        targetContainerX = deltaX * pullContainerForce;
        targetContainerY = deltaY * pullContainerForce;
        targetTextX = deltaX * pullTextForce; // Apply different force to text
        targetTextY = deltaY * pullTextForce;
      }

      // Use quickTo for smooth following
      xContainerTo.current?.(targetContainerX);
      yContainerTo.current?.(targetContainerY);
      xTextTo.current?.(targetTextX);
      yTextTo.current?.(targetTextY);
    };

    const handleMouseEnter = () => { setIsHovering(true); };
    const handleMouseLeave = () => {
      setIsHovering(false);
      // Animate both elements back to center
      gsap.to([linkElement, textElement], { // Target both refs
        x: 0,
        y: 0,
        duration: 0.6,
        ease: resetEase
      });
    };

    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (!isTouchDevice) {
      document.addEventListener('mousemove', handleMouseMove);
      linkElement.addEventListener('mouseenter', handleMouseEnter);
      linkElement.addEventListener('mouseleave', handleMouseLeave);
    }
    return () => {
      if (!isTouchDevice) {
        document.removeEventListener('mousemove', handleMouseMove);
        linkElement.removeEventListener('mouseenter', handleMouseEnter);
        linkElement.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }, [isHovering, pullContainerForce, pullTextForce, maxDistance, resetEase, pullEaseDuration]);

  // Props specifically for the <a> tag
  const linkProps = { href, target, rel, 'aria-label': ariaLabel };

  return (
    // Use motion.a as the main interactive element
    <motion.a
      ref={linkRef}
      className={`relative inline-flex items-center justify-center rounded-full overflow-hidden cursor-pointer group ${className}`} // Base styling, crucially overflow-hidden
      {...linkProps} // Spread only known safe <a> props
      whileTap={{ scale: 0.95 }}
      // Remove whileHover from framer, GSAP handles the visual hover state now
      transition={{ type: 'spring', stiffness: 400, damping: 15 }} // Keep tap effect
      style={{ willChange: 'transform' }} // Hint browser about transforms
    >
      {/* Background Fill Element */}
      <motion.div
        className="absolute inset-0 w-full h-full bg-blue-600 dark:bg-blue-500 scale-y-0 group-hover:scale-y-100 origin-bottom" // Fill effect
        style={{ zIndex: 1, willChange: 'transform' }}
        transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }} // Smooth cubic bezier for fill
      />

      {/* Text Container (Moves Independently) */}
      <span
        ref={textRef}
        className="relative block text-center px-8 py-3" // Ensure padding is here for size
        style={{ zIndex: 2, willChange: 'transform' }} // Text is above fill
      >
        {/* Inner Text Span (for styling) */}
        <span className="relative block text-white dark:text-white mix-blend-difference"> {/* Use mix-blend for text color inversion */}
          {children}
        </span>
      </span>
    </motion.a>
  );
};

export default MagneticLink;