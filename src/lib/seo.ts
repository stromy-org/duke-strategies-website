/**
 * Brand-aware schema.org JSON-LD builders + canonical-URL helpers.
 *
 * Pure functions only — no Astro imports — so they are unit-testable with a
 * fixture `site` object. The rendered `src/data/site.ts` satisfies `SeoSite`,
 * but these helpers never import it directly (decoupled for testability).
 *
 * Identity + WebSite nodes belong on the homepage (or one explicit
 * organization/about page), not duplicated on every page (Google guidance).
 */

export interface SeoSiteSocial {
  twitter?: string;
  linkedin?: string;
  github?: string;
  youtube?: string;
  instagram?: string;
}

export type EntityType =
  | 'Organization'
  | 'ProfessionalService'
  | 'LocalBusiness'
  | 'Person';

export interface SeoSite {
  name: string;
  url: string;
  description?: string;
  locale?: string;
  entityType?: EntityType;
  logo?: string;
  defaultOgImage?: string;
  twitterHandle?: string;
  social?: SeoSiteSocial;
}

export type JsonLd = Record<string, unknown>;

/**
 * Serialize a schema (or @graph document) to an injection-safe JSON-LD string.
 * Escaping `<` to its unicode form is REQUIRED: a raw `</script>` inside any
 * content-derived string would otherwise break out of the `<script>` tag.
 */
export function serializeJsonLd(schema: object | object[]): string {
  return JSON.stringify(schema).replace(/</g, "\\u003c");
}

const ORG_TYPES = new Set<EntityType>([
  'Organization',
  'ProfessionalService',
  'LocalBusiness',
]);

/** Strip trailing slashes from a base URL. */
function trimBase(siteUrl: string): string {
  return siteUrl.replace(/\/+$/, '');
}

/**
 * Join a site base URL and a path into one absolute, well-formed URL.
 * Collapses duplicate slashes and drops a trailing slash on non-root paths,
 * matching the kit's pinned `trailingSlash: 'never'` / `build.format: 'file'`
 * convention so canonical, OG, and sitemap URLs all agree.
 */
export function absoluteUrl(path: string, siteUrl: string): string {
  const base = trimBase(siteUrl);
  if (!path || path === '/') return `${base}/`;
  // Already absolute? return as-is.
  if (/^https?:\/\//i.test(path)) return path;
  const clean = `/${path.replace(/^\/+/, '').replace(/\/+$/, '')}`;
  return `${base}${clean}`;
}

/** The stable identity node @id used by every graph that references it. */
export function identityId(siteUrl: string): string {
  return `${trimBase(siteUrl)}/#identity`;
}

/** Build a non-empty sameAs array from social URLs + the twitter handle. */
function sameAs(site: SeoSite): string[] {
  const out: string[] = [];
  const s = site.social ?? {};
  for (const v of [s.linkedin, s.github, s.youtube, s.instagram]) {
    if (v) out.push(v);
  }
  if (s.twitter) out.push(s.twitter);
  else if (site.twitterHandle) {
    out.push(`https://twitter.com/${site.twitterHandle.replace(/^@/, '')}`);
  }
  return out;
}

/** Wrap an image path in a crawlable ImageObject (never a bare string). */
export function imageObject(url: string, siteUrl: string): JsonLd {
  return { '@type': 'ImageObject', url: absoluteUrl(url, siteUrl) };
}

/**
 * Identity graph node: an Organization subtype or a Person, with a stable
 * `@id`, crawlable logo, and non-empty `sameAs` (omitted when empty).
 */
export function identitySchema(site: SeoSite): JsonLd {
  const type =
    site.entityType && ORG_TYPES.has(site.entityType)
      ? site.entityType
      : 'Organization';
  const node: JsonLd = {
    '@context': 'https://schema.org',
    '@type': type,
    '@id': identityId(site.url),
    name: site.name,
    url: absoluteUrl('/', site.url),
  };
  if (site.logo) node.logo = imageObject(site.logo, site.url);
  const sa = sameAs(site);
  if (sa.length) node.sameAs = sa;
  return node;
}

/** Person identity — must not be forced through the Organization helper. */
export function personSchema(
  site: SeoSite,
  extra: { jobTitle?: string; image?: string } = {},
): JsonLd {
  const node: JsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': identityId(site.url),
    name: site.name,
    url: absoluteUrl('/', site.url),
  };
  if (extra.jobTitle) node.jobTitle = extra.jobTitle;
  if (extra.image) node.image = imageObject(extra.image, site.url);
  const sa = sameAs(site);
  if (sa.length) node.sameAs = sa;
  return node;
}

/** LocalBusiness identity with type-specific fields. */
export function localBusinessSchema(
  site: SeoSite,
  extra: { telephone?: string; address?: JsonLd; priceRange?: string } = {},
): JsonLd {
  const node = identitySchema({ ...site, entityType: 'LocalBusiness' });
  if (extra.telephone) node.telephone = extra.telephone;
  if (extra.address) node.address = extra.address;
  if (extra.priceRange) node.priceRange = extra.priceRange;
  return node;
}

/**
 * WebSite node with a stable `@id` and a publisher reference to the identity.
 * No `SearchAction`: Google retired the sitelinks search box on 2024-11-21.
 */
export function webSiteSchema(site: SeoSite): JsonLd {
  const node: JsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${trimBase(site.url)}/#website`,
    url: absoluteUrl('/', site.url),
    name: site.name,
    publisher: { '@id': identityId(site.url) },
  };
  if (site.description) node.description = site.description;
  return node;
}

export interface ArticleInput {
  title: string;
  description?: string;
  image?: string;
  datePublished: string;
  dateModified?: string;
  author?: string;
  url: string;
  section?: string;
  tags?: string[];
  type?: 'Article' | 'BlogPosting';
}

/**
 * Article/BlogPosting with ImageObject, author Person, an organization
 * publisher `@id` (omitted on Person sites), and mainEntityOfPage.
 */
export function articleSchema(site: SeoSite, a: ArticleInput): JsonLd {
  const img = a.image ?? site.defaultOgImage;
  const node: JsonLd = {
    '@context': 'https://schema.org',
    '@type': a.type ?? 'BlogPosting',
    headline: a.title,
    datePublished: a.datePublished,
    dateModified: a.dateModified ?? a.datePublished,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': absoluteUrl(a.url, site.url),
    },
    url: absoluteUrl(a.url, site.url),
  };
  if (a.description) node.description = a.description;
  if (img) node.image = imageObject(img, site.url);
  if (a.author) node.author = { '@type': 'Person', name: a.author };
  // Publisher only when the site has an organization identity (not a Person).
  if (!site.entityType || ORG_TYPES.has(site.entityType)) {
    node.publisher = { '@id': identityId(site.url) };
  }
  if (a.section) node.articleSection = a.section;
  if (a.tags?.length) node.keywords = a.tags;
  return node;
}

export interface BreadcrumbItem {
  name: string;
  url?: string;
}

/** BreadcrumbList — `item` is omitted on the current (last) page. */
export function breadcrumbSchema(
  items: BreadcrumbItem[],
  siteUrl: string,
): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((it, i) => {
      const el: JsonLd = {
        '@type': 'ListItem',
        position: i + 1,
        name: it.name,
      };
      if (it.url) el.item = absoluteUrl(it.url, siteUrl);
      return el;
    }),
  };
}
