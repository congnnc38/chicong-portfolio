// Hình ảnh của từng dự án, ghép theo `id` trong profile.ts / profile.en.ts.
// - page: ảnh chụp toàn trang thật (public/shots/), hiện trong khung trình duyệt, tự cuộn khi rê chuột.
//   w, h là kích thước thật của ảnh; url là địa chỉ hiện trên thanh trình duyệt.
// - scene: ảnh ghép nền trong suốt (public/covers/) cho dự án không có trang công khai: app di động, hệ thống nội bộ.
// - color: màu nền của thẻ.

export type Page = { src: string; w: number; h: number; url: string };
export type Visual = { color: string; page?: Page; scene?: { src: string; w: number; h: number } };

const scene = (name: string) => ({ src: `/covers/${name}-scene.webp`, w: 1600, h: 1200 });

export const visuals: Record<string, Visual> = {
  kolhub: { color: '#f47a24', page: { src: '/shots/kolhub.webp', w: 1200, h: 935, url: 'kol-hub-three.vercel.app/san' } },
  'multi-client': { color: '#3d6fd9', page: { src: '/shots/phapluat.webp', w: 1200, h: 7721, url: 'phobienphapluat-web-dev.antcms.vn' } },
  'kol-safety': { color: '#7b6dff', page: { src: '/shots/kol-safety.webp', w: 1200, h: 7012, url: 'safety.netspace.vn' } },
  netevent: { color: '#1eaaff', page: { src: '/shots/netevent.webp', w: 1200, h: 6091, url: 'event.netspace.vn' } },
  'tkg-mobile': { color: '#e8762f', scene: scene('tkg-mobile') },
  'thienviet-id': { color: '#1f6b57', scene: scene('thienviet-id') },
  'hien-mau': { color: '#ec3f5c', page: { src: '/shots/hien-mau.webp', w: 1200, h: 6500, url: 'hienmau.netspace.vn' } },
  'kol-portal': { color: '#f36111', page: { src: '/shots/kol-portal.webp', w: 1200, h: 2919, url: 'kol.gov.vn' } },
  'antcms-templates': { color: '#2b2b2b', scene: scene('templates') },
  emagazine: { color: '#c08552', page: { src: '/shots/emagazine.webp', w: 1200, h: 3465, url: 'vietpress.vn/emagazine' } },
  'thienkhoi-cdc': { color: '#e8452f', page: { src: '/shots/thienkhoi-cdc.webp', w: 1200, h: 4921, url: 'thienkhoicdc.com' } },
  vietpress: { color: '#c62a35', page: { src: '/shots/vietpress.webp', w: 1200, h: 6131, url: 'vietpress.vn' } },
  gocnhinmoi: { color: '#d4141a', page: { src: '/shots/gocnhinmoi.webp', w: 1200, h: 8784, url: 'gocnhinmoi.com.vn' } },
  antcms: { color: '#c9a35d', scene: scene('antcms') },
  buddhaworlds: { color: '#b8862e', page: { src: '/shots/buddhaworlds.webp', w: 1200, h: 3983, url: 'buddhaworlds.com' } },
};

export const fallbackVisual: Visual = { color: '#8a8478' };
