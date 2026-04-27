import { prisma } from '@/lib/prisma';
import StatusBadge from '@/components/admin/StatusBadge';
import MessageActions from './MessageActions';

export const dynamic = 'force-dynamic';

export default async function MessagesPage({ searchParams }: { searchParams: { status?: string } }) {
  const statusFilter = searchParams.status as 'UNREAD' | 'READ' | 'ARCHIVED' | undefined;
  const messages = await prisma.message.findMany({
    where: statusFilter ? { status: statusFilter } : undefined,
    orderBy: { createdAt: 'desc' },
    take: 200,
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Nachrichten</h1>
        <p className="mt-1 text-sm text-gray-500">
          {messages.length} Nachricht{messages.length === 1 ? '' : 'en'}
          {statusFilter ? ` mit Status ${statusFilter}` : ''}
        </p>
      </div>

      <div className="flex gap-2">
        {[
          { v: undefined, label: 'Alle' },
          { v: 'UNREAD', label: 'Ungelesen' },
          { v: 'READ', label: 'Gelesen' },
          { v: 'ARCHIVED', label: 'Archiviert' },
        ].map((f) => {
          const isActive = (f.v ?? '') === (statusFilter ?? '');
          const href = f.v ? `?status=${f.v}` : '?';
          return (
            <a
              key={f.label}
              href={href}
              className={`rounded-full border px-4 py-1.5 text-xs font-semibold transition-all ${
                isActive
                  ? 'border-primary-600 bg-primary-600 text-white'
                  : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300'
              }`}
            >
              {f.label}
            </a>
          );
        })}
      </div>

      <div className="space-y-3">
        {messages.length === 0 && (
          <p className="rounded-xl border border-gray-200 bg-white p-6 text-center text-sm text-gray-400">
            Keine Nachrichten in dieser Kategorie.
          </p>
        )}
        {messages.map((m) => (
          <details
            key={m.id}
            className="group rounded-xl border border-gray-200 bg-white shadow-sm"
          >
            <summary className="flex cursor-pointer items-center justify-between gap-4 px-5 py-4">
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-3">
                  <StatusBadge status={m.status} />
                  <span className="font-semibold text-gray-900">{m.name}</span>
                  <span className="text-xs text-gray-500">{m.email}</span>
                </div>
                <p className="mt-1 line-clamp-1 text-sm text-gray-600">
                  {m.subject ? <strong>{m.subject}: </strong> : null}
                  {m.message}
                </p>
              </div>
              <span className="flex-shrink-0 text-xs text-gray-500">{fmtDate(m.createdAt)}</span>
            </summary>
            <div className="border-t border-gray-100 px-5 py-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">Kontakt</p>
                  <p className="mt-1 text-sm">
                    <a href={`mailto:${m.email}`} className="text-primary-600 hover:underline">{m.email}</a>
                  </p>
                  {m.phone && (
                    <p className="text-sm">
                      <a href={`tel:${m.phone}`} className="text-primary-600 hover:underline">{m.phone}</a>
                    </p>
                  )}
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">Quelle</p>
                  <p className="mt-1 text-sm">{m.source ?? '—'}</p>
                  {m.locale && <p className="text-xs text-gray-500">Sprache: {m.locale}</p>}
                  {m.ip && <p className="text-xs text-gray-500">IP: {m.ip}</p>}
                </div>
              </div>
              {m.subject && (
                <div className="mt-4">
                  <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">Betreff</p>
                  <p className="mt-1 text-sm font-medium text-gray-900">{m.subject}</p>
                </div>
              )}
              <div className="mt-4">
                <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">Nachricht</p>
                <p className="mt-1 whitespace-pre-wrap text-sm text-gray-800">{m.message}</p>
              </div>
              <MessageActions id={m.id} status={m.status} />
            </div>
          </details>
        ))}
      </div>
    </div>
  );
}

function fmtDate(d: Date): string {
  return new Date(d).toLocaleString('de-DE', {
    day: '2-digit', month: '2-digit', year: '2-digit',
    hour: '2-digit', minute: '2-digit',
  });
}
