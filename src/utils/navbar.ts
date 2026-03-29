export const navLinks = [
  { href: '/leistungen', label: 'Leistungen' },
  { href: '/ueber-uns', label: 'Über uns' },
  { href: '/faq', label: 'FAQ' },
  { href: '/kontakt', label: 'Kontakt' },
];

export function toggleMenu(currentState: boolean): boolean {
  return !currentState;
}
