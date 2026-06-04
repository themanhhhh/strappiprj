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
    'Đối tác thiết kế + thi công nhà hàng trọn gói cho chủ nhà hàng Việt.',
  locales: ['vi', 'en'],
  navigation: [
    {key: 'about', href: '/about'},
    {key: 'services', href: '/services'},
    {key: 'projects', href: '/projects'},
    {key: 'journal', href: '/journal'},
    {key: 'careers', href: '/careers'},
    {key: 'contact', href: '/contact'}
  ],
  socialLinks: [
    {label: 'LinkedIn', href: '#'},
    {label: 'Facebook', href: '#'},
    {label: 'Zalo', href: '#'}
  ],
  utilityLinks: [
    {label: 'Search', href: '#'},
    {label: 'Investor Desk', href: '#'},
    {label: 'Policy', href: '#'}
  ],
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
      eyebrow: 'Corporate Profile',
      title: 'Enterprise story and operating discipline',
      description: 'Use the corporate section to explain structure, standards, leadership and brand direction.',
      columns: [
        {
          title: 'Company',
          links: [
            {label: 'Overview', href: '/about', meta: 'Who we are'},
            {label: 'Leadership', href: '/about', meta: 'Management team'},
            {label: 'Operating model', href: '/about', meta: 'How we work'}
          ]
        },
        {
          title: 'Standards',
          links: [
            {label: 'Safety & QA', href: '/about', meta: 'Site discipline'},
            {label: 'CSR', href: '/about', meta: 'Community impact'},
            {label: 'Governance', href: '/about', meta: 'Policy and systems'}
          ]
        }
      ],
      featured: {
        title: 'Corporate brochure',
        description: 'Reserve this tile for a profile download, milestone story or chairman message.',
        href: '/about'
      }
    },
    services: {
      key: 'services',
      eyebrow: 'Capabilities',
      title: 'Execution services built for F&B rollout',
      description: 'Group your offer by execution packages, coordination services and upgrade programs.',
      columns: [
        {
          title: 'Execution',
          links: [
            {label: 'Restaurant fit-out', href: '/services/restaurant-fit-out', meta: 'Core delivery'},
            {label: 'Renovation', href: '/services/renovation-upgrade', meta: 'Live operation upgrade'}
          ]
        },
        {
          title: 'Technical',
          links: [
            {label: 'MEP coordination', href: '/services/mep-coordination', meta: 'Technical alignment'},
            {label: 'Project planning', href: '/services', meta: 'Delivery sequence'}
          ]
        }
      ],
      featured: {
        title: 'Service matrix',
        description: 'Show a visual matrix of service packages and the project types they support.',
        href: '/services'
      }
    },
    projects: {
      key: 'projects',
      eyebrow: 'Portfolio',
      title: 'Case studies, rollout stories and flagship work',
      description: 'The portfolio menu should surface categories, flagship projects and fast access to proof.',
      columns: [
        {
          title: 'Project types',
          links: [
            {label: 'Fast casual fit-out', href: '/projects', meta: 'Retail center rollout'},
            {label: 'Cafe renovation', href: '/projects', meta: 'Upgrade program'},
            {label: 'Flagship dining', href: '/projects', meta: 'Signature stores'}
          ]
        },
        {
          title: 'Highlights',
          links: [
            {label: 'Mall restaurant rollout', href: '/projects/mall-restaurant-rollout', meta: '420 m2'},
            {label: 'Cafe upgrade package', href: '/projects/cafe-upgrade-package', meta: '180 m2'}
          ]
        }
      ],
      featured: {
        title: 'View flagship case study',
        description: 'Direct visitors to the most convincing project proof from the menu itself.',
        href: '/projects/signature-dining-space'
      }
    },
    journal: {
      key: 'journal',
      eyebrow: 'Newsroom',
      title: 'Corporate news, project updates and knowledge content',
      description: 'The newsroom dropdown should split knowledge articles from company announcements.',
      columns: [
        {
          title: 'Editorial',
          links: [
            {label: 'Knowledge articles', href: '/journal', meta: 'Operational content'},
            {label: 'Technical notes', href: '/journal', meta: 'Coordination insights'}
          ]
        },
        {
          title: 'Latest stories',
          links: [
            {label: 'Prepare a restaurant site brief', href: '/journal/prepare-restaurant-site-brief'},
            {label: 'Coordination risks before handover', href: '/journal/coordination-risks-before-handover'}
          ]
        }
      ],
      featured: {
        title: 'Featured newsroom story',
        description: 'Use the right-hand tile for the current top story or company announcement.',
        href: '/journal'
      }
    },
    careers: {
      key: 'careers',
      eyebrow: 'People',
      title: 'Employer brand and open roles',
      description: 'Surface your culture, teams and key vacancies directly from the primary navigation.',
      columns: [
        {
          title: 'Teams',
          links: [
            {label: 'Site execution', href: '/careers', meta: 'Field operations'},
            {label: 'Design coordination', href: '/careers', meta: 'Project design'},
            {label: 'Business support', href: '/careers', meta: 'Growth functions'}
          ]
        },
        {
          title: 'Open roles',
          links: [
            {label: 'Site supervisor', href: '/careers/site-supervisor'},
            {label: 'Project architect', href: '/careers/project-architect'},
            {label: 'Marketing coordinator', href: '/careers/marketing-coordinator'}
          ]
        }
      ],
      featured: {
        title: 'Work with the rollout team',
        description: 'Use the feature card for a recruitment campaign or hiring message.',
        href: '/careers'
      }
    },
    contact: {
      key: 'contact',
      eyebrow: 'Connect',
      title: 'Enquiry channels and office contacts',
      description: 'The contact dropdown should route users quickly to consultations, office information and lead channels.',
      columns: [
        {
          title: 'Channels',
          links: [
            {label: 'Book consultation', href: '/contact', meta: 'Primary lead form'},
            {label: 'Call hotline', href: '/contact', meta: 'Fast response'},
            {label: 'Office contact', href: '/contact', meta: 'Head office and branch'}
          ]
        }
      ],
      featured: {
        title: 'Direct enquiry handoff',
        description: 'Reserve this card for fast-contact actions or a support map block.',
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
        title: 'Đối tác thiết kế + thi công nhà hàng trọn gói cho chủ nhà hàng Việt.',
        description:
          '10 năm đồng hành cùng hệ thống chuỗi nhà hàng, 100+ dự án đã thi công và xưởng sản xuất Inox riêng tại Hà Đông.',
        imageLabel: 'Retail center rollout',
        imageUrl: 'https://images.unsplash.com/photo-1552566626-52f8b828add9?q=80&w=2070&auto=format&fit=crop',
        stats: [
          {value: '10 năm', label: 'Kinh nghiệm thực chiến'},
          {value: '100+', label: 'Dự án nhà hàng'},
          {value: '3.000m2', label: 'Xưởng Inox riêng'}
        ]
      },
      {
        eyebrow: '3 cam kết',
        title: 'Cạnh tranh bằng tiến độ, chất lượng và niềm tin có bằng chứng cụ thể.',
        description:
          'New Sky chứng minh năng lực bằng dự án 84 Ngọc Khánh thi công 16 ngày, 100+ dự án trong 10 năm và quan hệ đồng hành dài hạn cùng các thương hiệu F&B.',
        imageLabel: 'Chain rollout system',
        imageUrl: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?q=80&w=2070&auto=format&fit=crop',
        stats: [
          {value: '16 ngày', label: 'Kỷ lục Ngọc Khánh'},
          {value: '60+', label: 'Dự án mới 2026'},
          {value: '6', label: 'Thương hiệu F&B'}
        ]
      },
      {
        eyebrow: 'Một đầu mối',
        title: 'Thiết kế, cơ điện, Inox bếp, xây dựng và bàn giao vận hành trong một hệ thống.',
        description:
          'Cách làm trọn gói giúp chủ đầu tư giảm phối hợp nhiều nhà thầu, kiểm soát chất lượng tốt hơn và rút ngắn tiến độ khai trương.',
        imageLabel: 'Flagship execution',
        imageUrl: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=2070&auto=format&fit=crop',
        stats: [
          {value: '5', label: 'Năng lực cốt lõi'},
          {value: '2-3x', label: 'Rút ngắn tiến độ'},
          {value: '12 tháng', label: 'Bảo hành'}
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
        name: 'Quán Mộc',
        tag: 'Traditional Dining',
        description: 'Thương hiệu nhà hàng phong cách hoài cổ Hà Nội, nổi bật trong case Ngọc Khánh 16 ngày.'
      },
      {
        name: 'Hải Sư',
        tag: 'Dimsum & Rice',
        description: 'Dự án F&B được triển khai từ thiết kế, thi công đến bàn giao vận hành.'
      }
    ],
    socialTitle: 'Cam kết của New Sky',
    socialLead:
      'Mỗi cam kết về tiến độ, chất lượng và niềm tin đều được neo bằng bằng chứng dự án thực tế.',
    socialStories: [
      {
        title: 'Tiến độ có bằng chứng',
        description: 'Tổ hợp Bò Tơ Quán Mộc + Long Wang tại 84 Ngọc Khánh được triển khai từ nhận mặt bằng đến khai trương trong 16 ngày.'
      },
      {
        title: 'Chất lượng đồng bộ',
        description: '100+ dự án trong 10 năm với hệ thống kiểm soát từ thiết kế, vật tư, sản xuất, lắp đặt đến nghiệm thu.'
      }
    ],
    careersTitle: 'Đội ngũ triển khai',
    careersLead:
      'New Sky vận hành bằng các đội chuyên trách: thiết kế, giám sát thi công, đội thi công trực tiếp, hành chính, kế toán và xưởng Inox.',
    careers: {
      title: 'Một đội ngũ phục vụ đồng thời nhiều dự án trên 3 miền',
      description:
        'Các bộ phận phối hợp theo quy trình rõ ràng để giữ tiến độ, chất lượng và trách nhiệm xuyên suốt dự án.',
      highlights: ['Đội thiết kế', 'Đội giám sát thi công', 'Xưởng Inox 3.000m2']
    },
    newsTitle: 'Dự án và năng lực',
    newsLead:
      'Cập nhật các dự án tiêu biểu, năng lực xưởng Inox và kinh nghiệm triển khai chuỗi nhà hàng.',
    featuredNews: [
      {
        category: 'Case study',
        title: 'Tổ hợp Ngọc Khánh 1.260m2 hoàn thành trong 16 ngày',
        description: 'Bằng chứng tiêu biểu cho năng lực điều phối đồng bộ nhiều hạng mục trong tiến độ rất ngắn.'
      },
      {
        category: 'Xưởng Inox',
        title: 'Xưởng sản xuất Inox 3.000m2 tại Hà Đông',
        description: 'Năng lực sản xuất nội bộ giúp rút ngắn tiến độ và kiểm soát chất lượng từ khâu đầu.'
      },
      {
        category: 'Chuỗi F&B',
        title: 'Đồng hành thi công 6 thương hiệu nhà hàng',
        description: 'Kinh nghiệm triển khai chuỗi giúp New Sky chuẩn hóa hạng mục và đồng bộ chất lượng giữa nhiều mặt bằng.'
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
        title: 'Design-and-build partner for restaurant owners in Vietnam.',
        description:
          '10 years of practical experience, 100+ restaurant projects, and an in-house stainless-steel production workshop.',
        imageLabel: 'Retail center rollout',
        imageUrl: 'https://images.unsplash.com/photo-1552566626-52f8b828add9?q=80&w=2070&auto=format&fit=crop',
        stats: [
          {value: '10 years', label: 'Practical experience'},
          {value: '100+', label: 'Restaurant projects'},
          {value: '3,000sqm', label: 'Stainless-steel workshop'}
        ]
      },
      {
        eyebrow: '3 commitments',
        title: 'Competing through programme, quality, and trust backed by proof.',
        description:
          'New Sky proves capability through the 16-day Ngoc Khanh project, 100+ projects over 10 years, and long-term delivery for F&B brands.',
        imageLabel: 'Chain rollout system',
        imageUrl: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?q=80&w=2070&auto=format&fit=crop',
        stats: [
          {value: '16 days', label: 'Ngoc Khanh record'},
          {value: '60+', label: 'New projects in 2026'},
          {value: '6', label: 'F&B brands'}
        ]
      },
      {
        eyebrow: 'Single partner',
        title: 'Design, MEP, kitchen stainless steel, construction, and handover in one system.',
        description:
          'The end-to-end model helps investors reduce multi-contractor coordination, improve quality control, and shorten opening schedules.',
        imageLabel: 'Flagship execution',
        imageUrl: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=2070&auto=format&fit=crop',
        stats: [
          {value: '5', label: 'Core capabilities'},
          {value: '2-3x', label: 'Faster delivery'},
          {value: '12 months', label: 'Warranty'}
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
        name: 'Quan Moc',
        tag: 'Traditional Dining',
        description: 'A nostalgic Hanoi-style restaurant brand featured in the 16-day Ngoc Khanh case study.'
      },
      {
        name: 'Hai Su',
        tag: 'Dimsum & Rice',
        description: 'An F&B project type delivered from design and construction through operational handover.'
      }
    ],
    socialTitle: 'New Sky Commitments',
    socialLead:
      'Every commitment on programme, quality, and trust is anchored in actual project proof.',
    socialStories: [
      {
        title: 'Programme with proof',
        description: 'The combined Bo To Quan Moc + Long Wang project at 84 Ngoc Khanh was delivered from site handover to opening in 16 days.'
      },
      {
        title: 'Consistent quality',
        description: '100+ projects over 10 years with control from design, materials, production, and installation through acceptance.'
      }
    ],
    careersTitle: 'Delivery Teams',
    careersLead:
      'New Sky operates through dedicated design, site supervision, direct construction, administration, accounting, and stainless-steel workshop teams.',
    careers: {
      title: 'One team serving simultaneous projects across Vietnam',
      description:
        'Specialized departments coordinate through a clear process to protect programme, quality, and accountability throughout each project.',
      highlights: ['Design team', 'Site supervision team', '3,000sqm stainless-steel workshop']
    },
    newsTitle: 'Projects and Capabilities',
    newsLead:
      'Updates on representative projects, stainless-steel workshop capability, and restaurant-chain delivery experience.',
    featuredNews: [
      {
        category: 'Case study',
        title: '1,260sqm Ngoc Khanh project completed in 16 days',
        description: 'A proof point for coordinating multiple workstreams under a compressed schedule.'
      },
      {
        category: 'Workshop',
        title: '3,000sqm stainless-steel workshop in Ha Dong',
        description: 'In-house production shortens timelines and controls quality from the beginning.'
      },
      {
        category: 'F&B chains',
        title: 'Delivery partner for six restaurant brands',
        description: 'Chain delivery experience helps New Sky standardize packages and maintain quality across different sites.'
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
