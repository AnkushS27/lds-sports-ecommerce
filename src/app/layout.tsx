import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ConnectDatabase } from "@/db/db_connections/Connector";
import { SessionProvider } from "next-auth/react";
import { auth } from "@/auth";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "LDS Sports",
  description: "The Sports Website",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  return (
    <SessionProvider session={session}>

    <html lang="en">
        <body className={inter.className}>{children}</body>
    </html>
    </SessionProvider>
  );
}
