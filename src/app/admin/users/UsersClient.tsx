// ─────────────────────────────────────────────────────────────────────────
// UsersClient — UI zarządzania użytkownikami: tabela + formularz dodawania
// nowego user'a (POST /api/admin/users), edycja roli (PATCH), reset hasła
// przez admina, usuwanie. Tylko dla zalogowanego ADMIN.
// ─────────────────────────────────────────────────────────────────────────
'use client';

import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';

interface User {
  id: string; email: string; name: string; role: string;
  twoFactorEnabled: boolean;
  lastLoginAt: string | null; createdAt: string;
}

export default function UsersClient({ initialUsers, currentUserId }: { initialUsers: User[]; currentUserId: string }) {
  const router = useRouter();
  const [users, setUsers] = useState(initialUsers);
  const [showAdd, setShowAdd] = useState(false);
  const [generated, setGenerated] = useState<{ email: string; password: string } | null>(null);
  const [pending, startTransition] = useTransition();

  // form state
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [role, setRole] = useState('PARTNER');
  const [err, setErr] = useState<string | null>(null);

  function createUser(e: React.FormEvent) {
    e.preventDefault();
    setErr(null);
    startTransition(async () => {
      const r = await fetch('/api/admin/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, name, role }),
      });
      const data = await r.json();
      if (!r.ok) {
        setErr(data?.error ?? 'Fehler beim Erstellen.');
        return;
      }
      setGenerated({ email: data.user.email, password: data.tempPassword });
      setUsers((u) => [...u, { ...data.user, twoFactorEnabled: false, lastLoginAt: null }]);
      setEmail(''); setName(''); setRole('PARTNER');
      setShowAdd(false);
      router.refresh();
    });
  }

  function resetUserPassword(id: string) {
    if (!confirm('Passwort zurücksetzen? Es wird ein neues temporäres Passwort generiert.')) return;
    startTransition(async () => {
      const r = await fetch(`/api/admin/users/${id}/reset`, { method: 'POST' });
      const data = await r.json();
      if (r.ok) {
        const u = users.find((x) => x.id === id);
        setGenerated({ email: u?.email ?? '?', password: data.tempPassword });
      }
    });
  }

  function deleteUser(id: string) {
    if (id === currentUserId) {
      alert('Sie können sich nicht selbst löschen.');
      return;
    }
    if (!confirm('Diesen Benutzer wirklich löschen?')) return;
    startTransition(async () => {
      const r = await fetch(`/api/admin/users/${id}`, { method: 'DELETE' });
      if (r.ok) setUsers((u) => u.filter((x) => x.id !== id));
    });
  }

  return (
    <div className="space-y-6">
      {generated && (
        <div className="rounded-2xl border-2 border-amber-300 bg-amber-50 p-5">
          <h3 className="font-semibold text-amber-900">⚠ Temporäres Passwort generiert</h3>
          <p className="mt-1 text-sm text-amber-800">
            Geben Sie diese Zugangsdaten an den Benutzer weiter. <strong>Diese Anzeige erscheint nur einmal.</strong>
          </p>
          <dl className="mt-3 grid gap-2 rounded-lg bg-white p-4 text-sm">
            <div className="flex gap-2"><dt className="w-24 font-semibold">E-Mail:</dt><dd className="font-mono">{generated.email}</dd></div>
            <div className="flex gap-2"><dt className="w-24 font-semibold">Passwort:</dt><dd className="font-mono select-all">{generated.password}</dd></div>
          </dl>
          <button onClick={() => setGenerated(null)} className="mt-3 text-xs text-amber-900 underline">
            Verstanden, ausblenden
          </button>
        </div>
      )}

      <div className="flex justify-end">
        <button
          onClick={() => setShowAdd(!showAdd)}
          className="rounded-lg bg-primary-600 px-4 py-2 text-sm font-semibold text-white hover:bg-primary-700"
        >
          {showAdd ? '× Abbrechen' : '+ Neuer Benutzer'}
        </button>
      </div>

      {showAdd && (
        <form onSubmit={createUser} className="rounded-2xl border border-gray-200 bg-white p-5 space-y-3">
          <h2 className="font-semibold text-gray-900">Neuen Benutzer anlegen</h2>
          <div className="grid gap-3 sm:grid-cols-3">
            <div>
              <label className="text-xs font-semibold text-gray-700">E-Mail</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-primary-500 focus:outline-none" />
            </div>
            <div>
              <label className="text-xs font-semibold text-gray-700">Name</label>
              <input type="text" value={name} onChange={(e) => setName(e.target.value)} required className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-primary-500 focus:outline-none" />
            </div>
            <div>
              <label className="text-xs font-semibold text-gray-700">Rolle</label>
              <select value={role} onChange={(e) => setRole(e.target.value)} className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-primary-500 focus:outline-none">
                <option value="PARTNER">PARTNER (kann sehen + bearbeiten, aber nicht löschen)</option>
                <option value="ADMIN">ADMIN (volle Rechte)</option>
              </select>
            </div>
          </div>
          {err && <p className="rounded-lg bg-red-50 px-3 py-2 text-xs text-red-700">{err}</p>}
          <button type="submit" disabled={pending} className="rounded-lg bg-primary-600 px-4 py-2 text-sm font-semibold text-white disabled:opacity-50">
            {pending ? 'Erstelle...' : 'Erstellen'}
          </button>
          <p className="text-xs text-gray-500">Ein temporäres Passwort wird automatisch generiert und einmalig angezeigt.</p>
        </form>
      )}

      <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-xs uppercase text-gray-500">
            <tr>
              <th className="px-4 py-3 text-left">Name / E-Mail</th>
              <th className="px-4 py-3 text-left">Rolle</th>
              <th className="px-4 py-3 text-left">2FA</th>
              <th className="px-4 py-3 text-left">Letzter Login</th>
              <th className="px-4 py-3 text-right">Aktionen</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {users.map((u) => (
              <tr key={u.id}>
                <td className="px-4 py-3">
                  <div className="font-semibold text-gray-900">{u.name}</div>
                  <div className="text-xs text-gray-500">{u.email}</div>
                </td>
                <td className="px-4 py-3">
                  <span className={`inline-flex rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase ${u.role === 'ADMIN' ? 'bg-primary-100 text-primary-700' : 'bg-gray-100 text-gray-700'}`}>
                    {u.role}
                  </span>
                </td>
                <td className="px-4 py-3">
                  {u.twoFactorEnabled ? (
                    <span className="text-emerald-600">✓ Aktiv</span>
                  ) : (
                    <span className="text-gray-400">— inaktiv</span>
                  )}
                </td>
                <td className="px-4 py-3 text-xs text-gray-500">
                  {u.lastLoginAt ? new Date(u.lastLoginAt).toLocaleString('de-DE') : 'noch nie'}
                </td>
                <td className="px-4 py-3 text-right">
                  <button
                    onClick={() => resetUserPassword(u.id)}
                    disabled={pending}
                    className="mr-2 rounded-lg border border-gray-300 px-3 py-1 text-xs font-semibold text-gray-700 hover:border-primary-400 disabled:opacity-50"
                  >
                    Passwort zurücksetzen
                  </button>
                  {u.id !== currentUserId && (
                    <button
                      onClick={() => deleteUser(u.id)}
                      disabled={pending}
                      className="rounded-lg border border-rose-300 px-3 py-1 text-xs font-semibold text-rose-600 hover:bg-rose-50 disabled:opacity-50"
                    >
                      Löschen
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
