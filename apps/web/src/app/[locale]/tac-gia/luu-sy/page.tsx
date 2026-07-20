import type {Metadata} from 'next';
import Image from 'next/image';
import {PageHero} from '@/components/page-hero';
import {siteUrl} from '@/lib/seo';

type AuthorPageProps = {
  params: Promise<{locale: string}>;
};

export async function generateMetadata({params}: AuthorPageProps): Promise<Metadata> {
  const {locale} = await params;
  return {
    title: 'Lưu Sỹ - Tác giả chuyên môn New Sky',
    description: 'Trang tác giả của ông Lưu Sỹ, Giám đốc New Sky, người định hướng giải pháp đồng hành cùng nhà đầu tư nhà hàng.',
    alternates: {
      canonical: `/${locale}/tac-gia/luu-sy`,
    },
  };
}

export default async function AuthorLuuSyPage({params}: AuthorPageProps) {
  const {locale} = await params;
  const personJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Lưu Sỹ',
    jobTitle: 'Giám đốc New Sky',
    worksFor: {
      '@type': 'Organization',
      name: 'New Sky',
      url: siteUrl,
    },
    url: `${siteUrl}/${locale}/tac-gia/luu-sy`,
    image: `${siteUrl}/images/giamdocpic.png`,
    knowsAbout: [
      'Thiết kế và thi công nhà hàng F&B trọn gói',
      'Bếp công nghiệp inox',
      'Nội thất nhà hàng',
      'Biển hiệu',
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify(personJsonLd)}} />
      <PageHero
        eyebrow="Tác giả chuyên môn"
        title="Ông Lưu Sỹ - Giám đốc New Sky"
        description="Người định hướng giải pháp đồng hành cùng nhà đầu tư nhà hàng, phát triển xưởng tự sản xuất nội thất, inox bếp và biển hiệu tại Thượng Hồng, Hưng Yên."
      />
      <section className="section-block">
        <div className="shell about-leader-content">
          <div className="about-leader-portrait">
            <Image src="/images/giamdocpic.png" alt="Ông Lưu Sỹ - Giám đốc New Sky" fill sizes="280px" />
          </div>
          <div className="about-leader-copy">
            <p>Ông Lưu Sỹ là Giám đốc Công ty TNHH Xây Dựng và Thực Phẩm New Sky, phụ trách định hướng giải pháp đồng hành cùng nhà đầu tư nhà hàng.</p>
            <p>Với kinh nghiệm đồng hành cùng hệ thống Aladdin 8 thương hiệu, ông tập trung xây dựng New Sky theo hướng tổng thầu chuyên nhà hàng, có xưởng tự sản xuất nội thất, inox bếp và biển hiệu.</p>
            <p>Các nội dung chuyên môn trên website New Sky cần phản ánh đúng tinh thần thực chiến: tiến độ có bằng chứng, chất lượng được kiểm soát và trách nhiệm rõ ràng trong từng đầu việc.</p>
          </div>
        </div>
      </section>
    </>
  );
}
