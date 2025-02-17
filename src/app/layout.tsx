import type { Metadata } from "next";
import { Mulish } from "next/font/google";
import "@/app/ui/_styles/globals.css";
import Navbar from "@/app/ui/_components/Navbar";

const mulish = Mulish({
  variable: "--font-mulish", // Custom CSS variable
  subsets: ["latin"],
  weight: "700", // Bold weight
  style: "normal", // Normal style
});

export const metadata: Metadata = {
  title: "CareHub",
  description: "For patients, with love.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-gray-50">
        <Navbar />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">{children}</main>
      </body>
    </html>
  );


}
