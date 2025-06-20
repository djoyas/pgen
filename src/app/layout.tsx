import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

// Setup the Inter font
const inter = Inter({ subsets: ["latin"] });

// Define SEO metadata
export const metadata: Metadata = {
  title: "Password Generator - Tools By Thimira Madusanka Thenuwara",
  description:
    "Generate secure, random passwords with customizable options including length, digits, letters, and symbols. A free tool to enhance your online security.",
  authors: [{ name: "Thimira Madusanka Thenuwara" }],
  keywords: [
    "password generator",
    "secure password",
    "random password",
    "Thimira Madusanka Thenuwara",
    "tools",
  ],
  // Add other relevant metadata here
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
