# AGENTS.md

Self-contained instructions for Codex and other coding agents working on this
repository. These instructions stand alone — do not reference external rule files.

## Project Overview

duke-strategies-website is the **Duke Strategies corporate website** — a static site
built with Astro 6, Tailwind CSS 4, and MDX support. Duke Strategies is a
Netherlands-based strategic communications and public affairs consultancy.

- **Production URL:** https://dukestrategies.com
- **Hosting:** GitHub Pages (workflow at `.github/workflows/deploy.yml`)
- **Languages:** English only (no i18n)
- **Brand archetype:** ruler / luxury

## Repository Structure

```
duke-strategies-website/
├── src/
│   ├── styles/
│   │   ├── brand-tokens.css      ← GENERATED — do not edit
│   │   ├── tokens-semantic.css   ← Hand-written semantic tokens
│   │   └── global.css            ← Tailwind 4 import + base styles
│   ├── lib/
│   │   └── tokens.ts             ← GENERATED — do not edit
│   ├── components/
│   │   ├── layout/               ← Navigation.astro, Footer.astro
│   │   ├── ui/                   ← Card primitives and small UI components
│   │   ├── sections/             ← (currently empty)
│   │   └── content/              ← (currently empty)
│   ├── content/                  ← MDX collections — SCAFFOLDED BUT UNUSED
│   ├── content.config.ts         ← Schemas for insights/pages/authors (empty)
│   ├── data/
│   │   ├── company.ts            ← PRIMARY CONTENT SOURCE
│   │   ├── site.ts               ← Site metadata, nav, contact
│   │   ├── nav.ts                ← Top nav items
│   │   └── stats.ts              ← Homepage stat ribbon
│   ├── layouts/                  ← BaseLayout, PageLayout, ArticleLayout
│   └── pages/                    ← index, who-we-are, what-we-do, duke-academy, insights, contact
├── public/assets/
│   ├── images/                   ← Runtime-served images
│   ├── logos/                    ← Runtime-served logos
│   ├── team/                     ← Team member photos (not synced)
│   └── video/                    ← Hero video
├── scripts/
│   └── generate-tokens.ts        ← client-data charter.json → brand-tokens.css + tokens.ts
├── client-data/                   ← Brand data submodule (charter.json, logos, images)
├── astro.config.mjs
└── package.json
```

## Commands

```bash
npm run dev           # Dev server at http://localhost:4321
npm run build         # Generate tokens + production build → dist/
npm run preview       # Preview the built site locally
npm run tokens        # Regenerate brand tokens from client-data charter.json
npm run check         # Astro TypeScript diagnostics
```

## Critical Architecture Notes

### Editorial content lives in `src/data/company.ts`

Unlike typical Astro sites, Duke's editorial content is NOT in MDX collections.
`src/data/company.ts` exports typed TypeScript arrays:

- `founders` — Co-founders with full bios and contact emails
- `expertPartners` — Senior external experts
- `associates` — Core associate team
- `affiliates` — Affiliate organizations
- `services` — Service offerings (name, description, industries, deliverables)
- `capabilities` — Capability tags with icons
- `academyPrograms` — Duke Academy programs
- `caseStudies` — Case studies with metrics
- `testimonials` — Client testimonials
- `insights` — Insight card entries (links to external or stub content)

Each page imports from this file and renders via card components in
`src/components/ui/`. To edit content, edit this file.

The `src/content/` folders (blog, case-studies, capabilities, insights, authors,
pages) are scaffolded but empty. `src/content.config.ts` wires only `insights`,
`pages`, `authors` — all three collections are currently empty. **Do not add MDX
files there expecting them to render on existing pages.**

### Asset duplication: `client-data/` vs `public/assets/`

Brand images and logos exist in two places:
- `client-data/clients/dukestrategies/{images,logos}/` — from the `client-data`
  git submodule (source of truth)
- `public/assets/{images,logos}/` — what pages reference via `/assets/...` URLs

After a submodule update, runtime copies must be updated:

```bash
rsync -a --delete client-data/clients/dukestrategies/images/ public/assets/images/
rsync -a --delete client-data/clients/dukestrategies/logos/  public/assets/logos/
```

Team photos live **only** in `public/assets/team/` — not part of brand sync.

### Tailwind 4 via Vite plugin

`astro.config.mjs` uses `@tailwindcss/vite`, not PostCSS. `src/styles/global.css`
uses the Tailwind 4 `@import "tailwindcss"` syntax. Tailwind 3 config files do not
apply.

### Brand token pipeline

1. `client-data/clients/dukestrategies/charter.json` is the source of truth (via submodule)
2. `npm run tokens` → `scripts/generate-tokens.ts` reads charter.json → writes
   `src/styles/brand-tokens.css` and `src/lib/tokens.ts`
3. `npm run build` runs `tokens` first, then `astro build`
4. Components reference `var(--brand-primary)`, `var(--brand-font-heading)`, etc.
5. **Never edit `brand-tokens.css` or `tokens.ts` directly.**

## Conventions

- **Content edits** → `src/data/company.ts`, `src/data/site.ts`, `src/data/stats.ts`,
  `src/data/nav.ts`
- **Image references** → absolute paths like `/assets/images/<file>.jpg` (not
  MDX-relative imports — this site doesn't use them)
- **Card components** → one component per card type in `src/components/ui/`
- **New sections** → extract into `src/components/sections/` (currently empty —
  be the first)
- **Colors and fonts** → always `var(--brand-*)` — never hardcode hex values
- **Team photo filenames** → desaturated, `_grijs.jpg` suffix (Dutch for "grey")

## Design System Reference

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
on light backgrounds (fails WCAG AA contrast).

## Commit Standards

This repo uses **Conventional Commits 1.0.0 with gitmoji**.

Format: `<type>(<scope>): <emoji> <subject>`

- **Type** (deterministic priority): `feat` > `fix` > `perf` > `refactor` >
  `build`/`ci`/`chore` > `docs`/`test`/`style`
- **Subject**: imperative mood, starts with uppercase, no trailing period,
  ≤72 chars
- **Body**: explain *why*, not *what*; wrap at 72 chars
- **Footer**: include `Co-Authored-By: Codex <noreply@openai.com>` (or the
  appropriate agent identity) for AI-assisted commits

Common types and emoji:

| Type | Emoji | When |
|---|---|---|
| feat | ✨ | New feature or page |
| fix | 🐛 | Bug fix |
| perf | ⚡ | Performance improvement |
| refactor | ♻️ | Code restructure (no behaviour change) |
| style | 💄 | Visual / CSS change |
| docs | 📝 | Documentation |
| build | 🏗️ | Build config / dependencies |
| ci | 👷 | CI workflow changes |
| chore | 🔧 | Maintenance, tooling |

**Main branch protection:** never commit directly to `main`. Create a feature
branch, commit there, then merge with `--no-ff`.

## Build & Deploy

Production deploys automatically on push to `main` via `.github/workflows/deploy.yml`:
1. Checkout
2. `npm ci`
3. `npm run build`
4. Upload `dist/` as GitHub Pages artifact
5. Deploy to GitHub Pages environment

Node version: 22. Custom domain `dukestrategies.com` configured in repo settings.

Pre-deploy checklist:
1. `npm run build` locally — no errors
2. `npm run preview` — spot-check changed pages
3. If brand refreshed, confirm `npm run tokens` ran
4. If media changed, confirm both `client-data/` and `public/assets/` are in sync
5. Verify `astro.config.mjs` `site:` still matches production domain

## Known Limitations / Tech Debt

- `src/content/` collections scaffolded but unused
- Sections inline in page files rather than extracted components
- Asset duplication between `client-data/` and `public/assets/` requires manual rsync
- Empty `src/components/sections/` and `src/components/content/` directories
