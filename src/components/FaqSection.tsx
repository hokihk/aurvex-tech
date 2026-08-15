import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Plus, Minus, HelpCircle } from 'lucide-react';
import { SITE } from '../data/siteConfig';
import { RevealText } from './RevealText';

interface FaqItem {
  id: string;
  category: string;
  question: string;
  answer: string;
}

/**
 * NOTE: these questions and answers are mirrored as FAQPage JSON-LD in
 * index.html for rich results in search. Keep both in sync when editing.
 */
const FAQS: FaqItem[] = [
  {
    id: 'faq-1',
    category: 'TIMELINE & SPEED',
    question: 'What is the typical engagement timeline for a full digital product build?',
    answer: 'Timeline depends on architectural complexity and project scope. MVP rapid deployment usually takes 4 to 8 weeks, while full enterprise SaaS platforms or complex AI integrations span 12 to 16 weeks. We work in disciplined 2-week sprint cycles with weekly demo builds.',
  },
  {
    id: 'faq-2',
    category: 'IP & SECURITY',
    question: 'How do you handle intellectual property (IP) rights and security NDAs?',
    answer: '100% of all intellectual property, source code, designs, and raw assets belong exclusively to you upon project milestones. We sign comprehensive mutual Non-Disclosure Agreements (NDAs) before any deep-dive architecture discussions or code reviews.',
  },
  {
    id: 'faq-3',
    category: 'ENGAGEMENT MODELS',
    question: 'What engagement structures and pricing models do you offer?',
    answer: 'We operate primarily on Fixed-Scope Precision Contracts for clearly defined builds, and Dedicated Engineering Sprints (Retainer) for evolving product ecosystems and venture scaling. Every engagement includes transparent milestone deliverables with no hidden costs.',
  },
  {
    id: 'faq-4',
    category: 'POST-LAUNCH & INFRASTRUCTURE',
    question: 'Do you provide post-launch maintenance, monitoring, and scaling support?',
    answer: 'Yes. We offer continuous SLA-backed maintenance, automated Cloud Run/AWS server infrastructure monitoring, security audits, and dedicated feature sprint add-ons to ensure your product scales seamlessly without operational bottlenecks.',
  },
  {
    id: 'faq-5',
    category: 'LEADERSHIP & ADVISORY',
    question: 'How involved is executive leadership during the product development lifecycle?',
    answer: 'Direct founder oversight is built into every project. You work directly with senior product architects and our founder (combining business law, startup venture building, and software engineering expertise) to ensure strategic business goals match technical execution.',
  },
  {
    id: 'faq-6',
    category: 'AI & SYSTEM INTEGRATION',
    question: 'Can you integrate custom AI models, LLMs, and automated workflows into our current app?',
    answer: 'Absolutely. We specialize in server-side AI integrations—including custom Gemini API pipelines, vector databases, multi-agent automated systems, and real-time data processing—engineered securely so your proprietary data never leaks.',
  },
];

export const FaqSection: React.FC = () => {
  const [openId, setOpenId] = useState<string | null>('faq-1');

  const toggleFaq = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section id="faq" className="w-full py-28 md:py-36 px-6 md:px-12 border-b border-white/5 relative">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="h-[1px] w-8 bg-accent" />
              <span className="text-xs uppercase tracking-[0.25em] text-ink-3 font-mono font-semibold">
                [08 // FREQUENTLY ASKED QUESTIONS]
              </span>
            </div>
            <h2 className="font-display font-extrabold text-4xl sm:text-6xl text-white tracking-tight leading-[1.02]">
              <RevealText text="Clear answers for" />
              <br />
              <RevealText text="high-stakes builds" delay={0.12} />
              <span className="text-accent">.</span>
            </h2>
          </div>
          <p className="text-sm text-ink-2 max-w-md leading-relaxed font-normal">
            Everything you need to know about our engineering methodology, intellectual property rights, delivery timelines, and partnership terms.
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-4 max-w-4xl mx-auto">
          {FAQS.map((faq, idx) => {
            const isOpen = openId === faq.id;

            return (
              <motion.div
                key={faq.id}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: idx * 0.06 }}
                className={`rounded-lg border transition-all duration-300 overflow-hidden ${
                  isOpen
                    ? 'bg-surface-1 border-accent/40 shadow-xl'
                    : 'bg-surface-1/50 border-white/5 hover:border-white/20'
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(faq.id)}
                  className="w-full p-6 sm:p-8 flex items-start justify-between text-left gap-4 group cursor-pointer focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <div className="space-y-2 pr-4">
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-xs text-ink-3 font-bold tracking-widest uppercase">
                        [{faq.category}]
                      </span>
                    </div>
                    <h3 className="font-display font-bold text-lg sm:text-xl text-white group-hover:text-accent transition-colors">
                      {faq.question}
                    </h3>
                  </div>

                  <div
                    className={`w-8 h-8 rounded-full border flex items-center justify-center shrink-0 transition-all duration-300 ${
                      isOpen
                        ? 'bg-accent border-accent text-white rotate-180'
                        : 'border-white/10 text-ink-3 group-hover:border-white/30 group-hover:text-white'
                    }`}
                  >
                    {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="content"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <div className="px-6 pb-6 sm:px-8 sm:pb-8 pt-0 border-t border-white/5 text-ink-2 text-sm sm:text-base leading-relaxed font-normal">
                        <p className="pt-4">{faq.answer}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

        {/* Direct Contact Callout */}
        <div className="p-8 rounded-lg bg-surface-1 border border-white/5 flex flex-col sm:flex-row items-center justify-between gap-6 max-w-4xl mx-auto">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-accent/10 border border-accent/20 flex items-center justify-center text-accent shrink-0">
              <HelpCircle className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-display font-bold text-base text-white">Have a specific question not listed here?</h4>
              <p className="text-xs text-ink-2">Our technical team and leadership respond to all project inquiries within 24 hours.</p>
            </div>
          </div>
          <a
            href={`mailto:${SITE.email}`}
            className="px-5 py-2.5 rounded-sm bg-white/5 hover:bg-white/10 border border-white/10 text-xs text-white font-mono font-bold uppercase tracking-wider transition-colors shrink-0"
          >
            Ask a Question
          </a>
        </div>
      </div>
    </section>
  );
};
