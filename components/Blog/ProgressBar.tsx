"use client";

import { useEffect, useState } from "react";

export default function ProgressBar() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollTop;
      const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      
      if (windowHeight === 0) return setProgress(0);

      const currentProgress = (totalScroll / windowHeight) * 100;
      setProgress(currentProgress);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    // z-40 ensures it is visible but below modals/dropdowns
    <div className="fixed top-20 left-0 w-full h-1.5 z-40 pointer-events-none bg-transparent">
      <div 
        className="h-full bg-gradient-to-r from-giq-main to-giq-purple transition-all duration-150 ease-out origin-left"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}