import Footer from '@/components/footer';
import Header from '@/components/header';
import '@/style/global.css';

import { Comfortaa, Montserrat } from 'next/font/google';

const comfortaa = Comfortaa({ subsets: ['latin'] });
const montserrat = Montserrat({ subsets: ['latin'] });

interface RootLayoutProps {
  children: React.ReactNode;
  params: { locale: string };
}

export default async function RootLayout({
  children,
  params,
}: RootLayoutProps) {
  // Асинхронне отримання параметра lang
  const { locale: lang } = await params;

  return (
    <html lang={lang}>
      <body className={`${comfortaa.className} ${montserrat.className}`}>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
