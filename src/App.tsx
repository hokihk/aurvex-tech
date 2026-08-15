import React, { useCallback, useEffect, useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { TrustTicker } from './components/TrustTicker';
import { IntroSection } from './components/IntroSection';
import { SelectedWork } from './components/SelectedWork';
import { CaseStudyModal } from './components/CaseStudyModal';
import { ServicesSection } from './components/ServicesSection';
import { PhilosophyKeywords } from './components/PhilosophyKeywords';
import { ProcessSection } from './components/ProcessSection';
import { BlueprintInterstitial } from './components/BlueprintInterstitial';
import { CompanySection } from './components/CompanySection';
import { StatsSection } from './components/StatsSection';
import { FaqSection } from './components/FaqSection';
import { FounderSection } from './components/FounderSection';
import { ProjectInquiryModal } from './components/ProjectInquiryModal';
import { FinalCTA } from './components/FinalCTA';
import { Footer } from './components/Footer';
import { CustomCursor } from './components/CustomCursor';
import { ScrollProgress } from './components/ScrollProgress';
import { AmbientLight } from './components/AmbientLight';
import { PageBackdrop } from './components/PageBackdrop';
import { Preloader } from './components/Preloader';
import { PROJECTS } from './data/projectsData';
import { workHref, projectIdFromHash } from './lib/workUrl';
import { Project } from './types';

export default function App() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [inquiryModalOpen, setInquiryModalOpen] = useState<boolean>(false);
  const [initialServiceForInquiry, setInitialServiceForInquiry] = useState<string | undefined>(undefined);

  // Case studies live in a modal, but they are the sales asset — they need to be
  // linkable. The open study is mirrored into the URL hash so a project can be
  // shared, bookmarked and reached with the browser's back button.
  // (Hash rather than a path: this deploys as a static SPA with no server
  // rewrites. Real search indexing of each study would need prerendering.)
  const syncFromHash = useCallback(() => {
    const id = projectIdFromHash(window.location.hash);
    setSelectedProject(id ? PROJECTS.find((p) => p.id === id) ?? null : null);
  }, []);

  useEffect(() => {
    syncFromHash();
    window.addEventListener('hashchange', syncFromHash);
    return () => window.removeEventListener('hashchange', syncFromHash);
  }, [syncFromHash]);

  const openProject = (project: Project) => {
    window.location.hash = workHref(project.id);
  };

  const closeProject = () => {
    // Prefer going back so the deep link does not pile up history entries;
    // fall back to clearing the hash when the study was opened directly.
    if (window.history.state !== null || window.history.length > 1) {
      window.history.back();
    } else {
      window.location.hash = '';
    }
  };

  const handleOpenInquiry = (serviceName?: string) => {
    setInitialServiceForInquiry(serviceName);
    setInquiryModalOpen(true);
  };

  const handleStartSimilarProject = (projectTitle: string) => {
    setInitialServiceForInquiry(`Custom Build Similar to ${projectTitle}`);
    setInquiryModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-ground text-ink selection:bg-[#2563EB] selection:text-white font-sans antialiased overflow-x-hidden">
      <Preloader />

      <a href="#main" className="skip-link">
        Skip to content
      </a>

      {/* Fixed ground layer: column guides, travelling light, grain.
          Sections below are transparent so this shows through them. */}
      <PageBackdrop />

      {/* Cursor-tracking page glow, blends over the content */}
      <AmbientLight />

      {/* Custom Context-Aware Desktop Cursor */}
      <CustomCursor />

      {/* Reading progress hairline */}
      <ScrollProgress />

      {/* Floating Translucent Header Navigation */}
      <Navbar onOpenInquiry={() => handleOpenInquiry()} />

      <main id="main" className="relative z-10">
        {/* Hero Section with Interactive 3D Canvas */}
        <Hero onOpenInquiry={() => handleOpenInquiry()} />

        {/* Horizontal Ticker Statement Strip */}
        <TrustTicker />

        {/* Editorial Brand Manifesto / Intro */}
        <IntroSection />

        {/* Featured Case Studies Showcase */}
        <SelectedWork onSelectProject={openProject} />

        {/* Capabilities & Deliverables */}
        <ServicesSection onOpenInquiryWithService={(service) => handleOpenInquiry(service)} />

        {/* Brand Philosophy & Kinetic Keywords */}
        <PhilosophyKeywords />

        {/* 6-Phase Engineering Methodology */}
        <ProcessSection />

        {/* Scroll-built structural schematic — carries the transition out of the
            pinned process section instead of leaving it to empty space */}
        <BlueprintInterstitial />

        {/* Approach & Strategy */}
        <CompanySection />

        {/* Measurable Impact Metrics */}
        <StatsSection />

        {/* Accordion Frequently Asked Questions */}
        <FaqSection />

        {/* Founder & Leadership */}
        <FounderSection onOpenInquiry={() => handleOpenInquiry('Founder Direct Discovery Session')} />

        {/* Cinematic Final Call to Action */}
        <FinalCTA onOpenInquiry={() => handleOpenInquiry()} />
      </main>

      {/* Oversized Luxury Footer */}
      <Footer />

      {/* Case Study Deep-Dive Drawer */}
      <CaseStudyModal
        project={selectedProject}
        onClose={closeProject}
        onStartSimilarProject={handleStartSimilarProject}
      />

      {/* Interactive Project Inquiry & Estimator Modal */}
      <ProjectInquiryModal
        isOpen={inquiryModalOpen}
        onClose={() => {
          setInquiryModalOpen(false);
          setInitialServiceForInquiry(undefined);
        }}
        initialService={initialServiceForInquiry}
      />
    </div>
  );
}

