import React, { useRef } from 'react';
import {
  motion,
  useScroll,
  useVelocity,
  useTransform,
  useSpring,
  useMotionValue,
  useAnimationFrame,
  useReducedMotion,
  useInView,
  wrap
} from 'motion/react';
import { RevealText } from './RevealText';

const KEYWORDS = ['STRATEGY', 'PRODUCT', 'DESIGN', 'TECHNOLOGY', 'BRANDING', 'GROWTH'];

/**
 * A keyword rail that drifts on its own and is dragged along by the page's
 * scroll velocity — scroll faster and the words race; scroll up and they
 * reverse. The band becomes an instrument you play by scrolling instead of a
 * decoration that loops.
 */
const VelocityRail: React.FC<{ baseVelocity: number; active: boolean }> = ({
  baseVelocity,
  active
}) => {
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);

  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400
  });

  // Scroll speed becomes a multiplier on the idle drift, clamped so a fast
  // flick accelerates the rail without launching it off screen.
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 4], {
    clamp: false
  });

  // Four copies are rendered, so wrapping over a quarter of the width is
  // seamless in both directions.
  const x = useTransform(baseX, (v) => `${wrap(-25, -50, v)}%`);

  const directionFactor = useRef(1);

  useAnimationFrame((_, delta) => {
    // Don't drive the rail while the section is off screen — no reason to keep
    // the compositor busy for something nobody can see.
    if (!active) return;

    let moveBy = directionFactor.current * baseVelocity * (delta / 1000);

    // Scrolling up flips the travel direction; scrolling down restores it.
    if (velocityFactor.get() < 0) directionFactor.current = -1;
    else if (velocityFactor.get() > 0) directionFactor.current = 1;

    moveBy += directionFactor.current * moveBy * velocityFactor.get();
    baseX.set(baseX.get() + moveBy);
  });

  return (
    <div className="overflow-hidden whitespace-nowrap">
      <motion.div className="flex w-max gap-8" style={{ x }}>
        {Array.from({ length: 4 }).map((_, copy) => (
          <div key={copy} className="flex shrink-0 items-center gap-8" aria-hidden={copy > 0}>
            {KEYWORDS.map((word) => (
              <span key={word} className="flex items-center gap-8">
                <span className="font-display text-5xl font-black tracking-tight text-transparent sm:text-7xl lg:text-8xl [-webkit-text-stroke:1px_rgba(255,255,255,0.28)] transition-colors">
                  {word}
                </span>
                <span className="text-2xl font-bold text-accent sm:text-4xl">·</span>
              </span>
            ))}
          </div>
        ))}
      </motion.div>
    </div>
  );
};

/** Static fallback when the visitor has asked for reduced motion. */
const StaticRail: React.FC = () => (
  <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4">
    {KEYWORDS.map((word) => (
      <span
        key={word}
        className="font-display text-4xl font-black tracking-tight text-transparent sm:text-6xl [-webkit-text-stroke:1px_rgba(255,255,255,0.28)]"
      >
        {word}
      </span>
    ))}
  </div>
);

export const PhilosophyKeywords: React.FC = () => {
  const reduceMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  // margin gives the rails a head start so they are already drifting by the
  // time the band scrolls into view.
  const isInView = useInView(sectionRef, { margin: '200px' });

  return (
    <section
      ref={sectionRef}
      // Fully opaque here: the edge masks below fade to this exact colour, so a
      // translucent surface would leave a visible seam at the band's edges.
      className="relative w-full overflow-hidden border-b border-white/10 bg-panel py-28 md:py-36"
    >
      <div className="mx-auto max-w-7xl space-y-14 px-6 text-center md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <span className="mb-5 block font-mono text-xs font-semibold uppercase tracking-[0.3em] text-ink-3">
            [04 // PHILOSOPHY]
          </span>
          <h2 className="mx-auto max-w-4xl font-display text-3xl font-extrabold tracking-tight text-ink sm:text-5xl lg:text-6xl">
            <RevealText text="Built for businesses that refuse to look ordinary." />
          </h2>
        </motion.div>
      </div>

      {/* Full-bleed kinetic band — deliberately breaks the max-width grid */}
      <div className="mt-16 space-y-4">
        {reduceMotion ? (
          <StaticRail />
        ) : (
          <>
            <VelocityRail baseVelocity={-1.6} active={isInView} />
            <VelocityRail baseVelocity={1.6} active={isInView} />
          </>
        )}
      </div>

      {/* Edge masks so the band dissolves instead of being cut off */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-panel to-transparent md:w-48" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-panel to-transparent md:w-48" />
    </section>
  );
};
