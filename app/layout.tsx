import type { Metadata } from "next";
import {Outfit } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";

const outfit = Outfit({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "WeWork",
  description: "A platoform for freelancers and clients",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${outfit.className}`}>
        {children}
        <Toaster richColors position="top-center" />
      </body>
    </html>
  );
}
