import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Menuzin - Digital menus made simple",
  description: "Digital menus made simple. Premium digital menu solution for restaurants and cafés.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
