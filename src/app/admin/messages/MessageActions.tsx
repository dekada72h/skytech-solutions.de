// ─────────────────────────────────────────────────────────────────────────
// MessageActions — UI per-row dla messages. Dropdown statusu (PATCH
// /api/admin/messages/[id]). Mark as Read / Archive akcje.
// ─────────────────────────────────────────────────────────────────────────
'use client';

import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';

const statuses = ['UNREAD', 'READ', 'ARCHIVED'] as const;

export default function MessageActions({ id, status }: { id: string; status: string }) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [current, setCurrent] = useState(status);

  function update(newStatus: string) {
    startTransition(async () => {
      const res = await fetch(`/api/admin/messages/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });
      if (res.ok) {
        setCurrent(newStatus);
        router.refresh();
      }
    });
  }

  async function remove() {
    if (!confirm('Diese Nachricht wirklich löschen?')) return;
    startTransition(async () => {
      const res = await fetch(`/api/admin/messages/${id}`, { method: 'DELETE' });
      if (res.ok) router.refresh();
    });
  }

  return (
    <div className="mt-5 flex flex-wrap items-center gap-2 border-t border-gray-100 pt-4">
      {statuses.map((s) => (
        <button
          key={s}
          type="button"
          onClick={() => update(s)}
          disabled={pending || current === s}
          className={`rounded-lg border px-3 py-1.5 text-xs font-semibold transition-all ${
            current === s
              ? 'border-primary-600 bg-primary-600 text-white'
              : 'border-gray-300 bg-white text-gray-700 hover:border-primary-400'
          } disabled:opacity-50`}
        >
          {s === 'UNREAD' ? 'Ungelesen' : s === 'READ' ? 'Gelesen' : 'Archiviert'}
        </button>
      ))}
      <button
        type="button"
        onClick={remove}
        disabled={pending}
        className="ml-auto rounded-lg border border-rose-300 bg-white px-3 py-1.5 text-xs font-semibold text-rose-600 transition-all hover:bg-rose-50 disabled:opacity-50"
      >
        Löschen
      </button>
    </div>
  );
}
