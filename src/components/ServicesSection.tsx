import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { SERVICES } from '../data/servicesData';
import { Plus, Minus, ArrowUpRight, CheckCircle2 } from 'lucide-react';
import { RevealText } from './RevealText';
import { SpotlightCard } from './SpotlightCard';

interface ServicesSectionProps {
  onOpenInquiryWithService: (serviceName: string) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onOpenInquiryWithService }) => {
  const [expandedService, setExpandedService] = useState<string | null>(SERVICES[0].id);

  const toggleService = (id: string) => {
    setExpandedService(expandedService === id ? null : id);
  };

  return (
    <section id="services" className="w-full py-28 md:py-40 px-6 md:px-12 relative border-b border-white/10">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="h-[1px] w-8 bg-accent" />
              <span className="text-xs uppercase tracking-[0.25em] text-ink-3 font-mono font-semibold">
                [03 // CAPABILITIES & DELIVERABLES]
              </span>
            </div>
            <h2 className="font-display font-extrabold text-4xl sm:text-6xl text-ink tracking-tight">
              <RevealText text="What We Do." />
            </h2>
          </div>

          <p className="text-base sm:text-lg text-ink-2 font-normal max-w-md">
            Four core capabilities designed to build, position, and accelerate high-growth modern technology companies.
          </p>
        </div>

        {/* Accordion / Expanded Service List */}
        <div className="space-y-6">
          {SERVICES.map((service, idx) => {
            const isExpanded = expandedService === service.id;

            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.7, delay: idx * 0.12, ease: [0.16, 1, 0.3, 1] }}
              >
                <SpotlightCard
                  className={`edge-light rounded-2xl ring-1 transition-all duration-300 ${
                    isExpanded
                      ? 'bg-[#111111] ring-accent/40 shadow-2xl'
                      : 'bg-card ring-white/10 hover:ring-white/25'
                  }`}
                >
                {/* Header Row Trigger */}
                <button
                  type="button"
                  onClick={() => toggleService(service.id)}
                  className="w-full p-6 sm:p-10 flex items-center justify-between gap-6 text-left group focus:outline-none"
                  aria-expanded={isExpanded}
                >
                  <div className="flex items-center gap-6 sm:gap-12">
                    <span
                      className={`font-mono text-3xl sm:text-5xl font-extrabold transition-colors duration-500 ${
                        isExpanded ? 'text-accent' : 'text-accent/35 group-hover:text-accent/80'
                      }`}
                    >
                      {service.number}
                    </span>
                    <h3 className="font-display font-bold text-2xl sm:text-4xl text-white group-hover:text-accent transition-colors">
                      {service.title}
                    </h3>
                  </div>

                  <div className={`w-10 h-10 shrink-0 rounded-full border border-white/10 flex items-center justify-center transition-all duration-300 ${
                    isExpanded ? 'bg-accent text-white border-accent rotate-180' : 'bg-white/5 text-white group-hover:bg-white/10'
                  }`}>
                    {isExpanded ? <Minus className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
                  </div>
                </button>

                {/* Expanded Content Body */}
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: 'easeInOut' }}
                    >
                      <div className="px-6 sm:px-10 pb-10 pt-2 border-t border-white/5 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                        {/* Description */}
                        <div className="lg:col-span-5 space-y-6">
                          <p className="text-base sm:text-lg text-ink-2 leading-relaxed">
                            {service.description}
                          </p>

                          <div className="pt-2">
                            <span className="text-xs font-mono text-ink-3 uppercase tracking-wider block mb-3">
                              PRIMARY TECH & METHODOLOGY
                            </span>
                            <div className="flex flex-wrap gap-2">
                              {service.capabilities.map((cap, capIdx) => (
                                <span
                                  key={capIdx}
                                  className="px-3 py-1 rounded-sm bg-white/5 border border-white/5 text-xs text-white"
                                >
                                  {cap}
                                </span>
                              ))}
                            </div>
                          </div>

                          <button
                            onClick={() => onOpenInquiryWithService(service.title)}
                            className="inline-flex items-center gap-3 px-6 py-3 rounded-sm bg-accent text-white font-bold text-xs uppercase tracking-widest hover:bg-white hover:text-black transition-all duration-200 shadow-lg active:scale-95"
                          >
                            <span>Initiate {service.title}</span>
                            <ArrowUpRight className="w-4 h-4" />
                          </button>
                        </div>

                        {/* Deliverables Checklist */}
                        <div className="lg:col-span-7 bg-card p-6 sm:p-8 rounded-xl ring-1 ring-white/10 space-y-4">
                          <h4 className="text-xs font-mono font-bold text-ink-3 uppercase tracking-widest">
                            KEY DELIVERABLES & OUTCOMES
                          </h4>
                          <div className="grid grid-cols-1 gap-3">
                            {service.deliverables.map((deliv, dIdx) => (
                              <motion.div
                                key={dIdx}
                                initial={{ opacity: 0, x: -8 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.4, delay: 0.12 + dIdx * 0.06 }}
                                className="flex items-start gap-3 text-sm text-ink"
                              >
                                <CheckCircle2 className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                                <span>{deliv}</span>
                              </motion.div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
                </SpotlightCard>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
