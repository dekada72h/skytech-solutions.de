// ─────────────────────────────────────────────────────────────────────────
// sitemap.ts — Next.js generuje /sitemap.xml automatycznie z tego pliku.
// Łączy: stałe routes (root + sekcje) + 3 podstrony usług + 14 miast +
// 2 region hubs + wszystkie posty blogowe. Każdy URL ma priority i
// changefrequency dla crawlerów.
// ─────────────────────────────────────────────────────────────────────────
import type { MetadataRoute } from 'next';
import { allCitySlugs } from '@/data/cities';
import { getAllSlugs } from '@/lib/blog';
import { SERVICE_SLUGS } from '@/data/services';

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
    { path: '/standorte', priority: 0.95, changefreq: 'monthly' as const },
    { path: '/standorte/baden-wuerttemberg', priority: 0.92, changefreq: 'monthly' as const },
    { path: '/standorte/bayern', priority: 0.9, changefreq: 'monthly' as const },
    { path: '/ueber-uns', priority: 0.7, changefreq: 'yearly' as const },
    { path: '/faq', priority: 0.7, changefreq: 'monthly' as const },
    { path: '/kontakt', priority: 0.8, changefreq: 'yearly' as const },
    { path: '/impressum', priority: 0.3, changefreq: 'yearly' as const },
    { path: '/datenschutz', priority: 0.3, changefreq: 'yearly' as const },
    { path: '/agb', priority: 0.3, changefreq: 'yearly' as const },
  ];
  const serviceRoutes = SERVICE_SLUGS.map((slug) => ({
    path: `/leistungen/${slug}`,
    priority: 0.88,
    changefreq: 'monthly' as const,
  }));
  const cityRoutes = allCitySlugs().map((slug) => ({
    path: `/standorte/${slug}`,
    priority: 0.9,
    changefreq: 'monthly' as const,
  }));
  const blogRoutes = [
    { path: '/blog', priority: 0.85, changefreq: 'weekly' as const },
    ...getAllSlugs().map((slug) => ({
      path: `/blog/${slug}`,
      priority: 0.8,
      changefreq: 'monthly' as const,
    })),
  ];
  return [...routes, ...serviceRoutes, ...cityRoutes, ...blogRoutes].map((r) => ({
    url: `${BASE}${r.path}`,
    lastModified: lastmod,
    changeFrequency: r.changefreq,
    priority: r.priority,
  }));
}
