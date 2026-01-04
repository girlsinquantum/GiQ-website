"use client";

import { useState } from "react";
import Image from "next/image";

export default function BlogCardCover({ src, alt }: { src?: string | null, alt: string }) {
  const [error, setError] = useState(false);

  if (!src || error) {
    return (
      <div className="w-full h-full bg-gradient-to-br from-[#48c0b2] to-[#2a8f85] flex items-center justify-center">
        <span className="opacity-70">
          <Image src="/logo.svg" alt="GiQ Logo" width={48} height={48} />
        </span>
      </div>
    );
  }

  return (
    <Image 
      src={src} 
      alt={alt}
      fill
      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      className="object-cover transition duration-700 group-hover:scale-105"
      onError={() => setError(true)}
    />
  );
}