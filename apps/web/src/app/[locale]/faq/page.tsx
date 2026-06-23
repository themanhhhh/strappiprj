import type {Metadata} from 'next';
import {PageHero} from '@/components/page-hero';
import {siteUrl} from '@/lib/seo';

const faqs = [
  ['New Sky làm những hạng mục nào?', 'New Sky tổ chức 6 năng lực gồm thiết kế, nội thất, cơ điện, inox bếp, xây dựng và biển hiệu; thêm các bước lắp đặt, bàn giao và bảo trì.'],
  ['New Sky có tự sản xuất không?', 'New Sky có xưởng 3.000m² tại Hà Đông để tự sản xuất nội thất, inox bếp công nghiệp và biển hiệu.'],
  ['New Sky phục vụ khách hàng nào?', 'Tệp chính là chủ chuỗi nhà hàng F&B, người setup nhà hàng, doanh nghiệp F&B mở rộng chuỗi và khách cần sản phẩm rời như inox bếp, nội thất, biển hiệu.'],
  ['Có công khai giá trên website không?', 'Không. New Sky chỉ báo giá sau khi trao đổi trực tiếp về mặt bằng, phạm vi, vật liệu và yêu cầu kỹ thuật.'],
];

type FaqPageProps = {params: Promise<{locale: string}>};

export async function generateMetadata({params}: FaqPageProps): Promise<Metadata> {
  const {locale} = await params;
  return {
    title: 'FAQ - Câu hỏi thường gặp về New Sky',
    description: 'Câu hỏi thường gặp về dịch vụ thiết kế và thi công nhà hàng F&B, xưởng inox bếp, nội thất và biển hiệu của New Sky.',
    alternates: {canonical: `/${locale}/faq`},
  };
}

export default async function FaqPage({params}: FaqPageProps) {
  const {locale} = await params;
  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(([question, answer]) => ({
      '@type': 'Question',
      name: question,
      acceptedAnswer: {'@type': 'Answer', text: answer},
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify(faqJsonLd)}} />
      <PageHero eyebrow="FAQ" title="Câu hỏi thường gặp" description="Các câu hỏi nền tảng về New Sky, phạm vi dịch vụ và cách trao đổi dự án." />
      <section className="section-block">
        <div className="shell page-stack">
          {faqs.map(([question, answer]) => (
            <article key={question} className="panel">
              <h2>{question}</h2>
              <p>{answer}</p>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
