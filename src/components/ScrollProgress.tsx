import React from 'react';
import { motion, useScroll, useSpring } from 'motion/react';

/**
 * Hairline reading-progress bar pinned to the very top of the viewport.
 * Springed so it glides rather than tracking the wheel one-to-one.
 */
export const ScrollProgress: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <motion.div
      style={{ scaleX }}
      aria-hidden="true"
      className="fixed top-0 left-0 right-0 h-[2px] origin-left z-[60] bg-gradient-to-r from-accent via-accent-soft to-accent"
    />
  );
};
