// ─────────────────────────────────────────────────────────────────────────
// /forgot-password — formularz "zapomniałem hasła". Email → POST
// /api/auth/forgot → mailer wysyła link z tokenem. Niezindeksowana.
// ─────────────────────────────────────────────────────────────────────────
'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    await fetch('/api/auth/forgot', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    });
    setBusy(false);
    setDone(true);
  }

  return (
    <main className="relative flex min-h-screen items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 px-4">
      <Link
        href="/"
        className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-lg border border-gray-300 bg-white/80 px-3 py-1.5 text-xs font-semibold text-gray-700 shadow-sm backdrop-blur transition-all hover:bg-white hover:text-primary-700"
      >
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
        </svg>
        Zurück zur Startseite
      </Link>

      <div className="w-full max-w-md rounded-2xl border border-gray-200 bg-white p-8 shadow-lg">
        <h1 className="text-2xl font-bold text-gray-900">Passwort zurücksetzen</h1>
        <p className="mt-2 text-sm text-gray-600">
          Geben Sie Ihre E-Mail-Adresse ein. Sie erhalten einen Link zur Zurücksetzung.
        </p>

        {done ? (
          <div className="mt-6 rounded-lg bg-emerald-50 px-4 py-3 text-sm text-emerald-800">
            Wenn diese E-Mail-Adresse bekannt ist, wurde ein Reset-Link generiert.
            <p className="mt-2 text-xs text-emerald-700">
              Hinweis: Aktuell wird der Link im Server-Log abgelegt (kein E-Mail-Versand
              eingerichtet). Auf dem VPS einsehbar via{' '}
              <code className="rounded bg-emerald-100 px-1">docker logs skytech-solutions</code>.
            </p>
          </div>
        ) : (
          <form onSubmit={submit} className="mt-6 space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-700">E-Mail</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-primary-500 focus:outline-none"
              />
            </div>
            <button
              type="submit"
              disabled={busy}
              className="w-full rounded-lg bg-primary-600 px-4 py-2.5 text-sm font-semibold text-white transition-all hover:bg-primary-700 disabled:opacity-50"
            >
              {busy ? 'Sende...' : 'Reset-Link anfordern'}
            </button>
          </form>
        )}

        <div className="mt-4 text-center">
          <Link href="/login" className="text-sm text-primary-600 hover:underline">
            ← Zurück zum Login
          </Link>
        </div>
      </div>
    </main>
  );
}
