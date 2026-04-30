// ─────────────────────────────────────────────────────────────────────────
// POST /api/pdf/ertragsverlust — generuje PDF raport ze stratą przychodu.
// Walidacja inputu (Zod), renderowanie szablonu pdfDocument + pdfChart,
// zwrot binarki PDF z attachment header (browser pobiera).
// ─────────────────────────────────────────────────────────────────────────
import { NextRequest, NextResponse } from 'next/server';
import { renderToBuffer } from '@react-pdf/renderer';
import { Text, View } from '@react-pdf/renderer';
import { z } from 'zod';
import {
  ertragsverlustInput,
  calcErtragsverlust,
  environments,
  fmtEur,
  fmtNum,
  fmtPct,
} from '@/lib/calculators';
import { BasePdfDocument, pdfStyles as s } from '@/lib/pdfDocument';
import { PdfBarChart } from '@/lib/pdfChart';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

const payloadSchema = z.object({
  input: ertragsverlustInput,
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { input } = payloadSchema.parse(body);
    const result = calcErtragsverlust(input);

    // Compare data: cost of waiting at +0/+6/+12/+24 months
    const compareData = [0, 6, 12, 24].map((off) => {
      const r = calcErtragsverlust({ ...input, monthsSinceCleaning: input.monthsSinceCleaning + off });
      return {
        label: off === 0 ? 'jetzt' : `+${off} M.`,
        value: r.lostEarningsAnnual,
        highlight: off === 0,
      };
    });

    const doc = BasePdfDocument({
      title: 'Ertragsverlust-Berechnung',
      subtitle: `Analyse Ihrer ${input.kwp} kWp PV-Anlage`,
      children: (
        <>
          <View style={s.section}>
            <Text style={s.sectionTitle}>Eingabewerte</Text>
            <View style={s.row}><Text style={s.label}>Anlagengröße</Text><Text style={s.value}>{input.kwp} kWp</Text></View>
            <View style={s.row}><Text style={s.label}>Letzte Reinigung vor</Text><Text style={s.value}>{input.monthsSinceCleaning} Monaten</Text></View>
            <View style={s.row}><Text style={s.label}>Umgebung</Text><Text style={s.value}>{environments[input.environment].label}</Text></View>
            <View style={s.row}><Text style={s.label}>Einspeisevergütung</Text><Text style={s.value}>{input.einspeiseverguetung} ct/kWh</Text></View>
            <View style={s.row}><Text style={s.label}>Eigenverbrauchsanteil</Text><Text style={s.value}>{input.selbstverbrauchAnteil}%</Text></View>
            <View style={s.row}><Text style={s.label}>Strompreis</Text><Text style={s.value}>{input.strompreis} ct/kWh</Text></View>
          </View>

          <View style={s.section}>
            <Text style={s.sectionTitle}>Ihr Ergebnis</Text>
            <View style={s.resultBox}>
              <Text style={s.resultLabel}>Jährlicher Ertragsverlust</Text>
              <Text style={s.resultValue}>{fmtEur(result.lostEarningsAnnual)}</Text>
              <Text style={s.resultSub}>≈ {fmtNum(result.lostKwhAnnual)} kWh entgangener Ertrag pro Jahr</Text>
            </View>

            <View style={s.miniGrid}>
              <View style={s.miniBox}>
                <Text style={s.miniLabel}>Verschmutzungsgrad</Text>
                <Text style={s.miniValue}>{fmtPct(result.lossFactor)}</Text>
              </View>
              <View style={s.miniBox}>
                <Text style={s.miniLabel}>Verlust in 5 Jahren</Text>
                <Text style={s.miniValue}>{fmtEur(result.lostEarnings5y)}</Text>
              </View>
              <View style={s.miniBox}>
                <Text style={s.miniLabel}>Theor. Jahreskapazität</Text>
                <Text style={s.miniValue}>{fmtNum(result.yearlyKwhCapacity)} kWh</Text>
              </View>
            </View>
          </View>

          <PdfBarChart title="Kosten der Verzögerung — Verlust pro Jahr" data={compareData} unit="€" />

          <View style={s.note}>
            <Text>
              Bei Umgebung &bdquo;{result.paneeleEnvLabel}&rdquo; beträgt der typische Effizienzverlust{' '}
              {fmtPct(environments[input.environment].annualLossRate)} pro Jahr ohne Reinigung.
              Die Berechnung berücksichtigt eine progressive Verschmutzungskurve über{' '}
              {input.monthsSinceCleaning} Monate.
            </Text>
          </View>

          <View style={s.section}>
            <Text style={s.sectionTitle}>Empfehlung</Text>
            <Text>
              Eine professionelle Reinigung Ihrer PV-Anlage kann den Ertragsverlust nahezu
              vollständig ausgleichen. Bei Industrie- und Landwirtschaftsanlagen empfehlen wir
              eine jährliche Reinigung, in Wohngebieten alle 2–3 Jahre.
            </Text>
          </View>

          <View style={s.section}>
            <Text style={s.sectionTitle}>Methodik &amp; Quellen</Text>
            <Text style={{ fontSize: 9, color: '#6b7280', lineHeight: 1.5 }}>
              Berechnung basiert auf Branchendurchschnittswerten und Studien des Fraunhofer ISE
              sowie TÜV-Berichten zur Photovoltaik-Wartung. Annahme: 950 kWh/kWp/Jahr typische
              Süddeutsche Erträge, exponentielle Verschmutzungskurve. Werte sind unverbindlich
              und ersetzen keine Vor-Ort-Messung.
            </Text>
          </View>
        </>
      ),
    });

    const buffer = await renderToBuffer(doc);
    return new NextResponse(new Uint8Array(buffer), {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="ertragsverlust-${input.kwp}kwp.pdf"`,
        'Cache-Control': 'no-store',
      },
    });
  } catch (e) {
    if (e instanceof z.ZodError) {
      return NextResponse.json({ error: 'Validation failed', details: e.issues }, { status: 400 });
    }
    console.error('PDF error:', e);
    return NextResponse.json({ error: 'PDF generation failed' }, { status: 500 });
  }
}
