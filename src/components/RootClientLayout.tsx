'use client';

import { Geist, Geist_Mono } from "next/font/google";
import Providers from "@/components/Providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <body
      className={`${geistSans.variable} ${geistMono.variable} antialiased`}
    >
      <Providers>{children}</Providers>
    </body>
  );
} 