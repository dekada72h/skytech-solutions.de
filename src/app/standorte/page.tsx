import type { Metadata } from 'next';
import Link from 'next/link';
import { cities, citiesByRegion, REGION_DATA } from '@/data/cities';
import PublicShell from '@/components/PublicShell';
import BlogTeaser from '@/components/BlogTeaser';

export const metadata: Metadata = {
  title: 'Unsere Standorte – PV- und Fassadenreinigung in Süddeutschland | Skytech Solutions',
  description:
    'PV-Reinigung und Fassadenreinigung in Baden-Württemberg und Bayern: 14 Städte, regionale Hubs, drohnengestützte Verfahren mit Festpreis und Foto-Dokumentation. Wählen Sie Ihre Region.',
  keywords: ['Standorte Skytech', 'PV-Reinigung Baden-Württemberg', 'Fassadenreinigung Bayern', 'Drohnenreinigung Süddeutschland'],
  alternates: { canonical: 'https://skytech-solutions.de/standorte' },
};

export default function StandortHub() {
  const sorted = [...cities].sort((a, b) => a.distanceFromUlmKm - b.distanceFromUlmKm);
  const bw = citiesByRegion('baden-wuerttemberg');
  const by = citiesByRegion('bayern');

  const collectionSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Standorte für PV-Reinigung',
    description: 'Skytech Solutions bedient 14 Städte in Baden-Württemberg und Bayern.',
    url: 'https://skytech-solutions.de/standorte',
    hasPart: cities.map((c) => ({
      '@type': 'WebPage',
      name: `PV-Reinigung ${c.name}`,
      url: `https://skytech-solutions.de/standorte/${c.slug}`,
    })),
  };

  return (
    <PublicShell>
      <main className="bg-gradient-to-b from-gray-50 via-white to-gray-50 pt-20 pb-20">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }} />

        <div className="container-width px-4 sm:px-6 lg:px-8">
          <div className="mx-auto mb-16 max-w-3xl text-center">
            <span className="inline-block rounded-full bg-primary-100 px-4 py-1 text-xs font-semibold uppercase tracking-wider text-primary-700">
              📍 14 Standorte · 2 Bundesländer
            </span>
            <h1 className="mt-4 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
              Unsere <span className="text-primary-600">Standorte</span> in Süddeutschland
            </h1>
            <p className="mt-6 text-lg text-gray-600">
              Wir bedienen Baden-Württemberg und das angrenzende Bayern mit professioneller
              <strong> Photovoltaik- und Fassadenreinigung</strong>. Wählen Sie Ihre Region
              oder direkt Ihre Stadt — jede Standort-Seite enthält regional angepasste Hinweise
              zu Klima, Verschmutzung, Wartungs-Intervallen und realistische Preise.
            </p>
          </div>

          {/* REGIONAL HUBS — primary navigation */}
          <div className="mx-auto mb-16 grid max-w-4xl gap-6 md:grid-cols-2">
            <Link
              href="/standorte/baden-wuerttemberg"
              className="group rounded-2xl border-2 border-primary-200 bg-gradient-to-br from-primary-50 to-white p-8 shadow-md transition-all hover:-translate-y-1 hover:border-primary-400 hover:shadow-xl"
            >
              <p className="text-xs font-semibold uppercase tracking-wider text-primary-700">Bundesland</p>
              <h2 className="mt-2 text-2xl font-bold text-gray-900">Baden-Württemberg</h2>
              <p className="mt-2 text-sm text-gray-600">{REGION_DATA['baden-wuerttemberg'].description}</p>
              <p className="mt-4 text-sm font-semibold text-primary-700">
                {bw.length} Standorte →
              </p>
            </Link>
            <Link
              href="/standorte/bayern"
              className="group rounded-2xl border-2 border-amber-200 bg-gradient-to-br from-amber-50 to-white p-8 shadow-md transition-all hover:-translate-y-1 hover:border-amber-400 hover:shadow-xl"
            >
              <p className="text-xs font-semibold uppercase tracking-wider text-amber-700">Bundesland</p>
              <h2 className="mt-2 text-2xl font-bold text-gray-900">Bayern</h2>
              <p className="mt-2 text-sm text-gray-600">{REGION_DATA.bayern.description}</p>
              <p className="mt-4 text-sm font-semibold text-amber-700">
                {by.length} Standorte →
              </p>
            </Link>
          </div>

          {/* ALL CITIES (compact list) */}
          <div className="mx-auto mb-12 max-w-5xl">
            <h2 className="mb-4 text-center text-xl font-bold text-gray-900">Alle Standorte</h2>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {sorted.map((c) => (
                <Link
                  key={c.slug}
                  href={`/standorte/${c.slug}`}
                  className="rounded-xl border border-gray-200 bg-white p-4 transition-all hover:border-primary-300 hover:shadow-md"
                >
                  <div className="flex items-baseline justify-between">
                    <span className="font-semibold text-gray-900">{c.name}</span>
                    <span className="text-xs text-gray-500">{c.state}</span>
                  </div>
                  <p className="mt-1 text-xs text-gray-500">
                    PLZ {c.plz} · {c.distanceFromUlmKm === 0 ? 'lokal' : `${c.distanceFromUlmKm} km`}
                  </p>
                </Link>
              ))}
            </div>
          </div>

          {/* BLOG TEASER */}
          <BlogTeaser />

          <div className="mx-auto mt-12 max-w-3xl rounded-2xl border border-primary-100 bg-primary-50/40 p-6 text-center">
            <p className="text-sm text-gray-700">
              <strong>Ihre Stadt fehlt?</strong> Wir prüfen gerne Sondertermine außerhalb dieser
              Liste. Bei mehreren Anlagen in einer Region bieten wir reduzierte Anfahrtskosten.
            </p>
            <Link
              href="/kontakt"
              className="mt-4 inline-flex items-center justify-center rounded-full bg-primary-600 px-6 py-2 text-sm font-semibold text-white hover:bg-primary-700"
            >
              Anfrage senden
            </Link>
          </div>
        </div>
      </main>
    </PublicShell>
  );
}
