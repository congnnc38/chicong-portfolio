'use client';

// Bộ hiệu ứng dùng chung. Tất cả đều tự tắt khi máy người xem bật "Giảm chuyển động" (Reduce motion):
// - hiệu ứng trượt/xoay do Motion xử lý qua <MotionConfig reducedMotion="user">
// - hiệu ứng theo con trỏ chuột kiểm tra prefersReduced() trước khi chạy

import { animate, motion, type MotionValue, useInView, useMotionTemplate, useMotionValue, useScroll, useSpring, useTransform } from 'motion/react';
import { useEffect, useRef, useState, type ReactNode } from 'react';

const ease = [0.22, 1, 0.36, 1] as const;

const prefersReduced = () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const finePointer = () => typeof window !== 'undefined' && window.matchMedia('(hover: hover) and (pointer: fine)').matches;

/** Chữ hiện dần từng từ: mờ → rõ, trượt lên nhẹ */
export function Words({
  text,
  className,
  delay = 0,
  stagger = 0.05,
  onView = true,
}: {
  text: string;
  className?: string;
  delay?: number;
  stagger?: number;
  /** true: chạy khi cuộn tới; false: chạy ngay khi trang tải */
  onView?: boolean;
}) {
  const words = text.split(' ');
  return (
    <span className={className}>
      {words.map((w, i) => {
        const anim = { opacity: 1, y: 0, filter: 'blur(0px)' };
        return (
          <span key={i}>
            <motion.span
              className="inline-block"
              initial={{ opacity: 0, y: '0.45em', filter: 'blur(10px)' }}
              {...(onView ? { whileInView: anim, viewport: { once: true, margin: '0px 0px -8% 0px' } } : { animate: anim })}
              transition={{ duration: 0.8, ease, delay: delay + i * stagger }}
            >
              {w}
            </motion.span>
            {i < words.length - 1 ? ' ' : ''}
          </span>
        );
      })}
    </span>
  );
}

/** Thẻ nghiêng 3D theo con trỏ chuột, kèm vệt sáng chạy theo */
export function Tilt({ children, className, max = 8 }: { children: ReactNode; className?: string; max?: number }) {
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const gx = useMotionValue(50);
  const gy = useMotionValue(50);
  const glow = useMotionValue(0);
  const srx = useSpring(rx, { stiffness: 180, damping: 18 });
  const sry = useSpring(ry, { stiffness: 180, damping: 18 });
  const sglow = useSpring(glow, { stiffness: 200, damping: 30 });
  const glare = useMotionTemplate`radial-gradient(520px circle at ${gx}% ${gy}%, rgba(255,255,255,0.38), transparent 45%)`;

  return (
    <motion.div
      className={`relative [transform-style:preserve-3d] ${className ?? ''}`}
      style={{ rotateX: srx, rotateY: sry, transformPerspective: 900 }}
      onPointerMove={(e) => {
        if (!finePointer() || prefersReduced()) return;
        const r = e.currentTarget.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width;
        const py = (e.clientY - r.top) / r.height;
        ry.set((px - 0.5) * max * 2);
        rx.set(-(py - 0.5) * max * 2);
        gx.set(px * 100);
        gy.set(py * 100);
        glow.set(1);
      }}
      onPointerLeave={() => {
        rx.set(0);
        ry.set(0);
        glow.set(0);
      }}
    >
      {children}
      <motion.span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-[inherit] mix-blend-soft-light"
        style={{ background: glare, opacity: sglow }}
      />
    </motion.div>
  );
}

/** Vùng có đốm sáng đi theo con trỏ (dùng cho thẻ trên nền tối) */
export function Spotlight({ children, className, color = 'rgba(255,91,46,0.22)' }: { children: ReactNode; className?: string; color?: string }) {
  const x = useMotionValue(-999);
  const y = useMotionValue(-999);
  const bg = useMotionTemplate`radial-gradient(360px circle at ${x}px ${y}px, ${color}, transparent 70%)`;
  return (
    <div
      className={`group/spot relative ${className ?? ''}`}
      onPointerMove={(e) => {
        if (!finePointer()) return;
        const r = e.currentTarget.getBoundingClientRect();
        x.set(e.clientX - r.left);
        y.set(e.clientY - r.top);
      }}
    >
      <motion.span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover/spot:opacity-100"
        style={{ background: bg }}
      />
      {children}
    </div>
  );
}

/** Nút "hút" nhẹ về phía con trỏ */
export function Magnetic({ children, className, strength = 0.3 }: { children: ReactNode; className?: string; strength?: number }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 220, damping: 15, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 220, damping: 15, mass: 0.4 });
  return (
    <motion.div
      className={`inline-block ${className ?? ''}`}
      style={{ x: sx, y: sy }}
      onPointerMove={(e) => {
        if (!finePointer() || prefersReduced()) return;
        const r = e.currentTarget.getBoundingClientRect();
        x.set((e.clientX - (r.left + r.width / 2)) * strength);
        y.set((e.clientY - (r.top + r.height / 2)) * strength);
      }}
      onPointerLeave={() => {
        x.set(0);
        y.set(0);
      }}
    >
      {children}
    </motion.div>
  );
}

/** Số đếm từ 0 lên khi cuộn tới */
export function CountUp({ to, suffix = '' }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '0px 0px -10% 0px' });
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!inView) return;
    if (prefersReduced()) {
      setN(to);
      return;
    }
    const c = animate(0, to, { duration: 1.6, ease, onUpdate: (v) => setN(Math.round(v)) });
    return () => c.stop();
  }, [inView, to]);
  return (
    <span ref={ref} className="tabular-nums">
      <span aria-hidden="true">
        {n}
        {suffix}
      </span>
      <span className="sr-only">
        {to}
        {suffix}
      </span>
    </span>
  );
}

/** Thanh tiến độ đọc ở mép trên màn hình */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 24, restDelta: 0.001 });
  return <motion.div aria-hidden="true" className="fixed inset-x-0 top-0 z-50 h-[3px] origin-left bg-accent" style={{ scaleX }} />;
}

/** Đường nối (ngang, hoặc dọc với vertical) chạy dài ra theo vị trí cuộn */
export function ScrollLine({ className, vertical = false }: { className?: string; vertical?: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: vertical ? ['start 0.7', 'end 0.6'] : ['start 0.85', 'end 0.45'] });
  const scale = useTransform(scrollYProgress, [0, 1], [0, 1]);
  return (
    <div ref={ref} aria-hidden="true" className={className}>
      <div className="absolute inset-0 rounded-full bg-line" />
      <motion.div
        className={`absolute inset-0 rounded-full bg-accent ${vertical ? 'origin-top' : 'origin-left'}`}
        style={vertical ? { scaleY: scale } : { scaleX: scale }}
      />
    </div>
  );
}

/** Ảnh trôi lơ lửng nhẹ lên xuống */
export function Float({ children, className, duration = 6, delay = 0, distance = 12 }: { children: ReactNode; className?: string; duration?: number; delay?: number; distance?: number }) {
  return (
    <motion.div
      className={className}
      animate={{ y: [0, -distance, 0] }}
      transition={{ duration, delay, repeat: Infinity, ease: 'easeInOut' }}
    >
      {children}
    </motion.div>
  );
}

/**
 * Điện thoại không rê chuột được: phần tử có data-live (bên trong `root`) đi qua giữa màn hình thì được gắn
 * data-live-on, CSS dựa vào đó cho ảnh chụp toàn trang tự cuộn như khi rê chuột (xem .page-shot trong globals.css).
 */
export function useTouchLive(root: string, deps: unknown[] = []) {
  useEffect(() => {
    if (!window.matchMedia('(hover: none)').matches || prefersReduced()) return;
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.target.toggleAttribute('data-live-on', e.isIntersecting)),
      { rootMargin: '-38% 0px -38% 0px' },
    );
    document.querySelectorAll(`${root} [data-live]`).forEach((el) => io.observe(el));
    return () => io.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [root, ...deps]);
}

/** Lớp di chuyển ngược hướng con trỏ trong một vùng (tạo chiều sâu) */
export function useParallaxPointer() {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 60, damping: 18 });
  const sy = useSpring(y, { stiffness: 60, damping: 18 });
  const bind = {
    onPointerMove: (e: React.PointerEvent<HTMLElement>) => {
      if (!finePointer() || prefersReduced()) return;
      const r = e.currentTarget.getBoundingClientRect();
      x.set((e.clientX - r.left) / r.width - 0.5);
      y.set((e.clientY - r.top) / r.height - 0.5);
    },
    onPointerLeave: () => {
      x.set(0);
      y.set(0);
    },
  };
  return { x: sx, y: sy, bind };
}

export function Depth({ x, y, depth, children, className }: { x: MotionValue<number>; y: MotionValue<number>; depth: number; children: ReactNode; className?: string }) {
  const tx = useTransform(x, (v) => v * depth);
  const ty = useTransform(y, (v) => v * depth);
  return (
    <motion.div className={className} style={{ x: tx, y: ty }}>
      {children}
    </motion.div>
  );
}

/** Khối trang trí trôi chậm qua lại */
export function Drift({ className, x = 40, y = 30, duration = 14, delay = 0 }: { className?: string; x?: number; y?: number; duration?: number; delay?: number }) {
  return (
    <motion.div
      aria-hidden="true"
      className={className}
      animate={{ x: [0, x, 0], y: [0, y, 0], rotate: [0, 8, 0] }}
      transition={{ duration, delay, repeat: Infinity, ease: 'easeInOut' }}
    />
  );
}

/** Hiện dần kèm phóng nhẹ (dùng cho vòng số, huy hiệu) */
export function Pop({ children, className, delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, scale: 0.4 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: '0px 0px -10% 0px' }}
      transition={{ type: 'spring', stiffness: 260, damping: 16, delay }}
    >
      {children}
    </motion.div>
  );
}
