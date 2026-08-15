import React from 'react';
import { motion, useScroll, useTransform, useSpring, useReducedMotion } from 'motion/react';

/**
 * The page's ground layer — fixed behind all content, so sections scroll
 * *against* it rather than each carrying its own slab of black.
 *
 * Three ideas, in order of how much they matter:
 *
 *  1. A column grid aligned to the content container. A studio that sells
 *     "structure" should show its layout guides. It is the quietest element
 *     here and the one doing the most work: it gives the eye something fixed to
 *     measure the scroll against.
 *  2. Ambient light that hands off down the page. Instead of one static glow,
 *     three fields fade in and out across the scroll so no two regions of the
 *     page are lit identically.
 *  3. Grain over everything, to take the flatness off pure #070707.
 *
 * Deliberately no pattern, texture or imagery: on a dark luxury layout those
 * read as noise, and the restraint is the point.
 */

const GRID_LINES = 5;

export const PageBackdrop: React.FC = () => {
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();

  // Softened so the fields cross-fade rather than tracking the wheel exactly.
  const progress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 34,
    restDelta: 0.0005
  });

  // Each field owns a band of the page and fades out as the next takes over.
  const topOpacity = useTransform(progress, [0, 0.16, 0.34], [1, 0.65, 0]);
  const midOpacity = useTransform(progress, [0.24, 0.46, 0.68], [0, 1, 0]);
  const lowOpacity = useTransform(progress, [0.58, 0.8, 1], [0, 1, 0.7]);

  // Gentle counter-drift so the light does not feel glued to the viewport.
  const topY = useTransform(progress, [0, 0.34], [0, -120]);
  const midY = useTransform(progress, [0.24, 0.68], [80, -80]);
  const lowY = useTransform(progress, [0.58, 1], [90, -40]);

  const drift = (value: typeof topY) => (reduceMotion ? undefined : value);

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {/* ---- Ambient light fields ---- */}
      <motion.div
        style={{ opacity: topOpacity, y: drift(topY) }}
        className="absolute -top-[15%] left-1/2 h-[70vh] w-[80vw] max-w-[1100px] -translate-x-1/2 rounded-full bg-accent/[0.10] blur-[150px]"
      />
      <motion.div
        style={{ opacity: midOpacity, y: drift(midY) }}
        className="absolute top-[28%] -right-[10%] h-[65vh] w-[60vw] max-w-[900px] rounded-full bg-[#1D4ED8]/[0.09] blur-[150px]"
      />
      <motion.div
        style={{ opacity: lowOpacity, y: drift(lowY) }}
        className="absolute bottom-[5%] -left-[12%] h-[65vh] w-[62vw] max-w-[900px] rounded-full bg-accent/[0.08] blur-[160px]"
      />

      {/* ---- Architectural column guides, aligned to the content container ---- */}
      <div className="absolute inset-0 mx-auto flex h-full max-w-7xl justify-between px-6 md:px-12">
        {Array.from({ length: GRID_LINES }).map((_, i) => (
          <div
            key={i}
            className="h-full w-px bg-gradient-to-b from-transparent via-white/[0.045] to-transparent"
          />
        ))}
      </div>

      {/* ---- Film grain, so the black reads as a surface rather than a void ---- */}
      <div className="absolute inset-0 bg-grain opacity-[0.65]" />
    </div>
  );
};
