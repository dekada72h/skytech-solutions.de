// ─────────────────────────────────────────────────────────────────────────
// LoginForm — formularz logowania (email + hasło + opcjonalny kod 2FA).
// Wywołuje signIn() z next-auth/react. Po sukcesie redirect na callbackUrl
// (przekazany z middleware przy próbie wejścia na /admin/*).
// ─────────────────────────────────────────────────────────────────────────
'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import Link from 'next/link';

export default function LoginForm({ callbackUrl, initialError }: { callbackUrl: string; initialError?: string }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [totp, setTotp] = useState('');
  const [needs2FA, setNeeds2FA] = useState(false);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(initialError ?? null);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setErr(null);
    const res = await signIn('credentials', {
      email,
      password,
      totp,
      redirect: false,
    });
    setBusy(false);
    if (res?.error) {
      if (res.error === '2FA_REQUIRED' || res.error.includes('2FA_REQUIRED')) {
        setNeeds2FA(true);
        setErr('Bitte geben Sie den 6-stelligen Code aus Ihrer Authenticator-App ein.');
        return;
      }
      if (res.error === 'INVALID_TOTP' || res.error.includes('INVALID_TOTP')) {
        setErr('Ungültiger 2FA-Code.');
        return;
      }
      setErr('Falsche E-Mail oder falsches Passwort.');
      return;
    }
    if (res?.ok) {
      window.location.href = callbackUrl;
    }
  }

  return (
    <form onSubmit={submit} className="space-y-4">
      <div>
        <label className="text-sm font-medium text-gray-700">E-Mail</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          autoComplete="email"
          className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-200"
        />
      </div>
      <div>
        <label className="text-sm font-medium text-gray-700">Passwort</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          autoComplete="current-password"
          className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-200"
        />
      </div>
      {needs2FA && (
        <div>
          <label className="text-sm font-medium text-gray-700">2FA-Code</label>
          <input
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            maxLength={6}
            value={totp}
            onChange={(e) => setTotp(e.target.value.replace(/\D/g, ''))}
            placeholder="000000"
            className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-center text-lg font-mono tracking-widest focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-200"
            autoFocus
          />
        </div>
      )}

      {err && <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">{err}</p>}

      <button
        type="submit"
        disabled={busy}
        className="w-full rounded-lg bg-primary-600 px-4 py-2.5 text-sm font-semibold text-white transition-all hover:bg-primary-700 disabled:opacity-50"
      >
        {busy ? 'Anmelden...' : 'Anmelden'}
      </button>

      <div className="text-center">
        <Link href="/forgot-password" className="text-sm text-primary-600 hover:underline">
          Passwort vergessen?
        </Link>
      </div>
    </form>
  );
}
