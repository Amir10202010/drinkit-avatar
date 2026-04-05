import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Drinkit Avatar",
    template: "%s • Drinkit",
  },
  description: "Gamified loyalty app with avatar, rewards and mini-games",
  applicationName: "Drinkit Avatar",
  keywords: ["gamification", "loyalty", "avatar", "rewards", "mini-game"],
};

export const viewport: Viewport = {
  themeColor: "#0f172a",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru" className="h-full">
      <body
        className={`${inter.variable} min-h-full bg-slate-50 font-sans antialiased`}
      >
        <div className="flex min-h-screen flex-col">
          <main className="flex-1">{children}</main>
        </div>

        {/* Safe area for iOS bottom nav */}
        <div className="h-[env(safe-area-inset-bottom)] bg-transparent" />
      </body>
    </html>
  );
}