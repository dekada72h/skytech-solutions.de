'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const faqs = [
  {
    question: 'Warum sollte ich meine Solaranlage reinigen lassen?',
    answer:
      'Verschmutzungen wie Vogelkot, Pollen, Staub und Moos können den Ertrag Ihrer Photovoltaikanlage um bis zu 30% reduzieren. Eine professionelle Reinigung stellt die volle Leistungsfähigkeit wieder her und schützt Ihre Investition langfristig.',
  },
  {
    question: 'Wie oft sollte eine PV-Anlage gereinigt werden?',
    answer:
      'Wir empfehlen eine Reinigung alle 1–2 Jahre, je nach Standort und Verschmutzungsgrad. Anlagen in der Nähe von landwirtschaftlichen Betrieben, Autobahnen oder Bäumen verschmutzen schneller und sollten häufiger gereinigt werden.',
  },
  {
    question: 'Werden meine Solarmodule bei der Reinigung beschädigt?',
    answer:
      'Nein. Wir verwenden ausschließlich demineralisiertes Wasser und weiche, speziell für Solarmodule entwickelte Bürsten. Unsere Drohnentechnologie vermeidet zudem mechanischen Druck auf die Module. Die Reinigung ist absolut schonend und herstellerkonform.',
  },
  {
    question: 'Was kostet eine professionelle PV-Reinigung?',
    answer:
      'Die Kosten hängen von der Größe der Anlage, dem Verschmutzungsgrad und der Zugänglichkeit ab. Für Dachanlagen beginnen die Preise bei ca. 2–3 € pro Modul. Fordern Sie ein kostenloses, unverbindliches Angebot an – wir erstellen Ihnen einen individuellen Preis.',
  },
  {
    question: 'Wie funktioniert die Reinigung mit Drohnen?',
    answer:
      'Unsere DJI-Drohnen sind mit speziellen Reinigungsaufsätzen ausgestattet. Sie fliegen die Solarmodule systematisch ab und reinigen sie mit demineralisiertem Wasser. Das ist besonders effizient bei großen Freiflächenanlagen und macht Gerüste oder Hebebühnen überflüssig.',
  },
  {
    question: 'Kann ich meine Solaranlage auch selbst reinigen?',
    answer:
      'Davon raten wir ab. Normales Leitungswasser hinterlässt Kalkflecken, die die Module dauerhaft schädigen können. Zudem besteht bei Dacharbeiten Absturzgefahr. Eine professionelle Reinigung ist sicherer, gründlicher und schont Ihre Module.',
  },
  {
    question: 'In welchen Regionen sind Sie tätig?',
    answer:
      'Wir sind deutschlandweit tätig, mit Schwerpunkt in Baden-Württemberg und Bayern. Für große Solarparks reisen wir auch in andere Bundesländer. Kontaktieren Sie uns – wir finden eine Lösung.',
  },
  {
    question: 'Wie schnell können Sie einen Termin anbieten?',
    answer:
      'In der Regel können wir innerhalb von 1–2 Wochen einen Termin anbieten. Bei dringenden Anfragen bemühen wir uns um eine schnellere Lösung. Nach Ihrer Anfrage melden wir uns innerhalb von 24 Stunden bei Ihnen.',
  },
];

function FAQItem({
  question,
  answer,
  index,
}: {
  question: string;
  answer: string;
  index: number;
}) {
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-30px' }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="border-b border-gray-200 last:border-b-0"
    >
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-start justify-between gap-4 py-5 text-left"
      >
        <span className="text-base font-semibold text-gray-900">{question}</span>
        <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gray-100 text-gray-500 transition-colors hover:bg-primary-50 hover:text-primary-600">
          <svg
            className={`h-4 w-4 transition-transform duration-200 ${open ? 'rotate-45' : ''}`}
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
        </span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <p className="pb-5 pr-12 text-sm leading-relaxed text-gray-600">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function FAQ() {
  return (
    <section id="faq" className="section-padding bg-gray-50">
      <div className="container-width">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-2xl text-center"
        >
          <span className="text-sm font-semibold uppercase tracking-wider text-primary-600">
            FAQ
          </span>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            H&auml;ufig gestellte Fragen
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Hier finden Sie Antworten auf die wichtigsten Fragen rund um unsere
            Dienstleistungen.
          </p>
        </motion.div>

        <div className="mx-auto mt-12 max-w-3xl rounded-2xl border border-gray-100 bg-white px-6 shadow-sm sm:px-8">
          {faqs.map((faq, index) => (
            <FAQItem key={index} question={faq.question} answer={faq.answer} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
