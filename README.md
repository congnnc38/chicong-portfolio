# Portfolio — Ngô Nguyễn Chí Công

Website portfolio cá nhân, làm bằng Next.js 15, Tailwind CSS 4 và Motion, font Plus Jakarta Sans.
Giao diện dùng chung phong cách với trang portfolio freelance: thẻ dự án có ảnh chụp thật tự cuộn khi rê chuột, con trỏ riêng, giao diện sáng/tối.

Các phần trên trang: Đầu trang · Dự án (lọc theo loại: Nền tảng & CMS, Trang tin & website, App di động; bấm để xem chi tiết) · Về tôi · Kinh nghiệm · Kỹ năng · Liên hệ.

## Chạy trên máy

```bash
npm install
npm run dev
```

Mở http://localhost:3000.

## Sửa nội dung

Toàn bộ chữ, dự án, kinh nghiệm, kỹ năng và thông tin liên hệ nằm trong **`src/data/profile.ts`**.
Sửa ở đó là website đổi theo, không cần đụng vào component.
Mỗi dự án có `role` (vai trò của tôi: `Fullstack` hoặc `Mobile`, hiện trên thẻ) và `kind` (loại sản phẩm dùng cho bộ lọc: `platform`, `news`, `mobile`).

Website có 2 ngôn ngữ: tiếng Việt ở `/`, tiếng Anh ở `/en` (nút VI/EN trên thanh menu).
- Nội dung tiếng Anh: **`src/data/profile.en.ts`** (cùng cấu trúc với `profile.ts`, sửa bên này thì nhớ sửa bên kia).
- Chữ trên nút, tiêu đề mục của cả 2 ngôn ngữ: **`src/i18n.ts`**.
- CV: bản tiếng Việt `public/CV-Ngo-Nguyen-Chi-Cong.pdf`, bản tiếng Anh `public/CV-Ngo-Nguyen-Chi-Cong-EN.pdf`.

- Ảnh đại diện: `public/avatar.jpg`.
- Hình ảnh từng dự án: **`src/data/visuals.ts`**, ghép theo `id` của dự án.
  - `page`: ảnh chụp toàn trang thật trong `public/shots/` (hiện trong khung trình duyệt, rê chuột vào thẻ là tự cuộn từ đầu đến cuối trang;
    trên điện thoại thẻ đi qua giữa màn hình thì tự cuộn; trong hộp thoại chi tiết thì người xem tự cuộn).
  - `scene`: ảnh ghép nền trong suốt trong `public/covers/` cho dự án không có trang công khai (app di động, hệ thống nội bộ).
  - Dự án mới chưa có ảnh thì thẻ chỉ hiện nền màu; chụp ảnh rồi thêm một dòng vào `visuals.ts`.
  - `src/data/shots-blur.ts`: ảnh mờ rất nhỏ hiện trong lúc ảnh chụp đang tải (không bắt buộc).
- Màu của giao diện sáng/tối: `src/app/globals.css` (khối `:root` là sáng, `:root[data-theme='dark']` là tối).
  Lần đầu vào trang luôn là giao diện sáng; người xem bấm nút mặt trăng/mặt trời để đổi, trình duyệt nhớ lựa chọn.
- Ảnh xem trước khi chia sẻ link (Facebook, Zalo, LinkedIn): `public/og/og-vi.jpg` và `public/og/og-en.jpg` (1200x630).

## Deploy lên Vercel

**Cách 1: qua GitHub (khuyên dùng, mỗi lần push là tự deploy lại)**

1. Tạo repo mới trên GitHub, rồi trong thư mục này:
   ```bash
   git init
   git add .
   git commit -m "Portfolio"
   git branch -M main
   git remote add origin https://github.com/<tài-khoản>/<tên-repo>.git
   git push -u origin main
   ```
2. Vào https://vercel.com/new, chọn **Import** repo vừa tạo.
3. Vercel tự nhận Next.js, giữ nguyên cấu hình, bấm **Deploy**. Khoảng 1 phút sau sẽ có link dạng `https://<tên>.vercel.app`.

**Cách 2: bằng dòng lệnh**

```bash
npx vercel        # lần đầu: đăng nhập và trả lời vài câu hỏi
npx vercel --prod # deploy bản chính thức
```

## Sau khi có link

Thêm biến môi trường `NEXT_PUBLIC_SITE_URL` = link website (Vercel → Project → Settings → Environment Variables),
rồi deploy lại để ảnh xem trước khi chia sẻ link (Facebook, Zalo, LinkedIn) trỏ đúng domain.
