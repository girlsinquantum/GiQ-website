"use client";

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed w-full z-50 bg-white/90 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          <Link href="/" className="flex items-center gap-2 md:gap-3 group">
            <div className="relative w-8 h-8 md:w-12 md:h-12 flex-shrink-0">
              <Image 
                src="/logo.svg" 
                alt="Girls in Quantum Logo" 
                fill 
                className="object-contain"
                priority 
              />
            </div>
            <div className="text-lg md:text-2xl font-bold text-giq-main tracking-tight group-hover:opacity-80 transition whitespace-nowrap">
              |Girls in Quantum⟩
            </div>
          </Link>

          <div className="hidden md:flex space-x-8 items-center">
             <Link href="/events" className="text-gray-600 hover:text-giq-main transition font-medium">Events</Link>
             <Link href="/blogs" className="text-gray-600 hover:text-giq-main transition font-medium">Blogs</Link>
             <Link href="/opportunities" className="text-gray-600 hover:text-giq-main transition font-medium">Opportunities</Link>
            <Link href="/resources" className="text-gray-600 hover:text-giq-main transition font-medium">Resources</Link>
            <Link href="/team" className="text-gray-600 hover:text-giq-main transition font-medium">Team</Link>
            <Link href="/join" className="bg-giq-main text-white px-5 py-2.5 rounded-full hover:bg-giq-dark transition font-medium shadow-md">
              Get In Touch!
            </Link>
          </div>

          <div className="md:hidden">
            <button 
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle Menu"
              className="p-2 text-gray-600 hover:text-giq-main"
            >
              {isOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-white border-b border-gray-100 flex flex-col p-4 space-y-4 shadow-xl">
          <Link href="/events" onClick={() => setIsOpen(false)} className="text-gray-600 text-lg py-2">Events</Link>
          <Link href="/blogs" onClick={() => setIsOpen(false)} className="text-gray-600 text-lg py-2">Blogs</Link>
          <Link href="/opportunities" className="text-gray-600 hover:text-giq-main transition font-medium">Opportunities</Link>
          <Link href="/resources" onClick={() => setIsOpen(false)} className="text-gray-600 text-lg py-2">Resources</Link>
          <Link href="/team" onClick={() => setIsOpen(false)} className="text-gray-600 text-lg py-2">Team</Link>
          <Link href="/join" onClick={() => setIsOpen(false)} className="bg-giq-main text-white text-center py-3 rounded-full font-medium">
            Join Us
          </Link>
        </div>
      )}
    </nav>
  );
}