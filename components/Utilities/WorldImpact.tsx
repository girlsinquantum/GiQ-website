"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { mapPins } from "@/data/content";
import Image from "next/image";

export default function WorldImpact() {
  // Track which pin is clicked
  const [activePin, setActivePin] = useState<number | null>(null);

  return (
    <section className="relative w-full py-24 bg-[#48C0B2] overflow-hidden text-white">
      
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <svg width="100%" height="100%">
          <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
            <path d="M 60 0 L 0 0 0 60" fill="none" stroke="white" strokeWidth="0.5" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 relative z-10 flex flex-col items-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-5xl md:text-6xl font-bold mb-4 text-center"
        >
          World Impact
        </motion.h2>

        <p className="text-xl mb-12 font-medium opacity-90 text-center">
          We are active in <span className="font-bold text-yellow-300">{mapPins.length} countries</span>
        </p>

        <div 
          className="relative w-full max-w-6xl aspect-[1.8/1] md:aspect-[2/1] bg-[#48C0B2] rounded-xl"
          // Clicking the background map closes any open tooltip
          onClick={() => setActivePin(null)}
        >
          
          <Image
            src="https://upload.wikimedia.org/wikipedia/commons/8/80/World_map_-_low_resolution.svg"
            alt="World Map"
            fill
            className="object-cover opacity-30 brightness-0 invert"
            draggable={false}
            unoptimized
          />
          <div className="absolute top-0 left-0 w-full h-5 md:h-28 bg-gradient-to-b from-[#48C0B2] to-transparent z-10 pointer-events-none" />

          {mapPins.map((pin, idx) => {
            const isActive = activePin === idx;

            return (
              <motion.div
                key={pin.code + idx}
                initial={{ scale: 0, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{
                  delay: Math.min(idx * 0.02, 2),
                  type: "spring",
                  stiffness: 260,
                  damping: 20,
                }}
                // If active, z-[100]. If not, z-30.
                // We keep 'hover:z-50' for desktop mouse users.
                className={`absolute -translate-x-1/2 -translate-y-1/2 group cursor-pointer ${
                  isActive ? "z-[100]" : "z-30 hover:z-50"
                }`}
                style={{ top: pin.top, left: pin.left }}
                onClick={(e) => {
                  e.stopPropagation(); // Stop click from reaching the map container
                  setActivePin(isActive ? null : idx);
                }}
              >
                <div className="absolute inset-0 rounded-full bg-white/40 blur-sm md:blur-md animate-pulse group-hover:bg-yellow-300/60" />

                <div className="relative w-4 h-4 sm:w-6 sm:h-6 md:w-7 md:h-7 rounded-full overflow-hidden border-[1px] md:border-2 border-giq-lavender shadow-lg transform group-hover:scale-150 group-hover:-translate-y-2 transition-all duration-300 bg-black">
                  <Image
                    src={`https://flagcdn.com/w80/${pin.code}.png`}
                    alt={pin.label}
                    fill
                    className="object-cover"
                    unoptimized
                  />
                </div>

                {/* Tooltip */}
                <div 
                  className={`
                    absolute -top-8 md:-top-10 left-1/2 -translate-x-1/2 
                    transition-opacity duration-200 bg-giq-dark backdrop-blur-sm 
                    text-giq-light text-[10px] md:text-xs font-bold px-2 py-1 
                    rounded-md whitespace-nowrap pointer-events-none shadow-xl 
                    border border-white/20 
                    ${isActive ? "opacity-100 block" : "opacity-0 group-hover:opacity-100"}
                  `}
                >
                  {pin.label}
                  <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-giq-light rotate-45"></div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}