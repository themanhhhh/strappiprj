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
    default: 'New Sky — Giải pháp đồng hành cùng nhà đầu tư nhà hàng',
    template: '%s — New Sky',
  },
  description:
    'Gần 160 nhà hàng, 8 thương hiệu khắp cả nước. Đồng hành từ mặt bằng đến ngày quán vận hành có lãi — con số rõ từ đầu.',
  keywords: ['thi công nhà hàng', 'thiết kế nhà hàng', 'bếp inox công nghiệp', 'thi công F&B', 'New Sky'],
  authors: [{name: 'New Sky', url: siteUrl}],
  creator: 'New Sky',
  openGraph: {
    type: 'website',
    locale: 'vi_VN',
    url: siteUrl,
    siteName: 'New Sky',
    title: 'New Sky — Giải pháp đồng hành cùng nhà đầu tư nhà hàng',
    description: 'Gần 160 nhà hàng, 8 thương hiệu khắp cả nước. Đồng hành từ mặt bằng đến ngày quán vận hành có lãi.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'New Sky — Giải pháp đồng hành cùng nhà đầu tư nhà hàng',
    description: 'Gần 160 nhà hàng, 8 thương hiệu khắp cả nước.',
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
