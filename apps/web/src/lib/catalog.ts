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
    slug: 'restaurant-fit-out',
    index: '01',
    title: 'Restaurant fit-out',
    description: 'Full execution package for front-of-house, kitchen and back-of-house coordination.',
    meta: 'Execution / Core Service',
    deliverables: [
      'Site survey and execution scope definition',
      'Construction coordination across architecture and MEP',
      'Material control, progress reporting and handover package'
    ],
    process: ['Brief intake', 'Survey and execution planning', 'Build supervision', 'Operational handover'],
    relatedProjectSlugs: ['mall-restaurant-rollout', 'signature-dining-space']
  },
  {
    slug: 'renovation-upgrade',
    index: '02',
    title: 'Renovation and upgrade',
    description: 'Phased renovation work for operating stores that need tighter schedule control.',
    meta: 'Upgrade / Phased Delivery',
    deliverables: [
      'Existing site assessment and risk mapping',
      'Phasing plan to reduce business interruption',
      'Execution sequencing for live-operation constraints'
    ],
    process: ['Condition audit', 'Phasing proposal', 'Night-shift execution', 'Reopening support'],
    relatedProjectSlugs: ['cafe-upgrade-package']
  },
  {
    slug: 'mep-coordination',
    index: '03',
    title: 'MEP coordination',
    description: 'Technical alignment across structure, HVAC, plumbing, lighting and equipment positions.',
    meta: 'Technical / Coordination',
    deliverables: [
      'Constraint review with structure and landlord requirements',
      'Layout coordination between kitchen, bar and utility runs',
      'Clash reduction before site execution'
    ],
    process: ['Technical review', 'Coordination workshop', 'Revised shop drawings', 'Site monitoring'],
    relatedProjectSlugs: ['mall-restaurant-rollout', 'cafe-upgrade-package']
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
