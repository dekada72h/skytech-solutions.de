// ─────────────────────────────────────────────────────────────────────────
// Reveal — uniwersalny wrapper "fade + slide-up gdy wjedzie w viewport".
// Używany przez większość sekcji do scroll-triggered animacji.
// Respektuje prefers-reduced-motion (osoby z włączoną redukcją animacji
// dostają natychmiastowy widok bez żadnego ruchu).
// ─────────────────────────────────────────────────────────────────────────
'use client';

import { motion, useReducedMotion, type Variants, type HTMLMotionProps } from 'framer-motion';
import { type ReactNode } from 'react';

interface Props extends Omit<HTMLMotionProps<'div'>, 'animate' | 'initial' | 'variants'> {
  children: ReactNode;
  delay?: number;
  duration?: number;
  y?: number;
  once?: boolean;
}

export default function Reveal({
  children,
  delay = 0,
  duration = 0.55,
  y = 24,
  once = true,
  ...rest
}: Props) {
  const reduced = useReducedMotion();
  const variants: Variants = reduced
    ? { hidden: { opacity: 1 }, show: { opacity: 1 } }
    : { hidden: { opacity: 0, y }, show: { opacity: 1, y: 0 } };

  return (
    <motion.div
      variants={variants}
      initial="hidden"
      whileInView="show"
      viewport={{ once, margin: '-60px' }}
      transition={{ duration, delay, ease: [0.16, 1, 0.3, 1] }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

// ── Pomocnicze warianty do animacji "stagger" (elementy listy pojawiają
//    się po kolei z odstępem 70 ms). staggerContainer = rodzic, staggerItem
//    = pojedynczy element do nadania potomkowi.
export const staggerContainer = (childDelay = 0.07): Variants => ({
  hidden: {},
  show: { transition: { staggerChildren: childDelay, delayChildren: 0.05 } },
});

export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] } },
};
