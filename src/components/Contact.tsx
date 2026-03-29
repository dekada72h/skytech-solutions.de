'use client';

import { motion } from 'framer-motion';
import {
  MapPinIcon,
  PhoneIcon,
  EnvelopeIcon,
  ClockIcon,
} from './Icons';

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-50px' },
};

export default function Contact() {
  return (
    <section id="kontakt" className="section-padding bg-white">
      <div className="container-width">
        {/* Section Header */}
        <motion.div
          {...fadeInUp}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-2xl text-center"
        >
          <span className="text-sm font-semibold uppercase tracking-wider text-primary-600">
            Kontakt
          </span>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Jetzt kostenloses Angebot anfordern
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            F&uuml;llen Sie das Formular aus und wir melden uns innerhalb von 24
            Stunden bei Ihnen &ndash; garantiert.
          </p>
        </motion.div>

        <div className="mt-16 grid gap-12 lg:grid-cols-5">
          {/* Contact Form */}
          <motion.div
            {...fadeInUp}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-3"
          >
            <form
              action="#"
              method="POST"
              className="rounded-2xl border border-gray-100 bg-gray-50 p-6 shadow-sm sm:p-8"
            >
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="vorname"
                    className="mb-1.5 block text-sm font-medium text-gray-700"
                  >
                    Vorname *
                  </label>
                  <input
                    type="text"
                    id="vorname"
                    name="vorname"
                    required
                    className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 placeholder-gray-400 outline-none transition-all focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20"
                    placeholder="Max"
                  />
                </div>
                <div>
                  <label
                    htmlFor="nachname"
                    className="mb-1.5 block text-sm font-medium text-gray-700"
                  >
                    Nachname *
                  </label>
                  <input
                    type="text"
                    id="nachname"
                    name="nachname"
                    required
                    className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 placeholder-gray-400 outline-none transition-all focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20"
                    placeholder="Mustermann"
                  />
                </div>
              </div>

              <div className="mt-5">
                <label
                  htmlFor="email"
                  className="mb-1.5 block text-sm font-medium text-gray-700"
                >
                  E-Mail-Adresse *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 placeholder-gray-400 outline-none transition-all focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20"
                  placeholder="max@beispiel.de"
                />
              </div>

              <div className="mt-5">
                <label
                  htmlFor="telefon"
                  className="mb-1.5 block text-sm font-medium text-gray-700"
                >
                  Telefonnummer
                </label>
                <input
                  type="tel"
                  id="telefon"
                  name="telefon"
                  className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 placeholder-gray-400 outline-none transition-all focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20"
                  placeholder="+49 151 2345 6789"
                />
              </div>

              <div className="mt-5">
                <label
                  htmlFor="leistung"
                  className="mb-1.5 block text-sm font-medium text-gray-700"
                >
                  Gew&uuml;nschte Leistung *
                </label>
                <select
                  id="leistung"
                  name="leistung"
                  required
                  className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition-all focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20"
                >
                  <option value="">Bitte w&auml;hlen...</option>
                  <option value="solarpark">Solarpark-Reinigung</option>
                  <option value="dachanlage">Dachanlagen-Reinigung</option>
                  <option value="fassade">Fassadenreinigung</option>
                  <option value="sonstiges">Sonstiges</option>
                </select>
              </div>

              <div className="mt-5">
                <label
                  htmlFor="nachricht"
                  className="mb-1.5 block text-sm font-medium text-gray-700"
                >
                  Nachricht
                </label>
                <textarea
                  id="nachricht"
                  name="nachricht"
                  rows={4}
                  className="w-full resize-none rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 placeholder-gray-400 outline-none transition-all focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20"
                  placeholder="Beschreiben Sie kurz Ihr Anliegen..."
                />
              </div>

              <button
                type="submit"
                className="mt-6 w-full rounded-xl bg-primary-600 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-primary-600/25 transition-all hover:bg-primary-700 hover:shadow-xl hover:shadow-primary-600/30 sm:w-auto"
              >
                Anfrage absenden
              </button>
            </form>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            {...fadeInUp}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-2"
          >
            <div className="space-y-6">
              {/* Address */}
              <div className="rounded-2xl border border-gray-100 bg-gray-50 p-6 shadow-sm">
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary-50 text-primary-600">
                    <MapPinIcon className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Adresse</h3>
                    <p className="mt-1 text-sm text-gray-600">
                      Skytech Solutions<br />
                      Inh. Christoph Kik<br />
                      Musterstra&szlig;e 42<br />
                      89073 Ulm, Deutschland
                    </p>
                  </div>
                </div>
              </div>

              {/* Phone */}
              <div className="rounded-2xl border border-gray-100 bg-gray-50 p-6 shadow-sm">
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary-50 text-primary-600">
                    <PhoneIcon className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Telefon</h3>
                    <a
                      href="tel:+4915123456789"
                      className="mt-1 block text-sm text-gray-600 hover:text-primary-600"
                    >
                      +49 151 2345 6789
                    </a>
                  </div>
                </div>
              </div>

              {/* Email */}
              <div className="rounded-2xl border border-gray-100 bg-gray-50 p-6 shadow-sm">
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary-50 text-primary-600">
                    <EnvelopeIcon className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">E-Mail</h3>
                    <a
                      href="mailto:info@skytech-services.de"
                      className="mt-1 block text-sm text-gray-600 hover:text-primary-600"
                    >
                      info@skytech-services.de
                    </a>
                  </div>
                </div>
              </div>

              {/* Hours */}
              <div className="rounded-2xl border border-gray-100 bg-gray-50 p-6 shadow-sm">
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary-50 text-primary-600">
                    <ClockIcon className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">&Ouml;ffnungszeiten</h3>
                    <p className="mt-1 text-sm text-gray-600">
                      Mo &ndash; Fr: 08:00 &ndash; 18:00 Uhr<br />
                      Sa: 09:00 &ndash; 14:00 Uhr
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
