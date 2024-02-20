import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ConnectDatabase } from "@/db/testing";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "LDS Sports",
  description: "The Sports Website",
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
