import type { Metadata } from 'next';
import Link from 'next/link';
import RoiCalculator from '@/components/RoiCalculator';

export const metadata: Metadata = {
  title: 'ROI-Rechner für PV-Reinigung — Detailliert | Skytech Solutions',
  description:
    'Detaillierter ROI-Rechner für professionelle Photovoltaik-Reinigung: Umgebungsfaktor, letzte Reinigung, Servicetyp. Präzise Wirtschaftlichkeitsberechnung.',
  keywords: [
    'ROI Rechner PV Reinigung', 'Wirtschaftlichkeit Solar Wartung', 'PV Reinigung Profi Rechner',
    'Solar ROI berechnen', 'Photovoltaik Wirtschaftlichkeit',
  ],
  alternates: { canonical: 'https://skytech-solutions.de/rechner/roi-rechner' },
  openGraph: {
    title: 'Detaillierter ROI-Rechner für PV-Reinigung',
    description: 'Profi-Tool: Umgebungsfaktor, letzte Reinigung, Servicetyp. Präzise Berechnung mit allen relevanten Variablen.',
    url: 'https://skytech-solutions.de/rechner/roi-rechner',
  },
};

export default function RoiRechnerPage() {
  const webAppSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'ROI-Rechner für PV-Reinigung (Profi-Version)',
    url: 'https://skytech-solutions.de/rechner/roi-rechner',
    applicationCategory: 'CalculatorApplication',
    operatingSystem: 'Web',
    description: 'Detaillierte Wirtschaftlichkeitsberechnung der professionellen PV-Reinigung mit allen relevanten Faktoren.',
    offers: { '@type': 'Offer', price: 0, priceCurrency: 'EUR' },
    inLanguage: 'de-DE',
  };

  return (
    <main className="bg-gradient-to-b from-gray-50 via-white to-gray-50 pt-24 pb-20">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }} />

      <div className="container-width px-4 sm:px-6 lg:px-8">
        <Link href="/rechner" className="text-sm text-primary-600 hover:underline">
          ← Alle Rechner
        </Link>

        <div className="mx-auto mt-4 max-w-3xl text-center">
          <span className="inline-block rounded-full bg-primary-100 px-4 py-1 text-xs font-semibold uppercase tracking-wider text-primary-700">
            Profi-Tool
          </span>
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Detaillierter <span className="text-primary-600">ROI-Rechner</span>
          </h1>
          <p className="mt-4 text-lg text-gray-600">
            Der vollumfängliche Rechner mit Umgebungsfaktor, Zeitpunkt der letzten Reinigung
            und Servicetyp — für präzise Wirtschaftlichkeitsanalysen Ihrer PV-Anlage.
          </p>
        </div>
      </div>

      <RoiCalculator />
    </main>
  );
}
