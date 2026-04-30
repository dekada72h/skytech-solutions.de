// ─────────────────────────────────────────────────────────────────────────
// lib/pdfChart.tsx — wykres słupkowy do PDF (react-pdf/renderer).
// Używany w lib/pdfDocument.tsx jako komponent w PDF-ach generowanych
// po stronie serwera (rechnery).
// ─────────────────────────────────────────────────────────────────────────
import { View, Text, StyleSheet, Svg, Rect, Line, Text as SvgText } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  wrap: {
    marginTop: 8,
    marginBottom: 8,
    padding: 10,
    backgroundColor: '#f9fafb',
    border: '0.5 solid #e5e7eb',
    borderRadius: 4,
  },
  title: {
    fontSize: 9,
    fontFamily: 'Helvetica-Bold',
    color: '#374151',
    marginBottom: 6,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
});

export interface PdfChartPoint {
  label: string;
  value: number;
  highlight?: boolean;
}

interface Props {
  title: string;
  data: PdfChartPoint[];
  unit?: string;
}

export function PdfBarChart({ title, data, unit = '€' }: Props) {
  if (data.length === 0) return null;
  const max = Math.max(...data.map((d) => Math.abs(d.value)), 1);
  const W = 500;
  const H = 140;
  const barWidth = W / data.length;
  const fmt = (n: number) => Math.round(n).toLocaleString('de-DE');

  return (
    <View style={styles.wrap}>
      <Text style={styles.title}>{title}</Text>
      <Svg width={W} height={H} viewBox={`0 0 ${W} ${H}`}>
        <Line x1="0" y1={H - 24} x2={W} y2={H - 24} stroke="#d1d5db" strokeWidth="0.5" />
        {data.map((d, i) => {
          const h = (Math.abs(d.value) / max) * (H - 50);
          const x = i * barWidth + barWidth * 0.18;
          const y = (H - 24) - h;
          const w = barWidth * 0.64;
          const fill = d.highlight ? '#1e40af' : d.value < 0 ? '#dc2626' : '#3b82f6';
          return (
            <View key={i}>
              <Rect x={x} y={y} width={w} height={h} fill={fill} />
              <SvgText
                x={i * barWidth + barWidth / 2}
                y={y - 4}
                textAnchor="middle"
                style={{ fontSize: 9, fill: '#111827', fontFamily: 'Helvetica-Bold' }}
              >
                {fmt(d.value)} {unit}
              </SvgText>
              <SvgText
                x={i * barWidth + barWidth / 2}
                y={H - 8}
                textAnchor="middle"
                style={{ fontSize: 8, fill: '#6b7280' }}
              >
                {d.label}
              </SvgText>
            </View>
          );
        })}
      </Svg>
    </View>
  );
}
