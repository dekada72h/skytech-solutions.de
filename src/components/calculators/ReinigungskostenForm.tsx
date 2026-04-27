'use client';

import { useState, useMemo } from 'react';
import {
  calcReinigungskosten,
  roofTypes,
  accessTypes,
  fmtEur,
  type RoofType,
  type AccessType,
} from '@/lib/calculators';
import ResultActions from './ResultActions';
import MiniBarChart from './MiniBarChart';
import PlzInput from './PlzInput';

export default function ReinigungskostenForm() {
  const [panels, setPanels] = useState(40);
  const [roof, setRoof] = useState<RoofType>('satteldach');
  const [access, setAccess] = useState<AccessType>('mittel');
  const [thermo, setThermo] = useState(false);
  const [region, setRegion] = useState<string | null>(null);

  const result = useMemo(
    () =>
      calcReinigungskosten({
        panelCount: panels,
        roofType: roof,
        access,
        withThermography: thermo,
      }),
    [panels, roof, access, thermo],
  );

  // Compare: with vs without thermography, with different access conditions
  const compareData = useMemo(() => {
    const base = calcReinigungskosten({ panelCount: panels, roofType: roof, access, withThermography: false });
    const withThermo = calcReinigungskosten({ panelCount: panels, roofType: roof, access, withThermography: true });
    return [
      { label: 'nur Reinigung', value: base.totalCost, highlight: !thermo },
      { label: '+ Thermografie', value: withThermo.totalCost, highlight: thermo },
    ];
  }, [panels, roof, access, thermo]);

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr,1.1fr]">
      {/* INPUTS */}
      <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
        <h2 className="mb-6 text-xl font-semibold text-gray-900">Ihre Anlage</h2>

        <div className="mb-6">
          <PlzInput onPreset={(p) => { setRegion(p.region); }} />
        </div>

        <div className="space-y-6">
          <div>
            <label className="flex justify-between text-sm font-medium text-gray-700">
              <span>Anzahl Module</span>
              <span className="font-bold text-primary-600">{panels} Stück</span>
            </label>
            <input
              type="range"
              min={5}
              max={500}
              value={panels}
              onChange={(e) => setPanels(Number(e.target.value))}
              className="mt-2 w-full accent-primary-600"
            />
            <input
              type="number"
              min={1}
              max={10000}
              value={panels}
              onChange={(e) => setPanels(Math.max(1, Math.min(10000, Number(e.target.value) || 1)))}
              className="mt-2 w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-primary-500 focus:outline-none"
            />
          </div>

          <div>
            <span className="text-sm font-medium text-gray-700">Dachtyp</span>
            <div className="mt-2 grid grid-cols-2 gap-2">
              {(Object.keys(roofTypes) as RoofType[]).map((r) => (
                <button
                  key={r}
                  type="button"
                  onClick={() => setRoof(r)}
                  className={`rounded-lg border px-3 py-2 text-sm font-medium transition-all ${
                    roof === r
                      ? 'border-primary-500 bg-primary-50 text-primary-700'
                      : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {roofTypes[r].label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <span className="text-sm font-medium text-gray-700">Zugänglichkeit</span>
            <div className="mt-2 space-y-2">
              {(Object.keys(accessTypes) as AccessType[]).map((a) => (
                <button
                  key={a}
                  type="button"
                  onClick={() => setAccess(a)}
                  className={`w-full rounded-lg border px-3 py-2 text-left text-sm font-medium transition-all ${
                    access === a
                      ? 'border-primary-500 bg-primary-50 text-primary-700'
                      : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {accessTypes[a].label}
                </button>
              ))}
            </div>
          </div>

          <label className="flex cursor-pointer items-center gap-3 rounded-lg border border-gray-200 bg-gray-50 p-4">
            <input
              type="checkbox"
              checked={thermo}
              onChange={(e) => setThermo(e.target.checked)}
              className="h-4 w-4 rounded text-primary-600 focus:ring-primary-500"
            />
            <span className="text-sm">
              <strong>Thermografie + Foto-Dokumentation</strong>
              <span className="block text-xs text-gray-500">+ ca. 1,50 € pro Modul</span>
            </span>
          </label>
        </div>
      </div>

      {/* RESULT */}
      <div className="rounded-2xl border border-primary-200 bg-gradient-to-br from-primary-50 via-white to-white p-6 shadow-sm">
        <h2 className="mb-6 text-xl font-semibold text-gray-900">Ihre Schätzung</h2>

        <div className="rounded-xl bg-white p-6 shadow-sm">
          <p className="text-sm text-gray-600">Geschätzter Gesamtpreis</p>
          <p className="mt-1 text-4xl font-bold text-primary-700">{fmtEur(result.totalCost)}</p>
          <p className="mt-1 text-sm text-gray-500">
            Bandbreite: {fmtEur(result.rangeMin)} – {fmtEur(result.rangeMax)}
          </p>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-3">
          <div className="rounded-xl bg-white p-4 shadow-sm">
            <p className="text-xs text-gray-500">Reinigung</p>
            <p className="mt-1 text-xl font-bold text-gray-900">{fmtEur(result.totalCleaningCost)}</p>
          </div>
          <div className="rounded-xl bg-white p-4 shadow-sm">
            <p className="text-xs text-gray-500">Pro Modul (effektiv)</p>
            <p className="mt-1 text-xl font-bold text-gray-900">
              {result.pricePerPanelEffective.toFixed(2)} €
            </p>
          </div>
        </div>

        {result.notes.length > 0 && (
          <ul className="mt-4 space-y-2 rounded-lg bg-amber-50 p-4 text-sm text-amber-900">
            {result.notes.map((n, i) => (
              <li key={i} className="flex gap-2">
                <span className="text-amber-600">•</span>
                {n}
              </li>
            ))}
          </ul>
        )}

        {region && (
          <p className="mt-3 text-xs text-gray-600">📍 Anfahrt nach <strong>{region}</strong> ist im Preis enthalten.</p>
        )}

        {/* Compare: thermo vs no thermo */}
        <div className="mt-4 rounded-xl bg-white p-4 shadow-sm">
          <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-gray-700">
            Vergleich der Optionen
          </p>
          <MiniBarChart
            data={compareData}
            unit=" €"
            height={130}
            formatter={(n) => Math.round(n).toLocaleString('de-DE')}
          />
        </div>

        <ResultActions
          pdfPath="/api/pdf/reinigungskosten"
          pdfPayload={{
            input: { panelCount: panels, roofType: roof, access, withThermography: thermo },
            result,
          }}
          contactPrefill={{
            betreff: 'Anfrage nach Reinigungskosten-Schätzung',
            nachricht: `Meine Anlage: ${panels} Module, Dachtyp: ${roofTypes[roof].label}, Zugänglichkeit: ${accessTypes[access].label}${thermo ? ', mit Thermografie' : ''}.\nGeschätzter Preis: ${fmtEur(result.totalCost)}.\nIch möchte ein verbindliches Angebot.`,
          }}
          filename={`reinigungskosten-${panels}module.pdf`}
        />
      </div>
    </div>
  );
}
