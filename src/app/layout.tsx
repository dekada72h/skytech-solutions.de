import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Skytech Solutions – Professionelle Photovoltaik-Reinigung in Deutschland',
  description:
    'Steigern Sie den Ertrag Ihrer Solaranlage um bis zu 30%. Skytech Solutions bietet professionelle Reinigung von PV-Anlagen, Solarparks und Fassaden mit modernster Drohnentechnologie. Kostenlose Beratung!',
  keywords: [
    'Photovoltaik Reinigung',
    'Solaranlage reinigen',
    'PV-Reinigung Deutschland',
    'Solarpark Reinigung',
    'Fassadenreinigung',
    'Drohnenreinigung Solar',
    'Skytech Solutions',
  ],
  authors: [{ name: 'Skytech Solutions' }],
  openGraph: {
    title: 'Skytech Solutions – Professionelle Photovoltaik-Reinigung',
    description:
      'Steigern Sie den Ertrag Ihrer Solaranlage um bis zu 30%. Professionelle Reinigung mit Drohnentechnologie.',
    url: 'https://skytech-services.de',
    siteName: 'Skytech Solutions',
    locale: 'de_DE',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de">
      <body>{children}</body>
    </html>
  );
}
