'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/* ------------------------------------------------------------------ */
/*  Data & types                                                       */
/* ------------------------------------------------------------------ */

type Environment = 'wohngebiet' | 'landwirtschaft' | 'industrie' | 'wald';
type LastCleaning = 'nie' | 'ueber3' | '1bis2' | 'unter1';

const environments: {
  id: Environment;
  label: string;
  description: string;
  soilRate: number; // annual efficiency loss %
  icon: JSX.Element;
}[] = [
  {
    id: 'wohngebiet',
    label: 'Wohngebiet',
    description: 'Wenig Staub, kaum Verschmutzung',
    soilRate: 0.04,
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
      </svg>
    ),
  },
  {
    id: 'landwirtschaft',
    label: 'Landwirtschaft',
    description: 'Pollen, Staub, D\u00fcnger in der N\u00e4he',
    soilRate: 0.08,
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
      </svg>
    ),
  },
  {
    id: 'industrie',
    label: 'Industrie / Autobahn',
    description: 'Ru\u00df, Feinstaub, Abgase',
    soilRate: 0.07,
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21" />
      </svg>
    ),
  },
  {
    id: 'wald',
    label: 'B\u00e4ume / V\u00f6gel',
    description: 'Vogelkot, Laub, Harz, Moos',
    soilRate: 0.10,
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
      </svg>
    ),
  },
];

const lastCleaningOptions: {
  id: LastCleaning;
  label: string;
  multiplier: number; // multiplied against soilRate for accumulated loss
}[] = [
  { id: 'nie', label: 'Noch nie', multiplier: 3.0 },
  { id: 'ueber3', label: 'Vor \u00fcber 3 Jahren', multiplier: 2.5 },
  { id: '1bis2', label: 'Vor 1\u20132 Jahren', multiplier: 1.5 },
  { id: 'unter1', label: 'Vor < 1 Jahr', multiplier: 1.0 },
];

const COST_PER_KWH = 0.35;
const SUN_HOURS = 1000;
const CLEANING_COST_PER_KWP = 2.5; // €/kWp per cleaning
const MIN_CLEANING_COST = 150; // minimum per visit

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

function fmt(n: number) {
  return n.toLocaleString('de-DE');
}

function getCleaningFrequencyAdvice(env: Environment): { recommended: number; label: string } {
  switch (env) {
    case 'wohngebiet':
      return { recommended: 1, label: '1\u00d7 pro Jahr' };
    case 'landwirtschaft':
    case 'wald':
      return { recommended: 2, label: '2\u00d7 pro Jahr' };
    case 'industrie':
      return { recommended: 2, label: '1\u20132\u00d7 pro Jahr' };
  }
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-50px' },
};

export default function RoiCalculator() {
  const [kwp, setKwp] = useState(50);
  const [env, setEnv] = useState<Environment>('wohngebiet');
  const [lastCleaning, setLastCleaning] = useState<LastCleaning>('1bis2');

  const results = useMemo(() => {
    const envData = environments.find((e) => e.id === env)!;
    const cleaningData = lastCleaningOptions.find((o) => o.id === lastCleaning)!;

    const annualSoilRate = envData.soilRate;
    const currentLossRate = Math.min(annualSoilRate * cleaningData.multiplier, 0.30);

    const annualProduction = kwp * SUN_HOURS; // kWh
    const annualRevenue = annualProduction * COST_PER_KWH;

    // Current annual loss at accumulated soiling
    const currentAnnualLoss = Math.round(annualRevenue * currentLossRate);

    // What regular cleaning would recover
    // With 1x/year: average soiling = soilRate/2 (cleaned midway)
    // With 2x/year: average soiling = soilRate/4
    const avgSoiling1x = annualSoilRate / 2;
    const avgSoiling2x = annualSoilRate / 4;

    const loss1x = Math.round(annualRevenue * avgSoiling1x);
    const loss2x = Math.round(annualRevenue * avgSoiling2x);

    const cleaningCost = Math.max(kwp * CLEANING_COST_PER_KWP, MIN_CLEANING_COST);
    const cleaningCost1x = Math.round(cleaningCost);
    const cleaningCost2x = Math.round(cleaningCost * 2 * 0.85); // 15% discount for 2x

    const savings1x = currentAnnualLoss - loss1x - cleaningCost1x;
    const savings2x = currentAnnualLoss - loss2x - cleaningCost2x;

    const roi1x = cleaningCost1x > 0 ? Math.round(((currentAnnualLoss - loss1x) / cleaningCost1x) * 100) : 0;
    const roi2x = cleaningCost2x > 0 ? Math.round(((currentAnnualLoss - loss2x) / cleaningCost2x) * 100) : 0;

    const lossPercent = Math.round(currentLossRate * 100);
    const advice = getCleaningFrequencyAdvice(env);

    return {
      currentAnnualLoss,
      currentMonthlyLoss: Math.round(currentAnnualLoss / 12),
      lossPercent,
      loss1x,
      loss2x,
      cleaningCost1x,
      cleaningCost2x,
      savings1x,
      savings2x,
      roi1x,
      roi2x,
      advice,
      fiveYearLoss: currentAnnualLoss * 5,
    };
  }, [kwp, env, lastCleaning]);

  return (
    <section id="rechner" className="section-padding bg-gray-50">
      <div className="container-width">
        {/* Header */}
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
            Drei Angaben gen&uuml;gen &ndash; und Sie sehen sofort, wie viel
            Ertrag Sie verschenken und was eine Reinigung bringt.
          </p>
        </motion.div>

        <motion.div
          {...fadeInUp}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="mx-auto mt-12 max-w-3xl"
        >
          <div className="rounded-2xl border border-gray-100 bg-white shadow-sm">
            {/* ── INPUTS ── */}
            <div className="space-y-8 p-6 sm:p-8">
              {/* 1. kWp Slider */}
              <div>
                <div className="flex items-baseline justify-between">
                  <label htmlFor="kwp-slider" className="text-sm font-semibold text-gray-900">
                    <span className="mr-2 inline-flex h-6 w-6 items-center justify-center rounded-full bg-primary-100 text-xs font-bold text-primary-700">
                      1
                    </span>
                    Anlagengr&ouml;&szlig;e
                  </label>
                  <span className="text-2xl font-extrabold text-primary-600">
                    {fmt(kwp)}{' '}
                    <span className="text-base font-semibold">kWp</span>
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

              {/* 2. Environment */}
              <div>
                <p className="mb-3 text-sm font-semibold text-gray-900">
                  <span className="mr-2 inline-flex h-6 w-6 items-center justify-center rounded-full bg-primary-100 text-xs font-bold text-primary-700">
                    2
                  </span>
                  Standort der Anlage
                </p>
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                  {environments.map((e) => (
                    <button
                      key={e.id}
                      onClick={() => setEnv(e.id)}
                      className={`rounded-xl border-2 p-3 text-left transition-all ${
                        env === e.id
                          ? 'border-primary-500 bg-primary-50 shadow-sm'
                          : 'border-gray-100 bg-gray-50 hover:border-gray-200'
                      }`}
                    >
                      <div
                        className={`mb-2 flex h-9 w-9 items-center justify-center rounded-lg ${
                          env === e.id
                            ? 'bg-primary-100 text-primary-600'
                            : 'bg-gray-100 text-gray-500'
                        }`}
                      >
                        {e.icon}
                      </div>
                      <p
                        className={`text-xs font-bold ${
                          env === e.id ? 'text-primary-900' : 'text-gray-700'
                        }`}
                      >
                        {e.label}
                      </p>
                      <p className="mt-0.5 text-[10px] leading-tight text-gray-500">
                        {e.description}
                      </p>
                    </button>
                  ))}
                </div>
              </div>

              {/* 3. Last cleaning */}
              <div>
                <p className="mb-3 text-sm font-semibold text-gray-900">
                  <span className="mr-2 inline-flex h-6 w-6 items-center justify-center rounded-full bg-primary-100 text-xs font-bold text-primary-700">
                    3
                  </span>
                  Letzte Reinigung
                </p>
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                  {lastCleaningOptions.map((o) => (
                    <button
                      key={o.id}
                      onClick={() => setLastCleaning(o.id)}
                      className={`rounded-xl border-2 px-3 py-3 text-center transition-all ${
                        lastCleaning === o.id
                          ? 'border-primary-500 bg-primary-50 font-bold text-primary-900 shadow-sm'
                          : 'border-gray-100 bg-gray-50 text-gray-700 hover:border-gray-200'
                      }`}
                    >
                      <p className="text-sm">{o.label}</p>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* ── DIVIDER ── */}
            <div className="border-t border-gray-100" />

            {/* ── RESULTS ── */}
            <AnimatePresence mode="wait">
              <motion.div
                key={`${kwp}-${env}-${lastCleaning}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="space-y-6 p-6 sm:p-8"
              >
                {/* Current loss banner */}
                <div className="rounded-xl border border-red-100 bg-red-50 p-5 text-center sm:p-6">
                  <div className="flex items-center justify-center gap-2 text-red-700">
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                    </svg>
                    <span className="text-xs font-bold uppercase tracking-wider">
                      Ihr aktueller Ertragsverlust
                    </span>
                  </div>
                  <div className="mt-2 text-4xl font-extrabold text-red-900 sm:text-5xl">
                    &minus;{fmt(results.currentAnnualLoss)}&nbsp;&euro;
                    <span className="text-lg font-semibold text-red-600"> / Jahr</span>
                  </div>
                  <p className="mt-1 text-sm text-red-600">
                    ca. {results.lossPercent}% Leistungsverlust &middot;{' '}
                    {fmt(results.currentMonthlyLoss)}&nbsp;&euro; pro Monat &middot;{' '}
                    {fmt(results.fiveYearLoss)}&nbsp;&euro; in 5 Jahren
                  </p>
                </div>

                {/* Comparison table */}
                <div>
                  <p className="mb-3 text-sm font-semibold text-gray-900">
                    Vergleich: Was bringt regelm&auml;&szlig;ige Reinigung?
                  </p>
                  <div className="overflow-hidden rounded-xl border border-gray-200">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="bg-gray-50 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                          <th className="px-4 py-3">&nbsp;</th>
                          <th className="px-4 py-3 text-center">Ohne Reinigung</th>
                          <th className="px-4 py-3 text-center">1&times; / Jahr</th>
                          <th className="border-l-2 border-primary-200 bg-primary-50 px-4 py-3 text-center text-primary-700">
                            2&times; / Jahr
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100">
                        <tr>
                          <td className="px-4 py-3 font-medium text-gray-700">Ertragsverlust</td>
                          <td className="px-4 py-3 text-center font-semibold text-red-600">
                            {fmt(results.currentAnnualLoss)}&nbsp;&euro;
                          </td>
                          <td className="px-4 py-3 text-center text-gray-700">{fmt(results.loss1x)}&nbsp;&euro;</td>
                          <td className="border-l-2 border-primary-200 bg-primary-50/50 px-4 py-3 text-center text-gray-700">
                            {fmt(results.loss2x)}&nbsp;&euro;
                          </td>
                        </tr>
                        <tr>
                          <td className="px-4 py-3 font-medium text-gray-700">Reinigungskosten</td>
                          <td className="px-4 py-3 text-center text-gray-400">&mdash;</td>
                          <td className="px-4 py-3 text-center text-gray-700">{fmt(results.cleaningCost1x)}&nbsp;&euro;</td>
                          <td className="border-l-2 border-primary-200 bg-primary-50/50 px-4 py-3 text-center text-gray-700">
                            {fmt(results.cleaningCost2x)}&nbsp;&euro;
                            <span className="ml-1 text-[10px] text-primary-600">(-15%)</span>
                          </td>
                        </tr>
                        <tr className="bg-gray-50 font-bold">
                          <td className="px-4 py-3 text-gray-900">Ihre Ersparnis</td>
                          <td className="px-4 py-3 text-center text-gray-400">&mdash;</td>
                          <td className="px-4 py-3 text-center text-accent-700">
                            +{fmt(Math.max(results.savings1x, 0))}&nbsp;&euro;
                          </td>
                          <td className="border-l-2 border-primary-200 bg-primary-50/50 px-4 py-3 text-center text-accent-700">
                            +{fmt(Math.max(results.savings2x, 0))}&nbsp;&euro;
                          </td>
                        </tr>
                        <tr>
                          <td className="px-4 py-3 font-medium text-gray-700">ROI</td>
                          <td className="px-4 py-3 text-center text-gray-400">&mdash;</td>
                          <td className="px-4 py-3 text-center text-gray-700">{results.roi1x}%</td>
                          <td className="border-l-2 border-primary-200 bg-primary-50/50 px-4 py-3 text-center font-semibold text-primary-700">
                            {results.roi2x}%
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Recommendation */}
                <div className="rounded-xl border border-accent-200 bg-accent-50 p-4">
                  <div className="flex items-start gap-3">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-accent-100">
                      <svg className="h-5 w-5 text-accent-600" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm font-bold text-accent-900">
                        Unsere Empfehlung f&uuml;r Ihren Standort: {results.advice.label}
                      </p>
                      <p className="mt-1 text-xs leading-relaxed text-accent-700">
                        F&uuml;r Anlagen im Bereich &bdquo;{environments.find((e) => e.id === env)!.label}&ldquo;
                        empfehlen wir eine Reinigung{' '}
                        <strong>{results.advice.label}</strong>.{' '}
                        Bei {fmt(kwp)} kWp sparen Sie damit bis zu{' '}
                        <strong>
                          {fmt(Math.max(results.advice.recommended >= 2 ? results.savings2x : results.savings1x, 0))}&nbsp;&euro;
                          pro Jahr
                        </strong>
                        .
                      </p>
                    </div>
                  </div>
                </div>

                {/* Assumptions */}
                <details className="group rounded-xl border border-gray-100 bg-gray-50">
                  <summary className="flex cursor-pointer items-center justify-between px-4 py-3 text-sm font-medium text-gray-600 hover:text-gray-900">
                    <span>Berechnungsgrundlage anzeigen</span>
                    <svg
                      className="h-4 w-4 transition-transform group-open:rotate-180"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                    </svg>
                  </summary>
                  <div className="border-t border-gray-100 px-4 py-3 text-xs leading-relaxed text-gray-500">
                    Strompreis: 0,35&nbsp;&euro;/kWh &middot; Sonnenstunden:
                    ca. 1.000&nbsp;h/Jahr &middot; Reinigungskosten:
                    ca. 2,50&nbsp;&euro;/kWp (mind. 150&nbsp;&euro;) &middot;
                    15% Mengenrabatt bei 2&times;/Jahr &middot;
                    Verschmutzungsraten basieren auf Branchendurchschnitten
                    f&uuml;r deutsche Standorte. Tats&auml;chliche Werte
                    k&ouml;nnen abweichen.
                  </div>
                </details>

                {/* CTA */}
                <div className="text-center">
                  <a
                    href="#kontakt"
                    className="inline-flex items-center justify-center rounded-full bg-primary-600 px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-primary-600/25 transition-all hover:bg-primary-700 hover:shadow-xl hover:shadow-primary-600/30"
                  >
                    Kostenloses Angebot f&uuml;r Ihre {fmt(kwp)}-kWp-Anlage
                    <svg className="ml-2 h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                    </svg>
                  </a>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
