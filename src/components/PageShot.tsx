import Image from 'next/image';
import type { CSSProperties } from 'react';
import type { Page } from '@/data/visuals';
import { shotBlur } from '@/data/shots-blur';


// Tỉ lệ cao/rộng của phần trang nhìn thấy trong thẻ 4:3:
// có khung nền màu (khung trình duyệt rộng 86%, cao gần hết thẻ) khoảng 3/4,
// không khung (khung trình duyệt phủ kín thẻ, trừ thanh địa chỉ) khoảng 0,7.
const VIEW = { framed: 0.75, bare: 0.7 };

/** Trang dài bao nhiêu màn hình thì cuộn lâu bấy nhiêu, để tốc độ cuộn giống nhau giữa các trang */
function timing(page: Page, bare: boolean) {
  const screens = page.h / page.w / (bare ? VIEW.bare : VIEW.framed);
  return {
    duration: Math.min(11, Math.max(2.5, (screens - 1) * 1.15)),
    thumb: Math.min(1, Math.max(0.08, 1 / screens)),
  };
}

function Bar({ url }: { url: string }) {
  return (
    <div className="flex h-[max(1.6rem,5cqw)] shrink-0 items-center gap-[max(4px,0.9cqw)] border-b border-black/[0.06] bg-[#f3f2f0] px-[max(8px,1.8cqw)] in-data-[theme=dark]:border-white/[0.06] in-data-[theme=dark]:bg-[#2b2724]">
      <span aria-hidden="true" className="h-[max(6px,1.15cqw)] w-[max(6px,1.15cqw)] shrink-0 rounded-full bg-[#ff5f57]" />
      <span aria-hidden="true" className="h-[max(6px,1.15cqw)] w-[max(6px,1.15cqw)] shrink-0 rounded-full bg-[#febc2e]" />
      <span aria-hidden="true" className="h-[max(6px,1.15cqw)] w-[max(6px,1.15cqw)] shrink-0 rounded-full bg-[#28c840]" />
      <span className="mx-auto max-w-[70%] min-w-0 truncate rounded-full bg-black/[0.06] px-[max(8px,2cqw)] py-[max(1px,0.35cqw)] text-[max(9px,1.65cqw)] leading-normal font-medium text-black/55 in-data-[theme=dark]:bg-white/[0.08] in-data-[theme=dark]:text-white/60">
        {url}
      </span>
    </div>
  );
}

/**
 * Ảnh chụp toàn trang đặt trong khung trình duyệt.
 * - mode="hover" (thẻ sản phẩm, ảnh ở đầu trang): rê chuột vào phần tử .group bao ngoài thì trang tự cuộn
 *   từ đầu đến cuối, rời chuột thì cuộn về đầu.
 * - mode="scroll" (hộp thoại chi tiết): người xem tự cuộn trong khung.
 */
export default function PageShot({
  p,
  sizes,
  alt,
  mode,
  hint,
  priority = false,
  eager = false,
  bare = false,
}: {
  p: { color: string; page: Page };
  sizes: string;
  alt: string;
  mode: 'hover' | 'scroll';
  hint?: string;
  /** ảnh ở đầu trang, cần hiện sớm nhất */
  priority?: boolean;
  /** tải ngay, không chờ cuộn tới */
  eager?: boolean;
  /** bỏ nền màu bao quanh: khung trình duyệt phủ kín thẻ để ảnh to hơn (dùng ở đầu trang) */
  bare?: boolean;
}) {
  const { page } = p;
  const { duration, thumb } = timing(page, bare);
  const vars = { '--dur': `${duration.toFixed(2)}s`, '--thumb': thumb.toFixed(4) } as CSSProperties;
  const img = (
    <Image
      src={page.src}
      alt={alt}
      width={page.w}
      height={page.h}
      sizes={sizes}
      {...(shotBlur[page.src] ? { placeholder: 'blur' as const, blurDataURL: shotBlur[page.src] } : {})}
      // trong hộp thoại và ở đầu trang ảnh hiện ngay, không chờ cuộn tới
      {...(priority ? { priority: true } : { loading: mode === 'scroll' || eager ? ('eager' as const) : ('lazy' as const) })}
      className={`block h-auto w-full max-w-none ${mode === 'hover' ? 'page-shot' : ''}`}
      style={mode === 'hover' ? vars : undefined}
    />
  );

  return (
    <div
      className={`relative overflow-hidden [container-type:size] ${mode === 'hover' ? 'aspect-[4/3]' : 'h-[min(58dvh,34rem)]'}`}
      style={{
        background: bare
          ? '#fff'
          : `linear-gradient(160deg, color-mix(in oklab, ${p.color} 26%, var(--shot-a)), color-mix(in oklab, ${p.color} 48%, var(--shot-b)))`,
      }}
    >
      <div
        className={`absolute flex flex-col overflow-hidden bg-white ${
          bare
            ? 'inset-0'
            : `bottom-0 origin-bottom rounded-t-[max(10px,1.6cqw)] shadow-[0_0_0_1px_rgba(0,0,0,0.05),0_2cqh_6cqh_-1cqh_rgba(23,20,15,0.4)] ${
                mode === 'hover'
                  ? 'inset-x-[7cqw] top-[8cqh] transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.015]'
                  : 'inset-x-[max(12px,5cqw)] top-[4.25rem]'
              }`
        }`}
      >
        <Bar url={page.url} />
        {mode === 'hover' ? (
          <div className="relative min-h-0 flex-1 overflow-hidden [container-type:size]">
            {img}
            {/* thanh cuộn giả chạy cùng nhịp với trang */}
            <span aria-hidden="true" className="page-thumb absolute top-[1.5cqh] right-[max(3px,0.9cqw)] w-[max(3px,0.9cqw)] rounded-full bg-black/35" style={vars} />
          </div>
        ) : (
          <div
            tabIndex={0}
            role="region"
            aria-label={alt}
            className="relative min-h-0 flex-1 overflow-y-auto overscroll-contain focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-accent"
          >
            {img}
          </div>
        )}
      </div>
      {/* gợi ý nằm phía trên khung, ngang hàng nút đóng, không che nội dung trang */}
      {mode === 'scroll' && hint && (
        <p className="absolute top-[1.375rem] left-[max(12px,5cqw)] flex h-8 max-w-[calc(100%-6rem)] items-center gap-2 rounded-full bg-paper/90 px-3.5 text-[0.82rem] font-semibold text-ink shadow-sm backdrop-blur">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true" className="shrink-0">
            <rect x="6.5" y="2.5" width="11" height="19" rx="5.5" stroke="currentColor" strokeWidth="2" />
            <path d="M12 7v3.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
          <span className="truncate">{hint}</span>
        </p>
      )}
    </div>
  );
}
