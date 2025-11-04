import Footer from '@/components/footer';
import Header from '@/components/header';
import '@/style/global.css';

import { Comfortaa, Montserrat } from 'next/font/google';

const comfortaa = Comfortaa({ subsets: ['latin'] });
const montserrat = Montserrat({ subsets: ['latin'] });

interface RootLayoutProps {
  children: React.ReactNode;
}

export default async function RootLayout({
  children,
}: RootLayoutProps) {
  return (
    <html >
      <body className={`${comfortaa.className} ${montserrat.className}`}>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
