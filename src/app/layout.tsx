import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "LOMBOK — Sportswear",
  description:
    "Engineered sportswear for the modern athlete. Minimal design, maximum performance.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://api.fontshare.com/v2/css?f[]=cabinet-grotesk@700,800,900&f[]=satoshi@400,500,600&display=swap"
          rel="stylesheet"
        />
        <script
          src="https://code.iconify.design/iconify-icon/1.0.7/iconify-icon.min.js"
          async
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
