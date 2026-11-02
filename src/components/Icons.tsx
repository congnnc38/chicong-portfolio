type P = { className?: string; size?: number };

const st = { stroke: 'currentColor', strokeWidth: 1.7, strokeLinecap: 'round', strokeLinejoin: 'round', fill: 'none' } as const;

const Svg = ({ className, size = 16, children }: P & { children: React.ReactNode }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" className={className} aria-hidden="true" fill="none">
    {children}
  </svg>
);

export const ArrowUpRight = (p: P) => (
  <Svg {...p}>
    <path d="M4.5 11.5l7-7M6 4.5h5.5V10" {...st} />
  </Svg>
);
export const ArrowRight = (p: P) => (
  <Svg {...p}>
    <path d="M2.5 8h11m0 0L9 3.5M13.5 8L9 12.5" {...st} />
  </Svg>
);
export const Plus = (p: P) => (
  <Svg {...p}>
    <path d="M8 3v10M3 8h10" {...st} />
  </Svg>
);
export const Close = (p: P) => (
  <Svg {...p}>
    <path d="M3.5 3.5l9 9M12.5 3.5l-9 9" {...st} />
  </Svg>
);
export const Check = (p: P) => (
  <Svg {...p}>
    <path d="M3 8.5l3.2 3L13 4.5" {...st} />
  </Svg>
);
export const Mail = (p: P) => (
  <Svg {...p}>
    <rect x="2" y="3.5" width="12" height="9" rx="1.6" {...st} />
    <path d="M2.5 4.5L8 8.8l5.5-4.3" {...st} />
  </Svg>
);
export const Phone = (p: P) => (
  <Svg {...p}>
    <path
      d="M5.6 2.5H3.8c-.7 0-1.3.6-1.2 1.3.5 5 4.6 9.1 9.6 9.6.7.1 1.3-.5 1.3-1.2v-1.8l-2.6-1-1.4 1.3c-1.5-.7-2.7-1.9-3.4-3.4l1.3-1.4-1-2.6z"
      {...st}
    />
  </Svg>
);
export const Chat = (p: P) => (
  <Svg {...p}>
    <path d="M2.5 7.5c0-2.8 2.5-5 5.5-5s5.5 2.2 5.5 5-2.5 5-5.5 5c-.8 0-1.6-.1-2.3-.4L2.8 13.5l.8-2.6c-.7-.9-1.1-2-1.1-3.4z" {...st} />
  </Svg>
);
export const LinkedIn = (p: P) => (
  <Svg {...p}>
    <rect x="2" y="2" width="12" height="12" rx="2.2" {...st} />
    <path d="M5.2 7v4.2M5.2 4.9v.1M7.8 11.2V7m0 1.9c0-1.1.8-1.9 1.8-1.9s1.6.7 1.6 1.8v2.4" {...st} />
  </Svg>
);
export const Download = (p: P) => (
  <Svg {...p}>
    <path d="M8 2v8m0 0L4.5 6.5M8 10l3.5-3.5M3 13h10" {...st} />
  </Svg>
);
