import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView, useReducedMotion } from 'motion/react';
import { STATS } from '../data/servicesData';
import { RevealText } from './RevealText';

/** Decelerating curve — fast off the mark, then settling onto the final value. */
const easeOutExpo = (t: number): number => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t));

const DURATION = 2200;

export const StatsSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-100px' });
  const reduceMotion = useReducedMotion();

  const [counts, setCounts] = useState<number[]>(STATS.map(() => 0));

  useEffect(() => {
    if (!isInView) return;

    // Nothing to animate — show the real figures immediately.
    if (reduceMotion) {
      setCounts(STATS.map((s) => s.value));
      return;
    }

    let frame = 0;
    let start: number | null = null;

    // requestAnimationFrame rather than setInterval: the count tracks the
    // display refresh, so the digits never stutter against the easing curve.
    const tick = (now: number) => {
      if (start === null) start = now;
      const progress = Math.min((now - start) / DURATION, 1);
      const eased = easeOutExpo(progress);

      setCounts(STATS.map((s) => Math.round(s.value * eased)));

      if (progress < 1) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [isInView, reduceMotion]);

  return (
    <section
      ref={containerRef}
      className="relative w-full border-b border-white/10 bg-panel/85 px-6 py-28 md:px-12 md:py-36"
    >
      <div className="mx-auto max-w-7xl space-y-16">
        {/* Section Label */}
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <div className="mb-5 flex items-center gap-3">
              <span className="h-[1px] w-8 bg-accent" />
              <span className="font-mono text-xs font-semibold uppercase tracking-[0.25em] text-ink-3">
                [07 // MEASURABLE METRICS]
              </span>
            </div>
            <h2 className="font-display text-4xl font-extrabold tracking-tight text-ink sm:text-5xl">
              <RevealText text="Numbers that survive an audit." />
            </h2>
          </div>
        </div>

        {/* Editorial typographic grid — rules instead of cards */}
        <div className="grid grid-cols-1 gap-y-14 sm:grid-cols-2 lg:grid-cols-4 lg:gap-x-8">
          {STATS.map((stat, idx) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="group relative flex flex-col justify-between gap-5 pl-6"
            >
              {/* Rule that lights up on hover */}
              <span className="absolute left-0 top-0 h-full w-[2px] bg-white/10" />
              <motion.span
                className="absolute left-0 top-0 w-[2px] origin-top bg-accent"
                initial={{ height: '0%' }}
                whileInView={{ height: '100%' }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.3 + idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
              />

              <div className="tabular font-display text-5xl font-black tracking-tight text-white transition-colors duration-300 group-hover:text-accent sm:text-6xl lg:text-7xl">
                {stat.prefix}
                {counts[idx]}
                {stat.suffix}
              </div>

              <div>
                <h3 className="mb-1.5 text-sm font-bold uppercase tracking-widest text-white">
                  {stat.label}
                </h3>
                <p className="text-xs leading-relaxed text-ink-2">{stat.subtext}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
