export type CityPresence = {
  id: string;
  slug: string;
  city: string;
  cityEn: string;
  heading: string;
  x: string;
  y: string;
  info: string;
  infoEn: string;
  sourceHeading: string;
};

export const cityPresence: CityPresence[] = [
  {
    id: '01',
    slug: 'ha-noi',
    city: 'Hà Nội',
    cityEn: 'Hanoi',
    heading: 'Hà Nội',
    x: '50%',
    y: '25%',
    info: 'Hà Nội - khu vực trọng điểm phía Bắc, nơi New Sky đặt văn phòng đại diện và kết nối xưởng tự sản xuất 3.000m² tại Thượng Hồng, Hưng Yên.',
    infoEn: 'Hanoi - New Sky\'s key northern base with a representative office and connection to the 3,000sqm in-house workshop.',
    sourceHeading: 'Hà Nội',
  },
  {
    id: '02',
    slug: 'hai-phong',
    city: 'Hải Phòng',
    cityEn: 'Hai Phong',
    heading: 'Hải Phòng',
    x: '56%',
    y: '23%',
    info: 'Hải Phòng - thị trường triển khai dự án F&B và chuỗi nhà hàng tại khu vực duyên hải phía Bắc.',
    infoEn: 'Hai Phong - a northern coastal market for F&B and restaurant-chain project delivery.',
    sourceHeading: 'Hải Phòng',
  },
  {
    id: '03',
    slug: 'da-nang',
    city: 'Đà Nẵng',
    cityEn: 'Da Nang',
    heading: 'Đà Nẵng',
    x: '60%',
    y: '53%',
    info: 'Đà Nẵng - điểm kết nối miền Trung trong mạng lưới triển khai dự án Bắc - Trung - Nam của New Sky.',
    infoEn: 'Da Nang - a central-region connection point in New Sky\'s nationwide delivery network.',
    sourceHeading: 'Đà Nẵng',
  },
  {
    id: '04',
    slug: 'ho-chi-minh',
    city: 'TP. Hồ Chí Minh',
    cityEn: 'Ho Chi Minh City',
    heading: 'TP. Hồ Chí Minh',
    x: '51%',
    y: '80%',
    info: 'TP. Hồ Chí Minh - văn phòng miền Nam của New Sky, phục vụ các dự án F&B và nhu cầu sản phẩm rời tại khu vực phía Nam.',
    infoEn: 'Ho Chi Minh City - New Sky\'s southern office base for F&B projects and standalone product needs.',
    sourceHeading: 'TP. Hồ Chí Minh',
  },
  {
    id: '05',
    slug: 'can-tho',
    city: 'Cần Thơ',
    cityEn: 'Can Tho',
    heading: 'Cần Thơ',
    x: '49%',
    y: '82%',
    info: 'Cần Thơ - cửa ngõ Tây Nam Bộ trong mạng lưới phục vụ chủ đầu tư trên toàn quốc.',
    infoEn: 'Can Tho - the Mekong Delta gateway within New Sky\'s nationwide investor service network.',
    sourceHeading: 'Cần Thơ',
  },
];

export function getCityPresence(slug: string) {
  return cityPresence.find((city) => city.slug === slug);
}
