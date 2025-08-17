import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Real-Time Currency Converter & Calculator",
  description: "Instantly convert currencies and perform calculations with our free, real-time exchange rate tool.",
  keywords: "currency converter, exchange rate, calculator, finance, travel, real-time",
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
      <body className={inter.className}>
        {/* 在此处粘贴您的 Google AdSense 代码 */}
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6098511288909511" crossOrigin="anonymous"></script>
        
        {children}

      </body>
    </html>
  );
}