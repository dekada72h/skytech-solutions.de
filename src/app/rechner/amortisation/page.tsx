import type { Metadata } from 'next';
import Link from 'next/link';
import AmortisationForm from '@/components/calculators/AmortisationForm';

export const metadata: Metadata = {
  title: 'Amortisations-Rechner | Wann zahlt sich PV-Reinigung aus? — Skytech Solutions',
  description:
    'Kostenloser Online-Rechner: Berechnen Sie, nach wie vielen Monaten sich die Reinigung Ihrer PV-Anlage amortisiert. 5- und 10-Jahres-Prognose.',
  keywords: [
    'Amortisation PV Reinigung', 'ROI Solaranlage Reinigung', 'Wann lohnt sich PV Reinigung',
    'Wirtschaftlichkeit Solar Wartung', 'Solaranlage Investition Rückzahlung',
  ],
  alternates: { canonical: 'https://skytech-solutions.de/rechner/amortisation' },
  openGraph: {
    title: 'Amortisations-Rechner für PV-Reinigung | Skytech Solutions',
    description: 'Wann zahlt sich die Reinigung aus? 5- und 10-Jahres-Prognose mit PDF-Download.',
    url: 'https://skytech-solutions.de/rechner/amortisation',
  },
};

const faqs = [
  {
    q: 'Wann lohnt sich eine PV-Reinigung wirtschaftlich?',
    a: 'In den meisten Fällen amortisiert sich eine professionelle Reinigung innerhalb von 6–18 Monaten. Bei stark verschmutzten Anlagen oft schon nach 3 Monaten.',
  },
  {
    q: 'Wie oft sollte ich reinigen lassen, um den ROI zu maximieren?',
    a: 'Wohngebiete: alle 2–3 Jahre. Landwirtschaft: jährlich. Industrie: jährlich oder häufiger. Wir beraten Sie individuell.',
  },
  {
    q: 'Was passiert bei extrem verschmutzten Anlagen?',
    a: 'Bei langjähriger Verschmutzung kann der Ertragsverlust 20–30% betragen — die Reinigung amortisiert sich dann in wenigen Monaten. Wir messen vor Ort.',
  },
];

const howToSteps = [
  { name: 'Reinigungskosten eingeben', text: 'Geben Sie die geschätzten oder offerierten Reinigungskosten ein.' },
  { name: 'Jährlichen Verlust eingeben', text: 'Wie viel Ertrag verlieren Sie aktuell pro Jahr durch Verschmutzung?' },
  { name: 'Intervall festlegen', text: 'Wählen Sie das Reinigungs-Intervall (z. B. alle 2 Jahre).' },
  { name: 'Prognose ablesen', text: 'Sehen Sie die Amortisationszeit und den 5- bzw. 10-Jahres-Gewinn.' },
];

export default function AmortisationPage() {
  const webAppSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'Amortisations-Rechner für PV-Reinigung',
    url: 'https://skytech-solutions.de/rechner/amortisation',
    applicationCategory: 'CalculatorApplication',
    operatingSystem: 'Web',
    description: 'Berechnung der Amortisationszeit für die professionelle Reinigung von PV-Anlagen.',
    offers: { '@type': 'Offer', price: 0, priceCurrency: 'EUR' },
    inLanguage: 'de-DE',
  };
  const howToSchema = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: 'Amortisation einer PV-Reinigung berechnen',
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
            Amortisations-<span className="text-primary-600">Rechner</span>
          </h1>
          <p className="mt-4 text-lg text-gray-600">
            Nach wie vielen Monaten zahlt sich eine Reinigung aus? Sehen Sie die 5- und
            10-Jahres-Prognose und treffen Sie die richtige Entscheidung.
          </p>
        </div>

        <div className="mx-auto mt-12 max-w-5xl">
          <AmortisationForm />
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
