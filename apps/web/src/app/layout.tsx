import './globals.css';
import type {Metadata} from 'next';
import {Playfair_Display, Roboto} from 'next/font/google';

const roboto = Roboto({
  weight: ['400', '500', '700'],
  subsets: ['latin', 'vietnamese'],
  display: 'swap',
  variable: '--font-roboto',
});

const playfairDisplay = Playfair_Display({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin', 'vietnamese'],
  display: 'swap',
  variable: '--font-serif',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://newskyfnb.vn'),
  title: {
    default: 'New Sky — Thiết kế + thi công nhà hàng trọn gói',
    template: '%s — New Sky',
  },
  description:
    'New Sky là đối tác thiết kế + thi công nhà hàng trọn gói cho chủ nhà hàng Việt, với 10 năm kinh nghiệm, 100+ dự án và xưởng sản xuất Inox riêng.',
  keywords: ['thi công nhà hàng', 'thiết kế nhà hàng', 'bếp inox công nghiệp', 'thi công F&B', 'New Sky'],
  authors: [{name: 'New Sky', url: 'https://newskyfnb.vn'}],
  creator: 'New Sky',
  openGraph: {
    type: 'website',
    locale: 'vi_VN',
    alternateLocale: 'en_US',
    url: 'https://newskyfnb.vn',
    siteName: 'New Sky',
    title: 'New Sky — Thiết kế + thi công nhà hàng trọn gói',
    description: 'Đối tác thiết kế + thi công nhà hàng cho chủ nhà hàng Việt.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'New Sky — Thiết kế + thi công nhà hàng trọn gói',
    description: '10 năm — 100+ dự án — xưởng sản xuất Inox riêng.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {index: true, follow: true},
  },
};

export default function RootLayout({children}: Readonly<{children: React.ReactNode}>) {
  return (
    <html lang="vi" className={`${roboto.variable} ${playfairDisplay.variable}`}>
      <body className={`${roboto.variable} ${playfairDisplay.variable}`}>{children}</body>
    </html>
  );
}
