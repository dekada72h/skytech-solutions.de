'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useEffect, useState } from 'react';

const dcsBaseParagraphs = [
  'Wir basieren auf einer umfassenden Pumpen- und Wasseraufbereitungstechnologie der Firma DCS (Drone Cleaning Solutions), die mit modernster Drohnentechnologie integriert ist. Dank unserer gesammelten Erfahrung wurden die DCS-Lösungen mit den neuesten, auf dem internationalen Markt verfügbaren Technologien im Bereich der Reinigung und Pflege von Photovoltaikmodulen sowie Gebäudefassaden unterschiedlichster Struktur kombiniert.',
  'Die Lösungen, auf denen unsere Tätigkeit basiert, sind sicher, effizient und wirtschaftlich. Sie sind sowohl umweltfreundlich als auch sicher für den Menschen und lassen sich flexibel an unterschiedliche Projekte und Arbeitsbedingungen anpassen. Unsere eingesetzten Systeme wurden speziell für den Einsatz an großen und schwer zugänglichen Objekten entwickelt, bei denen herkömmliche Methoden eine aufwendige Logistik und Arbeiten in großen Höhen erfordern.',
  'Das System DCS X1 PRO ist eine integrierte hydraulische Plattform, die sowohl im mobilen/geländebasierten Einsatz als auch im Anschluss an das städtische Wassernetz genutzt werden kann. Die technische Konfiguration ist kompatibel mit der industriellen Drohne DJI Matrice 400. Durch den Einsatz ultraleichter Schläuche und einer Carbonkonstruktion ist es möglich, eine bisher unerreichte Arbeitshöhe von bis zu 150 m zu erreichen.',
];

const fassadenExtraParagraph =
  'Das System wird vor allem bei Glas- und Aluminiumfassaden eingesetzt, bei denen die Kontrolle des Wasserdrucks sowie der Einsatz von demineralisiertem Wasser entscheidend sind, um Streifenbildung und mineralische Rückstände zu vermeiden. Dank der Integration der RO/DI-Technologie (Umkehrosmose und Deionisierung – zur vollständigen Entfernung von Mineralien und Rückständen) sowie der Wassererwärmung auf bis zu 60 °C ermöglicht die Plattform eine effektive Entfernung sowohl von üblichen atmosphärischen Verschmutzungen, Vogelkot als auch von industriellen Verunreinigungen und fettigen Ablagerungen.';

const fassadenSpecs = [
  ['LEISTUNG', '1200–2000 m²/h bei Glasfassaden'],
  ['Betriebsdruck', 'bis zu 155 bar'],
  ['Pufferspeicher', '550 l'],
  ['Maximale Windgeschwindigkeit', 'bis zu 50 km/h'],
  ['Maximale Arbeitshöhe', 'bis zu 150 m'],
];

const fassadenFooterNote =
  'Bei fehlender Anschlussmöglichkeit an das städtische Wassernetz nutzen wir zusätzlich externe Wassertanks mit einem Fassungsvermögen von 1000 l.';

type ServiceDetails = {
  paragraphs: string[];
  specs?: { label: string; value: string }[];
  extraParagraph?: string;
  footerNote?: string;
};

const services: {
  title: string;
  description: string;
  image: string;
  icon: React.ReactNode;
  badge: string | null;
  details: ServiceDetails;
}[] = [
  {
    title: 'Solarpark-Reinigung',
    description:
      'Gro&szlig;fl&auml;chige Reinigung von Photovoltaik-Freifl&auml;chenanlagen und Solarparks mit modernster Drohnentechnologie. Effizient, schnell und ohne Bodenverdichtung. <strong>Wir verwenden ausschlie&szlig;lich umweltfreundliche und oberfl&auml;chenschonende Reinigungsmittel.</strong>',
    image:
      'https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?w=600&h=400&fit=crop',
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
      </svg>
    ),
    badge: 'Beliebteste Leistung',
    details: { paragraphs: dcsBaseParagraphs },
  },
  {
    title: 'Dachanlagen-Reinigung',
    description:
      'Professionelle Reinigung von Photovoltaikanlagen auf Privat- und Gewerbe&shy;d&auml;chern. Schonend f&uuml;r Ihre Module, maximal im Ergebnis &ndash; ganz ohne Ger&uuml;st. <strong>Wir verwenden ausschlie&szlig;lich umweltfreundliche und oberfl&auml;chenschonende Reinigungsmittel.</strong>',
    image:
      'https://images.unsplash.com/photo-1637417494521-78b4d1d33029?w=600&h=400&fit=crop',
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
      </svg>
    ),
    badge: null,
    details: { paragraphs: dcsBaseParagraphs },
  },
  {
    title: 'Fassadenreinigung',
    description:
      'Reinigung von Glas- und Geb&auml;udefassaden mit umwelt&shy;freundlichen Methoden. Wir bringen Ihr Geb&auml;ude wieder zum Strahlen &ndash; professionell und sicher. <strong>Wir verwenden ausschlie&szlig;lich umweltfreundliche und oberfl&auml;chenschonende Reinigungsmittel.</strong>',
    image:
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&h=400&fit=crop',
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21" />
      </svg>
    ),
    badge: null,
    details: {
      paragraphs: dcsBaseParagraphs,
      extraParagraph: fassadenExtraParagraph,
      specs: fassadenSpecs.map(([label, value]) => ({ label, value })),
      footerNote: fassadenFooterNote,
    },
  },
];

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-50px' },
};

export default function Services() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  useEffect(() => {
    if (openIndex === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpenIndex(null);
    };
    document.addEventListener('keydown', onKey);
    const original = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = original;
    };
  }, [openIndex]);

  const active = openIndex !== null ? services[openIndex] : null;

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

        {/* Rund um das Thema Section */}
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

            {/* Drone Cleaning Video — external, illustrative */}
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
                <button
                  type="button"
                  onClick={() => setOpenIndex(index)}
                  aria-haspopup="dialog"
                  aria-expanded={openIndex === index}
                  className="mt-4 inline-flex items-center text-sm font-semibold text-primary-600 transition-colors hover:text-primary-700"
                >
                  Mehr erfahren
                  <svg
                    className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1"
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
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {active && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="service-detail-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
        >
          <button
            type="button"
            aria-label="Schließen"
            onClick={() => setOpenIndex(null)}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />
          <div className="relative z-10 w-full max-w-2xl overflow-hidden rounded-2xl bg-white shadow-2xl">
            <div className="flex items-start justify-between gap-4 border-b border-gray-100 px-6 py-4 sm:px-8">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-50 text-primary-600">
                  {active.icon}
                </div>
                <h3
                  id="service-detail-title"
                  className="text-lg font-bold text-gray-900 sm:text-xl"
                >
                  {active.title}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setOpenIndex(null)}
                aria-label="Schließen"
                className="rounded-full p-1.5 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-700"
              >
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="max-h-[70vh] space-y-4 overflow-y-auto px-6 py-6 text-sm leading-relaxed text-gray-700 sm:px-8 sm:text-base">
              {active.details.paragraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
              {active.details.extraParagraph && (
                <p>{active.details.extraParagraph}</p>
              )}
              {active.details.specs && (
                <ul className="rounded-xl bg-gray-50 p-4 text-sm sm:p-5">
                  {active.details.specs.map((spec) => (
                    <li
                      key={spec.label}
                      className="flex flex-col gap-0.5 border-b border-gray-200 py-2 last:border-0 sm:flex-row sm:justify-between sm:gap-4"
                    >
                      <span className="font-semibold text-gray-900">
                        {spec.label}
                      </span>
                      <span className="text-gray-700">{spec.value}</span>
                    </li>
                  ))}
                </ul>
              )}
              {active.details.footerNote && (
                <p className="text-sm italic text-gray-600">
                  {active.details.footerNote}
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
