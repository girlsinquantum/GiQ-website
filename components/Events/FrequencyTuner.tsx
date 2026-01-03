"use client";

import { useRef, useState, useEffect } from "react";

interface Props {
  activeTag: string | null;
  onToggle: (tag: string | null) => void;
  tags: string[]; 
}

export default function FrequencyTuner({ activeTag, onToggle, tags }: Props) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(false);

  const checkScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setShowLeftArrow(scrollLeft > 10);
      setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 1);
    }
  };

  useEffect(() => {
    checkScroll();
    window.addEventListener("resize", checkScroll);
    return () => window.removeEventListener("resize", checkScroll);
  }, [tags]);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 200;
      scrollContainerRef.current.scrollBy({ 
        left: direction === 'left' ? -scrollAmount : scrollAmount, 
        behavior: 'smooth' 
      });
    }
  };

  const scrollToActive = (e: React.MouseEvent<HTMLButtonElement>) => {
    const container = scrollContainerRef.current;
    if (container) {
      const button = e.currentTarget;
      const scrollLeft = button.offsetLeft - (container.offsetWidth / 2) + (button.offsetWidth / 2);
      container.scrollTo({ left: scrollLeft, behavior: "smooth" });
    }
  };

  return (
    <div className="relative w-full max-w-4xl mx-auto mb-16 animate-in fade-in slide-in-from-top-4 duration-700 z-30">
      <div className="absolute inset-0 bg-giq-main/20 blur-2xl rounded-full opacity-0 md:opacity-50 pointer-events-none transform scale-y-75" />

      <div className="relative group bg-white/70 backdrop-blur-xl border border-white/40 rounded-2xl md:rounded-full shadow-xl shadow-giq-light/20">
        
        <button
          onClick={() => scroll('left')}
          className={`absolute left-2 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-white shadow-md border border-gray-100 text-giq-dark hover:scale-110 transition-all duration-300 hidden md:flex
            ${showLeftArrow ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'}
          `}
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
        </button>

        <button
          onClick={() => scroll('right')}
          className={`absolute right-2 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-white shadow-md border border-gray-100 text-giq-dark hover:scale-110 transition-all duration-300 hidden md:flex
            ${showRightArrow ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'}
          `}
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
        </button>

        <div 
          ref={scrollContainerRef}
          onScroll={checkScroll}
          className="flex items-center gap-2 p-2 overflow-x-auto no-scrollbar scroll-smooth snap-x snap-mandatory px-4 md:px-12"
        >
          <button
            onClick={(e) => { onToggle(null); scrollToActive(e); }}
            className={`flex-shrink-0 snap-center px-5 py-2.5 rounded-full text-sm font-bold transition-all duration-300 border whitespace-nowrap
              ${activeTag === null
                ? "bg-giq-dark text-white border-giq-mint shadow-lg scale-100"
                : "bg-transparent text-gray-500 border-transparent hover:bg-white/50 hover:text-gray-900"
              }`}
          >
            All Events
          </button>

          <div className="w-px h-6 bg-gray-300 mx-1 flex-shrink-0 opacity-50" />

          {tags.map((tag) => {
            const isActive = activeTag === tag;
            return (
              <button
                key={tag}
                onClick={(e) => { onToggle(isActive ? null : tag); scrollToActive(e); }}
                className={`flex-shrink-0 snap-center px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 border whitespace-nowrap flex items-center gap-2
                  ${isActive
                    ? "bg-giq-light/80 border-giq-main text-giq-dark shadow-[0_0_15px_rgba(72,192,178,0.3)]"
                    : "bg-transparent border-transparent text-gray-500 hover:bg-white/50 hover:text-giq-text"
                  }`}
              >
                {isActive && (
                  <span className="w-1.5 h-1.5 rounded-full bg-giq-main animate-pulse shadow-[0_0_5px_currentColor]" />
                )}
                {tag}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}