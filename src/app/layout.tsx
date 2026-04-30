// ─────────────────────────────────────────────────────────────────────────
// GŁÓWNY LAYOUT APLIKACJI (Next.js App Router) — wspólny dla każdej strony.
// Tu siedzą: globalne metadane SEO, JSON-LD (schema.org), favicon,
// otwarcie/zamknięcie <html>/<body> oraz wrapper PageTransition (fade
// przy zmianie route'a).
// ─────────────────────────────────────────────────────────────────────────
import type { Metadata } from 'next';
import './globals.css';
import PageTransition from '@/components/animations/PageTransition';

// ── METADATA — domyślne tagi SEO + Open Graph + Twitter + ikony.
//    Dziedziczone przez wszystkie podstrony, każda może nadpisać własną.
export const metadata: Metadata = {
  metadataBase: new URL('https://skytech-solutions.de'),
  title: {
    default:
      'Skytech Solutions – Professionelle Photovoltaik-Reinigung | Drohnenreinigung Deutschland',
    template: '%s | Skytech Solutions',
  },
  description:
    'Steigern Sie den Ertrag Ihrer Solaranlage um bis zu 30%. Professionelle PV-Reinigung mit Drohnentechnologie – ohne Gerüst, umweltfreundlich, mit Foto-Dokumentation. Kostenlose Inspektion & Festpreisangebot in 24h. Jetzt anfragen!',
  keywords: [
    'Photovoltaik Reinigung',
    'PV-Reinigung',
    'Solaranlage reinigen',
    'Solaranlage Reinigung Kosten',
    'Solarpark Reinigung',
    'PV-Anlage reinigen lassen',
    'Photovoltaik Reinigung Drohne',
    'Drohnenreinigung Solar',
    'Solarmodule reinigen',
    'Fassadenreinigung',
    'PV-Reinigung Deutschland',
    'PV-Reinigung Baden-Württemberg',
    'PV-Reinigung Bayern',
    'Solarreinigung Ulm',
    'Ertragsverlust Solaranlage',
    'Skytech Solutions',
  ],
  authors: [{ name: 'Skytech Solutions' }],
  creator: 'Skytech Solutions',
  publisher: 'Skytech Solutions',
  formatDetection: {
    telephone: true,
    email: true,
  },
  alternates: {
    canonical: '/',
  },
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/favicon-256.png', type: 'image/png', sizes: '256x256' },
    ],
    apple: '/apple-touch-icon.png',
  },
  openGraph: {
    title: 'Skytech Solutions – Bis zu 30% mehr Ertrag aus Ihrer Solaranlage',
    description:
      'Professionelle PV-Reinigung mit Drohnentechnologie. Ohne Gerüst, umweltfreundlich, mit Foto-Dokumentation. Kostenloses Angebot in 24h.',
    url: 'https://skytech-solutions.de',
    siteName: 'Skytech Solutions',
    locale: 'de_DE',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Skytech Solutions – Professionelle PV-Reinigung mit Drohnen',
    description:
      'Bis zu 30% mehr Ertrag. Professionelle Reinigung von Solaranlagen und Fassaden in ganz Deutschland.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    // google: 'your-google-verification-code',
  },
};

// ── JSON-LD #1: LocalBusiness — adres, telefon, godziny otwarcia.
//    Pomaga Google'owi pokazać firmę w lokalnych wynikach + Knowledge Panel.
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  '@id': 'https://skytech-solutions.de/#localbusiness',
  name: 'Skytech Solutions',
  description:
    'Professionelle Reinigung von Photovoltaikanlagen, Solarparks und Fassaden mit modernster Drohnentechnologie.',
  url: 'https://skytech-solutions.de',
  telephone: '+4915216991223',
  email: 'krzysztof@aeropro-inspekcje.pl',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Höhenblick 8',
    addressLocality: 'Ulm-Einsingen',
    postalCode: '89079',
    addressCountry: 'DE',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 48.4011,
    longitude: 9.9876,
  },
  areaServed: {
    '@type': 'Country',
    name: 'Deutschland',
  },
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '08:00',
      closes: '18:00',
    },
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: 'Saturday',
      opens: '09:00',
      closes: '14:00',
    },
  ],
  priceRange: '€€',
  serviceType: [
    'Photovoltaik-Reinigung',
    'Solarpark-Reinigung',
    'Fassadenreinigung',
    'Drohnenreinigung',
  ],
};

// ── JSON-LD #2: FAQPage — 5 najczęstszych pytań o czyszczenie PV.
//    Daje rich snippets w SERP (rozwijalne pytania pod tytułem strony).
const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Warum sollte ich meine Solaranlage reinigen lassen?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Verschmutzungen wie Vogelkot, Pollen, Staub und Moos können den Ertrag Ihrer Photovoltaikanlage um bis zu 30% reduzieren. Eine professionelle Reinigung stellt die volle Leistungsfähigkeit wieder her.',
      },
    },
    {
      '@type': 'Question',
      name: 'Wie oft sollte eine PV-Anlage gereinigt werden?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Wir empfehlen eine Reinigung alle 1–2 Jahre, je nach Standort und Verschmutzungsgrad. Anlagen in der Nähe von landwirtschaftlichen Betrieben oder Bäumen sollten häufiger gereinigt werden.',
      },
    },
    {
      '@type': 'Question',
      name: 'Werden meine Solarmodule bei der Reinigung beschädigt?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Nein. Wir verwenden ausschließlich demineralisiertes Wasser und weiche, speziell für Solarmodule entwickelte Bürsten. Unsere Drohnentechnologie vermeidet mechanischen Druck auf die Module.',
      },
    },
    {
      '@type': 'Question',
      name: 'Was kostet eine professionelle PV-Reinigung?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Die Kosten hängen von der Größe der Anlage, dem Verschmutzungsgrad und der Zugänglichkeit ab. Für Dachanlagen beginnen die Preise bei ca. 2–3 € pro Modul.',
      },
    },
    {
      '@type': 'Question',
      name: 'Wie funktioniert die Reinigung mit Drohnen?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Unsere DJI-Drohnen sind mit speziellen Reinigungsaufsätzen ausgestattet. Sie fliegen die Solarmodule systematisch ab und reinigen sie mit demineralisiertem Wasser.',
      },
    },
  ],
};

// ── JSON-LD #3: Service @graph — 3 oferowane usługi powiązane z LocalBusiness
//    przez @id. Pomaga Google'owi rozumieć zakres działalności.
const servicesJsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Service',
      '@id': 'https://skytech-solutions.de/#service-solarpark',
      name: 'Solarpark-Reinigung',
      serviceType: 'Photovoltaik-Reinigung',
      provider: { '@id': 'https://skytech-solutions.de/#localbusiness' },
      areaServed: { '@type': 'Country', name: 'Deutschland' },
      description:
        'Großflächige Reinigung von Photovoltaik-Freiflächenanlagen und Solarparks mit Drohnentechnologie DCS X1 PRO. Bis zu 150 m Arbeitshöhe, demineralisiertes Wasser, ohne Bodenverdichtung.',
      url: 'https://skytech-solutions.de/leistungen',
    },
    {
      '@type': 'Service',
      '@id': 'https://skytech-solutions.de/#service-dachanlagen',
      name: 'Dachanlagen-Reinigung',
      serviceType: 'Photovoltaik-Reinigung',
      provider: { '@id': 'https://skytech-solutions.de/#localbusiness' },
      areaServed: { '@type': 'Country', name: 'Deutschland' },
      description:
        'Professionelle Reinigung von Photovoltaikanlagen auf Privat- und Gewerbedächern – ohne Gerüst, schonend und herstellerkonform.',
      url: 'https://skytech-solutions.de/leistungen',
    },
    {
      '@type': 'Service',
      '@id': 'https://skytech-solutions.de/#service-fassaden',
      name: 'Fassadenreinigung mit Drohne',
      serviceType: 'Gebäudereinigung',
      provider: { '@id': 'https://skytech-solutions.de/#localbusiness' },
      areaServed: { '@type': 'Country', name: 'Deutschland' },
      description:
        'Reinigung von Glas-, Aluminium- und Betonfassaden bis 150 m Höhe mit RO/DI-Wasseraufbereitung. Leistung 1200–2000 m²/h bei Glasfassaden.',
      url: 'https://skytech-solutions.de/leistungen',
    },
  ],
};

// ── ROOTLAYOUT — wrapper renderowany wokół każdej podstrony.
//    Wstrzykuje 3 bloki JSON-LD do <head> i opakowuje content w PageTransition
//    (płynna animacja fade przy nawigacji między routami).
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(servicesJsonLd) }}
        />
      </head>
      <body>
        <PageTransition>{children}</PageTransition>
      </body>
    </html>
  );
}
