"use client";

import Image from "next/image";
import { useState } from "react";
import type { Advisor } from "@/components/Team/types";

function initials(name: string): string {
  return name
    .replace(/^(Prof\.\s*)?(Dr\.\s*)?/, "")
    .split(" ")
    .filter(Boolean)
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

export default function AdvisorAvatar({ advisor, size }: { advisor: Advisor; size: number }) {
  const [failed, setFailed] = useState(false);

  return (
    <span
      className="relative block shrink-0 overflow-hidden rounded-full border-[3px] border-white shadow-md"
      style={{ width: size, height: size }}
    >
      {advisor.image && !failed ? (
        <Image
          src={advisor.image}
          alt={advisor.name}
          fill
          sizes={`${size * 2}px`}
          className="object-cover"
          onError={() => setFailed(true)}
        />
      ) : (
        <span
          className="flex h-full w-full items-center justify-center bg-gradient-to-tr from-giq-main to-giq-deep font-bold tracking-widest text-white"
          style={{ fontSize: size / 3 }}
        >
          {initials(advisor.name)}
        </span>
      )}
    </span>
  );
}
