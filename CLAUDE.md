# CLAUDE.md

This file provides guidance to Claude Code when working with this repository.
Cross-repo standards live in `.claude/rules/` and load automatically.

## Project Overview

duke-strategies-website is the **Duke Strategies corporate website** — a static site
built with Astro 6, Tailwind CSS 4, and MDX support. Duke Strategies is a Netherlands-based
strategic communications and public affairs consultancy operating at the intersection of
corporate strategy, corporate affairs, and stakeholder advisory.

**Production URL:** https://dukestrategies.com
**Hosting:** GitHub Pages (via `.github/workflows/deploy.yml`)
**Languages:** English only (no i18n)
**Brand archetype:** ruler / luxury

## Repository Structure

```
duke-strategies-website/
├── src/
│   ├── styles/
│   │   ├── brand-tokens.css      ← GENERATED from charter.json — do not edit
│   │   ├── tokens-semantic.css   ← Tier 2/3 semantic tokens (hand-written)
│   │   └── global.css            ← Tailwind 4 import + base styles
│   ├── lib/
│   │   └── tokens.ts             ← GENERATED TS module — do not edit
│   ├── components/
│   │   ├── layout/               ← Navigation, Footer
│   │   ├── ui/                   ← Card primitives (ServiceCard, TeamCard, InsightCard, ProgramCard, Testimonial, CTABand, etc.)
│   │   ├── sections/             ← (empty — sections currently live inline in pages)
│   │   └── content/              ← (empty)
│   ├── content/                  ← MDX collections — SCAFFOLDED BUT UNUSED
│   ├── content.config.ts         ← Declares insights/pages/authors schemas (collections empty)
│   ├── data/
│   │   ├── company.ts            ← PRIMARY CONTENT SOURCE (founders, services, capabilities, cases, insights, etc.)
│   │   ├── site.ts               ← Site metadata, nav, contact, office, analytics
│   │   ├── nav.ts                ← Top nav items
│   │   └── stats.ts              ← Homepage stat ribbon
│   ├── layouts/                  ← BaseLayout, PageLayout, ArticleLayout
│   └── pages/                    ← 6 Astro pages (index, who-we-are, what-we-do, duke-academy, insights, contact)
├── public/assets/
│   ├── images/                   ← Runtime-served images (mirrors client-data/clients/dukestrategies/images/)
│   ├── logos/                    ← Runtime-served logos
│   ├── team/                     ← Team member photos (not part of brand sync)
│   └── video/                    ← Hero video
├── scripts/
│   └── generate-tokens.ts        ← client-data charter.json → brand-tokens.css + tokens.ts
├── astro.config.mjs              ← MDX + sitemap + @tailwindcss/vite
├── .github/workflows/deploy.yml  ← GitHub Pages deploy on push to main
└── .claude/skills/website-maintain/  ← Site-specific maintenance skill
```

## Commands

```bash
npm run dev           # Astro dev server (localhost:4321)
npm run build         # Generate tokens + production build → dist/
npm run preview       # Preview production build locally
npm run tokens        # Regenerate brand tokens from client-data charter.json
npm run check         # Astro TypeScript + template diagnostics
```

## Critical Architecture Notes

### Editorial content lives in `src/data/company.ts` — NOT in MDX collections

Unlike typical Astro sites, Duke's editorial content is in one TypeScript file:
`src/data/company.ts` exports typed arrays for `founders`, `expertPartners`,
`associates`, `affiliates`, `services`, `capabilities`, `academyPrograms`,
`caseStudies`, `testimonials`, and `insights`. Each page imports from this file
and renders it via card components in `src/components/ui/`.

The `src/content/` folders (blog, case-studies, capabilities, insights, authors,
pages) are scaffolded but empty. `src/content.config.ts` only wires
`insights`, `pages`, `authors` — and all three collections are empty. Do **not**
add MDX files there expecting them to render on existing pages.

### Asset duplication: `client-data/` vs `public/assets/`

Brand images and logos exist in two places:
- `client-data/clients/dukestrategies/{images,logos}/` — from the `client-data`
  git submodule (source of truth)
- `public/assets/{images,logos}/` — what pages actually reference via runtime
  `/assets/...` URLs

After a submodule update, the runtime copies must be updated with rsync (see the
`website-maintain` skill's "Refresh Brand Tokens" workflow).

Team photos live **only** in `public/assets/team/` and are not part of the brand
sync.

### Tailwind 4 via Vite plugin (not PostCSS)

`astro.config.mjs` uses `@tailwindcss/vite`. `src/styles/global.css` uses the
Tailwind 4 `@import "tailwindcss"` syntax. Tailwind 3 configuration files
(`tailwind.config.js`) do not apply here.

### Brand token pipeline

1. `client-data/clients/dukestrategies/charter.json` is the source of truth (via submodule)
2. `npm run tokens` → `scripts/generate-tokens.ts` reads charter.json → writes
   `src/styles/brand-tokens.css` and `src/lib/tokens.ts`
3. `npm run build` runs `tokens` first, then `astro build`
4. Components reference `var(--brand-primary)`, `var(--brand-font-heading)`, etc.
5. **Never edit `brand-tokens.css` or `tokens.ts` directly** — regenerated on every build

## Skill Workflow

Use the `website-maintain` skill for all routine maintenance on this site. It has
site-specific task routing for services, capabilities, case studies, founders, team,
affiliates, Duke Academy, testimonials, insights, stats, navigation, homepage hero,
site info, SEO, brand refresh, media, visual audits, and deploys.

Global skills inherited from `~/.claude/skills/`:
- `conventional-commit` — all commits go through this skill (see `.claude/rules/commit-enforcement.md`)
- `skill-creator` — when creating or modifying skills

## MCP Servers (recommended)

- **`playwright`** — Visual QA, screenshot-based layout audits, responsive review.
  Use via `npx playwright screenshot` commands documented in the `website-maintain`
  skill's Visual Audit section.

## Design System Quick Reference

| Token | Value | Use |
|---|---|---|
| `--brand-primary` | `#FF7F66` | Signal Orange — accents, CTAs (use sparingly) |
| `--brand-secondary` | `#DFDFE0` | Light grey |
| `--brand-background` | `#FFFFFF` | Page background |
| `--brand-background-alt` | `#F5F5F5` | Alt section background |
| `--brand-text` | `#807F83` | Body text |
| `--brand-font-heading` | Montserrat 600 | Headings |
| `--brand-font-body` | Montserrat | Body |
| `--brand-font-mono` | Space Mono | Metrics, code |

Brand feel: premium, confident, editorial, architectural, bridge-metaphor-rich,
high-contrast. Signal Orange is a single-accent rule — avoid using it as body text
or small UI elements on light backgrounds (fails WCAG AA contrast).

## Conventions

- **Editorial content** → `src/data/company.ts`, `src/data/site.ts`, `src/data/stats.ts`
- **Images in content** → absolute paths like `/assets/images/<file>.jpg` (not
  relative paths — this site doesn't use MDX image imports)
- **Component cards** → `src/components/ui/` — one component per card type
- **New sections** → start extracting into `src/components/sections/` (currently empty)
- **No hardcoded colors / fonts** → always `var(--brand-*)`
- **No direct `git commit`** → always through the `conventional-commit` skill

## Known Limitations / Tech Debt

- `src/content/` collections are scaffolded but unused — consider removing or wiring
  them up if the insights section needs long-form articles
- Sections are currently inline inside page files rather than extracted components —
  refactor is tracked in `BACKLOG.md`
- Asset duplication between `client-data/` and `public/assets/` requires manual rsync
  after submodule updates — could be automated in `scripts/generate-tokens.ts` or a new script
