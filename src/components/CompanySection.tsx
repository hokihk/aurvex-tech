import React from 'react';
import { motion } from 'motion/react';
import { ShieldCheck, Cpu, Target, Compass } from 'lucide-react';
import { RevealText } from './RevealText';
import { SpotlightCard } from './SpotlightCard';

export const CompanySection: React.FC = () => {
  const pillars = [
    {
      icon: Target,
      title: 'Business First Strategy',
      text: 'Every line of code and UI component serves a clear financial or operational business objective.'
    },
    {
      icon: Cpu,
      title: 'High-Performance Engineering',
      text: 'Built with microsecond-optimized architectures that handle high traffic without degradation.'
    },
    {
      icon: Compass,
      title: 'Legal & Structural Precision',
      text: 'Grounded in business law, regulatory compliance, and international corporate data standards.'
    },
    {
      icon: ShieldCheck,
      title: 'Long-Term Ownership',
      text: 'We partner continuously with client teams to refine, expand, and scale platforms post-launch.'
    }
  ];

  return (
    <section id="company" className="w-full py-28 md:py-40 px-6 md:px-12 relative border-b border-white/10 overflow-hidden">
      <div className="max-w-7xl mx-auto space-y-20">
        {/* Main Editorial Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Text Left */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 space-y-6"
          >
            <div className="flex items-center gap-3">
              <span className="h-[1px] w-8 bg-accent" />
              <span className="text-xs uppercase tracking-[0.25em] text-ink-3 font-mono font-semibold">
                [06 // OUR APPROACH]
              </span>
            </div>

            <h2 className="font-display font-extrabold text-4xl sm:text-6xl text-ink tracking-tight leading-[1.02]">
              <RevealText text="Technology with business thinking." />
            </h2>

            <p className="text-lg text-ink-2 font-normal leading-relaxed">
              AURVEX TECH operates at the intersection of strategy, software engineering, design and legal-business entrepreneurship. We help ambitious companies transform complex ideas into simple, intuitive, and effective digital platforms.
            </p>

            <p className="text-base text-ink-3 leading-relaxed">
              Unlike traditional development shops that blindly execute tickets, we act as co-product architects — validating business viability, user friction, and security models before writing code.
            </p>
          </motion.div>

          {/* Abstract Architectural Visual Right */}
          <motion.div
            initial={{ opacity: 0, y: 35 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 relative aspect-[4/3] rounded-xl overflow-hidden border border-white/5 bg-surface-1 p-8 flex flex-col justify-between shadow-2xl group"
          >
            <img
              src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=1200"
              alt=""
              aria-hidden="true"
              loading="lazy"
              decoding="async"
              className="absolute inset-0 w-full h-full object-cover filter grayscale contrast-125 opacity-40 group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ground via-ground/60 to-transparent" />

            <div className="relative z-10 flex justify-between items-start">
              <span className="font-mono text-xs text-ink-3 uppercase tracking-widest font-bold">
                [SYSTEM ARCHITECTURE ARCHETYPE]
              </span>
              <span className="px-3 py-1 rounded-sm bg-white/10 backdrop-blur-md text-[10px] font-mono text-white">
                PRECISION SPEC 100%
              </span>
            </div>

            <div className="relative z-10 space-y-2">
              <h3 className="font-display font-bold text-2xl text-white">
                Engineered For Structural Scale.
              </h3>
              <p className="text-xs text-ink-2">
                Zero bloat, immutable data standards, resilient cloud deployment.
              </p>
            </div>
          </motion.div>
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 pt-12 border-t border-white/5">
          {pillars.map((p, idx) => {
            const Icon = p.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
              >
                <SpotlightCard className="edge-light h-full rounded-xl bg-card ring-1 ring-white/10 transition-all hover:ring-accent/30">
                  <div className="space-y-3 p-6">
                    <div className="w-10 h-10 rounded-sm bg-accent/10 border border-accent/20 flex items-center justify-center text-accent transition-transform duration-300 group-hover/spot:scale-110">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h4 className="font-display font-bold text-lg text-white">
                      {p.title}
                    </h4>
                    <p className="text-xs text-ink-2 leading-relaxed">
                      {p.text}
                    </p>
                  </div>
                </SpotlightCard>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
