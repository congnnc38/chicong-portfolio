import Image from 'next/image';
import type { ReactNode } from 'react';
import { fallbackVisual, visuals } from '@/data/visuals';
import PageShot from './PageShot';

export const ease = [0.22, 1, 0.36, 1] as const;

export { default as Reveal } from './Reveal';

export const btnPrimary =
  'inline-flex h-12 items-center gap-2.5 rounded-full bg-accent px-6 font-semibold text-white transition-colors hover:bg-accent-deep';
export const btnDark =
  'inline-flex h-12 items-center gap-2.5 rounded-full bg-ink px-6 font-semibold text-paper transition-colors hover:bg-accent-deep hover:text-white';
export const btnLine =
  'inline-flex h-12 items-center gap-2.5 rounded-full border border-ink/20 px-6 font-semibold transition-colors hover:border-ink';

export function Eyebrow({ children, light = false }: { children: ReactNode; light?: boolean }) {
  return (
    <p className={`flex items-center gap-2.5 text-sm font-semibold tracking-wide uppercase ${light ? 'text-snow/70' : 'text-ink-soft'}`}>
      <span aria-hidden="true" className="h-2 w-2 rounded-full bg-accent" />
      {children}
    </p>
  );
}

/**
 * Hình ảnh một dự án (lấy từ data/visuals.ts theo id):
 * - có ảnh chụp toàn trang: khung trình duyệt, live="hover" tự cuộn khi rê chuột, live="scroll" cho người xem tự cuộn;
 * - có ảnh ghép (app, hệ thống nội bộ): ảnh nền trong suốt phủ kín thẻ 4:3.
 */
export function Shot({
  id,
  alt,
  sizes,
  live = 'hover',
  hint,
  bare = false,
  priority = false,
  eager = false,
  className = '',
}: {
  id: string;
  alt: string;
  sizes: string;
  live?: 'hover' | 'scroll';
  hint?: string;
  bare?: boolean;
  priority?: boolean;
  eager?: boolean;
  className?: string;
}) {
  const v = visuals[id] ?? fallbackVisual;
  if (v.page) {
    return <PageShot p={{ color: v.color, page: v.page }} sizes={sizes} alt={alt} mode={live} hint={hint} bare={bare} priority={priority} eager={eager} />;
  }
  const bg = `linear-gradient(160deg, color-mix(in oklab, ${v.color} 26%, var(--shot-a)), color-mix(in oklab, ${v.color} 48%, var(--shot-b)))`;
  return (
    <div className={`relative aspect-[4/3] overflow-hidden ${className}`} style={{ background: bg }}>
      {v.scene && (
        <Image
          src={v.scene.src}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          className="object-contain transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-[1.5%] group-hover:scale-[1.03]"
        />
      )}
    </div>
  );
}
