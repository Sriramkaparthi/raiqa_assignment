import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Raiqa Assignment - Meal Selection",
  description: "Browse and select meals from the menu.",
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
