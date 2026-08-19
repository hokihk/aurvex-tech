# AURVEX TECH — Landing Page

Single-page marketing site for AURVEX TECH.
React 19 · Vite 6 · Tailwind CSS 4 · Motion · Three.js

**Live:** https://aurvex-tech.vercel.app
**Repo:** https://github.com/hokihk/aurvex-tech

---

## Run locally

**Prerequisites:** Node.js 20+ (or Bun)

```bash
bun install       # or npm install
bun run dev       # http://localhost:3000
bun run lint      # tsc --noEmit
bun run build
```

## Deploying

Hosted on **Vercel**, served from the domain root.

```bash
vercel deploy --prod    # manual deploy from this directory
```

> **Not yet automatic.** To make every `git push` deploy on its own, link the
> repo once: Vercel → project `aurvex-tech` → Settings → Git → Connect Git
> Repository → `hokihk/aurvex-tech`.

If the site ever moves to a sub-path (e.g. a GitHub Pages *project* site),
three things must change together, or every asset 404s:

1. `base` in `vite.config.ts`
2. `canonical`, `og:url`, `og:image`, `twitter:image` and the JSON-LD in `index.html`
3. `url` in `src/data/siteConfig.ts`

An older, frozen copy still exists at `https://hokihk.github.io/aurvex-tech/`
(the `gh-pages` branch). It receives no updates and should be retired.

---

## Still to do before this is a finished sales asset

| # | Item | Why it matters |
|---|---|---|
| 1 | **Real project screenshots** | All five case studies in `src/data/projectsData.ts` use generic Unsplash stock (a stethoscope, a building, a warehouse). A studio selling digital products showing stock photos of physical objects is the single biggest credibility gap on the page. |
| 2 | **Real founder photo** | `src/components/FounderSection.tsx` shows a stock Unsplash portrait under a real person's name. |
| 3 | **Contact details** | Fill `src/data/siteConfig.ts`. Every empty field is deliberately *not rendered*, so nothing shows a placeholder number or a link pointing at `instagram.com`. |
| 4 | **Lead delivery** | Set `VITE_INQUIRY_ENDPOINT` to a URL accepting a JSON `POST`. Without it the form falls back to opening the visitor's mail client — a working path, but lossy. |
| 5 | **Analytics** | None installed. |
| 6 | **Privacy policy** | The inquiry form collects names, emails and phone numbers. |
| 7 | **Unverified claims** | The stats in `servicesData.ts` (`$40M+`, `98%`) and the named client quotes in `projectsData.ts` should be substantiated or softened. |

---

## Architecture

```
index.html                    SEO meta, Open Graph, Organization + FAQPage JSON-LD
vercel.json                   Framework preset, asset caching, security headers
src/App.tsx                   Section composition, modal state, hash routing
src/index.css                 Design tokens (@theme), keyframes, base styles
src/components/               One file per section, plus modals and effects
src/data/projectsData.ts      Case studies — the `category` field drives the filters
src/data/servicesData.ts      Services, process phases, stats
src/data/siteConfig.ts        Brand, contact and social details
src/lib/submitInquiry.ts      Form delivery + mailto fallback
src/lib/workUrl.ts            The `#work/<id>` URL scheme
src/hooks/useModalChrome.ts   Escape, scroll lock and focus trap for dialogs
src/hooks/useActiveSection.ts Nav highlighting via IntersectionObserver
```

### Colour system

Tokens live in the `@theme` block of `src/index.css`. The hierarchy is the
point: **`accent` (cobalt) is reserved for things the visitor can act on** —
buttons, links, hover, focus, active state. Editorial furniture (section labels,
decorative numerals, rules) uses the neutral `ink` scale. When something turns
cobalt, it means "this responds to you".

Note the token is named `ground`, not `base` — a `--color-base` token would
generate a `text-base` utility that collides with Tailwind's font-size scale.

### Signature sections

Three sections carry scroll-driven treatments rather than plain fade-ins:

- **`SelectedWork`** — case studies stack like a dealt deck; each card is sticky
  at a lower offset and the one beneath scales down and dims.
- **`ProcessSection`** — pinned on desktop while the six phases travel
  horizontally. The travel distance is computed arithmetically, not measured:
  the rail only exists once pinned, and pinning needs the distance first.
- **`PhilosophyKeywords`** — keyword rails drift on their own and are dragged by
  scroll velocity; scrolling up reverses them.

`BlueprintInterstitial` sits between Process and Approach and draws a structural
schematic from the foundation up. It exists because the pinned process section
used to release into dead black space.

Every one of these has a `prefers-reduced-motion` path.

### Case study URLs

Studies open in a modal but are addressable as `#work/<id>`, so they can be
shared, bookmarked and closed with the browser back button. Hash rather than
real paths because the site deploys statically with no rewrite rules — proper
per-study search indexing would need prerendering.

### Regenerating the social image

`public/og-image.png` is rasterised from `public/og-image.svg` (crawlers do not
render SVG). To regenerate after editing the SVG:

```bash
bun add -d sharp
node -e "const s=require('sharp');s(require('fs').readFileSync('./public/og-image.svg'),{density:144}).resize(1200,630,{fit:'fill'}).png().toFile('./public/og-image.png')"
bun remove sharp
```

Sharp is not kept as a dependency — it is a heavy native package needed once.

---

The FAQ copy in `src/components/FaqSection.tsx` is mirrored as JSON-LD in
`index.html`. Edit both together.
