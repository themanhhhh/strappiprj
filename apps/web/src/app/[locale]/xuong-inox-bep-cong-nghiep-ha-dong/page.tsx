import type {Metadata} from 'next';
import {PageHero} from '@/components/page-hero';

export const metadata: Metadata = {
  title: 'Xưởng inox bếp công nghiệp Thượng Hồng - New Sky',
  description: 'Xưởng tự sản xuất 3.000m² tại Thượng Hồng, Hưng Yên của New Sky phục vụ inox bếp công nghiệp, nội thất và biển hiệu cho nhà hàng F&B.',
};

export default function HaDongWorkshopPage() {
  return (
    <>
      <PageHero eyebrow="Xưởng New Sky" title="Xưởng inox bếp công nghiệp Thượng Hồng" description="Xưởng Thượng Hồng, Hưng Yên giúp New Sky chủ động sản xuất inox bếp công nghiệp, nội thất và biển hiệu cho dự án nhà hàng F&B." />
      <section className="section-block"><div className="shell panel"><p>Trang local landing phục vụ nhu cầu tìm kiếm tại Hà Nội, tập trung vào năng lực xưởng 3.000m² và các hạng mục tự sản xuất của New Sky.</p></div></section>
    </>
  );
}
