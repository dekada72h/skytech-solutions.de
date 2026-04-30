// ─────────────────────────────────────────────────────────────────────────
// ResultActions — pasek akcji pod wynikiem rechnera. Dwa CTA:
// "Pobierz PDF z wynikiem" (uderza w /api/pdf/<calc>) i "Bezpłatne
// Angebot" (link do /kontakt z pre-fill parametrami z rechnera).
// ─────────────────────────────────────────────────────────────────────────
'use client';

import { useState } from 'react';
import Link from 'next/link';

interface Props {
  pdfPath: string;                         // e.g. /api/pdf/ertragsverlust
  pdfPayload: Record<string, unknown>;     // input + result
  contactPrefill?: Record<string, string>; // optional query for /kontakt
  filename?: string;
}

export default function ResultActions({ pdfPath, pdfPayload, contactPrefill, filename = 'rechner-ergebnis.pdf' }: Props) {
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  async function downloadPdf() {
    setBusy(true);
    setErr(null);
    try {
      const res = await fetch(pdfPath, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(pdfPayload),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
    } catch (e) {
      setErr('PDF konnte nicht erstellt werden. Bitte versuchen Sie es später erneut.');
    } finally {
      setBusy(false);
    }
  }

  const contactHref = contactPrefill
    ? `/kontakt?${new URLSearchParams(contactPrefill).toString()}`
    : '/kontakt';

  return (
    <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:gap-4">
      <Link
        href={contactHref}
        className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-primary-600 px-6 py-3 text-base font-semibold text-white shadow-sm transition-all hover:bg-primary-700"
      >
        Kostenloses Angebot anfordern
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
        </svg>
      </Link>
      <button
        type="button"
        onClick={downloadPdf}
        disabled={busy}
        className="inline-flex items-center justify-center gap-2 rounded-xl border border-gray-300 bg-white px-6 py-3 text-base font-semibold text-gray-700 transition-all hover:border-primary-500 hover:text-primary-600 disabled:opacity-50"
      >
        {busy ? (
          <>
            <svg className="h-5 w-5 animate-spin" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth={4}></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Erstelle PDF...
          </>
        ) : (
          <>
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
            </svg>
            PDF herunterladen
          </>
        )}
      </button>
      {err && <p className="text-sm text-red-600">{err}</p>}
    </div>
  );
}
