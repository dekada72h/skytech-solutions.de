// ─────────────────────────────────────────────────────────────────────────
// /leistungen/[slug] — dynamiczne podstrony per usługa (solarpark-,
// dachanlagen-, fassadenreinigung). generateStaticParams pre-renderuje
// wszystkie 3 podstrony jako SSG. Każda zawiera: hero, intro, technologię
// DCS, spec table, use-cases, proces, vorher/nachher, FAQ + 3 schemy
// (BreadcrumbList, Service, FAQPage). Treść z `src/data/services.ts`.
// ─────────────────────────────────────────────────────────────────────────
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import PageLayout from '@/components/PageLayout';
import CTA from '@/components/CTA';
import BlogTeaser from '@/components/BlogTeaser';
import {
  getServiceBySlug,
  SERVICE_SLUGS,
  type ServiceUseCase,
} from '@/data/services';
import Reveal from '@/components/animations/Reveal';

interface Params {
  params: { slug: string };
}

// generateStaticParams — Next.js wywołuje to przy buildzie i pre-renderuje
// wszystkie 3 podstrony do statycznego HTML (SSG, brak runtime'u).
export function generateStaticParams() {
  return SERVICE_SLUGS.map((slug) => ({ slug }));
}

// generateMetadata — dynamiczne meta-tagi per podstrona, brane z data/services.ts
export function generateMetadata({ params }: Params): Metadata {
  const s = getServiceBySlug(params.slug);
  if (!s) return {};
  return {
    title: s.metaTitle,
    description: s.metaDescription,
    alternates: { canonical: `/leistungen/${s.slug}` },
    openGraph: {
      title: s.metaTitle,
      description: s.metaDescription,
      url: `https://skytech-solutions.de/leistungen/${s.slug}`,
      type: 'article',
    },
  };
}

const useCaseIcons: Record<ServiceUseCase['icon'], React.ReactNode> = {
  industry: (
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008z" />
  ),
  home: (
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
  ),
  office: (
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21" />
  ),
  farm: (
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-9v18m9-9H3" />
  ),
  logistics: (
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 9.75h19.5m-19.5 0v8.25c0 1.243 1.007 2.25 2.25 2.25h15c1.243 0 2.25-1.007 2.25-2.25V9.75m-19.5 0V6.75c0-1.243 1.007-2.25 2.25-2.25h15c1.243 0 2.25 1.007 2.25 2.25v3M6 14.25h.008v.008H6v-.008z" />
  ),
  glass: (
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v18h16.5V3H3.75zM3.75 12h16.5M12 3v18" />
  ),
  energy: (
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
  ),
  maintenance: (
    <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.336l-3.276 3.277a3.004 3.004 0 01-2.25-2.25l3.276-3.276a4.5 4.5 0 00-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m5.108-.233a4.5 4.5 0 003.486-6.486l-3.276 3.276M14.25 9.75l4.5-4.5" />
  ),
};

export default function ServicePage({ params }: Params) {
  const s = getServiceBySlug(params.slug);
  if (!s) notFound();

  const breadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Startseite', item: 'https://skytech-solutions.de' },
      { '@type': 'ListItem', position: 2, name: 'Leistungen', item: 'https://skytech-solutions.de/leistungen' },
      { '@type': 'ListItem', position: 3, name: s.navLabel, item: `https://skytech-solutions.de/leistungen/${s.slug}` },
    ],
  };

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: s.title,
    description: s.metaDescription,
    serviceType: s.navLabel,
    provider: { '@id': 'https://skytech-solutions.de/#localbusiness' },
    areaServed: { '@type': 'Country', name: 'Deutschland' },
    url: `https://skytech-solutions.de/leistungen/${s.slug}`,
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: s.faq.map((q) => ({
      '@type': 'Question',
      name: q.question,
      acceptedAnswer: { '@type': 'Answer', text: q.answer },
    })),
  };

  return (
    <PageLayout title={s.title} subtitle={s.subtitle}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      {/* Breadcrumb visible */}
      <div className="border-b border-gray-100 bg-white">
        <div className="container-width px-4 sm:px-6 lg:px-8">
          <nav className="py-3 text-sm text-gray-500">
            <Link href="/" className="hover:text-primary-600">Start</Link>
            <span className="mx-2">/</span>
            <Link href="/leistungen" className="hover:text-primary-600">Leistungen</Link>
            <span className="mx-2">/</span>
            <span className="text-gray-900">{s.navLabel}</span>
          </nav>
        </div>
      </div>

      {/* Hero image + intro */}
      <section className="bg-white py-12 sm:py-16">
        <div className="container-width px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-10 lg:grid-cols-2">
            <div className="relative aspect-[16/10] overflow-hidden rounded-3xl shadow-xl">
              <Image
                src={s.heroImage}
                alt={s.title}
                fill
                priority
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
              />
              {s.badge && (
                <span className="absolute left-4 top-4 rounded-full bg-accent-500 px-3 py-1 text-xs font-semibold text-white shadow">
                  {s.badge}
                </span>
              )}
            </div>
            <div>
              <span className="text-sm font-semibold uppercase tracking-wider text-primary-600">
                Was wir leisten
              </span>
              <h2 className="mt-3 text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                Schmutz kostet Ertrag – wir holen ihn zurück
              </h2>
              <div className="mt-4 space-y-4 text-base leading-relaxed text-gray-600 sm:text-lg">
                {s.intro.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="/kontakt"
                  className="inline-flex items-center justify-center rounded-full bg-primary-600 px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-primary-600/25 transition-all hover:bg-primary-700"
                >
                  Festpreisangebot in 24 h
                </Link>
                <Link
                  href="/rechner"
                  className="inline-flex items-center justify-center rounded-full border border-gray-200 bg-white px-7 py-3.5 text-sm font-semibold text-gray-700 shadow-sm transition-all hover:border-gray-300"
                >
                  Online-Rechner
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits strip */}
      <section className="border-y border-gray-100 bg-gradient-to-br from-primary-50 to-white py-10">
        <div className="container-width px-4 sm:px-6 lg:px-8">
          <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {s.benefits.map((b) => (
              <li key={b} className="flex items-start gap-3 text-sm text-gray-700 sm:text-base">
                <svg className="mt-0.5 h-5 w-5 shrink-0 text-primary-600" fill="none" viewBox="0 0 24 24" strokeWidth={2.4} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>
                <span>{b}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* DCS technology */}
      <section className="bg-white py-16 sm:py-20">
        <div className="container-width px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <span className="text-sm font-semibold uppercase tracking-wider text-primary-600">
              Unsere Technologie
            </span>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              DCS X1 PRO &amp; DJI Matrice 400
            </h2>
            <div className="mt-6 space-y-5 text-base leading-relaxed text-gray-700 sm:text-lg">
              {s.technologyParagraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </div>

          {/* Spec table */}
          <div className="mx-auto mt-12 max-w-3xl overflow-hidden rounded-2xl border border-gray-100 bg-gray-50">
            <div className="border-b border-gray-200 bg-white px-6 py-3 text-sm font-semibold uppercase tracking-wider text-gray-500">
              Technische Daten
            </div>
            <dl className="divide-y divide-gray-200">
              {s.specs.map((spec) => (
                <div key={spec.label} className="grid grid-cols-1 gap-1 px-6 py-3 sm:grid-cols-3 sm:gap-4">
                  <dt className="text-sm font-semibold text-gray-900 sm:col-span-1">{spec.label}</dt>
                  <dd className="text-sm text-gray-700 sm:col-span-2">{spec.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {/* Use cases */}
      <section className="bg-gray-50 py-16 sm:py-20">
        <div className="container-width px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <span className="text-sm font-semibold uppercase tracking-wider text-primary-600">
              Anwendungsfälle
            </span>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Wer profitiert von dieser Leistung
            </h2>
          </div>
          <div className="mx-auto mt-12 grid max-w-5xl gap-6 sm:grid-cols-2">
            {s.useCases.map((uc, i) => (
              <Reveal key={uc.title} delay={i * 0.08} y={20}>
                <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary-50 text-primary-600">
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                      {useCaseIcons[uc.icon]}
                    </svg>
                  </div>
                  <h3 className="mt-4 text-lg font-bold text-gray-900">{uc.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-gray-600">{uc.description}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="bg-white py-16 sm:py-20">
        <div className="container-width px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <span className="text-sm font-semibold uppercase tracking-wider text-primary-600">
              Ablauf
            </span>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              So gehen wir vor
            </h2>
          </div>
          <ol className="mx-auto mt-12 grid max-w-5xl gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {s.process.map((step, i) => (
              <Reveal key={step.number} delay={i * 0.1} y={18}>
                <li className="rounded-2xl border border-gray-100 bg-gray-50 p-6">
                  <span className="text-3xl font-extrabold text-primary-600">{step.number}</span>
                  <h3 className="mt-2 text-base font-bold text-gray-900">{step.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-gray-600">{step.description}</p>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* Before / After */}
      <section className="bg-gray-50 py-16 sm:py-20">
        <div className="container-width px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <span className="text-sm font-semibold uppercase tracking-wider text-primary-600">
              Vorher / Nachher
            </span>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Was sich konkret ändert
            </h2>
          </div>
          <div className="mx-auto mt-12 grid max-w-5xl gap-6 lg:grid-cols-2">
            <div className="rounded-2xl border border-rose-100 bg-white p-6 sm:p-8">
              <h3 className="text-lg font-bold text-rose-700">Vorher</h3>
              <ul className="mt-4 space-y-2.5">
                {s.beforeAfter.before.map((b) => (
                  <li key={b} className="flex items-start gap-2 text-sm text-gray-700">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-rose-500" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl border border-emerald-100 bg-white p-6 sm:p-8">
              <h3 className="text-lg font-bold text-emerald-700">Nachher</h3>
              <ul className="mt-4 space-y-2.5">
                {s.beforeAfter.after.map((a) => (
                  <li key={a} className="flex items-start gap-2 text-sm text-gray-700">
                    <svg className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                    <span>{a}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-white py-16 sm:py-20">
        <div className="container-width px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <span className="text-sm font-semibold uppercase tracking-wider text-primary-600">
              FAQ
            </span>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Häufige Fragen zu {s.navLabel}
            </h2>
          </div>
          <div className="mx-auto mt-10 max-w-3xl space-y-3">
            {s.faq.map((q, i) => (
              <details
                key={i}
                className="group rounded-2xl border border-gray-100 bg-gray-50 p-5 shadow-sm transition-shadow open:shadow-md"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-base font-semibold text-gray-900">
                  {q.question}
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white text-gray-500 transition-colors group-open:bg-primary-50 group-open:text-primary-600">
                    <svg className="h-4 w-4 transition-transform group-open:rotate-45" fill="none" viewBox="0 0 24 24" strokeWidth={2.2} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                    </svg>
                  </span>
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-gray-700">{q.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Related services */}
      <section className="bg-gray-50 py-12">
        <div className="container-width px-4 sm:px-6 lg:px-8">
          <h3 className="text-center text-sm font-semibold uppercase tracking-wider text-primary-600">
            Weitere Leistungen
          </h3>
          <div className="mx-auto mt-6 grid max-w-4xl gap-4 sm:grid-cols-3">
            {SERVICE_SLUGS.filter((slug) => slug !== s.slug).map((slug) => {
              const other = getServiceBySlug(slug);
              if (!other) return null;
              return (
                <Link
                  key={slug}
                  href={`/leistungen/${slug}`}
                  className="rounded-xl border border-gray-100 bg-white px-5 py-4 text-center text-sm font-semibold text-gray-700 shadow-sm transition-all hover:-translate-y-0.5 hover:border-primary-200 hover:text-primary-700 hover:shadow-md"
                >
                  {other.navLabel}
                </Link>
              );
            })}
            <Link
              href="/leistungen"
              className="rounded-xl border border-gray-100 bg-white px-5 py-4 text-center text-sm font-semibold text-gray-700 shadow-sm transition-all hover:-translate-y-0.5 hover:border-primary-200 hover:text-primary-700 hover:shadow-md"
            >
              Alle Leistungen
            </Link>
          </div>
        </div>
      </section>

      <BlogTeaser />
      <CTA />
    </PageLayout>
  );
}
