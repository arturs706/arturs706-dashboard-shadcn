// import type { Metadata } from "next";
import { Roboto } from 'next/font/google'
import "./globals.css";
import NavNew from '@/components/elements/nav/NavNew';
import NewMobileNav from '@/components/elements/mobile-nav/NewMobileNav';


const roboto = Roboto({
  weight: ['400', '700'],
  style: ['normal'],
  subsets: ['latin'],
  display: 'swap',
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
   <body
      className={`${roboto.className} antialiased`}
      >
        <NavNew/>
        <NewMobileNav/>
          {children}
      </body>
    </html>
  );
}
