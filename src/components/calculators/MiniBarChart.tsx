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
export default function MiniBarChart({ data, unit = '', height = 180, formatter = (n) => n.toLocaleString('de-DE') }: Props) {
  if (data.length === 0) return null;
  const max = Math.max(...data.map((d) => Math.abs(d.value)), 1);
  const W = 100;
  const barWidth = W / data.length;

  return (
    <div className="overflow-x-auto">
      <svg
        viewBox={`0 0 ${W} ${height / 2}`}
        preserveAspectRatio="none"
        className="block w-full"
        style={{ height }}
        role="img"
        aria-label="Wirtschaftlichkeits-Diagramm"
      >
        {data.map((d, i) => {
          const h = (Math.abs(d.value) / max) * (height / 2 - 24);
          const x = i * barWidth + barWidth * 0.15;
          const y = (height / 2 - 14) - h;
          const w = barWidth * 0.7;
          const fill = d.highlight ? '#1e40af' : d.value < 0 ? '#dc2626' : '#3b82f6';
          return (
            <g key={i}>
              <rect x={x} y={y} width={w} height={h} fill={fill} rx="0.5" />
              <text
                x={i * barWidth + barWidth / 2}
                y={y - 1.5}
                textAnchor="middle"
                fontSize="3.2"
                fontWeight="bold"
                fill="#1f2937"
              >
                {formatter(d.value)}{unit}
              </text>
              <text
                x={i * barWidth + barWidth / 2}
                y={height / 2 - 4}
                textAnchor="middle"
                fontSize="3"
                fill="#6b7280"
              >
                {d.label}
              </text>
            </g>
          );
        })}
        {/* baseline */}
        <line x1="0" y1={height / 2 - 14} x2={W} y2={height / 2 - 14} stroke="#e5e7eb" strokeWidth="0.3" />
      </svg>
    </div>
  );
}
