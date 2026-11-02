'use client';

// Con trỏ chuột riêng: một chấm đi đúng theo chuột và một vòng tròn bám theo có độ trễ.
// - Rê lên link/nút: vòng phóng to bao quanh, chấm biến mất.
// - Rê lên phần tử có data-cursor="view": hiện bong bóng chữ (lấy từ data-cursor-label), ví dụ "Xem",
//   nằm lệch xuống dưới bên phải con trỏ.
// - Nhấn chuột: vòng co lại.
// Chỉ bật trên máy có chuột; tự tắt trên điện thoại, khi bật "Giảm chuyển động" và khi đang mở hộp thoại.

import { AnimatePresence, motion, useMotionValue, useSpring } from 'motion/react';
import { useEffect, useState } from 'react';

type Mode = 'default' | 'link' | 'view';

export default function Cursor() {
  const [enabled, setEnabled] = useState(false);
  const [visible, setVisible] = useState(false);
  const [mode, setMode] = useState<Mode>('default');
  const [label, setLabel] = useState('');
  const [down, setDown] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const rx = useSpring(x, { stiffness: 420, damping: 34, mass: 0.6 });
  const ry = useSpring(y, { stiffness: 420, damping: 34, mass: 0.6 });

  useEffect(() => {
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)');
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (!fine.matches || reduce.matches) return;
    setEnabled(true);
    document.documentElement.classList.add('has-cursor');

    const move = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') return;
      x.set(e.clientX);
      y.set(e.clientY);
      // đang mở hộp thoại thì trả lại con trỏ thường (hộp thoại nằm trên mọi lớp)
      if (document.querySelector('dialog[open]')) {
        setVisible(false);
        return;
      }
      setVisible(true);
      const el = e.target as Element | null;
      const view = el?.closest<HTMLElement>('[data-cursor="view"]');
      if (view) {
        setMode('view');
        setLabel(view.dataset.cursorLabel ?? '');
      } else if (el?.closest('a, button, summary, [role="button"], label')) {
        setMode('link');
      } else {
        setMode('default');
      }
    };
    const leave = () => setVisible(false);
    const press = () => setDown(true);
    const release = () => setDown(false);

    window.addEventListener('pointermove', move, { passive: true });
    document.documentElement.addEventListener('mouseleave', leave);
    window.addEventListener('pointerdown', press);
    window.addEventListener('pointerup', release);
    window.addEventListener('blur', leave);
    return () => {
      document.documentElement.classList.remove('has-cursor');
      window.removeEventListener('pointermove', move);
      document.documentElement.removeEventListener('mouseleave', leave);
      window.removeEventListener('pointerdown', press);
      window.removeEventListener('pointerup', release);
      window.removeEventListener('blur', leave);
    };
  }, [x, y]);

  if (!enabled) return null;

  const ringScale = (mode === 'link' ? 1.7 : mode === 'view' ? 0 : 1) * (down ? 0.75 : 1);

  return (
    <>
    {/* Lớp vòng + chấm: chế độ hoà trộn "difference" đặt ở chính lớp này để đảo màu với trang bên dưới
        (trắng trên nền sáng thành tối, trên nền tối thành sáng) */}
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-[100] mix-blend-difference">
      <motion.div className="absolute top-0 left-0" style={{ x: rx, y: ry }}>
        <motion.div
          className="-translate-x-1/2 -translate-y-1/2 rounded-full border-[1.5px] border-white"
          style={{ width: 36, height: 36 }}
          animate={{
            scale: visible ? ringScale : 0,
            borderWidth: mode === 'link' ? 1 : 1.5,
          }}
          transition={{ type: 'spring', stiffness: 380, damping: 26 }}
        />
      </motion.div>

      {/* chấm nhỏ đi đúng theo chuột */}
      <motion.div className="absolute top-0 left-0" style={{ x, y }}>
        <motion.div
          className="h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white"
          animate={{ scale: visible && mode !== 'link' ? (down ? 0.6 : 1) : 0 }}
          transition={{ type: 'spring', stiffness: 500, damping: 30 }}
        />
      </motion.div>

    </div>

    {/* bong bóng chữ khi rê lên sản phẩm (màu thật, không đảo màu) */}
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-[100]">
      <motion.div className="absolute top-0 left-0" style={{ x: rx, y: ry }}>
        <AnimatePresence>
          {visible && mode === 'view' && (
            <motion.div
              key="bubble"
              // đặt lệch xuống dưới bên phải con trỏ để không che ảnh trang đang tự cuộn trong thẻ
              className="grid h-[4.5rem] w-[4.5rem] origin-top-left translate-x-3 translate-y-3 place-items-center rounded-full bg-accent text-center text-[0.8rem] leading-tight font-bold text-white shadow-[0_16px_40px_-12px_rgba(255,91,46,0.7)]"
              initial={{ scale: 0, rotate: -30 }}
              animate={{ scale: down ? 0.88 : 1, rotate: 0 }}
              exit={{ scale: 0, rotate: 30 }}
              transition={{ type: 'spring', stiffness: 360, damping: 22 }}
            >
              <span className="px-2">{label}</span>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
    </>
  );
}
