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
  name: 'Industrial Minimal Fit-out',
  description:
    'Corporate website scaffold for a restaurant construction group with multilingual content and CMS integration.',
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
      label: 'Head Office',
      address: '69 To Huu, Van Phuc Ward, Hanoi',
      phone: '(+84)24 2246 4555',
      email: 'contact@example.com'
    },
    {
      label: 'Southern Branch',
      address: '43-45 Nguyen Thi Thap, Tan Hung Ward, Ho Chi Minh City',
      phone: '(+84)85 442 3388',
      email: 'south@example.com'
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
        eyebrow: 'Restaurant Group Construction',
        title: 'Thi công hệ thống F&B theo tư duy vận hành và mở rộng thương hiệu.',
        description:
          'Bố cục trang chủ được chuyển sang hướng corporate group site với nhấn mạnh thương hiệu, trách nhiệm xã hội, tuyển dụng và tin tức nổi bật.',
        imageLabel: 'Retail center rollout',
        imageUrl: 'https://images.unsplash.com/photo-1552566626-52f8b828add9?q=80&w=2070&auto=format&fit=crop',
        stats: [
          {value: '12+', label: 'Thương hiệu phục vụ'},
          {value: '2', label: 'Văn phòng điều hành'},
          {value: '100+', label: 'Dự án F&B đã triển khai'}
        ]
      },
      {
        eyebrow: 'Brand Rollout',
        title: 'Vận hành rollout cho chuỗi nhà hàng cần dữ liệu, kỷ luật và phối hợp kỹ thuật.',
        description:
          'Slide thứ hai dùng để mô tả năng lực rollout chuỗi, tiến độ và khả năng lặp lại quy trình giữa các điểm bán.',
        imageLabel: 'Chain rollout system',
        imageUrl: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?q=80&w=2070&auto=format&fit=crop',
        stats: [
          {value: '08', label: 'Mô hình rollout song song'},
          {value: '72h', label: 'Chu kỳ phản hồi site'},
          {value: 'MEP', label: 'Điều phối xưởng kỹ thuật'}
        ]
      },
      {
        eyebrow: 'Flagship Delivery',
        title: 'Từ flagship đến renovation, giao diện mới cần thể hiện rõ năng lực thực thi doanh nghiệp.',
        description:
          'Slide thứ ba đưa người dùng vào nhóm case-study và flagship execution, tạo nháp để đi tiếp vào portfolio.',
        imageLabel: 'Flagship execution',
        imageUrl: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=2070&auto=format&fit=crop',
        stats: [
          {value: '560', label: 'm2 flagship lớn nhất'},
          {value: '3', label: 'Loại công trình chủ lực'},
          {value: '24/7', label: 'Kênh tiếp nhận lead'}
        ]
      }
    ],
    brandSectionTitle: 'Thương hiệu',
    brandSectionLead:
      'Section thương hiệu được đẩy lên thành khối trung tâm của homepage, gần với pattern tập đoàn F&B trên trang tham chiếu.',
    brands: [
      {
        name: 'Long Wang',
        tag: 'Hong Kong Hotpot',
        description: 'Không gian thương hiệu cần nhận diện rõ concept, vận hành và tốc độ rollout.'
      },
      {
        name: 'Tiến Lòng',
        tag: 'Teochew Beef Hotpot',
        description: 'Mẫu card cho thương hiệu chủ lực với tone corporate, không đi vào fashion editorial.'
      },
      {
        name: 'Quán Mộc',
        tag: 'Traditional Dining',
        description: 'Dùng để trình bày network brand, flagship và hướng phát triển của hệ thống.'
      },
      {
        name: 'Hải Sư',
        tag: 'Dimsum & Rice',
        description: 'Có thể thay bằng logo, cover image và link detail khi nối CMS.'
      }
    ],
    socialTitle: 'Trách nhiệm xã hội',
    socialLead:
      'Khối này mô phỏng section CSR và community stories để trang chủ không chỉ nói về thi công mà còn về giá trị thương hiệu.',
    socialStories: [
      {
        title: 'Đồng hành cùng cộng đồng',
        description: 'Đưa vào các case về hỗ trợ cộng đồng, đồng hành địa phương và dự án tác động xã hội.'
      },
      {
        title: 'Vận hành có trách nhiệm',
        description: 'Sử dụng để nói về tiêu chuẩn an toàn, vật liệu và kỷ luật thi công tại công trình.'
      }
    ],
    careersTitle: 'Tuyển dụng',
    careersLead:
      'Homepage kiểu corporate cần dành một khối rõ ràng cho employer brand và thông điệp tuyển dụng.',
    careers: {
      title: 'Xây dựng đội ngũ để mở rộng hệ thống',
      description:
        'Chúng tôi đặt con người và kỷ luật vận hành vào trung tâm của quá trình thi công, rollout và phát triển thương hiệu.',
      highlights: ['Môi trường quy trình rõ ràng', 'Dự án F&B quy mô lớn', 'Cơ hội phát triển liên phòng ban']
    },
    newsTitle: 'Tin tức nổi bật',
    newsLead:
      'Khối news được bố trí như một corporate newsroom nhỏ, tập trung bài nổi bật và luồng cập nhật thương hiệu.',
    featuredNews: [
      {
        category: 'Ra mắt thương hiệu',
        title: 'Khai trương concept nhà hàng mới tại trung tâm thương mại',
        description: 'Mô tả ngắn cho bài nổi bật với heading lớn và teaser dáng corporate.'
      },
      {
        category: 'Cập nhật dự án',
        title: 'Hoàn tất fit-out flagship với tiến độ rút gọn',
        description: 'Dùng cho bài cập nhật thi công, bàn giao và milestone vận hành.'
      },
      {
        category: 'Tin tức công ty',
        title: 'Mở rộng hệ thống vận hành tại khu vực phía Nam',
        description: 'Dùng cho thông báo doanh nghiệp, đối tác, bộ máy và tăng trưởng hệ thống.'
      }
    ],
    ctaLabel: 'Liên hệ',
    ctaTitle: 'Sẵn sàng chuyển từ giao diện corporate sang dữ liệu và vận hành thật.',
    ctaDescription:
      'Bước tiếp theo là nối brand, news, jobs và project data từ Strapi để trang chủ vận hành đúng như một website doanh nghiệp.',
    ctaPrimary: 'Đặt lịch tư vấn',
    ctaSecondary: 'Xem dự án'
  },
  en: {
    heroSlides: [
      {
        eyebrow: 'Restaurant Group Construction',
        title: 'F&B construction built around operations, rollout speed and brand expansion.',
        description:
          'The homepage has been shifted toward a corporate group-site pattern with emphasis on brands, CSR, careers and featured news.',
        imageLabel: 'Retail center rollout',
        imageUrl: 'https://images.unsplash.com/photo-1552566626-52f8b828add9?q=80&w=2070&auto=format&fit=crop',
        stats: [
          {value: '12+', label: 'Brands supported'},
          {value: '2', label: 'Operating offices'},
          {value: '100+', label: 'F&B projects delivered'}
        ]
      },
      {
        eyebrow: 'Brand Rollout',
        title: 'Chain-store rollout needs data, site discipline and technical coordination.',
        description:
          'The second slide highlights rollout capability, execution cadence and process repeatability across locations.',
        imageLabel: 'Chain rollout system',
        imageUrl: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?q=80&w=2070&auto=format&fit=crop',
        stats: [
          {value: '08', label: 'Parallel rollout tracks'},
          {value: '72h', label: 'Site response cycle'},
          {value: 'MEP', label: 'Technical coordination'}
        ]
      },
      {
        eyebrow: 'Flagship Delivery',
        title: 'From flagship dining to renovation programs, the homepage now presents enterprise execution strength.',
        description:
          'The third slide directs visitors into flagship case studies and portfolio proof instead of a generic opening banner.',
        imageLabel: 'Flagship execution',
        imageUrl: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=2070&auto=format&fit=crop',
        stats: [
          {value: '560', label: 'Largest flagship m2'},
          {value: '3', label: 'Core project types'},
          {value: '24/7', label: 'Lead intake channel'}
        ]
      }
    ],
    brandSectionTitle: 'Brands',
    brandSectionLead:
      'The brand block now sits at the center of the homepage, following the same corporate F&B group pattern as the reference site.',
    brands: [
      {
        name: 'Long Wang',
        tag: 'Hong Kong Hotpot',
        description: 'Brand cards are structured to show concept, positioning and rollout readiness.'
      },
      {
        name: 'Tien Long',
        tag: 'Teochew Beef Hotpot',
        description: 'A corporate-style brand module for core concepts instead of a generic project grid.'
      },
      {
        name: 'Quan Moc',
        tag: 'Traditional Dining',
        description: 'Use this area to map flagship concepts and the broader brand network.'
      },
      {
        name: 'Hai Su',
        tag: 'Dimsum & Rice',
        description: 'This can later be replaced by logos, media and CMS-linked detail pages.'
      }
    ],
    socialTitle: 'Social Responsibility',
    socialLead:
      'This section mirrors the CSR and community-story pattern so the homepage does not speak only about construction output.',
    socialStories: [
      {
        title: 'Community engagement',
        description: 'Prepared for stories around local support, outreach and public impact.'
      },
      {
        title: 'Responsible operations',
        description: 'A place to explain safety standards, material decisions and delivery discipline.'
      }
    ],
    careersTitle: 'Careers',
    careersLead:
      'A corporate homepage needs a dedicated employer-brand block instead of hiding recruitment inside the footer.',
    careers: {
      title: 'Build the team behind rollout growth',
      description:
        'We place people, delivery discipline and operational thinking at the center of fit-out and brand expansion.',
      highlights: ['Structured work environment', 'Large-scale F&B projects', 'Cross-functional growth path']
    },
    newsTitle: 'Featured News',
    newsLead:
      'The news block is arranged more like a compact corporate newsroom with one clear editorial hierarchy.',
    featuredNews: [
      {
        category: 'Brand Launch',
        title: 'New restaurant concept opening in a retail center',
        description: 'A featured story card with strong headline and a compact corporate teaser.'
      },
      {
        category: 'Project Update',
        title: 'Flagship fit-out completed under a compressed schedule',
        description: 'Reserved for handover updates, execution milestones and project delivery notes.'
      },
      {
        category: 'Company News',
        title: 'Operating footprint expanded in the southern market',
        description: 'Prepared for company-wide updates around structure, partners and growth.'
      }
    ],
    ctaLabel: 'Contact',
    ctaTitle: 'The corporate homepage is ready to move from presentation to live operation.',
    ctaDescription:
      'The next phase is connecting brands, news, jobs and project data from Strapi so the homepage behaves like a real enterprise website.',
    ctaPrimary: 'Book consultation',
    ctaSecondary: 'View projects'
  }
};
