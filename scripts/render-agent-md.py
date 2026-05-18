#!/usr/bin/env python3
"""Generate CLAUDE.md and GEMINI.md from a repo's canonical AGENTS.md.

AGENTS.md is the authored source of truth (cross-vendor standard, Linux Foundation
AAIF, Dec 2025). Claude Code as of May 2026 does not natively read AGENTS.md and
requires CLAUDE.md; we generate it deterministically rather than symlinking
(symlinks banned org-wide for cross-repo state).

Optional per-agent overrides:
    .agent-overrides/claude.md    appended to generated CLAUDE.md
    .agent-overrides/gemini.md    appended to generated GEMINI.md

Usage:
    render-agent-md.py [--repo PATH] [--check] [--dry-run]

Run from any repo containing AGENTS.md, or pass --repo.
"""

from __future__ import annotations

import argparse
import sys
from pathlib import Path

GENERATED_HEADER = """<!--
  GENERATED FILE — DO NOT EDIT.
  Source of truth: AGENTS.md (cross-vendor standard).
  Override file:   .agent-overrides/{agent}.md (optional, appended below)
  Regenerate with: scripts/render-agent-md.py
-->

"""


def build_output(agents_body: str, agent: str, override: str | None) -> str:
    header = GENERATED_HEADER.format(agent=agent)
    body = agents_body.rstrip() + "\n"
    if override:
        body += "\n---\n\n## " + agent.capitalize() + "-specific overrides\n\n"
        body += override.rstrip() + "\n"
    return header + body


def render(repo: Path, *, check: bool, dry_run: bool) -> int:
    agents_md = repo / "AGENTS.md"
    if not agents_md.is_file():
        print(f"error: {agents_md} not found", file=sys.stderr)
        return 1

    agents_body = agents_md.read_text(encoding="utf-8")
    overrides_dir = repo / ".agent-overrides"

    targets = [("claude", repo / "CLAUDE.md"), ("gemini", repo / "GEMINI.md")]
    drift = 0

    for agent, out_path in targets:
        override_path = overrides_dir / f"{agent}.md"
        override = override_path.read_text(encoding="utf-8") if override_path.is_file() else None
        expected = build_output(agents_body, agent, override)

        if check:
            current = out_path.read_text(encoding="utf-8") if out_path.is_file() else ""
            if current != expected:
                print(f"drift: {out_path.relative_to(repo)}", file=sys.stderr)
                drift += 1
            continue

        if dry_run:
            print(f"would write: {out_path.relative_to(repo)} ({len(expected)} bytes)")
            continue

        out_path.write_text(expected, encoding="utf-8")
        print(f"wrote: {out_path.relative_to(repo)}")

    if check:
        if drift:
            print(f"{drift} file(s) out of date — run scripts/render-agent-md.py", file=sys.stderr)
            return 1
        print("CLAUDE.md and GEMINI.md are up to date with AGENTS.md")
    return 0


def main() -> int:
    p = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    p.add_argument("--repo", type=Path, default=Path.cwd())
    g = p.add_mutually_exclusive_group()
    g.add_argument("--check", action="store_true", help="exit 1 if drift detected")
    g.add_argument("--dry-run", action="store_true")
    args = p.parse_args()
    return render(args.repo.resolve(), check=args.check, dry_run=args.dry_run)


if __name__ == "__main__":
    raise SystemExit(main())
