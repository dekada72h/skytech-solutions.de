import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

async function loadStats() {
  const now = new Date();
  const dayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const weekStart = new Date(dayStart); weekStart.setDate(weekStart.getDate() - 7);
  const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);

  const [
    msgUnread, msgToday, msgWeek, msgMonth, msgTotal,
    leadNew, leadToday, leadWeek, leadMonth, leadTotal,
    leadByCalc,
  ] = await Promise.all([
    prisma.message.count({ where: { status: 'UNREAD' } }),
    prisma.message.count({ where: { createdAt: { gte: dayStart } } }),
    prisma.message.count({ where: { createdAt: { gte: weekStart } } }),
    prisma.message.count({ where: { createdAt: { gte: monthStart } } }),
    prisma.message.count(),
    prisma.lead.count({ where: { status: 'NEW' } }),
    prisma.lead.count({ where: { createdAt: { gte: dayStart } } }),
    prisma.lead.count({ where: { createdAt: { gte: weekStart } } }),
    prisma.lead.count({ where: { createdAt: { gte: monthStart } } }),
    prisma.lead.count(),
    prisma.lead.groupBy({
      by: ['calculatorType'],
      _count: true,
      orderBy: { _count: { calculatorType: 'desc' } },
    }),
  ]);

  const recentMessages = await prisma.message.findMany({
    take: 5,
    orderBy: { createdAt: 'desc' },
  });
  const recentLeads = await prisma.lead.findMany({
    take: 5,
    orderBy: { createdAt: 'desc' },
  });

  return {
    msg: { unread: msgUnread, today: msgToday, week: msgWeek, month: msgMonth, total: msgTotal },
    lead: { fresh: leadNew, today: leadToday, week: leadWeek, month: leadMonth, total: leadTotal },
    leadByCalc,
    recentMessages,
    recentLeads,
  };
}

export default async function AdminDashboard() {
  const s = await loadStats();
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="mt-1 text-sm text-gray-500">
          Übersicht über Nachrichten, Leads und Aktivität.
        </p>
      </div>

      {/* KPI cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <KpiCard label="Ungelesen" value={s.msg.unread} sub={`${s.msg.total} insgesamt`} accent="rose" href="/admin/messages?status=UNREAD" />
        <KpiCard label="Neue Leads" value={s.lead.fresh} sub={`${s.lead.total} insgesamt`} accent="emerald" href="/admin/leads?status=NEW" />
        <KpiCard label="Diese Woche" value={s.msg.week + s.lead.week} sub="Nachrichten + Leads" accent="primary" />
        <KpiCard label="Diesen Monat" value={s.msg.month + s.lead.month} sub="Nachrichten + Leads" accent="primary" />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Recent messages */}
        <Section title="Letzte Nachrichten" href="/admin/messages">
          {s.recentMessages.length === 0 ? (
            <Empty text="Noch keine Nachrichten" />
          ) : (
            <ul className="divide-y divide-gray-100">
              {s.recentMessages.map((m: any) => (
                <li key={m.id} className="py-3">
                  <div className="flex items-baseline justify-between">
                    <span className="text-sm font-semibold text-gray-900">{m.name}</span>
                    <span className="text-xs text-gray-500">{fmtDate(m.createdAt)}</span>
                  </div>
                  <p className="mt-0.5 text-xs text-gray-500">{m.email}</p>
                  <p className="mt-1 line-clamp-2 text-sm text-gray-600">{m.message}</p>
                </li>
              ))}
            </ul>
          )}
        </Section>

        {/* Recent leads */}
        <Section title="Letzte Leads" href="/admin/leads">
          {s.recentLeads.length === 0 ? (
            <Empty text="Noch keine Leads" />
          ) : (
            <ul className="divide-y divide-gray-100">
              {s.recentLeads.map((l: any) => (
                <li key={l.id} className="py-3">
                  <div className="flex items-baseline justify-between">
                    <span className="text-sm font-semibold text-gray-900">
                      {l.contactName ?? '— anonym —'}
                    </span>
                    <span className="text-xs text-gray-500">{fmtDate(l.createdAt)}</span>
                  </div>
                  <p className="mt-0.5 text-xs text-gray-500">
                    {l.calculatorType} · {l.status}
                  </p>
                </li>
              ))}
            </ul>
          )}
        </Section>
      </div>

      {/* Calculator breakdown */}
      <Section title="Leads pro Rechner" href="/admin/leads">
        {s.leadByCalc.length === 0 ? (
          <Empty text="Noch keine Daten" />
        ) : (
          <ul className="space-y-2">
            {s.leadByCalc.map((row: any) => (
              <li key={row.calculatorType} className="flex items-center justify-between rounded-lg bg-gray-50 px-3 py-2 text-sm">
                <span className="font-medium text-gray-700">{row.calculatorType}</span>
                <span className="font-bold text-primary-700">{row._count}</span>
              </li>
            ))}
          </ul>
        )}
      </Section>
    </div>
  );
}

function KpiCard({ label, value, sub, accent, href }: { label: string; value: number; sub?: string; accent: 'rose' | 'emerald' | 'primary'; href?: string }) {
  const cls = {
    rose: 'border-rose-200 bg-rose-50/50 text-rose-700',
    emerald: 'border-emerald-200 bg-emerald-50/50 text-emerald-700',
    primary: 'border-primary-200 bg-primary-50/50 text-primary-700',
  }[accent];
  const inner = (
    <>
      <p className="text-xs font-semibold uppercase tracking-wider">{label}</p>
      <p className="mt-2 text-3xl font-bold text-gray-900">{value}</p>
      {sub && <p className="mt-1 text-xs text-gray-500">{sub}</p>}
    </>
  );
  const className = `block rounded-2xl border ${cls} p-5 transition-all hover:shadow-md`;
  return href ? <a href={href} className={className}>{inner}</a> : <div className={className}>{inner}</div>;
}

function Section({ title, children, href }: { title: string; children: React.ReactNode; href?: string }) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5">
      <div className="mb-3 flex items-baseline justify-between">
        <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
        {href && <a href={href} className="text-xs font-semibold text-primary-600 hover:underline">alle ansehen →</a>}
      </div>
      {children}
    </div>
  );
}

function Empty({ text }: { text: string }) {
  return <p className="py-6 text-center text-sm text-gray-400">{text}</p>;
}

function fmtDate(d: Date): string {
  return new Date(d).toLocaleString('de-DE', { day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit' });
}
