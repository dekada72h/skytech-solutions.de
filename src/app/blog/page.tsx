// ─────────────────────────────────────────────────────────────────────────
// /blog — strona indeksu bloga. Pobiera wszystkie posty z lib/blog.ts
// (Markdown z frontmatter), wyświetla siatkę kart 3 kolumnowych z kategorią,
// datą, czasem czytania i krótkim opisem. Schema Blog + listing wszystkich
// BlogPosting dla rich snippets w Google.
// ─────────────────────────────────────────────────────────────────────────
import type { Metadata } from 'next';
import Link from 'next/link';
import PublicShell from '@/components/PublicShell';
import { getAllPosts } from '@/lib/blog';

export const metadata: Metadata = {
  title: 'Blog – PV- und Fassadenreinigung Wissen | Skytech Solutions',
  description:
    'Praktische Ratgeber rund um Photovoltaik- und Fassadenreinigung: Ertragsverlust, Reinigungsintervalle, Hubsteiger vs. Drohne, Material-Guides und branchen-spezifische Themen. Mit Daten von Fraunhofer ISE und TÜV.',
  keywords: ['PV-Reinigung Blog', 'Fassadenreinigung Blog', 'Photovoltaik Wissen', 'Drohnenreinigung Ratgeber', 'Solaranlagen Wartung'],
  alternates: { canonical: 'https://skytech-solutions.de/blog' },
};

// Etykiety + kolory dla 4 kategorii artykułów (frontmatter `category`).
// Używane do kolorowania badge'a na karcie artykułu w listingu.
const categoryLabels: Record<string, string> = {
  guide: 'Ratgeber',
  industry: 'Branche',
  seasonal: 'Saisonal',
  pricing: 'Preise',
};

const categoryColors: Record<string, string> = {
  guide: 'bg-primary-100 text-primary-700',
  industry: 'bg-amber-100 text-amber-700',
  seasonal: 'bg-emerald-100 text-emerald-700',
  pricing: 'bg-rose-100 text-rose-700',
};

export default function BlogIndex() {
  const posts = getAllPosts();

  const blogSchema = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: 'Skytech Solutions Blog',
    description: 'Ratgeber und Wissen rund um PV-Reinigung und Fassadenreinigung.',
    url: 'https://skytech-solutions.de/blog',
    blogPost: posts.map((p) => ({
      '@type': 'BlogPosting',
      headline: p.title,
      description: p.description,
      datePublished: p.date,
      dateModified: p.updated ?? p.date,
      author: { '@type': 'Organization', name: 'Skytech Solutions' },
      url: `https://skytech-solutions.de/blog/${p.slug}`,
    })),
  };

  return (
    <PublicShell>
      <main className="bg-gradient-to-b from-gray-50 via-white to-gray-50 pt-20 pb-20">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(blogSchema) }} />

        <div className="container-width px-4 sm:px-6 lg:px-8">
          <div className="mx-auto mb-16 max-w-3xl text-center">
            <span className="inline-block rounded-full bg-primary-100 px-4 py-1 text-xs font-semibold uppercase tracking-wider text-primary-700">
              📚 Wissen &amp; Ratgeber
            </span>
            <h1 className="mt-4 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
              Skytech <span className="text-primary-600">Blog</span>
            </h1>
            <p className="mt-6 text-lg text-gray-600">
              Praktische Artikel zu <strong>Photovoltaik-</strong> und <strong>Fassadenreinigung</strong>:
              Ertragsverlust, Reinigungsintervalle, Material-Guides, Hubsteiger vs. Drohne und
              branchen-spezifische Herausforderungen. Daten aus Fraunhofer ISE, TÜV-Studien und
              unserer eigenen Praxis.
            </p>
          </div>

          {posts.length === 0 ? (
            <p className="text-center text-gray-500">Bald geht es los — erste Artikel in Vorbereitung.</p>
          ) : (
            <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-2 lg:grid-cols-3">
              {posts.map((p) => (
                <Link
                  key={p.slug}
                  href={`/blog/${p.slug}`}
                  className="group flex flex-col rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:border-primary-300 hover:shadow-xl"
                >
                  <div className="mb-3 flex items-center gap-2">
                    <span className={`rounded-full px-3 py-0.5 text-[10px] font-bold uppercase tracking-wider ${categoryColors[p.category] ?? 'bg-gray-100 text-gray-700'}`}>
                      {categoryLabels[p.category] ?? p.category}
                    </span>
                    {p.pillar && (
                      <span className="rounded-full bg-yellow-100 px-2 py-0.5 text-[10px] font-bold uppercase text-yellow-800">⭐ Hauptartikel</span>
                    )}
                  </div>
                  <h2 className="text-lg font-bold text-gray-900 group-hover:text-primary-700">
                    {p.title}
                  </h2>
                  <p className="mt-2 line-clamp-3 flex-1 text-sm text-gray-600">{p.description}</p>
                  <div className="mt-4 flex items-baseline justify-between text-xs text-gray-500">
                    <span>{new Date(p.date).toLocaleDateString('de-DE', { day: '2-digit', month: 'long', year: 'numeric' })}</span>
                    <span>{p.readMinutes} Min. Lesezeit</span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </main>
    </PublicShell>
  );
}
