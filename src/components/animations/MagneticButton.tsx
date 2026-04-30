// ─────────────────────────────────────────────────────────────────────────
// MagneticButton — wrapper dla przycisków/CTA. Gdy kursor zbliża się do
// elementu, element delikatnie "ciągnie się" za kursorem (do `strength`
// pikseli max). Daje efekt magnetyzmu i podkreśla interaktywność.
// ─────────────────────────────────────────────────────────────────────────
'use client';

import { motion, useMotionValue, useReducedMotion, useSpring } from 'framer-motion';
import { type ReactNode, type MouseEvent } from 'react';

interface Props {
  children: ReactNode;
  className?: string;
  strength?: number;
}

export default function MagneticButton({ children, className, strength = 8 }: Props) {
  const reduced = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 280, damping: 22 });
  const sy = useSpring(y, { stiffness: 280, damping: 22 });

  if (reduced) {
    return <div className={`inline-block ${className ?? ''}`}>{children}</div>;
  }

  function onMove(e: MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    const dx = (e.clientX - rect.left - rect.width / 2) / (rect.width / 2);
    const dy = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2);
    x.set(dx * strength);
    y.set(dy * strength);
  }
  function onLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ x: sx, y: sy }}
      className={`inline-block ${className ?? ''}`}
    >
      {children}
    </motion.div>
  );
}
