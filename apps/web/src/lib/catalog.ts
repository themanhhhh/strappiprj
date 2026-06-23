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
    relatedProjectSlugs: ['ngoc-khanh-complex', 'tian-long-chain']
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
    relatedProjectSlugs: ['ngoc-khanh-complex', 'tian-long-chain']
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
    relatedProjectSlugs: ['gmaster-landmark-81']
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
    relatedProjectSlugs: ['ngoc-khanh-complex', 'tian-long-chain']
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
    relatedProjectSlugs: ['ngoc-khanh-complex']
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
    relatedProjectSlugs: ['ngoc-khanh-complex', 'tian-long-chain']
  }
];

export const projects: ProjectEntry[] = [
  {
    slug: 'mall-restaurant-rollout',
    title: 'Chuỗi nhà hàng trung tâm thương mại',
    description: 'Bố cục thẻ thông tin hiển thị cái nhìn tổng quan, phạm vi bàn giao và loại hình dự án.',
    meta: 'THI CÔNG / 420 M² / HCMC',
    category: 'Fast Casual Fit-out',
    location: 'TP. Hồ Chí Minh',
    year: '2025',
    area: '420 m²',
    challenge: 'Thời gian bàn giao mặt bằng ngắn và xung đột kỹ thuật MEP về thông gió nhà bếp và hệ thống thoát nước.',
    solution: 'Điều chỉnh lại thiết kế MEP từ sớm và chia quá trình thi công thành các giai đoạn kiểm soát chặt chẽ.',
    outcome: 'Cửa hàng khai trương đúng tiến độ với lối đi kỹ thuật rõ ràng và ít sửa chữa ở giai đoạn cuối.',
    serviceSlugs: ['thiet-ke', 'noi-that', 'co-dien', 'inox-bep-cong-nghiep', 'xay-dung', 'bien-hieu']
  },
  {
    slug: 'cafe-upgrade-package',
    title: 'Gói cải tạo quán Cafe',
    description: 'Chuẩn bị sẵn cho các bộ lọc, thẻ tag và hiển thị danh sách theo danh mục mà không cần tuỳ chỉnh giao diện.',
    meta: 'CẢI TẠO / 180 M² / ĐÀ NẴNG',
    category: 'Cafe Renovation',
    location: 'Đà Nẵng',
    year: '2025',
    area: '180 m²',
    challenge: 'Cửa hàng cần cải tạo nhưng vẫn phải duy trì hoạt động phục vụ và lối ra vào của khách.',
    solution: 'Áp dụng các khung giờ thi công ngắt quãng và thiết kế lại luồng di chuyển quanh khu vực quầy bar.',
    outcome: 'Cửa hàng cải tạo giúp cải thiện năng suất phục vụ giờ cao điểm và giảm thiểu va chạm giữa nhân viên.',
    serviceSlugs: ['thiet-ke', 'noi-that', 'co-dien', 'xay-dung']
  },
  {
    slug: 'signature-dining-space',
    title: 'Không gian ăn uống Signature',
    description: 'Hỗ trợ hiển thị meta data tương lai như hình ảnh, năm, ngân sách và các dịch vụ liên quan từ Strapi.',
    meta: 'FLAGSHIP / 560 M² / HN',
    category: 'Flagship Dining',
    location: 'Hà Nội',
    year: '2025',
    area: '560 m²',
    challenge: 'Khách hàng cần một khu vực đón khách ấn tượng hơn mà không làm giảm năng suất hiện tại.',
    solution: 'Cân đối lại lối vào, khu vực chờ và ăn uống trong khi vẫn đảm bảo hoàn thiện kiến trúc hài hoà với các dịch vụ.',
    outcome: 'Bố cục cuối cùng giúp nâng cao ấn tượng của thực khách và duy trì hiệu quả vận hành xuyên suốt các ca.',
    serviceSlugs: ['thiet-ke', 'noi-that', 'bien-hieu']
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
