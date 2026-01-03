"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // these settings eliminate the "floaty" lag while maintaining smoothness
  const springConfig = { damping: 25, stiffness: 700, mass: 0.5 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  const [isVisible, setIsVisible] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    const checkTouch = () => {
      setIsTouchDevice(!window.matchMedia("(pointer: fine)").matches);
    };
    
    checkTouch();

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX - 20);
      cursorY.set(e.clientY - 20);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    if (!isTouchDevice) {
      window.addEventListener("mousemove", moveCursor);
      document.body.addEventListener("mouseleave", handleMouseLeave);
      document.body.addEventListener("mouseenter", handleMouseEnter);
      
      document.documentElement.style.cursor = "none";
    }

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      document.body.removeEventListener("mouseleave", handleMouseLeave);
      document.body.removeEventListener("mouseenter", handleMouseEnter);
      document.documentElement.style.cursor = "auto";
    };
  }, [cursorX, cursorY, isVisible, isTouchDevice]);

  if (isTouchDevice) return null;

  return (
    <motion.div
      className="fixed top-0 left-0 pointer-events-none z-[9999]"
      style={{
        x: cursorXSpring,
        y: cursorYSpring,
        opacity: isVisible ? 1 : 0,
        scale: isVisible ? 1 : 0,
      }}
      transition={{ opacity: { duration: 0.2 } }}
    >
      {/* 
         using <img> instead of Next.js <Image> here because 
         Next.js Image adds wrapper divs that can interfere with cursor centering.
      */}
      <img 
        src="/logo.svg" 
        alt="" 
        className="w-10 h-10 object-contain select-none"
        draggable="false"
      />
    </motion.div>
  );
}