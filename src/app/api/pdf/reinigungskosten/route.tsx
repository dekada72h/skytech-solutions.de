import { NextRequest, NextResponse } from 'next/server';
import { renderToBuffer, Text, View } from '@react-pdf/renderer';
import { z } from 'zod';
import {
  reinigungskostenInput,
  calcReinigungskosten,
  roofTypes,
  accessTypes,
  fmtEur,
} from '@/lib/calculators';
import { BasePdfDocument, pdfStyles as s } from '@/lib/pdfDocument';
import { PdfBarChart } from '@/lib/pdfChart';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

const payloadSchema = z.object({
  input: reinigungskostenInput,
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { input } = payloadSchema.parse(body);
    const result = calcReinigungskosten(input);
    const baseOnly = calcReinigungskosten({ ...input, withThermography: false });
    const withThermo = calcReinigungskosten({ ...input, withThermography: true });
    const compareData = [
      { label: 'nur Reinigung', value: baseOnly.totalCost, highlight: !input.withThermography },
      { label: '+ Thermografie', value: withThermo.totalCost, highlight: input.withThermography },
    ];

    const doc = BasePdfDocument({
      title: 'Reinigungskosten-Schätzung',
      subtitle: `Schätzung für ${input.panelCount} Module`,
      children: (
        <>
          <View style={s.section}>
            <Text style={s.sectionTitle}>Eingabewerte</Text>
            <View style={s.row}><Text style={s.label}>Anzahl Module</Text><Text style={s.value}>{input.panelCount}</Text></View>
            <View style={s.row}><Text style={s.label}>Dachtyp</Text><Text style={s.value}>{roofTypes[input.roofType].label}</Text></View>
            <View style={s.row}><Text style={s.label}>Zugänglichkeit</Text><Text style={s.value}>{accessTypes[input.access].label}</Text></View>
            <View style={s.row}><Text style={s.label}>Thermografie</Text><Text style={s.value}>{input.withThermography ? 'Ja, inklusive' : 'Nein'}</Text></View>
          </View>

          <View style={s.section}>
            <Text style={s.sectionTitle}>Geschätzter Preis</Text>
            <View style={s.resultBox}>
              <Text style={s.resultLabel}>Geschätzter Gesamtpreis</Text>
              <Text style={s.resultValue}>{fmtEur(result.totalCost)}</Text>
              <Text style={s.resultSub}>
                Bandbreite: {fmtEur(result.rangeMin)} – {fmtEur(result.rangeMax)}
              </Text>
            </View>

            <View style={s.miniGrid}>
              <View style={s.miniBox}>
                <Text style={s.miniLabel}>Reinigung</Text>
                <Text style={s.miniValue}>{fmtEur(result.totalCleaningCost)}</Text>
              </View>
              {input.withThermography && (
                <View style={s.miniBox}>
                  <Text style={s.miniLabel}>Thermografie</Text>
                  <Text style={s.miniValue}>{fmtEur(result.thermographySurcharge)}</Text>
                </View>
              )}
              <View style={s.miniBox}>
                <Text style={s.miniLabel}>Pro Modul effektiv</Text>
                <Text style={s.miniValue}>{result.pricePerPanelEffective.toFixed(2)} €</Text>
              </View>
            </View>
          </View>

          {result.notes.length > 0 && (
            <View style={s.note}>
              <Text style={{ fontFamily: 'Helvetica-Bold', marginBottom: 4 }}>Hinweise:</Text>
              {result.notes.map((n, i) => (
                <Text key={i}>• {n}</Text>
              ))}
            </View>
          )}

          <PdfBarChart title="Vergleich der Optionen" data={compareData} unit="€" />

          <View style={s.section}>
            <Text style={s.sectionTitle}>Methodik &amp; Quellen</Text>
            <Text style={{ fontSize: 9, color: '#6b7280', lineHeight: 1.5 }}>
              Die Schätzung basiert auf einem Grundpreis von 4,50 € pro Modul für
              Drohnenreinigung, multipliziert mit dem Dach- und Zugänglichkeitsfaktor.
              Bandbreite ±15% für individuelle Faktoren wie Anfahrt, Wasserzugang und
              Verschmutzungsgrad. Verbindliche Festpreise nach kostenloser Vor-Ort-Bewertung.
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
        'Content-Disposition': `attachment; filename="reinigungskosten-${input.panelCount}module.pdf"`,
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
