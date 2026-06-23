import type {Metadata} from 'next';
import {PageHero} from '@/components/page-hero';

export const metadata: Metadata = {
  title: 'Thi công bếp F&B TPHCM - New Sky',
  description: 'New Sky phục vụ nhu cầu thi công bếp F&B, inox bếp công nghiệp, nội thất và biển hiệu cho khu vực TP Hồ Chí Minh.',
};

export default function HoChiMinhKitchenPage() {
  return (
    <>
      <PageHero eyebrow="Local landing HCM" title="Thi công bếp F&B TPHCM" description="New Sky hỗ trợ dự án F&B khu vực phía Nam thông qua văn phòng miền Nam và năng lực tự sản xuất từ xưởng Hà Đông." />
      <section className="section-block"><div className="shell panel"><p>Trang local landing phục vụ nhu cầu tìm kiếm tại TP Hồ Chí Minh, tập trung vào inox bếp công nghiệp và thi công hạng mục F&B.</p></div></section>
    </>
  );
}
