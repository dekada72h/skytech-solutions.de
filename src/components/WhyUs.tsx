'use client';

import { motion } from 'framer-motion';

const advantages = [
  {
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
      </svg>
    ),
    title: 'DJI Drohnentechnologie',
    description:
      'Wir setzen auf modernste DJI-Drohnen für eine schnelle, gründliche und schonende Reinigung – auch an schwer zugänglichen Stellen.',
  },
  {
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
      </svg>
    ),
    title: 'Kein Gerüst nötig',
    description:
      'Unsere Drohnen erreichen jede Höhe, ohne dass teure und zeitaufwändige Gerüste aufgebaut werden müssen. Das spart Zeit und Geld.',
  },
  {
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17l-5.384 3.174a1 1 0 01-1.45-1.055l1.028-5.993-4.355-4.245a1 1 0 01.555-1.706l6.018-.874L10.53 0a1 1 0 011.794 0l2.696 5.467 6.018.874a1 1 0 01.555 1.706l-4.355 4.245 1.028 5.993a1 1 0 01-1.45 1.055L11.42 15.17z" />
      </svg>
    ),
    title: 'Maximale Sicherheit',
    description:
      'Keine Arbeiter auf dem Dach – kein Unfallrisiko. Unsere Methode ist die sicherste Art, Ihre PV-Anlage professionell zu reinigen.',
  },
  {
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23.693L5 14.5m14.8.8l1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0112 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5" />
      </svg>
    ),
    title: 'Umweltfreundlich',
    description:
      'Wir verwenden ausschließlich biologisch abbaubare Reinigungsmittel und demineralisiertes Wasser. Gut für Ihre Anlage und die Umwelt.',
  },
  {
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: 'Schnelle Abwicklung',
    description:
      'Dank unserer Drohnentechnologie reinigen wir große Flächen in Rekordzeit. Minimale Ausfallzeit, maximaler Ertrag.',
  },
  {
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z" />
      </svg>
    ),
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
