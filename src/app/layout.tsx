import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import I18nProvider from "@/components/I18nProvider";
import Script from "next/script";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Real-time exchange rate conversion and calculator",
  description: "Provides real-time exchange rate conversion for a variety of major international currencies, such as USD, EUR, JPY, GBP, and CNY.",
  keywords: "exchange rate, currency converter, forex, calculator, real-time, USD, EUR, JPY,GBP, CNY",
};


export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  return (
    <html lang={params.locale}>
      <Script
        async
        src=
"https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6098511288909511"
        crossOrigin="anonymous"
        strategy="afterInteractive"
      />
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
}