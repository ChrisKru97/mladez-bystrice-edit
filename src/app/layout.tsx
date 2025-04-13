import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Providers } from '@/components/providers';
import { MenuWrapper } from '@/components/navigation/menu-wrapper';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Songbook Editor',
  description: 'A simple editor for your Firestore songbook database',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <main className="min-h-screen p-4 md:p-8">
            {children}
          </main>
          <MenuWrapper />
        </Providers>
      </body>
    </html>
  );
}
