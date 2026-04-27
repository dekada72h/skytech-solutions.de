import { NextRequest, NextResponse } from 'next/server';
import { renderToBuffer, Text, View } from '@react-pdf/renderer';
import { z } from 'zod';
import { amortisationInput, calcAmortisation, fmtEur } from '@/lib/calculators';
import { BasePdfDocument, pdfStyles as s } from '@/lib/pdfDocument';
import { PdfBarChart } from '@/lib/pdfChart';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

const payloadSchema = z.object({
  input: amortisationInput,
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { input } = payloadSchema.parse(body);
    const result = calcAmortisation(input);

    const doc = BasePdfDocument({
      title: 'Amortisations-Prognose',
      subtitle: `5- und 10-Jahres-Wirtschaftlichkeitsanalyse`,
      children: (
        <>
          <View style={s.section}>
            <Text style={s.sectionTitle}>Eingabewerte</Text>
            <View style={s.row}><Text style={s.label}>Reinigungskosten</Text><Text style={s.value}>{fmtEur(input.cleaningCost)}</Text></View>
            <View style={s.row}><Text style={s.label}>Jährlicher Ertragsverlust</Text><Text style={s.value}>{fmtEur(input.lostEarningsAnnual)}</Text></View>
            <View style={s.row}><Text style={s.label}>Reinigungs-Intervall</Text><Text style={s.value}>alle {input.cleaningInterval} {input.cleaningInterval === 1 ? 'Jahr' : 'Jahre'}</Text></View>
          </View>

          <View style={s.section}>
            <Text style={s.sectionTitle}>Amortisation</Text>
            <View style={s.resultBox}>
              <Text style={s.resultLabel}>Investition zurückverdient nach</Text>
              <Text style={s.resultValue}>{result.paybackMonths} Monaten</Text>
              <Text style={s.resultSub}>≈ {result.paybackYears.toFixed(1)} Jahre</Text>
            </View>

            <View style={s.miniGrid}>
              <View style={s.miniBox}>
                <Text style={s.miniLabel}>Gewinn nach 5 Jahren</Text>
                <Text style={s.miniValue}>{fmtEur(result.fiveYearGain)}</Text>
              </View>
              <View style={s.miniBox}>
                <Text style={s.miniLabel}>Gewinn nach 10 Jahren</Text>
                <Text style={s.miniValue}>{fmtEur(result.tenYearGain)}</Text>
              </View>
              <View style={s.miniBox}>
                <Text style={s.miniLabel}>Kosten / Jahr</Text>
                <Text style={s.miniValue}>{fmtEur(result.costPerYear)}</Text>
              </View>
            </View>
          </View>

          <View style={s.section}>
            <Text style={s.sectionTitle}>5-Jahres-Prognose</Text>
            <View style={{ ...s.row, fontFamily: 'Helvetica-Bold', backgroundColor: '#f3f4f6' }}>
              <Text style={{ flex: 1, fontFamily: 'Helvetica-Bold' }}>Jahr</Text>
              <Text style={{ flex: 1, fontFamily: 'Helvetica-Bold', textAlign: 'right' }}>Erspart</Text>
              <Text style={{ flex: 1, fontFamily: 'Helvetica-Bold', textAlign: 'right' }}>Ausgaben</Text>
              <Text style={{ flex: 1, fontFamily: 'Helvetica-Bold', textAlign: 'right' }}>Netto</Text>
            </View>
            {result.yearlyTable.map((row) => (
              <View key={row.year} style={s.row}>
                <Text style={{ flex: 1 }}>{row.year}</Text>
                <Text style={{ flex: 1, textAlign: 'right' }}>{fmtEur(row.recovered)}</Text>
                <Text style={{ flex: 1, textAlign: 'right', color: '#6b7280' }}>{fmtEur(row.spent)}</Text>
                <Text style={{ flex: 1, textAlign: 'right', fontFamily: 'Helvetica-Bold', color: row.net >= 0 ? '#059669' : '#dc2626' }}>
                  {fmtEur(row.net)}
                </Text>
              </View>
            ))}
          </View>

          <PdfBarChart
            title="Netto-Gewinn pro Jahr"
            data={result.yearlyTable.map((r) => ({
              label: `Jahr ${r.year}`,
              value: r.net,
              highlight: r.year === 5,
            }))}
            unit="€"
          />

          <View style={s.note}>
            <Text>
              Die Berechnung berücksichtigt mehrere Reinigungszyklen über den Prognose-Zeitraum.
              Bei einem Intervall von {input.cleaningInterval} {input.cleaningInterval === 1 ? 'Jahr' : 'Jahren'}{' '}
              fallen die Kosten entsprechend mehrfach an, der Ertragsverlust wird hingegen
              dauerhaft vermieden.
            </Text>
          </View>

          <View style={s.section}>
            <Text style={s.sectionTitle}>Methodik &amp; Quellen</Text>
            <Text style={{ fontSize: 9, color: '#6b7280', lineHeight: 1.5 }}>
              Lineare Amortisationsrechnung mit konstantem jährlichen Verlust und periodischen
              Reinigungskosten. Annahme: keine Inflation, keine Strompreisänderung. Werte basieren
              auf Branchendurchschnitt 2025/2026 und sind unverbindlich.
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
        'Content-Disposition': `attachment; filename="amortisation-prognose.pdf"`,
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
