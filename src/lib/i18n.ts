// TODO(review-nl): all Dutch strings below are written in a B2B-formal "u" register.
// A native-speaker read-through is advised before launch. Flagged by the user as
// "use dutch style" (2026-04-21) — voice target is warm + quietly authoritative.

export const LOCALES = ['en', 'nl'] as const;
export type Locale = (typeof LOCALES)[number];

export const DEFAULT_LOCALE: Locale = 'en';

/* ---------------------------------------------------------------------------
 * Path routing helpers
 * ------------------------------------------------------------------------- */

export function getLocaleFromPath(pathname: string): Locale {
  return pathname === '/nl' || pathname.startsWith('/nl/') ? 'nl' : 'en';
}

/** Translated path segments per locale. Keys are the EN segment (source of truth). */
const PATH_TRANSLATIONS: Record<string, Record<Locale, string>> = {
  services: { en: 'services', nl: 'diensten' },
  work: { en: 'work', nl: 'cases' },
  about: { en: 'about', nl: 'over-ons' },
  contact: { en: 'contact', nl: 'contact' },
  insights: { en: 'insights', nl: 'insights' },
};

/** Map a non-locale-prefixed path to its locale equivalent. Preserves trailing slugs. */
export function translatePath(path: string, locale: Locale): string {
  if (path === '/' || path === '') return locale === 'en' ? '/' : '/nl/';
  const parts = path.replace(/^\/+/, '').split('/');
  const first = parts[0];
  const translated = PATH_TRANSLATIONS[first]?.[locale] ?? first;
  parts[0] = translated;
  const joined = '/' + parts.join('/');
  return locale === 'en' ? joined : '/nl' + joined;
}

/** Reverse a localized path to its EN canonical form. */
export function detranslatePath(pathname: string): string {
  const stripped = stripLocale(pathname);
  if (stripped === '/') return '/';
  const parts = stripped.replace(/^\/+/, '').split('/');
  const first = parts[0];
  // Find EN key whose NL value matches the current first segment.
  const enKey =
    Object.entries(PATH_TRANSLATIONS).find(([, map]) => map.nl === first)?.[0] ?? first;
  parts[0] = enKey;
  return '/' + parts.join('/');
}

export function stripLocale(pathname: string): string {
  if (pathname === '/nl') return '/';
  if (pathname.startsWith('/nl/')) return pathname.slice(3) || '/';
  return pathname || '/';
}

export function alternateLocaleUrl(pathname: string): string {
  const current = getLocaleFromPath(pathname);
  const other: Locale = current === 'en' ? 'nl' : 'en';
  // De-translate to canonical EN shape, then re-translate to target locale.
  const canonical = detranslatePath(pathname);
  return translatePath(canonical, other);
}

export function localePrefix(locale: Locale): string {
  return locale === 'en' ? '' : '/nl';
}

/* ---------------------------------------------------------------------------
 * Labels
 * ------------------------------------------------------------------------- */

interface LabelSet {
  // Nav + footer
  skipToContent: string;
  navServices: string;
  navWork: string;
  navAbout: string;
  navContact: string;
  navInsights: string;
  ctaBookCall: string;
  ctaSeeServices: string;
  ctaSeeWork: string;
  ctaReadMore: string;
  ctaReadCase: string;
  ctaRead: string;
  ctaPickSlot: string;
  ctaSend: string;
  ctaSending: string;
  footerTagline: string;
  footerContact: string;
  footerNav: string;
  footerLegal: string;
  footerCopyright: string;
  footerInDevelopment: string;

  // Home hero / dashboard
  heroEyebrow: string;
  heroHeadline: string;
  heroSubhead: string;
  heroDisclaimer: string;

  // Services grid section
  servicesSectionEyebrow: string;
  servicesSectionTitle: string;
  servicesSectionAllLink: string;

  // How we work
  howEyebrow: string;
  howTitle: string;
  howLede: string;
  howStep1Title: string;
  howStep1Body: string;
  howStep2Title: string;
  howStep2Body: string;
  howStep3Title: string;
  howStep3Body: string;

  // Closing CTA
  closingEyebrow: string;
  closingTitle: string;
  closingBody: string;

  // Not found
  notFoundTitle: string;
  notFoundBody: string;
  notFoundHome: string;
  notFoundContact: string;

  // Generic bits
  snapshot: string;
  outcomes: string;
  duration: string;
  stack: string;
  language: string;
}

export const LABELS: Record<Locale, LabelSet> = {
  en: {
    skipToContent: 'Skip to content',
    navServices: 'Services',
    navWork: 'Work',
    navAbout: 'About',
    navContact: 'Contact',
    navInsights: 'Insights',
    ctaBookCall: 'Book a call',
    ctaSeeServices: 'See services',
    ctaSeeWork: 'See our work',
    ctaReadMore: 'Read more',
    ctaReadCase: 'Read case',
    ctaRead: 'Read',
    ctaPickSlot: 'Pick a slot',
    ctaSend: 'Send',
    ctaSending: 'Sending…',
    footerTagline:
      'Business and tech optimization. We find the drag in your operations and remove it.',
    footerContact: 'Contact',
    footerNav: 'Navigate',
    footerLegal: 'Legal',
    footerCopyright: 'All rights reserved.',
    footerInDevelopment: 'in development',

    heroEyebrow: 'The dashboard professor',
    heroHeadline: 'We find the drag in your operations, and we remove it.',
    heroSubhead:
      'Three places we find it most often. Pick one — watch what a typical optimization looks like.',
    heroDisclaimer: 'Illustrative audit shapes · the real one happens on the call.',

    servicesSectionEyebrow: '01 · What we do',
    servicesSectionTitle: 'Four engagements. One promise: less drag.',
    servicesSectionAllLink: 'All services',

    howEyebrow: '02 · How we work',
    howTitle: 'Three steps. No mystery.',
    howLede:
      "Most consulting goes sideways in the scoping phase. Ours doesn't, because we don't start work until both sides can describe the engagement in one paragraph.",
    howStep1Title: 'Listen',
    howStep1Body:
      "Thirty minutes on a call. No slides. We ask what's expensive, slow, or confusing, and what you've already tried. If we're not the right fit, we'll tell you that, too.",
    howStep2Title: 'Scope',
    howStep2Body:
      'Within a week you get a short written plan: the problem restated in your words, the recommended approach, the timeline, and a flat price. No subscription, no surprise line items.',
    howStep3Title: 'Ship',
    howStep3Body:
      'We run the engagement and hand you the work. You keep the documentation, the access, and the learning. Two weeks of follow-up questions are included.',

    closingEyebrow: 'Ready when you are',
    closingTitle: 'A 30-minute call. No slides.',
    closingBody:
      "Tell us what's expensive, slow, or confusing. We'll tell you honestly whether we're the right fit.",

    notFoundTitle: "That page isn't here.",
    notFoundBody:
      'Likely a moved or mistyped link. Head back to the home page, or reach us directly.',
    notFoundHome: 'Home',
    notFoundContact: 'Contact',

    snapshot: 'snapshot',
    outcomes: 'Outcomes',
    duration: 'Duration',
    stack: 'Stack',
    language: 'Language',
  },
  nl: {
    skipToContent: 'Naar inhoud',
    navServices: 'Diensten',
    navWork: 'Cases',
    navAbout: 'Over ons',
    navContact: 'Contact',
    navInsights: 'Inzichten',
    ctaBookCall: 'Plan een gesprek',
    ctaSeeServices: 'Bekijk diensten',
    ctaSeeWork: 'Bekijk onze cases',
    ctaReadMore: 'Lees meer',
    ctaReadCase: 'Lees case',
    ctaRead: 'Lezen',
    ctaPickSlot: 'Kies een moment',
    ctaSend: 'Versturen',
    ctaSending: 'Wordt verstuurd…',
    footerTagline:
      'Optimalisatie voor bedrijf en techniek. Wij vinden de wrijving in uw processen en halen die weg.',
    footerContact: 'Contact',
    footerNav: 'Navigatie',
    footerLegal: 'Juridisch',
    footerCopyright: 'Alle rechten voorbehouden.',
    footerInDevelopment: 'in ontwikkeling',

    heroEyebrow: 'De dashboard-professor',
    heroHeadline: 'Wij vinden de wrijving in uw processen, en halen die weg.',
    heroSubhead:
      'Drie plekken waar we die het vaakst aantreffen. Kies een scenario — zie hoe een gebruikelijke optimalisatie eruitziet.',
    heroDisclaimer: 'Illustratieve auditvormen · het echte werk start in het gesprek.',

    servicesSectionEyebrow: '01 · Wat wij doen',
    servicesSectionTitle: 'Vier diensten. Één belofte: minder wrijving.',
    servicesSectionAllLink: 'Alle diensten',

    howEyebrow: '02 · Hoe wij werken',
    howTitle: 'Drie stappen. Geen mysterie.',
    howLede:
      'De meeste consultancy loopt vast in de scopingfase. Bij ons niet, omdat we pas beginnen als beide kanten het traject in één alinea kunnen samenvatten.',
    howStep1Title: 'Luisteren',
    howStep1Body:
      'Dertig minuten aan de telefoon. Geen slides. Wij vragen wat duur, traag of onduidelijk is, en wat u al heeft geprobeerd. Als we niet de juiste match zijn, zeggen we dat ook.',
    howStep2Title: 'Afbakenen',
    howStep2Body:
      'Binnen een week krijgt u een kort geschreven plan: het probleem in uw eigen woorden geformuleerd, de aanbevolen aanpak, de planning en een vaste prijs. Geen abonnement, geen verrassingen op de factuur.',
    howStep3Title: 'Leveren',
    howStep3Body:
      'Wij voeren het traject uit en dragen het werk aan u over. U houdt de documentatie, de toegang en de kennis. Twee weken ondersteuning bij vragen zijn inbegrepen.',

    closingEyebrow: 'Wij staan klaar',
    closingTitle: 'Een gesprek van 30 minuten. Geen slides.',
    closingBody:
      'Vertel ons wat duur, traag of onduidelijk is. Wij zeggen eerlijk of we de juiste match zijn.',

    notFoundTitle: 'Deze pagina bestaat niet.',
    notFoundBody:
      'Waarschijnlijk een verplaatste of verkeerd getypte link. Ga terug naar de startpagina of neem direct contact op.',
    notFoundHome: 'Startpagina',
    notFoundContact: 'Contact',

    snapshot: 'momentopname',
    outcomes: 'Resultaten',
    duration: 'Duur',
    stack: 'Stack',
    language: 'Taal',
  },
};

export function t(locale: Locale, key: keyof LabelSet): string {
  return LABELS[locale][key];
}

/* ---------------------------------------------------------------------------
 * Nav route map
 * ------------------------------------------------------------------------- */

export interface NavRoute {
  label: keyof LabelSet;
  href: string;
}

export const NAV_ROUTES: Record<Locale, NavRoute[]> = {
  en: [
    { label: 'navServices', href: '/services' },
    { label: 'navWork', href: '/work' },
    { label: 'navAbout', href: '/about' },
    { label: 'navContact', href: '/contact' },
  ],
  nl: [
    { label: 'navServices', href: '/nl/diensten' },
    { label: 'navWork', href: '/nl/cases' },
    { label: 'navAbout', href: '/nl/over-ons' },
    { label: 'navContact', href: '/nl/contact' },
  ],
};
