import Link from 'next/link';

// Top 6 cities chosen for footer prominence — broad geographic + traffic mix
const topStandorte = [
  { label: 'Ulm', slug: 'ulm' },
  { label: 'Stuttgart', slug: 'stuttgart' },
  { label: 'Karlsruhe', slug: 'karlsruhe' },
  { label: 'Augsburg', slug: 'augsburg' },
  { label: 'Friedrichshafen', slug: 'friedrichshafen' },
  { label: 'Heilbronn', slug: 'heilbronn' },
];

const footerLinks = {
  leistungen: [
    { label: 'Solarpark-Reinigung', href: '/leistungen' },
    { label: 'Dachanlagen-Reinigung', href: '/leistungen' },
    { label: 'Fassadenreinigung', href: '/leistungen' },
    { label: 'Online-Rechner', href: '/rechner' },
  ],
  unternehmen: [
    { label: 'Über uns', href: '/ueber-uns' },
    { label: 'FAQ', href: '/faq' },
    { label: 'Kontakt', href: '/kontakt' },
  ],
  rechtliches: [
    { label: 'Impressum', href: '/impressum' },
    { label: 'Datenschutz', href: '/datenschutz' },
    { label: 'AGB', href: '/agb' },
  ],
};

export default function Footer() {
  return (
    <footer className="border-t border-gray-100 bg-gray-50">
      <div className="container-width px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-5">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary-600">
                <svg
                  className="h-5 w-5 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
                  />
                </svg>
              </div>
              <span className="text-lg font-bold text-gray-900">
                Skytech<span className="text-primary-600">Solutions</span>
              </span>
            </Link>
            <p className="mt-3 max-w-xs text-sm text-gray-600">
              Professionelle Reinigung von Photovoltaikanlagen und Fassaden mit
              modernster Drohnentechnologie.
            </p>
          </div>

          {/* Leistungen */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900">Leistungen</h3>
            <ul className="mt-3 space-y-2">
              {footerLinks.leistungen.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-600 transition-colors hover:text-primary-600"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Unternehmen */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900">Unternehmen</h3>
            <ul className="mt-3 space-y-2">
              {footerLinks.unternehmen.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-600 transition-colors hover:text-primary-600"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Standorte (Top 6 cities + link to hub) */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900">Standorte</h3>
            <ul className="mt-3 space-y-2">
              {topStandorte.map((s) => (
                <li key={s.slug}>
                  <Link
                    href={`/pv-reinigung/${s.slug}`}
                    className="text-sm text-gray-600 transition-colors hover:text-primary-600"
                  >
                    PV-Reinigung {s.label}
                  </Link>
                </li>
              ))}
              <li className="pt-1">
                <Link
                  href="/pv-reinigung"
                  className="text-xs font-semibold text-primary-600 hover:underline"
                >
                  Alle 14 Standorte →
                </Link>
              </li>
            </ul>
          </div>

          {/* Rechtliches */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900">Rechtliches</h3>
            <ul className="mt-3 space-y-2">
              {footerLinks.rechtliches.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-600 transition-colors hover:text-primary-600"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 border-t border-gray-200 pt-8">
          <p className="text-center text-sm text-gray-500">
            &copy; {new Date().getFullYear()} Skytech Solutions. Alle Rechte
            vorbehalten.
          </p>
        </div>
      </div>
    </footer>
  );
}
