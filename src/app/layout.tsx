import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';

import { Toaster } from 'sonner';

import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export const metadata: Metadata = {
  title: 'YouApp',
  description: 'YouApp',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="flex h-[100vh] items-center justify-center overflow-hidden bg-black">
      <body
        className={`${inter.className} shadow-[0 0 10px rgba(0, 0, 0.5)] min-h-screen w-[500px] overflow-hidden bg-[#09141A] text-white`}
      >
        <Toaster />
        {children}
      </body>
    </html>
  );
}
