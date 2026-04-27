import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { cities, cityBySlug, allCitySlugs, REGION_DATA } from '@/data/cities';
import PublicShell from '@/components/PublicShell';
import BlogTeaser from '@/components/BlogTeaser';

export const dynamicParams = false;

export async function generateStaticParams() {
  return allCitySlugs().map((city) => ({ city }));
}

export async function generateMetadata({ params }: { params: { city: string } }): Promise<Metadata> {
  const c = cityBySlug(params.city);
  if (!c) return { title: 'Standort nicht gefunden' };
  return {
    title: c.metaTitle,
    description: c.metaDescription,
    keywords: c.keywords,
    alternates: { canonical: `https://skytech-solutions.de/pv-reinigung/${c.slug}` },
    openGraph: {
      title: c.metaTitle,
      description: c.metaDescription,
      url: `https://skytech-solutions.de/pv-reinigung/${c.slug}`,
      type: 'website',
    },
  };
}

const iconMap: Record<string, string> = {
  speed: 'M13 10V3L4 14h7v7l9-11h-7z',
  tool: 'M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.336l-3.276 3.277a3.004 3.004 0 01-2.25-2.25l3.276-3.276a4.5 4.5 0 00-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437l1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008z',
  leaf: 'M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z',
  shield: 'M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z',
};

export default function CityPage({ params }: { params: { city: string } }) {
  const c = cityBySlug(params.city);
  if (!c) notFound();
  const regionInfo = REGION_DATA[c.region];

  // Schemas: LocalBusiness, BreadcrumbList, FAQPage
  const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': `https://skytech-solutions.de/pv-reinigung/${c.slug}#business`,
    name: `Skytech Solutions — PV-Reinigung ${c.name}`,
    description: c.metaDescription,
    url: `https://skytech-solutions.de/pv-reinigung/${c.slug}`,
    telephone: '+4915216991223',
    email: 'krzysztof@aeropro-inspekcje.pl',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Höhenblick 8',
      addressLocality: 'Ulm-Einsingen',
      postalCode: '89079',
      addressCountry: 'DE',
    },
    areaServed: [
      { '@type': 'City', name: c.name, address: { '@type': 'PostalAddress', addressLocality: c.name, postalCode: c.plz, addressCountry: 'DE' } },
      ...c.nearbyVillages.map((v) => ({ '@type': 'City' as const, name: v, address: { '@type': 'PostalAddress' as const, addressLocality: v, addressCountry: 'DE' } })),
    ],
    priceRange: '€€',
    serviceType: 'Photovoltaik-Reinigung',
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Startseite', item: 'https://skytech-solutions.de' },
      { '@type': 'ListItem', position: 2, name: 'PV-Reinigung', item: 'https://skytech-solutions.de/pv-reinigung' },
      { '@type': 'ListItem', position: 3, name: regionInfo.name, item: `https://skytech-solutions.de/pv-reinigung/${c.region}` },
      { '@type': 'ListItem', position: 4, name: c.name, item: `https://skytech-solutions.de/pv-reinigung/${c.slug}` },
    ],
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: c.cityFaqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };

  return (
    <PublicShell>
      <main className="bg-gradient-to-b from-gray-50 via-white to-gray-50 pt-20 pb-20">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

        <div className="container-width px-4 sm:px-6 lg:px-8">
          {/* BREADCRUMB */}
          <nav className="mb-6 text-sm text-gray-500">
            <Link href="/" className="hover:text-primary-600">Start</Link>
            <span className="mx-2">/</span>
            <Link href="/pv-reinigung" className="hover:text-primary-600">PV-Reinigung</Link>
            <span className="mx-2">/</span>
            <Link href={`/pv-reinigung/${c.region}`} className="hover:text-primary-600">{regionInfo.name}</Link>
            <span className="mx-2">/</span>
            <span className="text-gray-900">{c.name}</span>
          </nav>

          {/* HERO */}
          <div className="mx-auto mb-12 max-w-4xl text-center">
            <span className="inline-block rounded-full bg-primary-100 px-4 py-1 text-xs font-semibold uppercase tracking-wider text-primary-700">
              📍 {c.state} · {c.distanceFromUlmKm === 0 ? 'unser Standort' : `${c.distanceFromUlmKm} km von Ulm`}
            </span>
            <h1 className="mt-4 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">{c.heroTitle}</h1>
            <p className="mt-6 text-lg text-gray-600">{c.heroSubtitle}</p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link href="/kontakt" className="rounded-full bg-primary-600 px-6 py-3 text-sm font-semibold text-white shadow-lg transition-all hover:bg-primary-700">
                Kostenloses Angebot anfordern
              </Link>
              <Link href="/rechner" className="rounded-full border border-primary-300 bg-white px-6 py-3 text-sm font-semibold text-primary-700 shadow-sm transition-all hover:bg-primary-50">
                Kosten berechnen →
              </Link>
            </div>
          </div>

          {/* QUICK FACTS */}
          <div className="mx-auto mb-16 grid max-w-4xl gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <Fact label="PLZ" value={c.plz} />
            <Fact label="Einwohner" value={c.population.toLocaleString('de-DE')} />
            <Fact label="Anfahrt" value={c.distanceFromUlmKm === 0 ? 'Lokal' : `${c.distanceFromUlmKm} km`} sub={c.driveTimeMin ? `${c.driveTimeMin} Min.` : undefined} />
            <Fact label="Bundesland" value={c.state} />
          </div>

          {/* INTRO — 3 paragraphs */}
          <section className="mx-auto mb-16 max-w-3xl space-y-6 text-base leading-relaxed text-gray-700">
            <div>
              <h2 className="mb-3 text-2xl font-bold text-gray-900">Solar in {c.name} — was Sie wissen sollten</h2>
              <p>{c.intro.history}</p>
            </div>
            <div>
              <h2 className="mb-3 text-2xl font-bold text-gray-900">Wer ist unser Kundenkreis in {c.name}?</h2>
              <p>{c.intro.industry}</p>
            </div>
            <div>
              <h2 className="mb-3 text-2xl font-bold text-gray-900">Klima &amp; Verschmutzung in {c.name}</h2>
              <p dangerouslySetInnerHTML={{ __html: c.intro.climate.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>') }} />
            </div>
          </section>

          {/* LOCAL POINTS */}
          <section className="mx-auto mb-16 grid max-w-5xl gap-4 sm:grid-cols-2">
            {c.localPoints.map((p, i) => (
              <div key={i} className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary-50 text-primary-600">
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d={iconMap[p.icon]} />
                  </svg>
                </div>
                <h3 className="mt-4 font-semibold text-gray-900">{p.title}</h3>
                <p className="mt-1 text-sm text-gray-600">{p.text}</p>
              </div>
            ))}
          </section>

          {/* DISTRICTS + NEARBY VILLAGES */}
          <section className="mx-auto mb-16 grid max-w-4xl gap-6 md:grid-cols-2">
            <div className="rounded-2xl border border-gray-200 bg-white p-6">
              <h2 className="text-lg font-bold text-gray-900">Stadtteile in {c.name}</h2>
              <p className="mt-1 text-xs text-gray-500">Wir bedienen alle Bezirke der Stadt.</p>
              <ul className="mt-4 flex flex-wrap gap-2">
                {c.districts.map((d) => (
                  <li key={d} className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700">{d}</li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl border border-gray-200 bg-white p-6">
              <h2 className="text-lg font-bold text-gray-900">Auch im Umland</h2>
              <p className="mt-1 text-xs text-gray-500">Gemeinden im Service-Gebiet rund um {c.name}.</p>
              <ul className="mt-4 flex flex-wrap gap-2">
                {c.nearbyVillages.map((v) => (
                  <li key={v} className="rounded-full bg-primary-50 px-3 py-1 text-xs font-medium text-primary-700">{v}</li>
                ))}
              </ul>
            </div>
          </section>

          {/* CASE STUDY */}
          <section className="mx-auto mb-16 max-w-4xl rounded-2xl border-2 border-emerald-200 bg-emerald-50/40 p-8">
            <p className="text-xs font-semibold uppercase tracking-wider text-emerald-700">Praxisbeispiel</p>
            <h2 className="mt-2 text-2xl font-bold text-gray-900">{c.caseStudy.title}</h2>
            <p className="mt-3 text-gray-700">{c.caseStudy.description}</p>
            <div className="mt-4 flex flex-wrap gap-2 text-xs">
              <Link href="/rechner/ertragsverlust" className="rounded-full bg-white px-3 py-1 text-emerald-700 underline hover:bg-emerald-100">
                → Ihren Verlust berechnen
              </Link>
              <Link href="/rechner/amortisation" className="rounded-full bg-white px-3 py-1 text-emerald-700 underline hover:bg-emerald-100">
                → Ihre Amortisation prüfen
              </Link>
            </div>
          </section>

          {/* PRICING */}
          <section className="mx-auto mb-16 max-w-3xl rounded-2xl border border-gray-200 bg-white p-8">
            <h2 className="text-2xl font-bold text-gray-900">Preisbeispiel für {c.name}</h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-3">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">Anlagengröße</p>
                <p className="mt-1 text-2xl font-bold text-gray-900">{c.pricingExample.sizeKwp} kWp</p>
                <p className="text-xs text-gray-500">≈ {c.pricingExample.panelCount} Module</p>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">Reinigungspreis</p>
                <p className="mt-1 text-2xl font-bold text-primary-700">
                  {c.pricingExample.priceMin}–{c.pricingExample.priceMax} €
                </p>
                <p className="text-xs text-gray-500">Brutto inkl. Anfahrt</p>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">Pro Modul</p>
                <p className="mt-1 text-2xl font-bold text-gray-900">
                  {(c.pricingExample.priceMin / c.pricingExample.panelCount).toFixed(2)} €
                </p>
                <p className="text-xs text-gray-500">ab Festpreis</p>
              </div>
            </div>
            <p className="mt-4 text-sm text-gray-600">{c.pricingExample.note}</p>
            <Link
              href="/rechner/reinigungskosten"
              className="mt-4 inline-block text-sm font-semibold text-primary-600 hover:underline"
            >
              → Genauer berechnen mit unserem Schätzer
            </Link>
          </section>

          {/* SEASONAL TIP */}
          <section className="mx-auto mb-16 max-w-3xl rounded-2xl bg-amber-50 border border-amber-200 p-6">
            <p className="text-xs font-semibold uppercase tracking-wider text-amber-700">💡 Profi-Tipp für {c.name}</p>
            <p className="mt-2 text-base text-amber-900">{c.seasonalTip}</p>
          </section>

          {/* FAQ */}
          <section className="mx-auto mb-16 max-w-3xl">
            <h2 className="mb-6 text-2xl font-bold text-gray-900">
              Häufige Fragen — PV-Reinigung in {c.name}
            </h2>
            <div className="space-y-3">
              {c.cityFaqs.map((f) => (
                <details key={f.q} className="group rounded-xl border border-gray-200 bg-white p-5">
                  <summary className="cursor-pointer text-base font-semibold text-gray-900">{f.q}</summary>
                  <p className="mt-3 text-sm leading-relaxed text-gray-600">{f.a}</p>
                </details>
              ))}
            </div>
          </section>

          {/* CALCULATOR DEEPLINKS */}
          <section className="mx-auto mb-16 max-w-4xl rounded-2xl border-2 border-primary-200 bg-gradient-to-br from-primary-50 to-white p-8">
            <h2 className="text-center text-2xl font-bold text-gray-900">
              Berechnen Sie jetzt — angepasst für {c.name}
            </h2>
            <p className="mt-2 text-center text-gray-600">
              Geben Sie Ihre PLZ <strong className="text-primary-700">{c.plz}</strong> in unsere Rechner ein
              für regional angepasste Werte.
            </p>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              <Link href="/rechner/ertragsverlust" className="rounded-xl border border-primary-300 bg-white p-4 text-sm transition-all hover:border-primary-500 hover:shadow-md">
                <p className="font-semibold text-gray-900">📉 Ertragsverlust</p>
                <p className="mt-1 text-xs text-gray-500">Wieviel verlieren Sie pro Jahr?</p>
              </Link>
              <Link href="/rechner/reinigungskosten" className="rounded-xl border border-primary-300 bg-white p-4 text-sm transition-all hover:border-primary-500 hover:shadow-md">
                <p className="font-semibold text-gray-900">💰 Reinigungskosten</p>
                <p className="mt-1 text-xs text-gray-500">Was kostet Sie die Reinigung?</p>
              </Link>
              <Link href="/rechner/amortisation" className="rounded-xl border border-primary-300 bg-white p-4 text-sm transition-all hover:border-primary-500 hover:shadow-md">
                <p className="font-semibold text-gray-900">⏱ Amortisation</p>
                <p className="mt-1 text-xs text-gray-500">Wann zahlt sich die Reinigung aus?</p>
              </Link>
              <Link href="/rechner/roi-rechner" className="rounded-xl border border-primary-300 bg-white p-4 text-sm transition-all hover:border-primary-500 hover:shadow-md">
                <p className="font-semibold text-gray-900">📊 Detaillierter ROI</p>
                <p className="mt-1 text-xs text-gray-500">Profi-Tool für genaue Werte.</p>
              </Link>
            </div>
          </section>

          {/* BLOG TEASER — reverse linking */}
          <BlogTeaser
            title={`Wissenswertes zu PV-Reinigung — auch relevant für ${c.name}`}
            subtitle="Vertiefende Artikel zu Ertragsverlust, Kosten und branchen-spezifischen Themen."
          />

          {/* NEARBY CITIES */}
          <section className="mx-auto mb-12 max-w-4xl">
            <h2 className="mb-6 text-center text-xl font-bold text-gray-900">Auch in der Region tätig</h2>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {c.nearby.map((slug) => {
                const n = cityBySlug(slug);
                if (!n) return null;
                return (
                  <Link
                    key={slug}
                    href={`/pv-reinigung/${slug}`}
                    className="rounded-xl border border-gray-200 bg-white p-4 text-center transition-all hover:border-primary-300 hover:shadow-md"
                  >
                    <p className="font-semibold text-gray-900">{n.name}</p>
                    <p className="mt-0.5 text-xs text-gray-500">{n.state}</p>
                    <p className="mt-1 text-xs text-primary-600">→ PV-Reinigung</p>
                  </Link>
                );
              })}
            </div>
          </section>

          {/* BACK LINKS */}
          <div className="text-center text-sm">
            <Link href={`/pv-reinigung/${c.region}`} className="text-primary-600 hover:underline">
              ← Alle Standorte in {regionInfo.name}
            </Link>
            <span className="mx-3 text-gray-400">·</span>
            <Link href="/pv-reinigung" className="text-primary-600 hover:underline">
              Alle Bundesländer
            </Link>
          </div>
        </div>
      </main>
    </PublicShell>
  );
}

function Fact({ label, value, sub }: { label: string; value: string; sub?: string }) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-4 text-center shadow-sm">
      <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">{label}</p>
      <p className="mt-1 text-lg font-bold text-gray-900">{value}</p>
      {sub && <p className="text-xs text-gray-500">{sub}</p>}
    </div>
  );
}
