'use client';

import { MotionConfig } from 'motion/react';
import type { ReactNode } from 'react';

// Người xem bật "Giảm chuyển động": Motion bỏ hiệu ứng trượt, chỉ giữ mờ dần, nội dung luôn hiện đúng chỗ.
export default function Providers({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
