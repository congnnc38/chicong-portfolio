'use client';

import { motion, useReducedMotion } from 'motion/react';
import { useMemo } from 'react';

// Đường đồng mức lượn sóng — lấy từ hoạ tiết trong CV cũ.
// Tính toán xác định (không random) để server và client render giống nhau.

function wavePath(i: number, count: number, width: number, height: number) {
  const step = 80;
  const base = (height / (count + 1)) * (i + 1);
  const pts: [number, number][] = [];
  for (let x = -step; x <= width + step; x += step) {
    const t = x / width;
    const bulge = Math.sin(t * Math.PI * 1.15 + 0.4) * height * 0.16;
    const y =
      base +
      bulge * (0.55 + i / count) +
      Math.sin(t * 7.2 + i * 0.32) * 14 +
      Math.sin(t * 2.6 - i * 0.18) * 22;
    pts.push([x, y]);
  }
  // Catmull-Rom → cubic Bézier
  let d = `M${pts[0][0].toFixed(1)},${pts[0][1].toFixed(1)}`;
  for (let k = 0; k < pts.length - 1; k++) {
    const p0 = pts[k - 1] ?? pts[k];
    const p1 = pts[k];
    const p2 = pts[k + 1];
    const p3 = pts[k + 2] ?? p2;
    const c1x = p1[0] + (p2[0] - p0[0]) / 6;
    const c1y = p1[1] + (p2[1] - p0[1]) / 6;
    const c2x = p2[0] - (p3[0] - p1[0]) / 6;
    const c2y = p2[1] - (p3[1] - p1[1]) / 6;
    d += ` C${c1x.toFixed(1)},${c1y.toFixed(1)} ${c2x.toFixed(1)},${c2y.toFixed(1)} ${p2[0].toFixed(1)},${p2[1].toFixed(1)}`;
  }
  return d;
}

type Props = {
  count?: number;
  className?: string;
  animate?: boolean;
  delay?: number;
  stroke?: string;
};

export default function Contours({ count = 22, className, animate = true, delay = 0, stroke = 'var(--color-line)' }: Props) {
  const reduce = useReducedMotion();
  const width = 1440;
  const height = 900;
  const paths = useMemo(() => Array.from({ length: count }, (_, i) => wavePath(i, count, width, height)), [count]);
  const play = animate && !reduce;

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      preserveAspectRatio="xMidYMid slice"
      className={className}
      aria-hidden="true"
      fill="none"
    >
      {paths.map((d, i) => (
        <motion.path
          key={i}
          d={d}
          stroke={stroke}
          strokeWidth={1}
          vectorEffect="non-scaling-stroke"
          initial={play ? { pathLength: 0, opacity: 0 } : false}
          animate={{ pathLength: 1, opacity: 0.18 + (i / count) * 0.42 }}
          transition={{ duration: 2.2, delay: delay + i * 0.045, ease: [0.22, 1, 0.36, 1] }}
        />
      ))}
    </svg>
  );
}
