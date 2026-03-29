'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { SunIcon, HomeIcon, BuildingIcon, ArrowRightIcon } from '@/components/Icons';

const services = [
  {
    title: 'Solarpark-Reinigung',
    description:
      'Großflächige Reinigung von Photovoltaik-Freiflächenanlagen und Solarparks mit modernster Drohnentechnologie. Effizient, schnell und ohne Bodenverdichtung.',
    image:
      'https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?w=600&h=400&fit=crop',
    icon: <SunIcon className="h-6 w-6" />,
    badge: 'Beliebteste Leistung',
  },
  {
    title: 'Dachanlagen-Reinigung',
    description:
      'Professionelle Reinigung von Photovoltaikanlagen auf Privat- und Gewerbe&shy;dächern. Schonend für Ihre Module, maximal im Ergebnis &ndash; ganz ohne Gerüst.',
    image:
      'https://images.unsplash.com/photo-1558449028-b53a39d100fc?w=600&h=400&fit=crop',
    icon: <HomeIcon className="h-6 w-6" />,
    badge: null,
  },
  {
    title: 'Fassadenreinigung',
    description:
      'Reinigung von Glas- und Gebäudefassaden mit umwelt&shy;freundlichen Methoden. Wir bringen Ihr Gebäude wieder zum Strahlen &ndash; professionell und sicher.',
    image:
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&h=400&fit=crop',
    icon: <BuildingIcon className="h-6 w-6" />,
    badge: null,
  },
];

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
          className="mx-auto max-w-2xl text-center"
        >
          <span className="text-sm font-semibold uppercase tracking-wider text-primary-600">
            Unsere Leistungen
          </span>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Professionelle Reinigung f&uuml;r maximale Leistung
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Von gro&szlig;en Solarparks bis hin zu privaten Dachanlagen &ndash; wir
            bieten ma&szlig;geschneiderte L&ouml;sungen f&uuml;r jeden Bedarf.
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              {...fadeInUp}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition-all duration-300 hover:shadow-xl hover:shadow-gray-200/50"
            >
              {/* Image */}
              <div className="relative h-52 overflow-hidden">
                <Image
                  src={service.image}
                  alt={service.title}
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

              {/* Content */}
              <div className="p-6">
                <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-lg bg-primary-50 text-primary-600">
                  {service.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900">
                  {service.title}
                </h3>
                <p
                  className="mt-2 text-sm leading-relaxed text-gray-600"
                  dangerouslySetInnerHTML={{ __html: service.description }}
                />
                <Link
                  href="/kontakt"
                  className="mt-4 inline-flex items-center text-sm font-semibold text-primary-600 transition-colors hover:text-primary-700"
                >
                  Mehr erfahren
                  <ArrowRightIcon
                    className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1"
                    strokeWidth={2}
                  />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
