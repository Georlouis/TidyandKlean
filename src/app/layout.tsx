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
  keywords: "professional cleaning services Florida, vacation rental cleaning, Airbnb turnover cleaning, move in out cleaners, deep cleaning Florida, Tidy and Klean, housekeeping services, residential commercial cleaners",
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
      <head>
        <link rel="preconnect" href="https://images.unsplash.com" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "CleaningService",
              "name": "Tidy & Klean",
              "image": "https://www.tidyandklean.com/logo.png",
              "@id": "https://www.tidyandklean.com",
              "url": "https://www.tidyandklean.com",
              "address": {
                "@type": "PostalAddress",
                "addressRegion": "FL",
                "addressCountry": "US"
              },
              "priceRange": "$$",
              "description": "Top-quality professional cleaning services in Florida. Specialized in deep cleaning, move-in/out, and vacation rental turnovers.",
              "areaServed": "Florida"
            })
          }}
        />
      </head>
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
