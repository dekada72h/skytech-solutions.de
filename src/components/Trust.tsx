'use client';

import { motion } from 'framer-motion';

const stats = [
  { value: '200+', label: 'Zufriedene Kunden' },
  { value: '500+', label: 'Gereinigte Anlagen' },
  { value: '30%', label: 'Mehr Ertrag im Schnitt' },
  { value: '100%', label: 'Umweltfreundlich' },
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
        {/* Stats */}
        <motion.div
          {...fadeInUp}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-2xl text-center"
        >
          <span className="text-sm font-semibold uppercase tracking-wider text-primary-600">
            In Zahlen
          </span>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Ergebnisse, die &uuml;berzeugen
          </h2>
        </motion.div>

        <div className="mt-12 grid grid-cols-2 gap-6 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              {...fadeInUp}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="rounded-2xl border border-gray-100 bg-gradient-to-br from-gray-50 to-white p-6 text-center shadow-sm"
            >
              <p className="text-3xl font-extrabold text-primary-600 sm:text-4xl">
                {stat.value}
              </p>
              <p className="mt-1 text-sm font-medium text-gray-600">
                {stat.label}
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
            Wir arbeiten mit f&uuml;hrenden Herstellern
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
