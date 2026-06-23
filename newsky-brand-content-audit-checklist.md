# Checklist đối chiếu website hiện tại với tài liệu New Sky

Nguồn đối chiếu: `1.2_thong_tin_co_ban_newsky_20260526.md` v1.1 ngày 13/06/2026 và `1_dat_hang_vendor.md`.

Quy ước mức độ:
- `P0`: bắt buộc sửa trước khi public vì sai định vị, sai dữ liệu lõi hoặc có rủi ro pháp lý/brand.
- `P1`: nên sửa trong vòng hoàn thiện nội dung/nhận diện.
- `P2`: tối ưu UX, accessibility, SEO hoặc kỹ thuật.

Cập nhật trạng thái gần nhất: đã xử lý nền tảng brand, meta/homepage USP, About, Services/messages, catalog service list, contact hero, chat prompt, footer contact links, UX form, social/utility placeholder, màu hardcode lệch brand, SEO nâng cao, nâng cấp i18n, slug tiếng Việt theo sitemap, 4 hub dịch vụ, trang tác giả, FAQ, local landing, `llms.txt`/`llms-full.txt` và hotline CTA cố định. `pnpm lint:web` pass; `pnpm build:web` compile/type/static generation pass nhưng dừng ở bước copy `.next/standalone` do quyền symlink trên Windows/pnpm workspace.

## 1. Brand Foundation

- [x] `P0` Đổi typography toàn site từ `Roboto`/`Playfair Display` sang đúng brand: heading `Work Sans` weight 700, body `Lato` weight 400/500. Đã sửa: `apps/web/src/app/layout.tsx`, `apps/web/src/styles/tokens.css`.
- [x] `P0` Đổi design tokens màu sang palette đã chốt: Navy `#004075`, Blue `#1A75BE`, Off-white `#FFFAF6`, Gold `#E7AE1F`; loại bỏ tone industrial/rust ở token gốc. Đã sửa: `apps/web/src/styles/tokens.css`.
- [x] `P0` CTA chính phải dùng nền Navy `#004075` chữ trắng; không dùng màu rust/gold/cam làm nền nút chính. Đã sửa token `--accent-safety` sang Navy và `.button-primary` chữ trắng.
- [x] `P1` Nền mặc định toàn trang nên chuyển về Off-white `#FFFAF6`, tránh nền xám/công nghiệp hiện tại. Đã sửa: `apps/web/src/styles/system.css:1-5`, `apps/web/src/styles/tokens.css:2-4`.
- [x] `P1` Kiểm tra lại toàn bộ CSS hardcode màu nâu/cam/đen để đưa về palette New Sky. Đã thay các màu cũ/rust/cam/nâu chính sang biến brand; grep màu cũ không còn match trong `apps/web/src`.
- [x] `P1` Logo alt đang là `Maestro`, cần đổi thành `New Sky`. Đã sửa: `apps/web/src/components/aladdin/fullscreen-menu.tsx`.

## 2. Thông Điệp Và USP

- [x] `P0` Hero/meta description phải dùng đúng mô tả 1 dòng trong tài liệu: “Đối tác thiết kế và thi công nhà hàng F&B cho chủ nhà hàng Việt — 10 năm cùng hệ thống Aladdin, xưởng tự sản xuất nội thất, inox bếp và biển hiệu.” Đã sửa: `apps/web/src/lib/site.ts`, `apps/web/src/app/layout.tsx`, `apps/web/src/messages/vi.json`, `apps/web/src/messages/en.json`.
- [x] `P0` Giữ đúng 3 số neo bắt buộc trong mọi copy: `16 ngày`, `Hơn 100 dự án nhà hàng trong 10 năm`, `6 thương hiệu thuộc hệ thống Aladdin`. Đã sửa homepage/site/messages/about/chat prompt; không còn match các cụm lệch P0 trong source.
- [x] `P0` Bổ sung đủ danh sách 6 thương hiệu Aladdin: Bò Tơ Quán Mộc, Tian Long, Long Wang, G.Master, Cơm Niêu Hải Sư, Khèn Nướng Sapa. Đã sửa fallback brand list song ngữ trong `apps/web/src/lib/site.ts`.
- [x] `P0` Sửa USP “Niềm tin” để nói rõ “đối tác đồng hành cùng 6 thương hiệu thuộc hệ thống Aladdin”, không chỉ nói chung “6 thương hiệu F&B”. Đã sửa homepage featured/news fallback trong `apps/web/src/lib/site.ts`.
- [x] `P1` Thống nhất cách ghi diện tích `m²` thay vì `m2` trên nội dung công khai. Đã sửa data placeholder dự án và các vị trí chính.

## 3. Dịch Vụ Và Năng Lực

- [x] `P0` Sửa toàn bộ “5 năng lực cốt lõi” thành “6 năng lực” theo tài liệu: thiết kế, nội thất, cơ điện, inox bếp, xây dựng, biển hiệu. Đã sửa `messages`, homepage, `about`, `catalog` và chat prompt.
- [x] `P0` Tách “Thiết kế” và “Nội thất” thành 2 năng lực riêng nếu giữ cách trình bày theo 6 card. Đã sửa `messages`, `about` và `catalog`.
- [x] `P0` Bổ sung năng lực “Biển hiệu” vào services/catalog/about/home: chữ Inox, biển hiệu UV, pano. Đã sửa `messages`, `about` và `catalog`.
- [x] `P0` Mô tả đúng mô hình tổng thầu: cơ điện và xây dựng tổ chức qua thầu phụ, phần còn lại tự làm. Đã sửa `messages`, homepage, `about` và `catalog`.
- [x] `P0` Gỡ/giảm các thông tin chưa có trong tài liệu như `2-3x`, `12 tháng bảo hành`, `30 ngày hỗ trợ`, `1.000m²/2.000m²`, `cắt CNC/chấn`, nếu chưa được PM xác nhận public. Không còn match các cụm này trong source.
- [x] `P1` Bổ sung sản phẩm rời tự sản xuất tại xưởng: inox bếp công nghiệp, nội thất, biển hiệu. Đã sửa `messages`, meta/homepage, `about`, `catalog` và chat prompt.
- [x] `P1` Sửa “xưởng Inox riêng” thành “xưởng tự sản xuất nội thất, inox bếp và biển hiệu” ở các vị trí tổng quan chính. Đã sửa: `apps/web/src/messages/vi.json`, `apps/web/src/messages/en.json`, `apps/web/src/lib/site.ts`, `apps/web/src/app/layout.tsx`.

## 4. Đối Tượng Khách Hàng

- [x] `P0` Sửa tệp khách hàng chính theo tài liệu: gói trọn gói dành cho chủ chuỗi nhà hàng Việt Nam quy mô 3 đến hơn 50 cơ sở, người setup nhà hàng F&B, doanh nghiệp F&B mở rộng chuỗi; sản phẩm rời phục vụ rộng hơn gồm showroom/chuỗi bán lẻ. Đã gỡ “khách sạn/lưu trú” khỏi source.
- [x] `P1` Các CTA/form nên hỏi thông tin phù hợp tệp B2B F&B: quy mô chuỗi, số cơ sở, mặt bằng, timeline khai trương, nhu cầu trọn gói hay sản phẩm rời. Đã sửa contact hero và form intro để hướng đúng nhu cầu F&B/sản phẩm rời.

## 5. Pháp Nhân Và Liên Hệ

- [x] `P0` Không public địa chỉ ĐKKD, mã số thuế, ngân hàng, STK trên website. Đã rà source, không có dữ liệu nhạy cảm này được public.
- [x] `P0` Footer/contact chỉ dùng 2 văn phòng đại diện public: miền Bắc `BT C01-L10 An Vượng...`, miền Nam `31-33 Nguyễn Thị Thập...`. Footer đang dùng đúng dữ liệu public.
- [x] `P0` Hotline `0906 790 333` và email `syluu.newsky@gmail.com` đã đúng, nhưng nên làm thành link `tel:`/`mailto:` cho footer/contact. Đã sửa `apps/web/src/components/footer.tsx`.
- [x] `P1` Social links đang là `#`; không public Facebook/Zalo OA cho đến khi PM cung cấp link chính thức. Đã ẩn bằng mảng rỗng trong `siteConfig.socialLinks`.
- [x] `P1` `utilityLinks` đang có placeholder `Search`, `Investor Desk`, `Policy`; cần xóa/ẩn nếu chưa có nội dung thật. Đã ẩn bằng mảng rỗng trong `siteConfig.utilityLinks`.
- [x] `P1` Zalo OA chưa có link chính thức; dùng hotline tạm thay vì placeholder `#`. Đã thêm hotline CTA cố định toàn site trong `apps/web/src/components/fixed-hotline-cta.tsx`.

## 6. Copy Cấm Và Rủi Ro Pháp Lý

- [x] `P0` Chạy kiểm tra tự động trước khi public để không có các cụm cấm: “Số 1”, “Hàng đầu”, “Duy nhất”, “Cam kết 100%”, “Giảm giá sốc”. Đã chạy grep, không có match trong `apps/web/src`.
- [x] `P0` Tránh public giá dịch vụ và số tiền đầu tư xưởng. Đã rà source, không thấy giá/số tiền đầu tư xưởng.
- [x] `P1` Tránh copy phóng đại kiểu “đột phá”, “thay đổi cuộc chơi”, “bí mật ít ai biết”. Đã rà source, không thấy các cụm này.
- [x] `P1` Cân nhắc đổi chữ “Cam kết” trong heading/card thành “Minh chứng” hoặc “3 điểm neo năng lực” nếu muốn tránh cảm giác quảng cáo tuyệt đối; tài liệu cho phép “USP - 3 cam kết” nhưng vẫn cần viết có bằng chứng cụ thể. Đã đổi copy public sang “Minh chứng”/“3 điểm neo năng lực” và grep không còn match `Cam kết|Commitment|commitment` trong `apps/web/src`.

## 7. Bản Đồ Việt Nam

- [ ] `P0` Nếu tiếp tục dùng bản đồ Việt Nam ở homepage/about, bắt buộc xác nhận ảnh `/images/map.png` có đủ Hoàng Sa, Trường Sa và nhãn “Q.Đ. Hoàng Sa”, “Q.Đ. Trường Sa”. Người dùng đã xác nhận giữ map hiện tại; vẫn cần kiểm thủ công asset trước public.
- [x] `P0` Nếu ảnh hiện tại không đủ 2 quần đảo/nhãn, tạm ẩn block bản đồ hoặc thay bằng danh sách văn phòng/khu vực phục vụ dạng text cho đến khi có asset đúng. Không áp dụng vì người dùng chọn giữ map hiện tại.
- [x] `P2` Các pin bản đồ hiện chỉ render pin active nhưng chưa có pin mặc định; kiểm tra UX vì người dùng có thể không hiểu cần chọn thành phố. Đã đặt Hà Nội làm mặc định, render toàn bộ pin, pin có thể click trực tiếp và thêm `aria-pressed`.

## 8. Ảnh Và Asset

- [ ] `P0` Thay toàn bộ ảnh Unsplash/stock bằng ảnh thực khi PM cung cấp: xưởng, bếp nhà hàng Aladdin, chân dung Giám đốc Lưu Sỹ. Vị trí ảnh stock: `apps/web/src/lib/site.ts:306`, `apps/web/src/lib/site.ts:319`, `apps/web/src/lib/site.ts:332`, và bản tiếng Anh tương ứng `apps/web/src/lib/site.ts:422`, `apps/web/src/lib/site.ts:435`, `apps/web/src/lib/site.ts:448`.
- [ ] `P1` Ảnh chân dung `/images/giamdocpic.png` cần xác nhận là ảnh chính thức master/crop đã được PM duyệt. Vị trí: `apps/web/src/app/[locale]/about/page.tsx:211-217`.
- [ ] `P1` Logo `/images/logo.png` cần thay bằng logo `.svg` biến thể chính khi PM bàn giao. Vị trí: `apps/web/src/components/aladdin/fullscreen-menu.tsx:104`, `apps/web/src/components/aladdin/fullscreen-menu.tsx:191`.
- [ ] `P1` Tránh ảnh mờ, HDR drama, hoạt hình hoặc dàn dựng giả theo tài liệu brand. Cần kiểm thủ công thư mục `public/images`/CMS sau khi nhập asset.

## 9. Trang Cụ Thể Cần Sửa

- [ ] `P0` Homepage: sửa hero, stats, brand section, USP và ảnh theo đúng tài liệu. Đã sửa hero/stats/brand/USP fallback; còn ảnh stock Unsplash cần thay khi có asset thật.
- [x] `P0` About: bỏ tệp khách sạn/lưu trú nếu không có tài liệu bổ sung; sửa 5 năng lực thành 6 năng lực; sửa mô tả xưởng. Đã sửa `apps/web/src/app/[locale]/about/page.tsx` và `apps/web/src/components/aladdin/about-presence.tsx`.
- [x] `P0` Services: sửa metadata/hero/capabilities từ 5 lên 6; thêm biển hiệu và sản phẩm rời. Đã sửa `messages` song ngữ và `catalog`; còn cần kiểm visual sau build/browser.
- [ ] `P1` Projects: thay data placeholder `mall-restaurant-rollout`, `cafe-upgrade-package`, `signature-dining-space` bằng dự án thực, ưu tiên case 84 Ngọc Khánh 1.260m²/16 ngày và 6 thương hiệu Aladdin. Còn chờ dữ liệu/ảnh dự án thật.
- [ ] `P1` Journal: thay bài viết placeholder tiếng Anh bằng nội dung thật hoặc ẩn trang nếu chưa có kế hoạch SEO. Người dùng chọn giữ và sửa sau.
- [ ] `P1` Careers: kiểm tra có cần public “Tuyển dụng” trong giai đoạn đầu không. Người dùng chọn giữ và sửa sau.
- [x] `P0` Contact: sửa hero đang còn câu kỹ thuật/placeholder “real UI shell” ở tiếng Anh; bản tiếng Việt cũng nên chuyển về CTA thực tế: gọi hotline, gửi yêu cầu báo giá/tư vấn. Đã sửa `apps/web/src/app/[locale]/contact/page.tsx`.
- [x] `P0` Thêm route alias sitemap tiếng Việt theo tài liệu: `/vi/ve-chung-toi`, `/vi/du-an`, `/vi/blog`, `/vi/lien-he`. Đã thêm alias page tương ứng, vẫn giữ route cũ để giảm rủi ro.
- [x] `P0` Thêm `/vi/dich-vu` và 4 hub dịch vụ bắt buộc: `thiet-ke-thi-cong-nha-hang-tron-goi`, `bep-cong-nghiep-inox`, `bien-hieu-fnb`, `noi-that-fnb`. Đã thêm `apps/web/src/lib/service-hubs.ts` và route `/dich-vu/[slug]`.
- [x] `P1` Thêm trang `/vi/tac-gia/luu-sy`, `/vi/faq`, `/vi/xuong-inox-bep-cong-nghiep-ha-dong`, `/vi/thi-cong-bep-fnb-tphcm` theo sitemap mới.

## 10. Footer, Header, Navigation

- [x] `P1` Header CTA đang là “Đặt lịch khảo sát” trong messages nhưng button component dùng “Liên hệ”; thống nhất CTA chính theo tài liệu: “Liên hệ Zalo” hoặc “Báo giá” nếu có kênh phù hợp. Đã đổi CTA tiếng Việt thành “Nhận báo giá”, tiếng Anh “Request a quote”, link tiếng Việt về `/vi/lien-he`; Zalo OA vẫn chờ link chính thức.
- [x] `P1` Mega menu hiện là placeholder tiếng Anh “Corporate Profile”, “Investor Desk”, “Service matrix”, “Corporate brochure”; nếu component còn dùng, cần Việt hóa/sửa nội dung đúng New Sky hoặc bỏ. Đã thay nội dung mega menu bằng copy New Sky và grep không còn match placeholder.
- [x] `P1` Footer brand description cần bổ sung “Aladdin”, “nội thất”, “biển hiệu” theo mô tả đã chốt. Đã sửa `apps/web/src/messages/vi.json` và `apps/web/src/messages/en.json`.
- [x] `P1` Navigation tiếng Việt dùng slug Việt theo sitemap mới. Đã thêm `apps/web/src/lib/routes.ts` và cập nhật header/footer dùng `getNavPath`.

## 11. SEO Và Structured Data

- [x] `P0` Meta description toàn site cần đúng mô tả 1 dòng đã chốt; hiện đang rút gọn và thiếu các mảnh quan trọng. Đã sửa `apps/web/src/app/layout.tsx` và `apps/web/src/lib/site.ts`.
- [x] `P1` Domain trong metadata đang chốt `https://newskyfnb.vn`; tài liệu ghi PM còn chốt giữa 3 phương án. Người dùng xác nhận giữ `newskyfnb.vn`.
- [x] `P1` Chỉ thêm JSON-LD Organization/LocalBusiness sau khi PM xác nhận mã schema; tuyệt đối không đưa địa chỉ ĐKKD/ngân hàng vào schema public. Đã thêm JSON-LD `Organization` an toàn trong `apps/web/src/app/[locale]/layout.tsx`, chỉ gồm tên pháp nhân, thương hiệu, hotline, email, URL, mô tả và phạm vi phục vụ; không có địa chỉ ĐKKD/ngân hàng/MST.
- [x] `P2` Thiếu canonical/hreflang/sitemap/robots theo checklist triển khai hiện có. Đã thêm `apps/web/src/app/robots.ts`, `apps/web/src/app/sitemap.ts`, helper `apps/web/src/lib/seo.ts`, và gắn `alternates` canonical/hreflang cho trang chính + trang chi tiết service/project/journal/careers.
- [x] `P1` Thêm robots allow list cho AI crawler theo tài liệu. Đã thêm `GPTBot`, `ClaudeBot`, `PerplexityBot`, `Google-Extended`, `OAI-SearchBot` trong `apps/web/src/app/robots.ts`.
- [x] `P1` Thêm `llms.txt` và `llms-full.txt` public cho AEO/GEO. Đã thêm trong `apps/web/public`.
- [x] `P1` Thêm schema `Service` và `BreadcrumbList` cho 4 hub dịch vụ, `Person` cho `/tac-gia/luu-sy`, `FAQPage` cho `/faq`.
- [x] `P1` LocalBusiness schema cho `/lien-he` chưa được thêm riêng; hiện chỉ có Organization toàn site để tránh public sai địa chỉ/pháp lý. Đã thêm LocalBusiness schema an toàn cho alias `/vi/lien-he`, chỉ dùng hotline/email và 2 văn phòng đại diện public; không đưa MST/ngân hàng/địa chỉ ĐKKD.

## 12. Form Và Accessibility/UX

- [x] `P1` Form liên hệ: với bản tiếng Việt, required marker đang hiện tiếng Anh `(required)`, cần đổi thành `(bắt buộc)` hoặc dấu `*`. Đã sửa `apps/web/src/components/contact-form-ui.tsx`.
- [x] `P1` Input phone nên có `type="tel"` và `inputMode="tel"`; email nên thêm `spellCheck={false}`. Đã sửa `apps/web/src/components/contact-form-ui.tsx`.
- [x] `P1` Thông báo form nên có `aria-live="polite"`; khi lỗi submit nên focus vào field lỗi đầu tiên. Đã thêm `aria-live` và focus field lỗi đầu tiên.
- [x] `P2` Placeholder nếu dùng nên kết thúc bằng dấu `…` theo guideline; chat hiện dùng `...`. Đã sửa `apps/web/src/messages/vi.json` và `apps/web/src/messages/en.json`.
- [x] `P2` CSS có `transition: all`, nên thay bằng transition thuộc tính cụ thể. Đã sửa `apps/web/src/styles/system.css` cho `.desktop-nav-link`.

## 13. Kiểm Tra Cuối Trước Khi Public

- [x] Chạy tìm cụm cấm quảng cáo: `rg "Số 1|Hàng đầu|Duy nhất|Cam kết 100%|Giảm giá sốc" apps/web/src`.
- [x] Chạy tìm placeholder/link/cụm kỹ thuật: `rg "5 năng lực|60\+|2-3x|2-3 lần|12 tháng|30 ngày|khách sạn|lưu trú|cắt CNC|chấn|real UI shell|Lead Capture|href: '#'|Investor Desk|Maestro|image6" apps/web/src`.
- [x] Chạy tìm màu lệch brand: `rg "#c87941|#a05e2a|#c48f56|#a87a48|#8a7a58|#0B0202|#37220D|#C1532F|#B41E1E|#c48a2a|200, ?121|200,121" apps/web/src`.
- [ ] Kiểm tra thủ công map Việt Nam có đủ Hoàng Sa/Trường Sa và nhãn bắt buộc.
- [ ] Kiểm tra responsive desktop/mobile với grid desktop tối đa 1280px padding 64px, mobile 4 cột padding 16px.
- [ ] Kiểm tra tương phản CTA Navy chữ trắng và không có chữ trắng trên nền vàng kim.
- [x] Chạy `pnpm lint:web`.
- [ ] Chạy `pnpm build:web`. Compile/type/static generation đã pass 73 trang; còn lỗi môi trường `EPERM` khi tạo symlink `.next/standalone` trên Windows/pnpm workspace.

## 14. i18n

- [x] Cấu hình `next-intl` hoạt động với locale prefix `/vi` và `/en`: `apps/web/src/i18n/routing.ts`, `apps/web/src/i18n/request.ts`, `apps/web/src/middleware.ts`.
- [x] Layout locale load đúng messages theo locale: `apps/web/src/app/[locale]/layout.tsx`.
- [x] SEO i18n đã có canonical/hreflang cho các route chính và route chi tiết.
- [x] Static params cho service/project/journal detail không còn hardcode chỉ lấy Strapi locale `vi`; đã gom slug từ cả `vi` và `en`.
- [x] Các namespace chính đã được bổ sung vào `messages/vi.json` và `messages/en.json`: `home`, `contactPage`, `aboutPage`, `projectsPage`, `journalPage`, `journalDetail`, `careersPage`, `projectDetail`, `servicesPage`, `serviceDetail`.
- [x] Các page chính đã chuyển copy chính sang `getTranslations`: Home, Contact, Projects, Journal, Careers, một phần About, Project detail, Journal detail.
- [ ] About vẫn còn các mảng nội dung dài song ngữ đặt trong component để giữ cấu trúc hiện tại; có thể chuyển tiếp sang `messages` nếu muốn i18n tuyệt đối không hardcode.
- [ ] Một số component client còn dùng `locale === 'vi'` cho nhãn nhỏ hoặc dữ liệu tương tác: contact form, about presence, brand grid, CSR section, fullscreen menu. Đây là i18n hoạt động được, nhưng chưa đạt chuẩn “mọi copy đều nằm trong message files”.
- [x] Slug tiếng Việt cho navigation/sitemap chính đã triển khai ở nhánh `/vi`: `/vi/ve-chung-toi`, `/vi/dich-vu`, `/vi/du-an`, `/vi/blog`, `/vi/lien-he` và 4 hub dịch vụ.
- [ ] Route chi tiết từ CMS như service/project/journal detail vẫn dùng slug data hiện có; nếu cần slug riêng theo ngôn ngữ cho từng bài/dự án thì cần mapping từ CMS.
