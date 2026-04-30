// ─────────────────────────────────────────────────────────────────────────
// StaggerList — kontener dla list, w których elementy mają wjeżdżać po
// kolei (animacja "schodkowa"). childDelay = czas między pojawieniem się
// kolejnych dzieci (domyślnie 70 ms).
// ─────────────────────────────────────────────────────────────────────────
'use client';

import { motion, useReducedMotion, type Variants } from 'framer-motion';
import { type ReactNode } from 'react';

interface Props {
  children: ReactNode;
  className?: string;
  childDelay?: number;
  as?: 'div' | 'ul' | 'ol' | 'dl';
}

export default function StaggerList({ children, className, childDelay = 0.07, as = 'div' }: Props) {
  const reduced = useReducedMotion();
  const Component = motion[as];
  const container: Variants = reduced
    ? { hidden: { opacity: 1 }, show: { opacity: 1 } }
    : {
        hidden: {},
        show: { transition: { staggerChildren: childDelay, delayChildren: 0.05 } },
      };
  return (
    <Component
      className={className}
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-50px' }}
    >
      {children}
    </Component>
  );
}

export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] } },
};
