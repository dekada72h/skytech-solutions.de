// ─────────────────────────────────────────────────────────────────────────
// /blog/[slug] — dynamiczne podstrony per artykuł blogowy. Pre-renderowane
// wszystkie istniejące slugi (getAllSlugs), dynamicParams=false → 404 dla
// nieznanych slug'ów. Każda podstrona generuje schemę BlogPosting +
// FAQPage (jeśli artykuł ma sekcję faqs we frontmatterze).
// ─────────────────────────────────────────────────────────────────────────
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import PublicShell from '@/components/PublicShell';
import { getAllSlugs, getAllPosts, getPostBySlug } from '@/lib/blog';

// false = nie generuj nieznanych ścieżek na żądanie (404 zamiast SSR)
export const dynamicParams = false;

export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = await getPostBySlug(params.slug);
  if (!post) return { title: 'Artikel nicht gefunden' };
  return {
    title: `${post.title} | Skytech Solutions Blog`,
    description: post.description,
    keywords: post.keywords,
    alternates: { canonical: `https://skytech-solutions.de/blog/${post.slug}` },
    openGraph: {
      title: post.title,
      description: post.description,
      url: `https://skytech-solutions.de/blog/${post.slug}`,
      type: 'article',
      publishedTime: post.date,
      modifiedTime: post.updated ?? post.date,
      authors: [post.author],
    },
  };
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = await getPostBySlug(params.slug);
  if (!post) notFound();

  const allPosts = getAllPosts();
  const related = (post.related ?? []).map((s) => allPosts.find((p) => p.slug === s)).filter(Boolean);

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.description,
    keywords: post.keywords.join(', '),
    datePublished: post.date,
    dateModified: post.updated ?? post.date,
    author: { '@type': 'Organization', name: 'Skytech Solutions', url: 'https://skytech-solutions.de' },
    publisher: {
      '@type': 'Organization',
      name: 'Skytech Solutions',
      url: 'https://skytech-solutions.de',
      logo: { '@type': 'ImageObject', url: 'https://skytech-solutions.de/icon.svg' },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://skytech-solutions.de/blog/${post.slug}`,
    },
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Startseite', item: 'https://skytech-solutions.de' },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://skytech-solutions.de/blog' },
      { '@type': 'ListItem', position: 3, name: post.title, item: `https://skytech-solutions.de/blog/${post.slug}` },
    ],
  };

  const faqSchema = post.faqs && post.faqs.length > 0 ? {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: post.faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  } : null;

  return (
    <PublicShell>
      <main className="bg-white pt-20 pb-20">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
        {faqSchema && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />}

        <article className="container-width px-4 sm:px-6 lg:px-8">
          <nav className="mb-6 text-sm text-gray-500">
            <Link href="/" className="hover:text-primary-600">Start</Link>
            <span className="mx-2">/</span>
            <Link href="/blog" className="hover:text-primary-600">Blog</Link>
            <span className="mx-2">/</span>
            <span className="line-clamp-1 text-gray-900">{post.title}</span>
          </nav>

          <header className="mx-auto mb-10 max-w-3xl">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl lg:text-5xl">
              {post.title}
            </h1>
            <p className="mt-4 text-lg text-gray-600">{post.description}</p>
            <div className="mt-6 flex flex-wrap items-center gap-4 border-y border-gray-200 py-3 text-sm text-gray-500">
              <span>{post.author}</span>
              <span>·</span>
              <time dateTime={post.date}>
                {new Date(post.date).toLocaleDateString('de-DE', { day: '2-digit', month: 'long', year: 'numeric' })}
              </time>
              <span>·</span>
              <span>{post.readMinutes} Min. Lesezeit</span>
            </div>
          </header>

          <div
            className="blog-content prose prose-lg mx-auto max-w-3xl prose-headings:font-bold prose-headings:tracking-tight prose-h2:mt-14 prose-h2:text-3xl prose-h2:text-gray-900 prose-h3:mt-10 prose-h3:text-xl prose-h3:text-gray-900 prose-p:text-gray-700 prose-p:leading-relaxed prose-a:text-primary-600 prose-a:font-medium prose-a:no-underline hover:prose-a:underline prose-strong:text-gray-900 prose-table:my-8 prose-th:px-4 prose-th:py-3 prose-th:text-left prose-td:border-b prose-td:border-gray-200 prose-td:px-4 prose-td:py-3 prose-li:text-gray-700 prose-li:my-1 prose-img:rounded-xl prose-img:shadow-md prose-blockquote:border-l-4 prose-blockquote:border-primary-500 prose-blockquote:bg-primary-50 prose-blockquote:py-2 prose-blockquote:px-5 prose-blockquote:not-italic prose-blockquote:text-gray-800 prose-blockquote:rounded-r-lg"
            dangerouslySetInnerHTML={{ __html: post.contentHtml }}
          />

          {/* FAQ */}
          {post.faqs && post.faqs.length > 0 && (
            <section className="mx-auto mt-16 max-w-3xl">
              <h2 className="mb-6 text-2xl font-bold text-gray-900">Häufige Fragen</h2>
              <div className="space-y-3">
                {post.faqs.map((f) => (
                  <details key={f.q} className="group rounded-xl border border-gray-200 bg-white p-5">
                    <summary className="cursor-pointer text-base font-semibold text-gray-900">{f.q}</summary>
                    <p className="mt-3 text-sm leading-relaxed text-gray-600">{f.a}</p>
                  </details>
                ))}
              </div>
            </section>
          )}

          {/* CTA — calculator */}
          <section className="mx-auto mt-16 max-w-3xl rounded-2xl border-2 border-primary-200 bg-gradient-to-br from-primary-50 to-white p-8 text-center">
            <h2 className="text-2xl font-bold text-gray-900">
              Wie viel verlieren Sie konkret?
            </h2>
            <p className="mt-2 text-gray-600">
              Berechnen Sie Ihren persönlichen Ertragsverlust in 30 Sekunden — kostenlos, ohne Anmeldung.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <Link href="/rechner/ertragsverlust" className="rounded-full bg-primary-600 px-6 py-3 text-sm font-semibold text-white shadow-lg hover:bg-primary-700">
                Ertragsverlust berechnen
              </Link>
              <Link href="/rechner" className="rounded-full border border-primary-300 bg-white px-6 py-3 text-sm font-semibold text-primary-700 hover:bg-primary-50">
                Alle Rechner ansehen
              </Link>
            </div>
          </section>

          {/* RELATED */}
          {related.length > 0 && (
            <section className="mx-auto mt-16 max-w-4xl">
              <h2 className="mb-6 text-xl font-bold text-gray-900">Weiterlesen</h2>
              <div className="grid gap-4 md:grid-cols-3">
                {related.map((r: any) => (
                  <Link
                    key={r.slug}
                    href={`/blog/${r.slug}`}
                    className="group rounded-xl border border-gray-200 bg-white p-5 transition-all hover:border-primary-300 hover:shadow-md"
                  >
                    <h3 className="font-semibold text-gray-900 group-hover:text-primary-700">{r.title}</h3>
                    <p className="mt-2 line-clamp-2 text-sm text-gray-600">{r.description}</p>
                  </Link>
                ))}
              </div>
            </section>
          )}

          <div className="mt-12 text-center">
            <Link href="/blog" className="text-sm text-primary-600 hover:underline">← Alle Artikel</Link>
          </div>
        </article>
      </main>
    </PublicShell>
  );
}
