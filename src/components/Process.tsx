'use client';

import { motion } from 'framer-motion';

const steps = [
  {
    number: '01',
    title: 'Kostenlose Inspektion',
    description:
      'Schicken Sie uns ein Foto Ihrer Anlage per E-Mail oder WhatsApp. Wir bewerten den Verschmutzungsgrad und beraten Sie unverbindlich.',
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0z" />
      </svg>
    ),
  },
  {
    number: '02',
    title: 'Festpreisangebot',
    description:
      'Innerhalb von 24 Stunden erhalten Sie ein transparentes Festpreisangebot – ohne versteckte Kosten, ohne Überraschungen.',
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
      </svg>
    ),
  },
  {
    number: '03',
    title: 'Professionelle Reinigung',
    description:
      'Am vereinbarten Termin kommen wir mit unserer Drohnentechnik und reinigen Ihre Anlage – schnell, sicher und gr&uuml;ndlich.',
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456z" />
      </svg>
    ),
  },
  {
    number: '04',
    title: 'Foto-Dokumentation',
    description:
      'Nach der Reinigung erhalten Sie ein vollst&auml;ndiges Foto-Protokoll mit Vorher-Nachher-Bildern – ideal f&uuml;r Ihre Buchhaltung und steuerliche Absetzbarkeit.',
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z" />
      </svg>
    ),
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
            <svg
              className="ml-2 h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
              />
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
