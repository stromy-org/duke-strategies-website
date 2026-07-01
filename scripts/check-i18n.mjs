#!/usr/bin/env node
// i18n key-integrity check (WS3.2) — makes src/i18n/content/** safe to self-publish.
//
// Moving locale VALUES into the owned home lets a client edit a label freely, but a
// renamed/removed/added KEY is a structural change `astro check` does not catch (a
// missing t() key silently falls back or echoes the key name — not a type error). This
// step asserts the key SHAPE is invariant; it never inspects values, so client copy
// edits never trip it. Runs inside the `astro-check` job (broker required_check covers
// it). No-op when the site has no src/i18n/.
//
// Key tables are read with the TypeScript compiler API (robust against formatting);
// t(...) / ui[lang][...] call sites are collected by lexical scan (keys are plain
// string literals). Supports both post-migration shapes:
//   (A) src/i18n/content/ui.ts exporting `ui = { <base>: {...}, <locale>: {...} }`
//   (B) src/i18n/content/ui.<locale>.ts each exporting a flat key table
import fs from "node:fs";
import path from "node:path";
import ts from "typescript";

const i18nDir = path.resolve("src/i18n");
if (!fs.existsSync(i18nDir)) {
  console.log("[check:i18n] no src/i18n/ — skipped.");
  process.exit(0);
}
const manifestPath = path.join(i18nDir, "ui.keys.json");
if (!fs.existsSync(manifestPath)) {
  console.error("[check:i18n] src/i18n/ui.keys.json missing (required on i18n sites).");
  process.exit(1);
}
const manifest = JSON.parse(fs.readFileSync(manifestPath, "utf8"));
const baseLocale = manifest.base;
const manifestKeys = new Set(manifest.keys);

const parse = (file) =>
  ts.createSourceFile(file, fs.readFileSync(file, "utf8"), ts.ScriptTarget.Latest, true);

function objectKeys(objLiteral) {
  const keys = [];
  for (const prop of objLiteral.properties) {
    if (!ts.isPropertyAssignment(prop)) continue;
    const n = prop.name;
    if (ts.isStringLiteralLike(n) || ts.isIdentifier(n)) keys.push(n.text);
  }
  return keys;
}

const unwrap = (node) => (node && ts.isAsExpression(node) ? node.expression : node);

const localeKeys = {}; // locale -> Set(keys)
const contentDir = path.join(i18nDir, "content");
const singleFile = path.join(contentDir, "ui.ts");

// Shape A: a single `ui = { locale: {...} }` object.
if (fs.existsSync(singleFile)) {
  const sf = parse(singleFile);
  ts.forEachChild(sf, function visit(node) {
    if (ts.isVariableStatement(node)) {
      for (const decl of node.declarationList.declarations) {
        if (ts.isIdentifier(decl.name) && decl.name.text === "ui") {
          const init = unwrap(decl.initializer);
          if (init && ts.isObjectLiteralExpression(init)) {
            for (const prop of init.properties) {
              if (!ts.isPropertyAssignment(prop)) continue;
              const locale = ts.isStringLiteralLike(prop.name) || ts.isIdentifier(prop.name)
                ? prop.name.text
                : null;
              const val = unwrap(prop.initializer);
              if (locale && val && ts.isObjectLiteralExpression(val)) {
                localeKeys[locale] = new Set(objectKeys(val));
              }
            }
          }
        }
      }
    }
    ts.forEachChild(node, visit);
  });
}

// Shape B: ui.<locale>.ts files, each exporting one flat key table.
if (!Object.keys(localeKeys).length && fs.existsSync(contentDir)) {
  for (const f of fs.readdirSync(contentDir)) {
    const mm = f.match(/^ui\.([a-z]{2})\.ts$/);
    if (!mm) continue;
    const sf = parse(path.join(contentDir, f));
    let keys = null;
    ts.forEachChild(sf, function visit(node) {
      if (keys) return;
      if (ts.isVariableStatement(node)) {
        for (const decl of node.declarationList.declarations) {
          const init = unwrap(decl.initializer);
          if (init && ts.isObjectLiteralExpression(init)) keys = objectKeys(init);
        }
      }
      ts.forEachChild(node, visit);
    });
    if (keys) localeKeys[mm[1]] = new Set(keys);
  }
}

const errors = [];
const baseKeys = localeKeys[baseLocale];
if (!baseKeys) {
  errors.push(`base locale "${baseLocale}" key table not found under src/i18n/content/`);
} else {
  for (const k of baseKeys)
    if (!manifestKeys.has(k))
      errors.push(`base key "${k}" is not in ui.keys.json (key added without a manifest update)`);
  for (const k of manifestKeys)
    if (!baseKeys.has(k))
      errors.push(`ui.keys.json key "${k}" is missing from the base locale (key removed/renamed)`);
  for (const [loc, ks] of Object.entries(localeKeys)) {
    if (loc === baseLocale) continue;
    for (const k of ks)
      if (!baseKeys.has(k)) errors.push(`locale "${loc}" key "${k}" is not in the base key set`);
  }
}

// Call-site references: every t("key") / ui[...]["key"] must exist in the base table.
const refDirs = ["src/components", "src/layouts", "src/pages"]
  .map((d) => path.resolve(d))
  .filter(fs.existsSync);
const tRe = /\bt\(\s*["'`]([^"'`]+)["'`]\s*\)/g;
const uiRe = /\bui\s*\[[^\]]+\]\s*\[\s*["'`]([^"'`]+)["'`]\s*\]/g;

function walkRefs(dir) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walkRefs(p);
    else if (/\.(astro|ts|tsx|js|jsx)$/.test(e.name)) {
      const text = fs.readFileSync(p, "utf8");
      const rel = path.relative(process.cwd(), p);
      for (const re of [tRe, uiRe]) {
        re.lastIndex = 0;
        let m;
        while ((m = re.exec(text))) {
          if (baseKeys && !baseKeys.has(m[1]))
            errors.push(`${rel}: t("${m[1]}") references a key not in the base table (dangling lookup)`);
        }
      }
    }
  }
}
for (const d of refDirs) walkRefs(d);

if (errors.length) {
  console.error(`[check:i18n] ${errors.length} key-integrity error(s):`);
  for (const e of [...new Set(errors)]) console.error(`  ${e}`);
  process.exit(1);
}
console.log(
  `[check:i18n] OK — base "${baseLocale}" matches ui.keys.json; non-base locales are subsets; no dangling t() lookups.`,
);
