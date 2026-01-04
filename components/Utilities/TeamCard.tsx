"use client";
import Image from 'next/image';
import { Linkedin, ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';

type Person = {
  name: string;
  role: string;
  country?: string;
  image?: string;
  desc?: string; // Advisor bio
  bio?: string;  // Team bio
  linkedin?: string;
};

export default function TeamCard({ data, isAdvisor, index = 0 }: { data: Person, isAdvisor?: boolean,
  index?: number }) {
  const [imgError, setImgError] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const bioText = isAdvisor ? data.desc : (data.bio || "Passionate about Quantum Computing.");
  
  // A heuristic to decide if we even need a "Read More" button. 
  const isLongBio = bioText && bioText.length > 150;

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .slice(0, 2)
      .join("")
      .toUpperCase();
  };

  return (
    <div className="group relative w-full h-full">
      <div className="absolute inset-0 bg-gradient-to-br from-giq-main to-giq-purple rounded-3xl transform rotate-1 group-hover:rotate-3 transition-transform duration-300 opacity-20 group-hover:opacity-60"></div>

      <div className="relative bg-white/80 backdrop-blur-md border border-white/60 p-8 rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300 group-hover:-translate-y-1 h-full flex flex-col">
        
        <div className="relative mx-auto w-32 h-32 mb-6 shrink-0">
          <div className="absolute inset-0 bg-giq-main/30 rounded-full blur-xl group-hover:bg-giq-purple/30 transition-colors duration-500"></div>
          <div className="relative w-full h-full rounded-full overflow-hidden border-[3px] border-white shadow-inner">
            {!imgError && data.image ? (
              <Image 
                src={data.image} 
                alt={data.name} 
                fill 
                className="object-cover"
                onError={() => setImgError(true)} 
                sizes="(max-width: 768px) 150px, 150px"
                priority={index < 6}
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-tr from-[#48C0B2] to-[#4C1D95] flex items-center justify-center">
                <span className="text-white font-bold text-4xl tracking-widest drop-shadow-md">
                  {getInitials(data.name)}
                </span>
              </div>
            )}
          </div>
        </div>

        <div className="text-center flex-grow flex flex-col">
          <h3 className="text-2xl font-bold text-gray-900 leading-tight mb-2 group-hover:text-giq-dark transition-colors">
            {data.name}
          </h3>
          
          <p className="text-giq-main text-xs font-bold uppercase tracking-widest mb-3">
            {data.role}
          </p>

          {!isAdvisor && data.country && (
            <span className="inline-block bg-white border border-gray-200 text-gray-600 text-xs px-3 py-1 rounded-full mb-4 shadow-sm mx-auto">
              📍 {data.country}
            </span>
          )}
          

          <div className="relative">
            <p 
              className={`text-gray-600 text-sm leading-relaxed transition-all duration-300 ${
                isExpanded ? "line-clamp-none" : "line-clamp-4"
              }`}
            >
              {bioText}
            </p>
            
            {isLongBio && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setIsExpanded(!isExpanded);
                }}
                className="mt-2 text-[10px] font-bold uppercase tracking-wider text-giq-purple hover:text-giq-main flex items-center justify-center gap-1 mx-auto transition-colors focus:outline-none"
              >
                {isExpanded ? (
                  <>Show Less <ChevronUp size={12} /></>
                ) : (
                  <>Read More <ChevronDown size={12} /></>
                )}
              </button>
            )}
          </div>
        </div>

        {!isAdvisor && data.linkedin && (
          <div className="mt-6 pt-4 border-t border-gray-100 flex justify-center shrink-0">
            <a 
              href={data.linkedin} 
              target="_blank" 
              className="text-gray-400 hover:text-[#0077b5] hover:bg-blue-50 p-3 rounded-full transition-all"
            >
              <Linkedin size={22} />
            </a>
          </div>
        )}
      </div>
    </div>
  );
}