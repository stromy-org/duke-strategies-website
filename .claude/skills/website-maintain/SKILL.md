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
│   ├── client-data/              ← Git submodule (charter.json + logos + images)
│   │   └── clients/dukestrategies/  ← Brand source of truth (edit in client-data repo)
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
│   └── generate-tokens.ts        ← client-data charter.json → brand-tokens.css + tokens.ts
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

## Architectural Invariants (enforce on every change)

These are non-negotiable patterns baked into the Duke site. Never regress them.

### Content architecture
- **Services are the canonical "what we do" list.** They live in
  `src/data/company.ts` → `services: Service[]` with a `slug` per entry.
- **Every service has a detail page** at `/services/${slug}` via
  `src/pages/services/[slug].astro` (dynamic route, `getStaticPaths()`).
- **Homepage "Our Expertise" and `/what-we-do` both link to `/services/${slug}`**,
  not to `/what-we-do` itself. Do not reintroduce a "Learn more → /what-we-do"
  pattern.
- **`capabilities` is deprecated.** It remains as an empty array in `company.ts`
  for backward compatibility with the type export, but is not rendered anywhere.
  Do not add entries to it. New "things we do" go under `services`.
- **"Our Expertise" = `services.slice(0, 6)` on the homepage.** Featuring a
  different subset = reorder `services` array, don't create a second array.

### Visual invariants
- `.img-cover > img` uses `position: absolute; inset: 0` — never percentage
  height. A `min-height` on the parent + percentage child fails silently and
  leaks the coral tint through.
- Case-study image treatments cycle through `img-frame--offset-br / offset-tr /
  border / offset-bl` × `img-cover--wide / hero / tall` per index. Do not ship
  identical treatments on every case.
- Case-study metric rows use `case-metrics--row` + `case-metrics--count-${N}`,
  never `flex-wrap`. 4 metrics go 2×2 at narrow widths, 1×4 wide.
- Insight cards are flex-column with `flex-grow: 1` on excerpt and
  `margin-top: auto` on the link, so the CTA bottom-aligns across a grid row.
- Contact page uses an OpenStreetMap iframe embed driven by `site.office.bbox`
  + `site.office.lat/lon` — never a "MAP LOADING…" placeholder.
- Insight `image` fields reference `/assets/insights/insight-NN-<slug>.jpg` —
  real og:images downloaded from the referenced URL, never a hot-link to an
  external host, never a placeholder gradient.
- Affiliate cards that have a `partners` array render a `.partner-chips` list
  linking to each sub-agency (Paritee → Geelmuyden Kiese / Brands2Life / LHLK /
  DVA Studio). Do not reduce that list to only the umbrella's URL.

If a change you're about to make would violate any of these, STOP and surface
the conflict before editing.

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
| `/services/<slug>` | `src/pages/services/[slug].astro` | Dynamic service detail pages (one per service) |

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
| "toggle dark mode", "change dark mode icons", "adjust dark mode colors", "dark theme" | [Dark Mode](#dark-mode) |
| "deploy", "build the site", "push to prod" | [Build & Deploy](#build--deploy) |

---

## Update Services

Services are the canonical "what we do" list. They live in `src/data/company.ts`
→ `export const services: Service[]`. Every service automatically gets a detail
page at `/services/${slug}` via the dynamic route
`src/pages/services/[slug].astro`.

Schema (see the `Service` type at the top of the file):
```ts
{
  slug: string;              // URL segment, kebab-case ("strategic-advisory")
  name: string;              // "Strategic Advisory"
  tagline: string;           // One-liner used on cards
  description: string;       // One paragraph
  industries?: string[];     // e.g. ["Energy", "Financial Services"]
  deliverables?: string[];   // e.g. ["Stakeholder map", "Risk assessment"]
  longform: {
    challenge: string;       // "The problem we solve"
    approach: string[];      // Bulleted process — rendered as ordered list
    signals: string[];       // "Engage us when…" — rendered as bullet list
  };
}
```

- **Add**: append a new object with a unique `slug` and complete `longform` block.
  The detail page auto-generates on next build.
- **Update**: edit the object in-place — copy changes propagate to the card, the
  `/what-we-do` grid, and the detail page in one shot.
- **Remove**: delete the object. Also grep `src/pages/` for any hardcoded
  reference to the slug.

**Do not** duplicate service copy into `what-we-do.astro` or `index.astro`. Both
pages read from `services` and link to `/services/${slug}`.

The homepage shows `services.slice(0, 6)` as "Our Expertise" cards. The
`/what-we-do` page shows the full list. The detail page renders Challenge /
Approach / Signals with a sticky Deliverables sidebar and related services
(neighboring slices of the `services` array).

Verify: `npm run build`, then visit `/services/${slug}` in dev.

---

## Update Capabilities

**`capabilities` is deprecated.** It remains as an empty `Capability[]` export in
`src/data/company.ts` only so the type signature is preserved; no page renders
it. New "things we do" belong in `services` — see [Update Services](#update-services).

If a user asks to "add a capability", confirm whether they mean a new service
(likely) or a finer-grained sub-item inside an existing service's `longform.approach`.
Do not reintroduce the capabilities grid on `/what-we-do`.

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
in `public/assets/images/`. If it doesn't, copy it from `client-data/clients/dukestrategies/images/` first
(or update the submodule if the image is new in client-data).

**Metrics:** 2–4 metrics read best in the card layout. Keep values short
(e.g., `"92%"`, `"500+"`, `"< 4h"`). The case-study block renders metrics via
`case-metrics--row` + `case-metrics--count-${metrics.length}` — don't replace
that with a flex-wrap row or a 4-metric case will orphan the 4th into its own
line.

**Image treatment variation:** `insights.astro` (which also renders the case
studies) cycles image blocks through `img-frame--offset-br / offset-tr / border
/ offset-bl` × `img-cover--wide / hero / tall` so each case reads differently
on the page. When adding a case, it inherits the next slot in the rotation
automatically — but if you reorder cases or remove mid-array entries, scan the
`/what-we-do` page to make sure the rotation still reads well visually.

**Image fill pattern:** All case study images sit inside `.img-cover` whose
`> img` child uses `position: absolute; inset: 0`. Never regress that rule to
`width/height: 100%` percentages — the coral tint overlay will leak.

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
  region: string;
  description: string;
  href: string;         // External URL to the affiliate itself (e.g. paritee.com)
  partners?: Array<{    // Optional — for umbrella networks like Paritee
    name: string;       // Sub-agency name (e.g. "Geelmuyden Kiese")
    href: string;       // Sub-agency website
    region: string;     // e.g. "Scandinavia"
  }>;
}
```

Affiliates render on `/contact` (Global Reach section) and also as link cards on
`/who-we-are`. When the affiliate is an umbrella (Paritee, etc.), populate the
`partners` array so the contact page renders a `.partner-chips` list linking
each sub-agency directly — the user explicitly asked that visitors be able to
reach the real operational agency, not only the parent brand.

Always verify every URL (top-level `href` AND every `partners[].href`) resolves
before committing. Stale "Global Reach" links are the most visible kind of rot.
Prefer the `WebFetch` tool or a quick Playwright MCP navigation to verify.

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
  image?: string;     // "/assets/insights/insight-NN-<slug>.jpg"
  imageAlt?: string;
}
```

Rendered on `/insights` via `InsightCard.astro`. The MDX `insights` collection in
`src/content/insights/` is scaffolded but currently unused — do **not** add MDX
files there expecting them to render. Add to the `insights` array in `company.ts`
instead.

### og:image sourcing workflow (mandatory for new insights)

Never ship an insight card with a placeholder gradient or a hot-linked external
image. Every entry that points to an external article must have a locally
downloaded og:image under `public/assets/insights/`.

1. **Fetch the og:image URL** from the referenced article:
   - Preferred: `WebFetch` or `curl -sL <href> | grep -i 'og:image'` and
     regex-extract the `content="..."` attribute.
   - Fallback: Playwright MCP — `browser_navigate` then `browser_evaluate` with
     `document.querySelector('meta[property="og:image"]').content`.
2. **Download** the image to
   `public/assets/insights/insight-NN-<slug>.jpg` where `NN` is the 2-digit
   insight index in the array and `<slug>` is a short kebab-case identifier
   (e.g. `insight-07-energy-transition.jpg`). Prefer `.jpg`; convert PNGs/WebPs
   to JPG when possible to keep the folder uniform.
3. **Wire the fields** on the new `insights` entry:
   ```ts
   image: "/assets/insights/insight-07-energy-transition.jpg",
   imageAlt: "Wind turbines at dusk — referenced article header image",
   ```
4. **Verify** the image loads at `http://localhost:4321/assets/insights/...`
   and that the card renders the photo instead of the gradient fallback.

If a referenced article has no og:image (or hot-linking is blocked and you can
only get a low-quality thumbnail), choose a relevant image from
`src/brand/images/`, copy it under `public/assets/insights/` with the same
naming scheme, and note the substitution in the commit message.

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
  office: {
    street, postalCode, city, country,
    lat: 51.7095,      // Latitude — drives OSM marker position
    lon: 5.2827,       // Longitude — drives OSM marker position
    bbox: [5.2747, 51.7055, 5.2907, 51.7135] as [number, number, number, number],
    // bbox = [minLon, minLat, maxLon, maxLat] — drives OSM iframe viewport
  },
  contact: { email, phoneDisplay, phoneHref, linkedin },
  analytics: { provider, domain },
  marqueeItems: [...],
};
```

**When changing the phone number**, update both `phoneDisplay` (human-readable) and
`phoneHref` (raw `tel:` link).

**When changing the office address**, also update `lat`, `lon`, and `bbox` — these
drive the OpenStreetMap iframe embed on `/contact`. The `bbox` is
`[minLon, minLat, maxLon, maxLat]` and should encompass roughly a 500m radius
around the office pin. Use <https://www.openstreetmap.org/> to find coordinates.

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

When brand data changes upstream in `client-data` (colors, fonts, logos, images):

### 1. Update the client-data submodule

```bash
cd /Users/williammasquelier/Repositories/stromy-org/clients/duke-strategies/duke-strategies-website
git submodule update --remote client-data
```

### 2. Regenerate tokens in this repo

```bash
npm run tokens
```

Reads `client-data/clients/dukestrategies/charter.json` and regenerates:
- `src/styles/brand-tokens.css` — CSS custom properties (`--brand-*`)
- `src/lib/tokens.ts` — typed TS module

### 3. Re-copy runtime assets if images changed

Because images are duplicated between `client-data/clients/dukestrategies/images/` and `public/assets/images/`,
if new images were added or removed:

```bash
rsync -a --delete client-data/clients/dukestrategies/images/ public/assets/images/
rsync -a --delete client-data/clients/dukestrategies/logos/ public/assets/logos/
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
- Images added in client-data → available after submodule update + rsync step

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

## Dark Mode

The site has an optional dark mode toggle in the nav bar. It uses CSS custom property
overrides via `[data-theme="dark"]` on `<html>`.

### Key Files

- **Token overrides**: `src/styles/tokens-semantic.css` → `[data-theme="dark"]` block
- **Toggle component**: `src/components/layout/ThemeToggle.astro` (lightbulb / star icons)
- **FOUC prevention**: `src/layouts/BaseLayout.astro` → inline `<script>` in `<head>`
- **Toggle init**: `src/layouts/BaseLayout.astro` → `initThemeToggle()` in DOMContentLoaded
- **Transitions**: `src/styles/global.css` → smooth transition rules + dark-mode overrides

### Adjusting Dark Theme Colors

Edit the `[data-theme="dark"]` block in `tokens-semantic.css`. Only override semantic
tokens (Tier 2/3). Brand accent (`--accent`) stays the same — coral works on dark.

### Changing Icons

Edit `ThemeToggle.astro` SVG paths. Light-mode icon is colored `var(--accent)` (coral),
dark-mode icon is colored `#F0F0F2` (near-white).

### Disabling Dark Mode

Remove `ThemeToggle` import from `Navigation.astro`, remove `[data-theme="dark"]` block
from `tokens-semantic.css`, remove the FOUC script from `BaseLayout.astro <head>`.

---

## Visual Audit

Use this workflow when the user asks for: visual review, design critique, layout
polish, responsive review, screenshot-based QA, contrast review, or says "use vision".

### 1. Audit the rendered site, not just the source

Start the server: `npm run dev`. Do not rely on code inspection alone for visual work.

### 2. Use the full route list

Capture all static pages plus dynamic service detail pages:
- `/`, `/who-we-are`, `/what-we-do`, `/duke-academy`, `/insights`, `/contact`
- `/services/<slug>` — one per service entry (currently 7). Get slugs from
  `services` array in `src/data/company.ts`. At minimum, spot-check the first
  and last service detail page.

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

## Visual Consistency Patterns

These patterns are enforced site-wide. When adding or modifying content, verify
they still hold.

- **Image containers**: Always use `.img-cover` with `position: absolute; inset: 0`
  on `<img>`, never inline `width/height/object-fit` styles. Use aspect-ratio
  variants (`.img-cover--wide`, `.img-cover--hero`) for sizing instead of `min-height`.
- **Card CTA alignment**: All cards in grids must use `flex-direction: column` with
  `margin-top: auto` on the bottom link. Verify alignment visually after content changes.
- **Metric grids**: Use count-aware CSS grid classes (`case-metrics--count-N`), never
  flex-wrap for metrics. 4 metrics = 2x2 grid.
- **Theme compatibility**: Any new component or style must work in both light and dark
  modes. Use semantic tokens (`var(--card-bg)`, `var(--text-heading)`) — never hardcoded
  colors like `rgba(255, 255, 255, 0.98)`.
- **Long text handling**: Cards with text content must include `overflow-wrap: break-word`
  on title elements (especially relevant for Dutch compound words).
- **Service count**: Currently 6 services. Homepage shows all 6. "What We Do" shows
  all 6. They must stay aligned — don't add a service to one without the other.
- **Map embed**: Contact page uses a real OSM iframe embed (not a placeholder).
  Coordinates in `src/data/site.ts` (`lat`, `lon`, `bbox`).
- **Grid columns**: Use `minmax(0, 1fr)` instead of `1fr` in grid-template-columns
  to prevent long words from blowing out column widths.

## Dutch Translation Quality (NL i18n)

When adding or modifying Dutch content, apply these language conventions:

- **Keep English corporate terms that are standard in Dutch business**: stakeholder
  intelligence, change management, employee engagement, talking points, playbook,
  framework, messaging matrix, briefing packs, key messages, feedback loops,
  milestone, regulatory narrative, monitoring dashboard, capability, recovery strategy.
- **Never create Dutch monster-compounds**: If a translated term exceeds ~20 characters
  as a single compound word, break it into spaced words using the English term. E.g.,
  "Verandermanagementcommunicatie" → "Change Management Communicatie".
- **Keep brand-specific terms in English**: "stakeholder advisory" (Duke's positioning),
  "thought leadership", "public affairs", "crisis management".
- **Watch for mistranslations**: "Capability" ≠ "Capaciteit" (that means capacity/volume).
  When unsure, keep the English term.
- **Deliverable names are product names**: Keep them in English when the Dutch translation
  would be an awkward compound. They appear as headings/labels, not prose.
- **Compound word spacing**: Even when keeping Dutch terms, add spaces between recognizable
  word boundaries: "Sentimentanalyserapport" → "Sentiment Analysis Report".

---

## What This Skill Does NOT Cover

- **Major structural refactors** — e.g., migrating content from `src/data/company.ts`
  to MDX collections, extracting inline sections into components, i18n rollout. These
  are architectural changes; raise them in `BACKLOG.md` first.
- **New page creation beyond the existing 6** — possible, but think about IA and
  navigation impact before adding.
- **Brand redesign** — that's the `brand-builder` skill's job, operating on
  `client-data` repo, not this repo.
- **Component primitives** — adding new card types, layout components, icon SVGs
  should be planned; this skill is for content and configuration work.
