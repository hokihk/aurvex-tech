import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ArrowUpRight, CheckCircle2, Quote, Layers, ShieldCheck } from 'lucide-react';
import { Project } from '../types';
import { MagneticButton } from './MagneticButton';
import { useModalChrome } from '../hooks/useModalChrome';

interface CaseStudyModalProps {
  project: Project | null;
  onClose: () => void;
  onStartSimilarProject: (projectTitle: string) => void;
}

export const CaseStudyModal: React.FC<CaseStudyModalProps> = ({
  project,
  onClose,
  onStartSimilarProject
}) => {
  const containerRef = useModalChrome(project !== null, onClose);

  return (
    <AnimatePresence>
      {project && (
      <div className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto p-4 sm:p-6 md:p-10">
        {/* Modal Backdrop click to close */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onClose}
          className="fixed inset-0 z-0 bg-black/90 backdrop-blur-xl"
        />

        {/* Modal Content Container */}
        <motion.div
          ref={containerRef}
          tabIndex={-1}
          role="dialog"
          aria-modal="true"
          aria-labelledby="case-study-title"
          initial={{ opacity: 0, y: 40, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 40, scale: 0.98 }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className="relative z-10 w-full max-w-5xl bg-well border border-white/10 rounded-2xl overflow-hidden shadow-2xl my-8 text-ink focus:outline-none"
        >
          {/* Top Bar Header */}
          <div className="sticky top-0 z-20 flex items-center justify-between px-8 py-5 bg-well/90 backdrop-blur-md border-b border-white/5">
            <div className="flex items-center gap-4">
              <span className="font-mono text-xs text-ink-3 uppercase tracking-widest font-bold">
                [CASE STUDY // {project.number}]
              </span>
              <span className="text-xs text-ink-3 hidden sm:inline">|</span>
              <span className="text-xs font-semibold text-ink-2 uppercase tracking-wider hidden sm:inline">
                {project.industry}
              </span>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-white transition-colors"
              aria-label="Close Case Study"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="p-8 sm:p-12 space-y-12 max-h-[80vh] overflow-y-auto">
            {/* Title & Metadata Header */}
            <div>
              <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
                <h2 id="case-study-title" className="font-display font-extrabold text-4xl sm:text-6xl text-white tracking-tight">
                  {project.title}
                </h2>
                <span className="px-4 py-1.5 rounded-sm bg-accent/10 border border-accent/20 text-accent font-mono text-xs font-bold uppercase tracking-widest">
                  LAUNCHED {project.year}
                </span>
              </div>
              <p className="text-xl sm:text-2xl text-ink-2 font-light leading-snug">
                {project.subtitle}
              </p>
            </div>

            {/* Main Project Hero Image */}
            <div className="relative aspect-[16/9] w-full rounded-lg overflow-hidden border border-white/5 group">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-well via-transparent to-transparent opacity-80" />
              <div className="absolute bottom-6 left-6 right-6 flex justify-between items-end">
                <div>
                  <span className="text-[10px] font-mono text-white/50 uppercase tracking-widest block">
                    PLATFORM PREVIEW
                  </span>
                  <span className="text-sm font-semibold text-white">
                    {project.title} Enterprise Suite
                  </span>
                </div>
              </div>
            </div>

            {/* Metrics Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 p-6 rounded-lg bg-surface-2 border border-white/5">
              {project.metrics.map((m, idx) => (
                <div key={idx} className="flex flex-col">
                  <span className="font-mono text-3xl sm:text-4xl font-bold text-white mb-1">
                    {m.value}
                  </span>
                  <span className="text-xs uppercase tracking-wider text-ink-2">
                    {m.label}
                  </span>
                </div>
              ))}
            </div>

            {/* Description & Problem Statement */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
              <div className="md:col-span-8 space-y-6">
                <h3 className="font-display text-2xl font-bold text-white flex items-center gap-2">
                  <Layers className="w-5 h-5 text-accent" />
                  <span>Overview & Architecture Scope</span>
                </h3>
                <p className="text-ink-2 leading-relaxed text-base sm:text-lg">
                  {project.longDescription}
                </p>

                <div className="space-y-4 pt-4">
                  <h4 className="text-sm font-bold uppercase tracking-wider text-white">
                    Key Technical & Architectural Highlights:
                  </h4>
                  <ul className="space-y-3">
                    {project.architectureHighlights.map((highlight, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-sm text-ink-2">
                        <CheckCircle2 className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Sidebar Services & Details */}
              <div className="md:col-span-4 p-6 rounded-lg bg-surface-1 border border-white/5 space-y-6">
                <div>
                  <span className="text-xs font-mono text-ink-3 uppercase tracking-wider block mb-3">
                    SERVICES DELIVERED
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {project.services.map((s, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 rounded-sm bg-white/5 border border-white/5 text-xs text-white"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-white/5">
                  <span className="text-xs font-mono text-ink-3 uppercase tracking-wider block mb-2">
                    COMPLIANCE & QUALITY
                  </span>
                  <div className="flex items-center gap-2 text-xs text-white">
                    <ShieldCheck className="w-4 h-4 text-accent" />
                    <span>Audited Enterprise Codebase</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Client Testimonial / Quote */}
            {project.clientQuote && (
              <div className="p-8 rounded-lg bg-accent/10 border border-accent/20 relative">
                <Quote className="w-8 h-8 text-accent opacity-40 mb-4" />
                <p className="text-lg italic text-white/90 mb-4">
                  "{project.clientQuote.text}"
                </p>
                <div>
                  <div className="font-bold text-white text-sm">
                    {project.clientQuote.author}
                  </div>
                  <div className="text-xs text-ink-2">
                    {project.clientQuote.role}
                  </div>
                </div>
              </div>
            )}

            {/* Bottom Actions */}
            <div className="pt-8 border-t border-white/5 flex flex-wrap items-center justify-between gap-4">
              <div>
                <span className="text-xs text-ink-3 uppercase tracking-wider block">
                  INSPIRED BY {project.title}?
                </span>
                <span className="text-sm font-semibold text-white">
                  Build a similar enterprise platform with AURVEX TECH.
                </span>
              </div>

              <MagneticButton
                onClick={() => {
                  onClose();
                  onStartSimilarProject(project.title);
                }}
                className="px-6 py-3 rounded-sm bg-accent hover:bg-white hover:text-black text-white font-bold text-xs uppercase tracking-widest flex items-center gap-2 transition-all shadow-lg"
              >
                <span>Request Similar Build</span>
                <ArrowUpRight className="w-4 h-4" />
              </MagneticButton>
            </div>
          </div>
        </motion.div>
      </div>
      )}
    </AnimatePresence>
  );
};
