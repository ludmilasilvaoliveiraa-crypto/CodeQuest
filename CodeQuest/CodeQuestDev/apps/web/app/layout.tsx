import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { AuthProvider } from "@/components/auth/auth-provider";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
});

export const metadata: Metadata = {
  title: "CodeQuest - Aprenda HTML de forma divertida",
  description: "Domine HTML com lições interativas, quizzes gamificados, desafios e ranking. Aprenda programação web enquanto se diverte!",
  keywords: ["HTML", "programação", "quiz", "aprender", "código", "web development"],
  authors: [{ name: "CodeQuest Team" }],
  manifest: "/manifest.json",
  themeColor: "#10b981",
  viewport: "width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "CodeQuest",
  },
  openGraph: {
    title: "CodeQuest - Aprenda HTML de forma divertida",
    description: "Domine HTML com lições interativas, quizzes gamificados e desafios.",
    type: "website",
  },
  icons: {
    icon: "/icons/icon-192x192.png",
    apple: "/icons/icon-192x192.png",
  },
};


import { Navbar } from "@/components/layout/navbar";

import { BugReporter } from "@/components/bug-reporter";
import { FeatureRequester } from "@/components/feature-requester";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className="dark" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <AuthProvider>
          <Navbar />
          {children}
          <FeatureRequester />
          <BugReporter />
        </AuthProvider>
      </body>
    </html>
  );
}
