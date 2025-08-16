import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
// import I18nProvider from "@/components/I18nProvider";
// import { createI18nInstance } from "@/i18n";

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
  // const i18n = await createI18nInstance(params.locale);

  return (
    <html lang={params.locale}>
      <body className={inter.className}>
        {/* 在此处粘贴您的 Google AdSense 代码 */}
        {/* <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6098511288909511" crossorigin="anonymous"></script> */}
        
        {children}

      </body>
    </html>
  );
}