import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useMotionTemplate, useSpring } from 'motion/react';

/**
 * A large, very faint cobalt glow that trails the cursor across the whole page.
 *
 * It is deliberately subtle — you should never catch it as "an effect", only
 * notice that the dark surface feels lit rather than flat. Driven by motion
 * values so it never triggers a React re-render.
 */
export const AmbientLight: React.FC = () => {
  const [enabled, setEnabled] = useState(false);

  const mouseX = useMotionValue(-1000);
  const mouseY = useMotionValue(-1000);

  const x = useSpring(mouseX, { stiffness: 60, damping: 25, mass: 0.6 });
  const y = useSpring(mouseY, { stiffness: 60, damping: 25, mass: 0.6 });

  const background = useMotionTemplate`radial-gradient(650px circle at ${x}px ${y}px, rgba(0, 82, 255, 0.07), transparent 65%)`;

  useEffect(() => {
    // Pointer-driven only: skip on touch devices and when motion is reduced.
    const isFinePointer = window.matchMedia('(pointer: fine)').matches;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!isFinePointer || prefersReducedMotion) return;

    setEnabled(true);

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  if (!enabled) return null;

  return (
    // Every section paints its own opaque background, so this has to sit *above*
    // the content and blend additively rather than hide behind it. screen keeps
    // it purely additive: transparent regions leave pixels untouched.
    <motion.div
      aria-hidden="true"
      style={{ background }}
      className="pointer-events-none fixed inset-0 z-30 hidden mix-blend-screen lg:block"
    />
  );
};
