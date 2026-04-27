import type { Metadata } from 'next';
import Link from 'next/link';
import ReinigungskostenForm from '@/components/calculators/ReinigungskostenForm';

export const metadata: Metadata = {
  title: 'Reinigungskosten-Schätzer | PV-Reinigung Preis berechnen — Skytech Solutions',
  description:
    'Was kostet eine professionelle Photovoltaik-Reinigung? Kostenloser Online-Schätzer — anhand Modulanzahl, Dachtyp und Zugänglichkeit.',
  keywords: [
    'PV Reinigung Kosten', 'Solaranlage Reinigung Preis', 'Photovoltaik Reinigung Kalkulator',
    'Solarmodule reinigen Kosten', 'Drohnenreinigung Preis', 'PV Wartung Kosten',
  ],
  alternates: { canonical: 'https://skytech-solutions.de/rechner/reinigungskosten' },
  openGraph: {
    title: 'Reinigungskosten für PV-Anlagen | Skytech Solutions',
    description: 'Was kostet eine professionelle PV-Reinigung? Online-Schätzer mit PDF-Download.',
    url: 'https://skytech-solutions.de/rechner/reinigungskosten',
  },
};

const faqs = [
  {
    q: 'Was beeinflusst den Preis einer PV-Reinigung?',
    a: 'Drei Hauptfaktoren: Anzahl der Module, Dachtyp (flach, geneigt, steil) und Zugänglichkeit. Bei schwierigem Zugang setzen wir Drohnen ein — günstiger und sicherer als Gerüst.',
  },
  {
    q: 'Sind die geschätzten Preise verbindlich?',
    a: 'Nein — die Bandbreite (±15%) zeigt typische Spannen. Für ein verbindliches Festpreis-Angebot kommen wir kostenlos zur Vor-Ort-Besichtigung.',
  },
  {
    q: 'Bieten Sie Mengenrabatt?',
    a: 'Ja, ab 100 Modulen und für Solarparks mit über 200 Modulen gewähren wir individuelle Rabatte. Sprechen Sie uns an.',
  },
  {
    q: 'Was ist der Unterschied zwischen Reinigung mit und ohne Thermografie?',
    a: 'Die Thermografie-Inspektion deckt defekte Zellen, Hotspots und elektrische Probleme auf. Wir empfehlen sie alle 2–3 Jahre als vorbeugende Wartung.',
  },
];

const howToSteps = [
  { name: 'Modulanzahl eingeben', text: 'Geben Sie die Anzahl der Solar-Module Ihrer Anlage an.' },
  { name: 'Dachtyp wählen', text: 'Wählen Sie zwischen Flachdach, Satteldach, Steildach oder Freiflächenanlage.' },
  { name: 'Zugänglichkeit prüfen', text: 'Beurteilen Sie, wie einfach Ihre Anlage zugänglich ist (Höhe, Hindernisse).' },
  { name: 'Optional: Thermografie', text: 'Aktivieren Sie die Thermografie-Inspektion für eine umfassende Prüfung.' },
];

export default function ReinigungskostenPage() {
  const webAppSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'Reinigungskosten-Schätzer',
    url: 'https://skytech-solutions.de/rechner/reinigungskosten',
    applicationCategory: 'CalculatorApplication',
    operatingSystem: 'Web',
    description: 'Online-Rechner zur Schätzung der Kosten einer Photovoltaik-Reinigung.',
    offers: { '@type': 'Offer', price: 0, priceCurrency: 'EUR' },
    inLanguage: 'de-DE',
  };
  const howToSchema = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: 'Reinigungskosten für PV-Anlage schätzen',
    step: howToSteps.map((s, i) => ({
      '@type': 'HowToStep',
      position: i + 1,
      name: s.name,
      text: s.text,
    })),
  };
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };

  return (
    <main className="bg-gradient-to-b from-gray-50 via-white to-gray-50 pt-24 pb-20">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <div className="container-width px-4 sm:px-6 lg:px-8">
        <Link href="/rechner" className="text-sm text-primary-600 hover:underline">
          ← Alle Rechner
        </Link>

        <div className="mx-auto mt-4 max-w-3xl text-center">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Reinigungskosten-<span className="text-primary-600">Schätzer</span>
          </h1>
          <p className="mt-4 text-lg text-gray-600">
            Was kostet eine professionelle PV-Reinigung? Geben Sie Modulanzahl, Dachtyp und
            Zugänglichkeit an — wir liefern Ihnen sofort eine realistische Schätzung.
          </p>
        </div>

        <div className="mx-auto mt-12 max-w-5xl">
          <ReinigungskostenForm />
        </div>

        <div className="mx-auto mt-16 max-w-3xl">
          <h2 className="text-2xl font-bold text-gray-900">So funktioniert&apos;s</h2>
          <ol className="mt-6 space-y-4">
            {howToSteps.map((s, i) => (
              <li key={s.name} className="flex gap-4 rounded-xl border border-gray-200 bg-white p-4">
                <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-primary-100 text-sm font-bold text-primary-700">
                  {i + 1}
                </span>
                <div>
                  <h3 className="font-semibold text-gray-900">{s.name}</h3>
                  <p className="mt-1 text-sm text-gray-600">{s.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>

        <div className="mx-auto mt-16 max-w-3xl">
          <h2 className="text-2xl font-bold text-gray-900">Häufige Fragen</h2>
          <div className="mt-6 space-y-3">
            {faqs.map((f) => (
              <details key={f.q} className="group rounded-xl border border-gray-200 bg-white p-5">
                <summary className="cursor-pointer text-base font-semibold text-gray-900">
                  {f.q}
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-gray-600">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
