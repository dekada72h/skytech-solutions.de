/* ------------------------------------------------------------------ */
/*  Shared calculator math + types — single source of truth for UI/PDF */
/* ------------------------------------------------------------------ */

import { z } from 'zod';

/* === ERTRAGSVERLUST (yield loss from dirty panels) =================== */

export const environments = {
  wohngebiet: { label: 'Wohngebiet', annualLossRate: 0.04 },
  landwirtschaft: { label: 'Landwirtschaft', annualLossRate: 0.12 },
  industrie: { label: 'Industrie', annualLossRate: 0.18 },
  wald: { label: 'Wald / Pollen', annualLossRate: 0.10 },
} as const;
export type Environment = keyof typeof environments;

export const ertragsverlustInput = z.object({
  kwp: z.number().min(1).max(2000),                         // installed kW peak
  monthsSinceCleaning: z.number().min(0).max(120),          // months since last cleaning
  environment: z.enum(['wohngebiet', 'landwirtschaft', 'industrie', 'wald']),
  einspeiseverguetung: z.number().min(0).max(50).default(8.2), // ct/kWh
  selbstverbrauchAnteil: z.number().min(0).max(100).default(30), // %
  strompreis: z.number().min(0).max(100).default(35),       // ct/kWh
});
export type ErtragsverlustInput = z.infer<typeof ertragsverlustInput>;

export interface ErtragsverlustResult {
  yearlyKwhCapacity: number;        // kWp × 950 (DE Süd avg)
  lossFactor: number;               // 0..1
  lostKwhAnnual: number;
  lostEarningsAnnual: number;       // €
  lostEarnings5y: number;           // €
  paneeleEnvLabel: string;
  formula: string;
}

export function calcErtragsverlust(input: ErtragsverlustInput): ErtragsverlustResult {
  const env = environments[input.environment];
  const yearlyKwhCapacity = input.kwp * 950;
  const annualLoss = env.annualLossRate;
  // Loss accumulates with diminishing increment: 1 - exp(-rate * months/12)
  const months = input.monthsSinceCleaning;
  const lossFactor = 1 - Math.exp(-annualLoss * (months / 12));
  const lostKwhAnnual = yearlyKwhCapacity * lossFactor;

  const selbst = input.selbstverbrauchAnteil / 100;
  const wert =
    lostKwhAnnual * selbst * (input.strompreis / 100) +
    lostKwhAnnual * (1 - selbst) * (input.einspeiseverguetung / 100);

  return {
    yearlyKwhCapacity: Math.round(yearlyKwhCapacity),
    lossFactor: Math.round(lossFactor * 1000) / 1000,
    lostKwhAnnual: Math.round(lostKwhAnnual),
    lostEarningsAnnual: Math.round(wert),
    lostEarnings5y: Math.round(wert * 5),
    paneeleEnvLabel: env.label,
    formula: `${input.kwp} kWp × 950 kWh/kWp × (1 − e^(−${annualLoss} × ${months}/12))`,
  };
}

/* === REINIGUNGSKOSTEN (cleaning cost estimator) ===================== */

export const roofTypes = {
  flach: { label: 'Flachdach (zugänglich)', factor: 1.0 },
  satteldach: { label: 'Satteldach (mittel geneigt)', factor: 1.25 },
  steildach: { label: 'Steildach / hoch', factor: 1.5 },
  freiflaeche: { label: 'Freiflächenanlage', factor: 0.8 },
} as const;
export type RoofType = keyof typeof roofTypes;

export const accessTypes = {
  einfach: { label: 'Einfach (bis 4 m)', factor: 1.0 },
  mittel: { label: 'Mittel (4–10 m)', factor: 1.2 },
  schwierig: { label: 'Schwierig (>10 m oder Drohne)', factor: 1.4 },
} as const;
export type AccessType = keyof typeof accessTypes;

export const reinigungskostenInput = z.object({
  panelCount: z.number().min(1).max(10000),
  roofType: z.enum(['flach', 'satteldach', 'steildach', 'freiflaeche']),
  access: z.enum(['einfach', 'mittel', 'schwierig']),
  withThermography: z.boolean().default(false),
});
export type ReinigungskostenInput = z.infer<typeof reinigungskostenInput>;

export interface ReinigungskostenResult {
  basePricePerPanel: number;        // €
  totalCleaningCost: number;        // €
  thermographySurcharge: number;
  totalCost: number;
  pricePerPanelEffective: number;
  rangeMin: number;
  rangeMax: number;
  notes: string[];
}

export function calcReinigungskosten(input: ReinigungskostenInput): ReinigungskostenResult {
  const base = 4.5; // € base per panel (drone)
  const cleaningCost =
    input.panelCount *
    base *
    roofTypes[input.roofType].factor *
    accessTypes[input.access].factor;
  const thermo = input.withThermography ? input.panelCount * 1.5 : 0;
  const total = cleaningCost + thermo;
  const notes: string[] = [];
  if (input.panelCount >= 100) notes.push('Mengenrabatt ab 100 Modulen möglich (auf Anfrage).');
  if (input.access === 'schwierig') notes.push('Drohnenreinigung empfohlen — kein Gerüst nötig.');
  if (input.withThermography) notes.push('Inklusive Foto-Dokumentation und Thermovision-Bericht.');
  return {
    basePricePerPanel: base,
    totalCleaningCost: Math.round(cleaningCost),
    thermographySurcharge: Math.round(thermo),
    totalCost: Math.round(total),
    pricePerPanelEffective: Math.round((total / input.panelCount) * 100) / 100,
    rangeMin: Math.round(total * 0.85),
    rangeMax: Math.round(total * 1.15),
    notes,
  };
}

/* === AMORTISATION (payback / ROI) ================================== */

export const amortisationInput = z.object({
  cleaningCost: z.number().min(50).max(50000),
  lostEarningsAnnual: z.number().min(50).max(50000),
  cleaningInterval: z.number().min(0.5).max(5).default(2),  // years between cleanings
});
export type AmortisationInput = z.infer<typeof amortisationInput>;

export interface AmortisationResult {
  paybackMonths: number;
  paybackYears: number;
  fiveYearGain: number;        // earnings saved minus cleaning costs over 5y
  tenYearGain: number;
  costPerYear: number;
  yearlyTable: { year: number; recovered: number; spent: number; net: number }[];
}

export function calcAmortisation(input: AmortisationInput): AmortisationResult {
  const monthlyEarnings = input.lostEarningsAnnual / 12;
  const paybackMonths = Math.ceil(input.cleaningCost / monthlyEarnings);
  const paybackYears = Math.round((paybackMonths / 12) * 10) / 10;
  const cleaningsPer5y = Math.ceil(5 / input.cleaningInterval);
  const cleaningsPer10y = Math.ceil(10 / input.cleaningInterval);
  const totalCost5y = input.cleaningCost * cleaningsPer5y;
  const totalCost10y = input.cleaningCost * cleaningsPer10y;
  const totalRecovered5y = input.lostEarningsAnnual * 5;
  const totalRecovered10y = input.lostEarningsAnnual * 10;
  const yearlyTable = Array.from({ length: 5 }, (_, i) => {
    const year = i + 1;
    const cleaningsByYear = Math.ceil(year / input.cleaningInterval);
    const spent = input.cleaningCost * cleaningsByYear;
    const recovered = input.lostEarningsAnnual * year;
    return { year, recovered: Math.round(recovered), spent: Math.round(spent), net: Math.round(recovered - spent) };
  });
  return {
    paybackMonths,
    paybackYears,
    fiveYearGain: Math.round(totalRecovered5y - totalCost5y),
    tenYearGain: Math.round(totalRecovered10y - totalCost10y),
    costPerYear: Math.round(input.cleaningCost / input.cleaningInterval),
    yearlyTable,
  };
}

/* === FORMATTING HELPERS ============================================ */

export function fmtEur(n: number): string {
  return new Intl.NumberFormat('de-DE', {
    style: 'currency',
    currency: 'EUR',
    maximumFractionDigits: 0,
  }).format(n);
}

export function fmtNum(n: number): string {
  return new Intl.NumberFormat('de-DE', { maximumFractionDigits: 0 }).format(n);
}

export function fmtPct(n: number): string {
  return new Intl.NumberFormat('de-DE', {
    style: 'percent',
    maximumFractionDigits: 1,
  }).format(n);
}
