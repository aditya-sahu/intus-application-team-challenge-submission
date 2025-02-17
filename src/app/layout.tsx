import type { Metadata } from "next";
import "@/app/ui/_styles/globals.css";
import Navbar from "@/app/ui/_components/Navbar";

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
