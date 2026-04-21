/**
 * JSON-LD / structured data helpers.
 *
 * Usage:
 *   import { organizationJsonLd, articleJsonLd, breadcrumbJsonLd, absoluteUrl } from '../lib/seo';
 *
 * All helpers return plain objects. Stringify with `JSON.stringify(...)` inside
 * a `<script type="application/ld+json" set:html={...} />` tag.
 */

export const SITE_URL = 'https://databerganalytics.nl';
export const SITE_NAME = 'databerganalytics';
export const FOUNDER_NAME = 'Ahmet Karabaş';
export const FOUNDER_URL = 'https://linkedin.com/in/ahmetkarabas3917';
export const CONTACT_EMAIL = 'ahmetkarabasdtengineer@gmail.com';

export function absoluteUrl(pathname: string): string {
  const p = pathname.startsWith('/') ? pathname : `/${pathname}`;
  return `${SITE_URL}${p}`;
}

/**
 * Map a URL pathname to its generated OG image.
 * Keep in sync with `scripts/build-og.mjs`'s `pages[].slug` names.
 */
export function ogImageForPath(pathname: string): string {
  const clean = pathname.replace(/^\/+|\/+$/g, '');
  if (clean === '') return '/og/home.png';
  if (clean === 'nl') return '/og/nl-home.png';
  return `/og/${clean.replace(/\//g, '-')}.png`;
}

export function organizationJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    '@id': `${SITE_URL}/#organization`,
    name: SITE_NAME,
    url: SITE_URL,
    email: CONTACT_EMAIL,
    description:
      'Business and tech optimization. We find the drag in your operations — slow processes, expensive cloud bills, siloed data, manual work that should not be manual — and remove it.',
    founder: {
      '@type': 'Person',
      name: FOUNDER_NAME,
      jobTitle: 'Data engineer and optimization consultant',
      sameAs: [FOUNDER_URL],
    },
    sameAs: [FOUNDER_URL],
    areaServed: [
      { '@type': 'Country', name: 'Netherlands' },
      { '@type': 'Place', name: 'EMEA (remote)' },
    ],
    knowsAbout: [
      'Cloud cost optimization',
      'Data pipelines and warehousing',
      'Process automation',
      'Systems strategy',
      'Azure Data Services',
      'T-SQL performance tuning',
      'SSIS modernization',
    ],
  };
}

interface ArticleInput {
  title: string;
  description: string;
  publishedAt: Date;
  url: string;
  locale: 'en' | 'nl';
}

export function articleJsonLd(input: ArticleInput) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: input.title,
    description: input.description,
    datePublished: input.publishedAt.toISOString(),
    inLanguage: input.locale === 'nl' ? 'nl-NL' : 'en',
    mainEntityOfPage: { '@type': 'WebPage', '@id': input.url },
    author: {
      '@type': 'Person',
      name: FOUNDER_NAME,
      url: `${SITE_URL}/about`,
    },
    publisher: { '@id': `${SITE_URL}/#organization` },
  };
}

interface CreativeWorkInput {
  title: string;
  description: string;
  publishedAt?: Date;
  url: string;
  locale: 'en' | 'nl';
}

export function caseStudyJsonLd(input: CreativeWorkInput) {
  return {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: input.title,
    description: input.description,
    ...(input.publishedAt ? { datePublished: input.publishedAt.toISOString() } : {}),
    inLanguage: input.locale === 'nl' ? 'nl-NL' : 'en',
    url: input.url,
    creator: { '@id': `${SITE_URL}/#organization` },
  };
}

interface ServiceInput {
  name: string;
  description: string;
  url: string;
  locale: 'en' | 'nl';
}

export function serviceJsonLd(input: ServiceInput) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: input.name,
    description: input.description,
    url: input.url,
    inLanguage: input.locale === 'nl' ? 'nl-NL' : 'en',
    provider: { '@id': `${SITE_URL}/#organization` },
  };
}

interface BreadcrumbItem {
  name: string;
  url: string;
}

export function breadcrumbJsonLd(items: BreadcrumbItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  };
}
