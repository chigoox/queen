import type { Metadata } from "next";
import { Quicksand } from 'next/font/google';
import localFont from "next/font/local";
import "./globals.css";
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
  title: "Boox",
  description: "Free online appointment scheduling",
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
