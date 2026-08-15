# AURVEX TECH — Landing Page

Single-page marketing site for AURVEX TECH.
React 19 · Vite 6 · Tailwind CSS 4 · Motion · Three.js

## Run locally

**Prerequisites:** Node.js 20+ (or Bun)

```bash
npm install
npm run dev      # http://localhost:3000
npm run lint     # tsc --noEmit
npm run build
```

## Before going live

These three need real values — the site works without them, but degrades:

1. **Lead delivery.** Set `VITE_INQUIRY_ENDPOINT` in `.env.local` to a URL that
   accepts a JSON `POST` (Formspree, Web3Forms, a Cloud Run function, your own
   API). Without it, the project form falls back to opening the visitor's mail
   client with the brief pre-filled — a working path, but a lossy one.
2. **Contact details.** Fill in `src/data/siteConfig.ts`. Every field left empty
   is simply not rendered, so nothing shows a placeholder phone number or a link
   that points at `instagram.com`.
3. **Social sharing image.** Export `public/og-image.svg` to a 1200×630 PNG at
   `public/og-image.png`. Crawlers do not render SVG, so link previews stay blank
   until this file exists.

Optional but recommended: add an analytics snippet, and publish a privacy policy
— the inquiry form collects names, emails and phone numbers.

## Structure

```
index.html                 SEO meta, Open Graph, Organization + FAQPage JSON-LD
src/App.tsx                Section composition and modal state
src/components/            One file per section, plus the two modals
src/data/projectsData.ts   Case studies (the `category` field drives the filters)
src/data/servicesData.ts   Services, process phases, stats
src/data/siteConfig.ts     Brand, contact and social details
src/lib/submitInquiry.ts   Form delivery + mailto fallback
src/hooks/useModalChrome.ts  Escape, scroll lock and focus trap for dialogs
```

The FAQ copy in `src/components/FaqSection.tsx` is mirrored as JSON-LD in
`index.html`. Edit both together.
