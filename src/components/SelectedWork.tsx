import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';
import { PROJECTS } from '../data/projectsData';
import { Project, PROJECT_CATEGORIES, ProjectCategory } from '../types';
import { RevealText } from './RevealText';
import { workHref } from '../lib/workUrl';

interface SelectedWorkProps {
  onSelectProject: (project: Project) => void;
}

type Filter = 'All' | ProjectCategory;

/**
 * One case study in the stack.
 *
 * Every card is sticky at a slightly lower offset than the one before it, so as
 * you scroll the cards pile up like a deck being dealt. The card underneath
 * scales down and dims as the next one arrives, which reads as depth.
 */
const ProjectCard: React.FC<{
  project: Project;
  index: number;
  total: number;
  onSelect: () => void;
}> = ({ project, index, total, onSelect }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ['start 0.18', 'end start']
  });

  // The last card never gets covered, so it should not shrink away.
  const isLast = index === total - 1;
  const scale = useTransform(scrollYProgress, [0, 1], [1, isLast ? 1 : 0.9]);
  const opacity = useTransform(scrollYProgress, [0, 0.85], [1, isLast ? 1 : 0.35]);

  return (
    <div
      ref={cardRef}
      className="sticky"
      style={{ top: `${96 + index * 18}px` }}
    >
      {/* A real anchor, not a div with role="button": each study has its own URL
          now, so this gets keyboard activation, open-in-new-tab and copy-link
          for free. The click handler only exists to keep the history clean. */}
      <motion.a
        href={workHref(project.id)}
        onClick={(e) => {
          e.preventDefault();
          onSelect();
        }}
        style={reduceMotion ? undefined : { scale, opacity }}
        aria-label={`Open the ${project.title} case study`}
        data-cursor="VIEW PROJECT →"
        className="edge-light group relative block w-full cursor-pointer overflow-hidden rounded-2xl bg-card ring-1 ring-white/10 shadow-[0_40px_120px_-30px_rgba(0,0,0,0.9)] transition-[box-shadow,ring] duration-500"
      >
        {/* Full-bleed imagery with the copy laid over it */}
        <div className="relative aspect-[16/11] sm:aspect-[16/9] lg:aspect-[21/9] w-full">
          <img
            src={project.image}
            alt={`${project.title} — ${project.subtitle}`}
            loading="lazy"
            decoding="async"
            className="absolute inset-0 h-full w-full object-cover grayscale-[0.55] contrast-110 brightness-[0.55] transition-all duration-[900ms] ease-out group-hover:grayscale-0 group-hover:brightness-[0.68] group-hover:scale-[1.04]"
          />

          {/* Legibility scrim: dark at the bottom, a cobalt wash on hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-ground via-ground/70 to-ground/25" />
          <div className="absolute inset-0 bg-gradient-to-r from-accent/0 to-accent/0 group-hover:from-accent/15 transition-all duration-700" />

          {/* Top rail: index + industry */}
          <div className="absolute inset-x-0 top-0 flex items-start justify-between p-6 sm:p-8 md:p-10">
            <span className="font-mono text-5xl sm:text-6xl font-extrabold leading-none text-white/15 transition-colors duration-500 group-hover:text-accent/70">
              {project.number}
            </span>
            <span className="rounded-full border border-white/15 bg-black/40 px-4 py-1.5 font-mono text-[10px] sm:text-xs uppercase tracking-[0.2em] text-white/80 backdrop-blur-md">
              {project.industry} · {project.year}
            </span>
          </div>

          {/* Bottom content */}
          <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8 md:p-10">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-2xl space-y-3">
                <h3 className="font-display text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white">
                  {project.title}
                </h3>
                <p className="text-xs sm:text-sm font-semibold uppercase tracking-[0.2em] text-accent">
                  {project.subtitle}
                </p>
                <p className="hidden sm:block text-sm md:text-base leading-relaxed text-ink-2 max-w-xl">
                  {project.description}
                </p>
              </div>

              {/* Headline metrics */}
              <div className="flex shrink-0 gap-6 sm:gap-10">
                {project.metrics.slice(0, 2).map((m) => (
                  <div key={m.label} className="min-w-0">
                    <div className="tabular font-mono text-xl sm:text-3xl font-bold text-white">
                      {m.value}
                    </div>
                    <div className="mt-1 text-[10px] sm:text-[11px] uppercase tracking-wider text-ink-3">
                      {m.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Footer rail: services + affordance */}
            <div className="mt-6 sm:mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-5">
              <div className="hidden md:flex flex-wrap gap-2">
                {project.services.slice(0, 3).map((service) => (
                  <span
                    key={service}
                    className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] font-medium text-ink-2 backdrop-blur-sm"
                  >
                    {service}
                  </span>
                ))}
              </div>

              <span className="inline-flex items-center gap-3 text-[11px] sm:text-xs font-bold uppercase tracking-[0.2em] text-white">
                <span className="transition-colors group-hover:text-accent">
                  Examine Case Study
                </span>
                <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 transition-all duration-300 group-hover:border-accent group-hover:bg-accent">
                  <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </span>
              </span>
            </div>
          </div>
        </div>
      </motion.a>
    </div>
  );
};

export const SelectedWork: React.FC<SelectedWorkProps> = ({ onSelectProject }) => {
  const [activeCategory, setActiveCategory] = useState<Filter>('All');

  const categories: Filter[] = ['All', ...PROJECT_CATEGORIES];

  const filteredProjects =
    activeCategory === 'All'
      ? PROJECTS
      : PROJECTS.filter((project) => project.category === activeCategory);

  return (
    <section
      id="projects"
      className="relative w-full border-b border-white/10 px-6 py-28 md:px-12 md:py-40"
    >
      <div className="mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="mb-16 flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <div>
            <div className="mb-5 flex items-center gap-3">
              <span className="h-[1px] w-8 bg-accent" />
              <span className="font-mono text-xs font-semibold uppercase tracking-[0.25em] text-ink-3">
                [02 // FEATURED CASE STUDIES]
              </span>
            </div>
            <h2 className="font-display text-4xl font-extrabold tracking-tight text-ink sm:text-6xl">
              <RevealText text="Selected Work." />
            </h2>
            <p className="mt-4 max-w-xl text-lg font-normal text-ink-2">
              Products and platforms designed to solve real business problems and scale
              digital market revenue.
            </p>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => {
              const isActive = activeCategory === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  aria-pressed={isActive}
                  onClick={() => setActiveCategory(cat)}
                  className={`relative rounded-full px-4 py-2 text-xs font-bold uppercase tracking-wider transition-colors duration-300 ${
                    isActive ? 'text-white' : 'text-ink-3 hover:text-white'
                  }`}
                >
                  {/* Shared element that slides between pills */}
                  {isActive && (
                    <motion.span
                      layoutId="work-filter-pill"
                      transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                      className="absolute inset-0 rounded-full bg-accent shadow-lg shadow-blue-600/25"
                    />
                  )}
                  <span className="relative z-10">{cat}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Stacking deck of case studies */}
        <div className="space-y-8">
          {filteredProjects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
              total={filteredProjects.length}
              onSelect={() => onSelectProject(project)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
