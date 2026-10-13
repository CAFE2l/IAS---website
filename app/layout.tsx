import './globals.css';
import { Inter } from 'next/font/google';
import { DM_Serif_Display } from 'next/font/google';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  weight: ['400', '500', '600', '700'],
  display: 'swap',
});

const dmSerif = DM_Serif_Display({
  subsets: ['latin'],
  variable: '--font-dm-serif',
  weight: ['400'],
  display: 'swap',
  style: 'normal',
});

export const metadata = {
  title: 'Instituto de Aprendizado Social',
  description: 'Um ponto de encontro para transformar conhecimento em experiência, conectar pessoas e construir possibilidades por meio da colaboração.',
  keywords: 'aprendizado, colaboração, educação, inovação social, comunidade',
  icons: {
    icon: '/favicon.png',
    apple: '/favicon.png',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className={`${inter.variable} ${dmSerif.variable} scroll-smooth`}>
      <head />
      <body className="bg-ivory text-navy-900 font-sans antialiased">
        {children}
      </body>
    </html>
  );
}