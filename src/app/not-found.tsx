'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

type Stage = 'enter' | 'cleaning' | 'done';

function DroneSVG() {
  // Spinning rotor blade — 3-blade prop with motion blur
  const Rotor = ({ cx, cy }: { cx: number; cy: number }) => (
    <g style={{ transformOrigin: `${cx}px ${cy}px` }}>
      {/* motor housing */}
      <circle cx={cx} cy={cy} r={9} fill="url(#motorGrad)" />
      <circle cx={cx} cy={cy} r={9} fill="none" stroke="#0f172a" strokeWidth={1.5} />
      <circle cx={cx} cy={cy} r={3} fill="#0ea5e9" />
      {/* spinning blur disc */}
      <motion.circle
        cx={cx}
        cy={cy}
        r={26}
        fill="url(#bladeBlur)"
        opacity={0.55}
        animate={{ rotate: 360 }}
        transition={{ duration: 0.18, repeat: Infinity, ease: 'linear' }}
        style={{ transformOrigin: `${cx}px ${cy}px`, transformBox: 'fill-box' }}
      />
      {/* visible blade hint */}
      <motion.g
        animate={{ rotate: 360 }}
        transition={{ duration: 0.12, repeat: Infinity, ease: 'linear' }}
        style={{ transformOrigin: `${cx}px ${cy}px`, transformBox: 'fill-box' }}
      >
        <ellipse cx={cx} cy={cy} rx={26} ry={1.2} fill="#0f172a" opacity={0.35} />
      </motion.g>
    </g>
  );

  return (
    <svg
      viewBox="0 0 280 160"
      className="h-28 w-auto sm:h-32"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="bodyGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#1f2937" />
          <stop offset="50%" stopColor="#0f172a" />
          <stop offset="100%" stopColor="#020617" />
        </linearGradient>
        <linearGradient id="bodyHighlight" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="armGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#374151" />
          <stop offset="100%" stopColor="#0f172a" />
        </linearGradient>
        <radialGradient id="motorGrad" cx="0.5" cy="0.4" r="0.6">
          <stop offset="0%" stopColor="#475569" />
          <stop offset="100%" stopColor="#0f172a" />
        </radialGradient>
        <radialGradient id="bladeBlur" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0%" stopColor="#64748b" stopOpacity="0" />
          <stop offset="60%" stopColor="#64748b" stopOpacity="0.25" />
          <stop offset="100%" stopColor="#64748b" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="lensGrad" cx="0.4" cy="0.4" r="0.6">
          <stop offset="0%" stopColor="#38bdf8" />
          <stop offset="60%" stopColor="#0369a1" />
          <stop offset="100%" stopColor="#0c4a6e" />
        </radialGradient>
        <linearGradient id="nozzleGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#cbd5e1" />
          <stop offset="50%" stopColor="#64748b" />
          <stop offset="100%" stopColor="#1e293b" />
        </linearGradient>
      </defs>

      {/* Arms (carbon fiber) — back arms first for depth */}
      <g stroke="url(#armGrad)" strokeWidth={6} strokeLinecap="round">
        <line x1="100" y1="88" x2="50" y2="50" />
        <line x1="180" y1="88" x2="230" y2="50" />
        <line x1="100" y1="88" x2="50" y2="126" />
        <line x1="180" y1="88" x2="230" y2="126" />
      </g>
      {/* Arm highlight stripe */}
      <g stroke="#94a3b8" strokeWidth={1} strokeLinecap="round" opacity={0.5}>
        <line x1="100" y1="86" x2="50" y2="48" />
        <line x1="180" y1="86" x2="230" y2="48" />
        <line x1="100" y1="90" x2="50" y2="128" />
        <line x1="180" y1="90" x2="230" y2="128" />
      </g>

      {/* Rear rotors first (depth) */}
      <Rotor cx={50} cy={50} />
      <Rotor cx={230} cy={50} />

      {/* Body — main fuselage */}
      <g>
        <rect
          x="92"
          y="68"
          width="100"
          height="42"
          rx="14"
          fill="url(#bodyGrad)"
          stroke="#020617"
          strokeWidth={1}
        />
        {/* glossy top highlight */}
        <rect x="98" y="71" width="88" height="14" rx="7" fill="url(#bodyHighlight)" />
        {/* Skytech accent stripe */}
        <rect x="92" y="95" width="100" height="3" fill="#2563eb" opacity={0.85} />
        {/* status LEDs */}
        <circle cx="100" cy="103" r="2" fill="#22c55e" />
        <circle cx="108" cy="103" r="2" fill="#ef4444" />
        {/* Branding dot row */}
        <circle cx="180" cy="103" r="1.5" fill="#94a3b8" opacity={0.7} />
        <circle cx="184" cy="103" r="1.5" fill="#94a3b8" opacity={0.7} />
      </g>

      {/* Antennas on top */}
      <g stroke="#0f172a" strokeWidth={1.5} strokeLinecap="round">
        <line x1="115" y1="68" x2="113" y2="56" />
        <line x1="170" y1="68" x2="172" y2="56" />
        <circle cx="113" cy="55" r="1.5" fill="#0f172a" />
        <circle cx="172" cy="55" r="1.5" fill="#0f172a" />
      </g>

      {/* Gimbal camera (under-front of body) */}
      <g>
        <rect x="148" y="108" width="22" height="18" rx="4" fill="#0f172a" stroke="#020617" />
        <circle cx="159" cy="117" r="6" fill="url(#lensGrad)" stroke="#0f172a" strokeWidth={1} />
        <circle cx="157" cy="115" r="2" fill="#bae6fd" opacity={0.85} />
      </g>

      {/* Landing skids */}
      <g stroke="#1f2937" strokeWidth={2.5} strokeLinecap="round" fill="none">
        <line x1="110" y1="110" x2="105" y2="138" />
        <line x1="172" y1="110" x2="177" y2="138" />
        <line x1="98" y1="138" x2="184" y2="138" />
      </g>

      {/* Front spray nozzle assembly (right side) */}
      <g>
        {/* mounting bracket */}
        <rect x="188" y="75" width="10" height="28" rx="2" fill="#1e293b" />
        {/* nozzle body */}
        <rect x="196" y="80" width="40" height="18" rx="3" fill="url(#nozzleGrad)" stroke="#0f172a" strokeWidth={1} />
        {/* flange */}
        <rect x="234" y="76" width="6" height="26" rx="1.5" fill="#475569" stroke="#0f172a" strokeWidth={1} />
        {/* nozzle tip */}
        <rect x="240" y="84" width="10" height="10" rx="1" fill="#cbd5e1" stroke="#0f172a" strokeWidth={1} />
        <circle cx="250" cy="89" r="3.5" fill="#0c4a6e" stroke="#020617" strokeWidth={0.8} />
        <circle cx="249.5" cy="88.5" r="1.2" fill="#38bdf8" />
        {/* hose entry */}
        <path d="M188 89 Q 178 92 174 100" stroke="#475569" strokeWidth={2.5} fill="none" strokeLinecap="round" />
      </g>

      {/* Front rotors on top of body for foreground depth */}
      <Rotor cx={50} cy={126} />
      <Rotor cx={230} cy={126} />
    </svg>
  );
}

function WaterSpray() {
  // Water droplets emerging from the nozzle (right side of drone)
  const drops = Array.from({ length: 14 });
  return (
    <div className="pointer-events-none absolute right-[-2%] top-[58%] -translate-y-1/2">
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
