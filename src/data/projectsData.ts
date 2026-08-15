import { Project } from '../types';

export const PROJECTS: Project[] = [
  {
    id: 'tadawi',
    number: '01',
    title: 'TADAWI',
    subtitle: 'Healthcare Digital Platform',
    industry: 'HealthTech & Telemedicine',
    category: 'HealthTech',
    year: '2025',
    description: 'A comprehensive digital ecosystem connecting patients, licensed medical practitioners, and certified diagnostics laboratories in real time.',
    longDescription: 'TADAWI is an end-to-end healthcare engine engineered to streamline appointment scheduling, medical records management, laboratory diagnostic results delivery, and remote consultations. Built with strict data privacy architectures and high-availability cloud infrastructure.',
    services: ['Digital Product Architecture', 'Full-Stack Web & Mobile App', 'UI/UX Systems', 'HIPAA/GDPR Security Compliance'],
    metrics: [
      { label: 'Active Monthly Patients', value: '180,000+' },
      { label: 'Lab Results Delivery Time', value: '-65%' },
      { label: 'System Uptime SLA', value: '99.98%' }
    ],
    accentColor: '#2563EB',
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=1600',
    architectureHighlights: [
      'Encrypted EHR (Electronic Health Records) Vault with fine-grained access control',
      'Real-time WebSocket notification engine for urgent diagnostic results',
      'Cross-platform React Native mobile application for iOS & Android',
      'Integrated telehealth video suite with zero-latency WebRTC streams'
    ],
    clientQuote: {
      text: 'AURVEX TECH transformed our vision into a enterprise-grade health platform that handles high patient volume with speed and elegance.',
      author: 'Dr. S. Benali',
      role: 'Chief Medical Officer'
    }
  },
  {
    id: 'taswiya',
    number: '02',
    title: 'TASWIYA',
    subtitle: 'Property & Legal Technology',
    industry: 'PropTech & Legal Systems',
    category: 'PropTech & Legal',
    year: '2025',
    description: 'A modern legaltech platform simplifying property settlement, title validation, and automated legal document verification.',
    longDescription: 'TASWIYA revolutionizes legal property dispute settlements and transfer protocols. By digitizing title searches, notary workflows, and compliance checks, the platform reduces transaction closing periods from months to mere days.',
    services: ['LegalTech Product Design', 'Automated Workflow Engine', 'Document Verification Systems', 'Enterprise Portal'],
    metrics: [
      { label: 'Settlement Processing Speed', value: '4.5x Faster' },
      { label: 'Property Records Digitized', value: '45,000+' },
      { label: 'Compliance Error Rate', value: '< 0.01%' }
    ],
    accentColor: '#3B82F6',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=1600',
    architectureHighlights: [
      'Immutable audit trail for property land register verification',
      'Automated document extraction parser for notary deeds and title contracts',
      'Role-based multi-tenant dashboard for law firms and government surveyors',
      'Interactive geospatial property boundary visualizer'
    ],
    clientQuote: {
      text: 'The legal precision and architectural clarity built by AURVEX TECH enabled us to scale legal settlements seamlessly across regions.',
      author: 'M. Mansouri',
      role: 'Head of Legal Innovation'
    }
  },
  {
    id: 'forsa-dz',
    number: '03',
    title: 'FORSA DZ',
    subtitle: 'B2B Wholesale Commerce Platform',
    industry: 'E-Commerce & B2B Marketplace',
    category: 'Commerce & B2B',
    year: '2024',
    description: 'An enterprise wholesale digital marketplace connecting verified manufacturers and suppliers with new entrepreneurs and retailers.',
    longDescription: 'FORSA DZ empowers merchant ecosystems by providing wholesale inventory sourcing, automated purchase orders, dynamic bulk pricing, and localized supply chain tracking in a single high-performance digital workspace.',
    services: ['B2B E-Commerce Platform', 'Supply Chain Engine', 'Mobile Commerce App', 'Merchant Payment Gateways'],
    metrics: [
      { label: 'Gross Merchandise Value', value: '$14M+' },
      { label: 'Verified Suppliers Onboarded', value: '1,200+' },
      { label: 'Average Order Processing', value: '< 3 Mins' }
    ],
    accentColor: '#1D4ED8',
    image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=1600',
    architectureHighlights: [
      'Dynamic multi-tier bulk pricing algorithm based on volume tiers',
      'Real-time inventory synchronization across multi-warehouse locations',
      'Integrated merchant escrow and invoice financing workflows',
      'High-speed instant elastic search filtering across 500,000+ SKUs'
    ],
    clientQuote: {
      text: 'FORSA DZ is now the primary trade engine for thousands of merchants. AURVEX TECH delivered speed, scale, and top-tier UX.',
      author: 'K. Brahimi',
      role: 'Founder & CEO, FORSA'
    }
  },
  {
    id: 'midtrav',
    number: '04',
    title: 'MIDTRAV',
    subtitle: 'Occupational Health Platform',
    industry: 'Enterprise Occupational Health & Safety',
    category: 'HealthTech',
    year: '2024',
    description: 'Digital management platform for corporate occupational health assessments, employee medical compliance, and workplace safety diagnostics.',
    longDescription: 'MIDTRAV enables industrial corporations, energy companies, and enterprise employers to maintain rigorous workplace health standards, manage mandatory medical checkups, track hazard exposure metrics, and automate regulatory reporting.',
    services: ['Enterprise Software Architecture', 'Occupational Analytics', 'UI/UX Design', 'Regulatory Reporting Modules'],
    metrics: [
      { label: 'Corporate Employees Monitored', value: '85,000+' },
      { label: 'Regulatory Audit Readiness', value: '100%' },
      { label: 'Administrative Hours Saved', value: '12,000 hrs/yr' }
    ],
    accentColor: '#2563EB',
    image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&q=80&w=1600',
    architectureHighlights: [
      'Automated medical screening scheduling based on workplace risk exposure codes',
      'Comprehensive safety officer analytics dashboard with predictive hazard alerts',
      'Secure, offline-first mobile inspection app for remote industrial field site visits',
      'Direct integration with enterprise ERP systems (SAP, Oracle, Workday)'
    ],
    clientQuote: {
      text: 'AURVEX TECH understood our strict corporate requirements and engineered a software platform that eliminated all manual compliance friction.',
      author: 'Y. Saidi',
      role: 'Director of Occupational Safety'
    }
  },
  {
    id: 'aurline',
    number: '05',
    title: 'AURLINE',
    subtitle: 'Hospitality Management System',
    industry: 'Hospitality & Luxury Accommodation',
    category: 'Hospitality',
    year: '2024',
    description: 'A modern, unified guest experience and property management ecosystem designed for luxury hotels and boutique accommodation groups.',
    longDescription: 'AURLINE bridges room inventory management, guest check-in automation, contactless guest services, point-of-sale integrations, and revenue optimization into a frictionless web and tablet operational suite.',
    services: ['Hospitality Management Software', 'Guest Web & Mobile Suite', 'Design System & Branding', 'POS & Channel Integration'],
    metrics: [
      { label: 'Direct Guest Bookings Increase', value: '+38%' },
      { label: 'Guest Check-in Duration', value: '< 45 Secs' },
      { label: 'Property ADR Lift', value: '+18%' }
    ],
    accentColor: '#3B82F6',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=1600',
    architectureHighlights: [
      'Unified multi-channel booking engine syncing OTAs in real time',
      'Mobile keyless room access system & digital concierge web app',
      'Intelligent dynamic pricing engine adjusting rates based on local demand surges',
      'Intuitive staff operations dashboard with live housekeeping status map'
    ],
    clientQuote: {
      text: 'Our guests praise the sleek digital experience, and our staff efficiency reached record levels. AURVEX TECH set a new standard for luxury hospitality software.',
      author: 'C. De Laroche',
      role: 'Managing Director, Horizon Collection'
    }
  }
];
