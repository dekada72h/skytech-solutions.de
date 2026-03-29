'use client';

import { motion } from 'framer-motion';
import {
  PaperAirplaneIcon,
  ShieldCheckIcon,
  StarIcon,
  BeakerIcon,
  ClockIcon,
  BanknotesIcon,
} from './Icons';

const advantages = [
  {
    icon: <PaperAirplaneIcon className="h-6 w-6" />,
    title: 'DJI Drohnentechnologie',
    description:
      'Wir setzen auf modernste DJI-Drohnen für eine schnelle, gründliche und schonende Reinigung – auch an schwer zugänglichen Stellen.',
  },
  {
    icon: <ShieldCheckIcon className="h-6 w-6" />,
    title: 'Kein Gerüst nötig',
    description:
      'Unsere Drohnen erreichen jede Höhe, ohne dass teure und zeitaufwändige Gerüste aufgebaut werden müssen. Das spart Zeit und Geld.',
  },
  {
    icon: <StarIcon className="h-6 w-6" />,
    title: 'Maximale Sicherheit',
    description:
      'Keine Arbeiter auf dem Dach – kein Unfallrisiko. Unsere Methode ist die sicherste Art, Ihre PV-Anlage professionell zu reinigen.',
  },
  {
    icon: <BeakerIcon className="h-6 w-6" />,
    title: 'Umweltfreundlich',
    description:
      'Wir verwenden ausschließlich biologisch abbaubare Reinigungsmittel und demineralisiertes Wasser. Gut für Ihre Anlage und die Umwelt.',
  },
  {
    icon: <ClockIcon className="h-6 w-6" />,
    title: 'Schnelle Abwicklung',
    description:
      'Dank unserer Drohnentechnologie reinigen wir große Flächen in Rekordzeit. Minimale Ausfallzeit, maximaler Ertrag.',
  },
  {
    icon: <BanknotesIcon className="h-6 w-6" />,
    title: 'Faire Preise',
    description:
      'Transparente Preisgestaltung ohne versteckte Kosten. Wir erstellen Ihnen ein individuelles Angebot, das zu Ihrem Budget passt.',
  },
];

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-50px' },
};

export default function WhyUs() {
  return (
    <section id="vorteile" className="section-padding bg-gray-50">
      <div className="container-width">
        {/* Section Header */}
        <motion.div
          {...fadeInUp}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-2xl text-center"
        >
          <span className="text-sm font-semibold uppercase tracking-wider text-primary-600">
            Warum Skytech
          </span>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Technologie statt Risiko
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Drohnen statt Ger&uuml;st, demineralisiertes Wasser statt Chemie,
            Festpreise statt &Uuml;berraschungen &ndash; so funktioniert
            moderne PV-Reinigung.
          </p>
        </motion.div>

        {/* Advantages Grid */}
        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {advantages.map((item, index) => (
            <motion.div
              key={item.title}
              {...fadeInUp}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-lg hover:shadow-gray-200/50"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary-50 text-primary-600">
                {item.icon}
              </div>
              <h3 className="mt-4 text-lg font-bold text-gray-900">
                {item.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-gray-600">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
