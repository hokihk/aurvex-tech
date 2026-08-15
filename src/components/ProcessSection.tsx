import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, useSpring, useReducedMotion } from 'motion/react';
import { PROCESS_STEPS } from '../data/servicesData';
import { CheckCircle } from 'lucide-react';
import { RevealText } from './RevealText';
import { SpotlightCard } from './SpotlightCard';

const SectionHeader: React.FC = () => (
  <div className="mb-12 flex flex-col justify-between gap-8 md:flex-row md:items-end">
    <div>
      <div className="mb-5 flex items-center gap-3">
        <span className="h-[1px] w-8 bg-accent" />
        <span className="font-mono text-xs font-semibold uppercase tracking-[0.25em] text-ink-3">
          [05 // METHODOLOGY]
        </span>
      </div>
      <h2 className="font-display text-4xl font-extrabold tracking-tight text-ink sm:text-6xl">
        <RevealText text="From idea to market." />
      </h2>
    </div>

    <p className="max-w-md text-base font-normal text-ink-2 sm:text-lg">
      A structured, 6-phase engineering framework engineered for rapid execution
      without compromising quality or security.
    </p>
  </div>
);

const PhaseCard: React.FC<{ step: (typeof PROCESS_STEPS)[number]; index: number }> = ({
  step,
  index
}) => (
  <SpotlightCard className="edge-light h-full rounded-2xl bg-[#0C0C0C] ring-1 ring-white/10">
    <div className="flex h-full flex-col gap-5 p-7 sm:p-9">
      {/* Phase marker */}
      <div className="flex items-center justify-between">
        <span className="font-mono text-6xl font-extrabold leading-none text-accent/25 transition-colors duration-500 group-hover/spot:text-accent/60">
          {step.number}
        </span>
        <span className="rounded-full border border-white/10 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.2em] text-ink-3">
          Phase {index + 1} / {PROCESS_STEPS.length}
        </span>
      </div>

      <div className="space-y-2">
        <h3 className="font-display text-3xl font-bold text-white sm:text-4xl">
          {step.title}
        </h3>
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">
          {step.tagline}
        </p>
      </div>

      <p className="text-sm leading-relaxed text-ink-2">{step.description}</p>

      <div className="mt-auto space-y-2 border-t border-white/10 pt-5">
        {step.deliverables.map((deliverable) => (
          <div key={deliverable} className="flex items-start gap-2.5 text-xs text-ink">
            <CheckCircle className="mt-0.5 h-3.5 w-3.5 shrink-0 text-accent" />
            <span>{deliverable}</span>
          </div>
        ))}
      </div>
    </div>
  </SpotlightCard>
);

/* Track geometry, kept in sync with the classes on the rail below. Deriving the
   travel distance arithmetically rather than measuring the DOM avoids a
   chicken-and-egg problem: the rail only exists once the section is pinned, and
   the section only pins once a distance is known. */
const GAP = 24; // gap-6
const RAIL_END_PAD = 48; // pr-12
const MAX_CONTENT = 1280; // max-w-7xl
const MIN_SIDE_PAD = 24; // px-6

const railTravel = (viewportWidth: number): number => {
  const cardWidth = viewportWidth >= 1280 ? 420 : 380;
  const leftPad = Math.max(MIN_SIDE_PAD, (viewportWidth - MAX_CONTENT) / 2);
  const railWidth =
    PROCESS_STEPS.length * cardWidth +
    (PROCESS_STEPS.length - 1) * GAP +
    leftPad +
    RAIL_END_PAD;

  return Math.max(0, railWidth - viewportWidth);
};

export const ProcessSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();

  const [distance, setDistance] = useState(0);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const desktopQuery = window.matchMedia('(min-width: 1024px)');

    const measure = () => {
      const desktop = desktopQuery.matches;
      setIsDesktop(desktop);
      setDistance(desktop ? railTravel(window.innerWidth) : 0);
    };

    measure();
    window.addEventListener('resize', measure);
    desktopQuery.addEventListener('change', measure);
    return () => {
      window.removeEventListener('resize', measure);
      desktopQuery.removeEventListener('change', measure);
    };
  }, []);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end']
  });

  const rawX = useTransform(scrollYProgress, [0, 1], [0, -distance]);
  const x = useSpring(rawX, { stiffness: 260, damping: 40, mass: 0.35 });
  const progressScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  const usePinned = isDesktop && !reduceMotion;

  return (
    <section
      id="process"
      ref={sectionRef}
      className="relative w-full border-b border-white/10"
      // The extra height IS the scroll budget for the horizontal travel: the
      // sticky child stays pinned for exactly as long as the track needs.
      style={usePinned ? { height: `calc(100vh + ${distance}px)` } : undefined}
    >
      <div
        className={
          usePinned
            ? 'sticky top-0 flex h-screen flex-col justify-center overflow-hidden py-16'
            : 'px-6 py-28 md:px-12 md:py-40'
        }
      >
        <div className={`mx-auto w-full max-w-7xl ${usePinned ? 'px-6 md:px-12' : ''}`}>
          <SectionHeader />
        </div>

        {/* The track is always rendered so it can be measured; only the desktop
            branch pins and translates it. */}
        {usePinned ? (
          <>
            <motion.div
              style={{ x }}
              className="flex w-max gap-6 pl-[max(1.5rem,calc((100vw-80rem)/2))] pr-12"
            >
              {PROCESS_STEPS.map((step, index) => (
                <div key={step.number} className="w-[380px] shrink-0 xl:w-[420px]">
                  <PhaseCard step={step} index={index} />
                </div>
              ))}
            </motion.div>

            {/* Progress rail mirroring how far through the phases you are */}
            <div className="mx-auto mt-10 w-full max-w-7xl px-6 md:px-12">
              <div className="relative h-[2px] w-full overflow-hidden rounded-full bg-white/10">
                <motion.div
                  style={{ scaleX: progressScale }}
                  className="absolute inset-0 origin-left rounded-full bg-gradient-to-r from-accent to-accent-soft"
                />
              </div>
              <div className="mt-3 flex justify-between font-mono text-[10px] uppercase tracking-[0.2em] text-ink-3">
                <span>Discover</span>
                <span className="hidden sm:inline">Keep scrolling</span>
                <span>Scale</span>
              </div>
            </div>
          </>
        ) : (
          /* Mobile and reduced-motion: a plain, readable stack. A track measured
             against the viewport cannot work here. */
          <div className="mx-auto w-full max-w-7xl">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              {PROCESS_STEPS.map((step, index) => (
                <motion.div
                  key={step.number}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.6, delay: index * 0.06 }}
                >
                  <PhaseCard step={step} index={index} />
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
