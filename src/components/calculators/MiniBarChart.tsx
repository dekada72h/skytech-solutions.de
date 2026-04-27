'use client';

interface BarPoint { label: string; value: number; highlight?: boolean }

interface Props {
  data: BarPoint[];
  unit?: string;
  height?: number;
  formatter?: (n: number) => string;
}

/**
 * Lightweight inline-SVG bar chart. No external deps.
 * Used for "5-Jahres-Verlust" / "Amortisation Trend" / etc.
 */
export default function MiniBarChart({ data, unit = '', height = 220, formatter = (n) => n.toLocaleString('de-DE') }: Props) {
  if (data.length === 0) return null;
  const max = Math.max(...data.map((d) => Math.abs(d.value)), 1);
  // Use a wider viewBox aspect so text scales sensibly
  const W = 400;
  const H = 200;
  const barWidth = W / data.length;
  const labelHeight = 28;       // bottom area for labels
  const valueHeight = 26;       // top area for value annotations
  const chartHeight = H - labelHeight - valueHeight;

  return (
    <div className="overflow-x-auto">
      <svg
        viewBox={`0 0 ${W} ${H}`}
        preserveAspectRatio="xMidYMid meet"
        className="block w-full"
        style={{ height }}
        role="img"
        aria-label="Wirtschaftlichkeits-Diagramm"
      >
        {data.map((d, i) => {
          const h = (Math.abs(d.value) / max) * chartHeight;
          const x = i * barWidth + barWidth * 0.18;
          const y = (H - labelHeight) - h;
          const w = barWidth * 0.64;
          const fill = d.highlight ? '#1e40af' : d.value < 0 ? '#dc2626' : '#3b82f6';
          return (
            <g key={i}>
              <rect x={x} y={y} width={w} height={h} fill={fill} rx="3" />
              <text
                x={i * barWidth + barWidth / 2}
                y={y - 6}
                textAnchor="middle"
                fontSize="14"
                fontWeight="700"
                fill="#111827"
              >
                {formatter(d.value)}{unit ? ` ${unit}` : ''}
              </text>
              <text
                x={i * barWidth + barWidth / 2}
                y={H - 8}
                textAnchor="middle"
                fontSize="13"
                fontWeight="500"
                fill="#374151"
              >
                {d.label}
              </text>
            </g>
          );
        })}
        {/* baseline */}
        <line x1="0" y1={H - labelHeight} x2={W} y2={H - labelHeight} stroke="#d1d5db" strokeWidth="1" />
      </svg>
    </div>
  );
}
