export type ServiceHub = {
  slug: string;
  title: string;
  description: string;
  keyword: string;
  scope: string[];
};

export const serviceHubs: ServiceHub[] = [
  {
    slug: 'thiet-ke-thi-cong-nha-hang-tron-goi',
    title: 'Thiết kế thi công nhà hàng trọn gói',
    keyword: 'thiết kế thi công nhà hàng trọn gói',
    description: 'Dịch vụ dành cho chủ chuỗi nhà hàng, người dựng quán và doanh nghiệp F&B mở rộng hệ thống cần một đầu mối rõ trách nhiệm.',
    scope: ['Thiết kế', 'Nội thất', 'Cơ điện', 'Inox bếp', 'Xây dựng', 'Biển hiệu', 'Lắp đặt', 'Bàn giao', 'Bảo trì'],
  },
  {
    slug: 'bep-cong-nghiep-inox',
    title: 'Bếp công nghiệp inox',
    keyword: 'bếp công nghiệp inox',
    description: 'Các hạng mục inox bếp công nghiệp được sản xuất tại xưởng Thượng Hồng, Hưng Yên 3.000m², phục vụ dự án nhà hàng F&B và nhu cầu sản phẩm rời.',
    scope: ['Bàn inox', 'Giá kệ inox', 'Tủ bếp inox', 'Bồn rửa inox', 'Lắp đặt theo mặt bằng bếp'],
  },
  {
    slug: 'bien-hieu-fnb',
    title: 'Biển hiệu F&B',
    keyword: 'biển hiệu F&B',
    description: 'Biển hiệu cho nhà hàng F&B gồm chữ inox, biển hiệu UV và pano, đồng bộ nhận diện từ mặt tiền đến các điểm chạm thương hiệu.',
    scope: ['Chữ inox', 'Biển hiệu UV', 'Pano', 'Nhận diện mặt tiền', 'Lắp đặt công trường'],
  },
  {
    slug: 'noi-that-fnb',
    title: 'Nội thất F&B',
    keyword: 'nội thất F&B',
    description: 'Sản xuất và lắp đặt nội thất nhà hàng tại xưởng, giúp đồng bộ thiết kế, thi công và chất lượng hoàn thiện cho chuỗi F&B.',
    scope: ['Bóc tách bản vẽ', 'Sản xuất nội thất', 'Kiểm tra hoàn thiện', 'Lắp đặt', 'Bảo trì sau bàn giao'],
  },
];

export function getServiceHub(slug: string) {
  return serviceHubs.find((hub) => hub.slug === slug);
}
