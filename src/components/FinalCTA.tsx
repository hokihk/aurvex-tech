import React from 'react';
import { motion } from 'motion/react';
import { ArrowUpRight, Sparkles } from 'lucide-react';
import { MagneticButton } from './MagneticButton';
import { RevealText } from './RevealText';

interface FinalCTAProps {
  onOpenInquiry: () => void;
}

export const FinalCTA: React.FC<FinalCTAProps> = ({ onOpenInquiry }) => {
  return (
    <section className="relative w-full py-36 md:py-48 px-6 md:px-12 overflow-hidden border-b border-white/5">
      {/* Background Cinematic Light Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-accent/10 rounded-full blur-[160px] pointer-events-none" />
      {/* Grain comes from PageBackdrop; only the glow is local to this section. */}

      <div className="max-w-5xl mx-auto text-center relative z-10 space-y-10">
        {/* Micro Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/5 text-xs font-mono font-semibold text-accent uppercase tracking-widest"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>INITIATE PARTNERSHIP</span>
        </motion.div>

        {/* Headlines */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="space-y-4"
        >
          <h2 className="font-display font-black text-5xl sm:text-7xl md:text-8xl lg:text-[7.5rem] text-white tracking-[-0.05em] leading-[0.9]">
            <RevealText text="Have an idea worth building?" stagger={0.045} />
          </h2>
          <p className="font-display font-medium text-2xl sm:text-4xl text-ink-3 tracking-tight">
            Let's turn it into something remarkable.
          </p>
        </motion.div>

        {/* Large Magnetic CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="pt-6"
        >
          <MagneticButton
            onClick={onOpenInquiry}
            className="gap-4 px-10 py-5 rounded-sm bg-ink text-ground font-extrabold text-base tracking-widest uppercase hover:bg-accent hover:text-white transition-all duration-300 group shadow-2xl active:scale-95"
            dataCursor="SUBMIT"
          >
            <span>Start a Project</span>
            <ArrowUpRight className="w-6 h-6 text-accent group-hover:text-white transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
          </MagneticButton>
        </motion.div>
      </div>
    </section>
  );
};
