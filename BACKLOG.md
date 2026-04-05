# Backlog — duke-strategies-website

Duke Strategies corporate website (Astro 6 + Tailwind 4 + MDX). Managed via `/backlog` from stromy-org.

ID prefix: **DSW**

---

## In Progress

_No items currently in progress._

---

## Todo

<!--
### [DSW-NNN] <Title in imperative mood>
- **priority**: critical | high | medium | low
- **labels**: <comma-separated tags>
- **created**: YYYY-MM-DD
- **depends-on**: <ID> (optional)

<Description — what and why. Enough context for an agent to execute independently.>

#### Acceptance Criteria
- [ ] <Specific, testable condition>
- [ ] <Another condition>
-->

### [DSW-001] Automate `src/brand/` → `public/assets/` asset sync
- **priority**: medium
- **labels**: tooling, brand, tech-debt
- **created**: 2026-04-05

Brand images and logos are duplicated between `src/brand/{images,logos}/` (the sync destination from the org's `brand-tokens` repo) and `public/assets/{images,logos}/` (what pages reference via runtime URLs). After every brand sync, the runtime copies must be updated manually with rsync. Automate this in `scripts/generate-tokens.ts` or a new `scripts/sync-public-assets.ts`, and wire it into `npm run tokens` (or a new `npm run sync-assets` step invoked by `build`).

#### Acceptance Criteria
- [ ] Running `npm run build` after a brand sync automatically copies new/changed images and logos into `public/assets/`
- [ ] Stale assets removed from `public/assets/` when removed from `src/brand/` (rsync `--delete` semantics)
- [ ] Team photos in `public/assets/team/` are NOT touched by the sync
- [ ] Documented in `CLAUDE.md` and the `website-maintain` skill

### [DSW-002] Decide on MDX content collections — wire up or remove
- **priority**: medium
- **labels**: content, architecture, tech-debt
- **created**: 2026-04-05

`src/content/` contains six empty folders (blog, case-studies, capabilities, insights, authors, pages) and `src/content.config.ts` declares schemas for `insights`, `pages`, `authors`. None of them are used — all editorial content lives in `src/data/company.ts`. This creates confusion for maintainers. Either:

(a) Migrate `insights` (and potentially `caseStudies`, `services`) out of `company.ts` into MDX collections so content can be long-form and authored independently, OR
(b) Remove the unused `src/content/` folders and `src/content.config.ts`.

Recommend (a) if Duke wants real blog / long-form insights; (b) otherwise.

#### Acceptance Criteria
- [ ] Decision recorded in CLAUDE.md
- [ ] Either collections wired to pages OR `src/content/` + `content.config.ts` removed
- [ ] `website-maintain` skill updated to match the chosen architecture

### [DSW-003] Extract inline sections into `src/components/sections/`
- **priority**: low
- **labels**: refactor, components
- **created**: 2026-04-05

Each page in `src/pages/` is 200–650 lines with sections authored inline (Hero, Services grid, Stats ribbon, Case grid, Team grid, Academy programs, Testimonials, CTA). `src/components/sections/` is currently empty. Extract repeating section patterns into reusable components so pages become compositions, not monoliths. Start with Hero, StatsRibbon, ServiceGrid, CaseStudyGrid, TeamGrid, TestimonialBlock, CTABand.

#### Acceptance Criteria
- [ ] At least 5 section components created in `src/components/sections/`
- [ ] Homepage refactored to use the new sections
- [ ] No visual regression (screenshot diff on desktop + mobile)
- [ ] Page files < 120 lines each

### [DSW-004] Add lighthouse / performance budget to CI
- **priority**: low
- **labels**: ci, performance
- **created**: 2026-04-05

The only CI step currently is the Pages deploy workflow. Add a pre-deploy step that runs Lighthouse against the built site and fails the build if Performance, Accessibility, Best Practices, or SEO drops below 90. Helps catch hero-video regressions and image weight creep.

#### Acceptance Criteria
- [ ] `.github/workflows/ci.yml` added with Lighthouse check against `npm run preview`
- [ ] Budget: Perf ≥ 85, A11y ≥ 90, BP ≥ 90, SEO ≥ 90 (adjust after baseline)
- [ ] Runs on PRs, not only on push to main

### [DSW-005] Contact form backend
- **priority**: medium
- **labels**: feature, contact
- **created**: 2026-04-05

`/contact` currently displays office details and email link. Decide whether to add a submission form (Formspree / Netlify Forms / static POST to an endpoint). If yes, implement with spam protection and a confirmation state. If no, simplify the page and remove any placeholder form elements.

#### Acceptance Criteria
- [ ] Decision captured in CLAUDE.md
- [ ] If implemented: form posts successfully, spam protection in place, confirmation UX
- [ ] Privacy notice / GDPR language present if any personal data is collected

---

## Done

_Completed items move to `DONE.md`._
