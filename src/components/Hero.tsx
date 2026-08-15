import React, { Suspense, lazy, useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'motion/react';
import { ArrowUpRight, ChevronDown, Sparkles } from 'lucide-react';
import { MagneticButton } from './MagneticButton';

// Three.js is ~600KB — keep it out of the critical bundle so the headline and
// CTA paint first. The canvas streams in a moment later.
const Hero3DCanvas = lazy(() =>
  import('./Hero3DCanvas').then((m) => ({ default: m.Hero3DCanvas }))
);

interface HeroProps {
  onOpenInquiry: () => void;
}

const CUBIC_EASE = [0.16, 1, 0.3, 1];

const lineVariants = {
  hidden: { y: '110%', opacity: 0 },
  visible: (i: number) => ({
    y: '0%',
    opacity: 1,
    transition: {
      duration: 1.0,
      ease: CUBIC_EASE,
      delay: i * 0.12,
    },
  }),
};

export const Hero: React.FC<HeroProps> = ({ onOpenInquiry }) => {
  const sectionRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();

  // As the hero leaves, the copy drifts up and dissolves while the canvas sinks
  // at a slower rate — the depth cue that makes the next section feel like it is
  // arriving from underneath rather than simply following.
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start']
  });

  const copyY = useTransform(scrollYProgress, [0, 1], [0, -110]);
  const copyOpacity = useTransform(scrollYProgress, [0, 0.65], [1, 0]);
  const canvasY = useTransform(scrollYProgress, [0, 1], [0, 60]);
  const canvasScale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);
  const auroraY = useTransform(scrollYProgress, [0, 1], [0, 140]);

  const parallax = reduceMotion ? undefined : true;

  return (
    <section
      ref={sectionRef}
      className="relative w-full min-h-screen flex flex-col justify-between pt-28 pb-12 px-6 md:px-12 overflow-hidden"
    >
      {/* Ambient background stack: aurora → glow → grain */}
      <motion.div
        aria-hidden="true"
        style={parallax ? { y: auroraY } : undefined}
        className="absolute -top-1/3 left-1/2 -translate-x-1/2 w-[140vw] h-[110vh] opacity-[0.16] pointer-events-none z-0 aurora"
      />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[140px] pointer-events-none z-0" />
      {/* Grain is applied globally by PageBackdrop — not repeated per section. */}

      {/* Main Grid: Left Copy & Right 3D Art */}
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center my-auto z-10">
        {/* Left Column: Editorial Headline & Copy */}
        <motion.div
          style={parallax ? { y: copyY, opacity: copyOpacity } : undefined}
          className="lg:col-span-7 flex flex-col justify-center"
        >
          {/* Micro-label Mask Reveal */}
          <div className="overflow-hidden mb-6">
            <motion.div
              custom={0}
              variants={lineVariants}
              initial="hidden"
              animate="visible"
              className="inline-flex items-center gap-4"
            >
              <span className="h-[1px] w-8 bg-accent" />
              <span className="text-[10px] md:text-xs font-bold tracking-[0.4em] uppercase text-ink-3">
                Technology / Design / Strategy
              </span>
            </motion.div>
          </div>

          {/* Main Headline Masked Line Stagger */}
          <h1 className="font-display font-bold text-5xl sm:text-7xl lg:text-8xl xl:text-[84px] leading-[0.88] text-white tracking-tighter mb-8">
            <span className="block overflow-hidden pb-2 -mb-2">
              <motion.span
                custom={1}
                variants={lineVariants}
                initial="hidden"
                animate="visible"
                className="block"
              >
                WE BUILD
              </motion.span>
            </span>
            <span className="block overflow-hidden pb-2 -mb-2">
              <motion.span
                custom={2}
                variants={lineVariants}
                initial="hidden"
                animate="visible"
                className="block"
              >
                DIGITAL
              </motion.span>
            </span>
            <span className="block overflow-hidden pb-2 -mb-2">
              <motion.span
                custom={3}
                variants={lineVariants}
                initial="hidden"
                animate="visible"
                className="block"
              >
                EXPERIENCES <span className="text-accent">.</span>
              </motion.span>
            </span>
          </h1>

          {/* Supporting Pillar Statement */}
          <div className="overflow-hidden mb-6">
            <motion.div
              custom={4}
              variants={lineVariants}
              initial="hidden"
              animate="visible"
              className="flex items-center gap-3 text-xs md:text-sm font-semibold tracking-[0.2em] text-accent uppercase"
            >
              <span>Strategy</span>
              <span className="text-white/20">×</span>
              <span>Design</span>
              <span className="text-white/20">×</span>
              <span>Technology</span>
              <span className="text-white/20">×</span>
              <span>Growth</span>
            </motion.div>
          </div>

          {/* Description Sub-headline */}
          <div className="overflow-hidden mb-10">
            <motion.p
              custom={5}
              variants={lineVariants}
              initial="hidden"
              animate="visible"
              className="text-base sm:text-lg text-ink-2 font-normal leading-relaxed max-w-xl"
            >
              We partner with ambitious founders and businesses to transform complex ideas into powerful digital products, software architectures, brands, and scalable market ecosystems.
            </motion.p>
          </div>

          {/* CTAs */}
          <div className="overflow-hidden py-1">
            <motion.div
              custom={6}
              variants={lineVariants}
              initial="hidden"
              animate="visible"
              className="flex flex-wrap items-center gap-6"
            >
              <MagneticButton
                onClick={onOpenInquiry}
                className="px-8 py-4 rounded-sm bg-ink text-ground font-bold text-xs tracking-widest uppercase hover:bg-accent hover:text-white transition-all duration-300 flex items-center gap-3 group shadow-2xl active:scale-95"
              >
                <span>Start Your Project</span>
                <ArrowUpRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 text-accent group-hover:text-white" />
              </MagneticButton>

              <a
                href="#projects"
                className="group flex items-center space-x-4"
              >
                <span className="w-12 h-12 rounded-full border border-accent flex items-center justify-center group-hover:bg-accent transition-all">
                  <ArrowUpRight className="w-5 h-5 text-white transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </span>
                <span className="text-xs uppercase tracking-widest font-bold text-ink group-hover:text-accent transition-colors">
                  Explore Our Work
                </span>
              </a>
            </motion.div>
          </div>
        </motion.div>

        {/* Right Column: Interactive 3D Canvas */}
        <motion.div
          // Only opacity here: `scale` is owned by the scroll parallax below,
          // and animating both from the same element makes them fight.
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5, ease: CUBIC_EASE }}
          style={parallax ? { y: canvasY, scale: canvasScale } : undefined}
          className="edge-light lg:col-span-5 h-[450px] lg:h-[600px] w-full relative flex items-center justify-center rounded-2xl bg-gradient-to-b from-white/5 to-transparent backdrop-blur-sm overflow-hidden group"
          data-cursor="EXPLORE"
        >
          {/* Subtle Corner Accents */}
          <div className="absolute top-4 left-4 text-[10px] uppercase font-mono tracking-widest text-white/30 z-20">
            [FIG. 3D-01 ARCHITECTURE]
          </div>
          <div className="absolute bottom-4 right-4 text-[10px] uppercase font-mono tracking-widest text-white/30 z-20 flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-accent" />
            <span>3D INTERACTIVE CANVAS</span>
          </div>

          <Suspense
            fallback={
              <div className="w-full h-full flex items-center justify-center">
                <div className="w-40 h-40 rounded-full border border-accent/30 animate-pulse" />
              </div>
            }
          >
            <Hero3DCanvas />
          </Suspense>
        </motion.div>
      </div>

      {/* Hero Bottom Bar */}
      <div className="max-w-7xl mx-auto w-full pt-8 flex items-center justify-between border-t border-white/10 z-10 text-xs text-ink-3">
        <div className="flex items-center gap-6">
          <span className="font-mono text-white/60">EST. 2024</span>
          <span className="hidden sm:inline">•</span>
          <span className="hidden sm:inline uppercase tracking-wider">Global Digital Studio</span>
        </div>

        <a
          href="#trust"
          className="flex items-center gap-2 hover:text-white transition-colors group"
        >
          <span className="uppercase tracking-widest text-[11px]">Scroll to discover</span>
          <ChevronDown className="w-4 h-4 animate-bounce text-accent" />
        </a>
      </div>
    </section>
  );
};
