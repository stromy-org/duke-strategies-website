#!/usr/bin/env node
// Hermetic internal-link + asset-integrity check over the built dist/ (WS3.1).
//
// A wider self-publish surface must not be able to ship a broken site. `astro check`
// validates typed data + collection schemas but NOT that every internal <a href> /
// route resolves to a built page and every referenced image/asset exists. This step
// closes that gap. It is hermetic (operates only over dist/, no network) and
// internal-only (external links are never fetched or failed). Runs inside the
// `astro-check` job so the broker's required_check covers it with no MCP change.
import fs from "node:fs";
import path from "node:path";

const distDir = path.resolve("dist");
if (!fs.existsSync(distDir)) {
  console.error("[check:links] dist/ not found — run `npm run build` first.");
  process.exit(2);
}

function walk(dir) {
  const out = [];
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) out.push(...walk(p));
    else out.push(p);
  }
  return out;
}

const allFiles = walk(distDir);
const htmlFiles = allFiles.filter((f) => f.endsWith(".html"));

const isExternal = (url) =>
  /^(https?:)?\/\//.test(url) || /^(mailto:|tel:|data:|javascript:|#)/.test(url);

function resolves(ref) {
  let p = ref.split("#")[0].split("?")[0];
  if (!p.startsWith("/")) return true; // relative/protocol-less — out of scope
  try {
    p = decodeURIComponent(p);
  } catch {
    return false;
  }
  const full = path.join(distDir, p);
  if (path.extname(p)) return fs.existsSync(full); // asset with extension
  // page route → Astro emits <route>/index.html (or <route>.html)
  return (
    fs.existsSync(full) ||
    fs.existsSync(path.join(full, "index.html")) ||
    fs.existsSync(`${full}.html`)
  );
}

const attrRe = /(?:href|src)="([^"]*)"/g;
const srcsetRe = /srcset="([^"]*)"/g;
const dangling = [];

for (const file of htmlFiles) {
  const html = fs.readFileSync(file, "utf8");
  const rel = path.relative(distDir, file);
  const refs = new Set();
  let m;
  while ((m = attrRe.exec(html))) refs.add(m[1]);
  while ((m = srcsetRe.exec(html))) {
    for (const cand of m[1].split(",")) {
      const u = cand.trim().split(/\s+/)[0];
      if (u) refs.add(u);
    }
  }
  for (const ref of refs) {
    if (!ref || isExternal(ref) || !ref.startsWith("/")) continue;
    if (!resolves(ref)) dangling.push(`${rel} → ${ref}`);
  }
}

if (dangling.length) {
  console.error(`[check:links] ${dangling.length} dangling internal link(s)/asset(s):`);
  for (const d of dangling) console.error(`  ${d}`);
  process.exit(1);
}
console.log(
  `[check:links] OK — ${htmlFiles.length} page(s); every internal link + asset resolves in dist/.`,
);
