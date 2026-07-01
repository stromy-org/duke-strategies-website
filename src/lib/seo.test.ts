import { describe, it, expect } from 'vitest';
import {
  absoluteUrl,
  identityId,
  identitySchema,
  personSchema,
  webSiteSchema,
  articleSchema,
  breadcrumbSchema,
  serializeJsonLd,
  imageObject,
  localBusinessSchema,
} from './seo';

const baseSite = {
  name: 'Acme Corp',
  url: 'https://example.com',
  description: 'A test site',
  locale: 'en',
  entityType: 'Organization' as const,
  logo: '/logo.svg',
  defaultOgImage: '/og.png',
  twitterHandle: '@acme',
  social: { linkedin: 'https://linkedin.com/company/acme' },
};

// ---------------------------------------------------------------------------
// absoluteUrl
// ---------------------------------------------------------------------------
describe('absoluteUrl', () => {
  it('returns the root URL for "/"', () => {
    expect(absoluteUrl('/', 'https://example.com')).toBe('https://example.com/');
  });
  it('handles paths without a leading slash', () => {
    expect(absoluteUrl('about', 'https://example.com')).toBe('https://example.com/about');
  });
  it('strips trailing slashes on non-root paths', () => {
    expect(absoluteUrl('/about/', 'https://example.com')).toBe('https://example.com/about');
  });
  it('passes through absolute URLs unchanged', () => {
    expect(absoluteUrl('https://other.com/page', 'https://example.com')).toBe('https://other.com/page');
  });
  it('normalises base URL with trailing slash', () => {
    expect(absoluteUrl('/about', 'https://example.com/')).toBe('https://example.com/about');
  });
  it('returns root for empty path', () => {
    expect(absoluteUrl('', 'https://example.com')).toBe('https://example.com/');
  });
});

// ---------------------------------------------------------------------------
// identityId
// ---------------------------------------------------------------------------
describe('identityId', () => {
  it('produces a stable fragment @id', () => {
    expect(identityId('https://example.com')).toBe('https://example.com/#identity');
  });
  it('strips trailing slash from base URL', () => {
    expect(identityId('https://example.com/')).toBe('https://example.com/#identity');
  });
});

// ---------------------------------------------------------------------------
// identitySchema
// ---------------------------------------------------------------------------
describe('identitySchema', () => {
  it('discriminates Organization entity type', () => {
    const schema = identitySchema(baseSite);
    expect(schema['@type']).toBe('Organization');
    expect(schema['@id']).toBe('https://example.com/#identity');
    expect(schema['name']).toBe('Acme Corp');
    expect(schema['url']).toBe('https://example.com/');
  });
  it('includes logo as ImageObject', () => {
    const schema = identitySchema(baseSite);
    const logo = schema['logo'] as { '@type': string; url: string };
    expect(logo['@type']).toBe('ImageObject');
    expect(logo['url']).toBe('https://example.com/logo.svg');
  });
  it('builds sameAs from social linkedin + twitterHandle fallback', () => {
    const schema = identitySchema(baseSite);
    const sameAs = schema['sameAs'] as string[];
    expect(sameAs).toContain('https://linkedin.com/company/acme');
    expect(sameAs.some((u) => u.includes('twitter.com/acme'))).toBe(true);
  });
  it('omits sameAs when no social info', () => {
    const schema = identitySchema({ name: 'Bare', url: 'https://bare.com' });
    expect(schema['sameAs']).toBeUndefined();
  });
  it('defaults to Organization when entityType is absent', () => {
    const schema = identitySchema({ name: 'Bare', url: 'https://bare.com' });
    expect(schema['@type']).toBe('Organization');
  });
  it('discriminates ProfessionalService type', () => {
    const schema = identitySchema({ ...baseSite, entityType: 'ProfessionalService' as const });
    expect(schema['@type']).toBe('ProfessionalService');
  });
  it('discriminates LocalBusiness type', () => {
    const schema = identitySchema({ ...baseSite, entityType: 'LocalBusiness' as const });
    expect(schema['@type']).toBe('LocalBusiness');
  });
  it('omits logo when not set', () => {
    const schema = identitySchema({ name: 'No Logo', url: 'https://nologosite.com' });
    expect(schema['logo']).toBeUndefined();
  });
});

// ---------------------------------------------------------------------------
// personSchema
// ---------------------------------------------------------------------------
describe('personSchema', () => {
  it('emits Person type and stable @id', () => {
    const schema = personSchema(baseSite);
    expect(schema['@type']).toBe('Person');
    expect(schema['@id']).toBe('https://example.com/#identity');
  });
  it('includes jobTitle when provided', () => {
    const schema = personSchema(baseSite, { jobTitle: 'CEO' });
    expect(schema['jobTitle']).toBe('CEO');
  });
  it('includes image as ImageObject when provided', () => {
    const schema = personSchema(baseSite, { image: '/photo.jpg' });
    const img = schema['image'] as { '@type': string };
    expect(img['@type']).toBe('ImageObject');
  });
  it('omits legalName (Organization-specific field)', () => {
    const schema = personSchema(baseSite);
    expect(schema['legalName']).toBeUndefined();
  });
});

// ---------------------------------------------------------------------------
// localBusinessSchema
// ---------------------------------------------------------------------------
describe('localBusinessSchema', () => {
  it('emits LocalBusiness @type', () => {
    const schema = localBusinessSchema(baseSite);
    expect(schema['@type']).toBe('LocalBusiness');
  });
  it('includes telephone when provided', () => {
    const schema = localBusinessSchema(baseSite, { telephone: '+32 2 123 4567' });
    expect(schema['telephone']).toBe('+32 2 123 4567');
  });
});

// ---------------------------------------------------------------------------
// webSiteSchema
// ---------------------------------------------------------------------------
describe('webSiteSchema', () => {
  it('emits WebSite @type and stable @id', () => {
    const schema = webSiteSchema(baseSite);
    expect(schema['@type']).toBe('WebSite');
    expect(schema['@id']).toBe('https://example.com/#website');
  });
  it('references identity via publisher @id', () => {
    const schema = webSiteSchema(baseSite);
    const publisher = schema['publisher'] as { '@id': string };
    expect(publisher['@id']).toBe('https://example.com/#identity');
  });
  it('does NOT emit SearchAction (retired 2024-11-21)', () => {
    const schema = webSiteSchema(baseSite);
    expect(schema['potentialAction']).toBeUndefined();
  });
  it('includes description when site has one', () => {
    const schema = webSiteSchema(baseSite);
    expect(schema['description']).toBe('A test site');
  });
  it('omits description when absent', () => {
    const schema = webSiteSchema({ name: 'Bare', url: 'https://bare.com' });
    expect(schema['description']).toBeUndefined();
  });
});

// ---------------------------------------------------------------------------
// articleSchema
// ---------------------------------------------------------------------------
describe('articleSchema', () => {
  const input = {
    title: 'My Post',
    description: 'About something',
    datePublished: '2026-01-01',
    url: '/blog/my-post',
  };

  it('emits BlogPosting by default', () => {
    const schema = articleSchema(baseSite, input);
    expect(schema['@type']).toBe('BlogPosting');
  });
  it('emits Article when explicitly set', () => {
    const schema = articleSchema(baseSite, { ...input, type: 'Article' });
    expect(schema['@type']).toBe('Article');
  });
  it('uses datePublished as dateModified fallback', () => {
    const schema = articleSchema(baseSite, input);
    expect(schema['dateModified']).toBe('2026-01-01');
  });
  it('uses explicit dateModified when provided', () => {
    const schema = articleSchema(baseSite, { ...input, dateModified: '2026-06-01' });
    expect(schema['dateModified']).toBe('2026-06-01');
  });
  it('emits publisher @id for Organization sites', () => {
    const schema = articleSchema(baseSite, input);
    const publisher = schema['publisher'] as { '@id': string };
    expect(publisher['@id']).toBe('https://example.com/#identity');
  });
  it('omits publisher @id for Person sites', () => {
    const schema = articleSchema({ ...baseSite, entityType: 'Person' as const }, input);
    expect(schema['publisher']).toBeUndefined();
  });
  it('falls back to defaultOgImage when no image provided', () => {
    const schema = articleSchema(baseSite, input);
    const img = schema['image'] as { '@type': string; url: string };
    expect(img['@type']).toBe('ImageObject');
    expect(img['url']).toContain('/og.png');
  });
  it('includes tags as keywords when provided', () => {
    const schema = articleSchema(baseSite, { ...input, tags: ['ai', 'tech'] });
    expect(schema['keywords']).toEqual(['ai', 'tech']);
  });
  it('includes articleSection when provided', () => {
    const schema = articleSchema(baseSite, { ...input, section: 'Insights' });
    expect(schema['articleSection']).toBe('Insights');
  });
  it('wires mainEntityOfPage to the page URL', () => {
    const schema = articleSchema(baseSite, input);
    const mep = schema['mainEntityOfPage'] as { '@id': string };
    expect(mep['@id']).toBe('https://example.com/blog/my-post');
  });
});

// ---------------------------------------------------------------------------
// breadcrumbSchema
// ---------------------------------------------------------------------------
describe('breadcrumbSchema', () => {
  it('emits BreadcrumbList with correct positions', () => {
    const schema = breadcrumbSchema(
      [
        { name: 'Home', url: '/' },
        { name: 'Blog', url: '/blog' },
        { name: 'Post' },
      ],
      'https://example.com',
    );
    expect(schema['@type']).toBe('BreadcrumbList');
    const items = schema['itemListElement'] as { '@type': string; position: number; name: string; item?: string }[];
    expect(items).toHaveLength(3);
    expect(items[0].position).toBe(1);
    expect(items[1].position).toBe(2);
    expect(items[2].position).toBe(3);
  });
  it('includes item URL for non-current pages', () => {
    const schema = breadcrumbSchema([{ name: 'Home', url: '/' }], 'https://example.com');
    const items = schema['itemListElement'] as { item?: string }[];
    expect(items[0].item).toBe('https://example.com/');
  });
  it('omits item on the current (last) page when url is absent', () => {
    const schema = breadcrumbSchema(
      [{ name: 'Home', url: '/' }, { name: 'Current' }],
      'https://example.com',
    );
    const items = schema['itemListElement'] as { item?: string }[];
    expect(items[1].item).toBeUndefined();
  });
});

// ---------------------------------------------------------------------------
// serializeJsonLd
// ---------------------------------------------------------------------------
describe('serializeJsonLd', () => {
  it('escapes < to \\u003c to prevent </script> breakout', () => {
    const result = serializeJsonLd({ title: 'A </script> attack' });
    expect(result).not.toContain('</script>');
    expect(result).toContain('\\u003c/script>');
  });
  it('serializes a plain object to valid JSON (round-trip)', () => {
    const obj = { '@type': 'Thing', name: 'Test' };
    expect(JSON.parse(serializeJsonLd(obj))).toEqual(obj);
  });
  it('serializes an array of objects', () => {
    const arr = [{ '@type': 'A' }, { '@type': 'B' }];
    const parsed = JSON.parse(serializeJsonLd(arr));
    expect(Array.isArray(parsed)).toBe(true);
    expect(parsed).toHaveLength(2);
  });
});

// ---------------------------------------------------------------------------
// imageObject
// ---------------------------------------------------------------------------
describe('imageObject', () => {
  it('wraps a path in an ImageObject with an absolute URL', () => {
    const img = imageObject('/images/photo.jpg', 'https://example.com');
    expect(img['@type']).toBe('ImageObject');
    expect(img['url']).toBe('https://example.com/images/photo.jpg');
  });
  it('preserves an already-absolute URL', () => {
    const img = imageObject('https://cdn.example.com/photo.jpg', 'https://example.com');
    expect(img['url']).toBe('https://cdn.example.com/photo.jpg');
  });
});
