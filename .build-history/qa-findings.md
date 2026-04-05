# Duke Strategies QA Findings

Date: 2026-04-05
Reviewer: Codex via `website-builder`

## Scope

- Reviewed the Astro site served from `clients/duke-strategies/duke-strategies-website/`
- Captured desktop screenshots to `workspace/dukestrategies/screenshots/desktop/`
- Captured mobile screenshots to `workspace/dukestrategies/screenshots/mobile/`
- Compared against `workspace/dukestrategies/reference/flat-html/`

## Result

Visual parity is strong enough to proceed. No substantive layout regressions, typography failures, or mobile breakpoints requiring another code pass were found in the screenshot review.

## Accepted Differences

- None requiring content exceptions after the follow-up canonical data update.

## Canonical Contact Data

- Public contact email is `mail@dukestrategies.eu`.
- This was confirmed directly by the user after the initial QA pass.
- Structured profile data, website data, and mirrored brand artifacts were updated to match.

## Contact UX Decision

- The hosted-form approach was dropped.
- The contact page now uses direct mailto actions with prefilled subject lines and starter copy.
- Rationale: simpler UX, no external dependency, and fully compatible with GitHub Pages.

## Repository Decision

- Keep `workspace/dukestrategies/reference/flat-html/` for now.
- Rationale: it is still useful as the approved visual baseline and audit trail until deployment/handoff is complete.
