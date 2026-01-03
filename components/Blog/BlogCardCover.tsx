"use client";

import { useState } from "react";

export default function BlogCardCover({ src, alt }: { src?: string | null, alt: string }) {
  const [error, setError] = useState(false);

  if (!src || error) {
    return (
      <div className="w-full h-full bg-gradient-to-br from-[#48c0b2] to-[#2a8f85] flex items-center justify-center">
        <span className="text-4xl opacity-70"><img src="/logo.svg"/></span>
      </div>
    );
  }

  return (
    <img 
      src={src} 
      alt={alt}
      className="w-full h-full object-cover transition duration-700 group-hover:scale-105"
      onError={() => setError(true)}
    />
  );
}