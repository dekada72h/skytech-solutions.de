// ─────────────────────────────────────────────────────────────────────────
// /404 (not-found.tsx) — niestandardowa strona 404 z animacją drona.
// Animacja w fazach: dron wlatuje od dołu → przesuwa się w lewo → myje
// lewą połowę brudnego panelu PV → leci w prawo → myje prawą → finalny
// sweep → wylatuje w górę. Spod brudnej warstwy wyłania się czysty panel
// + komunikat + logo Skytech. Wąż wodny rysowany jako SVG path łączący
// dron z dolnej krawędzi (źródło wody), aktualizuje się dynamicznie.
// ─────────────────────────────────────────────────────────────────────────
'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

// Stage = faza animacji. useEffect przełącza je sekwencyjnie wg STAGE_DURATIONS.
type Stage =
  | 'enter'
  | 'goLeft'
  | 'cleanLeft'
  | 'goRight'
  | 'cleanRight'
  | 'finalSweep'
  | 'exit'
  | 'done';

const STAGE_DURATIONS: Record<Stage, number> = {
  enter: 1300,
  goLeft: 600,
  cleanLeft: 1400,
  goRight: 1000,
  cleanRight: 1400,
  finalSweep: 900,
  exit: 1100,
  done: 0,
};

const STAGE_ORDER: Stage[] = [
  'enter',
  'goLeft',
  'cleanLeft',
  'goRight',
  'cleanRight',
  'finalSweep',
  'exit',
  'done',
];

// ─────────────────────────────────────────────────────────────────────────────
// DroneSVG — front-view dron inspirowany DJI Matrice 300/350 RTK:
// gradientowy korpus, gimbal kamery z lensem, anteny RTK, A-frame
// landing gear, dysza zraszająca pod brzuchem. Wszystkie elementy
// stylowane gradientami SVG (defs → linearGradient/radialGradient).
// ─────────────────────────────────────────────────────────────────────────────
function DroneSVG() {
  const Arm = ({ side }: { side: 'left' | 'right' }) => {
    const flip = side === 'left' ? -1 : 1;
    return (
      <g transform={`translate(240,118) scale(${flip},1)`}>
        <path d="M 0 0 L 175 22" stroke="url(#armGrad)" strokeWidth={14} strokeLinecap="round" fill="none" />
        <path d="M 5 -4 L 173 18" stroke="#cbd5e1" strokeWidth={1.5} strokeLinecap="round" opacity={0.55} />
        <path d="M 0 4 L 175 26" stroke="#020617" strokeWidth={1} strokeLinecap="round" opacity={0.45} />
        {/* Motor housing */}
        <ellipse cx={178} cy={22} rx={14} ry={20} fill="url(#motorGrad)" stroke="#020617" strokeWidth={1} />
        <ellipse cx={178} cy={6} rx={14} ry={5} fill="#1f2937" stroke="#020617" strokeWidth={1} />
        <ellipse cx={178} cy={6} rx={9} ry={3} fill="#0f172a" />
        <ellipse cx={178} cy={40} rx={11} ry={3.5} fill="#1f2937" />
        <rect x={40} y={6} width={50} height={2.5} fill="#2563eb" opacity={0.85} />

        {/* Propeller — front view */}
        <motion.g
          animate={{ scaleX: [1, 1.02, 0.98, 1] }}
          transition={{ duration: 0.25, repeat: Infinity, ease: 'linear' }}
          style={{ transformOrigin: '178px 6px', transformBox: 'fill-box' }}
        >
          <ellipse cx={178} cy={4} rx={95} ry={10} fill="url(#bladeBlur)" opacity={0.55} />
          <ellipse cx={178} cy={4} rx={95} ry={3} fill="#0f172a" opacity={0.75} />
          <ellipse cx={178} cy={4} rx={95} ry={1.5} fill="#1e293b" />
        </motion.g>
      </g>
    );
  };

  return (
    <svg
      viewBox="0 0 480 340"
      className="h-44 w-auto sm:h-52 md:h-56 drop-shadow-2xl"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="bodyGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f1f5f9" />
          <stop offset="35%" stopColor="#cbd5e1" />
          <stop offset="65%" stopColor="#94a3b8" />
          <stop offset="100%" stopColor="#475569" />
        </linearGradient>
        <linearGradient id="bodySide" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#475569" />
          <stop offset="20%" stopColor="#94a3b8" />
          <stop offset="50%" stopColor="#e2e8f0" />
          <stop offset="80%" stopColor="#94a3b8" />
          <stop offset="100%" stopColor="#475569" />
        </linearGradient>
        <linearGradient id="armGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#1e293b" />
          <stop offset="50%" stopColor="#0f172a" />
          <stop offset="100%" stopColor="#020617" />
        </linearGradient>
        <radialGradient id="motorGrad" cx="0.4" cy="0.3" r="0.7">
          <stop offset="0%" stopColor="#64748b" />
          <stop offset="60%" stopColor="#1e293b" />
          <stop offset="100%" stopColor="#020617" />
        </radialGradient>
        <radialGradient id="bladeBlur" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0%" stopColor="#475569" stopOpacity="0" />
          <stop offset="60%" stopColor="#475569" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#475569" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="lensGrad" cx="0.4" cy="0.4" r="0.6">
          <stop offset="0%" stopColor="#7dd3fc" />
          <stop offset="40%" stopColor="#0284c7" />
          <stop offset="80%" stopColor="#0c4a6e" />
          <stop offset="100%" stopColor="#020617" />
        </radialGradient>
        <radialGradient id="sensorGrad" cx="0.4" cy="0.3" r="0.7">
          <stop offset="0%" stopColor="#475569" />
          <stop offset="50%" stopColor="#1e293b" />
          <stop offset="100%" stopColor="#020617" />
        </radialGradient>
        <linearGradient id="nozzleGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#e2e8f0" />
          <stop offset="40%" stopColor="#94a3b8" />
          <stop offset="100%" stopColor="#1e293b" />
        </linearGradient>
      </defs>

      {/* Antennas */}
      <g stroke="#0f172a" strokeWidth={2} strokeLinecap="round">
        <line x1={218} y1={70} x2={216} y2={48} />
        <line x1={262} y1={70} x2={264} y2={48} />
        <circle cx={216} cy={46} r={2} fill="#0f172a" />
        <circle cx={264} cy={46} r={2} fill="#0f172a" />
      </g>

      <Arm side="left" />
      <Arm side="right" />

      {/* === BODY === */}
      <g>
        <path
          d="M 215 72 H 265 Q 280 72 284 88 L 292 142 Q 294 156 282 162 L 256 168 Q 240 172 224 168 L 198 162 Q 186 156 188 142 L 196 88 Q 200 72 215 72 Z"
          fill="url(#bodyGrad)"
          stroke="#1e293b"
          strokeWidth={1.5}
        />
        <path
          d="M 218 78 H 262 Q 274 78 276 90 L 278 100 L 202 100 L 204 90 Q 206 78 218 78 Z"
          fill="url(#bodySide)"
          opacity={0.9}
        />
        <line x1={195} y1={120} x2={285} y2={120} stroke="#475569" strokeWidth={0.7} opacity={0.6} />
        <rect x={194} y={134} width={92} height={3} fill="#2563eb" />
        <rect x={194} y={138} width={92} height={1} fill="#1d4ed8" opacity={0.8} />
        <g stroke="#0f172a" strokeWidth={0.9} opacity={0.6}>
          <line x1={210} y1={148} x2={222} y2={148} />
          <line x1={210} y1={151} x2={222} y2={151} />
          <line x1={210} y1={154} x2={222} y2={154} />
          <line x1={258} y1={148} x2={270} y2={148} />
          <line x1={258} y1={151} x2={270} y2={151} />
          <line x1={258} y1={154} x2={270} y2={154} />
        </g>
        <circle cx={232} cy={152} r={2.2} fill="#22c55e" />
        <circle cx={240} cy={152} r={2.2} fill="#ef4444" />
        <circle cx={248} cy={152} r={2.2} fill="#fbbf24" />
        <rect x={228} y={107} width={24} height={1.3} fill="#0f172a" opacity={0.7} />
      </g>

      {/* Top sensor domes */}
      <g>
        <ellipse cx={222} cy={84} rx={9} ry={7} fill="url(#sensorGrad)" stroke="#020617" strokeWidth={1} />
        <ellipse cx={258} cy={84} rx={9} ry={7} fill="url(#sensorGrad)" stroke="#020617" strokeWidth={1} />
        <circle cx={219} cy={82} r={2} fill="#7dd3fc" opacity={0.85} />
        <circle cx={255} cy={82} r={2} fill="#7dd3fc" opacity={0.85} />
      </g>

      {/* Front gimbal camera */}
      <g>
        <path d="M 222 165 Q 240 178 258 165" stroke="#1e293b" strokeWidth={3} fill="none" />
        <circle cx={240} cy={178} r={14} fill="#0f172a" stroke="#020617" strokeWidth={1} />
        <circle cx={240} cy={180} r={10} fill="#020617" />
        <circle cx={240} cy={180} r={8} fill="url(#lensGrad)" />
        <circle cx={240} cy={180} r={4} fill="#0c4a6e" />
        <circle cx={236} cy={176} r={1.8} fill="#bae6fd" opacity={0.95} />
        <circle cx={244} cy={184} r={0.8} fill="#bae6fd" opacity={0.6} />
      </g>

      {/* Spray nozzle assembly (downward) */}
      <g>
        <rect x={232} y={158} width={16} height={8} fill="#1e293b" stroke="#020617" strokeWidth={0.8} />
        <rect x={230} y={195} width={20} height={22} rx={2} fill="url(#nozzleGrad)" stroke="#0f172a" strokeWidth={1} />
        <rect x={228} y={193} width={24} height={4} fill="#475569" stroke="#0f172a" strokeWidth={0.8} />
        <path d="M 232 217 L 248 217 L 244 224 L 236 224 Z" fill="#cbd5e1" stroke="#0f172a" strokeWidth={1} />
        <ellipse cx={240} cy={224} rx={3} ry={1.5} fill="#020617" />
        <path d="M 240 165 Q 252 175 248 195" stroke="#1e293b" strokeWidth={3.5} fill="none" strokeLinecap="round" />
        <path d="M 240 165 Q 252 175 248 195" stroke="#475569" strokeWidth={1} fill="none" strokeLinecap="round" opacity={0.6} />
      </g>

      {/* Landing gear */}
      <g stroke="#1e293b" strokeWidth={3.5} strokeLinecap="round" fill="none">
        <line x1={215} y1={166} x2={170} y2={300} />
        <line x1={205} y1={155} x2={140} y2={300} />
        <line x1={195} y1={210} x2={170} y2={258} />
        <line x1={138} y1={302} x2={188} y2={302} />
        <line x1={265} y1={166} x2={310} y2={300} />
        <line x1={275} y1={155} x2={340} y2={300} />
        <line x1={285} y1={210} x2={310} y2={258} />
        <line x1={292} y1={302} x2={342} y2={302} />
      </g>
      <g fill="#475569" stroke="#0f172a" strokeWidth={0.8}>
        <rect x={134} y={297} width={58} height={6} rx={2} />
        <rect x={288} y={297} width={58} height={6} rx={2} />
      </g>
    </svg>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// WaterSpray — strumień wody w dół z dyszy + niebieski cone-glow.
// 22 niebieskich kropli rozsianych w stożku, każda z infinite loop
// (animacja x/y/opacity) — daje efekt ciągłego rozpylania.
// ─────────────────────────────────────────────────────────────────────────────
function WaterSpray() {
  const drops = Array.from({ length: 22 });
  return (
    <div className="pointer-events-none absolute left-1/2 top-[68%] -translate-x-1/2">
      {drops.map((_, i) => {
        const xSpread = ((i % 7) - 3) * 6;
        const delay = (i * 0.05) % 0.7;
        return (
          <motion.span
            key={i}
            className="absolute block h-1.5 w-1.5 rounded-full bg-sky-400/80"
            initial={{ x: 0, y: 0, opacity: 0, scale: 1 }}
            animate={{
              x: [0, xSpread * 0.4, xSpread],
              y: [0, 70, 150],
              opacity: [0, 1, 0],
              scale: [1, 0.95, 0.45],
            }}
            transition={{ duration: 0.85, delay, repeat: Infinity, ease: 'easeIn' }}
            style={{ filter: 'drop-shadow(0 0 4px rgba(56,189,248,0.7))' }}
          />
        );
      })}
      <motion.div
        className="absolute left-1/2 -translate-x-1/2"
        style={{
          width: 90,
          height: 150,
          background:
            'linear-gradient(to bottom, rgba(56,189,248,0.4), rgba(56,189,248,0))',
          clipPath: 'polygon(45% 0%, 55% 0%, 100% 100%, 0% 100%)',
          filter: 'blur(7px)',
        }}
        animate={{ opacity: [0.4, 0.75, 0.4] }}
        transition={{ duration: 0.6, repeat: Infinity }}
      />
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// PVPanelClean — czysty panel PV: 6×4 ogniwa krzemowe (deep blue
// gradient + busbar w środku każdego ogniwa). Renderowany pod
// brudną warstwą — odsłania się gdy dron zmywa.
// ─────────────────────────────────────────────────────────────────────────────
function PVPanelClean() {
  const cells = Array.from({ length: 24 });
  return (
    <div className="absolute inset-0 grid grid-cols-6 grid-rows-4 gap-[3px] bg-slate-300 p-[5px]">
      {cells.map((_, i) => (
        <div
          key={i}
          className="relative overflow-hidden rounded-sm"
          style={{
            background:
              'linear-gradient(135deg, #1e3a8a 0%, #1e40af 40%, #2563eb 70%, #1e40af 100%)',
            backgroundImage:
              'repeating-linear-gradient(0deg, rgba(203,213,225,0.18) 0px, rgba(203,213,225,0.18) 1px, transparent 1px, transparent 14%), linear-gradient(135deg, #1e3a8a 0%, #1e40af 40%, #2563eb 70%, #1e40af 100%)',
          }}
        >
          {/* central busbar (vertical) */}
          <div className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-slate-300/40" />
          {/* sun sparkle */}
          <div
            className="absolute -right-2 -top-2 h-6 w-6 rounded-full opacity-30"
            style={{ background: 'radial-gradient(circle, white, transparent 60%)' }}
          />
        </div>
      ))}
    </div>
  );
}

// Dirty PV panel — same look but obscured with grime, dust, droppings
function PVPanelDirty() {
  return (
    <div className="absolute inset-0">
      <PVPanelClean />
      {/* Brown/grey grime haze */}
      <div
        className="absolute inset-0 mix-blend-multiply"
        style={{
          background:
            'linear-gradient(180deg, rgba(120,100,70,0.55) 0%, rgba(80,70,55,0.7) 50%, rgba(60,50,40,0.55) 100%)',
        }}
      />
      {/* Dust particles + bird droppings + leaves */}
      <div
        className="absolute inset-0 mix-blend-overlay opacity-90"
        style={{
          backgroundImage:
            'radial-gradient(circle at 12% 20%, rgba(255,250,240,0.85) 0px, rgba(255,250,240,0.85) 8px, transparent 16px), radial-gradient(circle at 82% 18%, rgba(245,240,225,0.8) 0px, rgba(245,240,225,0.8) 6px, transparent 12px), radial-gradient(circle at 28% 70%, rgba(120,90,60,0.7) 0px, transparent 30px), radial-gradient(circle at 65% 55%, rgba(100,80,55,0.65) 0px, transparent 40px), radial-gradient(circle at 50% 85%, rgba(80,60,40,0.6) 0px, transparent 50px), radial-gradient(circle at 92% 78%, rgba(255,245,230,0.7) 0px, rgba(255,245,230,0.7) 5px, transparent 11px), radial-gradient(circle at 38% 38%, rgba(110,80,55,0.5) 0px, transparent 35px)',
        }}
      />
      {/* Overall darken (panel underperforming) */}
      <div className="absolute inset-0 bg-black/30" />
      {/* 404 — embedded in dirt */}
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="select-none text-[20vw] font-extrabold leading-none text-white/15 sm:text-[180px]">
          404
        </span>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Component
// ─────────────────────────────────────────────────────────────────────────────
export default function NotFound() {
  const [stage, setStage] = useState<Stage>('enter');

  useEffect(() => {
    const timeouts: ReturnType<typeof setTimeout>[] = [];
    let cumulative = 0;
    for (let i = 1; i < STAGE_ORDER.length; i++) {
      const prev = STAGE_ORDER[i - 1];
      cumulative += STAGE_DURATIONS[prev];
      const next = STAGE_ORDER[i];
      timeouts.push(setTimeout(() => setStage(next), cumulative));
    }
    return () => timeouts.forEach(clearTimeout);
  }, []);

  // Drone position per stage — drone SWEEPS during clean stages so the spray
  // travels in lockstep with the dirty-layer wipe direction.
  // cleanLeft: drone moves x: 15% → 50% (matches wipe left-edge → center)
  // cleanRight: drone moves x: 85% → 50% (matches wipe right-edge → center)
  const dronePosCurrent: { left: string; top: string } =
    stage === 'enter' ? { left: '50%', top: '8%' } :
    stage === 'goLeft' ? { left: '15%', top: '12%' } :
    stage === 'cleanLeft' ? { left: '50%', top: '12%' } :
    stage === 'goRight' ? { left: '85%', top: '12%' } :
    stage === 'cleanRight' ? { left: '50%', top: '12%' } :
    stage === 'finalSweep' ? { left: '50%', top: '14%' } :
    stage === 'exit' ? { left: '50%', top: '-110%' } :
    { left: '50%', top: '-110%' };

  const showSpray = stage === 'cleanLeft' || stage === 'cleanRight' || stage === 'finalSweep';
  const showHose = stage !== 'done';

  // Hose path (bottom-center water source → drone body bottom).
  // dx,dy in 0–100 viewBox units (% of stage).
  const dx = parseFloat(dronePosCurrent.left);
  const dyTop = parseFloat(dronePosCurrent.top);
  // Hose attaches ~22% below the drone wrapper's top edge (roughly the body).
  const dy = dyTop + 22;
  const cy1 = dy + 22;
  const hosePath = `M ${dx} ${dy} C ${dx} ${cy1}, 50 88, 50 100`;
  // Pre-render starting path: drone below stage (matches enter initial pos).
  const hoseInitial = 'M 50 142 C 50 164, 50 88, 50 100';

  // Dirty layer wipes — once cleaned, STAYS cleaned for the rest of the sequence
  const leftClipDone = ['goRight', 'cleanRight', 'finalSweep', 'exit', 'done'].includes(stage);
  const leftClipping = stage === 'cleanLeft';
  const rightClipDone = ['finalSweep', 'exit', 'done'].includes(stage);
  const rightClipping = stage === 'cleanRight';

  return (
    <main className="flex min-h-screen flex-col bg-white">
      <Navbar />

      <section className="relative flex flex-1 items-center justify-center overflow-hidden px-4 pt-24 pb-16 sm:px-6">
        <div className="relative mx-auto w-full max-w-3xl">
          {/* Stage area */}
          <div className="relative aspect-[16/11] w-full overflow-hidden rounded-3xl border border-slate-300 shadow-2xl">
            {/* Clean PV panel — underneath */}
            <PVPanelClean />

            {/* DIRTY left half */}
            <motion.div
              className="absolute inset-0"
              initial={{ clipPath: 'inset(0 50% 0 0)' }}
              animate={{
                clipPath: leftClipDone
                  ? 'inset(0 50% 0 50%)'
                  : leftClipping
                  ? 'inset(0 50% 0 50%)'
                  : 'inset(0 50% 0 0)',
              }}
              transition={{
                duration: leftClipping ? STAGE_DURATIONS.cleanLeft / 1000 : 0,
                ease: 'easeInOut',
              }}
            >
              <PVPanelDirty />
            </motion.div>

            {/* DIRTY right half */}
            <motion.div
              className="absolute inset-0"
              initial={{ clipPath: 'inset(0 0 0 50%)' }}
              animate={{
                clipPath: rightClipDone
                  ? 'inset(0 50% 0 50%)'
                  : rightClipping
                  ? 'inset(0 50% 0 50%)'
                  : 'inset(0 0 0 50%)',
              }}
              transition={{
                duration: rightClipping ? STAGE_DURATIONS.cleanRight / 1000 : 0,
                ease: 'easeInOut',
              }}
            >
              <PVPanelDirty />
            </motion.div>

            {/* Water hose — connects drone body to bottom-center water source */}
            <AnimatePresence>
              {showHose && (
                <motion.svg
                  key="hose"
                  className="pointer-events-none absolute inset-0 h-full w-full"
                  viewBox="0 0 100 100"
                  preserveAspectRatio="none"
                  initial={{ opacity: 1 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  {/* Hose shadow */}
                  <motion.path
                    initial={{ d: hoseInitial }}
                    animate={{ d: hosePath }}
                    transition={{ duration: STAGE_DURATIONS[stage] / 1000, ease: 'easeInOut' }}
                    stroke="#020617"
                    strokeWidth={5}
                    strokeLinecap="round"
                    fill="none"
                    vectorEffect="non-scaling-stroke"
                    opacity={0.4}
                  />
                  {/* Hose body */}
                  <motion.path
                    initial={{ d: hoseInitial }}
                    animate={{ d: hosePath }}
                    transition={{ duration: STAGE_DURATIONS[stage] / 1000, ease: 'easeInOut' }}
                    stroke="#1e293b"
                    strokeWidth={4}
                    strokeLinecap="round"
                    fill="none"
                    vectorEffect="non-scaling-stroke"
                  />
                  {/* Hose highlight */}
                  <motion.path
                    initial={{ d: hoseInitial }}
                    animate={{ d: hosePath }}
                    transition={{ duration: STAGE_DURATIONS[stage] / 1000, ease: 'easeInOut' }}
                    stroke="#475569"
                    strokeWidth={1.2}
                    strokeLinecap="round"
                    fill="none"
                    vectorEffect="non-scaling-stroke"
                    opacity={0.65}
                  />
                </motion.svg>
              )}
            </AnimatePresence>

            {/* Final-sweep wet shimmer line */}
            {(stage === 'cleanLeft' || stage === 'cleanRight' || stage === 'finalSweep') && (
              <motion.div
                className="pointer-events-none absolute top-0 h-full w-3 bg-gradient-to-b from-transparent via-sky-200/70 to-transparent"
                initial={{ left: '0%', opacity: 0.4 }}
                animate={{
                  left:
                    stage === 'cleanLeft'
                      ? ['0%', '50%']
                      : stage === 'cleanRight'
                      ? ['100%', '50%']
                      : ['0%', '100%'],
                  opacity: [0.5, 0.7, 0],
                }}
                transition={{
                  duration:
                    stage === 'finalSweep'
                      ? STAGE_DURATIONS.finalSweep / 1000
                      : (stage === 'cleanLeft'
                          ? STAGE_DURATIONS.cleanLeft
                          : STAGE_DURATIONS.cleanRight) / 1000,
                  ease: 'linear',
                }}
                style={{ filter: 'blur(3px)' }}
              />
            )}

            {/* Cleaned message — fades in after wipe done */}
            <AnimatePresence>
              {stage === 'done' && (
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 px-6">
                  <motion.div
                    initial={{ opacity: 0, y: -10, scale: 0.92 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.55, delay: 0.15, type: 'spring', stiffness: 130 }}
                    className="rounded-2xl bg-white px-6 py-4 shadow-xl ring-1 ring-slate-200"
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
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.55 }}
                    className="max-w-md rounded-2xl bg-white px-6 py-4 text-center shadow-xl ring-1 ring-slate-200"
                  >
                    <p className="text-base font-semibold text-gray-900 sm:text-lg">
                      Diese Seite wurde gerade frisch gereinigt.
                    </p>
                    <p className="mt-1.5 text-sm text-gray-600 sm:text-base">
                      So gründlich reinigt Skytech Solutions auch Ihre
                      Photovoltaikanlage – mit Drohnentechnologie bis 150 m Höhe.
                    </p>
                  </motion.div>
                </div>
              )}
            </AnimatePresence>

            {/* Drone — choreographed positions */}
            <motion.div
              className="absolute -translate-x-1/2"
              initial={{ left: '50%', top: '120%', opacity: 0 }}
              animate={{
                left: dronePosCurrent.left,
                top: dronePosCurrent.top,
                opacity: stage === 'enter' || stage === 'exit' ? 1 : 1,
              }}
              transition={{
                duration: STAGE_DURATIONS[stage] / 1000,
                ease:
                  stage === 'enter' ? 'easeOut' : stage === 'exit' ? 'easeIn' : 'easeInOut',
              }}
            >
              <motion.div
                animate={{ y: [0, -6, 0], x: [-2, 2, -2] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                className="relative"
              >
                <DroneSVG />
                {showSpray && <WaterSpray />}
              </motion.div>
            </motion.div>
          </div>

          {/* CTA */}
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
