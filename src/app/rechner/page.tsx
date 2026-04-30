// ─────────────────────────────────────────────────────────────────────────
// /rechner — strona główna sekcji "Online-Rechner". Lista 4 kalkulatorów:
// Ertragsverlust, Reinigungskosten, Amortisation, ROI. Każdy w osobnej
// karcie z opisem, czasem wypełnienia i CTA. Bardzo silne SEO (long-tail
// "PV Rechner online", "Solarpanel Reinigung Kosten Rechner").
// ─────────────────────────────────────────────────────────────────────────
import PublicShell from '@/components/PublicShell';
import BlogTeaser from '@/components/BlogTeaser';
import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'PV-Rechner | Kostenlos berechnen — Skytech Solutions',
  description:
    'Kostenlose Online-Rechner für Photovoltaik-Reinigung: Ertragsverlust durch Verschmutzung, Reinigungskosten, Amortisation und ROI. Sofort, ohne Anmeldung.',
  keywords: [
    'PV Rechner', 'Solaranlage Reinigung Kosten Rechner', 'Ertragsverlust berechnen',
    'Photovoltaik Amortisation', 'Solarmodule Verschmutzung Verlust',
    'PV Reinigung Kalkulator', 'ROI Solaranlage',
  ],
  alternates: { canonical: 'https://skytech-solutions.de/rechner' },
  openGraph: {
    title: 'PV-Rechner — Kostenlos berechnen | Skytech Solutions',
    description:
      'Vier kostenlose Rechner: Ertragsverlust, Reinigungskosten, Amortisation, ROI. Mit PDF-Download.',
    url: 'https://skytech-solutions.de/rechner',
    type: 'website',
  },
};

const calculators = [
  {
    href: '/rechner/ertragsverlust',
    title: 'Ertragsverlust-Rechner',
    description:
      'Wie viel Strom (und Geld) verlieren Sie, weil Ihre PV-Anlage verschmutzt ist? Berechnen Sie es in 30 Sekunden.',
    icon: (
      <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
      </svg>
    ),
    badge: 'Beliebtester Rechner',
  },
  {
    href: '/rechner/reinigungskosten',
    title: 'Reinigungskosten-Schätzer',
    description:
      'Schätzen Sie die Kosten einer professionellen PV-Reinigung anhand Ihrer Anlagengröße, Dachform und Zugänglichkeit.',
    icon: (
      <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.375m-1.5-1.5h.375a1.125 1.125 0 001.125-1.125V18m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15M21 18h.375m-.375 0a1.125 1.125 0 00-1.125 1.125v.75M9 9.75h.008v.008H9V9.75zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm5.625 0h.008v.008H15V9.75zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zM12 12h.008v.008H12V12z" />
      </svg>
    ),
    badge: null,
  },
  {
    href: '/rechner/amortisation',
    title: 'Amortisations-Rechner',
    description:
      'Nach wie vielen Monaten zahlt sich eine Reinigung aus? Sehen Sie 5- und 10-Jahres-Prognose Ihrer Ertragsoptimierung.',
    icon: (
      <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.306a11.95 11.95 0 015.814-5.518l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" />
      </svg>
    ),
    badge: 'Mit 5-Jahres-Tabelle',
  },
  {
    href: '/rechner/roi-rechner',
    title: 'Detaillierter ROI-Rechner',
    description:
      'Vollumfänglicher Rechner für Anlagen jeder Größe: Umgebungsfaktor, letzte Reinigung, Servicetyp — präzise Ergebnisse.',
    icon: (
      <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25m18 0A2.25 2.25 0 0018.75 3H5.25A2.25 2.25 0 003 5.25m18 0V12a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 12V5.25" />
      </svg>
    ),
    badge: 'Profi-Tool',
  },
];

export default function RechnerHub() {
  const collectionSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'PV-Rechner — kostenlose Online-Tools',
    description: 'Vier kostenlose Rechner für Photovoltaik-Reinigung und Wirtschaftlichkeit.',
    url: 'https://skytech-solutions.de/rechner',
    hasPart: calculators.map((c) => ({
      '@type': 'WebApplication',
      name: c.title,
      url: `https://skytech-solutions.de${c.href}`,
      applicationCategory: 'CalculatorApplication',
      operatingSystem: 'Web',
      offers: { '@type': 'Offer', price: 0, priceCurrency: 'EUR' },
    })),
  };

  return (
    <PublicShell>
    <main className="bg-gradient-to-b from-gray-50 via-white to-gray-50 pt-24 pb-20">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }} />

      <div className="container-width px-4 sm:px-6 lg:px-8">
        {/* HERO */}
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <span className="inline-block rounded-full bg-primary-100 px-4 py-1 text-xs font-semibold uppercase tracking-wider text-primary-700">
            Kostenlose Tools
          </span>
          <h1 className="mt-4 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            Solar-<span className="text-primary-600">Rechner</span>
          </h1>
          <p className="mt-6 text-lg text-gray-600">
            Vier kostenlose Online-Rechner, die Ihnen zeigen, wie viel Sie durch Verschmutzung
            verlieren, was eine Reinigung kostet und ab wann sie sich auszahlt. Ohne Anmeldung,
            mit PDF-Download für Ihre Unterlagen.
          </p>
        </div>

        {/* GRID */}
        <div className="mx-auto grid max-w-5xl gap-6 sm:grid-cols-2">
          {calculators.map((c) => (
            <Link
              key={c.href}
              href={c.href}
              className="group relative flex flex-col rounded-2xl border border-gray-200 bg-white p-8 shadow-sm transition-all hover:-translate-y-1 hover:border-primary-300 hover:shadow-xl"
            >
              {c.badge && (
                <span className="absolute right-4 top-4 rounded-full bg-primary-50 px-3 py-1 text-xs font-semibold text-primary-700">
                  {c.badge}
                </span>
              )}
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-primary-50 text-primary-600 group-hover:bg-primary-100">
                {c.icon}
              </div>
              <h2 className="text-xl font-semibold text-gray-900">{c.title}</h2>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-gray-600">{c.description}</p>
              <span className="mt-6 inline-flex items-center text-sm font-semibold text-primary-600 group-hover:text-primary-700">
                Jetzt berechnen
                <svg className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </span>
            </Link>
          ))}
        </div>

        {/* INFO STRIP */}
        <div className="mx-auto mt-16 max-w-3xl rounded-2xl border border-primary-100 bg-primary-50/50 p-6 text-center">
          <p className="text-sm text-gray-700">
            <strong className="text-gray-900">Hinweis:</strong> Die Rechner basieren auf Branchen­durchschnitten
            und realen Daten unserer eigenen Anlagen. Für ein verbindliches Angebot kontaktieren Sie uns —
            wir kommen zur kostenlosen Vor-Ort-Bewertung.
          </p>
          <Link
            href="/kontakt"
            className="mt-4 inline-flex items-center justify-center rounded-full bg-primary-600 px-6 py-2 text-sm font-semibold text-white transition-all hover:bg-primary-700"
          >
            Kostenloses Angebot anfordern
          </Link>
        </div>

        <BlogTeaser />
      </div>
    </main>
  </PublicShell>
  );
}
