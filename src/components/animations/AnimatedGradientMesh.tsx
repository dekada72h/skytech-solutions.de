// ─────────────────────────────────────────────────────────────────────────
// AnimatedGradientMesh — animowane tło z 3 nakładających się radial-
// gradientów (niebieski, indygo, sky-blue), które dryfują po sekcji w
// powolnej 18-sekundowej pętli. Używane jako tło sekcji CTA — daje
// "żywy" efekt bez ciężkich obrazów / wideo.
// ─────────────────────────────────────────────────────────────────────────
'use client';

import { motion, useReducedMotion } from 'framer-motion';

export default function AnimatedGradientMesh() {
  const reduced = useReducedMotion();
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <motion.div
        className="absolute -top-1/4 -left-1/4 h-[150%] w-[150%]"
        style={{
          background:
            'radial-gradient(circle at 20% 30%, rgba(56,189,248,0.45) 0%, transparent 45%), radial-gradient(circle at 80% 70%, rgba(99,102,241,0.4) 0%, transparent 45%), radial-gradient(circle at 50% 50%, rgba(14,165,233,0.3) 0%, transparent 55%)',
          filter: 'blur(40px)',
        }}
        animate={
          reduced
            ? undefined
            : {
                x: ['0%', '6%', '-4%', '0%'],
                y: ['0%', '-5%', '4%', '0%'],
              }
        }
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
      />
    </div>
  );
}
