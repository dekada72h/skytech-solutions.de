import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://skytech-services.de'),
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
  openGraph: {
    title: 'Skytech Solutions – Bis zu 30% mehr Ertrag aus Ihrer Solaranlage',
    description:
      'Professionelle PV-Reinigung mit Drohnentechnologie. Ohne Gerüst, umweltfreundlich, mit Foto-Dokumentation. Kostenloses Angebot in 24h.',
    url: 'https://skytech-services.de',
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

// JSON-LD structured data for local business SEO
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: 'Skytech Solutions',
  description:
    'Professionelle Reinigung von Photovoltaikanlagen, Solarparks und Fassaden mit modernster Drohnentechnologie.',
  url: 'https://skytech-services.de',
  telephone: '+4915123456789',
  email: 'info@skytech-services.de',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Musterstraße 42',
    addressLocality: 'Ulm',
    postalCode: '89073',
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
      </head>
      <body>{children}</body>
    </html>
  );
}
