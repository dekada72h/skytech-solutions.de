'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-50px' },
};

export default function RoiCalculator() {
  const [kwp, setKwp] = useState(50);

  // DE market assumptions
  const costPerKwh = 0.35; // Average electricity price in Germany (€/kWh)
  const efficiencyLoss = 0.05; // ~5% loss from soiling
  const sunHours = 1000; // Average annual sun hours in Germany

  const annualLoss = Math.round(kwp * sunHours * costPerKwh * efficiencyLoss);
  const fiveYearLoss = annualLoss * 5;
  const monthlyLoss = Math.round(annualLoss / 12);

  return (
    <section id="rechner" className="section-padding bg-gray-50">
      <div className="container-width">
        {/* Section Header */}
        <motion.div
          {...fadeInUp}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-2xl text-center"
        >
          <span className="text-sm font-semibold uppercase tracking-wider text-primary-600">
            ROI-Rechner
          </span>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Was kosten Sie verschmutzte Module?
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Berechnen Sie, wie viel Ertrag Ihre Anlage durch Verschmutzung
            tats&auml;chlich verliert.
          </p>
        </motion.div>

        <motion.div
          {...fadeInUp}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="mx-auto mt-12 max-w-2xl"
        >
          <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm sm:p-8">
            {/* Slider */}
            <div className="mb-8">
              <div className="flex items-baseline justify-between">
                <label
                  htmlFor="kwp-slider"
                  className="text-sm font-medium text-gray-700"
                >
                  Installierte Leistung
                </label>
                <span className="text-2xl font-extrabold text-primary-600">
                  {kwp} <span className="text-base font-semibold">kWp</span>
                </span>
              </div>
              <input
                id="kwp-slider"
                type="range"
                min={5}
                max={1000}
                step={5}
                value={kwp}
                onChange={(e) => setKwp(Number(e.target.value))}
                className="mt-4 h-2 w-full cursor-pointer appearance-none rounded-full bg-gray-200 accent-primary-600 focus:outline-none"
              />
              <div className="mt-1 flex justify-between text-xs text-gray-400">
                <span>5 kWp</span>
                <span>500 kWp</span>
                <span>1.000 kWp</span>
              </div>
            </div>

            {/* Results */}
            <div className="rounded-xl border border-red-100 bg-red-50 p-6 text-center">
              <div className="flex items-center justify-center gap-2 text-red-700">
                <svg
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.25 6L9 12.75l4.286-4.286a11.948 11.948 0 014.306 6.43l.776 2.898m0 0l3.182-5.511m-3.182 5.51l-5.511-3.181"
                  />
                </svg>
                <span className="text-xs font-bold uppercase tracking-wider">
                  J&auml;hrlicher Ertragsverlust
                </span>
              </div>
              <div className="mt-2 text-5xl font-extrabold text-red-900 sm:text-6xl">
                &minus;{annualLoss.toLocaleString('de-DE')}&nbsp;&euro;
              </div>
              <p className="mt-2 text-sm text-red-600">
                pro Jahr durch verschmutzte Module
              </p>
            </div>

            {/* Detail cards */}
            <div className="mt-6 grid grid-cols-2 gap-4">
              <div className="rounded-xl border border-gray-100 bg-gray-50 p-4 text-center">
                <p className="text-2xl font-bold text-gray-900">
                  {monthlyLoss.toLocaleString('de-DE')}&nbsp;&euro;
                </p>
                <p className="mt-0.5 text-xs text-gray-500">Verlust pro Monat</p>
              </div>
              <div className="rounded-xl border border-gray-100 bg-gray-50 p-4 text-center">
                <p className="text-2xl font-bold text-gray-900">
                  {fiveYearLoss.toLocaleString('de-DE')}&nbsp;&euro;
                </p>
                <p className="mt-0.5 text-xs text-gray-500">Verlust in 5 Jahren</p>
              </div>
            </div>

            {/* Assumptions */}
            <div className="mt-6 rounded-xl border border-primary-100 bg-primary-50 p-4">
              <div className="flex items-start gap-3">
                <svg
                  className="mt-0.5 h-5 w-5 shrink-0 text-primary-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18"
                  />
                </svg>
                <div>
                  <p className="text-sm font-semibold text-primary-900">
                    So rechnen wir
                  </p>
                  <p className="mt-1 text-xs leading-relaxed text-primary-700">
                    Basis: Strompreis 0,35&nbsp;&euro;/kWh, ca. 1.000 Sonnenstunden/Jahr
                    in Deutschland, durchschnittlicher Ertragsverlust von 5% durch
                    Verschmutzung. Je nach Standort und Verschmutzungsgrad kann der
                    tats&auml;chliche Verlust h&ouml;her ausfallen.
                  </p>
                </div>
              </div>
            </div>

            {/* CTA */}
            <div className="mt-6 text-center">
              <a
                href="#kontakt"
                className="inline-flex items-center justify-center rounded-full bg-primary-600 px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-primary-600/25 transition-all hover:bg-primary-700 hover:shadow-xl hover:shadow-primary-600/30"
              >
                Jetzt reinigen lassen &amp; sparen
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
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
