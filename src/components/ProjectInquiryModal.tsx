import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, CheckCircle2, ArrowRight, Sparkles, Send, AlertTriangle, Loader2, Mail } from 'lucide-react';
import { ProjectInquiryForm } from '../types';
import { MagneticButton } from './MagneticButton';
import { useModalChrome } from '../hooks/useModalChrome';
import { submitInquiry, mailtoHref, SubmitResult } from '../lib/submitInquiry';
import { SITE } from '../data/siteConfig';

interface ProjectInquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialService?: string;
}

const DEFAULT_SERVICE = 'Digital Product Development';

const emptyForm = (service?: string): ProjectInquiryForm => ({
  serviceTypes: [service || DEFAULT_SERVICE],
  budgetRange: '$25,000 – $50,000',
  timeline: '2 – 4 Months',
  description: '',
  name: '',
  email: '',
  company: '',
  phone: ''
});

export const ProjectInquiryModal: React.FC<ProjectInquiryModalProps> = ({
  isOpen,
  onClose,
  initialService
}) => {
  const [step, setStep] = useState<number>(1);
  const [result, setResult] = useState<SubmitResult | null>(null);
  const [isSending, setIsSending] = useState(false);
  const [formData, setFormData] = useState<ProjectInquiryForm>(() => emptyForm(initialService));

  const containerRef = useModalChrome(isOpen, onClose);

  // The modal stays mounted between openings, so the useState initialiser only
  // ever runs once. Re-seed the form each time it opens, otherwise clicking
  // "Initiate Brand & Digital Presence" would reopen with the previous service.
  useEffect(() => {
    if (!isOpen) return;
    setStep(1);
    setResult(null);
    setIsSending(false);
    setFormData(emptyForm(initialService));
  }, [isOpen, initialService]);

  const availableServices = [
    'Digital Product Development',
    'Product & Experience Design (UI/UX)',
    'Brand Strategy & Digital Identity',
    'Growth & Digital Marketing',
    'Enterprise Custom Software'
  ];

  const budgetOptions = [
    '$15,000 – $25,000',
    '$25,000 – $50,000',
    '$50,000 – $100,000',
    '$100,000+'
  ];

  const timelineOptions = [
    'Immediate (Under 1 Month)',
    '1 – 2 Months',
    '2 – 4 Months',
    '4+ Months / Ongoing'
  ];

  const toggleService = (service: string) => {
    setFormData((prev) => ({
      ...prev,
      serviceTypes: prev.serviceTypes.includes(service)
        ? prev.serviceTypes.filter((s) => s !== service)
        : [...prev.serviceTypes, service]
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSending) return;

    setIsSending(true);
    setResult(null);
    const outcome = await submitInquiry(formData);
    setIsSending(false);
    setResult(outcome);
  };

  const isSuccess = result?.status === 'sent' || result?.status === 'mailto';

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 sm:p-6 md:p-10 overflow-y-auto">
          {/* Backdrop — click to dismiss */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 z-0 bg-black/90 backdrop-blur-xl"
          />

          {/* Modal Container */}
          <motion.div
            ref={containerRef}
            tabIndex={-1}
            role="dialog"
            aria-modal="true"
            aria-labelledby="inquiry-modal-title"
            initial={{ opacity: 0, scale: 0.95, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 30 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 w-full max-w-3xl bg-well border border-white/10 rounded-2xl shadow-2xl overflow-hidden my-auto text-ink focus:outline-none"
          >
            {/* Header Bar */}
            <div className="flex items-center justify-between p-6 sm:p-8 border-b border-white/5 bg-well/80 backdrop-blur-md">
              <div>
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-accent" />
                  <span className="font-mono text-xs uppercase tracking-widest text-ink-3 font-bold">
                    [PROJECT INITIATION ENGINE]
                  </span>
                </div>
                <h3 id="inquiry-modal-title" className="font-display font-bold text-2xl text-white mt-1">
                  Start a Project with {SITE.name}
                </h3>
              </div>

              <button
                type="button"
                onClick={onClose}
                aria-label="Close project inquiry"
                className="p-2 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 sm:p-10 space-y-8">
              {isSuccess ? (
                /* Success Confirmation View */
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="py-12 text-center space-y-6"
                >
                  <div className="w-20 h-20 rounded-full bg-accent/20 border border-accent/40 text-accent flex items-center justify-center mx-auto shadow-2xl">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>

                  <div className="space-y-2">
                    <h4 className="font-display font-bold text-3xl text-white">
                      {result?.status === 'mailto' ? 'Your brief is ready to send.' : 'Project Request Received.'}
                    </h4>
                    <p className="text-base text-ink-2 max-w-md mx-auto">
                      {result?.status === 'mailto' ? (
                        <>
                          We opened your mail client with the brief pre-filled — hit send and we
                          will reply within 24 hours. If nothing opened, write to{' '}
                          <a href={mailtoHref(formData)} className="text-white underline underline-offset-4">
                            {SITE.email}
                          </a>
                          .
                        </>
                      ) : (
                        <>
                          Thank you, <strong className="text-white">{formData.name}</strong>. Our senior
                          architecture team will review your specs and schedule an initial discovery
                          brief within 24 hours.
                        </>
                      )}
                    </p>
                  </div>

                  <div className="p-6 rounded-lg bg-surface-1 border border-white/5 text-left max-w-lg mx-auto space-y-3 text-xs text-ink-2">
                    <div className="flex justify-between gap-6 border-b border-white/5 pb-2">
                      <span className="font-mono uppercase text-ink-3 shrink-0">SERVICES:</span>
                      <span className="text-white font-medium text-right">{formData.serviceTypes.join(', ')}</span>
                    </div>
                    <div className="flex justify-between gap-6 border-b border-white/5 pb-2">
                      <span className="font-mono uppercase text-ink-3 shrink-0">ESTIMATED BUDGET:</span>
                      <span className="text-white font-medium">{formData.budgetRange}</span>
                    </div>
                    <div className="flex justify-between gap-6">
                      <span className="font-mono uppercase text-ink-3 shrink-0">TARGET TIMELINE:</span>
                      <span className="text-white font-medium">{formData.timeline}</span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={onClose}
                    className="px-8 py-3.5 rounded-sm bg-accent text-white font-bold text-xs uppercase tracking-widest hover:bg-white hover:text-black transition-colors shadow-xl"
                  >
                    Return to Website
                  </button>
                </motion.div>
              ) : (
                /* Multi-step Interactive Form */
                <form onSubmit={handleSubmit} className="space-y-8">
                  {/* Progress Indicators */}
                  <div className="flex items-center gap-4 text-xs font-mono">
                    <span className={`px-3 py-1 rounded-sm ${step === 1 ? 'bg-accent text-white font-bold' : 'bg-white/5 text-ink-2'}`}>
                      01. Scope & Budget
                    </span>
                    <span className="text-white/20">—</span>
                    <span className={`px-3 py-1 rounded-sm ${step === 2 ? 'bg-accent text-white font-bold' : 'bg-white/5 text-ink-2'}`}>
                      02. Project Details & Contact
                    </span>
                  </div>

                  {step === 1 && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
                      {/* Service Type Selection */}
                      <div className="space-y-3">
                        <label className="text-xs font-mono font-bold uppercase tracking-wider text-ink-2 block">
                          Select Required Services (Multiple Allowed):
                        </label>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {availableServices.map((service) => {
                            const isSelected = formData.serviceTypes.includes(service);
                            return (
                              <button
                                key={service}
                                type="button"
                                aria-pressed={isSelected}
                                onClick={() => toggleService(service)}
                                className={`p-3.5 rounded-lg border text-left text-xs font-semibold transition-all duration-200 flex items-center justify-between gap-2 ${
                                  isSelected
                                    ? 'bg-accent/20 border-accent text-white shadow-lg'
                                    : 'bg-surface-1 border-white/5 text-ink-2 hover:border-white/20 hover:text-white'
                                }`}
                              >
                                <span>{service}</span>
                                {isSelected && <CheckCircle2 className="w-4 h-4 text-accent shrink-0" />}
                              </button>
                            );
                          })}
                        </div>
                        {/* The custom service passed from a case study is not in the
                            list above, so surface it explicitly. */}
                        {formData.serviceTypes
                          .filter((s) => !availableServices.includes(s))
                          .map((custom) => (
                            <div
                              key={custom}
                              className="flex items-center justify-between gap-2 p-3.5 rounded-lg border border-accent bg-accent/20 text-xs font-semibold text-white"
                            >
                              <span>{custom}</span>
                              <button
                                type="button"
                                onClick={() => toggleService(custom)}
                                aria-label={`Remove ${custom}`}
                                className="text-white/60 hover:text-white"
                              >
                                <X className="w-4 h-4" />
                              </button>
                            </div>
                          ))}
                      </div>

                      {/* Budget Range Selection */}
                      <div className="space-y-3">
                        <label className="text-xs font-mono font-bold uppercase tracking-wider text-ink-2 block">
                          Target Budget Range:
                        </label>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                          {budgetOptions.map((budget) => {
                            const isSelected = formData.budgetRange === budget;
                            return (
                              <button
                                key={budget}
                                type="button"
                                aria-pressed={isSelected}
                                onClick={() => setFormData({ ...formData, budgetRange: budget })}
                                className={`p-3 rounded-lg border text-center text-xs font-mono transition-all duration-200 ${
                                  isSelected
                                    ? 'bg-accent border-accent text-white font-bold'
                                    : 'bg-surface-1 border-white/5 text-ink-2 hover:border-white/20'
                                }`}
                              >
                                {budget}
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      {/* Timeline Selection */}
                      <div className="space-y-3">
                        <label className="text-xs font-mono font-bold uppercase tracking-wider text-ink-2 block">
                          Estimated Target Timeline:
                        </label>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                          {timelineOptions.map((time) => {
                            const isSelected = formData.timeline === time;
                            return (
                              <button
                                key={time}
                                type="button"
                                aria-pressed={isSelected}
                                onClick={() => setFormData({ ...formData, timeline: time })}
                                className={`p-3 rounded-lg border text-center text-xs transition-all duration-200 ${
                                  isSelected
                                    ? 'bg-white text-black font-bold border-white'
                                    : 'bg-surface-1 border-white/5 text-ink-2 hover:border-white/20'
                                }`}
                              >
                                {time}
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      <div className="pt-4 flex justify-end">
                        <MagneticButton
                          type="button"
                          onClick={() => setStep(2)}
                          className="px-6 py-3 rounded-sm bg-accent hover:bg-white hover:text-black text-white font-bold text-xs uppercase tracking-widest flex items-center gap-2 transition-all shadow-lg"
                        >
                          <span>Next: Contact Information</span>
                          <ArrowRight className="w-4 h-4" />
                        </MagneticButton>
                      </div>
                    </motion.div>
                  )}

                  {step === 2 && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                      {/* Description Textarea */}
                      <div className="space-y-2">
                        <label htmlFor="inquiry-brief" className="text-xs font-mono font-bold uppercase tracking-wider text-ink-2 block">
                          Brief Project Summary / Objectives:
                        </label>
                        <textarea
                          id="inquiry-brief"
                          rows={3}
                          required
                          placeholder="Tell us briefly about your product goals, target audience, or current platform..."
                          value={formData.description}
                          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                          className="w-full p-4 rounded-lg bg-surface-1 border border-white/5 text-white text-sm focus:border-accent focus:outline-none transition-colors"
                        />
                      </div>

                      {/* Contact Info Inputs */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label htmlFor="inquiry-name" className="text-xs font-mono text-ink-2 block">Your Name *</label>
                          <input
                            id="inquiry-name"
                            type="text"
                            required
                            autoComplete="name"
                            placeholder="e.g. Sarah Mansour"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            className="w-full p-3.5 rounded-lg bg-surface-1 border border-white/5 text-white text-sm focus:border-accent focus:outline-none"
                          />
                        </div>

                        <div className="space-y-2">
                          <label htmlFor="inquiry-email" className="text-xs font-mono text-ink-2 block">Work Email *</label>
                          <input
                            id="inquiry-email"
                            type="email"
                            required
                            autoComplete="email"
                            placeholder="e.g. sarah@company.com"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            className="w-full p-3.5 rounded-lg bg-surface-1 border border-white/5 text-white text-sm focus:border-accent focus:outline-none"
                          />
                        </div>

                        <div className="space-y-2">
                          <label htmlFor="inquiry-company" className="text-xs font-mono text-ink-2 block">Company / Venture Name</label>
                          <input
                            id="inquiry-company"
                            type="text"
                            autoComplete="organization"
                            placeholder="e.g. Tadawi Health Group"
                            value={formData.company}
                            onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                            className="w-full p-3.5 rounded-lg bg-surface-1 border border-white/5 text-white text-sm focus:border-accent focus:outline-none"
                          />
                        </div>

                        <div className="space-y-2">
                          <label htmlFor="inquiry-phone" className="text-xs font-mono text-ink-2 block">Phone / WhatsApp (Optional)</label>
                          <input
                            id="inquiry-phone"
                            type="tel"
                            autoComplete="tel"
                            placeholder="+213 / +1 ..."
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            className="w-full p-3.5 rounded-lg bg-surface-1 border border-white/5 text-white text-sm focus:border-accent focus:outline-none"
                          />
                        </div>
                      </div>

                      {/* Submission failure — never leave the visitor without a route to us */}
                      {result?.status === 'error' && (
                        <div
                          role="alert"
                          className="flex items-start gap-3 p-4 rounded-lg bg-red-500/10 border border-red-500/30 text-sm text-red-200"
                        >
                          <AlertTriangle className="w-5 h-5 shrink-0 mt-0.5" />
                          <div className="space-y-1">
                            <p className="font-semibold text-red-100">{result.message}</p>
                            <a
                              href={mailtoHref(formData)}
                              className="inline-flex items-center gap-1.5 underline underline-offset-4 hover:text-white"
                            >
                              <Mail className="w-3.5 h-3.5" />
                              Send this brief by email instead
                            </a>
                          </div>
                        </div>
                      )}

                      <p className="text-[11px] text-ink-3 leading-relaxed">
                        We use these details only to respond to your inquiry. We never share them
                        with third parties.
                      </p>

                      <div className="pt-4 flex items-center justify-between gap-4 border-t border-white/5">
                        <button
                          type="button"
                          onClick={() => setStep(1)}
                          className="text-xs text-ink-2 hover:text-white uppercase tracking-wider font-semibold"
                        >
                          ← Back to Scope
                        </button>

                        <MagneticButton
                          type="submit"
                          disabled={isSending}
                          className="px-8 py-3.5 rounded-sm bg-accent hover:bg-white hover:text-black text-white font-bold text-xs uppercase tracking-widest flex items-center gap-2 shadow-xl transition-all active:scale-95 disabled:opacity-60 disabled:cursor-wait"
                        >
                          {isSending ? (
                            <>
                              <Loader2 className="w-4 h-4 animate-spin" />
                              <span>Sending…</span>
                            </>
                          ) : (
                            <>
                              <Send className="w-4 h-4" />
                              <span>Submit Project Proposal</span>
                            </>
                          )}
                        </MagneticButton>
                      </div>
                    </motion.div>
                  )}
                </form>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
