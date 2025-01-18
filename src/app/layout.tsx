import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import 'mapbox-gl/dist/mapbox-gl.css'

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Exclusive Africa Safaris",
  description: "Experience the magic of Africa with our exclusive, tailored safari experiences.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navigation />
        <main className="min-h-screen bg-white pt-16">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
