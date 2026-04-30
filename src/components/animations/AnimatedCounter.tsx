'use client';

import { useEffect, useRef, useState } from 'react';
import { animate, useInView, useReducedMotion } from 'framer-motion';

interface Props {
  to: number;
  from?: number;
  duration?: number;
  suffix?: string;
  prefix?: string;
  decimals?: number;
  className?: string;
}

export default function AnimatedCounter({
  to,
  from = 0,
  duration = 1.8,
  suffix = '',
  prefix = '',
  decimals = 0,
  className,
}: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-30px' });
  const [val, setVal] = useState(from);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (!isInView) return;
    if (reduced) {
      setVal(to);
      return;
    }
    const controls = animate(from, to, {
      duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setVal(v),
    });
    return () => controls.stop();
  }, [isInView, from, to, duration, reduced]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {val.toFixed(decimals)}
      {suffix}
    </span>
  );
}
