'use client';

import { useState, useTransition, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const statuses = ['NEW', 'CONTACTED', 'QUOTED', 'WON', 'LOST'] as const;
const labels: Record<string, string> = {
  NEW: 'Neu', CONTACTED: 'Kontaktiert', QUOTED: 'Angebot', WON: 'Gewonnen', LOST: 'Verloren',
};

interface Note { id: string; content: string; createdAt: string; author: { name: string } }

export default function LeadActions({ id, status }: { id: string; status: string }) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [current, setCurrent] = useState(status);
  const [notes, setNotes] = useState<Note[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [draft, setDraft] = useState('');

  async function loadNotes() {
    if (loaded) return;
    const r = await fetch(`/api/admin/leads/${id}/notes`);
    if (r.ok) {
      const data = await r.json();
      setNotes(data.notes ?? []);
      setLoaded(true);
    }
  }
  useEffect(() => { loadNotes(); /* eslint-disable-next-line */ }, []);

  function setStatus(newStatus: string) {
    startTransition(async () => {
      const res = await fetch(`/api/admin/leads/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });
      if (res.ok) { setCurrent(newStatus); router.refresh(); }
    });
  }

  async function addNote() {
    if (!draft.trim()) return;
    startTransition(async () => {
      const r = await fetch(`/api/admin/leads/${id}/notes`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: draft }),
      });
      if (r.ok) {
        const data = await r.json();
        setNotes((n) => [data.note, ...n]);
        setDraft('');
        router.refresh();
      }
    });
  }

  async function remove() {
    if (!confirm('Diesen Lead wirklich löschen? (Alle Notizen werden ebenfalls gelöscht)')) return;
    startTransition(async () => {
      const r = await fetch(`/api/admin/leads/${id}`, { method: 'DELETE' });
      if (r.ok) router.refresh();
    });
  }

  return (
    <div className="mt-5 space-y-4 border-t border-gray-100 pt-4">
      <div>
        <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-gray-500">Status</p>
        <div className="flex flex-wrap gap-2">
          {statuses.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => setStatus(s)}
              disabled={pending || current === s}
              className={`rounded-lg border px-3 py-1.5 text-xs font-semibold transition-all ${
                current === s
                  ? 'border-primary-600 bg-primary-600 text-white'
                  : 'border-gray-300 bg-white text-gray-700 hover:border-primary-400'
              } disabled:opacity-50`}
            >
              {labels[s]}
            </button>
          ))}
        </div>
      </div>

      <div>
        <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-gray-500">
          Notizen ({notes.length})
        </p>
        <div className="space-y-2">
          {notes.map((n) => (
            <div key={n.id} className="rounded-lg bg-gray-50 p-3 text-sm">
              <div className="mb-1 flex justify-between text-xs text-gray-500">
                <span>{n.author?.name ?? '—'}</span>
                <span>{new Date(n.createdAt).toLocaleString('de-DE')}</span>
              </div>
              <p className="whitespace-pre-wrap text-gray-800">{n.content}</p>
            </div>
          ))}
          {notes.length === 0 && <p className="text-sm text-gray-400">Keine Notizen.</p>}
        </div>
        <div className="mt-3 flex gap-2">
          <textarea
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            placeholder="Neue Notiz hinzufügen..."
            rows={2}
            className="flex-1 rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-primary-500 focus:outline-none"
          />
          <button
            type="button"
            onClick={addNote}
            disabled={pending || !draft.trim()}
            className="self-start rounded-lg bg-primary-600 px-4 py-2 text-xs font-semibold text-white disabled:opacity-50"
          >
            Hinzufügen
          </button>
        </div>
      </div>

      <div className="border-t border-gray-100 pt-3">
        <button
          type="button"
          onClick={remove}
          disabled={pending}
          className="rounded-lg border border-rose-300 bg-white px-3 py-1.5 text-xs font-semibold text-rose-600 hover:bg-rose-50 disabled:opacity-50"
        >
          Lead löschen
        </button>
      </div>
    </div>
  );
}
