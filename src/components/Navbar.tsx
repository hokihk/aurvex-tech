import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { MagneticButton } from './MagneticButton';
import { SITE } from '../data/siteConfig';
import { useActiveSection } from '../hooks/useActiveSection';

interface NavbarProps {
  onOpenInquiry: () => void;
}

const NAV_LINKS = [
  { name: 'Services', id: 'services' },
  { name: 'Projects', id: 'projects' },
  { name: 'Process', id: 'process' },
  { name: 'Approach', id: 'company' },
  { name: 'FAQ', id: 'faq' },
  { name: 'Leadership', id: 'founder' }
];

const NAV_IDS = NAV_LINKS.map((l) => l.id);

export const Navbar: React.FC<NavbarProps> = ({ onOpenInquiry }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const activeId = useActiveSection(NAV_IDS);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // The mobile overlay covers the page — lock the scroll behind it and let
  // Escape dismiss it.
  useEffect(() => {
    if (!mobileMenuOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMobileMenuOpen(false);
    };

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [mobileMenuOpen]);


  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? 'py-4 bg-ground/80 backdrop-blur-md border-b border-white/10 shadow-2xl' : 'py-6 bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          {/* Brand Logo */}
          <a
            href="#"
            className="flex items-center gap-3 group focus:outline-none"
            aria-label="AURVEX TECH Homepage"
          >
            <div className="w-8 h-8 rounded-sm bg-white text-black font-extrabold flex items-center justify-center font-display tracking-tight group-hover:bg-accent group-hover:text-white transition-colors duration-300">
              A
            </div>
            <div className="flex flex-col">
              <span className="font-display font-bold text-lg tracking-wider text-ink group-hover:text-white transition-colors">
                AURVEX<span className="text-accent ml-0.5">TECH</span>
              </span>
              <span className="text-[9px] tracking-[0.2em] text-ink-3 uppercase font-semibold">
                Product Studio
              </span>
            </div>
          </a>

          {/* Desktop Links */}
          <nav
            aria-label="Section navigation"
            className="hidden md:flex items-center gap-8 text-[11px] uppercase tracking-[0.2em] font-medium text-ink-2"
          >
            {NAV_LINKS.map((link) => {
              const isActive = activeId === link.id;
              return (
                <a
                  key={link.id}
                  href={`#${link.id}`}
                  aria-current={isActive ? 'true' : undefined}
                  className={`relative group py-1 transition-colors duration-200 ${
                    isActive ? 'text-white' : 'hover:text-white'
                  }`}
                >
                  {link.name}
                  {/* Active marker slides between links; hover draws its own. */}
                  {isActive && (
                    <motion.span
                      layoutId="nav-active"
                      transition={{ type: 'spring', stiffness: 420, damping: 34 }}
                      className="absolute -bottom-0.5 left-0 right-0 h-[1.5px] bg-accent"
                    />
                  )}
                  {!isActive && (
                    <span className="absolute -bottom-0.5 left-0 w-0 h-[1.5px] bg-white/40 transition-all duration-200 group-hover:w-full" />
                  )}
                </a>
              );
            })}
          </nav>

          {/* Right Actions */}
          <div className="hidden md:flex items-center gap-4">
            <MagneticButton
              onClick={onOpenInquiry}
              className="gap-2 px-6 py-3 rounded-sm bg-ink text-ground font-bold text-xs uppercase tracking-widest hover:bg-accent hover:text-white transition-all duration-300 group shadow-lg active:scale-95"
            >
              <span>Start a Project</span>
              <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 text-accent group-hover:text-white" />
            </MagneticButton>
          </div>

          {/* Mobile Menu Trigger */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-md bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-colors"
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-navigation"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </header>

      {/* Fullscreen Mobile Overlay Navigation */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            id="mobile-navigation"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-ground flex flex-col justify-between p-8 pt-28 md:hidden overflow-y-auto"
          >
            <div className="flex flex-col gap-6">
              <span className="text-xs uppercase tracking-widest text-ink-3">
                Navigation
              </span>
              {NAV_LINKS.map((link) => {
                const isActive = activeId === link.id;
                return (
                  <a
                    key={link.id}
                    href={`#${link.id}`}
                    aria-current={isActive ? 'true' : undefined}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`font-display text-3xl font-bold transition-colors flex items-center gap-3 ${
                      isActive ? 'text-accent' : 'text-ink hover:text-accent'
                    }`}
                  >
                    {isActive && <span className="h-[2px] w-6 bg-accent" />}
                    {link.name}
                  </a>
                );
              })}
            </div>

            <div className="flex flex-col gap-4 border-t border-white/10 pt-8">
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenInquiry();
                }}
                className="w-full py-4 rounded-md bg-[#2563EB] text-white font-semibold text-sm uppercase tracking-wider flex items-center justify-center gap-2 shadow-xl shadow-blue-600/20"
              >
                <span>Start a Project</span>
                <ArrowUpRight className="w-5 h-5" />
              </button>

              <div className="flex flex-wrap gap-2 justify-between items-center text-xs text-ink-2 pt-2">
                <span>{SITE.name} Studio</span>
                <a href={`mailto:${SITE.email}`} className="hover:text-white transition-colors">
                  {SITE.email}
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
