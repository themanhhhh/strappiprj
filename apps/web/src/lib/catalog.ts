export type ServiceEntry = {
  slug: string;
  index: string;
  title: string;
  description: string;
  meta: string;
  deliverables: string[];
  process: string[];
  relatedProjectSlugs: string[];
};

export type ProjectEntry = {
  slug: string;
  title: string;
  description: string;
  meta: string;
  category: string;
  location: string;
  year: string;
  area: string;
  challenge: string;
  solution: string;
  outcome: string;
  serviceSlugs: string[];
};

export type PostEntry = {
  slug: string;
  title: string;
  description: string;
  meta: string;
  intro: string;
  takeaways: string[];
  relatedServiceSlugs: string[];
};

export type JobEntry = {
  slug: string;
  title: string;
  description: string;
  meta: string;
  location: string;
  jobType: string;
  responsibilities: string[];
  requirements: string[];
  benefits: string[];
};

export const fallbackBannerImage = '/images/ALD04659-HDR.jpg';

export const projectFallbackImages: Record<string, string> = {
  'bo-to-quan-moc': '/images/fallback/brands/bo-to-quan-moc/banners/DSC07157.jpg',
  'long-wang': '/images/fallback/brands/long-wang/banners/DSC02232.jpg',
  'tian-long': '/images/fallback/brands/tian-long/gallery/DSC07529.jpg',
  'g-master': '/images/fallback/brands/g-master/banners/ALD04659-HDR.jpg',
  'com-nieu-hai-su': '/images/fallback/brands/com-nieu-hai-su/banners/_DSC6149.jpg',
  'khen-nuong-sapa': '/images/fallback/brands/khen-nuong-sapa/banners/ALD00859.jpg',
};

export const projectFallbackGalleries: Record<string, string[]> = {
  'bo-to-quan-moc': [
    '/images/fallback/brands/bo-to-quan-moc/gallery/DSC07157.jpg',
  ],
  'long-wang': [
    '/images/fallback/brands/long-wang/gallery/DSC02232.jpg',
    '/images/fallback/brands/long-wang/gallery/DSC02229.jpg',
    '/images/fallback/brands/long-wang/gallery/DSC02220.jpg',
  ],
  'tian-long': [
    '/images/fallback/brands/tian-long/gallery/DSC07529.jpg',
    '/images/fallback/brands/tian-long/gallery/DSC07430.jpg',
    '/images/fallback/brands/tian-long/gallery/DSC07426.jpg',
  ],
  'g-master': [
    '/images/fallback/brands/g-master/gallery/ALD04659-HDR.jpg',
  ],
  'com-nieu-hai-su': [
    '/images/fallback/brands/com-nieu-hai-su/gallery/_DSC6149.jpg',
    '/images/fallback/brands/com-nieu-hai-su/gallery/_DSC6148.jpg',
    '/images/fallback/brands/com-nieu-hai-su/gallery/_DSC6134.jpg',
  ],
  'khen-nuong-sapa': [
    '/images/fallback/brands/khen-nuong-sapa/gallery/ALD00859.jpg',
    '/images/fallback/brands/khen-nuong-sapa/gallery/ALD00820.jpg',
    '/images/fallback/brands/khen-nuong-sapa/gallery/ALD00809.jpg',
  ],
};

export function getProjectFallbackImage(slug: string) {
  return projectFallbackImages[slug] ?? fallbackBannerImage;
}

export function getProjectFallbackGallery(slug: string) {
  return projectFallbackGalleries[slug] ?? [getProjectFallbackImage(slug)];
}

export const services: ServiceEntry[] = [
  {
    slug: 'thiet-ke',
    index: '01',
    title: 'Thiết kế',
    description: 'Triển khai ý tưởng, mặt bằng công năng và bản vẽ kỹ thuật phù hợp định vị thương hiệu nhà hàng.',
    meta: 'Năng lực cốt lõi',
    deliverables: [
      'Ý tưởng thiết kế ban đầu',
      'Mặt bằng công năng và bản vẽ kỹ thuật',
      'Chi tiết thi công theo định vị thương hiệu'
    ],
    process: ['Khảo sát', 'Thiết kế', 'Duyệt bản vẽ', 'Bàn giao hồ sơ thi công'],
    relatedProjectSlugs: ['bo-to-quan-moc', 'long-wang', 'tian-long']
  },
  {
    slug: 'noi-that',
    index: '02',
    title: 'Nội thất',
    description: 'Sản xuất và lắp đặt hạng mục nội thất nhà hàng tại xưởng để đồng bộ giữa thiết kế và thi công.',
    meta: 'Xưởng Hà Đông',
    deliverables: [
      'Hạng mục nội thất nhà hàng',
      'Sản xuất tại xưởng Hà Đông',
      'Lắp đặt theo bản vẽ đã duyệt'
    ],
    process: ['Bóc tách hạng mục', 'Sản xuất tại xưởng', 'Kiểm tra hoàn thiện', 'Lắp đặt công trường'],
    relatedProjectSlugs: ['bo-to-quan-moc', 'long-wang', 'tian-long']
  },
  {
    slug: 'co-dien',
    index: '03',
    title: 'Cơ điện',
    description: 'Điều phối hệ thống điện, nước cấp, nước thải, thông gió, hút khói và các yêu cầu kỹ thuật liên quan cho nhà hàng.',
    meta: 'MEP / Nhà hàng',
    deliverables: [
      'Hệ thống điện và cấp thoát nước',
      'Thông gió, hút khói và PCCC',
      'Phối hợp yêu cầu kỹ thuật của mặt bằng khi cần'
    ],
    process: ['Khảo sát hạ tầng', 'Bản vẽ kỹ thuật', 'Điều phối thầu phụ', 'Chạy thử'],
    relatedProjectSlugs: ['g-master', 'long-wang', 'com-nieu-hai-su']
  },
  {
    slug: 'inox-bep-cong-nghiep',
    index: '04',
    title: 'Inox bếp công nghiệp',
    description: 'Bàn inox, giá kệ, tủ bếp, bồn rửa và các hạng mục inox bếp công nghiệp được sản xuất tại xưởng Hà Đông.',
    meta: 'Xưởng Hà Đông 3.000m²',
    deliverables: [
      'Bàn inox, giá kệ, tủ bếp, bồn rửa',
      'Sản xuất tại xưởng Hà Đông',
      'Lắp đặt theo nhu cầu vận hành bếp nhà hàng'
    ],
    process: ['Thiết kế inox', 'Sản xuất tại xưởng', 'Kiểm tra hoàn thiện', 'Lắp đặt công trường'],
    relatedProjectSlugs: ['long-wang', 'tian-long', 'g-master', 'khen-nuong-sapa']
  },
  {
    slug: 'xay-dung',
    index: '05',
    title: 'Xây dựng',
    description: 'Tổ chức cải tạo mặt bằng, dựng vách ngăn và hoàn thiện sàn, tường, trần theo bản vẽ đã duyệt.',
    meta: 'Cải tạo / Hoàn thiện',
    deliverables: [
      'Cải tạo mặt bằng nhà phố hoặc trung tâm thương mại',
      'Dựng vách ngăn',
      'Hoàn thiện sàn, tường, trần'
    ],
    process: ['Khảo sát hiện trạng', 'Lập tiến độ', 'Điều phối thầu phụ', 'Nghiệm thu hoàn thiện'],
    relatedProjectSlugs: ['bo-to-quan-moc', 'g-master']
  },
  {
    slug: 'bien-hieu',
    index: '06',
    title: 'Biển hiệu',
    description: 'Sản xuất chữ inox, biển hiệu UV và pano để đồng bộ nhận diện mặt tiền, không gian và điểm chạm thương hiệu.',
    meta: 'Chữ inox / UV / Pano',
    deliverables: [
      'Chữ inox',
      'Biển hiệu UV',
      'Pano và hạng mục nhận diện liên quan'
    ],
    process: ['Chốt nhận diện', 'Sản xuất tại xưởng', 'Kiểm tra hoàn thiện', 'Lắp đặt công trường'],
    relatedProjectSlugs: ['bo-to-quan-moc', 'long-wang', 'tian-long', 'khen-nuong-sapa']
  }
];

export const projects: ProjectEntry[] = [
  {
    slug: 'bo-to-quan-moc',
    title: 'Bò Tơ Quán Mộc',
    description: 'Bò tơ Ba Vì trong không gian hoài cổ Hà Nội thập niên 80, gần gũi và mộc mạc cho mô hình nhà phố và chuỗi F&B đông khách.',
    meta: 'BÒ TƠ BA VÌ / HOÀI CỔ HÀ NỘI',
    category: 'Bò Tơ Quán Mộc',
    location: 'Hà Nội',
    year: '2023',
    area: '1.260 m²',
    challenge: 'Thiết kế và thi công không gian nhà hàng mang màu sắc gần gũi, mộc mạc, phù hợp với mô hình nhà phố và chuỗi F&B đông khách.',
    solution: 'New Sky triển khai đồng bộ thiết kế, nội thất, cơ điện, inox bếp, xây dựng và biển hiệu để tạo trải nghiệm thương hiệu nhất quán.',
    outcome: 'Cùng Long Wang tạo nên tổ hợp Ngọc Khánh 1.260m², hoàn thành trong 16 ngày - một kỷ lục tiến độ của đội New Sky.',
    serviceSlugs: ['thiet-ke', 'noi-that', 'co-dien', 'inox-bep-cong-nghiep', 'xay-dung', 'bien-hieu']
  },
  {
    slug: 'long-wang',
    title: 'Long Wang',
    description: 'Lẩu hấp thủy nhiệt Hồng Kông và dim sum trong không gian cao cấp, đồng bộ trải nghiệm khách hàng, vận hành bếp và nhận diện thương hiệu.',
    meta: 'LẨU HẤP HỒNG KÔNG / DIM SUM',
    category: 'Long Wang',
    location: 'Toàn quốc',
    year: '2023-2025',
    area: 'Chuỗi F&B',
    challenge: 'Mô hình nhà hàng có yêu cầu cao về vận hành bếp, trải nghiệm khách hàng và nhận diện thương hiệu.',
    solution: 'New Sky triển khai không gian cao cấp, đồng bộ từ thiết kế, nội thất, cơ điện, inox bếp đến biển hiệu.',
    outcome: 'Thể hiện năng lực xử lý các mô hình nhà hàng phức tạp, cần kiểm soát đồng thời công năng bếp, hình ảnh thương hiệu và chất lượng hoàn thiện.',
    serviceSlugs: ['thiet-ke', 'noi-that', 'co-dien', 'inox-bep-cong-nghiep', 'xay-dung', 'bien-hieu']
  },
  {
    slug: 'tian-long',
    title: 'Tian Long',
    description: 'Lẩu bò tươi Triều Châu được chuẩn hóa thiết kế, nội thất, inox bếp, biển hiệu và thi công để triển khai đồng bộ nhiều cơ sở.',
    meta: 'LẨU BÒ TƯƠI TRIỀU CHÂU',
    category: 'Tian Long',
    location: 'Ba miền',
    year: '2024-2026',
    area: 'Chuỗi F&B',
    challenge: 'Mở rộng chuỗi nhanh nhưng vẫn cần giữ chất lượng, hình ảnh và phong cách nhất quán giữa các mặt bằng.',
    solution: 'New Sky chuẩn hóa thiết kế, nội thất, inox bếp, biển hiệu và thi công để triển khai đồng bộ nhiều cơ sở trên cả ba miền.',
    outcome: 'Phù hợp với bài toán mở rộng chuỗi F&B nhanh, cần một hệ thống thi công nhất quán và kiểm soát được chất lượng hoàn thiện.',
    serviceSlugs: ['thiet-ke', 'noi-that', 'co-dien', 'inox-bep-cong-nghiep', 'xay-dung', 'bien-hieu']
  },
  {
    slug: 'g-master',
    title: 'G.Master',
    description: 'Yakizakaya Nhật hiện đại, kết hợp nướng Nhật và izakaya trong môi trường trung tâm thương mại cao cấp.',
    meta: 'YAKIZAKAYA NHẬT HIỆN ĐẠI',
    category: 'G.Master',
    location: 'TP. Hồ Chí Minh',
    year: '2026',
    area: 'Trung tâm thương mại',
    challenge: 'Mô hình nướng Nhật trong trung tâm thương mại yêu cầu xử lý kỹ hệ thống bếp than hoa, hút khói, thông gió và nghiệm thu kỹ thuật.',
    solution: 'New Sky thiết kế phong cách Nhật, thi công cơ điện, bếp than hoa, hệ thống hút khói và thông gió cho mô hình nướng trong trung tâm thương mại.',
    outcome: 'Dự án G.Master Vincom Landmark 81 cho thấy năng lực thi công trong môi trường cao cấp, nhiều quy chuẩn nghiệm thu và kiểm soát kỹ thuật khắt khe.',
    serviceSlugs: ['thiet-ke', 'noi-that', 'co-dien', 'inox-bep-cong-nghiep', 'xay-dung', 'bien-hieu']
  },
  {
    slug: 'com-nieu-hai-su',
    title: 'Cơm Niêu Hải Sư',
    description: 'Cơm niêu Singapore trong không gian ẩm thực hiện đại, sạch sẽ, tối ưu trải nghiệm phục vụ nhanh và vận hành bếp ổn định.',
    meta: 'CƠM NIÊU SINGAPORE',
    category: 'Cơm Niêu Hải Sư',
    location: 'Hà Nội',
    year: '2025',
    area: 'Chuỗi F&B',
    challenge: 'Không gian cần giữ cảm giác hiện đại, sạch sẽ, đồng thời phục vụ nhanh và vận hành bếp ổn định trong giờ cao điểm.',
    solution: 'New Sky thiết kế và thi công không gian ẩm thực hiện đại, tối ưu trải nghiệm phục vụ nhanh và tổ chức khu bếp phù hợp vận hành.',
    outcome: 'Là một trong các thương hiệu thuộc hệ thống Aladdin, góp phần thể hiện khả năng New Sky triển khai đa dạng concept F&B trong cùng một hệ sinh thái.',
    serviceSlugs: ['thiet-ke', 'noi-that', 'co-dien', 'inox-bep-cong-nghiep', 'xay-dung', 'bien-hieu']
  },
  {
    slug: 'khen-nuong-sapa',
    title: 'Khèn Nướng Sapa',
    description: 'Nướng than hoa mang bản sắc Tây Bắc, kết hợp nội thất, mặt tiền và khu vực bếp nướng cho mô hình nhà hàng trải nghiệm.',
    meta: 'NƯỚNG THAN HOA / TÂY BẮC',
    category: 'Khèn Nướng Sapa',
    location: 'Hà Nội',
    year: '2025',
    area: 'Nhà hàng trải nghiệm',
    challenge: 'Không gian cần chuyển hóa câu chuyện bản địa Tây Bắc thành trải nghiệm thực tế, khác biệt với các mô hình lẩu, nướng Nhật hay cơm niêu.',
    solution: 'New Sky tạo dựng không gian mang bản sắc vùng miền, kết hợp nội thất, mặt tiền và khu vực bếp nướng phù hợp với mô hình nhà hàng trải nghiệm.',
    outcome: 'Cho thấy khả năng chuyển hóa câu chuyện thương hiệu thành không gian thực tế có bản sắc riêng trong hệ sinh thái F&B đa concept.',
    serviceSlugs: ['thiet-ke', 'noi-that', 'co-dien', 'inox-bep-cong-nghiep', 'xay-dung', 'bien-hieu']
  }
];

export const posts: PostEntry[] = [
  {
    slug: 'prepare-restaurant-site-brief',
    title: 'How to prepare a restaurant site brief',
    description: 'Prepared card pattern for SEO-driven editorial listing pages.',
    meta: 'Knowledge / Fit-out',
    intro: 'A usable site brief should capture concept, area, operating model, target opening date and key constraints before any execution planning starts.',
    takeaways: [
      'Clarify operational model before drawing decisions',
      'Record landlord constraints early',
      'Define budget range and opening target in the same document'
    ],
    relatedServiceSlugs: ['thiet-ke', 'noi-that', 'co-dien']
  },
  {
    slug: 'coordination-risks-before-handover',
    title: 'Common coordination risks before handover',
    description: 'Supports article categories, excerpts and cover imagery later.',
    meta: 'Technical / MEP',
    intro: 'Most late-stage project friction comes from unresolved coordination between finishes, equipment and service routes.',
    takeaways: [
      'Resolve equipment points before ceiling closure',
      'Track MEP clashes with a single owner',
      'Run pre-handover walk-throughs by zone'
    ],
    relatedServiceSlugs: ['co-dien', 'xay-dung']
  },
  {
    slug: 'plan-service-circulation-early',
    title: 'Planning service circulation early',
    description: 'Uses the same visual language as service and project listings.',
    meta: 'Operations / Design',
    intro: 'Early circulation planning prevents avoidable friction between guests, staff, pickup zones and service points.',
    takeaways: [
      'Separate staff and guest choke points',
      'Place support storage near service demand',
      'Use layout to reduce repeated movement'
    ],
    relatedServiceSlugs: ['thiet-ke', 'noi-that']
  }
];

export const jobs: JobEntry[] = [
  {
    slug: 'site-supervisor',
    title: 'Site supervisor',
    description: 'Prepared for job cards with department, level and application CTA.',
    meta: 'Site Execution / Full-time',
    location: 'Ho Chi Minh City',
    jobType: 'Full-time',
    responsibilities: [
      'Coordinate on-site trades and schedule priorities',
      'Report progress, risks and quality status',
      'Work with project leads on site readiness and handover'
    ],
    requirements: [
      'Experience in fit-out or interior execution',
      'Comfortable with drawings and site coordination',
      'Able to manage subcontractor communication'
    ],
    benefits: ['Structured project environment', 'Clear reporting line', 'Exposure to F&B fit-out projects']
  },
  {
    slug: 'project-architect',
    title: 'Project architect',
    description: 'Supports responsibilities, requirements and benefits on detail pages later.',
    meta: 'Design Coordination / Full-time',
    location: 'Ho Chi Minh City',
    jobType: 'Full-time',
    responsibilities: [
      'Translate concept intent into execution-ready packages',
      'Coordinate with site and MEP stakeholders',
      'Support material decisions and design clarifications'
    ],
    requirements: [
      'Architectural documentation experience',
      'Ability to coordinate across disciplines',
      'Good control of detail packages'
    ],
    benefits: ['Cross-functional collaboration', 'Fast decision loops', 'Portfolio-building project exposure']
  },
  {
    slug: 'marketing-coordinator',
    title: 'Marketing coordinator',
    description: 'Matches the rest of the brand rather than default job board styling.',
    meta: 'Business Support / Full-time',
    location: 'Ho Chi Minh City',
    jobType: 'Full-time',
    responsibilities: [
      'Coordinate case-study and editorial production',
      'Manage website publishing workflow with CMS',
      'Support lead funnel reporting with the business team'
    ],
    requirements: [
      'Strong writing and content operations skills',
      'Comfortable with CMS workflows',
      'Able to work across design and execution teams'
    ],
    benefits: ['Content ownership', 'Hands-on CMS workflow', 'Close access to real project material']
  }
];

export function getService(slug: string) {
  return services.find((entry) => entry.slug === slug);
}

export function getProject(slug: string) {
  return projects.find((entry) => entry.slug === slug);
}

export function getPost(slug: string) {
  return posts.find((entry) => entry.slug === slug);
}

export function getJob(slug: string) {
  return jobs.find((entry) => entry.slug === slug);
}
