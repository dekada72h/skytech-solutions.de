'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

type Stage = 'enter' | 'cleaning' | 'done';

function DroneSVG() {
  return (
    <svg viewBox="0 0 240 140" className="h-24 w-auto sm:h-28" stroke="currentColor" fill="none" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round">
      <line x1="60" y1="78" x2="22" y2="46" />
      <line x1="180" y1="78" x2="218" y2="46" />
      <line x1="60" y1="78" x2="22" y2="110" />
      <line x1="180" y1="78" x2="218" y2="110" />
      <circle cx="22" cy="46" r="6" fill="currentColor" />
      <circle cx="218" cy="46" r="6" fill="currentColor" />
      <circle cx="22" cy="110" r="6" fill="currentColor" />
      <circle cx="218" cy="110" r="6" fill="currentColor" />
      {/* Spinning rotor blades */}
      <motion.ellipse
        cx="22" cy="46" rx="22" ry="2.5" opacity={0.55}
        animate={{ rotate: 360 }}
        transition={{ duration: 0.15, repeat: Infinity, ease: 'linear' }}
        style={{ transformOrigin: '22px 46px' }}
      />
      <motion.ellipse
        cx="218" cy="46" rx="22" ry="2.5" opacity={0.55}
        animate={{ rotate: 360 }}
        transition={{ duration: 0.15, repeat: Infinity, ease: 'linear' }}
        style={{ transformOrigin: '218px 46px' }}
      />
      <motion.ellipse
        cx="22" cy="110" rx="22" ry="2.5" opacity={0.55}
        animate={{ rotate: 360 }}
        transition={{ duration: 0.15, repeat: Infinity, ease: 'linear' }}
        style={{ transformOrigin: '22px 110px' }}
      />
      <motion.ellipse
        cx="218" cy="110" rx="22" ry="2.5" opacity={0.55}
        animate={{ rotate: 360 }}
        transition={{ duration: 0.15, repeat: Infinity, ease: 'linear' }}
        style={{ transformOrigin: '218px 110px' }}
      />
      <rect x="60" y="58" width="120" height="40" rx="10" fill="currentColor" fillOpacity={0.15} />
      <circle cx="100" cy="78" r="7" fill="currentColor" fillOpacity={0.35} />
      {/* Front spray nozzle */}
      <rect x="180" y="72" width="34" height="12" rx="3" fill="currentColor" fillOpacity={0.3} />
      <circle cx="218" cy="78" r="4" fill="currentColor" />
      <line x1="80" y1="100" x2="80" y2="120" />
      <line x1="160" y1="100" x2="160" y2="120" />
      <line x1="72" y1="120" x2="168" y2="120" />
    </svg>
  );
}

function WaterSpray() {
  // Water droplets emerging from the nozzle (right side of drone)
  const drops = Array.from({ length: 14 });
  return (
    <div className="pointer-events-none absolute right-[-10px] top-1/2 -translate-y-1/2">
      {drops.map((_, i) => {
        const angle = (i % 5) - 2; // -2..2 vertical spread
        const delay = (i * 0.08) % 0.7;
        return (
          <motion.span
            key={i}
            className="absolute block h-1.5 w-1.5 rounded-full bg-sky-400/80"
            initial={{ x: 0, y: angle * 4, opacity: 0, scale: 1 }}
            animate={{
              x: [0, 60, 110],
              y: [angle * 4, angle * 14, angle * 32 + 30],
              opacity: [0, 1, 0],
              scale: [1, 0.9, 0.4],
            }}
            transition={{
              duration: 0.7,
              delay,
              repeat: Infinity,
              ease: 'easeOut',
            }}
            style={{ filter: 'drop-shadow(0 0 4px rgba(56,189,248,0.6))' }}
          />
        );
      })}
    </div>
  );
}

export default function NotFound() {
  const [stage, setStage] = useState<Stage>('enter');

  useEffect(() => {
    const t1 = setTimeout(() => setStage('cleaning'), 1300);
    const t2 = setTimeout(() => setStage('done'), 4800);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  return (
    <main className="flex min-h-screen flex-col bg-white">
      <Navbar />

      <section className="relative flex flex-1 items-center justify-center overflow-hidden px-4 pt-24 pb-16 sm:px-6">
        {/* Stage area */}
        <div className="relative mx-auto w-full max-w-3xl">
          {/* The "dirty surface" — gets wiped left-to-right as drone passes */}
          <div className="relative aspect-[16/10] w-full overflow-hidden rounded-3xl border border-gray-200 shadow-xl">
            {/* Cleaned background (revealed underneath) */}
            <div className="absolute inset-0 bg-gradient-to-br from-sky-50 via-white to-primary-50">
              <div
                className="absolute inset-0 opacity-30"
                style={{
                  backgroundImage:
                    'radial-gradient(circle at 1px 1px, rgb(14,165,233) 1px, transparent 0)',
                  backgroundSize: '28px 28px',
                }}
              />
            </div>

            {/* Dirty overlay — animated clip-path wipe */}
            <motion.div
              className="absolute inset-0"
              initial={{ clipPath: 'inset(0 0% 0 0)' }}
              animate={{
                clipPath:
                  stage === 'enter'
                    ? 'inset(0 0% 0 0)'
                    : 'inset(0 0% 0 100%)',
              }}
              transition={{ duration: 3.4, ease: 'linear' }}
            >
              <div
                className="absolute inset-0"
                style={{
                  background:
                    'linear-gradient(135deg, #6b7280 0%, #4b5563 50%, #374151 100%)',
                }}
              />
              {/* Grime spots */}
              <div
                className="absolute inset-0 opacity-60 mix-blend-overlay"
                style={{
                  backgroundImage:
                    'radial-gradient(circle at 20% 30%, rgba(0,0,0,0.5) 0px, transparent 40px), radial-gradient(circle at 70% 60%, rgba(0,0,0,0.4) 0px, transparent 60px), radial-gradient(circle at 40% 80%, rgba(120,90,60,0.5) 0px, transparent 50px), radial-gradient(circle at 85% 20%, rgba(80,60,40,0.4) 0px, transparent 45px)',
                }}
              />
              {/* 404 on dirty layer */}
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="select-none text-[20vw] font-extrabold leading-none text-white/15 sm:text-[180px]">
                  404
                </span>
              </div>
            </motion.div>

            {/* Cleaned message — fades in after drone passes */}
            <AnimatePresence>
              {stage === 'done' && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center"
                >
                  <motion.div
                    initial={{ scale: 0.6, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.7, delay: 0.5, type: 'spring', stiffness: 120 }}
                    className="mb-4"
                  >
                    <Image
                      src="/skytech-logo-mark.png"
                      alt="Skytech Solutions"
                      width={3052}
                      height={638}
                      className="h-12 w-auto sm:h-16"
                      priority
                    />
                  </motion.div>
                  <p className="max-w-md text-base font-semibold text-gray-900 sm:text-lg">
                    Diese Seite wurde gerade frisch gereinigt.
                  </p>
                  <p className="mt-2 max-w-md text-sm text-gray-600 sm:text-base">
                    So gründlich reinigt Skytech Solutions auch Ihre
                    Photovoltaikanlage und Fassade – mit Drohnentechnologie bis
                    150 m Höhe.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* The drone — flies in from top-left, hovers, then sweeps right while spraying */}
            <motion.div
              className="absolute top-0 left-0 text-primary-700"
              initial={{ x: '-30%', y: '-120%', opacity: 0, rotate: -8 }}
              animate={
                stage === 'enter'
                  ? { x: '15%', y: '30%', opacity: 1, rotate: 0 }
                  : stage === 'cleaning'
                  ? { x: '95%', y: '30%', opacity: 1, rotate: 2 }
                  : { x: '140%', y: '15%', opacity: 0, rotate: 6 }
              }
              transition={
                stage === 'enter'
                  ? { duration: 1.2, ease: 'easeOut' }
                  : stage === 'cleaning'
                  ? { duration: 3.4, ease: 'linear' }
                  : { duration: 1.2, ease: 'easeIn' }
              }
            >
              <motion.div
                animate={{ y: [0, -4, 0] }}
                transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
                className="relative"
              >
                <DroneSVG />
                {stage === 'cleaning' && <WaterSpray />}
              </motion.div>
            </motion.div>
          </div>

          {/* Below-the-stage CTA */}
          <div className="mt-10 flex flex-col items-center gap-3 sm:flex-row sm:justify-center sm:gap-4">
            <Link
              href="/"
              className="inline-flex items-center justify-center rounded-full bg-primary-600 px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-primary-600/25 transition-all hover:bg-primary-700"
            >
              Zur Startseite
              <svg className="ml-2 h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </Link>
            <Link
              href="/leistungen"
              className="inline-flex items-center justify-center rounded-full border border-gray-200 bg-white px-7 py-3.5 text-sm font-semibold text-gray-700 shadow-sm transition-all hover:border-gray-300"
            >
              Unsere Leistungen
            </Link>
            <Link
              href="/kontakt"
              className="inline-flex items-center justify-center rounded-full border border-gray-200 bg-white px-7 py-3.5 text-sm font-semibold text-gray-700 shadow-sm transition-all hover:border-gray-300"
            >
              Kontakt aufnehmen
            </Link>
          </div>

          <p className="mt-6 text-center text-sm text-gray-500">
            Die gewünschte Seite konnte nicht gefunden werden — aber dafür ist sie
            jetzt blitzsauber.
          </p>
        </div>
      </section>

      <Footer />
    </main>
  );
}
