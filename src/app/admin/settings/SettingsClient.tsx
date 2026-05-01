// ─────────────────────────────────────────────────────────────────────────
// SettingsClient — UI dla /admin/settings: 2 sekcje
//  • Hasło — formularz zmiany własnego hasła (POST /api/admin/me/password)
//  • 2FA — setup TOTP (QR z secrets), weryfikacja kodu, wyłączenie 2FA
// (POST /api/admin/me/2fa/{setup,verify,disable}).
// ─────────────────────────────────────────────────────────────────────────
'use client';

import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';

interface User { id: string; email: string; name: string; twoFactorEnabled: boolean }

export default function SettingsClient({ user }: { user: User }) {
  return (
    <div className="space-y-8">
      <ProfileSection user={user} />
      <PasswordSection />
      <TwoFactorSection enabled={user.twoFactorEnabled} />
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6">
      <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
      <div className="mt-4">{children}</div>
    </div>
  );
}

function ProfileSection({ user }: { user: User }) {
  return (
    <Section title="Profil">
      <dl className="grid gap-2 text-sm">
        <div className="flex"><dt className="w-32 text-gray-500">E-Mail:</dt><dd className="font-medium">{user.email}</dd></div>
        <div className="flex"><dt className="w-32 text-gray-500">Name:</dt><dd className="font-medium">{user.name}</dd></div>
      </dl>
    </Section>
  );
}

function PasswordSection() {
  const [oldPw, setOld] = useState('');
  const [newPw, setNew] = useState('');
  const [confirm, setConfirm] = useState('');
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState<{ ok: boolean; text: string } | null>(null);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setMsg(null);
    if (newPw !== confirm) return setMsg({ ok: false, text: 'Passwörter stimmen nicht überein.' });
    if (newPw.length < 10) return setMsg({ ok: false, text: 'Mindestens 10 Zeichen.' });
    setBusy(true);
    const r = await fetch('/api/admin/me/password', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ oldPassword: oldPw, newPassword: newPw }),
    });
    setBusy(false);
    if (r.ok) {
      setMsg({ ok: true, text: 'Passwort geändert.' });
      setOld(''); setNew(''); setConfirm('');
    } else {
      const data = await r.json().catch(() => ({}));
      setMsg({ ok: false, text: data?.error ?? 'Fehler.' });
    }
  }

  return (
    <Section title="Passwort ändern">
      <form onSubmit={submit} className="space-y-3">
        <div>
          <label className="text-xs font-semibold text-gray-700">Aktuelles Passwort</label>
          <input type="password" value={oldPw} onChange={(e) => setOld(e.target.value)} required className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-primary-500 focus:outline-none" />
        </div>
        <div>
          <label className="text-xs font-semibold text-gray-700">Neues Passwort (min. 10)</label>
          <input type="password" value={newPw} onChange={(e) => setNew(e.target.value)} required minLength={10} className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-primary-500 focus:outline-none" />
        </div>
        <div>
          <label className="text-xs font-semibold text-gray-700">Wiederholen</label>
          <input type="password" value={confirm} onChange={(e) => setConfirm(e.target.value)} required className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-primary-500 focus:outline-none" />
        </div>
        {msg && <p className={`rounded-lg px-3 py-2 text-xs ${msg.ok ? 'bg-emerald-50 text-emerald-700' : 'bg-red-50 text-red-700'}`}>{msg.text}</p>}
        <button type="submit" disabled={busy} className="rounded-lg bg-primary-600 px-4 py-2 text-sm font-semibold text-white disabled:opacity-50">
          {busy ? 'Speichere...' : 'Passwort ändern'}
        </button>
      </form>
    </Section>
  );
}

function TwoFactorSection({ enabled: initialEnabled }: { enabled: boolean }) {
  const router = useRouter();
  const [enabled, setEnabled] = useState(initialEnabled);
  const [setup, setSetup] = useState<{ secret: string; qr: string } | null>(null);
  const [code, setCode] = useState('');
  const [pending, startTransition] = useTransition();
  const [msg, setMsg] = useState<{ ok: boolean; text: string } | null>(null);

  function startSetup() {
    setMsg(null);
    startTransition(async () => {
      const r = await fetch('/api/admin/me/2fa/setup', { method: 'POST' });
      if (!r.ok) { setMsg({ ok: false, text: 'Setup fehlgeschlagen.' }); return; }
      const data = await r.json();
      setSetup({ secret: data.secret, qr: data.qr });
    });
  }

  function verify() {
    if (!code || code.length !== 6) return;
    setMsg(null);
    startTransition(async () => {
      const r = await fetch('/api/admin/me/2fa/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code }),
      });
      if (r.ok) {
        setEnabled(true);
        setSetup(null);
        setCode('');
        setMsg({ ok: true, text: '2FA aktiviert! Beim nächsten Login wird der Code abgefragt.' });
        router.refresh();
      } else {
        setMsg({ ok: false, text: 'Code ungültig — versuchen Sie es erneut.' });
      }
    });
  }

  function disable() {
    const password = prompt('Aktuelles Passwort zur Bestätigung:');
    if (!password) return;
    const totp = prompt('Aktueller 6-stelliger 2FA-Code:');
    if (!totp || totp.length !== 6) {
      setMsg({ ok: false, text: '6-stelliger 2FA-Code erforderlich.' });
      return;
    }
    startTransition(async () => {
      const r = await fetch('/api/admin/me/2fa/disable', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password, totp }),
      });
      if (r.ok) {
        setEnabled(false);
        setMsg({ ok: true, text: '2FA deaktiviert.' });
        router.refresh();
      } else {
        const data = await r.json().catch(() => ({}));
        setMsg({ ok: false, text: data.error || 'Deaktivieren fehlgeschlagen.' });
      }
    });
  }

  return (
    <Section title="Zwei-Faktor-Authentifizierung (TOTP)">
      <p className="text-sm text-gray-600">
        Schützen Sie Ihr Konto mit einem zusätzlichen Code aus Ihrer Authenticator-App
        (Google Authenticator, Authy, 1Password, Bitwarden).
      </p>

      {enabled && !setup && (
        <div className="mt-4 flex items-center gap-3 rounded-lg bg-emerald-50 p-3 text-sm">
          <span className="text-emerald-600">✓ 2FA ist aktiv</span>
          <button onClick={disable} disabled={pending} className="ml-auto rounded-lg border border-rose-300 px-3 py-1 text-xs font-semibold text-rose-600 hover:bg-rose-50 disabled:opacity-50">
            Deaktivieren
          </button>
        </div>
      )}

      {!enabled && !setup && (
        <button
          onClick={startSetup}
          disabled={pending}
          className="mt-4 rounded-lg bg-primary-600 px-4 py-2 text-sm font-semibold text-white hover:bg-primary-700 disabled:opacity-50"
        >
          2FA einrichten
        </button>
      )}

      {setup && (
        <div className="mt-4 space-y-4 rounded-lg border border-gray-200 bg-gray-50 p-4">
          <div>
            <p className="text-sm font-semibold text-gray-900">1. Scannen Sie den QR-Code</p>
            <p className="mt-1 text-xs text-gray-600">
              Öffnen Sie Ihre Authenticator-App und scannen Sie diesen Code:
            </p>
            <div className="mt-3 inline-block rounded-lg bg-white p-3 shadow-sm">
              <img src={setup.qr} alt="2FA QR Code" width={200} height={200} />
            </div>
            <details className="mt-2 text-xs text-gray-500">
              <summary className="cursor-pointer">Manuelle Eingabe (falls QR nicht funktioniert)</summary>
              <code className="mt-1 block break-all rounded bg-white p-2 font-mono">{setup.secret}</code>
            </details>
          </div>

          <div>
            <p className="text-sm font-semibold text-gray-900">2. Geben Sie den 6-stelligen Code ein</p>
            <div className="mt-2 flex gap-2">
              <input
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                maxLength={6}
                value={code}
                onChange={(e) => setCode(e.target.value.replace(/\D/g, ''))}
                placeholder="000000"
                className="w-32 rounded-lg border border-gray-300 px-3 py-2 text-center text-lg font-mono tracking-widest focus:border-primary-500 focus:outline-none"
              />
              <button
                onClick={verify}
                disabled={pending || code.length !== 6}
                className="rounded-lg bg-primary-600 px-4 py-2 text-sm font-semibold text-white disabled:opacity-50"
              >
                Bestätigen
              </button>
              <button
                onClick={() => { setSetup(null); setCode(''); setMsg(null); }}
                className="rounded-lg border border-gray-300 px-3 py-2 text-xs text-gray-700 hover:bg-gray-100"
              >
                Abbrechen
              </button>
            </div>
          </div>
        </div>
      )}

      {msg && (
        <p className={`mt-3 rounded-lg px-3 py-2 text-xs ${msg.ok ? 'bg-emerald-50 text-emerald-700' : 'bg-red-50 text-red-700'}`}>
          {msg.text}
        </p>
      )}
    </Section>
  );
}
