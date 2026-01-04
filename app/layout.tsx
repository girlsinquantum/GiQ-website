import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import NextTopLoader from "nextjs-toploader"; 
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
          <NextTopLoader
          color="#f7a6dc"
          initialPosition={0.08}
          crawlSpeed={200}
          height={8}
          crawl={true}
          showSpinner={false} // We don't want a spinner in the corner, it's old school
          easing="ease"
          speed={200}
          template='<div class="bar" role="bar"><div class="peg"></div></div> 
          <div class="spinner" role="spinner"><div class="spinner-icon"></div></div>'
          zIndex={9999}
        />
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