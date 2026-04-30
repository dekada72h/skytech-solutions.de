// ─────────────────────────────────────────────────────────────────────────
// /rechner/ertragsverlust — pełna strona rechnera straty z brudnej PV.
// Hero z tytułem, formularz (ErtragsverlustForm), explanation + FAQ
// + BlogTeaser. Schema HowTo dla rich snippets.
// ─────────────────────────────────────────────────────────────────────────
import PublicShell from '@/components/PublicShell';
import BlogTeaser from '@/components/BlogTeaser';
import type { Metadata } from 'next';
import Link from 'next/link';
import ErtragsverlustForm from '@/components/calculators/ErtragsverlustForm';

export const metadata: Metadata = {
  title: 'Ertragsverlust-Rechner | Wie viel verlieren Sie durch Verschmutzung? — Skytech Solutions',
  description:
    'Kostenloser Online-Rechner: berechnen Sie den jährlichen Ertragsverlust Ihrer Photovoltaik-Anlage durch Verschmutzung — in Euro und kWh.',
  keywords: [
    'Ertragsverlust PV', 'Photovoltaik Verschmutzung Verlust', 'Solaranlage Verschmutzung berechnen',
    'PV Reinigung Rechner', 'Solar Ertrag verloren', 'kWh Verlust Solar',
  ],
  alternates: { canonical: 'https://skytech-solutions.de/rechner/ertragsverlust' },
  openGraph: {
    title: 'Ertragsverlust-Rechner für Photovoltaik | Skytech Solutions',
    description: 'Wie viel Geld kostet Sie eine schmutzige Solaranlage pro Jahr? Kostenlos berechnen.',
    url: 'https://skytech-solutions.de/rechner/ertragsverlust',
  },
};

const faqs = [
  {
    q: 'Wie genau ist der Ertragsverlust-Rechner?',
    a: 'Der Rechner basiert auf realen Felddaten und Branchenstudien (Fraunhofer ISE, TÜV). Er liefert eine sehr gute Schätzung, ersetzt aber keine Vor-Ort-Messung. Für eine präzise Bewertung kontaktieren Sie uns für eine kostenlose Inspektion.',
  },
  {
    q: 'Welche Umgebung hat den größten Einfluss auf die Verschmutzung?',
    a: 'Industriegebiete und intensive Landwirtschaft führen zu den höchsten Verlusten (12–18% pro Jahr). Wohngebiete sind weniger betroffen (4–6% pro Jahr).',
  },
  {
    q: 'Sollte ich meine Anlage jährlich reinigen lassen?',
    a: 'Es kommt auf Standort und Verschmutzungsgrad an. In Wohngebieten reichen oft 2 Jahre, in Landwirtschaft und Industrie empfehlen wir jährliche Reinigung.',
  },
];

const howToSteps = [
  {
    name: 'Anlagengröße eingeben',
    text: 'Geben Sie die installierte Leistung Ihrer PV-Anlage in kWp ein.',
  },
  {
    name: 'Letzte Reinigung wählen',
    text: 'Wann wurde Ihre Anlage zuletzt professionell gereinigt? In Monaten.',
  },
  {
    name: 'Umgebung auswählen',
    text: 'Wählen Sie die Umgebung Ihrer Anlage (Wohngebiet, Landwirtschaft, Industrie, Wald).',
  },
  {
    name: 'Ergebnis ablesen',
    text: 'Sehen Sie sofort den jährlichen Verlust in Euro und kWh sowie die 5-Jahres-Prognose.',
  },
];

export default function ErtragsverlustPage() {
  const webAppSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'Ertragsverlust-Rechner',
    url: 'https://skytech-solutions.de/rechner/ertragsverlust',
    applicationCategory: 'CalculatorApplication',
    operatingSystem: 'Web',
    description: 'Kostenloser Online-Rechner zur Berechnung des Ertragsverlusts einer verschmutzten PV-Anlage.',
    offers: { '@type': 'Offer', price: 0, priceCurrency: 'EUR' },
    inLanguage: 'de-DE',
  };
  const howToSchema = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: 'Ertragsverlust einer PV-Anlage berechnen',
    description: 'In 4 Schritten den jährlichen Verlust durch Verschmutzung schätzen.',
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
    <PublicShell>
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
            Ertragsverlust-<span className="text-primary-600">Rechner</span>
          </h1>
          <p className="mt-4 text-lg text-gray-600">
            Wie viel kostet Sie eine schmutzige PV-Anlage pro Jahr? In 30 Sekunden berechnet —
            inklusive 5-Jahres-Prognose und PDF-Download.
          </p>
        </div>

        <div className="mx-auto mt-12 max-w-5xl">
          <ErtragsverlustForm />
        </div>

        {/* HOW TO */}
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

        {/* FAQ */}
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

        <BlogTeaser
          preferSlugs={['ertragsverlust-photovoltaik-verschmutzung', 'photovoltaik-reinigung-landwirtschaft-ammoniak', 'pollen-solarmodule-fruehjahr']}
          title="Ausführlich erklärt — vertiefende Artikel"
        />
      </div>
    </main>
  </PublicShell>
  );
}
