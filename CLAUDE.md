# AURVEX TECH — Project Context

> This file is loaded automatically at the start of every session. It exists so a
> cold start is not a blank start. Read it before touching anything.

## Working with the owner

Hireche Abdennour — founder of AURVEX TECH, driving this himself.

- **Reply in Arabic.** Keep it short and concrete: what is done, what works,
  what decision is needed. Lead with the outcome and the link.
- Long technical breakdowns lose him — he once replied simply "لم أفهم" to a
  dense multi-section summary. The engineering rationale belongs in code
  comments and in this file, **not** in the chat reply.
- When asking him something, make it one plain sentence with an obvious answer
  format ("say 'delete it' and I will").
- He is happy to delegate design judgement ("انت حر") and has approved every
  such call so far — but tell him plainly which invented copy is yours so he can
  change it.

## What this is

Single-page marketing site for AURVEX TECH, a digital product studio.
React 19 · Vite 6 · Tailwind CSS 4 · Motion · Three.js · TypeScript.

**Status: built and live.** This is not a work in progress — it ships.

| | |
|---|---|
| Live | https://aurvex-tech.vercel.app |
| Repo | https://github.com/hokihk/aurvex-tech (public, `main`) |
| Stale copy | https://hokihk.github.io/aurvex-tech/ — frozen `gh-pages` branch, never updated. Owner has been asked whether to retire it and has not answered. |

## Commands

```bash
bun install
bun run dev            # Vite dev server
bun run lint           # tsc --noEmit
bun run build
vercel deploy --prod   # manual; not yet automatic
```

**`npx tsc` does not work here** (npx refuses the local binary). Use:
`node "node_modules\typescript\bin\tsc" --noEmit` from the project root.

## Traps that will bite you

These are the things that are not visible from reading the code.

1. **The colour token is `ground`, not `base`.** A `--color-base` token makes
   Tailwind generate a `text-base` utility that collides with its built-in
   font-size scale, silently breaking text sizing. This already happened once
   and was fixed. Do not rename it back.

2. **Sections are deliberately transparent.** `PageBackdrop` is a fixed layer
   (column guides, travelling light, grain) that content scrolls over. If you
   add `bg-ground` to a section you will hide it. Only `PhilosophyKeywords`
   (fully opaque, its edge masks fade to that exact colour), `StatsSection`,
   `TrustTicker` and the footer paint backgrounds — those are the deliberate
   rhythm bands.

3. **Moving the site to a sub-path requires three changes together**, or every
   asset 404s: `base` in `vite.config.ts`, the canonical/OG/JSON-LD URLs in
   `index.html`, and `url` in `src/data/siteConfig.ts`.

4. **`ProcessSection` computes its scroll distance arithmetically, not by
   measuring the DOM.** The horizontal rail only exists once the section is
   pinned, and pinning needs the distance first — measuring creates a
   chicken-and-egg deadlock. The geometry constants at the top of the file must
   stay in sync with the rail's classes.

5. **FAQ copy is mirrored** as FAQPage JSON-LD in `index.html`. Edit both.

6. **Modal pattern:** the `isOpen` condition goes *inside* `AnimatePresence`,
   never before it, or exit animations never run. `ProjectInquiryModal` re-seeds
   its form on open via `useEffect` — the component stays mounted, so a
   `useState` initialiser would only ever run once.

7. **`sharp` is not a dependency.** `public/og-image.png` is generated from the
   SVG once; the recipe is in README.

8. **The GitHub token lacks `workflow` scope**, so `.github/workflows/` cannot
   be pushed. This is why deployment is Vercel CLI rather than GitHub Actions.
   Linking the repo in Vercel's dashboard sidesteps it entirely.

9. **No browser automation is available** in this environment. Verification is
   typecheck + production build + HTTP fetches against the dev/preview server.
   Say so plainly rather than claiming visual confirmation.

10. Ports 3000–3004 are usually occupied by the owner's other projects; the dev
    server lands on 3005 or later. Read the actual startup output — do not
    assume 3000.

## Design system

Tokens live in the `@theme` block of `src/index.css`.

**The colour hierarchy is the point:** `accent` (cobalt `#0052FF`) is reserved
for things the visitor can act on — buttons, links, hover, focus, active state.
Editorial furniture (section labels, decorative numerals, rules) uses the neutral
`ink` scale. When something turns cobalt it means "this responds to you". Do not
reintroduce cobalt on decorative labels.

Type: `Syne` for display, `Plus Jakarta Sans` for body. Heading sizes are
deliberately *uneven* across sections — the manifesto and final CTA run much
larger than the section headings. That is rhythm, not inconsistency.

**Every motion effect must have a `prefers-reduced-motion` path.** `MotionConfig
reducedMotion="user"` in `main.tsx` covers Motion's own animations; CSS
animations are handled by a media query in `index.css`; scroll-linked transforms
need explicit `useReducedMotion()` guards.

## Signature sections

Three sections carry scroll-driven treatments rather than plain fade-ins. They
are the reason the site does not feel templated — treat them as load-bearing:

- **`SelectedWork`** — case studies stack like a dealt deck. Each card is sticky
  at a progressively lower offset; the card beneath scales down and dims.
- **`ProcessSection`** — pinned on desktop while six phases travel horizontally.
  Falls back to a vertical grid on mobile and under reduced motion.
- **`PhilosophyKeywords`** — keyword rails drift on their own and are dragged by
  scroll velocity; scrolling up reverses them. Gated to when in view.
- **`BlueprintInterstitial`** — a structural schematic that draws itself from the
  foundation up. It exists because the pinned process section used to release
  into dead black space. Has a separate compact layout for phones, because the
  wide `viewBox` scaled down would render captions at ~4px.

## Layout of the code

```
index.html                    SEO meta, Open Graph, Organization + FAQPage JSON-LD
vercel.json                   Framework preset, asset caching, security headers
src/App.tsx                   Section composition, modal state, hash routing
src/index.css                 Design tokens, keyframes, base + focus styles
src/components/               One file per section, plus modals and effects
src/data/projectsData.ts      Case studies — `category` drives the filter pills
src/data/servicesData.ts      Services, process phases, stats
src/data/siteConfig.ts        Brand, contact, socials — empty fields render as nothing
src/lib/submitInquiry.ts      Form delivery + mailto fallback
src/lib/workUrl.ts            The `#work/<id>` URL scheme
src/hooks/useModalChrome.ts   Escape, scroll lock, focus trap for dialogs
src/hooks/useActiveSection.ts Nav highlighting via IntersectionObserver
```

Case studies open in a modal but are addressable as `#work/<id>` so they can be
shared and closed with the back button. Hash rather than real paths because the
site deploys statically; proper per-study indexing would need prerendering.

## Outstanding — blocked on the owner, not on code

He said he would source these later. Do not rebuild around them; just wire them
in when they arrive.

1. **Real project screenshots.** All five case studies use generic Unsplash stock
   (a stethoscope, a building, a warehouse). A studio selling digital products
   showing stock photos of physical objects is the biggest credibility gap on
   the page. When the assets arrive, build a proper presentation (device frames
   or angled mockups) rather than dropping them into the current slots.
2. **Real founder photo** — currently a stock portrait under his real name.
3. **Contact details** in `src/data/siteConfig.ts` (WhatsApp, socials).
4. **`VITE_INQUIRY_ENDPOINT`** — until set, the inquiry form falls back to
   opening the visitor's mail client.
5. **Link the repo in Vercel** so deploys stop being manual.
6. Analytics, and a privacy policy (the form collects name/email/phone).
7. **Unverified claims** — the stats (`$40M+`, `98%`) and the named client quotes
   are unsubstantiated. Flagged to him more than once; his call.

## Copy written by Claude, not the owner

Flag these if he wants to revise them:

- `StatsSection` heading — "Numbers that survive an audit."
- `BlueprintInterstitial` — "Structure first. Everything else follows." and its
  supporting paragraph.
