import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Footer from '@/components/Footer';
import { SunIcon, HomeIcon, BuildingIcon, ArrowRightIcon, PhoneIcon } from '@/components/Icons';

// Compact service preview component for homepage
function ServicePreview() {
  const services = [
    {
      title: 'Solarpark-Reinigung',
      description: 'Großflächige Reinigung mit modernster Drohnentechnologie.',
      icon: <SunIcon className="h-6 w-6" />,
    },
    {
      title: 'Dachanlagen-Reinigung',
      description: 'Professionelle Reinigung für Privat- und Gewerbedächer.',
      icon: <HomeIcon className="h-6 w-6" />,
    },
    {
      title: 'Fassadenreinigung',
      description: 'Reinigung von Glas- und Gebäudefassaden.',
      icon: <BuildingIcon className="h-6 w-6" />,
    },
  ];

  return (
    <section className="section-padding bg-white">
      <div className="container-width">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-wider text-primary-600">
            Unsere Leistungen
          </span>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Professionelle Reinigung für maximale Leistung
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Von großen Solarparks bis hin zu privaten Dachanlagen – wir bieten
            maßgeschneiderte Lösungen für jeden Bedarf.
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <div
              key={service.title}
              className="rounded-2xl border border-gray-100 bg-gray-50 p-6 shadow-sm transition-all duration-300 hover:shadow-md"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary-50 text-primary-600">
                {service.icon}
              </div>
              <h3 className="mt-4 text-lg font-bold text-gray-900">
                {service.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-gray-600">
                {service.description}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <a
            href="/leistungen"
            className="inline-flex items-center text-sm font-semibold text-primary-600 transition-colors hover:text-primary-700"
          >
            Alle Leistungen ansehen
            <ArrowRightIcon className="ml-1 h-4 w-4" strokeWidth={2} />
          </a>
        </div>
      </div>
    </section>
  );
}

// Compact trust/about preview for homepage
function AboutPreview() {
  const highlights = [
    { value: '30%', label: 'Mehr Ertrag' },
    { value: '24h', label: 'Angebot' },
    { value: '100%', label: 'Umweltfreundlich' },
  ];

  return (
    <section className="section-padding bg-gray-50">
      <div className="container-width">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <span className="text-sm font-semibold uppercase tracking-wider text-primary-600">
              Warum Skytech
            </span>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Technologie statt Risiko
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Drohnen statt Gerüst, demineralisiertes Wasser statt Chemie,
              Festpreise statt Überraschungen – so funktioniert moderne
              PV-Reinigung.
            </p>
            <a
              href="/ueber-uns"
              className="mt-6 inline-flex items-center text-sm font-semibold text-primary-600 transition-colors hover:text-primary-700"
            >
              Mehr über uns erfahren
              <ArrowRightIcon className="ml-1 h-4 w-4" strokeWidth={2} />
            </a>
          </div>
          <div className="grid grid-cols-3 gap-4">
            {highlights.map((item) => (
              <div
                key={item.label}
                className="rounded-2xl border border-gray-100 bg-white p-6 text-center shadow-sm"
              >
                <p className="text-3xl font-bold text-primary-600">
                  {item.value}
                </p>
                <p className="mt-1 text-sm text-gray-600">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// Compact CTA for homepage
function HomeCTA() {
  return (
    <section className="section-padding bg-white">
      <div className="container-width">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 px-6 py-16 text-center shadow-2xl shadow-primary-900/20 sm:px-12 sm:py-20">
          <div className="absolute inset-0 opacity-10">
            <div
              className="h-full w-full"
              style={{
                backgroundImage:
                  'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
                backgroundSize: '32px 32px',
              }}
            />
          </div>

          <div className="relative mx-auto max-w-2xl">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Bereit, mehr aus Ihrer Solaranlage herauszuholen?
            </h2>
            <p className="mt-4 text-lg text-primary-100">
              Fordern Sie jetzt Ihr kostenloses und unverbindliches Angebot an.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
              <a
                href="/kontakt"
                className="inline-flex items-center justify-center rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-primary-700 shadow-lg transition-all hover:bg-gray-50 hover:shadow-xl"
              >
                Kostenloses Angebot anfordern
                <ArrowRightIcon className="ml-2 h-4 w-4" strokeWidth={2} />
              </a>
              <a
                href="tel:+4915123456789"
                className="inline-flex items-center justify-center rounded-full border border-white/30 px-7 py-3.5 text-sm font-semibold text-white transition-all hover:bg-white/10"
              >
                <PhoneIcon className="mr-2 h-4 w-4" strokeWidth={2} />
                Jetzt anrufen
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <Hero />
      <ServicePreview />
      <AboutPreview />
      <HomeCTA />
      <Footer />
    </main>
  );
}
