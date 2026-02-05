"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X, Terminal, Sparkles } from 'lucide-react';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (pathname && pathname.startsWith("/studio")) return null;

  const isHackathon = pathname === "/hackathon";

  const navClasses = isHackathon 
    ? `fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-[#0f172a]/95 shadow-[0_4px_30px_rgba(0,0,0,0.5)] border-b border-[#48c0b2]/30 py-2' : 'bg-transparent py-4'}`
    : `fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white/90 shadow-sm py-2' : 'bg-transparent py-4'}`;

  const textClasses = isHackathon ? "text-gray-300 hover:text-white" : "text-gray-600 hover:text-giq-main";

  return (
    <nav className={`${navClasses} backdrop-blur-md`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative w-10 h-10 flex-shrink-0 transition-transform group-hover:scale-110 duration-500">
              <Image 
                src="/logo.svg" 
                alt="Girls in Quantum Logo" 
                fill 
                className="object-contain"
                priority 
              />
            </div>
            <div className={`text-xl md:text-2xl font-bold tracking-tight whitespace-nowrap transition-all ${isHackathon ? "text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]" : "text-giq-main"}`}>
              Girls in Quantum
            </div>
          </Link>

          <div className="hidden md:flex space-x-8 items-center">
             <Link 
                href="/hackathon" 
                className={`relative px-4 py-2 rounded-lg font-bold transition-all duration-300 flex items-center gap-2
                  ${isHackathon 
                    ? "bg-[#fde047]/10 text-[#fde047] border border-[#fde047]/50 shadow-[0_0_15px_rgba(253,224,71,0.2)]" 
                    : "text-giq-purple hover:text-giq-deep hover:bg-purple-50"
                }`}
             >
                {isHackathon ? <Terminal size={16} /> : <Sparkles size={16} />}
                Q-volution 2026
                {/* Status Dot */}
                <span className="absolute top-0 right-0 -mt-1 -mr-1 flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                </span>
             </Link>

             <Link href="/events" className={`${textClasses} transition font-medium text-sm lg:text-base`}>Events</Link>
             <Link href="/blogs" className={`${textClasses} transition font-medium text-sm lg:text-base`}>Blogs</Link>
       { /*    <Link href="/opportunities" className={`${textClasses} transition font-medium text-sm lg:text-base`}>Opportunities</Link> */ }
             <Link href="/resources" className={`${textClasses} transition font-medium text-sm lg:text-base`}>Resources</Link>
             <Link href="/team" className={`${textClasses} transition font-medium text-sm lg:text-base`}>Team</Link>
             
             <Link href="https://docs.google.com/forms/d/e/1FAIpQLSeaFre-Ys_X-HrhBtjnnPemmggVYE_00RUEJ9DtGHlBSzY-2w/viewform" 
               className="bg-[#48c0b2] hover:bg-[#2a8f85] text-white px-6 py-2 rounded-full transition-all transform hover:scale-105 shadow-lg font-bold text-sm">
              Join Us
            </Link>
          </div>

           <div className="md:hidden">
            <button 
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle Menu"
              className={`p-2 transition ${textClasses}`}
            >
              {isOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
            </button>
          </div>
        </div>
      </div>
      
       {isOpen && (
        <div className={`md:hidden flex flex-col p-4 space-y-4 shadow-xl border-b ${isHackathon ? "bg-[#1e293b] border-gray-800" : "bg-white border-gray-100"}`}>
           <Link 
              href="/hackathon" 
              onClick={() => setIsOpen(false)} 
              className="text-[#fde047] font-bold text-lg py-2 flex items-center gap-2 border-b border-gray-700/50"
            >
              <Terminal size={20} />
              Q-volution Hackathon
           </Link>
          <Link href="/events" onClick={() => setIsOpen(false)} className={`${textClasses} text-lg py-2`}>Events</Link>
          <Link href="/blogs" onClick={() => setIsOpen(false)} className={`${textClasses} text-lg py-2`}>Blogs</Link>
 { /*      <Link href="/opportunities" onClick={() => setIsOpen(false)} className={`${textClasses} text-lg py-2`}>Opportunities</Link> */ }
          <Link href="/resources" onClick={() => setIsOpen(false)} className={`${textClasses} text-lg py-2`}>Resources</Link>
          <Link href="/team" onClick={() => setIsOpen(false)} className={`${textClasses} text-lg py-2`}>Team</Link>
          <Link href="https://docs.google.com/forms/d/e/1FAIpQLSeaFre-Ys_X-HrhBtjnnPemmggVYE_00RUEJ9DtGHlBSzY-2w/viewform" onClick={() => setIsOpen(false)} className="bg-giq-main text-white text-center py-3 rounded-full font-medium">
            Become a Member!
          </Link>
        </div>
      )}
    </nav>
  );
}