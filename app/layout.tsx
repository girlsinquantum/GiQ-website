import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import CustomCursor from "@/components/Utilities/CustomCursor"; 
import Navbar from "@/components/Utilities/Navbar";
import ChatBot from "@/components/ChatBot/ChatBot";
import Footer from "@/components/Utilities/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Girls in Quantum",
  description: "Democratizing Quantum Education",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col bg-white`}
        suppressHydrationWarning
      >
        <CustomCursor />
        <Navbar />
        <ChatBot />
        
        <main className="flex-grow w-full relative">
           {children}
        </main>
        
        <Footer />
      </body>
    </html>
  );
}