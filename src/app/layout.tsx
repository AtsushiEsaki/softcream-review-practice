import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Soft Cream Review",
  description: "ソフトクリームを6項目で評価するサイト",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className="min-h-screen bg-orange-50 text-gray-900">
        <main>{children}</main>
      </body>
    </html>
  );
}