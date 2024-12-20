import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import  Navbar  from "@/app/NavBar/NavBar";
import { Quicksand } from 'next/font/google'
const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

const quicksand = Quicksand({
  weight: '400',
  subsets: ['latin'],
})



export const metadata: Metadata = {
  title: "CrownedBrows&Lashes",
  description: "Lashed",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
      className={quicksand.className}
        /* className={`${geistSans.variable} ${geistMono.variable} antialiased`} */
      >
        {children}
      </body>
    </html>
  );
}
