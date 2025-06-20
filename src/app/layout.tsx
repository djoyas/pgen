import { Analytics } from "@vercel/analytics/next";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

const siteUrl = "https://password.thimirathenuwara.com";
const authorName = "Thimira Madusanka Thenuwara";
const siteTitle = `Password Generator - Tools By ${authorName}`;
const siteDescription =
  "Generate secure, random passwords with customizable options including length, digits, letters, and symbols. A free tool to enhance your online security.";

export const metadata: Metadata = {
  title: siteTitle,
  description: siteDescription,
  authors: [{ name: authorName, url: siteUrl }],
  creator: authorName,
  publisher: authorName,
  keywords: [
    "password generator",
    "secure password",
    "random password",
    "Thimira Madusanka Thenuwara",
    "tools",
    "free tools",
    "online security",
  ],

  openGraph: {
    title: siteTitle,
    description: siteDescription,
    url: siteUrl,
    siteName: `Tools By ${authorName}`,
    images: [
      {
        url: `${siteUrl}/password-generator.webp`,
        width: 1200,
        height: 630,
        alt: "A preview image of the Password Generator tool",
      },
    ],
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
    creator: "@thimiraonline",
    images: [`${siteUrl}/password-generator.webp`],
  },

  metadataBase: new URL(siteUrl),
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: siteTitle,
    description: siteDescription,
    url: siteUrl,
    applicationCategory: "SecurityApplication",
    operatingSystem: "All",
    author: {
      "@type": "Person",
      name: authorName,
      url: siteUrl,
    },
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
  };

  return (
    <html lang="en">
      <head>
        <Analytics />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
