'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { services } from '@/data/services';

const cardImages: Record<string, string> = {
  'solarpark-reinigung':
    'https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?w=600&h=400&fit=crop',
  'dachanlagen-reinigung':
    'https://images.unsplash.com/photo-1637417494521-78b4d1d33029?w=600&h=400&fit=crop',
  fassadenreinigung:
    'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&h=400&fit=crop',
};

const cardDescriptions: Record<string, string> = {
  'solarpark-reinigung':
    'Großflächige Reinigung von Photovoltaik-Freiflächenanlagen und Solarparks mit modernster Drohnentechnologie. Effizient, schnell und ohne Bodenverdichtung.',
  'dachanlagen-reinigung':
    'Professionelle Reinigung von Photovoltaikanlagen auf Privat- und Gewerbedächern. Schonend für Ihre Module, ganz ohne Gerüst.',
  fassadenreinigung:
    'Reinigung von Glas-, Aluminium- und Betonfassaden bis 150 m mit RO/DI-Wasseraufbereitung. Ohne Hubsteiger und ohne Verkehrssperrung.',
};

const icons: Record<string, React.ReactNode> = {
  'solarpark-reinigung': (
    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
    </svg>
  ),
  'dachanlagen-reinigung': (
    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
    </svg>
  ),
  fassadenreinigung: (
    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21" />
    </svg>
  ),
};

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-50px' },
};

export default function Services() {
  return (
    <section id="leistungen" className="section-padding bg-white">
      <div className="container-width">
        {/* Section Header */}
        <motion.div
          {...fadeInUp}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-3xl text-center"
        >
          <span className="text-sm font-semibold uppercase tracking-wider text-primary-600">
            Unsere Leistungen
          </span>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Professioneller Service f&uuml;r maximale Leistung
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Von gro&szlig;en Solarparks bis hin zu privaten Dachanlagen &ndash; wir
            bieten ma&szlig;geschneiderte L&ouml;sungen f&uuml;r jeden Bedarf.
            Sie k&ouml;nnen sowohl bei Einzelauftr&auml;gen als auch bei
            Abo-Dienstleistungen <strong className="text-primary-600">PREMIUM</strong> mit
            uns zusammenarbeiten.
          </p>
        </motion.div>

        {/* "Rund um das Thema" highlight block */}
        <motion.div
          {...fadeInUp}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="mx-auto mt-12 max-w-4xl"
        >
          <div className="rounded-2xl border border-primary-100 bg-gradient-to-br from-primary-50 to-white p-8 text-center shadow-sm sm:p-10">
            <h3 className="text-2xl font-bold uppercase tracking-wide text-primary-800 sm:text-3xl">
              Rund um das Thema Ihre Fassade und Photovoltaikmodule
            </h3>
            <p className="mt-4 text-lg font-medium text-gray-700 sm:text-xl">
              Alles, was Sie f&uuml;r Ihre Fassaden und Photovoltaikmodule ben&ouml;tigen.
            </p>
            <p className="mt-3 text-base text-gray-600 sm:text-lg">
              Von umfassenden W&auml;rmebildaufnahmen mit Bericht bis hin zu
              Reinigungsdiensten bis zu 150 Meter H&ouml;he &ndash; Geb&auml;ude und Hallen,
              egal ob Glasfl&auml;chen, Metallkonstruktionen oder
              Au&szlig;enfassaden mit unterschiedlichsten Betonstrukturen.
            </p>

            <div className="mt-8 mx-auto max-w-sm">
              <div className="overflow-hidden rounded-xl shadow-lg">
                <div className="relative aspect-[9/16]">
                  <iframe
                    src="https://www.youtube.com/embed/8tCdhsJYO0o?autoplay=0&rel=0&modestbranding=1"
                    title="Drohnenreinigung — illustratives Video"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    loading="lazy"
                    className="absolute inset-0 h-full w-full border-0"
                  />
                </div>
              </div>
              <p className="mt-3 text-center text-xs text-gray-500 italic">
                Illustratives Video von einem Drittanbieter (YouTube). Stellt nicht unsere eigene Aufnahme dar — dient lediglich der Veranschaulichung der Drohnenreinigungstechnologie.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Services Grid */}
        <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <motion.article
              key={service.slug}
              {...fadeInUp}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition-all duration-300 hover:shadow-xl hover:shadow-gray-200/50"
            >
              <Link href={`/leistungen/${service.slug}`} className="block">
                <div className="relative h-52 overflow-hidden">
                  <Image
                    src={cardImages[service.slug]}
                    alt={service.navLabel}
                    width={600}
                    height={400}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                  {service.badge && (
                    <span className="absolute right-3 top-3 rounded-full bg-accent-500 px-3 py-1 text-xs font-semibold text-white">
                      {service.badge}
                    </span>
                  )}
                </div>

                <div className="p-6">
                  <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-lg bg-primary-50 text-primary-600">
                    {icons[service.slug]}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">
                    {service.navLabel}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-gray-600">
                    {cardDescriptions[service.slug]}
                  </p>
                  <span className="mt-4 inline-flex items-center text-sm font-semibold text-primary-600 transition-colors group-hover:text-primary-700">
                    Mehr erfahren
                    <svg
                      className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                    </svg>
                  </span>
                </div>
              </Link>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
