import './globals.css';
import type {Metadata} from 'next';
import {Lato, Work_Sans} from 'next/font/google';
import {siteUrl} from '@/lib/seo';

const workSans = Work_Sans({
  weight: ['700'],
  subsets: ['latin', 'vietnamese'],
  display: 'swap',
  variable: '--font-work-sans',
});

const lato = Lato({
  weight: ['400', '700'],
  subsets: ['latin', 'latin-ext'],
  display: 'swap',
  variable: '--font-lato',
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'New Sky — Thiết kế + thi công nhà hàng trọn gói',
    template: '%s — New Sky',
  },
  description:
    'Đối tác thiết kế và thi công nhà hàng F&B cho chủ nhà hàng Việt - 10 năm cùng hệ thống Aladdin, xưởng tự sản xuất nội thất, inox bếp và biển hiệu.',
  keywords: ['thi công nhà hàng', 'thiết kế nhà hàng', 'bếp inox công nghiệp', 'thi công F&B', 'New Sky'],
  authors: [{name: 'New Sky', url: siteUrl}],
  creator: 'New Sky',
  openGraph: {
    type: 'website',
    locale: 'vi_VN',
    alternateLocale: 'en_US',
    url: siteUrl,
    siteName: 'New Sky',
    title: 'New Sky — Thiết kế + thi công nhà hàng trọn gói',
    description: 'Đối tác thiết kế và thi công nhà hàng F&B cho chủ nhà hàng Việt.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'New Sky — Thiết kế + thi công nhà hàng trọn gói',
    description: '10 năm cùng hệ thống Aladdin - hơn 100 dự án - xưởng tự sản xuất nội thất, inox bếp và biển hiệu.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {index: true, follow: true},
  },
};

export default function RootLayout({children}: Readonly<{children: React.ReactNode}>) {
  return (
    <html lang="vi" className={`${workSans.variable} ${lato.variable}`}>
      <body className={`${workSans.variable} ${lato.variable}`}>{children}</body>
    </html>
  );
}
