import './globals.css';
import type {Metadata} from 'next';
import {Roboto} from 'next/font/google';

const roboto = Roboto({
  weight: ['400', '500', '700'],
  subsets: ['latin', 'vietnamese'],
  display: 'swap',
  variable: '--font-roboto',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://aladdin-jsc.com'),
  title: {
    default: 'ALADDIN JSC — Hệ sinh thái F&B Việt Nam',
    template: '%s — ALADDIN JSC',
  },
  description:
    'ALADDIN JSC — đơn vị thi công & quản lý chuỗi nhà hàng, cafe chuyên nghiệp tại Việt Nam. Thiết kế, xây dựng và vận hành hệ sinh thái F&B từ A-Z.',
  keywords: ['thi công nhà hàng', 'thiết kế quán cafe', 'F&B Việt Nam', 'chuỗi nhà hàng', 'ALADDIN JSC'],
  authors: [{name: 'ALADDIN JSC', url: 'https://aladdin-jsc.com'}],
  creator: 'ALADDIN JSC',
  openGraph: {
    type: 'website',
    locale: 'vi_VN',
    alternateLocale: 'en_US',
    url: 'https://aladdin-jsc.com',
    siteName: 'ALADDIN JSC',
    title: 'ALADDIN JSC — Hệ sinh thái F&B Việt Nam',
    description: 'Thi công & quản lý chuỗi nhà hàng, cafe chuyên nghiệp tại Việt Nam.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ALADDIN JSC — Hệ sinh thái F&B Việt Nam',
    description: 'Thi công & quản lý chuỗi nhà hàng, cafe chuyên nghiệp tại Việt Nam.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {index: true, follow: true},
  },
};

export default function RootLayout({children}: Readonly<{children: React.ReactNode}>) {
  return (
    <html lang="vi" className={roboto.variable}>
      <body className={roboto.variable}>{children}</body>
    </html>
  );
}

