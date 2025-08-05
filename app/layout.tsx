import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import "../styles/globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AppNest - Your Mobile App Showroom | Umidjon",
  description:
    "Discover beautiful and useful mobile apps crafted with care. Built by Umidjon, a mobile developer from Uzbekistan.",
  keywords: [
    "mobile apps",
    "React Native",
    "app development",
    "Uzbekistan developer",
    "mobile app portfolio",
  ],
  icons: {
    icon: "/logo.png",
  },
  authors: [{ name: "Umidjon" }],
  creator: "Umidjon",
  openGraph: {
    title: "AppNest - Your Mobile App Showroom",
    description: "Discover beautiful and useful mobile apps crafted with care",
    type: "website",
    locale: "en_US",
  },
  generator: "v0.dev",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange={false}
          storageKey="appnest-theme"
        >
          <div className="min-h-screen flex flex-col">
            <Navigation />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
