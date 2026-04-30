// ─────────────────────────────────────────────────────────────────────────
// BlogTeaser — sekcja "Mehr aus unserer Wissensbasis": 3 wybrane artykuły
// blogowe. Domyślnie pillar + 2 najnowsze, opcjonalnie preferSlugs do
// ręcznego wyboru. Używane na /leistungen, /ueber-uns, w podstronach
// artykułów. Wzmacnia internal linking + zatrzymuje czytelnika na stronie.
// ─────────────────────────────────────────────────────────────────────────
import Link from 'next/link';
import { getAllPosts } from '@/lib/blog';

interface Props {
  /** Slugs to feature explicitly, in this order. If empty, picks pillar + 2 newest. */
  preferSlugs?: string[];
  title?: string;
  subtitle?: string;
  max?: number;
}

const categoryLabels: Record<string, string> = {
  guide: 'Ratgeber',
  industry: 'Branche',
  seasonal: 'Saisonal',
  pricing: 'Preise',
};

const categoryColors: Record<string, string> = {
  guide: 'bg-primary-100 text-primary-700',
  industry: 'bg-amber-100 text-amber-700',
  seasonal: 'bg-emerald-100 text-emerald-700',
  pricing: 'bg-rose-100 text-rose-700',
};

export default function BlogTeaser({
  preferSlugs = [],
  title = 'Mehr aus unserer Wissensbasis',
  subtitle = 'Praktische Ratgeber zu Ertragsverlust, Reinigungsintervallen und Branchen-Themen.',
  max = 3,
}: Props) {
  const all = getAllPosts();
  if (all.length === 0) return null;

  let selected: typeof all = [];
  if (preferSlugs.length > 0) {
    selected = preferSlugs
      .map((s) => all.find((p) => p.slug === s))
      .filter((p): p is (typeof all)[number] => Boolean(p));
  }
  // Fill with pillar + most recent until we have `max`
  if (selected.length < max) {
    const pillar = all.find((p) => p.pillar && !selected.find((s) => s.slug === p.slug));
    if (pillar) selected.push(pillar);
    for (const p of all) {
      if (selected.length >= max) break;
      if (!selected.find((s) => s.slug === p.slug)) selected.push(p);
    }
  }
  selected = selected.slice(0, max);

  return (
    <section className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-6 text-center">
        <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
        <p className="mt-2 text-sm text-gray-600">{subtitle}</p>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        {selected.map((p) => (
          <Link
            key={p.slug}
            href={`/blog/${p.slug}`}
            className="group flex flex-col rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition-all hover:-translate-y-1 hover:border-primary-300 hover:shadow-lg"
          >
            <div className="mb-3 flex items-center gap-2">
              <span className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider ${categoryColors[p.category] ?? 'bg-gray-100 text-gray-700'}`}>
                {categoryLabels[p.category] ?? p.category}
              </span>
              {p.pillar && (
                <span className="rounded-full bg-yellow-100 px-2 py-0.5 text-[10px] font-bold uppercase text-yellow-800">⭐ Hauptartikel</span>
              )}
            </div>
            <h3 className="line-clamp-2 text-base font-bold text-gray-900 group-hover:text-primary-700">
              {p.title}
            </h3>
            <p className="mt-2 line-clamp-3 flex-1 text-sm text-gray-600">{p.description}</p>
            <span className="mt-3 inline-flex items-center text-xs font-semibold text-primary-600 group-hover:underline">
              Weiterlesen →
            </span>
          </Link>
        ))}
      </div>
      <div className="mt-6 text-center">
        <Link href="/blog" className="text-sm text-primary-600 hover:underline">
          → Alle Artikel ansehen
        </Link>
      </div>
    </section>
  );
}
