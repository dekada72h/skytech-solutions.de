import Link from 'next/link';
import PublicShell from '@/components/PublicShell';
import type { CityData, Region } from '@/data/cities';

interface Props {
  region: Region;
  cities: CityData[];
  info: { name: string; description: string };
}

export default function RegionHub({ region, cities, info }: Props) {
  const sorted = [...cities].sort((a, b) => a.distanceFromUlmKm - b.distanceFromUlmKm);

  const collectionSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: `PV-Reinigung ${info.name}`,
    description: info.description,
    url: `https://skytech-solutions.de/pv-reinigung/${region}`,
    hasPart: cities.map((c) => ({
      '@type': 'WebPage',
      name: `PV-Reinigung ${c.name}`,
      url: `https://skytech-solutions.de/pv-reinigung/${c.slug}`,
    })),
  };

  const breadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Startseite', item: 'https://skytech-solutions.de' },
      { '@type': 'ListItem', position: 2, name: 'PV-Reinigung', item: 'https://skytech-solutions.de/pv-reinigung' },
      { '@type': 'ListItem', position: 3, name: info.name, item: `https://skytech-solutions.de/pv-reinigung/${region}` },
    ],
  };

  return (
    <PublicShell>
      <main className="bg-gradient-to-b from-gray-50 via-white to-gray-50 pt-20 pb-20">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />

        <div className="container-width px-4 sm:px-6 lg:px-8">
          <nav className="mb-6 text-sm text-gray-500">
            <Link href="/" className="hover:text-primary-600">Start</Link>
            <span className="mx-2">/</span>
            <Link href="/pv-reinigung" className="hover:text-primary-600">PV-Reinigung</Link>
            <span className="mx-2">/</span>
            <span className="text-gray-900">{info.name}</span>
          </nav>

          <div className="mx-auto mb-12 max-w-3xl text-center">
            <span className="inline-block rounded-full bg-primary-100 px-4 py-1 text-xs font-semibold uppercase tracking-wider text-primary-700">
              📍 {cities.length} Standorte in {info.name}
            </span>
            <h1 className="mt-4 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
              PV-Reinigung in <span className="text-primary-600">{info.name}</span>
            </h1>
            <p className="mt-6 text-lg text-gray-600">{info.description}</p>
          </div>

          <div className="mx-auto grid max-w-6xl gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {sorted.map((c) => (
              <Link
                key={c.slug}
                href={`/pv-reinigung/${c.slug}`}
                className="group flex flex-col rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:border-primary-300 hover:shadow-xl"
              >
                <div className="mb-3 flex items-baseline justify-between">
                  <h2 className="text-xl font-semibold text-gray-900">{c.name}</h2>
                  <span className="text-xs font-medium text-gray-500">{(c.population / 1000).toFixed(0)}k</span>
                </div>
                <div className="mb-4 grid grid-cols-2 gap-2 text-xs text-gray-500">
                  <span>📍 PLZ {c.plz}</span>
                  <span>🚗 {c.distanceFromUlmKm === 0 ? 'lokal' : `${c.distanceFromUlmKm} km`}</span>
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

          <div className="mx-auto mt-12 text-center">
            <Link href="/pv-reinigung" className="text-sm text-primary-600 hover:underline">
              ← Alle Bundesländer ansehen
            </Link>
          </div>
        </div>
      </main>
    </PublicShell>
  );
}
