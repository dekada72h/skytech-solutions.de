import Link from 'next/link';
import { SunIcon } from './Icons';

const footerLinks = {
  leistungen: [
    { label: 'Solarpark-Reinigung', href: '/leistungen' },
    { label: 'Dachanlagen-Reinigung', href: '/leistungen' },
    { label: 'Fassadenreinigung', href: '/leistungen' },
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
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary-600">
                <SunIcon className="h-5 w-5 text-white" strokeWidth={2} />
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
