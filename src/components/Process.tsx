'use client';

import { motion } from 'framer-motion';
import {
  CameraIcon,
  DocumentTextIcon,
  SparklesIcon,
  ClipboardDocumentListIcon,
  ArrowRightIcon,
} from './Icons';

const steps = [
  {
    number: '01',
    title: 'Kostenlose Inspektion',
    description:
      'Schicken Sie uns ein Foto Ihrer Anlage per E-Mail oder WhatsApp. Wir bewerten den Verschmutzungsgrad und beraten Sie unverbindlich.',
    icon: <CameraIcon className="h-6 w-6" />,
  },
  {
    number: '02',
    title: 'Festpreisangebot',
    description:
      'Innerhalb von 24 Stunden erhalten Sie ein transparentes Festpreisangebot – ohne versteckte Kosten, ohne Überraschungen.',
    icon: <DocumentTextIcon className="h-6 w-6" />,
  },
  {
    number: '03',
    title: 'Professionelle Reinigung',
    description:
      'Am vereinbarten Termin kommen wir mit unserer Drohnentechnik und reinigen Ihre Anlage – schnell, sicher und gr&uuml;ndlich.',
    icon: <SparklesIcon className="h-6 w-6" />,
  },
  {
    number: '04',
    title: 'Foto-Dokumentation',
    description:
      'Nach der Reinigung erhalten Sie ein vollst&auml;ndiges Foto-Protokoll mit Vorher-Nachher-Bildern – ideal f&uuml;r Ihre Buchhaltung und steuerliche Absetzbarkeit.',
    icon: <ClipboardDocumentListIcon className="h-6 w-6" />,
  },
];

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-50px' },
};

export default function Process() {
  return (
    <section id="ablauf" className="section-padding bg-white">
      <div className="container-width">
        {/* Section Header */}
        <motion.div
          {...fadeInUp}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-2xl text-center"
        >
          <span className="text-sm font-semibold uppercase tracking-wider text-primary-600">
            So funktioniert&apos;s
          </span>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            In 4 Schritten zu sauberen Modulen
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Von der ersten Anfrage bis zur fertigen Dokumentation &ndash;
            transparent, planbar und professionell.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative mt-16">
          {/* Connecting line (desktop) */}
          <div className="absolute left-1/2 top-0 hidden h-full w-px -translate-x-1/2 bg-gradient-to-b from-primary-200 via-primary-300 to-primary-200 lg:block" />

          <div className="space-y-8 lg:space-y-0">
            {steps.map((step, index) => {
              const isEven = index % 2 === 0;
              return (
                <motion.div
                  key={step.number}
                  {...fadeInUp}
                  transition={{ duration: 0.5, delay: index * 0.12 }}
                  className="relative lg:flex lg:items-center lg:py-8"
                >
                  {/* Desktop layout: alternating sides */}
                  <div
                    className={`lg:w-1/2 ${isEven ? 'lg:pr-16 lg:text-right' : 'lg:order-2 lg:pl-16'}`}
                  >
                    <div
                      className={`rounded-2xl border border-gray-100 bg-gray-50 p-6 shadow-sm transition-all duration-300 hover:shadow-lg hover:shadow-gray-200/50 ${
                        isEven ? 'lg:ml-auto' : ''
                      } lg:max-w-md`}
                    >
                      <div
                        className={`flex items-center gap-3 ${isEven ? 'lg:flex-row-reverse' : ''}`}
                      >
                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary-50 text-primary-600">
                          {step.icon}
                        </div>
                        <div>
                          <span className="text-xs font-bold uppercase tracking-wider text-primary-500">
                            Schritt {step.number}
                          </span>
                          <h3 className="text-lg font-bold text-gray-900">
                            {step.title}
                          </h3>
                        </div>
                      </div>
                      <p
                        className={`mt-3 text-sm leading-relaxed text-gray-600 ${isEven ? 'lg:text-right' : ''}`}
                        dangerouslySetInnerHTML={{ __html: step.description }}
                      />
                    </div>
                  </div>

                  {/* Center dot (desktop) */}
                  <div className="absolute left-1/2 top-1/2 z-10 hidden -translate-x-1/2 -translate-y-1/2 lg:block">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full border-4 border-white bg-primary-600 text-xs font-bold text-white shadow-lg shadow-primary-600/30">
                      {step.number}
                    </div>
                  </div>

                  {/* Empty space for the other side (desktop) */}
                  <div
                    className={`hidden lg:block lg:w-1/2 ${isEven ? 'lg:order-2' : ''}`}
                  />
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Bottom CTA */}
        <motion.div
          {...fadeInUp}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-12 text-center"
        >
          <a
            href="#kontakt"
            className="inline-flex items-center justify-center rounded-full bg-primary-600 px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-primary-600/25 transition-all hover:bg-primary-700 hover:shadow-xl hover:shadow-primary-600/30"
          >
            Jetzt Foto schicken &amp; Angebot erhalten
            <ArrowRightIcon className="ml-2 h-4 w-4" strokeWidth={2} />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
