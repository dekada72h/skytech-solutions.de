'use client';

import { useState, useMemo } from 'react';
import { calcAmortisation, fmtEur } from '@/lib/calculators';
import ResultActions from './ResultActions';

export default function AmortisationForm() {
  const [cleaningCost, setCleaningCost] = useState(800);
  const [lostEarnings, setLostEarnings] = useState(450);
  const [interval, setInterval] = useState(2);

  const result = useMemo(
    () =>
      calcAmortisation({
        cleaningCost,
        lostEarningsAnnual: lostEarnings,
        cleaningInterval: interval,
      }),
    [cleaningCost, lostEarnings, interval],
  );

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr,1.1fr]">
      {/* INPUTS */}
      <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
        <h2 className="mb-6 text-xl font-semibold text-gray-900">Ihre Werte</h2>

        <div className="space-y-6">
          <div>
            <label className="text-sm font-medium text-gray-700">
              Reinigungskosten (€)
            </label>
            <input
              type="number"
              min={50}
              max={50000}
              value={cleaningCost}
              onChange={(e) => setCleaningCost(Number(e.target.value) || 0)}
              className="mt-2 w-full rounded-md border border-gray-300 px-3 py-2 text-base focus:border-primary-500 focus:outline-none"
            />
            <p className="mt-1 text-xs text-gray-500">
              Falls unbekannt, nutzen Sie unseren <a href="/rechner/reinigungskosten" className="text-primary-600 hover:underline">Reinigungskosten-Schätzer</a>.
            </p>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">
              Jährlicher Ertragsverlust (€)
            </label>
            <input
              type="number"
              min={50}
              max={50000}
              value={lostEarnings}
              onChange={(e) => setLostEarnings(Number(e.target.value) || 0)}
              className="mt-2 w-full rounded-md border border-gray-300 px-3 py-2 text-base focus:border-primary-500 focus:outline-none"
            />
            <p className="mt-1 text-xs text-gray-500">
              Berechnet mit unserem <a href="/rechner/ertragsverlust" className="text-primary-600 hover:underline">Ertragsverlust-Rechner</a>.
            </p>
          </div>

          <div>
            <label className="flex justify-between text-sm font-medium text-gray-700">
              <span>Reinigungs-Intervall</span>
              <span className="font-bold text-primary-600">
                alle {interval} {interval === 1 ? 'Jahr' : 'Jahre'}
              </span>
            </label>
            <input
              type="range"
              min={0.5}
              max={5}
              step={0.5}
              value={interval}
              onChange={(e) => setInterval(Number(e.target.value))}
              className="mt-2 w-full accent-primary-600"
            />
            <div className="flex justify-between text-xs text-gray-500">
              <span>0,5 Jahre</span>
              <span>5 Jahre</span>
            </div>
          </div>
        </div>
      </div>

      {/* RESULT */}
      <div className="rounded-2xl border border-primary-200 bg-gradient-to-br from-primary-50 via-white to-white p-6 shadow-sm">
        <h2 className="mb-6 text-xl font-semibold text-gray-900">Ihre Amortisation</h2>

        <div className="rounded-xl bg-white p-6 shadow-sm">
          <p className="text-sm text-gray-600">Investition zurückverdient nach</p>
          <p className="mt-1 text-4xl font-bold text-primary-700">
            {result.paybackMonths} Monaten
          </p>
          <p className="mt-1 text-sm text-gray-500">
            ≈ {result.paybackYears.toFixed(1)} Jahre
          </p>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-3">
          <div className="rounded-xl bg-white p-4 shadow-sm">
            <p className="text-xs text-gray-500">Gewinn nach 5 Jahren</p>
            <p className="mt-1 text-xl font-bold text-emerald-600">
              {fmtEur(result.fiveYearGain)}
            </p>
          </div>
          <div className="rounded-xl bg-white p-4 shadow-sm">
            <p className="text-xs text-gray-500">Gewinn nach 10 Jahren</p>
            <p className="mt-1 text-xl font-bold text-emerald-600">
              {fmtEur(result.tenYearGain)}
            </p>
          </div>
        </div>

        <div className="mt-4 rounded-xl bg-white p-4 shadow-sm">
          <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-gray-500">
            5-Jahres-Tabelle
          </p>
          <div className="grid grid-cols-4 gap-2 text-xs font-medium text-gray-500">
            <span>Jahr</span>
            <span className="text-right">Erspart</span>
            <span className="text-right">Ausgaben</span>
            <span className="text-right">Netto</span>
          </div>
          <div className="mt-2 space-y-1.5">
            {result.yearlyTable.map((row) => (
              <div key={row.year} className="grid grid-cols-4 gap-2 text-sm">
                <span className="font-semibold">{row.year}</span>
                <span className="text-right">{fmtEur(row.recovered)}</span>
                <span className="text-right text-gray-500">{fmtEur(row.spent)}</span>
                <span className={`text-right font-bold ${row.net >= 0 ? 'text-emerald-600' : 'text-red-600'}`}>
                  {fmtEur(row.net)}
                </span>
              </div>
            ))}
          </div>
        </div>

        <ResultActions
          pdfPath="/api/pdf/amortisation"
          pdfPayload={{
            input: { cleaningCost, lostEarningsAnnual: lostEarnings, cleaningInterval: interval },
            result,
          }}
          contactPrefill={{
            betreff: 'Anfrage nach Amortisations-Berechnung',
            nachricht: `Reinigungskosten: ${fmtEur(cleaningCost)}, jährlicher Verlust: ${fmtEur(lostEarnings)}, Intervall: alle ${interval} Jahre.\nAmortisation nach ${result.paybackMonths} Monaten, 5-Jahres-Gewinn: ${fmtEur(result.fiveYearGain)}.\nIch möchte ein verbindliches Angebot.`,
          }}
          filename="amortisation-prognose.pdf"
        />
      </div>
    </div>
  );
}
