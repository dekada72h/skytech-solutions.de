'use client';

import { motion } from 'framer-motion';
import {
  BeakerIcon,
  BoltIcon,
  ShieldCheckIcon,
  ClipboardDocumentListIcon,
} from './Icons';

const stats = [
  {
    icon: <BeakerIcon className="h-6 w-6" />,
    value: '90% weniger',
    title: 'Wasserverbrauch',
    description: 'als bei manueller Reinigung dank pr\u00e4zisem Drohnen-Spr\u00fchsystem',
  },
  {
    icon: <BoltIcon className="h-6 w-6" />,
    value: 'bis zu 30%',
    title: 'Ertragssteigerung',
    description: 'bei stark verschmutzten Anlagen nach professioneller Reinigung',
  },
  {
    icon: <ShieldCheckIcon className="h-6 w-6" />,
    value: '1 Mio. \u20ac',
    title: 'Haftpflichtversicherung',
    description: 'f\u00fcr jeden Drohnenflug \u2013 Ihre Anlage ist vollst\u00e4ndig abgesichert',
  },
  {
    icon: <ClipboardDocumentListIcon className="h-6 w-6" />,
    value: 'Foto-Protokoll',
    title: 'Dokumentation',
    description: 'Vorher-Nachher-Bilder f\u00fcr Ihre Buchhaltung und steuerliche Absetzbarkeit',
  },
];

const partners = [
  'SolarEdge',
  'SMA Solar',
  'Enphase',
  'Fronius',
  'Huawei Solar',
  'SunPower',
];

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-50px' },
};

export default function Trust() {
  return (
    <section id="partner" className="section-padding bg-white">
      <div className="container-width">
        {/* Section Header */}
        <motion.div
          {...fadeInUp}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-2xl text-center"
        >
          <span className="text-sm font-semibold uppercase tracking-wider text-primary-600">
            Fakten &amp; Zahlen
          </span>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Darauf k&ouml;nnen Sie sich verlassen
          </h2>
        </motion.div>

        {/* Stats Grid */}
        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.title}
              {...fadeInUp}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group rounded-2xl border border-gray-100 bg-gradient-to-br from-gray-50 to-white p-6 text-center shadow-sm transition-all duration-300 hover:shadow-lg hover:shadow-gray-200/50"
            >
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-primary-50 text-primary-600 transition-colors group-hover:bg-primary-600 group-hover:text-white">
                {stat.icon}
              </div>
              <p className="mt-4 text-2xl font-extrabold text-gray-900 sm:text-3xl">
                {stat.value}
              </p>
              <p className="mt-1 text-sm font-semibold text-gray-800">
                {stat.title}
              </p>
              <p className="mt-1.5 text-xs leading-relaxed text-gray-500">
                {stat.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Partner Logos */}
        <motion.div
          {...fadeInUp}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-20"
        >
          <p className="text-center text-sm font-medium uppercase tracking-wider text-gray-400">
            Kompatibel mit Modulen f&uuml;hrender Hersteller
          </p>
          <div className="mt-8 grid grid-cols-2 items-center gap-8 sm:grid-cols-3 lg:grid-cols-6">
            {partners.map((partner) => (
              <div
                key={partner}
                className="flex h-16 items-center justify-center rounded-xl border border-gray-100 bg-gray-50 px-4 transition-colors hover:border-gray-200 hover:bg-gray-100"
              >
                <span className="text-sm font-bold text-gray-400 transition-colors hover:text-gray-600">
                  {partner}
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
