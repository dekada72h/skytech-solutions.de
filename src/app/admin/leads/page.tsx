import { prisma } from '@/lib/prisma';
import StatusBadge from '@/components/admin/StatusBadge';
import LeadActions from './LeadActions';

export const dynamic = 'force-dynamic';

const calculatorLabels: Record<string, string> = {
  ERTRAGSVERLUST: 'Ertragsverlust',
  REINIGUNGSKOSTEN: 'Reinigungskosten',
  AMORTISATION: 'Amortisation',
  ROI: 'ROI (Profi)',
  OTHER: 'Sonstige',
};

export default async function LeadsPage({ searchParams }: { searchParams: { status?: string; calc?: string } }) {
  const where: any = {};
  if (searchParams.status) where.status = searchParams.status;
  if (searchParams.calc) where.calculatorType = searchParams.calc;

  const leads = await prisma.lead.findMany({
    where,
    orderBy: { createdAt: 'desc' },
    take: 200,
    include: { _count: { select: { notes: true, messages: true } } },
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Leads</h1>
        <p className="mt-1 text-sm text-gray-500">
          {leads.length} Lead{leads.length === 1 ? '' : 's'} aus den Online-Rechnern.
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <FilterChip label="Alle" href="/admin/leads" active={!searchParams.status && !searchParams.calc} />
        <FilterChip label="Neu" href="/admin/leads?status=NEW" active={searchParams.status === 'NEW'} />
        <FilterChip label="Kontaktiert" href="/admin/leads?status=CONTACTED" active={searchParams.status === 'CONTACTED'} />
        <FilterChip label="Angebot" href="/admin/leads?status=QUOTED" active={searchParams.status === 'QUOTED'} />
        <FilterChip label="Gewonnen" href="/admin/leads?status=WON" active={searchParams.status === 'WON'} />
        <FilterChip label="Verloren" href="/admin/leads?status=LOST" active={searchParams.status === 'LOST'} />
      </div>

      <div className="space-y-3">
        {leads.length === 0 && (
          <p className="rounded-xl border border-gray-200 bg-white p-6 text-center text-sm text-gray-400">
            Noch keine Leads.
          </p>
        )}
        {leads.map((l: any) => (
          <details key={l.id} className="group rounded-xl border border-gray-200 bg-white shadow-sm">
            <summary className="flex cursor-pointer items-center justify-between gap-4 px-5 py-4">
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-3">
                  <StatusBadge status={l.status} />
                  <span className="rounded-full bg-blue-100 px-2 py-0.5 text-[10px] font-bold uppercase text-blue-700">
                    {calculatorLabels[l.calculatorType] ?? l.calculatorType}
                  </span>
                  <span className="font-semibold text-gray-900">
                    {l.contactName ?? '— anonym —'}
                  </span>
                  {l.contactEmail && <span className="text-xs text-gray-500">{l.contactEmail}</span>}
                </div>
                <p className="mt-1 text-xs text-gray-500">
                  {l.source ?? l.calculatorType.toLowerCase()} · {l._count.messages} Nachricht{l._count.messages === 1 ? '' : 'en'} · {l._count.notes} Notiz{l._count.notes === 1 ? '' : 'en'}
                </p>
              </div>
              <span className="flex-shrink-0 text-xs text-gray-500">{fmtDate(l.createdAt)}</span>
            </summary>

            <div className="border-t border-gray-100 px-5 py-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <KvSection title="Eingabe">
                  <pre className="mt-1 max-h-48 overflow-auto rounded-lg bg-gray-50 p-3 text-xs font-mono">
                    {JSON.stringify(l.inputJson, null, 2)}
                  </pre>
                </KvSection>
                <KvSection title="Ergebnis">
                  <pre className="mt-1 max-h-48 overflow-auto rounded-lg bg-gray-50 p-3 text-xs font-mono">
                    {JSON.stringify(l.resultJson, null, 2)}
                  </pre>
                </KvSection>
              </div>

              {(l.contactEmail || l.contactPhone) && (
                <div className="mt-4 grid gap-4 sm:grid-cols-2">
                  {l.contactEmail && (
                    <KvSection title="E-Mail">
                      <a href={`mailto:${l.contactEmail}`} className="text-sm text-primary-600 hover:underline">
                        {l.contactEmail}
                      </a>
                    </KvSection>
                  )}
                  {l.contactPhone && (
                    <KvSection title="Telefon">
                      <a href={`tel:${l.contactPhone}`} className="text-sm text-primary-600 hover:underline">
                        {l.contactPhone}
                      </a>
                    </KvSection>
                  )}
                </div>
              )}

              {l.ip && (
                <p className="mt-3 text-xs text-gray-500">
                  IP: {l.ip}
                </p>
              )}

              <LeadActions id={l.id} status={l.status} />
            </div>
          </details>
        ))}
      </div>
    </div>
  );
}

function FilterChip({ label, href, active }: { label: string; href: string; active: boolean }) {
  return (
    <a
      href={href}
      className={`rounded-full border px-4 py-1.5 text-xs font-semibold transition-all ${
        active ? 'border-primary-600 bg-primary-600 text-white' : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300'
      }`}
    >
      {label}
    </a>
  );
}

function KvSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">{title}</p>
      {children}
    </div>
  );
}

function fmtDate(d: Date): string {
  return new Date(d).toLocaleString('de-DE', {
    day: '2-digit', month: '2-digit', year: '2-digit',
    hour: '2-digit', minute: '2-digit',
  });
}
