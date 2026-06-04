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
    slug: 'thiet-ke-noi-that',
    index: '01',
    title: 'Thiết kế nội thất',
    description: 'Triển khai bản vẽ kiến trúc + nội thất từ ý tưởng ban đầu đến chi tiết thi công, phù hợp định vị thương hiệu chủ nhà hàng.',
    meta: 'Năng lực cốt lõi',
    deliverables: [
      'Ý tưởng thiết kế ban đầu',
      'Bản vẽ kiến trúc + nội thất',
      'Chi tiết thi công theo định vị thương hiệu'
    ],
    process: ['Khảo sát', 'Thiết kế', 'Duyệt bản vẽ', 'Bàn giao hồ sơ thi công'],
    relatedProjectSlugs: ['ngoc-khanh-complex', 'tian-long-chain']
  },
  {
    slug: 'co-dien',
    index: '02',
    title: 'Cơ điện',
    description: 'Hệ thống điện, nước cấp, nước thải, thông gió, hút khói và phối hợp tiêu chuẩn PCCC cho nhà hàng.',
    meta: 'MEP / Nhà hàng',
    deliverables: [
      'Hệ thống điện và cấp thoát nước',
      'Thông gió, hút khói và PCCC',
      'Phối hợp tiêu chuẩn BQL tòa nhà khi thi công trong TTTM'
    ],
    process: ['Khảo sát hạ tầng', 'Bản vẽ kỹ thuật', 'Thi công công trường', 'Chạy thử'],
    relatedProjectSlugs: ['gmaster-landmark-81']
  },
  {
    slug: 'inox-bep-cong-nghiep',
    index: '03',
    title: 'Inox bếp công nghiệp',
    description: 'Bàn Inox, giá kệ, tủ bếp, bồn rửa và hệ thống thiết bị bếp được sản xuất trực tiếp tại xưởng Inox 3.000m2 nội bộ.',
    meta: 'Xưởng Inox 3.000m2',
    deliverables: [
      'Bàn Inox, giá kệ, tủ bếp, bồn rửa',
      'Sản xuất tại xưởng Hà Đông',
      'Kiểm soát từ cắt CNC, chấn, hàn đến lắp đặt'
    ],
    process: ['Thiết kế Inox', 'Sản xuất tại xưởng', 'Đóng gói', 'Lắp đặt công trường'],
    relatedProjectSlugs: ['ngoc-khanh-complex', 'tian-long-chain']
  },
  {
    slug: 'xay-dung',
    index: '04',
    title: 'Xây dựng',
    description: 'Cải tạo mặt bằng nhà phố, dựng vách ngăn và hoàn thiện sàn - tường - trần theo bản vẽ thiết kế.',
    meta: 'Cải tạo / Hoàn thiện',
    deliverables: [
      'Cải tạo mặt bằng nhà phố hoặc trung tâm thương mại',
      'Dựng vách ngăn',
      'Hoàn thiện sàn, tường, trần'
    ],
    process: ['Khảo sát hiện trạng', 'Lập tiến độ', 'Thi công cải tạo', 'Nghiệm thu hoàn thiện'],
    relatedProjectSlugs: ['ngoc-khanh-complex']
  },
  {
    slug: 'lap-dat-ban-giao-van-hanh',
    index: '05',
    title: 'Lắp đặt + bàn giao vận hành',
    description: 'Lắp đặt thiết bị, chạy thử, nghiệm thu, bàn giao hồ sơ kỹ thuật và hỗ trợ vận hành 30 ngày đầu sau khai trương.',
    meta: 'Handover / Operation',
    deliverables: [
      'Lắp đặt thiết bị và chạy thử',
      'Nghiệm thu và bàn giao hồ sơ kỹ thuật',
      'Hỗ trợ vận hành 30 ngày đầu sau khai trương'
    ],
    process: ['Lắp đặt', 'Chạy thử', 'Nghiệm thu', 'Hỗ trợ vận hành'],
    relatedProjectSlugs: ['ngoc-khanh-complex', 'gmaster-landmark-81', 'tian-long-chain']
  }
];

export const projects: ProjectEntry[] = [
  {
    slug: 'mall-restaurant-rollout',
    title: 'Chuỗi nhà hàng trung tâm thương mại',
    description: 'Bố cục thẻ thông tin hiển thị cái nhìn tổng quan, phạm vi bàn giao và loại hình dự án.',
    meta: 'THI CÔNG / 420 M2 / HCMC',
    category: 'Fast Casual Fit-out',
    location: 'TP. Hồ Chí Minh',
    year: '2025',
    area: '420 m2',
    challenge: 'Thời gian bàn giao mặt bằng ngắn và xung đột kỹ thuật MEP về thông gió nhà bếp và hệ thống thoát nước.',
    solution: 'Điều chỉnh lại thiết kế MEP từ sớm và chia quá trình thi công thành các giai đoạn kiểm soát chặt chẽ.',
    outcome: 'Cửa hàng khai trương đúng tiến độ với lối đi kỹ thuật rõ ràng và ít sửa chữa ở giai đoạn cuối.',
    serviceSlugs: ['restaurant-fit-out', 'mep-coordination']
  },
  {
    slug: 'cafe-upgrade-package',
    title: 'Gói cải tạo quán Cafe',
    description: 'Chuẩn bị sẵn cho các bộ lọc, thẻ tag và hiển thị danh sách theo danh mục mà không cần tuỳ chỉnh giao diện.',
    meta: 'CẢI TẠO / 180 M2 / ĐÀ NẴNG',
    category: 'Cafe Renovation',
    location: 'Đà Nẵng',
    year: '2025',
    area: '180 m2',
    challenge: 'Cửa hàng cần cải tạo nhưng vẫn phải duy trì hoạt động phục vụ và lối ra vào của khách.',
    solution: 'Áp dụng các khung giờ thi công ngắt quãng và thiết kế lại luồng di chuyển quanh khu vực quầy bar.',
    outcome: 'Cửa hàng cải tạo giúp cải thiện năng suất phục vụ giờ cao điểm và giảm thiểu va chạm giữa nhân viên.',
    serviceSlugs: ['renovation-upgrade', 'mep-coordination']
  },
  {
    slug: 'signature-dining-space',
    title: 'Không gian ăn uống Signature',
    description: 'Hỗ trợ hiển thị meta data tương lai như hình ảnh, năm, ngân sách và các dịch vụ liên quan từ Strapi.',
    meta: 'FLAGSHIP / 560 M2 / HN',
    category: 'Flagship Dining',
    location: 'Hà Nội',
    year: '2025',
    area: '560 m2',
    challenge: 'Khách hàng cần một khu vực đón khách ấn tượng hơn mà không làm giảm năng suất hiện tại.',
    solution: 'Cân đối lại lối vào, khu vực chờ và ăn uống trong khi vẫn đảm bảo hoàn thiện kiến trúc hài hoà với các dịch vụ.',
    outcome: 'Bố cục cuối cùng giúp nâng cao ấn tượng của thực khách và duy trì hiệu quả vận hành xuyên suốt các ca.',
    serviceSlugs: ['restaurant-fit-out']
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
    relatedServiceSlugs: ['restaurant-fit-out']
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
    relatedServiceSlugs: ['mep-coordination', 'restaurant-fit-out']
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
    relatedServiceSlugs: ['renovation-upgrade']
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
