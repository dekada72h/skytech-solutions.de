// ─────────────────────────────────────────────────────────────────────────
// ErtragsverlustForm — formularz rechnera "ile tracisz na brudnej PV?".
// Inputy: kWp, cena prądu, środowisko (Wohngebiet/Landwirtschaft/Industrie),
// godziny słońca. Wynik kalkulowany live (useMemo). Przycisk "Pobierz PDF"
// uderza w /api/pdf/ertragsverlust.
// ─────────────────────────────────────────────────────────────────────────
'use client';

import { useState, useMemo } from 'react';
import {
  calcErtragsverlust,
  environments,
  fmtEur,
  fmtNum,
  fmtPct,
  type Environment,
} from '@/lib/calculators';
import ResultActions from './ResultActions';
import MiniBarChart from './MiniBarChart';
import PlzInput from './PlzInput';

export default function ErtragsverlustForm() {
  const [kwp, setKwp] = useState(10);
  const [months, setMonths] = useState(24);
  const [env, setEnv] = useState<Environment>('wohngebiet');
  const [eeg, setEeg] = useState(8.2);
  const [selbst, setSelbst] = useState(30);
  const [strompreis, setStrompreis] = useState(35);
  const [yieldFactor, setYieldFactor] = useState(1.0);
  const [region, setRegion] = useState<string | null>(null);

  const result = useMemo(
    () =>
      calcErtragsverlust({
        kwp: kwp * yieldFactor,
        monthsSinceCleaning: months,
        environment: env,
        einspeiseverguetung: eeg,
        selbstverbrauchAnteil: selbst,
        strompreis,
      }),
    [kwp, months, env, eeg, selbst, strompreis, yieldFactor],
  );

  // What-if "cost of waiting": calculate at +0, +6, +12, +24 months
  const compareData = useMemo(() => {
    const offsets = [0, 6, 12, 24];
    return offsets.map((off) => {
      const r = calcErtragsverlust({
        kwp: kwp * yieldFactor,
        monthsSinceCleaning: months + off,
        environment: env,
        einspeiseverguetung: eeg,
        selbstverbrauchAnteil: selbst,
        strompreis,
      });
      return {
        label: off === 0 ? 'jetzt' : `+${off} M`,
        value: r.lostEarningsAnnual,
        highlight: off === 0,
      };
    });
  }, [kwp, months, env, eeg, selbst, strompreis, yieldFactor]);

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr,1.1fr]">
      {/* INPUTS */}
      <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
        <h2 className="mb-6 text-xl font-semibold text-gray-900">Ihre Anlage</h2>

        <div className="mb-6">
          <PlzInput onPreset={(p) => { setEnv(p.defaultEnvironment); setYieldFactor(p.yieldFactor); setRegion(p.region); }} />
        </div>

        <div className="space-y-6">
          <div>
            <label className="flex justify-between text-sm font-medium text-gray-700">
              <span>Anlagengröße</span>
              <span className="font-bold text-primary-600">{kwp} kWp</span>
            </label>
            <input
              type="range"
              min={1}
              max={500}
              value={kwp}
              onChange={(e) => setKwp(Number(e.target.value))}
              className="mt-2 w-full accent-primary-600"
            />
            <div className="flex justify-between text-xs text-gray-500">
              <span>1 kWp</span>
              <span>500 kWp</span>
            </div>
          </div>

          <div>
            <label className="flex justify-between text-sm font-medium text-gray-700">
              <span>Letzte Reinigung vor</span>
              <span className="font-bold text-primary-600">{months} Monate</span>
            </label>
            <input
              type="range"
              min={0}
              max={60}
              value={months}
              onChange={(e) => setMonths(Number(e.target.value))}
              className="mt-2 w-full accent-primary-600"
            />
          </div>

          <div>
            <span className="text-sm font-medium text-gray-700">Standort / Umgebung</span>
            <div className="mt-2 grid grid-cols-2 gap-2">
              {(Object.keys(environments) as Environment[]).map((e) => (
                <button
                  key={e}
                  type="button"
                  onClick={() => setEnv(e)}
                  className={`rounded-lg border px-3 py-2 text-sm font-medium transition-all ${
                    env === e
                      ? 'border-primary-500 bg-primary-50 text-primary-700'
                      : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {environments[e].label}
                </button>
              ))}
            </div>
          </div>

          <details className="rounded-lg bg-gray-50 p-4 text-sm">
            <summary className="cursor-pointer font-medium text-gray-700">
              Erweiterte Einstellungen (optional)
            </summary>
            <div className="mt-4 space-y-4">
              <div>
                <label className="text-sm text-gray-700">Einspeisevergütung (ct/kWh)</label>
                <input
                  type="number"
                  step={0.1}
                  min={0}
                  max={50}
                  value={eeg}
                  onChange={(e) => setEeg(Number(e.target.value))}
                  className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-primary-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="flex justify-between text-sm text-gray-700">
                  <span>Eigenverbrauchsanteil</span>
                  <span>{selbst}%</span>
                </label>
                <input
                  type="range"
                  min={0}
                  max={100}
                  value={selbst}
                  onChange={(e) => setSelbst(Number(e.target.value))}
                  className="mt-1 w-full accent-primary-600"
                />
              </div>
              <div>
                <label className="text-sm text-gray-700">Strompreis (ct/kWh)</label>
                <input
                  type="number"
                  step={0.1}
                  min={0}
                  max={100}
                  value={strompreis}
                  onChange={(e) => setStrompreis(Number(e.target.value))}
                  className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-primary-500 focus:outline-none"
                />
              </div>
            </div>
          </details>
        </div>
      </div>

      {/* RESULT */}
      <div className="rounded-2xl border border-primary-200 bg-gradient-to-br from-primary-50 via-white to-white p-6 shadow-sm">
        <h2 className="mb-6 text-xl font-semibold text-gray-900">Ihr Verlust</h2>

        <div className="rounded-xl bg-white p-6 shadow-sm">
          <p className="text-sm text-gray-600">Verlust pro Jahr</p>
          <p className="mt-1 text-4xl font-bold text-primary-700">
            {fmtEur(result.lostEarningsAnnual)}
          </p>
          <p className="mt-1 text-sm text-gray-500">
            ≈ {fmtNum(result.lostKwhAnnual)} kWh entgangener Ertrag
          </p>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-3">
          <div className="rounded-xl bg-white p-4 shadow-sm">
            <p className="text-xs text-gray-500">Verschmutzungsgrad</p>
            <p className="mt-1 text-2xl font-bold text-gray-900">
              {fmtPct(result.lossFactor)}
            </p>
          </div>
          <div className="rounded-xl bg-white p-4 shadow-sm">
            <p className="text-xs text-gray-500">Verlust in 5 Jahren</p>
            <p className="mt-1 text-2xl font-bold text-gray-900">
              {fmtEur(result.lostEarnings5y)}
            </p>
          </div>
        </div>

        <div className="mt-6 rounded-lg bg-amber-50 p-4 text-sm text-amber-900">
          <strong>Bei Umgebung &bdquo;{result.paneeleEnvLabel}&rdquo;:</strong> typischer
          Effizienzverlust von {fmtPct(environments[env].annualLossRate)} pro Jahr ohne Reinigung.
          {region && <span className="block mt-1">📍 Werte angepasst für <strong>{region}</strong>.</span>}
        </div>

        {/* Compare mode: cost of waiting */}
        <div className="mt-6 rounded-xl bg-white p-4 shadow-sm">
          <div className="mb-2 flex items-baseline justify-between">
            <p className="text-xs font-semibold uppercase tracking-wider text-gray-700">
              Kosten der Verzögerung
            </p>
            <p className="text-[10px] text-gray-500">Jährlicher Verlust wenn Sie warten</p>
          </div>
          <MiniBarChart
            data={compareData}
            unit=" €"
            height={240}
            formatter={(n) => Math.round(n).toLocaleString('de-DE')}
          />
          <p className="mt-2 text-xs text-gray-600">
            Wenn Sie noch <strong>2 Jahre warten</strong>, steigt der jährliche Verlust auf{' '}
            <strong className="text-rose-600">{fmtEur(compareData[3].value)}</strong>.
          </p>
        </div>

        <ResultActions
          pdfPath="/api/pdf/ertragsverlust"
          pdfPayload={{
            input: {
              kwp,
              monthsSinceCleaning: months,
              environment: env,
              einspeiseverguetung: eeg,
              selbstverbrauchAnteil: selbst,
              strompreis,
            },
            result,
          }}
          contactPrefill={{
            betreff: 'Anfrage nach Ertragsverlust-Berechnung',
            nachricht: `Meine Anlage: ${kwp} kWp, letzte Reinigung vor ${months} Monaten, Umgebung: ${result.paneeleEnvLabel}.\nBerechneter jährlicher Verlust: ${fmtEur(result.lostEarningsAnnual)}.\nIch möchte ein kostenloses Angebot.`,
          }}
          filename={`ertragsverlust-${kwp}kwp-${env}.pdf`}
        />
      </div>
    </div>
  );
}
