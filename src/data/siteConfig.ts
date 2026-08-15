/**
 * Single source of truth for brand, contact and social data.
 *
 * Any field left as an empty string is NOT rendered anywhere on the site —
 * this is intentional: showing a placeholder phone number or a link that points
 * at instagram.com is worse than showing nothing at all.
 *
 * TODO (owner): fill in the real values below before launch.
 */
export const SITE = {
  name: 'AURVEX TECH',
  tagline: 'Strategy. Design. Technology. Growth.',

  /**
   * Absolute production URL — mirrored by the canonical + Open Graph tags in
   * index.html. When the aurvex.tech domain is acquired, update this, the tags
   * in index.html, and `base` in vite.config.ts together.
   */
  url: 'https://aurvex-tech.vercel.app',

  /** General inquiries inbox. Also the fallback destination for the project form. */
  email: 'contact@aurvex.tech',

  whatsapp: {
    /** International number, digits only, no "+" — e.g. '213550123456'. Empty = hidden. */
    number: '',
    /** How it is displayed to the visitor — e.g. '+213 550 12 34 56'. */
    display: '',
  },

  /** Empty string = the link is not rendered. */
  socials: {
    instagram: '',
    linkedin: '',
    tiktok: '',
  },

  founder: {
    name: 'Hireche Abdennour',
    role: 'Founder & Chief Executive',
  },
} as const;

export const WHATSAPP_URL = SITE.whatsapp.number
  ? `https://wa.me/${SITE.whatsapp.number}`
  : '';

/** Social entries that are actually configured, ready to map over. */
export const SOCIAL_LINKS = (
  [
    { label: 'Instagram', href: SITE.socials.instagram },
    { label: 'LinkedIn', href: SITE.socials.linkedin },
    { label: 'TikTok', href: SITE.socials.tiktok },
  ] as const
).filter((s) => s.href.length > 0);
