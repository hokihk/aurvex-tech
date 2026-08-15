/** Filter buckets shown above the case study list. */
export const PROJECT_CATEGORIES = [
  'HealthTech',
  'PropTech & Legal',
  'Commerce & B2B',
  'Hospitality',
] as const;

export type ProjectCategory = (typeof PROJECT_CATEGORIES)[number];

export interface Project {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  industry: string;
  /** Drives the filter pills — a new project is categorised here, not in the UI. */
  category: ProjectCategory;
  year: string;
  description: string;
  longDescription: string;
  services: string[];
  metrics: { label: string; value: string }[];
  accentColor: string;
  image: string;
  architectureHighlights: string[];
  clientQuote?: { text: string; author: string; role: string };
}

export interface ServiceItem {
  id: string;
  number: string;
  title: string;
  description: string;
  deliverables: string[];
  capabilities: string[];
}

export interface ProcessStep {
  number: string;
  title: string;
  tagline: string;
  description: string;
  deliverables: string[];
}

export interface StatItem {
  value: number;
  prefix?: string;
  suffix?: string;
  label: string;
  subtext: string;
}

export interface ProjectInquiryForm {
  serviceTypes: string[];
  budgetRange: string;
  timeline: string;
  description: string;
  name: string;
  email: string;
  company: string;
  phone?: string;
}
