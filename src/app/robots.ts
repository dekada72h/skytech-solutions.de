// ─────────────────────────────────────────────────────────────────────────
// robots.ts — Next.js generuje /robots.txt z tego pliku.
// Wszystko dozwolone dla crawlerów ("/"), zablokowane tylko /api/*
// (endpointy serwerowe — kontakt form etc., nie do indeksowania).
// Linkujemy też mapę strony żeby Google ją łatwo znalazł.
// ─────────────────────────────────────────────────────────────────────────
import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: '*', allow: '/', disallow: ['/api/'] },
    ],
    sitemap: 'https://skytech-solutions.de/sitemap.xml',
  };
}
