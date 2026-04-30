// ─────────────────────────────────────────────────────────────────────────
// PlzInput — pole input dla kodu pocztowego PLZ. Po wpisaniu 2 cyfr
// odpalamy lookupPlz() i wyświetlamy sugestię najbliższego miasta + link
// do strony /standorte/<city>. onPreset callback zwraca preset rodzica.
// ─────────────────────────────────────────────────────────────────────────
'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { lookupPlz, type PlzPreset } from '@/lib/plzPresets';
import { cityByPlz, type CityData } from '@/data/cities';

interface Props {
  onPreset?: (preset: PlzPreset, plz: string) => void;
}

export default function PlzInput({ onPreset }: Props) {
  const [plz, setPlz] = useState('');
  const [preset, setPreset] = useState<PlzPreset | null>(null);
  const [matchedCity, setMatchedCity] = useState<CityData | null>(null);

  useEffect(() => {
    if (plz.length === 5) {
      const p = lookupPlz(plz);
      if (p) {
        setPreset(p);
        onPreset?.(p, plz);
      }
      const city = cityByPlz(plz);
      setMatchedCity(city ?? null);
    } else if (plz.length < 2) {
      setPreset(null);
      setMatchedCity(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [plz]);

  return (
    <div className="rounded-xl border border-primary-200 bg-primary-50/40 p-4">
      <label className="text-xs font-semibold uppercase tracking-wider text-primary-700">
        Postleitzahl (optional)
      </label>
      <p className="mt-0.5 text-xs text-gray-600">
        Mit PLZ passen wir die Werte für Ihre Region automatisch an.
      </p>
      <div className="mt-2 flex items-center gap-3">
        <input
          type="text"
          inputMode="numeric"
          maxLength={5}
          value={plz}
          onChange={(e) => setPlz(e.target.value.replace(/\D/g, ''))}
          placeholder="z. B. 89079"
          className="w-32 rounded-lg border border-gray-300 bg-white px-3 py-2 text-base focus:border-primary-500 focus:outline-none"
        />
        {preset && (
          <div className="flex-1 text-xs">
            <p className="font-semibold text-primary-700">📍 {preset.region} · {preset.state}</p>
            <p className="text-gray-600">{preset.note}</p>
          </div>
        )}
      </div>
      {matchedCity && (
        <div className="mt-3 rounded-lg border border-emerald-200 bg-emerald-50 p-3 text-xs">
          <p className="text-emerald-800">
            ✅ Wir bieten <strong>persönlichen Service in {matchedCity.name}</strong> an —
            Anfahrt {matchedCity.distanceFromUlmKm === 0 ? 'lokal' : `${matchedCity.distanceFromUlmKm} km / ${matchedCity.driveTimeMin} Min.`}
          </p>
          <Link
            href={`/standorte/${matchedCity.slug}`}
            className="mt-1 inline-block font-semibold text-emerald-700 underline hover:text-emerald-900"
          >
            → Standort-Seite für {matchedCity.name} ansehen
          </Link>
        </div>
      )}
    </div>
  );
}
