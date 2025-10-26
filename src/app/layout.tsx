import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "VietTutor - Gia sư Việt",
  description:
    "VietTutor - Nền tảng kết nối phụ huynh với gia sư số một Việt Nam.",
  openGraph: {
    images: [
      {
        url: "https://www.viettutors.cloud/og_image.jpg",
        width: 1200,
        height: 630,
        alt: "VietTutor - Gia sư Việt",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} antialiased`}>{children}</body>
      <Analytics />
    </html>
  );
}
