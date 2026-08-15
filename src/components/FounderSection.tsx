import React from 'react';
import { motion } from 'motion/react';
import { Scale, Rocket, Code2, ArrowUpRight } from 'lucide-react';
import { MagneticButton } from './MagneticButton';
import { RevealText } from './RevealText';

interface FounderSectionProps {
  onOpenInquiry: () => void;
}

export const FounderSection: React.FC<FounderSectionProps> = ({ onOpenInquiry }) => {
  return (
    <section id="founder" className="w-full py-28 md:py-40 px-6 md:px-12 relative border-b border-white/10 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Portrait Column Left */}
          <motion.div
            initial={{ opacity: 0, y: 35 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 relative"
          >
            <div className="relative aspect-[3/4] w-full rounded-2xl overflow-hidden border border-white/10 shadow-2xl group">
              <img
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=1200"
                alt="Hireche Abdennour — Founder of AURVEX TECH"
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover filter grayscale contrast-125 group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ground via-transparent to-transparent opacity-80" />

              <div className="absolute bottom-8 left-8 right-8">
                <span className="font-mono text-xs text-[#2563EB] uppercase tracking-widest block mb-1">
                  FOUNDER & CHIEF EXECUTIVE
                </span>
                <h3 className="font-display font-bold text-2xl text-white">
                  Hireche Abdennour
                </h3>
                <span className="text-xs text-ink-2">
                  AURVEX TECH Studio Lead
                </span>
              </div>
            </div>
          </motion.div>

          {/* Editorial Storytelling Column Right */}
          <motion.div
            initial={{ opacity: 0, y: 35 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 space-y-8"
          >
            <div className="flex items-center gap-3">
              <span className="h-[1px] w-8 bg-accent" />
              <span className="text-xs uppercase tracking-[0.25em] text-ink-3 font-mono font-semibold">
                [09 // LEADERSHIP & VISION]
              </span>
            </div>

            <h2 className="font-display font-extrabold text-3xl sm:text-5xl text-ink tracking-tight leading-[1.08]">
              <RevealText text="Built at the intersection of business and technology." />
            </h2>

            <div className="space-y-4 text-base sm:text-lg text-ink-2 font-normal leading-relaxed">
              <p>
                Founded by <strong className="text-white font-semibold">Hireche Abdennour</strong>, AURVEX TECH was born out of a core conviction: digital products fail not because of missing code, but because of a disconnect between software architecture, regulatory strategy, and real market economics.
              </p>

              <p>
                With a strong background spanning <strong className="text-white">Business Law</strong>, digital product development, software engineering, and startup venture building, Hireche brings a distinct multi-disciplinary perspective to client technology.
              </p>
            </div>

            {/* Key Background Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-white/5">
              <div className="p-4 rounded-lg bg-surface-1 border border-white/5">
                <Scale className="w-5 h-5 text-accent mb-2" />
                <div className="font-bold text-sm text-white">Business Law</div>
                <div className="text-xs text-ink-3">Regulatory & Contractual Precision</div>
              </div>

              <div className="p-4 rounded-lg bg-surface-1 border border-white/5">
                <Code2 className="w-5 h-5 text-accent mb-2" />
                <div className="font-bold text-sm text-white">Digital Products</div>
                <div className="text-xs text-ink-3">Architectural Engineering</div>
              </div>

              <div className="p-4 rounded-lg bg-surface-1 border border-white/5">
                <Rocket className="w-5 h-5 text-accent mb-2" />
                <div className="font-bold text-sm text-white">Startup Building</div>
                <div className="text-xs text-ink-3">GTM & Venture Growth</div>
              </div>
            </div>

            {/* Quote & Signature style detail */}
            <div className="pt-6 flex flex-wrap items-center justify-between gap-6 border-t border-white/5">
              <div className="font-serif italic text-lg text-white/80">
                "We don't build software to look pretty in pitch decks. We build software to run sustainable, high-margin businesses."
              </div>

              <MagneticButton
                onClick={onOpenInquiry}
                className="px-6 py-3 rounded-sm bg-accent text-white font-bold text-xs uppercase tracking-widest hover:bg-white hover:text-black transition-colors flex items-center gap-2 shadow-lg shrink-0"
              >
                <span>Connect With Founder</span>
                <ArrowUpRight className="w-4 h-4" />
              </MagneticButton>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
