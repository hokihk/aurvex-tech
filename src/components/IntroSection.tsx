import React from 'react';
import { motion } from 'motion/react';

const CUBIC_EASE = [0.16, 1, 0.3, 1];

const fadeUpVariant = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: CUBIC_EASE,
      delay: i * 0.1,
    },
  }),
};

export const IntroSection: React.FC = () => {
  return (
    <section className="w-full py-28 md:py-40 px-6 md:px-12 relative overflow-hidden border-b border-white/5">
      <div className="max-w-7xl mx-auto">
        {/* Editorial Asymmetric Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Large Bold Statement */}
          <div className="lg:col-span-7">
            <motion.div
              custom={0}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-60px' }}
              variants={fadeUpVariant}
            >
              <span className="text-xs uppercase tracking-[0.25em] text-ink-3 font-mono font-semibold block mb-6">
                [01 // MANIFESTO]
              </span>
            </motion.div>

            <motion.h2
              custom={1}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-60px' }}
              variants={fadeUpVariant}
              // The manifesto is the loudest type on the page after the hero.
              // Letting it run bigger than the section headings gives the page a
              // rhythm instead of one flat heading size everywhere.
              className="font-display font-extrabold text-4xl sm:text-6xl lg:text-7xl xl:text-[5.5rem] leading-[0.98] text-ink tracking-[-0.045em]"
            >
              <span className="text-ink-3">We don't just build websites.</span>
              <br />
              We build digital businesses<span className="text-accent">.</span>
            </motion.h2>
          </div>

          {/* Right Column: Supporting Copy & Key Pillars */}
          <div className="lg:col-span-5 lg:pt-12 flex flex-col justify-between h-full">
            <motion.p
              custom={2}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-60px' }}
              variants={fadeUpVariant}
              className="text-lg md:text-xl text-ink-2 font-normal leading-relaxed mb-8"
            >
              AURVEX TECH combines deep technical engineering, product thinking, user experience design, branding, and digital strategy to help ambitious companies launch, scale, and dominate their industries.
            </motion.p>

            <motion.div
              custom={3}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-60px' }}
              variants={fadeUpVariant}
              className="grid grid-cols-2 gap-6 pt-8 border-t border-white/5"
            >
              <div>
                <div className="font-mono text-2xl font-bold text-white mb-1">100%</div>
                <div className="text-xs uppercase tracking-wider text-ink-3">Custom Architecture</div>
              </div>
              <div>
                <div className="font-mono text-2xl font-bold text-accent mb-1">0%</div>
                <div className="text-xs uppercase tracking-wider text-ink-3">Generic Templates</div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

