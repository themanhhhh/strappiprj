# Fallback Brand Images

Thu muc nay chua anh fallback cho 6 thuong hieu khi CMS chua deploy hoac khong co asset.

URL public trong Next.js bat dau tu `/images/fallback/brands/...`.

Vi du:

- `/images/fallback/brands/long-wang/logo/logo.png`
- `/images/fallback/brands/long-wang/banners/home-hero.jpg`
- `/images/fallback/brands/long-wang/gallery/storefront-01.jpg`

## Cau Truc

Moi thuong hieu co cung mot cau truc:

- `logo/`: logo chinh, logo ngang, logo am ban hoac duong ban.
- `banners/`: anh banner/hero dung cho homepage, brand card, listing.
- `gallery/`: anh du an, mat tien, khong gian noi that, thi cong.
- `menu-products/`: anh mon an, san pham, packaged products neu co.
- `social/`: anh cat ty le dung cho social card, thumbnail, open graph.

## 6 Thuong Hieu

| Brand | Folder | Public path |
| --- | --- | --- |
| Long Wang | `long-wang` | `/images/fallback/brands/long-wang/...` |
| Tian Long | `tian-long` | `/images/fallback/brands/tian-long/...` |
| Bo To Quan Moc | `bo-to-quan-moc` | `/images/fallback/brands/bo-to-quan-moc/...` |
| G.Master | `g-master` | `/images/fallback/brands/g-master/...` |
| Com Nieu Hai Su | `com-nieu-hai-su` | `/images/fallback/brands/com-nieu-hai-su/...` |
| Khen Nuong Sapa | `khen-nuong-sapa` | `/images/fallback/brands/khen-nuong-sapa/...` |

## Ten File De Xuat

- `logo/logo.png`
- `logo/logo-horizontal.png`
- `logo/logo-light.png`
- `banners/home-hero.jpg`
- `banners/brand-card.jpg`
- `banners/listing-cover.jpg`
- `gallery/storefront-01.jpg`
- `gallery/interior-01.jpg`
- `gallery/kitchen-01.jpg`
- `menu-products/product-01.jpg`
- `social/og-image.jpg`
- `social/thumbnail.jpg`
