import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "GigShield — AI-Powered Income Protection for Delivery Partners",
  description:
    "Protect your earnings from weather disruptions, strikes, and environmental events. India's first parametric insurance platform built for gig economy workers with automated claims and instant payouts.",
  keywords:
    "gig insurance, delivery partner insurance, parametric insurance, income protection, weather insurance, Zomato, Swiggy, food delivery",
  authors: [{ name: "GigShield Team" }],
  openGraph: {
    title: "GigShield — AI-Powered Income Protection",
    description: "India's first parametric insurance for delivery partners",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
