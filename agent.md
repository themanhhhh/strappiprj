# ĐẶC TẢ THIẾT KẾ & KỸ THUẬT  
**Dự án:** Website Thi Công Nhà Hàng — *Industrial Minimal Style*  
**Phiên bản:** v1.0  
**Ngày:** 2026-03-01

---

## 1) Mục tiêu dự án
### 1.1 Mục tiêu kinh doanh
- Tạo website “profile doanh nghiệp” để **tăng uy tín** và **tạo lead** (đặt lịch khảo sát / nhận báo giá).
- Tăng traffic tự nhiên (SEO) thông qua **bài viết kiến thức + case study dự án**.
- Cho phép đội ngũ Marketing/HR tự đăng nội dung bằng **Admin CMS**.

### 1.2 Đối tượng người dùng chính
- Chủ nhà hàng / chuỗi F&B (cần thi công fit-out nhanh, đúng chuẩn vận hành).
- Quản lý dự án / kiến trúc sư phối hợp.
- Ứng viên (tuyển dụng).

### 1.3 “Key actions” (CTA)
- **Nhận báo giá / Đặt lịch khảo sát**
- Xem **Dự án / Case study**
- Gọi hotline / Zalo (tuỳ kênh)
- Gửi form liên hệ
- Ứng tuyển

---

## 2) Phong cách thiết kế: Industrial Minimal
### 2.1 Tinh thần
- **Industrial:** thô – kỹ thuật – vật liệu thật (bê tông, thép, gạch, gỗ), cảm giác “công trường / xưởng”.
- **Minimal:** tối giản, ít màu, nhiều khoảng trống, nhấn mạnh bố cục và typography.
- “Brutalist nhẹ” (tuỳ chọn): đường kẻ (rules), grid lộ rõ, khung viền mảnh.

### 2.2 Quy tắc thị giác (Design Rules)
- **1 accent color** (màu nhấn) dành cho CTA/ trạng thái; phần còn lại trung tính.
- **Ít hiệu ứng:** hover/transition tinh tế, không lạm dụng animation.
- Hierarchy bằng **size chữ + spacing + vị trí**, hạn chế dùng màu để phân cấp.
- Đường kẻ/viền 1px, bo góc ít (0–12px).

### 2.3 Hệ màu (Design Tokens – gợi ý)
- `bg.concrete` = #F4F3F1  
- `text.charcoal` = #111111  
- `muted.steel` = #6B6F76  
- `border.light` = #D7D7D7  
- `surface.dark` = #181818  
- `accent.safety` = #F5C400  *(chỉ dùng cho CTA chính)*

### 2.4 Typography
- **Headline:** Sans/Grotesk (có thể hơi condensed) → mạnh, kỹ thuật.
- **Body:** Sans dễ đọc → rõ ràng, gọn.
- **Meta/Spec:** Monospace → tạo vibe “bản vẽ / thông số”.

### 2.5 Grid & spacing
- Desktop: 12-column grid, max-width 1200–1320px, gutter 24px, lề ngoài rộng.  
- Tablet: 8 cột; Mobile: 4 cột.  
- Spacing scale: 4 / 8 / 12 / 16 / 24 / 32 / 48 / 64.

### 2.6 Photography / hình ảnh
- Ảnh ưu tiên: **chi tiết thi công**, texture vật liệu, ánh sáng tự nhiên, góc chụp “thực chiến”.
- Màu ảnh: trung tính, tương phản tốt, tránh quá nhiều màu.
- Có thể dùng grain nhẹ (5–8% opacity) cho nền, nhưng **không làm giảm độ đọc**.

---

## 3) IA & cấu trúc trang (Information Architecture)
### 3.1 Sitemap đề xuất
- Trang chủ
- Về chúng tôi
- Dịch vụ / Lĩnh vực  
  - Danh sách dịch vụ  
  - Chi tiết dịch vụ
- Dự án (Portfolio)  
  - Danh sách dự án + bộ lọc  
  - Chi tiết dự án (Case Study)
- Tin tức / Kiến thức  
  - Danh sách bài viết  
  - Chi tiết bài viết
- Tuyển dụng  
  - Danh sách vị trí  
  - Chi tiết vị trí
- Liên hệ
- (Tuỳ chọn) Tìm kiếm

### 3.2 Wireframe tham chiếu (nội bộ)
- `industrial_minimal_wireframe_home.png`
- `industrial_minimal_wireframe_project_detail.png`
- `industrial_minimal_style_tile.png`

---

## 4) UI Components (bộ component tối thiểu)
### 4.1 Navigation
- Header: Logo (left) | Menu | Switch ngôn ngữ (VI/EN) | CTA (accent)
- Footer: Offices | Hotline | Email | Menu | Social (minimal)

### 4.2 Content blocks
- Section title kiểu “spec sheet”: `01 / SECTION NAME` + line ngang
- Cards: Project / Post / Service (ảnh + title + meta monospace)
- Filter bar (projects): chip có border + trạng thái active rõ ràng
- CTA strip nền tối: 1 CTA chính
- Form: input vuông, border rõ; state error/success rõ ràng

### 4.3 Micro-interactions
- Hover: underline, ảnh shift nhẹ (2–4px), meta reveal
- Transition 150–250ms, easing nhẹ
- Không dùng parallax nặng

---

## 5) Nội dung & CMS: Content Types + Fields (Strapi)
> Ghi chú: Bật **Draft & Publish** cho các loại nội dung cần nháp/đăng. Bật **Internationalization (i18n)** cho nội dung cần dịch (vi/en).

### 5.1 Components dùng chung
**`shared.seo`** *(localized)*  
- `metaTitle` (text)  
- `metaDescription` (textarea)  
- `ogImage` (media single)  
- `canonicalUrl` (text, optional)  
- `noIndex` (boolean)  
- `noFollow` (boolean)  

**`shared.cta`** *(localized)*  
- `title` (text)  
- `description` (textarea)  
- `buttonText` (text)  
- `buttonUrl` (text)  

**`shared.faqItem`** *(localized)*  
- `question` (text)  
- `answer` (rich text)  

**`shared.navLink`** *(localized)*  
- `label` (text)  
- `href` (text)  
- `newTab` (boolean)  

**Dynamic Zone `blocks.*`** *(localized)*  
- `blocks.richText`: `content` (rich text)  
- `blocks.imageText`: `title` (text), `text` (rich text), `image` (media), `imagePosition` (enum left/right)  
- `blocks.stats`: `items[]` (label/value)  
- `blocks.timeline`: `steps[]` (title/description)  
- `blocks.gallery`: `images` (media multiple), `caption` (text optional)  

### 5.2 Collection Types
**`posts` (Tin tức / Kiến thức)** *(localized + draft/publish)*  
- `title` (text)  
- `slug` (UID from title)  
- `excerpt` (textarea)  
- `coverImage` (media single)  
- `content` (dynamic zone)  
- `category` (relation → `post_categories`)  
- `tags` (text optional)  
- `seo` (component `shared.seo`)  
- `featured` (boolean)

**`projects` (Dự án / Case Study)** *(localized + draft/publish)*  
- `title` (text)  
- `slug` (UID)  
- `shortDescription` (textarea)  
- `coverImage` (media single)  
- `gallery` (media multiple)  
- `content` (dynamic zone)  
- `category` (relation → `project_categories`)  
- `services` (relation many-to-many → `services`)  
- `location` (text)  
- `clientName` (text optional)  
- `areaM2` (number optional)  
- `budgetRange` (enum optional)  
- `year` (number optional)  
- `seo` (component)

**`services` (Dịch vụ / Lĩnh vực)** *(localized + draft/publish)*  
- `title` (text)  
- `slug` (UID)  
- `summary` (textarea)  
- `icon` (media single optional)  
- `coverImage` (media single)  
- `content` (dynamic zone)  
- `relatedProjects` (relation many-to-many → `projects`)  
- `seo` (component)  
- `order` (number)

**`jobs` (Tuyển dụng)** *(localized + draft/publish)*  
- `title` (text)  
- `slug` (UID)  
- `summary` (textarea)  
- `department` (relation → `departments`)  
- `location` (relation → `job_locations`)  
- `jobType` (enum)  
- `level` (enum optional)  
- `salaryRange` (text optional)  
- `responsibilities` (rich text)  
- `requirements` (rich text)  
- `benefits` (rich text)  
- `applyUrl` (text optional)  
- `applyEmail` (email optional)  
- `deadline` (date optional)  
- `seo` (component)

**`offices` (Văn phòng/Cơ sở)** *(localized)*  
- `name` (text)  
- `address` (textarea)  
- `phone` (text)  
- `email` (email)  
- `workingHours` (text)  
- `mapEmbed` (text/rich text optional)  
- `latitude`, `longitude` (number optional)  
- `order` (number)

**Taxonomy** *(localized)*  
- `post_categories`: `name`, `slug`  
- `project_categories`: `name`, `slug`  
- `departments`: `name`, `slug`  
- `job_locations`: `name`, `slug`

**Lead inbox (không dịch)**  
- `contact_submissions` *(NOT localized)*: `fullName`, `phone`, `email`, `serviceInterest` (relation), `message`, `status`, `note`

### 5.3 Single Types
**`site_settings`** *(localized)*  
- `siteName` (text)  
- `logo` (media)  
- `favicon` (media)  
- `hotline` (text)  
- `email` (email)  
- `socialLinks[]` (component navLink hoặc label+url)  
- `headerMenu[]` (component `shared.navLink`)  
- `footerMenu[]` (component `shared.navLink`)  
- `defaultSeo` (component `shared.seo`)

**`homepage`** *(localized + draft/publish)*  
- `heroTitle` (text)  
- `heroSubtitle` (textarea)  
- `heroImage` (media)  
- `heroCtas[]` (component `shared.cta`)  
- `sections` (dynamic zone)  
- `seo` (component)

**`about`** *(localized + draft/publish)*  
- `title` (text)  
- `content` (dynamic zone)  
- `seo` (component)

**`contact_page`** *(localized)*  
- `title` (text)  
- `description` (rich text)  
- `formCta` (component)  
- `seo` (component)

---

## 6) Đa ngôn ngữ (VI/EN) — chiến lược i18n
### 6.1 URL strategy (khuyến nghị)
- Prefix-based routing:
  - `/vi/...`
  - `/en/...`

### 6.2 Quy ước slug & mapping
- Mỗi locale có **slug riêng** (để natural language).
- Next.js route theo `[locale]` + segment (ví dụ):
  - `/vi/tin-tuc/[slug]`
  - `/en/news/[slug]`  *(có thể map pathname theo locale)*

### 6.3 Fetch dữ liệu theo locale
- Next.js truyền `locale=vi|en` khi gọi Strapi Content API.
- Mặc định: nếu thiếu bản dịch, hiển thị fallback (tuỳ chính sách: ẩn item / fallback về vi).

---

## 7) SEO & nội dung
### 7.1 On-page SEO
- Dùng `shared.seo` cho mọi trang/cms entry: title/description/OG/canonical/noindex.
- Bài viết/dự án: hỗ trợ cover, excerpt, heading rõ, internal links.

### 7.2 Multilingual SEO
- Mỗi trang set:
  - `canonical`
  - `hreflang` (vi/en + x-default nếu cần)
- Tạo sitemap theo locale.

### 7.3 Structured data (khuyến nghị)
- Organization / LocalBusiness
- Article (posts)
- JobPosting (jobs)
- BreadcrumbList (projects/posts)

---

## 8) Kỹ thuật: kiến trúc hệ thống (Option A)
### 8.1 Tổng quan
- **Frontend:** Next.js (App Router)
- **i18n:** next-intl
- **CMS/Admin:** Strapi 5 (Admin tại `/admin`)
- **DB:** PostgreSQL
- **Media:** S3-compatible storage (khuyến nghị)

### 8.2 Sơ đồ kiến trúc (Mermaid)
```mermaid
flowchart LR
  U[User Browser] --> CDN[CDN/Edge (Vercel)]
  CDN --> NX[Next.js App Router]
  NX -->|REST Content API| ST[Strapi 5]
  ST --> PG[(PostgreSQL)]
  ST --> S3[(S3/R2/Spaces - Media)]
  NX --> ANA[(Analytics/Logging - optional)]
```

---

## 9) Chi tiết triển khai Frontend (Next.js)
### 9.1 Cấu trúc thư mục (gợi ý)
- `src/app/[locale]/...` (routes theo locale)
- `src/i18n/*` (next-intl config, routing)
- `src/lib/strapi/*` (client fetch, typing)
- `src/components/*` (UI)
- `src/styles/*` (tokens)
- `src/content/*` (static copy nếu cần)

### 9.2 Data fetching & caching
- Trang list (posts/projects/services): SSG/ISR (tuỳ chiến lược)
- Trang detail (post/project): generate static params theo locale + ISR
- Dùng Image Optimization của Next.js (ưu tiên remote patterns cho media)

### 9.3 SEO implementation
- Generate metadata theo locale (title, description, OG)
- `robots.txt`, `sitemap.xml` theo locale
- `hreflang` trong head

---

## 10) Chi tiết triển khai CMS (Strapi 5)
### 10.1 Admin panel
- Tạo users/roles: Admin, Editor, HR
- Phân quyền CRUD theo content-type

### 10.2 i18n
- Add locales `vi`, `en`
- Set default locale = `vi` (khuyến nghị)

### 10.3 REST API usage
- Query theo locale bằng `?locale=vi` hoặc `?locale=en`
- Filter theo slug, category, search, pagination

### 10.4 Populate (quan trọng với Strapi 5)
- Với components & dynamic zones: populate **tường minh** theo chiến lược chi tiết (không dùng shared strategy như v4).

### 10.5 Media storage
- Không khuyến nghị lưu media trên disk server khi deploy.
- Dùng provider S3-compatible (AWS S3 / R2 / Spaces) + CDN.

---

## 11) Bảo mật & vận hành
### 11.1 Bảo mật
- Strapi Admin:
  - mật khẩu mạnh, hạn chế IP (nếu có), bật 2FA nếu tổ chức yêu cầu
- CORS giới hạn domain frontend
- Rate limit cho form endpoint (chống spam)
- Xoá header/ thông tin nhạy cảm

### 11.2 Observability
- Log request lỗi ở Strapi
- Error tracking (Sentry/Logflare… tuỳ chọn)
- Healthcheck endpoint cho Strapi

### 11.3 Backup
- PostgreSQL: backup tự động (daily) + retention
- Media: dựa vào storage provider + versioning (tuỳ nhà cung cấp)

---

## 12) Deploy & môi trường
### 12.1 Môi trường
- `DEV`: local
- `STAGING`: test trước khi lên prod
- `PROD`: live

### 12.2 Deploy đề xuất
- Next.js: Vercel
- Strapi + PostgreSQL: Render/Railway/VPS Docker
- Media: S3-compatible + CDN (Cloudflare optional)

### 12.3 Biến môi trường (gợi ý)
**Next.js**
- `NEXT_PUBLIC_SITE_URL`
- `STRAPI_URL`
- `STRAPI_API_TOKEN` *(read-only token)*

**Strapi**
- `DATABASE_URL` hoặc host/port/user/pass
- `APP_KEYS`, `API_TOKEN_SALT`, `ADMIN_JWT_SECRET`, `JWT_SECRET`
- `S3_ACCESS_KEY_ID`, `S3_ACCESS_SECRET`, `S3_BUCKET`, `S3_REGION`, `S3_ENDPOINT` *(tuỳ provider)*

---

## 13) Tiêu chuẩn hoàn thiện (Definition of Done)
- Admin đăng bài: posts/projects/services/jobs hoạt động + i18n vi/en.
- Website public hiển thị đúng theo locale, URL rõ, SEO đủ.
- Performance ổn (ảnh tối ưu, caching hợp lý).
- Form liên hệ lưu vào CMS hoặc gửi mail + chống spam cơ bản.
- Quy trình deploy + backup + quyền admin được thiết lập.

---

## 14) Nguồn tham khảo (đặt trong code block để copy nhanh)
```text
Next.js Internationalization (App Router): https://nextjs.org/docs/app/guides/internationalization
next-intl App Router: https://next-intl.dev/docs/getting-started/app-router
next-intl Routing setup: https://next-intl.dev/docs/routing/setup
Strapi Internationalization: https://docs.strapi.io/cms/features/internationalization
Strapi REST API locale parameter: https://docs.strapi.io/cms/api/rest/locale
Strapi REST API reference: https://docs.strapi.io/cms/api/rest
Strapi v4→v5 breaking changes: https://docs.strapi.io/cms/migration/v4-to-v5/breaking-changes
Strapi v5 populate dynamic zones/components: https://docs.strapi.io/cms/migration/v4-to-v5/breaking-changes/no-shared-population-strategy-components-dynamic-zones
```
