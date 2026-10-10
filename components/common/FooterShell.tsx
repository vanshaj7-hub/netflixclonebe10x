"use client";

import { Footer } from "@/components/common/Footer";
import { usePathname } from "next/navigation";

export function FooterShell() {
  const pathname = usePathname();
  if (pathname.startsWith("/watch/")) return null;
  return <Footer />;
}
