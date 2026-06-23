import type {Locale} from '@/i18n/routing';

type NavItem = {
  key: string;
  href: string;
};

type Office = {
  label: string;
  address: string;
  phone: string;
  email: string;
};

type MegaMenuColumn = {
  title: string;
  links: Array<{label: string; href: string; meta?: string}>;
};

type MegaMenuEntry = {
  key: string;
  eyebrow: string;
  title: string;
  description: string;
  columns: MegaMenuColumn[];
  featured: {
    title: string;
    description: string;
    href: string;
  };
};

type HeroSlide = {
  eyebrow: string;
  title: string;
  description: string;
  imageLabel: string;
  imageUrl?: string;
  stats: Array<{value: string; label: string}>;
};

type BrandItem = {
  name: string;
  tag: string;
  description: string;
};

type StoryItem = {
  title: string;
  description: string;
};

type NewsItem = {
  category: string;
  title: string;
  description: string;
};

type CareersBlock = {
  title: string;
  description: string;
  highlights: string[];
};

type HomepageContent = {
  heroSlides: HeroSlide[];
  brandSectionTitle: string;
  brandSectionLead: string;
  brands: BrandItem[];
  socialTitle: string;
  socialLead: string;
  socialStories: StoryItem[];
  careersTitle: string;
  careersLead: string;
  careers: CareersBlock;
  newsTitle: string;
  newsLead: string;
  featuredNews: NewsItem[];
  ctaLabel: string;
  ctaTitle: string;
  ctaDescription: string;
  ctaPrimary: string;
  ctaSecondary: string;
};

export const siteConfig: {
  name: string;
  description: string;
  locales: Locale[];
  navigation: NavItem[];
  socialLinks: Array<{label: string; href: string}>;
  utilityLinks: Array<{label: string; href: string}>;
  offices: Office[];
  megaMenu: Record<string, MegaMenuEntry>;
} = {
  name: 'New Sky',
  description:
    'Đối tác thiết kế và thi công nhà hàng F&B cho chủ nhà hàng Việt - 10 năm cùng hệ thống Aladdin, xưởng tự sản xuất nội thất, inox bếp và biển hiệu.',
  locales: ['vi', 'en'],
  navigation: [
    {key: 'about', href: '/about'},
    {key: 'services', href: '/services'},
    {key: 'projects', href: '/projects'},
    {key: 'journal', href: '/journal'},
    {key: 'careers', href: '/careers'},
    {key: 'contact', href: '/contact'}
  ],
  socialLinks: [],
  utilityLinks: [],
  offices: [
    {
      label: 'VĂN PHÒNG MIỀN BẮC',
      address: 'BT C01-L10 An Vượng, Khu đô thị Dương Nội, Phường Dương Nội, Thành phố Hà Nội',
      phone: '0906 790 333',
      email: 'syluu.newsky@gmail.com'
    },
    {
      label: 'VĂN PHÒNG MIỀN NAM',
      address: '31-33 Nguyễn Thị Thập, Khu đô thị Him Lam, Quận 7, TP. Hồ Chí Minh',
      phone: '0906 790 333',
      email: 'syluu.newsky@gmail.com'
    }
  ],
  megaMenu: {
    about: {
      key: 'about',
      eyebrow: 'New Sky Profile',
      title: 'Tổng thầu chuyên nhà hàng F&B',
      description: 'Câu chuyện New Sky, mô hình một đầu mối và năng lực xưởng tự sản xuất nội thất, inox bếp, biển hiệu.',
      columns: [
        {
          title: 'Về New Sky',
          links: [
            {label: 'Tổng quan', href: '/about', meta: 'Đối tác thiết kế - thi công F&B'},
            {label: 'Giám đốc Lưu Sỹ', href: '/tac-gia/luu-sy', meta: 'Tác giả chuyên môn'},
            {label: 'Mô hình triển khai', href: '/about', meta: 'Một đầu mối trách nhiệm'}
          ]
        },
        {
          title: 'Năng lực',
          links: [
            {label: 'Xưởng Hà Đông', href: '/xuong-inox-bep-cong-nghiep-ha-dong', meta: '3.000m²'},
            {label: '6 năng lực', href: '/services', meta: 'Thiết kế đến biển hiệu'},
            {label: 'FAQ', href: '/faq', meta: 'Câu hỏi thường gặp'}
          ]
        }
      ],
      featured: {
        title: '10 năm cùng hệ thống Aladdin',
        description: 'Bằng chứng kinh nghiệm từ hơn 100 dự án nhà hàng và 6 thương hiệu thuộc hệ thống Aladdin.',
        href: '/about'
      }
    },
    services: {
      key: 'services',
      eyebrow: 'Dịch vụ New Sky',
      title: '4 hub dịch vụ cho nhà hàng F&B',
      description: 'Thiết kế thi công trọn gói, bếp công nghiệp inox, biển hiệu F&B và nội thất F&B.',
      columns: [
        {
          title: 'Hub chính',
          links: [
            {label: 'Thiết kế thi công trọn gói', href: '/dich-vu/thiet-ke-thi-cong-nha-hang-tron-goi', meta: 'Một đầu mối'},
            {label: 'Bếp công nghiệp inox', href: '/dich-vu/bep-cong-nghiep-inox', meta: 'Sản xuất tại xưởng'}
          ]
        },
        {
          title: 'Sản xuất',
          links: [
            {label: 'Biển hiệu F&B', href: '/dich-vu/bien-hieu-fnb', meta: 'Chữ inox, UV, pano'},
            {label: 'Nội thất F&B', href: '/dich-vu/noi-that-fnb', meta: 'Đồng bộ thiết kế'}
          ]
        }
      ],
      featured: {
        title: '6 năng lực tổng thầu',
        description: 'Thiết kế, nội thất, cơ điện, inox bếp, xây dựng và biển hiệu cho nhà hàng F&B.',
        href: '/dich-vu'
      }
    },
    projects: {
      key: 'projects',
      eyebrow: 'Dự án',
      title: 'Bằng chứng triển khai nhà hàng F&B',
      description: 'Các case study tiêu biểu, năng lực rollout chuỗi và điểm neo từ hệ thống Aladdin.',
      columns: [
        {
          title: 'Nhóm dự án',
          links: [
            {label: 'Dự án nhà hàng', href: '/projects', meta: 'Thiết kế - thi công'},
            {label: 'Chuỗi F&B', href: '/projects', meta: 'Mở rộng hệ thống'},
            {label: 'Hạng mục sản xuất', href: '/projects', meta: 'Inox, nội thất, biển hiệu'}
          ]
        },
        {
          title: 'Điểm neo',
          links: [
            {label: 'Ngọc Khánh 16 ngày', href: '/projects/ngoc-khanh-complex', meta: '1.260m²'},
            {label: 'Chuỗi Aladdin', href: '/projects/tian-long-chain', meta: '6 thương hiệu'}
          ]
        }
      ],
      featured: {
        title: 'Ngọc Khánh 16 ngày',
        description: 'Case study tiêu biểu cho năng lực điều phối đồng bộ trong tiến độ ngắn.',
        href: '/projects'
      }
    },
    journal: {
      key: 'journal',
      eyebrow: 'Blog',
      title: 'Kiến thức setup và thi công nhà hàng',
      description: 'Nội dung chuyên môn cho chủ nhà hàng F&B trước khi khảo sát, thiết kế và thi công.',
      columns: [
        {
          title: 'Chủ đề',
          links: [
            {label: 'Thiết kế thi công', href: '/journal', meta: 'Quy trình triển khai'},
            {label: 'Bếp công nghiệp', href: '/journal', meta: 'Inox và vận hành'}
          ]
        },
        {
          title: 'Gợi ý đọc',
          links: [
            {label: 'Chuẩn bị brief mặt bằng', href: '/journal'},
            {label: 'Rủi ro phối hợp trước bàn giao', href: '/journal'}
          ]
        }
      ],
      featured: {
        title: 'FAQ cho chủ nhà hàng',
        description: 'Những câu hỏi thường gặp về phạm vi dịch vụ, xưởng và quy trình trao đổi dự án.',
        href: '/journal'
      }
    },
    careers: {
      key: 'careers',
      eyebrow: 'Tuyển dụng',
      title: 'Đội ngũ triển khai New Sky',
      description: 'Các vị trí phục vụ thiết kế, giám sát, thi công trực tiếp và vận hành xưởng.',
      columns: [
        {
          title: 'Đội nhóm',
          links: [
            {label: 'Thi công công trường', href: '/careers', meta: 'Giám sát và lắp đặt'},
            {label: 'Thiết kế', href: '/careers', meta: 'Mặt bằng và kỹ thuật'},
            {label: 'Xưởng sản xuất', href: '/careers', meta: 'Nội thất, inox, biển hiệu'}
          ]
        },
        {
          title: 'Vị trí',
          links: [
            {label: 'Site supervisor', href: '/careers/site-supervisor'},
            {label: 'Project architect', href: '/careers/project-architect'},
            {label: 'Marketing coordinator', href: '/careers/marketing-coordinator'}
          ]
        }
      ],
      featured: {
        title: 'Làm việc cùng đội tổng thầu F&B',
        description: 'Cùng triển khai các dự án nhà hàng có yêu cầu cao về tiến độ và chất lượng.',
        href: '/careers'
      }
    },
    contact: {
      key: 'contact',
      eyebrow: 'Liên hệ',
      title: 'Trao đổi dự án với New Sky',
      description: 'Gửi nhu cầu dự án, gọi hotline hoặc xem thông tin văn phòng đại diện.',
      columns: [
        {
          title: 'Kênh liên hệ',
          links: [
            {label: 'Gửi yêu cầu tư vấn', href: '/contact', meta: 'Form dự án'},
            {label: 'Gọi hotline', href: '/contact', meta: '0906 790 333'},
            {label: 'Văn phòng đại diện', href: '/contact', meta: 'Miền Bắc và miền Nam'}
          ]
        }
      ],
      featured: {
        title: 'Hotline 0906 790 333',
        description: 'Kênh tạm thay Zalo OA cho đến khi có link chính thức.',
        href: '/contact'
      }
    }
  }
};

export const homepageContent: Record<Locale, HomepageContent> = {
  vi: {
    heroSlides: [
      {
        eyebrow: 'New Sky Capability Profile',
        title: 'Đối tác thiết kế và thi công nhà hàng F&B cho chủ nhà hàng Việt.',
        description:
          '10 năm cùng hệ thống Aladdin, hơn 100 dự án nhà hàng và xưởng tự sản xuất nội thất, inox bếp, biển hiệu tại Hà Đông.',
        imageLabel: 'Retail center rollout',
        imageUrl: 'https://images.unsplash.com/photo-1552566626-52f8b828add9?q=80&w=2070&auto=format&fit=crop',
        stats: [
          {value: '10 năm', label: 'Kinh nghiệm thực chiến'},
          {value: 'Hơn 100', label: 'Dự án nhà hàng'},
          {value: '3.000m²', label: 'Xưởng tự sản xuất'}
        ]
      },
      {
        eyebrow: '3 điểm neo năng lực',
        title: 'Cạnh tranh bằng tiến độ, chất lượng và niềm tin có bằng chứng cụ thể.',
        description:
          'New Sky chứng minh năng lực bằng dự án 84 Ngọc Khánh thi công 16 ngày, hơn 100 dự án nhà hàng trong 10 năm và quan hệ đồng hành cùng 6 thương hiệu thuộc hệ thống Aladdin.',
        imageLabel: 'Chain rollout system',
        imageUrl: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?q=80&w=2070&auto=format&fit=crop',
        stats: [
          {value: '16 ngày', label: 'Kỷ lục Ngọc Khánh'},
          {value: 'Hơn 100', label: 'Dự án trong 10 năm'},
          {value: '6', label: 'Thương hiệu Aladdin'}
        ]
      },
      {
        eyebrow: 'Một đầu mối',
        title: 'Thiết kế, nội thất, cơ điện, inox bếp, xây dựng và biển hiệu trong một hệ thống.',
        description:
          'Cách làm tổng thầu chuyên nhà hàng giúp chủ đầu tư giảm phối hợp nhiều đầu mối, kiểm soát chất lượng tốt hơn và chủ động tiến độ khai trương.',
        imageLabel: 'Flagship execution',
        imageUrl: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=2070&auto=format&fit=crop',
        stats: [
          {value: '6', label: 'Năng lực cốt lõi'},
          {value: '3', label: 'Bước lắp đặt, bàn giao, bảo trì'},
          {value: '1', label: 'Đầu mối tổng thầu'}
        ]
      }
    ],
    brandSectionTitle: 'Khách hàng tiêu biểu',
    brandSectionLead:
      'New Sky đồng hành thi công cho các thương hiệu F&B thuộc hệ thống chuỗi nhà hàng của Aladdin.,JSC và nhiều dự án chuỗi quy mô lớn.',
    brands: [
      {
        name: 'Long Wang',
        tag: 'Hong Kong Hotpot',
        description: 'Một trong các thương hiệu F&B New Sky đồng hành thi công trong quá trình mở rộng hệ thống.'
      },
      {
        name: 'Tian Long',
        tag: 'Teochew Beef Hotpot',
        description: 'Chuỗi lẩu bò tươi Triều Châu với yêu cầu đồng bộ chất lượng khi mở rộng nhiều cơ sở.'
      },
      {
        name: 'Bò Tơ Quán Mộc',
        tag: 'Traditional Dining',
        description: 'Thương hiệu nhà hàng phong cách hoài cổ Hà Nội, nổi bật trong case Ngọc Khánh 16 ngày.'
      },
      {
        name: 'G.Master',
        tag: 'F&B Brand',
        description: 'Một trong 6 thương hiệu thuộc hệ thống Aladdin mà New Sky có kinh nghiệm đồng hành triển khai.'
      },
      {
        name: 'Cơm Niêu Hải Sư',
        tag: 'Vietnamese Dining',
        description: 'Thương hiệu nhà hàng Việt trong hệ thống Aladdin, thuộc nhóm kinh nghiệm dự án F&B của New Sky.'
      },
      {
        name: 'Khèn Nướng Sapa',
        tag: 'Vietnamese Dining',
        description: 'Thương hiệu nhà hàng Việt trong hệ thống Aladdin, bổ sung bằng chứng triển khai đa định dạng F&B.'
      }
    ],
    socialTitle: 'Minh chứng của New Sky',
    socialLead:
      'Tiến độ, chất lượng và niềm tin đều được neo bằng bằng chứng dự án thực tế.',
    socialStories: [
      {
        title: 'Tiến độ có bằng chứng',
        description: 'Tổ hợp Bò Tơ Quán Mộc + Long Wang tại 84 Ngọc Khánh được triển khai từ nhận mặt bằng đến khai trương trong 16 ngày.'
      },
      {
        title: 'Chất lượng đồng bộ',
        description: 'Hơn 100 dự án nhà hàng trong 10 năm với hệ thống kiểm soát từ thiết kế, vật tư, sản xuất, lắp đặt đến nghiệm thu.'
      }
    ],
    careersTitle: 'Đội ngũ triển khai',
    careersLead:
      'New Sky vận hành bằng các đội chuyên trách: thiết kế, giám sát thi công, đội thi công trực tiếp, hành chính, kế toán và xưởng tự sản xuất.',
    careers: {
      title: 'Một đội ngũ phục vụ đồng thời nhiều dự án trên 3 miền',
      description:
        'Các bộ phận phối hợp theo quy trình rõ ràng để giữ tiến độ, chất lượng và trách nhiệm xuyên suốt dự án.',
      highlights: ['Đội thiết kế', 'Đội giám sát thi công', 'Xưởng tự sản xuất 3.000m²']
    },
    newsTitle: 'Dự án và năng lực',
    newsLead:
      'Cập nhật các dự án tiêu biểu, năng lực xưởng tự sản xuất và kinh nghiệm triển khai chuỗi nhà hàng.',
    featuredNews: [
      {
        category: 'Case study',
        title: 'Tổ hợp Ngọc Khánh 1.260m² hoàn thành trong 16 ngày',
        description: 'Bằng chứng tiêu biểu cho năng lực điều phối đồng bộ nhiều hạng mục trong tiến độ rất ngắn.'
      },
      {
        category: 'Xưởng tự sản xuất',
        title: 'Xưởng tự sản xuất 3.000m² tại Hà Đông',
        description: 'Năng lực sản xuất nội bộ cho nội thất, inox bếp và biển hiệu giúp New Sky chủ động hơn ở các hạng mục tự làm.'
      },
      {
        category: 'Chuỗi F&B',
        title: 'Đồng hành cùng 6 thương hiệu thuộc hệ thống Aladdin',
        description: 'Bò Tơ Quán Mộc, Tian Long, Long Wang, G.Master, Cơm Niêu Hải Sư và Khèn Nướng Sapa là các điểm neo niềm tin của New Sky.'
      }
    ],
    ctaLabel: 'Liên hệ',
    ctaTitle: 'Sẵn sàng trao đổi về dự án nhà hàng của bạn.',
    ctaDescription:
      'Chia sẻ mặt bằng, concept, ngân sách dự kiến và timeline để New Sky tư vấn phương án thiết kế + thi công phù hợp.',
    ctaPrimary: 'Đặt lịch tư vấn',
    ctaSecondary: 'Xem dự án'
  },
  en: {
    heroSlides: [
      {
        eyebrow: 'New Sky Capability Profile',
        title: 'Design and construction partner for F&B restaurants in Vietnam.',
        description:
          '10 years with the Aladdin system, more than 100 restaurant projects, and in-house production for interiors, kitchen stainless steel, and signage.',
        imageLabel: 'Retail center rollout',
        imageUrl: 'https://images.unsplash.com/photo-1552566626-52f8b828add9?q=80&w=2070&auto=format&fit=crop',
        stats: [
          {value: '10 years', label: 'Practical experience'},
          {value: '100+', label: 'Restaurant projects'},
          {value: '3,000sqm', label: 'In-house workshop'}
        ]
      },
      {
        eyebrow: '3 proof points',
        title: 'Competing through programme, quality, and trust backed by proof.',
        description:
          'New Sky proves capability through the 16-day Ngoc Khanh project, more than 100 restaurant projects over 10 years, and delivery experience with 6 brands in the Aladdin system.',
        imageLabel: 'Chain rollout system',
        imageUrl: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?q=80&w=2070&auto=format&fit=crop',
        stats: [
          {value: '16 days', label: 'Ngoc Khanh record'},
          {value: '100+', label: 'Projects over 10 years'},
          {value: '6', label: 'Aladdin brands'}
        ]
      },
      {
        eyebrow: 'Single partner',
        title: 'Design, interiors, MEP, kitchen stainless steel, construction, and signage in one system.',
        description:
          'The restaurant-focused general-contractor model helps investors reduce coordination across multiple parties, improve quality control, and protect opening schedules.',
        imageLabel: 'Flagship execution',
        imageUrl: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=2070&auto=format&fit=crop',
        stats: [
          {value: '6', label: 'Core capabilities'},
          {value: '3', label: 'Install, handover, maintain'},
          {value: '1', label: 'Accountable partner'}
        ]
      }
    ],
    brandSectionTitle: 'Representative Clients',
    brandSectionLead:
      'New Sky has delivered projects for F&B brands within the Aladdin.,JSC restaurant-chain system and other large-scale chain projects.',
    brands: [
      {
        name: 'Long Wang',
        tag: 'Hong Kong Hotpot',
        description: 'One of the F&B brands New Sky has supported through restaurant rollout and delivery.'
      },
      {
        name: 'Tien Long',
        tag: 'Teochew Beef Hotpot',
        description: 'A Teochew fresh-beef hotpot chain requiring consistent quality across multiple locations.'
      },
      {
        name: 'Bo To Quan Moc',
        tag: 'Traditional Dining',
        description: 'A nostalgic Hanoi-style restaurant brand featured in the 16-day Ngoc Khanh case study.'
      },
      {
        name: 'G.Master',
        tag: 'F&B Brand',
        description: 'One of 6 brands in the Aladdin system that anchor New Sky delivery experience.'
      },
      {
        name: 'Com Nieu Hai Su',
        tag: 'Vietnamese Dining',
        description: 'A Vietnamese restaurant brand in the Aladdin system, part of New Sky restaurant project experience.'
      },
      {
        name: 'Khen Nuong Sapa',
        tag: 'Vietnamese Dining',
        description: 'A Vietnamese restaurant brand in the Aladdin system, showing experience across F&B formats.'
      }
    ],
    socialTitle: 'New Sky Proof Points',
    socialLead:
      'Programme, quality, and trust are anchored in actual project proof.',
    socialStories: [
      {
        title: 'Programme with proof',
        description: 'The combined Bo To Quan Moc + Long Wang project at 84 Ngoc Khanh was delivered from site handover to opening in 16 days.'
      },
      {
        title: 'Consistent quality',
        description: 'More than 100 restaurant projects over 10 years with control from design, materials, production, and installation through acceptance.'
      }
    ],
    careersTitle: 'Delivery Teams',
    careersLead:
      'New Sky operates through dedicated design, site supervision, direct construction, administration, accounting, and in-house workshop teams.',
    careers: {
      title: 'One team serving simultaneous projects across Vietnam',
      description:
        'Specialized departments coordinate through a clear process to protect programme, quality, and accountability throughout each project.',
      highlights: ['Design team', 'Site supervision team', '3,000sqm in-house workshop']
    },
    newsTitle: 'Projects and Capabilities',
    newsLead:
      'Updates on representative projects, in-house workshop capability, and restaurant-chain delivery experience.',
    featuredNews: [
      {
        category: 'Case study',
        title: '1,260sqm Ngoc Khanh project completed in 16 days',
        description: 'A proof point for coordinating multiple workstreams under a compressed schedule.'
      },
      {
        category: 'Workshop',
        title: '3,000sqm in-house workshop in Ha Dong',
        description: 'In-house production for interiors, kitchen stainless steel, and signage gives New Sky stronger control over self-delivered scopes.'
      },
      {
        category: 'F&B chains',
        title: 'Delivery experience with 6 brands in the Aladdin system',
        description: 'Bo To Quan Moc, Tian Long, Long Wang, G.Master, Com Nieu Hai Su, and Khen Nuong Sapa are New Sky trust anchors.'
      }
    ],
    ctaLabel: 'Contact',
    ctaTitle: 'Ready to discuss your restaurant project.',
    ctaDescription:
      'Share your site, concept, target budget, and timeline so New Sky can advise a suitable design-and-build direction.',
    ctaPrimary: 'Book consultation',
    ctaSecondary: 'View projects'
  }
};
