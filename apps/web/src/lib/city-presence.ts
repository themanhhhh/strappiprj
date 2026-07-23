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
  {
    id: '06',
    slug: 'hung-yen',
    city: 'Hưng Yên',
    cityEn: 'Hung Yen',
    heading: 'Hưng Yên',
    x: '52%',
    y: '29%',
    info: 'Hưng Yên - khu vực kết nối xưởng sản xuất Thượng Hồng với các dự án nhà hàng phía Bắc.',
    infoEn: 'Hung Yen - a northern delivery area connected to New Sky\'s Thuong Hong workshop.',
    sourceHeading: 'Hưng Yên',
  },
  {
    id: '07',
    slug: 'nghe-an',
    city: 'Nghệ An',
    cityEn: 'Nghe An',
    heading: 'Nghệ An',
    x: '45%',
    y: '43%',
    info: 'Nghệ An - điểm triển khai của hệ thống nhà hàng tại khu vực Bắc Trung Bộ.',
    infoEn: 'Nghe An - a restaurant-chain delivery point in the north-central region.',
    sourceHeading: 'Nghệ An',
  },
  {
    id: '08',
    slug: 'thanh-hoa',
    city: 'Thanh Hoá',
    cityEn: 'Thanh Hoa',
    heading: 'Thanh Hoá',
    x: '47%',
    y: '36%',
    info: 'Thanh Hoá - khu vực phục vụ các dự án chuỗi nhà hàng phía Bắc và Bắc Trung Bộ.',
    infoEn: 'Thanh Hoa - a delivery area serving restaurant-chain projects in the north and north-central regions.',
    sourceHeading: 'Thanh Hoá',
  },
  {
    id: '09',
    slug: 'thua-thien-hue',
    city: 'Thừa Thiên Huế',
    cityEn: 'Thua Thien Hue',
    heading: 'Thừa Thiên Huế',
    x: '52%',
    y: '57%',
    info: 'Thừa Thiên Huế - điểm hiện diện của New Sky tại khu vực miền Trung.',
    infoEn: 'Thua Thien Hue - a New Sky delivery location in central Vietnam.',
    sourceHeading: 'Thừa Thiên Huế',
  },
  {
    id: '10',
    slug: 'bac-giang',
    city: 'Bắc Giang',
    cityEn: 'Bac Giang',
    heading: 'Bắc Giang',
    x: '55%',
    y: '20%',
    info: 'Bắc Giang - địa điểm triển khai bổ sung trong mạng lưới dự án phía Bắc.',
    infoEn: 'Bac Giang - an additional delivery location in New Sky\'s northern network.',
    sourceHeading: 'Bắc Giang',
  },
  {
    id: '11',
    slug: 'dong-nai',
    city: 'Đồng Nai',
    cityEn: 'Dong Nai',
    heading: 'Đồng Nai',
    x: '55%',
    y: '73%',
    info: 'Đồng Nai - khu vực triển khai dự án nhà hàng tại vùng kinh tế phía Nam.',
    infoEn: 'Dong Nai - a restaurant project delivery area in southern Vietnam.',
    sourceHeading: 'Đồng Nai',
  },
];

export function getCityPresence(slug: string) {
  return cityPresence.find((city) => city.slug === slug);
}
