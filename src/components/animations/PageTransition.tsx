// ─────────────────────────────────────────────────────────────────────────
// PageTransition — wrapper renderowany w layout.tsx wokół całego content'u.
// Przy każdej zmianie pathname (= przejście na inną podstronę) odpala
// animację fade-in + slight slide-up. Klucz = pathname → React remontuje
// element przy zmianie, framer-motion gra animację `initial → animate`.
// ─────────────────────────────────────────────────────────────────────────
'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { type ReactNode } from 'react';

export default function PageTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const reduced = useReducedMotion();
  return (
    <motion.div
      key={pathname}
      initial={reduced ? false : { opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}
