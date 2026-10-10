import { FooterShell } from "@/components/common/FooterShell";
import { Navbar } from "@/components/common/Navbar";
import { MediaModal } from "@/components/modals/MediaModal";
import { ModalUrlHandler } from "@/components/modals/ModalUrlHandler";
import { MediaModalProvider } from "@/components/modals/MediaModalContext";
import { QueryProvider } from "@/components/providers/QueryProvider";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Suspense } from "react";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CineStream — Watch Movies & TV Shows",
  description: "Cinematic streaming experience inspired by modern platforms.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full`}>
      <body className="min-h-full bg-surface-lowest antialiased">
        <QueryProvider>
          <MediaModalProvider>
            <Suspense fallback={null}>
              <Navbar />
            </Suspense>
            <main className="min-h-screen">{children}</main>
            <Suspense fallback={null}>
              <FooterShell />
            </Suspense>
            <Suspense fallback={null}>
              <ModalUrlHandler />
            </Suspense>
            <MediaModal />
          </MediaModalProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
