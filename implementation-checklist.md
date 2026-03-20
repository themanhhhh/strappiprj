# Checklist Triển Khai Thực Tế

Tài liệu này được chuyển đổi từ đặc tả trong [agent.md](/d:/demo/agent.md) và đã được cập nhật theo trạng thái codebase hiện tại.

Quy ước trạng thái:
- `done`: đã triển khai xong ở mức codebase hiện tại
- `partial`: đã làm một phần nhưng chưa đủ để coi là hoàn tất
- `pending`: chưa làm hoặc chưa thể xác nhận

## 1. Khởi động dự án

- `done` Chốt mục tiêu chính của website: tăng uy tín, tạo lead, hỗ trợ SEO, hỗ trợ tuyển dụng
- `done` Chốt nhóm người dùng chính: chủ nhà hàng/F&B, quản lý dự án, kiến trúc sư, ứng viên
- `done` Chốt CTA chính: nhận báo giá, đặt lịch khảo sát, gọi hotline/Zalo, gửi form, ứng tuyển
- `done` Chốt ngôn ngữ triển khai: `vi`, `en`
- `done` Chốt stack kỹ thuật: `Next.js App Router`, `next-intl`, `Strapi 5`, `PostgreSQL`, `S3-compatible storage`
- `partial` Chốt môi trường triển khai: `DEV`, `STAGING`, `PROD`
- `partial` Chốt đơn vị deploy: `Vercel` cho frontend, `Render/Railway/VPS Docker` cho Strapi

## 2. Design System và UI

- `done` Tạo style guide theo hướng `Industrial Minimal`
- `done` Chốt design tokens màu
- `done` Chốt typography cho headline, body, monospace meta
- `done` Chốt spacing scale: `4 / 8 / 12 / 16 / 24 / 32 / 48 / 64`
- `done` Chốt responsive grid: desktop `12 cột`, tablet `8 cột`, mobile `4 cột`
- `done` Thiết kế các component cơ bản: header, footer, section title, cards, filter bar, CTA strip, form fields
- `done` Chốt rule animation/motion: hover nhẹ, transition `150-250ms`, không dùng parallax nặng
- `pending` Chuẩn hóa bộ ảnh: ảnh thi công thực tế, texture vật liệu, tone trung tính

## 3. Kiến trúc thông tin và nội dung

- `done` Xác nhận sitemap: trang chủ, giới thiệu, dịch vụ, dự án, tin tức, tuyển dụng, liên hệ
- `pending` Quyết định có cần trang tìm kiếm hay không
- `partial` Viết outline nội dung cho từng trang chính
- `done` Chốt URL structure song ngữ: `/vi/...`, `/en/...`
- `partial` Chốt mapping slug theo từng locale
- `pending` Xác định policy khi thiếu bản dịch: ẩn nội dung hoặc fallback về `vi`

## 4. Thiết lập frontend

- `done` Khởi tạo dự án `Next.js`
- `done` Thiết lập `App Router`
- `done` Thiết lập `next-intl`
- `partial` Tạo cấu trúc thư mục: `src/app/[locale]/...`, `src/i18n/*`, `src/lib/strapi/*`, `src/components/*`, `src/styles/*`
- `partial` Cấu hình image remote patterns cho media từ Strapi/S3
- `done` Tạo layout gốc theo locale
- `done` Tạo routing cho toàn bộ page chính
- `partial` Tạo component SEO metadata theo locale
- `pending` Tạo `robots.txt`
- `pending` Tạo `sitemap.xml` theo locale
- `pending` Gắn `hreflang` và canonical

## 5. Thiết lập CMS Strapi

- `done` Khởi tạo dự án `Strapi 5`
- `partial` Kết nối `PostgreSQL`
- `partial` Bật i18n cho các content type cần dịch
- `done` Bật `Draft & Publish` cho các content type cần workflow nháp/đăng
- `partial` Thêm locale `vi` và `en`
- `pending` Đặt default locale là `vi`
- `done` Tạo components dùng chung: `shared.seo`, `shared.cta`, `shared.faqItem`, `shared.navLink`
- `done` Tạo dynamic zone blocks: `blocks.richText`, `blocks.imageText`, `blocks.stats`, `blocks.timeline`, `blocks.gallery`

## 6. Tạo content models

- `done` Tạo collection type `posts`
- `done` Tạo collection type `projects`
- `done` Tạo collection type `services`
- `done` Tạo collection type `jobs`
- `done` Tạo collection type `offices`
- `done` Tạo taxonomy: `post_categories`, `project_categories`, `departments`, `job_locations`
- `done` Tạo lead inbox `contact_submissions`
- `done` Tạo single types: `site_settings`, `homepage`, `about`, `contact_page`
- `partial` Kiểm tra relation giữa các model
- `partial` Kiểm tra field bắt buộc và field optional
- `partial` Kiểm tra UID/slug hoạt động đúng theo locale

## 7. API và tầng tích hợp

- `pending` Viết Strapi client trong frontend
- `pending` Chuẩn hóa query theo `locale`
- `pending` Viết hàm fetch cho site settings, homepage, about, services, projects, posts, jobs, contact page
- `pending` Xử lý populate tường minh cho components và dynamic zones
- `pending` Xử lý pagination, filter, category, search
- `pending` Chuẩn hóa typing dữ liệu frontend

## 8. Xây dựng giao diện từng trang

- `done` Trang chủ
- `done` Trang giới thiệu
- `done` Trang danh sách dịch vụ
- `pending` Trang chi tiết dịch vụ
- `done` Trang danh sách dự án có filter
- `pending` Trang chi tiết dự án/case study
- `done` Trang danh sách tin tức
- `pending` Trang chi tiết bài viết
- `done` Trang danh sách tuyển dụng
- `pending` Trang chi tiết vị trí
- `done` Trang liên hệ
- `done` Header, footer, language switcher
- `pending` Empty state cho danh sách rỗng
- `done` 404 page theo locale

## 9. Form và lead handling

- `pending` Tạo form liên hệ
- `pending` Kết nối form với `contact_submissions` hoặc luồng gửi mail
- `pending` Thêm validate dữ liệu đầu vào
- `pending` Thêm chống spam cơ bản: rate limit, honeypot hoặc captcha nếu cần
- `pending` Hiển thị state: loading, success, error
- `pending` Kiểm tra dữ liệu lưu đúng vào CMS

## 10. SEO và structured data

- `pending` Gắn `meta title`, `meta description`, `og image` cho mọi trang
- `pending` Gắn canonical cho từng locale
- `pending` Gắn `hreflang` cho `vi`, `en`, `x-default` nếu cần
- `pending` Tạo structured data: `Organization` hoặc `LocalBusiness`, `Article`, `JobPosting`, `BreadcrumbList`
- `partial` Kiểm tra heading structure từng trang
- `pending` Kiểm tra internal linking giữa bài viết, dự án, dịch vụ

## 11. Phân quyền và bảo mật

- `pending` Tạo role `Admin`
- `pending` Tạo role `Editor`
- `pending` Tạo role `HR`
- `pending` Phân quyền CRUD đúng theo content type
- `pending` Bật mật khẩu mạnh cho tài khoản admin
- `pending` Bật 2FA nếu cần
- `pending` Giới hạn CORS theo domain frontend
- `pending` Ẩn thông tin nhạy cảm khỏi response/header
- `pending` Kiểm tra token chỉ đọc cho frontend

## 12. Media và lưu trữ

- `pending` Cấu hình provider S3-compatible
- `pending` Kiểm tra upload ảnh từ Strapi lên storage
- `pending` Kiểm tra URL media hoạt động qua CDN
- `pending` Chuẩn hóa kích thước ảnh cover
- `pending` Kiểm tra tối ưu ảnh trên frontend

## 13. Quan trắc, backup, vận hành

- `partial` Thiết lập log lỗi cho Strapi
- `pending` Thiết lập error tracking nếu dùng `Sentry` hoặc tương đương
- `pending` Tạo healthcheck endpoint
- `pending` Thiết lập backup PostgreSQL hằng ngày
- `pending` Kiểm tra retention policy backup
- `pending` Kiểm tra backup media theo provider

## 14. Deploy

- `pending` Tạo project frontend trên `Vercel`
- `pending` Tạo project Strapi trên `Render/Railway/VPS`
- `pending` Tạo database `PostgreSQL`
- `partial` Cấu hình biến môi trường frontend: `NEXT_PUBLIC_SITE_URL`, `STRAPI_URL`, `STRAPI_API_TOKEN`
- `partial` Cấu hình biến môi trường Strapi: `DATABASE_URL`, `APP_KEYS`, `API_TOKEN_SALT`, `ADMIN_JWT_SECRET`, `JWT_SECRET`
- `partial` Cấu hình biến S3 nếu dùng
- `pending` Deploy `STAGING`
- `pending` Test đầy đủ trên `STAGING`
- `pending` Deploy `PROD`

## 15. Kiểm thử trước khi go-live

- `partial` Kiểm tra tất cả route `vi/en`
- `partial` Kiểm tra tất cả CTA chính
- `pending` Kiểm tra form gửi thành công
- `pending` Kiểm tra filter dự án hoạt động
- `pending` Kiểm tra slug detail page hoạt động
- `pending` Kiểm tra SEO metadata hiển thị đúng
- `partial` Kiểm tra responsive desktop/tablet/mobile
- `pending` Kiểm tra performance cơ bản
- `pending` Kiểm tra không có media hoặc link hỏng
- `pending` Kiểm tra role editor/HR thao tác được trong admin

## 16. Definition of Done

- `partial` Admin tạo/sửa/xuất bản được `posts`, `projects`, `services`, `jobs`
- `partial` Website public hiển thị đúng theo locale
- `partial` URL rõ ràng, SEO cơ bản đầy đủ
- `pending` Ảnh được tối ưu, caching hợp lý
- `pending` Form liên hệ hoạt động và có chống spam cơ bản
- `pending` Deploy, backup, phân quyền admin hoàn chỉnh
