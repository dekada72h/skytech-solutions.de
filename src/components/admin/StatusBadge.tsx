type Status = 'UNREAD' | 'READ' | 'ARCHIVED' | 'NEW' | 'CONTACTED' | 'QUOTED' | 'WON' | 'LOST';

const colors: Record<Status, string> = {
  UNREAD: 'bg-rose-100 text-rose-700',
  READ: 'bg-gray-100 text-gray-700',
  ARCHIVED: 'bg-gray-200 text-gray-500',
  NEW: 'bg-rose-100 text-rose-700',
  CONTACTED: 'bg-amber-100 text-amber-700',
  QUOTED: 'bg-blue-100 text-blue-700',
  WON: 'bg-emerald-100 text-emerald-700',
  LOST: 'bg-gray-200 text-gray-500',
};

const labels: Record<Status, string> = {
  UNREAD: 'Ungelesen',
  READ: 'Gelesen',
  ARCHIVED: 'Archiviert',
  NEW: 'Neu',
  CONTACTED: 'Kontaktiert',
  QUOTED: 'Angebot',
  WON: 'Gewonnen',
  LOST: 'Verloren',
};

export default function StatusBadge({ status }: { status: string }) {
  const s = status as Status;
  return (
    <span className={`inline-flex rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider ${colors[s] ?? 'bg-gray-100 text-gray-700'}`}>
      {labels[s] ?? s}
    </span>
  );
}
