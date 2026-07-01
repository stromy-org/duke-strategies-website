---
name: website-maintain
description: >
  Maintain and update the Duke Strategies Astro website. Handles all routine content
  and configuration changes via natural language: adding blog posts or insights,
  updating services, case studies, team, stats, navigation, brand tokens, dark mode,
  and SEO. Use this skill whenever the user wants to add, edit, or remove website
  content, refresh the brand, or make any structural change — even if they don't say
  "website" explicitly. Trigger on phrases like "add a blog post", "new case study",
  "update the team", "refresh brand tokens", "update the homepage", "change the
  tagline", "add a nav item", "update SEO", "review the design", "audit the layout",
  "check responsiveness", "use vision", "screenshot the pages", or any request that
  implies modifying or visually reviewing the Duke Strategies website.
---

# Website Maintain

Guides every routine maintenance task on the **Duke Strategies** website — an Astro
static site with Tailwind CSS 4 and a brand token pipeline. All content lives in
the repo; there is no CMS, no database, no external API.

## Content model — corporate vs Cargo-style

This template serves two content models. **Detect which one this site uses before
routing any task:**

- **Cargo-style editorial portfolio** (artists, photographers, designers) — signalled
  by `charter.json` `meta.style: "cargo"`, **or** a `src/data/content.ts` exporting
  `series`/`works`, **or** a fixed-index `SiteLayout.astro`. If so, **ignore the
  corporate sections below** (blog, case studies, services, team, stats, dark mode)
  and use the Cargo router just below. Full pattern + skeleton:
  `astro-website-template/references/cargo-style-recipe.md`.
- **Corporate / marketing site** (default) — MDX collections + `src/data/*`. Use the
  Task Router and Content Operations sections further down.

### Cargo-style content operations

All edits live in `src/data/content.ts`; artwork images in `public/works/`. Adding a
series auto-creates its `/<id>` page **and** its index entry (both generated from
`series[]`), so no routing/nav edits are needed.

| User says… | Do |
|---|---|
| add a work to a collection | append `{ title, meta, image?, ratio }` to that series' `works[]` — `ratio` ∈ portrait/square/landscape/wide |
| add a collection | append `{ id, title, blurb, meta, works[] }` to `series[]` (`id` = URL slug) |
| edit a collection's text | edit its `title` / `blurb` / `meta` |
| reorder | reorder `works[]` (within a series) or `series[]` (collections + their `0N` numbering) |
| add artwork images | web-size (~2000px long edge, < 500 KB), drop in `public/works/`, set `image: "/works/<file>"` (omit `image` → placeholder) |
| update About / CV / Contact | edit `about.paragraphs` / `cv[]` / `contact` |

Preview with `npm run dev`; deploy by pushing to `main`. Brand/visual-QA/deploy
sections below apply to both models.

## Content-only homes — the broker ownership boundary (directive)

This site's `.asset-broker.json` lets the client **self-publish edits to their own
words and pictures** only when those live in a *content-only home*. When you add or
edit content, you MUST keep it inside one of these five homes so the client keeps
ownership of it — and keep route/config/behaviour/brand out:

| Home | Put here | Never here |
|---|---|---|
| `src/content/**` | Astro/MDX collection entries | `src/content.config.ts` (schema — structural) |
| `src/data/content/**` | typed displayed copy, people/services/case-study **values**, contact text | routes, hrefs, shared types, analytics IDs, behaviour flags |
| `src/i18n/content/**` | localized displayed **values** (nav/section labels, 404 text) | `languages`/`defaultLang` config, `ui.keys.json`, `utils.ts`/`pickLocale.ts`, `glossary.md`/`brand-voice.md` |
| `src/assets/content/**` | imported/optimized **content** imagery | logos, design-system/brand assets |
| `public/content/**` | static content images/video/downloads | `staticwebapp.config.json`, JS, `CNAME`, robots, favicons, canonical logos |

**Three hard rules when you touch content:**

1. **Use a home.** New copy/data/media goes into the matching home above — never a
   mixed parent (`src/data/`, `src/i18n/`, `src/assets/`, `public/` root).
2. **Split values from structure.** When a module mixes displayed copy with routes,
   types, hrefs, or config, move only the **values** into a `content/` home and keep
   the structural fields in the original (review-gated) module, composing them back
   together. Never inline client-facing text directly into a `.astro`
   component/page/layout — drive page `title`/`description` from data/i18n values.
3. **Localized labels are content.** A "rename the menu/section label" or "change the
   404 text" request edits the **value** under `src/i18n/content/**` (self-publishing);
   only the *key/shape* (`ui.keys.json`) and brand-voice files stay gated.

The meta-repo audit (`scripts/audit-asset-broker-coverage.py`) fails CI if content
escapes a home or a protected file lands in the self-publishing lane, so this is a
mechanical boundary, not a style preference. Full model:
`references/agent-surface-contract.md` → "Broker content-ownership".

## Table of Contents

1. [Quick Orientation](#quick-orientation)
2. [Maintenance Log](#maintenance-log)
3. [Task Router](#task-router)
4. [Content Operations](#content-operations)
5. [Site Data](#site-data)
6. [Refresh Brand Tokens](#refresh-brand-tokens)
7. [Dark Mode](#dark-mode)
8. [Update Navigation](#update-navigation)
9. [Update SEO](#update-seo)
10. [Visual QA Protocol](#visual-qa-protocol)
11. [Build & Deploy](#build--deploy)
12. [Common Patterns Reference](#common-patterns-reference)
13. [Site Configuration](#site-configuration)

---

## Quick Orientation

<!-- SITE-SPECIFIC: repo-structure -->
See the repo's CLAUDE.md for the full directory tree. Key landmarks:

- **Content source** — MDX collections in `src/content/` OR TypeScript data files
  in `src/data/` (site-specific; check CLAUDE.md)
- **Brand data** — `client-data/clients/dukestrategies/` (charter.json, logos,
  images) — committed slice, do not edit charter.json directly
- **Generated files (never edit directly)**:
  - `src/styles/brand-tokens.css` (or `client-data.css`) — regenerate with
    `npm run tokens`
  - `src/lib/tokens.ts` — regenerate with `npm run tokens`
- **Dev server**: `npm run dev` (localhost:)
- **Build**: `npm run build` (runs token generation + Astro build)
<!-- /SITE-SPECIFIC -->

---

## Maintenance Log

Every session must start by reading and end by updating
`.build-history/MAINTENANCE_LOG.md`. This file captures decisions, preferences,
and quirks that live outside code and git history.

### First thing in ANY session

1. Check whether `.build-history/MAINTENANCE_LOG.md` exists.
2. **If it exists**: read it in full before touching anything. Note aesthetic
   preferences, locked decisions, and discovered quirks. Start from `Next action`.
   Do not re-propose approaches listed as off-limits.
3. **If it does not exist** (first session or inherited site):
   - Create `.build-history/` if absent
   - Copy the template from stromy-org's
     `astro-website-template/references/maintenance-log-template.md`
   - Fill the Status Dashboard from current site state
   - Save before doing any content or design work

### When to update the log

| Trigger | What to update |
|---|---|
| User confirms a visual preference | Append to User Aesthetic Preferences as `[likes]` |
| Design approach rejected | Append to User Aesthetic Preferences as `[off-limits]` |
| Non-obvious site quirk found | Append to Discovered Site Quirks |
| Architecture or design decision made | Append to Site Decisions |
| Deferred item resolved | Check it off in Deferred Items |
| Ending a session | Refresh Status Dashboard + append Work Log entry |

### Handoff quality bar

Before ending a session: *"If a fresh agent read only `MAINTENANCE_LOG.md` and
`SKILL.md`, could they resume this work without asking the user anything?"*
If no, add what's missing before closing.

---

## Task Router

<!-- SITE-SPECIFIC: task-router -->
| User says something like... | Go to |
|---|---|
| "add a blog post / insight / article" | [Add Blog Post or Insight](#add-blog-post-or-insight) |
| "add a case study / use case" | [Add Case Study](#add-case-study) |
| "update services / capabilities" | [Update Services or Capabilities](#update-services-or-capabilities) |
| "update the team", "add a team member", "change bio" | [Update Team](#update-team) |
| "update stats", "change the metrics" | [Update Stats](#update-stats) |
| "refresh brand", "sync brand tokens", "colors changed" | [Refresh Brand Tokens](#refresh-brand-tokens) |
| "toggle dark mode", "fix theme", "dark mode issue" | [Dark Mode](#dark-mode) |
| "update navigation", "add a nav link" | [Update Navigation](#update-navigation) |
| "update SEO", "meta tags", "OG image", "structured data", "JSON-LD", "hreflang" | [Update SEO](#update-seo) |
| "SEO audit", "SEO score", "Lighthouse SEO", "validate structured data", "rich results" | [SEO audit](#seo-audit) |
| "update the homepage", "change the tagline" | [Update Homepage](#update-homepage) |
| "review the design", "visual audit", "check mobile", "use vision" | [Visual QA Protocol](#visual-qa-protocol) |
| "deploy", "build the site" | [Build & Deploy](#build--deploy) |
<!-- /SITE-SPECIFIC -->

---

## Content Operations

### Add Blog Post or Insight

<!-- SITE-SPECIFIC: content-arch-blog -->
Check the site's CLAUDE.md to confirm whether blog/insight content lives in
MDX collections (`src/content/blog/`) or in a TypeScript data file.
<!-- /SITE-SPECIFIC -->

#### If content lives in MDX collections

Create a new `.mdx` file in the appropriate collection directory.

Required frontmatter (minimum — check `src/content.config.ts` for the full schema):

```mdx
---
title: "[title]"
description: "[description]"
date: YYYY-MM-DD
author: "[author]"
tags: ["tag1", "tag2"]
image: ../../brand/images/[filename].jpg
featured: false
---

[MDX body content here]
```

**Filename convention:** kebab-case slug — the filename (without `.mdx`) becomes
the URL slug.

After creating, run `npm run build` to validate. Astro catches missing required
fields, invalid values, and broken image paths.

#### If content lives in a TypeScript data file

Append a new entry to the array in the relevant data file, following the existing
object shape exactly.

**Mandatory: og:image for external links.** Never ship an insight card pointing to
an external article without a locally downloaded og:image. Workflow:
1. Fetch the og:image URL from the article head (use WebFetch or Playwright MCP)
2. Download it to `public/assets/insights/insight-NN-<slug>.jpg`
3. Wire `image` and `imageAlt` fields on the new entry
4. Verify the image loads at `http://localhost:/assets/insights/...`

---

### Add Case Study

<!-- SITE-SPECIFIC: content-arch-casestudy -->
Check the site's CLAUDE.md to confirm whether case studies live in MDX collections
(`src/content/case-studies/`) or in a TypeScript data file.
<!-- /SITE-SPECIFIC -->

**Filename convention:** `[region]-[client-slug].mdx`

Minimum frontmatter:
```mdx
---
title: "[title]"
description: "[description]"
client: "[client name]"
region: "[au|nl|global]"
metrics:
  - label: "[label]"
    value: "[value]"
image: ../../brand/images/[filename].jpg
---
```

Once created, the case study auto-appears on the case studies index and any page
that queries the collection dynamically — no manual updates needed.

After adding, run `npm run build` and visually check the case studies page.

---

### Update Services or Capabilities

<!-- SITE-SPECIFIC: content-arch-services -->
Services/capabilities may live in `src/data/` (TypeScript array) or in MDX
collection files in `src/content/capabilities/`. Check CLAUDE.md.
<!-- /SITE-SPECIFIC -->

When adding a new service/capability:
- For data-file sites: append to the array with a unique `slug`
- For collection sites: create a new `.mdx` file and set `order` to the next available number

Run `npm run build` and verify the detail page renders at its expected URL.

---

### Update Team

Team data lives in a TypeScript data file. Common locations:
- `src/data/team.ts` — array exported as `team`
- `src/data/company.ts` — arrays exported as `founders`, `associates`, `expertPartners`

Fields: `name`, `role` or `title`, `bio`, and optionally `image`, `email`.

To add a member: append to the array. To remove: delete the entry.

<!-- SITE-SPECIFIC: team-photo-convention -->
Check CLAUDE.md for the team photo naming convention and storage location.
<!-- /SITE-SPECIFIC -->

---

### Update Stats

Stats live in `src/data/stats.ts`. Each entry has:
- `value` — the number or string shown prominently
- `label` — descriptor text
- `suffix` — appended after value (e.g., `"M+"`, `"%"`, `"hrs"`)

Keep to 3–5 stats for visual balance.

<!-- SITE-SPECIFIC: stats-localized -->
For bilingual sites (Duke Strategies), `label` is `Localized<string>` —
`{ en: "...", nl: "..." }`. After editing EN, run the Translate Content workflow.
<!-- /SITE-SPECIFIC -->

---

### Update Homepage

The homepage assembles section components sequentially. To change content:

- **Tagline / hero copy** — edit `src/data/site.ts` (`site.tagline`) and any
  component that renders it inline
- **Featured case studies** — reorder the `caseStudies` array, or for
  collection-based sites add/edit MDX files; set `featured: true` to surface in homepage showcase
- **Capability/service preview** — edit the data array or MDX collection
- **Stats** — edit `src/data/stats.ts`
- **Hero image** — edit the Hero component's media reference directly
- **Section transitions** — the SectionDivider component between sections in `index.astro`
  takes `from` and `to` CSS color values to control gradient bleed

---

## Site Data

### `src/data/site.ts`

Contains: site name, URL, tagline, description, nav items, footer nav groups,
contact details, Calendly URL, email routing config.

When changing a **phone number**, update both the display string and the `tel:`
href. When changing an **office address**, also update any map embed config.

---

## Refresh Brand Tokens

When brand data changes upstream (colors, fonts, logos, images in `client-data`):

### 1. Update the client-data source

```bash
git submodule update --remote client-data
```

### 2. Regenerate tokens

```bash
npm run tokens
```

Reads `client-data/clients/dukestrategies/charter.json` and regenerates:
- `src/styles/brand-tokens.css` (or `client-data.css`)
- `src/lib/tokens.ts`

### 3. Re-copy runtime assets if images or logos changed

```bash
rsync -a --delete client-data/clients/dukestrategies/images/ public/assets/images/
rsync -a --delete client-data/clients/dukestrategies/logos/  public/assets/logos/
```

### 4. Build and verify

```bash
npm run build
npm run dev   # inspect visually if colors, fonts, or logos changed
```

### What propagates automatically

- Color changes → CSS custom properties → all components
- Font changes → font family variables → all typography

### What requires manual updates

- Removed images → check all `image:` references in MDX frontmatter and data files
- Logo filename changes → update any component that imports the logo by name
- New fonts → add `@import url(...)` to `global.css`

---

## Dark Mode

The site uses `data-theme` attribute on `<html>` to toggle light/dark mode.

### How it works

1. **FOUC prevention** — inline `<script>` in `<head>` (BaseLayout.astro) reads
   `localStorage('dukestrategies-theme')` and `prefers-color-scheme` before
   first paint
2. **Toggle** — `ThemeToggle.astro` queries `[data-theme-toggle]` via
   `querySelectorAll` (may render in both desktop and mobile nav)
3. **CSS overrides** — `[data-theme="dark"]` block in global.css overrides
   Tier 2/3 semantic tokens
4. **Persistence** — choice saved to `localStorage`
5. **System preference** — falls back to `prefers-color-scheme`

### Adjusting dark theme colors

Edit the `[data-theme="dark"]` block in `src/styles/global.css`. Only override
semantic tokens — brand primitives in `@theme` stay the same.

Key tokens to check:
- `--surface-primary`, `--surface-elevated`, `--surface-sunken`
- `--text-heading`, `--text-body`, `--text-muted`
- `--border-default`, `--border-subtle`, `--border-strong`
- `--card-bg`, `--card-shadow`, `--nav-bg`

### Troubleshooting

- **Toggle not working after navigation** — verify `initThemeToggle()` is called
  on `astro:after-swap` and re-queries the DOM with `querySelectorAll`
- **FOUC on page load** — verify the inline `<script>` in BaseLayout `<head>` runs
  before any CSS loads
- **Form inputs wrong color in dark mode** — add `color: var(--text-body)` and
  `background-color: var(--surface-sunken)` to the `[data-theme="dark"]` form block

---

## Update Navigation

### Main navigation

For simple `site.ts` nav arrays: edit the `nav` array in `src/data/site.ts`.

For bilingual sites with a dedicated `src/data/nav.ts`:
- Nav items use `labelKey: UIKey` — the label resolves via `t(item.labelKey)`
- Add new keys to `ui.en.ts` and `ui.nl.ts` simultaneously

Adding a new page to the nav:
1. Create the page file in `src/pages/`
2. Add the nav item to the relevant config (with `group` field for grouped navs)
3. Verify the link appears in both header and footer

### Footer navigation

Footer nav groups live in `src/data/site.ts` (`footerNav` or equivalent).

---

## Update SEO

The brand-aware SEO kit lives in `src/lib/seo.ts` + `src/components/seo/{Seo,JsonLd}.astro`,
configured from `src/data/site.ts` and wired through `BaseLayout.astro`. Full
playbook (2026 checklist, structured-data catalog, crawler policy, hreflang):
[`references/seo-patterns.md`](../../../references/seo-patterns.md).

> **Honest ceiling.** This kit delivers crawlability + machine-parseability
> (schema, semantic HTML, sitemap/robots, social previews, CWV). It does not
> manufacture rankings or AI citations. Rank `llms.txt` as a hedge, not a lever,
> and never promise GEO outcomes to a client.

- **Per-page title & description** — pass `title` / `description` to `BaseLayout`
  (which forwards them to `Seo.astro`). For content collections, edit `title` /
  `description` in the entry frontmatter. `Seo.astro` appends ` | <site>`; do not
  double-suffix.
- **Structured data** — pass page-specific JSON-LD via the `jsonLd` prop using the
  `src/lib/seo.ts` builders: `articleSchema` + `breadcrumbSchema` on
  blog/insight/case-study pages; `localBusinessSchema`/`personSchema` on the
  relevant identity page. Identity + `WebSite` are emitted once on the homepage
  (`isHome`) — never duplicate them per page.
- **`noindex`** — pass `noindex={true}` to `BaseLayout`/`Seo` for thank-you,
  search, and staging pages (the `404` already sets it). A `noindex` page still
  self-canonicals.
- **OG image** — `Seo.astro` always resolves `og:image` (page `image` prop →
  `site.defaultOgImage`), so no page ships a blank card. With `enable_dynamic_og`,
  register a page in `src/pages/og/[...route].ts`'s `pages` map to get a generated
  branded 1200×630 card, then point that page's `image` at `/og/<route>.png`.
- **Sitemap & robots** — `@astrojs/sitemap` generates `/sitemap-index.xml`;
  `public/robots.txt` references it and carries the AI-crawler policy. Keep
  `astro.config.mjs` `site:` equal to `src/data/site.ts` `url` — a mismatch ships
  wrong canonicals.
- **hreflang** (bilingual sites) — pass reciprocal `alternates` from the site's
  i18n source; every language version lists itself + alternates.
- **RSS** — set `rss_collection` (Copier) / `site.features.rssCollection` to a real
  collection key to emit `/rss.xml`; omitted otherwise.
- **Pagefind search** — `enable_site_search` adds `/search` + a
  `pagefind --site dist` postbuild; mark the content root `data-pagefind-body` and
  exclude chrome/`/404`/`/search`.
- **Analytics (Plausible)** — set `site.analytics.provider='plausible'` **and**
  `plausibleScriptSrc` to the per-site URL from the Plausible installation screen
  (a domain alone emits no script); `BaseLayout` injects it conditionally.

---

## SEO audit

Run when the user asks to audit SEO, check the SEO score, or validate structured
data on a page or the whole site.

1. `npm run build && npm run preview` (or use the running dev server).
2. With the `chrome-devtools` MCP, run a **Lighthouse SEO** audit on the target
   page(s); target score ≥ 95. (Fallback: the playwright capture snippets below.)
3. Inspect the rendered `<head>`: one `<title>`/canonical/description, full
   OG/Twitter set, one `application/ld+json` graph, correct `noindex` where
   intended.
4. Validate the JSON-LD with the Schema Markup Validator (whole graph) and
   Google's Rich Results Test (Google-supported types only — Article, Breadcrumb,
   Organization/LocalBusiness).
5. Report the score + a prioritized fix list, citing
   [`references/seo-patterns.md`](../../../references/seo-patterns.md).

---

## Visual QA Protocol

Use this workflow when the user asks for: visual review, design critique, layout
polish, responsive check, screenshot-based QA, or says "use vision" or "check it yourself".

### Rule: always inspect the rendered site, not just source

```bash
npm run dev
```

### Tooling preference

When the `chrome-devtools` MCP is available, prefer it over the `playwright` CLI
snippets below for any audit work: it bundles screenshot, computed-style
inspection, network panel, and **Lighthouse a11y / performance audits** into a
single CDP session. The CLI snippets below remain the fallback for raw screenshot
capture without a running MCP browser.

### Capture set

```bash
# Desktop
npx --yes playwright@latest screenshot --browser=chromium \
  --viewport-size=1440,1100 --wait-for-timeout=2000 \
  http://127.0.0.1:/ /tmp/home-desktop.png

# Mobile
npx --yes playwright@latest screenshot --browser=chromium \
  --viewport-size=390,844 --wait-for-timeout=2000 \
  http://127.0.0.1:/ /tmp/home-mobile.png

# Full-page
npx --yes playwright@latest screenshot --browser=chromium --full-page \
  --viewport-size=1440,1100 --wait-for-timeout=2000 \
  http://127.0.0.1:/ /tmp/home-full.png
```

### Before capturing: control state

- Confirm whether dark mode is active in localStorage
- Confirm mobile menu is in default (closed) state

### Route list

<!-- SITE-SPECIFIC: routes -->
Build the route list from:
- Static files in `src/pages/`
- Content-driven routes from `src/content/` collections: 
- Dynamic routes discovered from the running homepage
<!-- /SITE-SPECIFIC -->

### Visual checklist (every page)

- Logo rendering and asset imports
- Text contrast on light and dark surfaces
- Heading hierarchy and scanability
- Spacing rhythm and section transitions
- Card consistency and visual hierarchy
- Image quality, crop, and overlay treatment
- Navigation clarity and active-state visibility
- Footer legibility and route validity
- Mobile layout, tap-target spacing, and menu behavior

### Brand feel heuristics

<!-- SITE-SPECIFIC: brand-heuristics -->
- **Colors**: primary ``, accent ``,
  background ``
- **Fonts**: headings ``, body ``,
  mono ``
- Confirm the site still matches `client-data/clients/dukestrategies/charter.json`
<!-- /SITE-SPECIFIC -->

---

## Build & Deploy

### Local build

```bash
npm run build    # Generate tokens + Astro build → dist/
npm run preview  # Serve dist/ locally for inspection
```

### Pre-deploy checklist

1. `npm run build` locally — zero errors, no missing images
2. `npm run preview` — spot-check changed pages at desktop and mobile
3. New content has correct region/locale tags
4. Image paths resolve (build catches broken paths)
5. If brand was refreshed, confirm `npm run tokens` was run
6. `astro.config.mjs` `site:` value matches the production domain **and**
   `src/data/site.ts` `url` (reconcile both — a mismatch ships wrong canonicals)
7. New/edited pages: title + description set, structured data via `jsonLd` where
   applicable, `og:image` resolves (default fallback or a `/og/*.png` card)
8. Bilingual sites: reciprocal `hreflang` on changed route pairs
9. If search is enabled, `dist/pagefind/` exists after build (postbuild ran)

### CI/CD — Azure Static Web Apps

Deploy triggers automatically on push to `main` via `.github/workflows/deploy.yml`:
1. `npm ci`
2. `npm run tokens`
3. `npm run build`
4. `Azure/static-web-apps-deploy` uploads `dist/` using the repo secret
   `AZURE_STATIC_WEB_APPS_API_TOKEN`.

**No Azure action is needed for content** — the deploy token, custom domain, and
managed TLS cert are bound once at setup (see `azure_swa/README.md`).

### Custom Domain Setup

Azure SWA needs an ALIAS/ANAME for an **apex** domain. If the registrar doesn't
support that (e.g. GoDaddy), make `www` canonical and forward the apex:
1. DNS: `CNAME www → <app>.azurestaticapps.net`; apex → 301 forward to `https://www.<domain>`.
2. `az staticwebapp hostname set -n <app> -g <rg> --hostname www.<domain>` (validates once the CNAME resolves; auto-provisions TLS).
Record the chosen records in `infra-docs/domains/<registrar>.md`.

---

## Common Patterns Reference

### Content collection access (Astro 5+/6)

```typescript
import { getCollection, render } from 'astro:content';
const posts = await getCollection('blog');
const { Content } = await render(entry);  // NOT entry.render() — that's Astro 4
```

### Region filtering

```typescript
const filtered = posts.filter(
  (p) => p.data.region === region || p.data.region === 'global'
);
```

### Adding a new section to a page

1. Find existing `<section>` elements in the target page
2. Use semantic tokens (`var(--card-bg)`, `var(--text-heading)`) — never hardcode colors
3. New components that recur in multiple pages go in `src/components/sections/`
4. Add `SectionDivider` between sections with contrasting backgrounds

### Theme compatibility

Every new component must work in both light and dark modes. Use semantic tokens —
never raw color values.

### Greenfield design craft (building new pages/sections from scratch)

For substantial build work — composing a brand-new page, designing a section variant,
or interpreting a charter into a fresh layout — load the design-craft references that
ship with the template (in stromy-org at `astro-website-template/references/`):

| Need | Reference |
|---|---|
| Avoid AI-generic look; variance rules | `anti-convergence.md` |
| Section variant catalog | `section-catalog.md` |
| Hard-won build patterns (img-cover, metric grids, contact page, og:images) | `refinement-patterns.md` |
| Archetype → design-default map | `archetype-design-map.md` |
| CSS token architecture | `three-tier-tokens.md` |
| Example homepage compositions per archetype | `page-composition-templates.md` |
| Charter `website` schema | `charter-website-schema.md` |
| Astro/Tailwind implementation patterns | `astro-patterns.md` |
| Proven baseline patterns | `stromy-website-patterns.md` |
| Bilingual / i18n (`Localized<string>`, lang switcher) | `i18n-patterns.md`, `llm-translation-workflow.md` |
| Optional decorative motion | `motion-interaction-patterns.md` |
| Contact page layout/forms | `contact-page-patterns.md` |
| Cross-site variance tracking | `generated-sites-registry.md` |

These were consolidated here when the deprecated `website-builder` skill was retired
(see `infra-docs/ai/website-azure-deploy.md`). Site **creation** is scaffolded via the
Copier `astro-website-template` (`/repo-scaffold`); this skill owns build-out + edits.

---

## Site Configuration

<!-- SITE-SPECIFIC: site-info -->
- **Site name**: Duke Strategies
- **Site URL**: https://dukestrategies.com
- **Client slug** (charter path and localStorage key): dukestrategies
- **Dev port**: 
<!-- /SITE-SPECIFIC -->

<!-- SITE-SPECIFIC: fonts -->
### Typography

- Heading: 
- Body: 
- Mono: 
<!-- /SITE-SPECIFIC -->

<!-- SITE-SPECIFIC: colors -->
### Brand Colors

- Primary: 
- Accent: 
- Background: 
<!-- /SITE-SPECIFIC -->

<!-- SITE-SPECIFIC: content-collections -->
### Content Collections

Active collections: 
<!-- /SITE-SPECIFIC -->

<!-- SITE-SPECIFIC: components -->
### Component Inventory

Check `src/components/` for the current component list. Key areas:
- `layout/` — Header/Navigation, Footer, ThemeToggle
- `ui/` — Button, Card, Badge, Icon, ScoreLine, SectionDivider
- `sections/` — Hero, section-level components
- `effects/` — WaterEffect and other visual effect components
- `content/` — Content-specific cards and layouts
<!-- /SITE-SPECIFIC -->

---

## What This Skill Does NOT Cover

- **Major structural refactors** — flag as out of scope and stop
- **Brand redesign** — that is the `brand-builder` skill's job
- **Adding a new locale** — architectural change, not a maintenance task
- **Backlog management** — do not write to `BACKLOG.md` on your own initiative
