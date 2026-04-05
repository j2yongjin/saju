import type { Metadata } from "next";
import "./globals.css";
import { PageShell } from "@/components/page-shell";

export const metadata: Metadata = {
  title: "Dongyangui Sinbiroun Unmyeong",
  description: "AI-assisted saju, romance, and career insights in one mobile-first experience.",
};

type RootLayoutProps = Readonly<{
  children: React.ReactNode;
}>;

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body>
        <PageShell>{children}</PageShell>
      </body>
    </html>
  );
}

