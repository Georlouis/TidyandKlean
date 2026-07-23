import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  metadataBase: new URL('https://www.tidyandklean.com'),
  title: "Tidy & Klean | Professional Cleaning Services in Florida",
  description: "Top-quality cleaning services in Florida. Deep clean, move-in/move-out, HSK departure clean, and more. Contact us today!",
  keywords: "cleaning services, Florida, deep clean, house keeping, Tidy & Klean",
  openGraph: {
    title: 'Tidy & Klean | Professional Cleaning Services',
    description: 'Top-quality cleaning services in Florida. Deep clean, move-in/move-out, and HSK departure clean.',
    url: 'https://www.tidyandklean.com',
    siteName: 'Tidy & Klean',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Tidy & Klean | Professional Cleaning',
    description: 'Top-quality cleaning services in Florida.',
  }
};

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans overflow-x-hidden">
        <Navbar />
        <main className="flex-grow pt-20">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
