import React from 'react';
import { ArrowUp } from 'lucide-react';
import { SITE, WHATSAPP_URL, SOCIAL_LINKS } from '../data/siteConfig';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="w-full bg-[#050505] text-ink pt-24 pb-12 px-6 md:px-12 relative overflow-hidden">
      <div className="max-w-7xl mx-auto space-y-20">
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 justify-between">
          {/* Oversized Brand Display */}
          <div className="md:col-span-5 space-y-6">
            <h2 className="font-display font-black text-4xl sm:text-5xl tracking-wider text-white">
              AURVEX<span className="text-accent">TECH</span>
            </h2>
            <p className="text-sm text-ink-2 max-w-sm leading-relaxed">
              A modern technology, software, digital products, startup development, branding, design, and digital marketing company.
            </p>
            <div className="text-xs font-mono text-ink-3">
              GLOBAL STUDIO // HEADQUARTERED FOR DIGITAL EXPANSION
            </div>
          </div>

          {/* Quick Links Navigation */}
          <div className="md:col-span-2 space-y-4">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-ink-3 block">
              NAVIGATION
            </span>
            <ul className="space-y-2 text-sm text-ink-2">
              <li>
                <a href="#services" className="hover:text-white transition-colors">Services</a>
              </li>
              <li>
                <a href="#projects" className="hover:text-white transition-colors">Projects</a>
              </li>
              <li>
                <a href="#process" className="hover:text-white transition-colors">Process</a>
              </li>
              <li>
                <a href="#company" className="hover:text-white transition-colors">Approach</a>
              </li>
              <li>
                <a href="#faq" className="hover:text-white transition-colors">FAQ</a>
              </li>
              <li>
                <a href="#founder" className="hover:text-white transition-colors">Leadership</a>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="md:col-span-3 space-y-4">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-ink-3 block">
              DIRECT CONTACT
            </span>
            <div className="space-y-2 text-sm text-ink-2">
              <div>
                <span className="text-xs text-ink-3 uppercase block">General Inquiries & Briefs:</span>
                <a href={`mailto:${SITE.email}`} className="text-white hover:text-accent transition-colors font-medium">
                  {SITE.email}
                </a>
              </div>
              {/* Rendered only once a real number is set in siteConfig.ts */}
              {WHATSAPP_URL && (
                <div className="pt-2">
                  <span className="text-xs text-ink-3 uppercase block">Direct WhatsApp Desk:</span>
                  <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="text-white hover:text-accent transition-colors font-medium">
                    {SITE.whatsapp.display}
                  </a>
                </div>
              )}
            </div>
          </div>

          {/* Social Platforms */}
          {SOCIAL_LINKS.length > 0 && (
            <div className="md:col-span-2 space-y-4">
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-ink-3 block">
                SOCIAL CHANNELS
              </span>
              <ul className="space-y-2 text-sm text-ink-2">
                {SOCIAL_LINKS.map((social) => (
                  <li key={social.label}>
                    <a href={social.href} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                      {social.label} ↗
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Oversized wordmark — the page signs off with the name rather than
            trailing away into small print. Clipped so it reads as a masthead. */}
        <div aria-hidden="true" className="relative -mb-4 select-none overflow-hidden">
          <div className="font-display font-black leading-[0.78] tracking-tighter text-[16vw] text-transparent [-webkit-text-stroke:1px_rgba(255,255,255,0.14)]">
            AURVEX<span className="[-webkit-text-stroke:1px_rgba(0,82,255,0.5)]">TECH</span>
          </div>
          {/* Fade the baseline into the footer so it sits in the page, not on it */}
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-[#050505] to-transparent" />
        </div>

        {/* Bottom copyright and Back to Top */}
        <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-ink-3">
          <div>
            © {new Date().getFullYear()} <strong className="text-white">{SITE.name}</strong>. All rights reserved. {SITE.tagline}
          </div>

          <button
            type="button"
            onClick={scrollToTop}
            className="flex items-center gap-2 text-xs uppercase font-mono tracking-widest text-ink-2 hover:text-white transition-colors group"
          >
            <span>Back to Top</span>
            <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-accent group-hover:text-white transition-all">
              <ArrowUp className="w-4 h-4" />
            </div>
          </button>
        </div>
      </div>
    </footer>
  );
};
