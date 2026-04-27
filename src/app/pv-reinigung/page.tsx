import type { Metadata } from 'next';
import Link from 'next/link';
import { cities } from '@/data/cities';
import PublicShell from '@/components/PublicShell';

export const metadata: Metadata = {
  title: 'PV-Reinigung in Süddeutschland | Standorte | Skytech Solutions',
  description:
    'PV-Reinigung in 14 Städten Baden-Württembergs und Bayerns: Ulm, Stuttgart, Karlsruhe, Augsburg, Memmingen u.v.m. Drohnengestützt, dokumentiert, mit Festpreis. Wählen Sie Ihre Stadt.',
  keywords: ['PV-Reinigung Standorte', 'Photovoltaik-Reinigung Baden-Württemberg', 'PV-Reinigung Bayern', 'Solaranlagen Reinigung Süddeutschland'],
  alternates: { canonical: 'https://skytech-solutions.de/pv-reinigung' },
};

export default function StandortHub() {
  // Sort by distance from Ulm
  const sorted = [...cities].sort((a, b) => a.distanceFromUlmKm - b.distanceFromUlmKm);
  const collectionSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Standorte für PV-Reinigung',
    description: 'Skytech Solutions bedient 14 Städte in Baden-Württemberg und Bayern.',
    url: 'https://skytech-solutions.de/pv-reinigung',
    hasPart: cities.map((c) => ({
      '@type': 'WebPage',
      name: `PV-Reinigung ${c.name}`,
      url: `https://skytech-solutions.de/pv-reinigung/${c.slug}`,
    })),
  };

  return (
    <PublicShell>
      <main className="bg-gradient-to-b from-gray-50 via-white to-gray-50 pt-20 pb-20">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }} />

        <div className="container-width px-4 sm:px-6 lg:px-8">
          <div className="mx-auto mb-16 max-w-3xl text-center">
            <span className="inline-block rounded-full bg-primary-100 px-4 py-1 text-xs font-semibold uppercase tracking-wider text-primary-700">
              📍 14 Standorte
            </span>
            <h1 className="mt-4 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
              PV-Reinigung in <span className="text-primary-600">Süddeutschland</span>
            </h1>
            <p className="mt-6 text-lg text-gray-600">
              Wir bedienen Baden-Württemberg und das angrenzende Bayern mit professioneller
              Photovoltaik-Reinigung. Wählen Sie Ihre Stadt — jede Standort-Seite enthält
              regional angepasste Hinweise zu Klima, Verschmutzung und Wartungs-Intervallen.
            </p>
          </div>

          {/* CITIES GRID */}
          <div className="mx-auto grid max-w-6xl gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {sorted.map((c) => (
              <Link
                key={c.slug}
                href={`/pv-reinigung/${c.slug}`}
                className="group flex flex-col rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:border-primary-300 hover:shadow-xl"
              >
                <div className="mb-3 flex items-baseline justify-between">
                  <h2 className="text-xl font-semibold text-gray-900">{c.name}</h2>
                  <span className="text-xs font-medium text-gray-500">{c.state}</span>
                </div>
                <div className="mb-4 grid grid-cols-2 gap-2 text-xs text-gray-500">
                  <span>📍 {c.plz}</span>
                  <span>👥 {(c.population / 1000).toFixed(0)}k</span>
                  <span>🚗 {c.distanceFromUlmKm === 0 ? 'lokal' : `${c.distanceFromUlmKm} km`}</span>
                  <span>⏱ {c.driveTimeMin === 0 ? '0 Min.' : `${c.driveTimeMin} Min.`}</span>
                </div>
                <p className="line-clamp-3 flex-1 text-sm text-gray-600">{c.heroSubtitle}</p>
                <span className="mt-4 inline-flex items-center text-sm font-semibold text-primary-600 group-hover:text-primary-700">
                  PV-Reinigung in {c.name}
                  <svg className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </span>
              </Link>
            ))}
          </div>

          <div className="mx-auto mt-16 max-w-3xl rounded-2xl border border-primary-100 bg-primary-50/40 p-6 text-center">
            <p className="text-sm text-gray-700">
              <strong>Ihre Stadt fehlt?</strong> Wir prüfen gerne, ob ein Termin in Ihrer Region
              möglich ist. Schreiben Sie uns für ein Festpreisangebot — auch außerhalb dieser Liste.
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
