# Fallback Static Data

File này liệt kê dữ liệu website đang hiển thị khi Strapi CMS không có dữ liệu hoặc không phản hồi.

Nguồn dữ liệu chính:

- `apps/web/src/lib/catalog.ts`: services, projects, posts, jobs.
- `apps/web/src/lib/site.ts`: homepage fallback, cấu hình site, navigation, mega menu, văn phòng.
- `apps/web/src/messages/vi.json` và `apps/web/src/messages/en.json`: text fallback cho hero, intro, label ở các page.

## Hành Vi Fallback Theo Khu Vực

| Khu vực | Khi CMS lỗi hoặc rỗng | Nguồn fallback |
| --- | --- | --- |
| Trang chủ hero | Dùng `homepageContent[locale].heroSlides` | `src/lib/site.ts` |
| Trang chủ brand/client | Nếu không có project CMS, dùng `homepageContent[locale].brands` | `src/lib/site.ts` |
| Trang chủ news | Nếu không có post CMS, dùng `homepageContent[locale].featuredNews` | `src/lib/site.ts` |
| Trang chủ CSR/careers section | Dùng `homepageContent[locale]`, chỉ override nếu CMS homepage có dữ liệu | `src/lib/site.ts` |
| Projects listing | Nếu không có project CMS, dùng `projects` | `src/lib/catalog.ts` |
| Project detail | Nếu không có project CMS theo slug, dùng `getProject(slug)` | `src/lib/catalog.ts` |
| Services detail | Nếu không có service CMS theo slug, dùng `getService(slug)` | `src/lib/catalog.ts` |
| Journal listing/detail | Nếu không có post CMS, dùng `posts` | `src/lib/catalog.ts` |
| Careers listing/detail | Nếu không có job CMS, dùng `jobs` | `src/lib/catalog.ts` |
| Hero slides ngoài trang chủ | Nếu không có hero CMS, thường không có ảnh nền, text lấy từ messages | `src/messages/*.json` |
| Chat widget | Nếu CMS lỗi, mặc định `chatEnabled: true` | `src/lib/strapi/queries.ts` |

## Site Config

### Brand

- Name: `New Sky`
- Description: `Đối tác thiết kế và thi công nhà hàng F&B cho chủ nhà hàng Việt - 10 năm cùng hệ thống Aladdin, xưởng tự sản xuất nội thất, inox bếp và biển hiệu.`
- Locales: `vi`, `en`

### Navigation

| Key | Href |
| --- | --- |
| about | `/about` |
| services | `/services` |
| projects | `/projects` |
| journal | `/journal` |
| careers | `/careers` |
| contact | `/contact` |

### Offices

| Label | Address | Phone | Email |
| --- | --- | --- | --- |
| VĂN PHÒNG MIỀN BẮC | BT C01-L10 An Vượng, Khu đô thị Dương Nội, Phường Dương Nội, Thành phố Hà Nội | 0906 790 333 | syluu.newsky@gmail.com |
| VĂN PHÒNG MIỀN NAM | 31-33 Nguyễn Thị Thập, Khu đô thị Him Lam, Quận 7, TP. Hồ Chí Minh | 0906 790 333 | syluu.newsky@gmail.com |

## Homepage Fallback - VI

### Hero Slides

| Eyebrow | Title | Description | Image | Stats |
| --- | --- | --- | --- | --- |
| New Sky Capability Profile | Đối tác thiết kế và thi công nhà hàng F&B cho chủ nhà hàng Việt. | 10 năm cùng hệ thống Aladdin, hơn 100 dự án nhà hàng và xưởng tự sản xuất nội thất, inox bếp, biển hiệu tại Hà Đông. | Retail center rollout | 10 năm / Kinh nghiệm thực chiến; Hơn 100 / Dự án nhà hàng; 3.000m² / Xưởng tự sản xuất |
| 3 điểm neo năng lực | Cạnh tranh bằng tiến độ, chất lượng và niềm tin có bằng chứng cụ thể. | New Sky chứng minh năng lực bằng dự án 84 Ngọc Khánh thi công 16 ngày, hơn 100 dự án nhà hàng trong 10 năm và quan hệ đồng hành cùng 6 thương hiệu thuộc hệ thống Aladdin. | Chain rollout system | 16 ngày / Kỷ lục Ngọc Khánh; Hơn 100 / Dự án trong 10 năm; 6 / Thương hiệu Aladdin |
| Một đầu mối | Thiết kế, nội thất, cơ điện, inox bếp, xây dựng và biển hiệu trong một hệ thống. | Cách làm tổng thầu chuyên nhà hàng giúp chủ đầu tư giảm phối hợp nhiều đầu mối, kiểm soát chất lượng tốt hơn và chủ động tiến độ khai trương. | Flagship execution | 6 / Năng lực cốt lõi; 3 / Bước lắp đặt, bàn giao, bảo trì; 1 / Đầu mối tổng thầu |

### Brands

Brand section title: `Khách hàng tiêu biểu`

Brand section lead: `New Sky đồng hành thi công cho các thương hiệu F&B thuộc hệ thống chuỗi nhà hàng của Aladdin.,JSC và nhiều dự án chuỗi quy mô lớn.`

| Name | Tag | Description |
| --- | --- | --- |
| Long Wang | Hong Kong Hotpot | Một trong các thương hiệu F&B New Sky đồng hành thi công trong quá trình mở rộng hệ thống. |
| Tian Long | Teochew Beef Hotpot | Chuỗi lẩu bò tươi Triều Châu với yêu cầu đồng bộ chất lượng khi mở rộng nhiều cơ sở. |
| Bò Tơ Quán Mộc | Traditional Dining | Thương hiệu nhà hàng phong cách hoài cổ Hà Nội, nổi bật trong case Ngọc Khánh 16 ngày. |
| G.Master | F&B Brand | Một trong 6 thương hiệu thuộc hệ thống Aladdin mà New Sky có kinh nghiệm đồng hành triển khai. |
| Cơm Niêu Hải Sư | Vietnamese Dining | Thương hiệu nhà hàng Việt trong hệ thống Aladdin, thuộc nhóm kinh nghiệm dự án F&B của New Sky. |
| Khèn Nướng Sapa | Vietnamese Dining | Thương hiệu nhà hàng Việt trong hệ thống Aladdin, bổ sung bằng chứng triển khai đa định dạng F&B. |

### Social Proof

- Title: `Minh chứng của New Sky`
- Lead: `Tiến độ, chất lượng và niềm tin đều được neo bằng bằng chứng dự án thực tế.`
- Story 1: `Tiến độ có bằng chứng` - `Tổ hợp Bò Tơ Quán Mộc + Long Wang tại 84 Ngọc Khánh được triển khai từ nhận mặt bằng đến khai trương trong 16 ngày.`
- Story 2: `Chất lượng đồng bộ` - `Hơn 100 dự án nhà hàng trong 10 năm với hệ thống kiểm soát từ thiết kế, vật tư, sản xuất, lắp đặt đến nghiệm thu.`

### Careers Block

- Title: `Đội ngũ triển khai`
- Lead: `New Sky vận hành bằng các đội chuyên trách: thiết kế, giám sát thi công, đội thi công trực tiếp, hành chính, kế toán và xưởng tự sản xuất.`
- Block title: `Một đội ngũ phục vụ đồng thời nhiều dự án trên 3 miền`
- Block description: `Các bộ phận phối hợp theo quy trình rõ ràng để giữ tiến độ, chất lượng và trách nhiệm xuyên suốt dự án.`
- Highlights: `Đội thiết kế`, `Đội giám sát thi công`, `Xưởng tự sản xuất 3.000m²`

### Featured News

| Category | Title | Description |
| --- | --- | --- |
| Case study | Tổ hợp Ngọc Khánh 1.260m² hoàn thành trong 16 ngày | Bằng chứng tiêu biểu cho năng lực điều phối đồng bộ nhiều hạng mục trong tiến độ rất ngắn. |
| Xưởng tự sản xuất | Xưởng tự sản xuất 3.000m² tại Hà Đông | Năng lực sản xuất nội bộ cho nội thất, inox bếp và biển hiệu giúp New Sky chủ động hơn ở các hạng mục tự làm. |
| Chuỗi F&B | Đồng hành cùng 6 thương hiệu thuộc hệ thống Aladdin | Bò Tơ Quán Mộc, Tian Long, Long Wang, G.Master, Cơm Niêu Hải Sư và Khèn Nướng Sapa là các điểm neo niềm tin của New Sky. |

### CTA

- Label: `Liên hệ`
- Title: `Sẵn sàng trao đổi về dự án nhà hàng của bạn.`
- Description: `Chia sẻ mặt bằng, concept, ngân sách dự kiến và timeline để New Sky tư vấn phương án thiết kế + thi công phù hợp.`
- Primary: `Đặt lịch tư vấn`
- Secondary: `Xem dự án`

## Homepage Fallback - EN

### Hero Slides

| Eyebrow | Title | Description | Image | Stats |
| --- | --- | --- | --- | --- |
| New Sky Capability Profile | Design and construction partner for F&B restaurants in Vietnam. | 10 years with the Aladdin system, more than 100 restaurant projects, and in-house production for interiors, kitchen stainless steel, and signage. | Retail center rollout | 10 years / Practical experience; 100+ / Restaurant projects; 3,000sqm / In-house workshop |
| 3 proof points | Competing through programme, quality, and trust backed by proof. | New Sky proves capability through the 16-day Ngoc Khanh project, more than 100 restaurant projects over 10 years, and delivery experience with 6 brands in the Aladdin system. | Chain rollout system | 16 days / Ngoc Khanh record; 100+ / Projects over 10 years; 6 / Aladdin brands |
| Single partner | Design, interiors, MEP, kitchen stainless steel, construction, and signage in one system. | The restaurant-focused general-contractor model helps investors reduce coordination across multiple parties, improve quality control, and protect opening schedules. | Flagship execution | 6 / Core capabilities; 3 / Install, handover, maintain; 1 / Accountable partner |

### Brands

Brand section title: `Representative Clients`

Brand section lead: `New Sky has delivered projects for F&B brands within the Aladdin.,JSC restaurant-chain system and other large-scale chain projects.`

| Name | Tag | Description |
| --- | --- | --- |
| Long Wang | Hong Kong Hotpot | One of the F&B brands New Sky has supported through restaurant rollout and delivery. |
| Tien Long | Teochew Beef Hotpot | A Teochew fresh-beef hotpot chain requiring consistent quality across multiple locations. |
| Bo To Quan Moc | Traditional Dining | A nostalgic Hanoi-style restaurant brand featured in the 16-day Ngoc Khanh case study. |
| G.Master | F&B Brand | One of 6 brands in the Aladdin system that anchor New Sky delivery experience. |
| Com Nieu Hai Su | Vietnamese Dining | A Vietnamese restaurant brand in the Aladdin system, part of New Sky restaurant project experience. |
| Khen Nuong Sapa | Vietnamese Dining | A Vietnamese restaurant brand in the Aladdin system, showing experience across F&B formats. |

### Other Homepage Copy

- Social title: `New Sky Proof Points`
- Social lead: `Programme, quality, and trust are anchored in actual project proof.`
- Careers title: `Delivery Teams`
- Careers lead: `New Sky operates through dedicated design, site supervision, direct construction, administration, accounting, and in-house workshop teams.`
- News title: `Projects and Capabilities`
- News lead: `Updates on representative projects, in-house workshop capability, and restaurant-chain delivery experience.`
- CTA title: `Ready to discuss your restaurant project.`
- CTA primary: `Book consultation`
- CTA secondary: `View projects`

## Services Fallback

| Slug | Index | Title | Meta | Description | Deliverables | Process | Related projects |
| --- | --- | --- | --- | --- | --- | --- | --- |
| `thiet-ke` | 01 | Thiết kế | Năng lực cốt lõi | Triển khai ý tưởng, mặt bằng công năng và bản vẽ kỹ thuật phù hợp định vị thương hiệu nhà hàng. | Ý tưởng thiết kế ban đầu; Mặt bằng công năng và bản vẽ kỹ thuật; Chi tiết thi công theo định vị thương hiệu | Khảo sát; Thiết kế; Duyệt bản vẽ; Bàn giao hồ sơ thi công | `ngoc-khanh-complex`, `tian-long-chain` |
| `noi-that` | 02 | Nội thất | Xưởng Hà Đông | Sản xuất và lắp đặt hạng mục nội thất nhà hàng tại xưởng để đồng bộ giữa thiết kế và thi công. | Hạng mục nội thất nhà hàng; Sản xuất tại xưởng Hà Đông; Lắp đặt theo bản vẽ đã duyệt | Bóc tách hạng mục; Sản xuất tại xưởng; Kiểm tra hoàn thiện; Lắp đặt công trường | `ngoc-khanh-complex`, `tian-long-chain` |
| `co-dien` | 03 | Cơ điện | MEP / Nhà hàng | Điều phối hệ thống điện, nước cấp, nước thải, thông gió, hút khói và các yêu cầu kỹ thuật liên quan cho nhà hàng. | Hệ thống điện và cấp thoát nước; Thông gió, hút khói và PCCC; Phối hợp yêu cầu kỹ thuật của mặt bằng khi cần | Khảo sát hạ tầng; Bản vẽ kỹ thuật; Điều phối thầu phụ; Chạy thử | `gmaster-landmark-81` |
| `inox-bep-cong-nghiep` | 04 | Inox bếp công nghiệp | Xưởng Hà Đông 3.000m² | Bàn inox, giá kệ, tủ bếp, bồn rửa và các hạng mục inox bếp công nghiệp được sản xuất tại xưởng Hà Đông. | Bàn inox, giá kệ, tủ bếp, bồn rửa; Sản xuất tại xưởng Hà Đông; Lắp đặt theo nhu cầu vận hành bếp nhà hàng | Thiết kế inox; Sản xuất tại xưởng; Kiểm tra hoàn thiện; Lắp đặt công trường | `ngoc-khanh-complex`, `tian-long-chain` |
| `xay-dung` | 05 | Xây dựng | Cải tạo / Hoàn thiện | Tổ chức cải tạo mặt bằng, dựng vách ngăn và hoàn thiện sàn, tường, trần theo bản vẽ đã duyệt. | Cải tạo mặt bằng nhà phố hoặc trung tâm thương mại; Dựng vách ngăn; Hoàn thiện sàn, tường, trần | Khảo sát hiện trạng; Lập tiến độ; Điều phối thầu phụ; Nghiệm thu hoàn thiện | `ngoc-khanh-complex` |
| `bien-hieu` | 06 | Biển hiệu | Chữ inox / UV / Pano | Sản xuất chữ inox, biển hiệu UV và pano để đồng bộ nhận diện mặt tiền, không gian và điểm chạm thương hiệu. | Chữ inox; Biển hiệu UV; Pano và hạng mục nhận diện liên quan | Chốt nhận diện; Sản xuất tại xưởng; Kiểm tra hoàn thiện; Lắp đặt công trường | `ngoc-khanh-complex`, `tian-long-chain` |

## Projects Fallback

| Slug | Title | Meta | Category | Location | Year | Area | Description | Challenge | Solution | Outcome | Services |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| `mall-restaurant-rollout` | Chuỗi nhà hàng trung tâm thương mại | THI CÔNG / 420 M² / HCMC | Fast Casual Fit-out | TP. Hồ Chí Minh | 2025 | 420 m² | Bố cục thẻ thông tin hiển thị cái nhìn tổng quan, phạm vi bàn giao và loại hình dự án. | Thời gian bàn giao mặt bằng ngắn và xung đột kỹ thuật MEP về thông gió nhà bếp và hệ thống thoát nước. | Điều chỉnh lại thiết kế MEP từ sớm và chia quá trình thi công thành các giai đoạn kiểm soát chặt chẽ. | Cửa hàng khai trương đúng tiến độ với lối đi kỹ thuật rõ ràng và ít sửa chữa ở giai đoạn cuối. | `thiet-ke`, `noi-that`, `co-dien`, `inox-bep-cong-nghiep`, `xay-dung`, `bien-hieu` |
| `cafe-upgrade-package` | Gói cải tạo quán Cafe | CẢI TẠO / 180 M² / ĐÀ NẴNG | Cafe Renovation | Đà Nẵng | 2025 | 180 m² | Chuẩn bị sẵn cho các bộ lọc, thẻ tag và hiển thị danh sách theo danh mục mà không cần tuỳ chỉnh giao diện. | Cửa hàng cần cải tạo nhưng vẫn phải duy trì hoạt động phục vụ và lối ra vào của khách. | Áp dụng các khung giờ thi công ngắt quãng và thiết kế lại luồng di chuyển quanh khu vực quầy bar. | Cửa hàng cải tạo giúp cải thiện năng suất phục vụ giờ cao điểm và giảm thiểu va chạm giữa nhân viên. | `thiet-ke`, `noi-that`, `co-dien`, `xay-dung` |
| `signature-dining-space` | Không gian ăn uống Signature | FLAGSHIP / 560 M² / HN | Flagship Dining | Hà Nội | 2025 | 560 m² | Hỗ trợ hiển thị meta data tương lai như hình ảnh, năm, ngân sách và các dịch vụ liên quan từ Strapi. | Khách hàng cần một khu vực đón khách ấn tượng hơn mà không làm giảm năng suất hiện tại. | Cân đối lại lối vào, khu vực chờ và ăn uống trong khi vẫn đảm bảo hoàn thiện kiến trúc hài hoà với các dịch vụ. | Bố cục cuối cùng giúp nâng cao ấn tượng của thực khách và duy trì hiệu quả vận hành xuyên suốt các ca. | `thiet-ke`, `noi-that`, `bien-hieu` |

## Posts / Journal Fallback

| Slug | Title | Meta | Description | Intro | Takeaways | Related services |
| --- | --- | --- | --- | --- | --- | --- |
| `prepare-restaurant-site-brief` | How to prepare a restaurant site brief | Knowledge / Fit-out | Prepared card pattern for SEO-driven editorial listing pages. | A usable site brief should capture concept, area, operating model, target opening date and key constraints before any execution planning starts. | Clarify operational model before drawing decisions; Record landlord constraints early; Define budget range and opening target in the same document | `thiet-ke`, `noi-that`, `co-dien` |
| `coordination-risks-before-handover` | Common coordination risks before handover | Technical / MEP | Supports article categories, excerpts and cover imagery later. | Most late-stage project friction comes from unresolved coordination between finishes, equipment and service routes. | Resolve equipment points before ceiling closure; Track MEP clashes with a single owner; Run pre-handover walk-throughs by zone | `co-dien`, `xay-dung` |
| `plan-service-circulation-early` | Planning service circulation early | Operations / Design | Uses the same visual language as service and project listings. | Early circulation planning prevents avoidable friction between guests, staff, pickup zones and service points. | Separate staff and guest choke points; Place support storage near service demand; Use layout to reduce repeated movement | `thiet-ke`, `noi-that` |

## Jobs / Careers Fallback

| Slug | Title | Meta | Location | Job type | Description | Responsibilities | Requirements | Benefits |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| `site-supervisor` | Site supervisor | Site Execution / Full-time | Ho Chi Minh City | Full-time | Prepared for job cards with department, level and application CTA. | Coordinate on-site trades and schedule priorities; Report progress, risks and quality status; Work with project leads on site readiness and handover | Experience in fit-out or interior execution; Comfortable with drawings and site coordination; Able to manage subcontractor communication | Structured project environment; Clear reporting line; Exposure to F&B fit-out projects |
| `project-architect` | Project architect | Design Coordination / Full-time | Ho Chi Minh City | Full-time | Supports responsibilities, requirements and benefits on detail pages later. | Translate concept intent into execution-ready packages; Coordinate with site and MEP stakeholders; Support material decisions and design clarifications | Architectural documentation experience; Ability to coordinate across disciplines; Good control of detail packages | Cross-functional collaboration; Fast decision loops; Portfolio-building project exposure |
| `marketing-coordinator` | Marketing coordinator | Business Support / Full-time | Ho Chi Minh City | Full-time | Matches the rest of the brand rather than default job board styling. | Coordinate case-study and editorial production; Manage website publishing workflow with CMS; Support lead funnel reporting with the business team | Strong writing and content operations skills; Comfortable with CMS workflows; Able to work across design and execution teams | Content ownership; Hands-on CMS workflow; Close access to real project material |

## Ghi Chú Triển Khai

- Dữ liệu fallback hiện chưa phải tất cả đều cùng một shape với Strapi response. Nếu muốn thay CMS hoàn toàn bằng static adapter, nên map static data về đúng type đang dùng trong `src/lib/strapi/types.ts`.
- Một số slug trong `relatedProjectSlugs` như `ngoc-khanh-complex`, `tian-long-chain`, `gmaster-landmark-81` hiện không tồn tại trong `projects` fallback hiện tại, nên service detail có thể không hiển thị related project tương ứng.
- Hero slides cho các trang `projects`, `services`, `journal`, `careers`, `contact`, `about` không có fallback ảnh riêng ngoài CMS; khi CMS rỗng, text vẫn lấy từ `messages`, nhưng slideshow/image có thể trống.
- Contact form hiện gửi submission về Strapi route. Nếu CMS pending, cần sửa riêng `src/app/api/contact/route.ts` để không lỗi production.
