# Portfolio — Ngô Nguyễn Chí Công

Website portfolio cá nhân, làm bằng Next.js 15, Tailwind CSS 4 và Motion.

## Chạy trên máy

```bash
npm install
npm run dev
```

Mở http://localhost:3000.

## Sửa nội dung

Toàn bộ chữ, dự án, kinh nghiệm, kỹ năng và thông tin liên hệ nằm trong **`src/data/profile.ts`**.
Sửa ở đó là website đổi theo, không cần đụng vào component.

- Đổi ảnh: thay file `public/avatar.jpg` (ảnh vuông, nền xanh xám như ảnh hiện tại sẽ hoà vào nền hero đẹp nhất).
- Màu và font: `src/app/globals.css` (khối `@theme`).

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
