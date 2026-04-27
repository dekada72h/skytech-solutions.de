'use client';

import { useState, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={<div className="p-10 text-center text-sm text-gray-500">Lädt...</div>}>
      <ResetPasswordInner />
    </Suspense>
  );
}

function ResetPasswordInner() {
  const params = useSearchParams();
  const token = params.get('token') ?? '';
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (password !== confirm) {
      setErr('Passwörter stimmen nicht überein.');
      return;
    }
    if (password.length < 10) {
      setErr('Mindestens 10 Zeichen.');
      return;
    }
    setBusy(true);
    setErr(null);
    const res = await fetch('/api/auth/reset', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token, password }),
    });
    setBusy(false);
    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      setErr(data?.error ?? 'Fehler beim Zurücksetzen.');
      return;
    }
    setDone(true);
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 px-4">
      <div className="w-full max-w-md rounded-2xl border border-gray-200 bg-white p-8 shadow-lg">
        <h1 className="text-2xl font-bold text-gray-900">Neues Passwort</h1>

        {!token && (
          <p className="mt-3 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">
            Kein Token in URL. Bitte fordern Sie einen neuen Reset-Link an.
          </p>
        )}

        {done ? (
          <div className="mt-6">
            <div className="rounded-lg bg-emerald-50 px-4 py-3 text-sm text-emerald-800">
              Passwort erfolgreich geändert.
            </div>
            <Link
              href="/login"
              className="mt-4 block w-full rounded-lg bg-primary-600 px-4 py-2.5 text-center text-sm font-semibold text-white"
            >
              Zum Login
            </Link>
          </div>
        ) : (
          <form onSubmit={submit} className="mt-6 space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-700">Neues Passwort</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={10}
                autoComplete="new-password"
                className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-primary-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700">Wiederholen</label>
              <input
                type="password"
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                required
                autoComplete="new-password"
                className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-primary-500 focus:outline-none"
              />
            </div>
            {err && <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">{err}</p>}
            <button
              type="submit"
              disabled={busy || !token}
              className="w-full rounded-lg bg-primary-600 px-4 py-2.5 text-sm font-semibold text-white transition-all hover:bg-primary-700 disabled:opacity-50"
            >
              {busy ? 'Speichere...' : 'Passwort speichern'}
            </button>
          </form>
        )}
      </div>
    </main>
  );
}
