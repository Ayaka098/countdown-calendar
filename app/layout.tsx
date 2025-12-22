import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "嵐カウントダウンカレンダー",
  description: "嵐の活動終了日まであと何日？かわいい日めくりでチェック",
  icons: {
    icon: [
      { url: "/icon.png", sizes: "1024x1024", type: "image/png" },
      { url: "/icon.png", rel: "shortcut icon", sizes: "1024x1024" },
    ],
    apple: [{ url: "/icon.png", sizes: "1024x1024" }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/icon.png" sizes="any" />
        <link rel="apple-touch-icon" href="/icon.png" />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
