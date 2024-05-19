"use client";
import "./globals.css";
import { Providers } from "@/redux/providers";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-rose-50`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
