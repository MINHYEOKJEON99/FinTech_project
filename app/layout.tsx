import type { Metadata } from 'next';
import './globals.css';
import Nav from '@/components/layout/Nav';

export const metadata: Metadata = {
  title: 'Fintech Service',
  description: 'Fintech Service',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Nav />
        {children}
      </body>
    </html>
  );
}
