"use client";

import { useState, useEffect } from "react";

type Props = {
  tags: string[];
  variant?: "card" | "header";
};

export default function BlogTagCycler({ tags, variant = "card" }: Props) {
  const [index, setIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const safeTags = tags && tags.length > 0 ? tags : ["Blog"];

  useEffect(() => {
    if (safeTags.length <= 1) return;

    const interval = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => {
        setIndex((prev) => (prev + 1) % safeTags.length);
        setIsAnimating(false);
      }, 300);
    }, 1500);

    return () => clearInterval(interval);
  }, [safeTags.length]);

  const containerStyles =
    variant === "card"
      ? "absolute top-4 right-4 bg-giq-light backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-giq-deep shadow-sm z-10 border border-white/50"
      : "bg-giq-light text-giq-dark px-3 py-1 rounded-full text-xs font-bold tracking-widest uppercase shadow-sm inline-block";

  return (
    <div className={containerStyles}>
      <span
        className={`block transition-all duration-300 transform ${
          isAnimating
            ? "opacity-0 translate-y-2 scale-95 blur-sm"
            : "opacity-100 translate-y-0 scale-100 blur-0"
        }`}
      >
        {safeTags[index]}
      </span>
    </div>
  );
}