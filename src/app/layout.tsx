import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';

import { Toaster } from 'sonner';

import { AuthGuard } from '@/hooks/useAuth';

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
    <html lang="en" className="flex min-h-[100vh] items-center justify-center bg-black">
      <body
        className={`${inter.className} shadow-[0 0 10px rgba(0, 0, 0.5)] min-h-screen w-[500px] overflow-x-hidden bg-[#09141A] text-white`}
      >
        <Toaster />
        <AuthGuard>{children}</AuthGuard>
      </body>
    </html>
  );
}
