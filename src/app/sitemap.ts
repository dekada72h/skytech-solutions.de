import type { MetadataRoute } from 'next';

const BASE = 'https://skytech-solutions.de';

export default function sitemap(): MetadataRoute.Sitemap {
  const lastmod = new Date('2026-04-27');
  const routes = [
    { path: '/', priority: 1.0, changefreq: 'monthly' as const },
    { path: '/leistungen', priority: 0.9, changefreq: 'monthly' as const },
    { path: '/rechner', priority: 0.9, changefreq: 'monthly' as const },
    { path: '/rechner/ertragsverlust', priority: 0.85, changefreq: 'monthly' as const },
    { path: '/rechner/reinigungskosten', priority: 0.85, changefreq: 'monthly' as const },
    { path: '/rechner/amortisation', priority: 0.85, changefreq: 'monthly' as const },
    { path: '/rechner/roi-rechner', priority: 0.8, changefreq: 'monthly' as const },
    { path: '/ueber-uns', priority: 0.7, changefreq: 'yearly' as const },
    { path: '/faq', priority: 0.7, changefreq: 'monthly' as const },
    { path: '/kontakt', priority: 0.8, changefreq: 'yearly' as const },
    { path: '/impressum', priority: 0.3, changefreq: 'yearly' as const },
    { path: '/datenschutz', priority: 0.3, changefreq: 'yearly' as const },
    { path: '/agb', priority: 0.3, changefreq: 'yearly' as const },
  ];
  return routes.map((r) => ({
    url: `${BASE}${r.path}`,
    lastModified: lastmod,
    changeFrequency: r.changefreq,
    priority: r.priority,
  }));
}
