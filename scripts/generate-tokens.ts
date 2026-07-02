import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { resolve, dirname } from 'node:path';

const ROOT = resolve(dirname(new URL(import.meta.url).pathname), '..');
const charter = JSON.parse(readFileSync(resolve(ROOT, 'client-data/clients/dukestrategies/charter.json'), 'utf-8'));

// --- CSS custom properties (Tier 1 — brand primitives) ---
const cssLines: string[] = ['/* Auto-generated from charter.json — do not edit manually */', ':root {'];

// Colors
for (const [key, value] of Object.entries(charter.colors as Record<string, string>)) {
  // Skip annotation/role keys (e.g. "_roles") — metadata, not emittable colors.
  if (key.startsWith('_')) continue;
  // Reject non-color values so prose/annotations in charter.colors FAIL the build
  // loudly instead of silently emitting invalid CSS that breaks the Tailwind build.
  // Allow hex, rgb()/hsl()/oklch() functional notation, and var() refs.
  if (!/^#[0-9a-fA-F]{3,8}$|^(rgb|hsl|oklch|var)\(/.test(value)) {
    throw new Error(
      `charter.colors.${key} is not a color value (got ${JSON.stringify(value)}) — ` +
      `move annotations/prose out of charter.colors, or use hex / rgb() / hsl() / oklch() / var() notation.`
    );
  }
  cssLines.push(`  --brand-${kebab(key)}: ${value};`);
}

// Fonts
for (const [role, font] of Object.entries(charter.fonts as Record<string, { family: string; fallback: string; weight: string }>)) {
  cssLines.push(`  --brand-font-${role}: '${font.family}', ${font.fallback};`);
  cssLines.push(`  --brand-font-${role}-weight: ${font.weight};`);
}

// Visual grammar (Component W — website token bridge)
// Emits explicit CSS custom properties authored per grammar dimension under
// expression.visual_grammar.<dim>.cssTokens { "--name": "value" }. Reference,
// never bind: a charter with no expression.visual_grammar — or a dimension with
// no cssTokens map — emits nothing extra (colors + fonts only), so a brand that
// hasn't captured grammar degrades cleanly. Names are authored verbatim (already
// `--`-prefixed by the brand author, like a colour role), so they are emitted
// as-is rather than re-prefixed, and validated to fail the build loudly on a
// malformed key instead of writing broken CSS.
const grammar = (charter.expression?.visual_grammar ?? {}) as Record<
  string,
  { cssTokens?: Record<string, string> }
>;
for (const [dim, spec] of Object.entries(grammar)) {
  if (!spec || typeof spec !== 'object' || !spec.cssTokens) continue;
  for (const [name, value] of Object.entries(spec.cssTokens)) {
    if (!name.startsWith('--')) {
      throw new Error(
        `expression.visual_grammar.${dim}.cssTokens key "${name}" must be a CSS ` +
        `custom property starting with "--" (got ${JSON.stringify(name)}).`
      );
    }
    cssLines.push(`  ${name}: ${value};`);
  }
}

cssLines.push('}');

const cssOut = resolve(ROOT, 'src/styles/brand-tokens.css');
mkdirSync(dirname(cssOut), { recursive: true });
writeFileSync(cssOut, cssLines.join('\n') + '\n');

// --- TypeScript module ---
const tsLines: string[] = [
  '/* Auto-generated from charter.json — do not edit manually */',
  '',
  `export const colors = ${JSON.stringify(charter.colors, null, 2)} as const;`,
  '',
  'export const fonts = {',
];

for (const [role, font] of Object.entries(charter.fonts as Record<string, { family: string; fallback: string; weight: string }>)) {
  tsLines.push(`  ${role}: { family: "'${font.family}', ${font.fallback}", weight: "${font.weight}" },`);
}
tsLines.push('} as const;');

const tsOut = resolve(ROOT, 'src/lib/tokens.ts');
mkdirSync(dirname(tsOut), { recursive: true });
writeFileSync(tsOut, tsLines.join('\n') + '\n');

console.log('Generated brand-tokens.css and tokens.ts');

function kebab(s: string): string {
  return s.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
}
