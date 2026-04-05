---
name: website-maintain
description: >
  Maintain and update the Duke Strategies corporate website (duke-strategies-website).
  Handles all routine content and configuration changes via natural language: updating
  services, capabilities, case studies, founders and team, Duke Academy programs,
  insights, testimonials, homepage stats, navigation, office contact details, brand
  tokens, and visual/responsive reviews. Use this skill whenever the user wants to
  add, edit, or remove content on the Duke Strategies website — even if they don't
  say "website" explicitly. Trigger on phrases like "update the team", "add a case
  study", "change the tagline", "update services", "add an academy program", "refresh
  brand tokens", "add a testimonial", "update the homepage", "change the office
  address", "update navigation", "review the design", "audit the layout", "check
  mobile", "use vision", "screenshot the Duke site", or any request that implies
  modifying or visually reviewing the Duke Strategies website.
---

# Website Maintain — Duke Strategies

This skill guides you through every routine maintenance task on the Duke Strategies
corporate website. The site is an Astro 6 static site with Tailwind CSS 4 (via Vite
plugin), MDX support, and a brand token pipeline driven by `src/brand/charter.json`.

**Unlike typical Astro content sites, Duke's content is NOT in MDX collections.**
Almost all editorial content — services, capabilities, founders, associates, partners,
case studies, academy programs, testimonials, insights — lives in one TypeScript file:
`src/data/company.ts`. Each page imports from this file and renders it. This is the
first thing to understand before editing anything.

## Quick Orientation

```
duke-strategies-website/
├── src/
│   ├── brand/                    ← Synced from brand-tokens (charter.json + logos + images)
│   │   ├── charter.json          ← Brand source of truth (do not edit here — edit in brand-tokens)
│   │   ├── logos/                ← Brand logos
│   │   └── images/               ← Brand imagery catalog
│   ├── styles/
│   │   ├── brand-tokens.css      ← GENERATED from charter.json — do not edit
│   │   ├── tokens-semantic.css   ← Tier 2/3 semantic tokens (hand-written)
│   │   └── global.css            ← Base styles, utilities
│   ├── lib/
│   │   └── tokens.ts             ← GENERATED TS module — do not edit
│   ├── components/
│   │   ├── layout/               ← Navigation.astro, Footer.astro
│   │   ├── ui/                   ← Button, Card, Badge, Icon, Marquee, StatBlock,
│   │   │                           InsightCard, ProgramCard, ServiceCard, TeamCard,
│   │   │                           Testimonial, CTABand
│   │   ├── sections/             ← (currently empty — sections live inline in pages)
│   │   └── content/              ← (currently empty)
│   ├── content/                  ← MDX collections — SCAFFOLDED BUT UNUSED
│   │   ├── authors/ blog/ capabilities/ case-studies/ insights/ pages/
│   ├── content.config.ts         ← Schemas for insights/pages/authors (empty collections)
│   ├── data/
│   │   ├── company.ts            ← PRIMARY CONTENT SOURCE (founders, services, etc.)
│   │   ├── site.ts               ← Site metadata, nav, contact, office, analytics
│   │   ├── nav.ts                ← Top nav items
│   │   └── stats.ts              ← Homepage stat ribbon
│   ├── layouts/
│   │   ├── BaseLayout.astro      ← HTML shell, meta, nav, footer
│   │   ├── PageLayout.astro      ← Wraps BaseLayout for standard pages
│   │   └── ArticleLayout.astro   ← For long-form articles (unused so far)
│   └── pages/                    ← File-based routing (all .astro, no MDX)
│       ├── index.astro           ← Homepage
│       ├── who-we-are.astro
│       ├── what-we-do.astro
│       ├── duke-academy.astro
│       ├── insights.astro
│       └── contact.astro
├── public/assets/
│   ├── images/                   ← Runtime-served images (mirrors src/brand/images/)
│   ├── logos/                    ← Runtime-served logos (DukeStrategies_logo.svg etc.)
│   ├── team/                     ← Team member photos
│   └── video/                    ← Hero video (AquaductHarderwijk_1920x1080px.mp4)
├── scripts/
│   └── generate-tokens.ts        ← charter.json → brand-tokens.css + tokens.ts
├── astro.config.mjs              ← Astro 6 config (MDX + sitemap + Tailwind Vite plugin)
└── .github/workflows/deploy.yml  ← GitHub Pages deploy on push to main
```

**Generated files — never edit directly:**
- `src/styles/brand-tokens.css` — regenerate with `npm run tokens`
- `src/lib/tokens.ts` — regenerate with `npm run tokens`

**Build commands:**
- `npm run dev` — Dev server at `localhost:4321`
- `npm run build` — Runs `tokens` then `astro build` → `dist/`
- `npm run tokens` — Regenerate brand tokens from `src/brand/charter.json`
- `npm run check` — Astro TypeScript diagnostics
- `npm run preview` — Preview built site from `dist/`

**Critical architecture notes:**
1. **Editorial content lives in `src/data/company.ts`**, not in `src/content/`. The
   `src/content/` folders exist from scaffolding but are empty and largely unwired.
2. **Assets are duplicated**: `src/brand/images/` is the synced source; `public/assets/images/`
   is what pages actually reference via runtime `/assets/images/*` URLs. If an image
   changes, it must exist in both places (or be re-copied from `src/brand/` to `public/assets/`).
3. **Team photos live in `public/assets/team/`** — referenced by absolute URL in
   `src/data/company.ts` (e.g., `/assets/team/IngoHeijnen_grijs.jpg`).
4. **Hero video** (`public/assets/video/AquaductHarderwijk_1920x1080px.mp4`) is loaded
   by the homepage hero section. Poster is a still from the bridge image set.
5. **No i18n** — this is a single-language English site. Do not add locale routing.
6. **Tailwind 4 via Vite plugin**, not PostCSS — `@tailwindcss/vite` in `astro.config.mjs`.
   Global CSS uses the Tailwind 4 `@import "tailwindcss"` syntax.

## Visual QA Defaults

When the user asks for a design review, visual polish pass, layout audit, responsive
check, screenshot-based verification, or explicitly asks to "use vision", do not stop
at code inspection. Capture and inspect rendered pages.

Default visual workflow:

1. Start the local server: `npm run dev`
2. Capture each route below at both desktop (1440×1100) and mobile (390×844)
3. For long pages (homepage, what-we-do), also capture full-page screenshots
4. Wait 1800–2500ms before capturing — pages have fade-in animations and a hero video
5. Inspect screenshots, trace issues back to pages/components/tokens
6. Run `npm run build` before finalizing findings

Routes to audit:

| Route | Page file | Notes |
|---|---|---|
| `/` | `src/pages/index.astro` | Homepage with hero video, services, stats, featured case, testimonial, CTA |
| `/who-we-are` | `src/pages/who-we-are.astro` | Founders, associates, expert partners, affiliates |
| `/what-we-do` | `src/pages/what-we-do.astro` | Services, capabilities, case studies grid |
| `/duke-academy` | `src/pages/duke-academy.astro` | Academy programs |
| `/insights` | `src/pages/insights.astro` | Insights list |
| `/contact` | `src/pages/contact.astro` | Office details, contact form/info |

Useful capture commands:

```bash
npx --yes playwright@latest screenshot --browser=chromium \
  --viewport-size=1440,1100 --wait-for-timeout=2000 \
  http://127.0.0.1:4321/ /tmp/duke-home-desktop.png

npx --yes playwright@latest screenshot --browser=chromium \
  --viewport-size=390,844 --wait-for-timeout=2000 \
  http://127.0.0.1:4321/ /tmp/duke-home-mobile.png

npx --yes playwright@latest screenshot --browser=chromium --full-page \
  --viewport-size=1440,1100 --wait-for-timeout=2500 \
  http://127.0.0.1:4321/ /tmp/duke-home-full.png
```

**Brand feel** — Duke is `ruler`/`luxury` archetype. The site should feel: premium,
confident, editorial, architectural, high-contrast, bridge-metaphor-rich. Signal
Orange (#FF7F66) is the single accent — use sparingly. Greys dominate body copy.
Montserrat throughout (headings 600, body normal).

---

## Task Router

Match the user's request to the appropriate workflow below.

| User says something like... | Go to |
|---|---|
| "add a service", "update the services list", "change a service description" | [Update Services](#update-services) |
| "add a capability", "update capabilities" | [Update Capabilities](#update-capabilities) |
| "add a case study", "update a case study", "change metrics on case" | [Update Case Studies](#update-case-studies) |
| "add a founder", "update founder bio", "change founder email" | [Update Founders](#update-founders) |
| "add a team member", "update associates", "update expert partners" | [Update Team](#update-team) |
| "add an affiliate", "update affiliates" | [Update Affiliates](#update-affiliates) |
| "add an academy program", "update Duke Academy", "change academy content" | [Update Duke Academy](#update-duke-academy) |
| "add a testimonial" | [Update Testimonials](#update-testimonials) |
| "add an insight", "update insights list" | [Update Insights](#update-insights) |
| "update stats", "change the numbers on the homepage" | [Update Homepage Stats](#update-homepage-stats) |
| "update navigation", "add a nav link" | [Update Navigation](#update-navigation) |
| "change the tagline", "update the homepage copy", "change the hero" | [Update Homepage Hero](#update-homepage-hero) |
| "update the office address", "change the phone number", "update contact email", "update LinkedIn" | [Update Site / Contact Info](#update-site--contact-info) |
| "update SEO", "change meta tags", "change OG image" | [Update SEO](#update-seo) |
| "refresh brand", "sync brand tokens", "colors changed", "new logo" | [Refresh Brand Tokens](#refresh-brand-tokens) |
| "add a new image", "swap the hero video" | [Add / Replace Media](#add--replace-media) |
| "review the design", "visual audit", "check mobile", "use vision", "screenshot the site" | [Visual Audit](#visual-audit) |
| "deploy", "build the site", "push to prod" | [Build & Deploy](#build--deploy) |

---

## Update Services

Services are defined in `src/data/company.ts` → `export const services: Service[]`.

Schema (see the `Service` type at the top of the file):
```ts
{
  name: string;           // "Strategic Advisory"
  description: string;    // One paragraph
  industries: string[];   // e.g. ["Energy", "Financial Services"]
  deliverables: string[]; // e.g. ["Stakeholder map", "Risk assessment"]
}
```

- **Add**: append a new object to the `services` array.
- **Update**: edit the relevant object in-place.
- **Remove**: delete the object.

The homepage (`src/pages/index.astro`) shows the first 6 via `services.slice(0, 6)`.
The `/what-we-do` page shows the full list. No other edits required.

Verify: `npm run build`.

---

## Update Capabilities

Capabilities are in `src/data/company.ts` → `export const capabilities: Capability[]`.

Schema:
```ts
{ title: string; icon: string; }  // icon is a key looked up by Icon.astro
```

Keep `title` short (1–3 words). The icon string must map to an entry in
`src/components/ui/Icon.astro` — check the switch statement there before adding a
new icon name. If the icon doesn't exist, either (a) add it to `Icon.astro` or
(b) reuse an existing one.

---

## Update Case Studies

Case studies live in `src/data/company.ts` → `export const caseStudies: CaseStudy[]`.

Schema:
```ts
{
  title: string;
  industry: string;
  challenge: string;
  shortSummary?: string;
  team?: string;
  image: string;          // "/assets/images/bridge-fog-water-minimalist.jpg"
  imageAlt: string;
  metrics: Array<{ value: string; label: string }>;
}
```

**Image path rule:** Use absolute `/assets/images/<file>.jpg`. The image must exist
in `public/assets/images/`. If it doesn't, copy it from `src/brand/images/` first
(or re-run a sync if the image is new in brand-tokens).

**Metrics:** 2–4 metrics read best in the card layout. Keep values short
(e.g., `"92%"`, `"500+"`, `"< 4h"`).

The homepage (`src/pages/index.astro`) features `caseStudies[0]`. Reorder the array
to change which case is featured. The `/what-we-do` page lists all cases.

---

## Update Founders

Founders live in `src/data/company.ts` → `export const founders: Founder[]`.

Schema:
```ts
{
  name: string;
  title: string;     // "Managing Partner"
  image: string;     // "/assets/team/FirstLast_grijs.jpg"
  alt: string;
  bio: string;       // Long-form paragraph
  email: string;     // "firstname.lastname@dukestrategies.eu"
}
```

**Photo convention:** Duke team photos are desaturated ("_grijs" suffix in Dutch).
Drop the file in `public/assets/team/` before referencing it. Use the same
black-and-white treatment as existing photos for visual consistency.

Rendered on `/who-we-are` via `TeamCard.astro`.

---

## Update Team

Two arrays in `src/data/company.ts`:

- `expertPartners: TeamCard[]` — senior external experts
- `associates: TeamCard[]` — core associates

Schema (`TeamCard` type):
```ts
{
  name: string;
  title: string;
  image: string;    // "/assets/team/FirstLast_grijs.jpg"
  alt: string;
  bio: string;
}
```

Note: no `email` field on team cards, unlike founders. If a member needs direct
contact, promote them to `founders` or add an email in their bio.

---

## Update Affiliates

`src/data/company.ts` → `export const affiliates: Affiliate[]`.

Schema:
```ts
{
  name: string;
  description: string;
  href: string;       // External URL
  label: string;      // Link text, e.g. "Visit website"
}
```

Affiliates render as link cards on `/who-we-are`. Always verify the URL resolves
before committing.

---

## Update Duke Academy

`src/data/company.ts` → `export const academyPrograms: AcademyProgram[]`.

Schema:
```ts
{
  title: string;
  description: string;
  icon: string;     // Key for Icon.astro
}
```

Rendered on `/duke-academy` via `ProgramCard.astro`. Check `Icon.astro` for valid
icon keys before adding a new program.

The Duke Academy page also has a hero and intro copy hardcoded in
`src/pages/duke-academy.astro` — edit that file directly for copy changes outside
the program cards.

---

## Update Testimonials

`src/data/company.ts` → `export const testimonials = [...]`.

Check the existing entries for the exact shape (quote, attribution, role, company).
Keep quotes tight — 2–3 sentences maximum. Long quotes break the card layout on
mobile.

The homepage displays a single featured testimonial. Reorder to change which one
is featured. Other pages may display the full list.

---

## Update Insights

`src/data/company.ts` → `export const insights: InsightItem[]`.

Schema:
```ts
{
  badge: string;      // e.g. "Article", "Report"
  date: string;       // "2026-03-12" or display-friendly
  author: string;
  title: string;
  excerpt: string;
  href: string;       // External or internal URL
  linkLabel: string;  // "Read more"
}
```

Rendered on `/insights` via `InsightCard.astro`. The MDX `insights` collection in
`src/content/insights/` is scaffolded but currently unused — do **not** add MDX
files there expecting them to render. Add to the `insights` array in `company.ts`
instead.

If you need long-form editorial (full articles, not excerpts), that's a structural
change — raise it as a task in `BACKLOG.md` before implementing.

---

## Update Homepage Stats

`src/data/stats.ts`:

```ts
export const homeStats: HomeStat[] = [
  { value: 44, suffix: "+", label: "Years Combined Experience" },
  { value: 120, suffix: "+", label: "Stakeholders Engaged" },
  { value: 500, suffix: "+", label: "Data Points Analyzed" },
  { value: 92, suffix: "%", label: "Employee Retention (M&A)" },
];
```

- `value` is a **number** (not a string) — the stat ribbon component may animate it
- `suffix` is appended after (`+`, `%`, `M+`, etc.)
- `label` is a short descriptor

Keep 3–5 stats. The ribbon lays them out horizontally on desktop, stacks on mobile.

---

## Update Navigation

Top nav is defined in `src/data/nav.ts`:

```ts
export const navItems: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Who We Are", href: "/who-we-are" },
  { label: "What We Do", href: "/what-we-do" },
  { label: "Duke Academy", href: "/duke-academy" },
  { label: "Insights", href: "/insights" },
  { label: "Contact", href: "/contact" },
];
```

`src/data/site.ts` re-exports this array as `site.navItems`. `Navigation.astro` and
`Footer.astro` both read from `site.navItems`, so a single edit to `nav.ts`
propagates everywhere.

**Adding a nav link to a new page:**
1. Create `src/pages/<slug>.astro` using `PageLayout`
2. Add the `{ label, href }` entry to `navItems`
3. Verify the link appears in header and footer

---

## Update Homepage Hero

The hero is hardcoded at the top of `src/pages/index.astro`:

- **Title** — reads `site.title` from `src/data/site.ts` (edit there for consistency)
- **Subtitle** — hardcoded paragraph inside `index.astro` under `.hero__subtitle`
- **CTA button** — `Button href="/what-we-do"` — change label/href in `index.astro`
- **Background video** — `<video>` element references
  `/assets/video/AquaductHarderwijk_1920x1080px.mp4`. To swap:
  1. Drop the new MP4 in `public/assets/video/`
  2. Update the `<source src="...">` attribute
  3. Keep the poster (`/assets/images/Erasmusbrug_zwart.jpg` or similar) in sync
- **Logo overlay** — `<img src="/assets/logos/DukeStrategies_logo.svg">` — swap via
  `public/assets/logos/`

**Tagline** — `site.tagline` ("Bridging Strategy and Impact") in `src/data/site.ts`.
Search the codebase before changing it; it may appear in the footer and elsewhere.

---

## Update Site / Contact Info

All site-wide metadata, contact details, office address, and analytics config live
in `src/data/site.ts`:

```ts
export const site = {
  name, legalName, url, title, tagline, description, footerDescription,
  navItems,
  office: { street, postalCode, city, country },
  contact: { email, phoneDisplay, phoneHref, linkedin },
  analytics: { provider, domain },
  marqueeItems: [...],
};
```

**When changing the phone number**, update both `phoneDisplay` (human-readable) and
`phoneHref` (raw `tel:` link).

**Marquee items** are the scrolling capability strip on the homepage — short phrases,
2–4 words each.

The `Footer.astro` and `contact.astro` both read from this object. No other files
need updating.

---

## Update SEO

- **Per-page meta** — each page passes `title` and `description` props to
  `PageLayout` at the top of its template. Edit there.
- **Site defaults** — `src/data/site.ts` provides `title`, `description`,
  `footerDescription` used as fallbacks.
- **OG image** — homepage passes `ogImage="/assets/images/Erasmusbrug_zwart.jpg"`.
  Change per page, or set a default in `BaseLayout.astro`.
- **Sitemap** — generated automatically by `@astrojs/sitemap` from `astro.config.mjs`.
  The `site:` value must be the production URL (`https://dukestrategies.com`).
- **Analytics** — Plausible, configured in `site.analytics`. The script tag is
  injected by `BaseLayout.astro`.

---

## Refresh Brand Tokens

When brand data changes upstream in `brand-tokens` (colors, fonts, logos, images):

### 1. Sync brand assets from the org root

```bash
cd /Users/williammasquelier/Repositories/stromy-org
bash scripts/sync-brand-data.sh
```

This copies the `dukestrategies` entry from `brand-tokens/` into
`clients/duke-strategies/duke-strategies-website/src/brand/` based on the
`sync-manifest.json` consumer entry.

### 2. Regenerate tokens in this repo

```bash
npm run tokens
```

Reads `src/brand/charter.json` and regenerates:
- `src/styles/brand-tokens.css` — CSS custom properties (`--brand-*`)
- `src/lib/tokens.ts` — typed TS module

### 3. Re-copy runtime assets if images changed

Because images are duplicated between `src/brand/images/` and `public/assets/images/`,
if new images were added or removed:

```bash
rsync -a --delete src/brand/images/ public/assets/images/
rsync -a --delete src/brand/logos/ public/assets/logos/
```

*(Do not sync team photos — those live only in `public/assets/team/` and are not
part of the brand sync.)*

### 4. Build and verify

```bash
npm run build
```

Visually inspect with `npm run dev` if colors, fonts, or logos changed.

### What propagates automatically

- Color changes → CSS custom properties → all components using `var(--brand-*)`
- Font changes → `--brand-font-*` variables → all typography
- Images added in brand-tokens → available after rsync step

### What requires manual updates

- Removed images → check all `image:` references in `src/data/company.ts` and
  `src/pages/index.astro` (hero poster), then clean up orphaned references
- Logo filename changes → update `src/pages/index.astro` hero logo `src`, plus
  `Navigation.astro` and `Footer.astro`
- New fonts → add the `@import url(...)` to `src/styles/global.css` and update
  `charter.json` fallback chain

---

## Add / Replace Media

### Images
- Brand photography catalog source: `src/brand/images/` (synced)
- Runtime-served copies: `public/assets/images/`
- Both must contain the file. Prefer rsync from `src/brand/images/` after sync.

### Team photos
- Live only in `public/assets/team/` — not part of brand sync
- Convention: desaturated / black-and-white, filename ends in `_grijs.jpg` (Dutch for "grey")
- Keep crops consistent (shoulders up, eye line at upper third)

### Logos
- `public/assets/logos/DukeStrategies_logo.svg` — primary
- `public/assets/logos/DukeStrategies_logo_white.png` — on dark backgrounds
- `public/assets/logos/DukeStrategies_logo_grey.svg` — muted contexts
- `public/assets/logos/DukeAcademy_rgb_no_padding.svg` — Duke Academy sub-brand

### Video
- `public/assets/video/*.mp4` — MP4 H.264 for broad compatibility
- Keep hero videos under ~8 MB for fast first paint; short loop (10–20 s); no audio
  (hero uses `muted autoplay loop playsinline`)
- Provide a poster image (still frame or a complementary bridge photo)

---

## Visual Audit

Use this workflow when the user asks for: visual review, design critique, layout
polish, responsive review, screenshot-based QA, contrast review, or says "use vision".

### 1. Audit the rendered site, not just the source

Start the server: `npm run dev`. Do not rely on code inspection alone for visual work.

### 2. Use the full route list

Capture all six pages:
- `/`, `/who-we-are`, `/what-we-do`, `/duke-academy`, `/insights`, `/contact`

### 3. Capture desktop + mobile for every page

Minimum capture set:
- Desktop viewport (1440×1100)
- Mobile viewport (390×844)
- Full-page desktop for `/`, `/who-we-are`, `/what-we-do` (long pages)

### 4. Wait for animations

The homepage hero uses a `hero-fade` sequence (4 stages) and a background video.
Use `--wait-for-timeout=2000` minimum, `2500` for full-page captures.

### 5. Check these visual categories

- Logo rendering (especially white vs grey variants on different surfaces)
- Hero video autoplay and poster fallback
- Text contrast — Signal Orange (#FF7F66) on white/grey vs on dark
- Heading hierarchy — Montserrat 600 at all display sizes
- Card consistency across ServiceCard, TeamCard, InsightCard, ProgramCard
- Team photo treatment — all desaturated, consistent crop
- Footer legibility and nav link validity
- Mobile navigation toggle and menu behaviour
- Marquee animation smoothness and content overflow
- CTABand contrast and link affordance
- Whether implementation still matches `src/brand/charter.json` — run
  `npm run tokens` if in doubt

### 6. Common failure patterns to watch for

- Orange (#FF7F66) used as small text on light grey — fails contrast (AA needs 4.5:1)
- Team photos with inconsistent grayscale treatment
- Empty sections when a data array has < 4 items (grid collapses)
- Missing icons (Icon.astro silently renders nothing for unknown keys)
- Broken asset paths after a brand refresh (image exists in `src/brand/` but not
  `public/assets/`)
- Hero video failing to autoplay on mobile (must be `muted` + `playsinline`)

### 7. Report format

1. Systemic issues first (tokens, global CSS, shared components)
2. Template-level issues (layouts, repeated sections)
3. Page-by-page findings

### 8. Re-capture after fixes

Always re-screenshot the changed pages at desktop and mobile to confirm fixes
landed visually, not just in code.

---

## Build & Deploy

### Local build

```bash
npm run build    # Generate tokens + Astro build → dist/
npm run preview  # Serve dist/ at localhost:4321
```

### CI/CD — GitHub Pages

Deploy is automatic on push to `main` via `.github/workflows/deploy.yml`:
1. Checkout
2. `npm ci`
3. `npm run build`
4. Upload `dist/` as Pages artifact
5. Deploy to GitHub Pages environment

Node version: 22. No other CI checks yet (add linting later if needed).

### Pre-deploy checklist

Before pushing changes that will trigger deployment:
1. `npm run build` locally — verify no errors and no missing images
2. `npm run preview` — spot-check changed pages at desktop and mobile
3. If brand was refreshed, confirm `npm run tokens` was run
4. If media was added, confirm files exist in both `src/brand/` and `public/assets/`
   (where applicable)
5. If team photos were added, confirm they're committed in `public/assets/team/`
6. Verify `astro.config.mjs` `site:` value still matches the production domain
   (`https://dukestrategies.com`)

### Custom domain

`dukestrategies.com` is the production domain. GitHub Pages custom domain
configuration is in repo Settings → Pages. If DNS needs changing, coordinate with
whoever holds the registrar credentials — do not touch DNS without confirmation.

---

## Common Patterns Reference

### Importing from company data

```ts
import { services, caseStudies, founders, capabilities } from "../data/company";
import { site } from "../data/site";
import { homeStats } from "../data/stats";
```

### Rendering a card grid

Look at `src/pages/index.astro` or `src/pages/what-we-do.astro` for the established
pattern — each page destructures the relevant array from `company.ts` and maps it
to the appropriate card component from `src/components/ui/`.

### Adding a new section to an existing page

1. Find the existing `<section>` elements in the target page file
2. Copy the structure of a similar existing section
3. Use semantic tokens from `src/styles/tokens-semantic.css` — do not hardcode colors
4. For repeated patterns, consider extracting into `src/components/sections/`
   (currently empty — be the first)

### Typography rules (from charter.json)

- **All fonts** — Montserrat (heading 600, body normal, mono Space Mono)
- Use `--brand-font-heading`, `--brand-font-body`, `--brand-font-mono` CSS vars
- Display sizes and line heights live in `src/styles/tokens-semantic.css`

### Color tokens (from charter.json)

| Token | Value | Use |
|---|---|---|
| `--brand-primary` | `#FF7F66` | Signal Orange — accents, CTAs |
| `--brand-secondary` | `#DFDFE0` | Light grey — dividers, muted |
| `--brand-background` | `#FFFFFF` | Page background |
| `--brand-background-alt` | `#F5F5F5` | Section alt background |
| `--brand-text` | `#807F83` | Body text |
| `--brand-text-light` | `#DFDFE0` | Muted text |

Never hardcode these values — always reference `var(--brand-*)`.

---

## What This Skill Does NOT Cover

- **Major structural refactors** — e.g., migrating content from `src/data/company.ts`
  to MDX collections, extracting inline sections into components, i18n rollout. These
  are architectural changes; raise them in `BACKLOG.md` first.
- **New page creation beyond the existing 6** — possible, but think about IA and
  navigation impact before adding.
- **Brand redesign** — that's the `brand-builder` skill's job, operating on
  `brand-tokens/` not this repo.
- **Component primitives** — adding new card types, layout components, icon SVGs
  should be planned; this skill is for content and configuration work.
