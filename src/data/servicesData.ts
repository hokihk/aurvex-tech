import { ServiceItem, ProcessStep, StatItem } from '../types';

export const SERVICES: ServiceItem[] = [
  {
    id: 'product-development',
    number: '01',
    title: 'Digital Product Development',
    description: 'We engineer mission-critical software, custom web applications, scalable mobile apps, and robust business engines built for longevity and extreme traffic.',
    deliverables: [
      'Web Applications (React, Next.js, Node.js, TypeScript)',
      'Cross-Platform Mobile Apps (iOS & Android)',
      'Enterprise Business Platforms & Portals',
      'Custom API Architectures & Cloud Microservices',
      'Database Architecture & High-Availability Infrastructure'
    ],
    capabilities: ['React', 'TypeScript', 'Node.js', 'Express', 'Python', 'React Native', 'Cloud Run', 'PostgreSQL / Firestore']
  },
  {
    id: 'product-design',
    number: '02',
    title: 'Product & Experience Design',
    description: 'We design intuitive, high-converting, and distinctive user interfaces. Every layout, interaction, and visual detail is crafted with optical precision.',
    deliverables: [
      'End-to-End Product Design (UI/UX)',
      'Scalable Enterprise Design Systems & UI Kits',
      'Interactive High-Fidelity Prototypes',
      'User Research, Flow Mapping & Usability Testing',
      'Design Audits & Conversion Optimization'
    ],
    capabilities: ['Figma Mastery', 'Design Tokens', 'Micro-Interactions', 'A/B Test Design', 'Accessibility (WCAG 2.1 AA)']
  },
  {
    id: 'brand-presence',
    number: '03',
    title: 'Brand & Digital Presence',
    description: 'We elevate brands with refined visual identities, art-directed digital experiences, and corporate web platforms that immediately establish market authority.',
    deliverables: [
      'Comprehensive Brand Strategy & Positioning',
      'Visual Identity Systems, Typography & Guidelines',
      'High-End Corporate Websites & Editorial Platforms',
      'Custom Interactive Digital Experiences',
      'Art Direction, Motion Graphics & 3D Assets'
    ],
    capabilities: ['Brand Architecture', 'Editorial Typography', '3D Motion', 'Interactive Canvas WebGL', 'Copywriting & Narrative']
  },
  {
    id: 'growth-marketing',
    number: '04',
    title: 'Growth & Digital Marketing',
    description: 'We build structured customer acquisition funnels, digital market expansion strategies, and data-driven product launch campaigns.',
    deliverables: [
      'Product Launch & Go-To-Market (GTM) Strategy',
      'High-Intent Customer Acquisition Campaigns',
      'Performance Marketing & Search Engine Strategy',
      'Strategic Content Creation & Thought Leadership',
      'Retention, Conversion Funnel & Analytics Tracking'
    ],
    capabilities: ['Growth Hacking', 'Funnel Optimization', 'GTM Planning', 'Analytics Engineering', 'Market Expansion']
  }
];

export const PROCESS_STEPS: ProcessStep[] = [
  {
    number: '01',
    title: 'Discover',
    tagline: 'Deep Market & Business Alignment',
    description: 'We immerse ourselves in your business ecosystem, interviewing stakeholders, auditing existing systems, analyzing competitive landscapes, and defining clear measurable success metrics.',
    deliverables: ['Stakeholder Alignment Workshops', 'Competitive Audit Matrix', 'Technical Feasibility Report', 'Project Scope Blueprint']
  },
  {
    number: '02',
    title: 'Strategy',
    tagline: 'Architecture & Product Roadmap',
    description: 'We map out product architecture, user journeys, data flow schemas, technology stacks, and prioritized feature milestones to ensure efficient development.',
    deliverables: ['System Architecture Diagram', 'Product Feature Backlog', 'UX Flow Schematics', 'GTM & Milestone Roadmap']
  },
  {
    number: '03',
    title: 'Design',
    tagline: 'Precision UI/UX & Art Direction',
    description: 'We craft high-fidelity interface layouts, design systems, interactive prototypes, and typographic hierarchies tailored to reflect modern luxury and operational clarity.',
    deliverables: ['Design System Component Library', 'Interactive Clickable Prototype', 'High-Res Interface Screens', 'Visual Identity Assets']
  },
  {
    number: '04',
    title: 'Develop',
    tagline: 'Clean, Scalable Software Engineering',
    description: 'Our engineers transform validated designs into clean, high-performance code built with modern frameworks, robust security protocols, and automated testing suites.',
    deliverables: ['Production-Ready Codebase', 'API Endpoints & DB Schemas', 'Security & Load Testing Audit', 'CI/CD Automated Pipeline']
  },
  {
    number: '05',
    title: 'Launch',
    tagline: 'Zero-Downtime Precision Deployment',
    description: 'We execute controlled staging, final compliance checks, performance optimization, cloud provisioning, and seamless public launches.',
    deliverables: ['Cloud Production Deployment', 'App Store / Play Store Submissions', 'Monitoring & Analytics Setup', 'Handoff & Operations Manual']
  },
  {
    number: '06',
    title: 'Scale',
    tagline: 'Iterative Growth & Feature Expansion',
    description: 'Post-launch, we analyze real user interactions, track conversion metrics, optimize speed, and continuously iterate features to support business scale.',
    deliverables: ['User Behavior Analytics Dashboard', 'Performance Optimization Sprints', 'Feature Iteration Roadmap', 'Ongoing Cloud Infrastructure SLA']
  }
];

export const STATS: StatItem[] = [
  {
    value: 40,
    prefix: '$',
    suffix: 'M+',
    label: 'Client Value Created',
    subtext: 'Verifiable valuation and revenue growth across digital platforms launched.'
  },
  {
    value: 28,
    prefix: '',
    suffix: '+',
    label: 'Digital Products Delivered',
    subtext: 'From enterprise platforms to high-scale B2B commercial software.'
  },
  {
    value: 98,
    prefix: '',
    suffix: '%',
    label: 'On-Time Precision Launch',
    subtext: 'Methodical sprint planning with rigorous architecture timelines.'
  },
  {
    value: 14,
    prefix: '',
    suffix: ' Global',
    label: 'Markets & Regions Reached',
    subtext: 'Multi-lingual, compliant, and localized digital products.'
  }
];
