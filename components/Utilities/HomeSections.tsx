"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence, useInView, useMotionValue, useSpring } from "framer-motion";
import { Users, Lightbulb, Handshake } from "lucide-react";

const numberFormatter = new Intl.NumberFormat("en-US");

function Counter({ value }: { value: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  
  const motionValue = useMotionValue(0);
  
  const springValue = useSpring(motionValue, { 
    damping: 30, 
    stiffness: 100,
    mass: 1 
  });
  
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (isInView) {
      motionValue.set(value);
    }
  }, [isInView, value, motionValue]);

  useEffect(() => {
    const unsubscribe = springValue.on("change", (latest) => {
      if (ref.current) {
        ref.current.textContent = numberFormatter.format(Math.round(latest));
      }
    });
    
    return () => unsubscribe();
  }, [springValue]);

  return <span ref={ref} className="tabular-nums">0</span>;
}


function LanguageMatrix() {
  const [index, setIndex] = useState(0);
  
  const sets = [
    { tl: "ஆங்கிலம்", tr: "西班牙语", bl: "தமிழ்", br: "Mandarin" },
    { tl: "English", tr: "Spanish", bl: "Tamil", br: "中文" },
    { tl: "Inglés", tr: "Español", ta: "Támil", zh: "Chino" }
  ];

  useEffect(() => {
    const timer = setInterval(() => setIndex((prev) => (prev + 1) % sets.length), 3000);
    return () => clearInterval(timer);
  }, [sets.length]);

  return (
    <div className="grid grid-cols-2 gap-x-12 gap-y-8 min-w-[240px]">
      {Object.entries(sets[index]).map(([key, word]) => (
        <AnimatePresence mode="wait" key={key}>
          <motion.div
            key={word}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            className="text-center"
          >
            <span className="text-[#5a2d5f] font-bold text-lg">{word}</span>
          </motion.div>
        </AnimatePresence>
      ))}
    </div>
  );
}

export function StatsStrip() {
  return (
    <section className="py-24 bg-[#f3d7f9] relative overflow-hidden flex items-center justify-center min-h-[400px]">
      
      <div 
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)`,
          backgroundSize: '40px 40px'
        }}
      />

      <div className="max-w-7xl mx-auto px-4 w-full relative z-10">
        <div className="grid lg:grid-cols-3 gap-8 items-center">
          
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="text-center"
          >
            <h3 className="text-7xl font-bold text-white drop-shadow-[0_2px_4px_rgba(90,45,95,0.2)]">
              <Counter value={8500} />+
            </h3>
            <p className="text-[#5a2d5f]/70 font-bold tracking-[0.15em] uppercase text-[10px] mt-2">
              Students Impacted
            </p>
          </motion.div>

          <div className="flex flex-col items-center">
            <div className="bg-white/40 backdrop-blur-sm border border-white/60 px-12 py-10 rounded-[4rem] shadow-xl shadow-purple-500/5">
               <LanguageMatrix />
            </div>
            <p className="text-[#5a2d5f]/70 font-bold tracking-[0.15em] uppercase text-[10px] mt-6">
              Multilingual Resources
            </p>
          </div>

          <motion.div 
             initial={{ opacity: 0, x: 20 }}
             whileInView={{ opacity: 1, x: 0 }}
             className="text-center"
          >
            <h3 className="text-7xl font-bold text-white drop-shadow-[0_2px_4px_rgba(90,45,95,0.2)]">
              <Counter value={68} />
            </h3>
            <p className="text-[#5a2d5f]/70 font-bold tracking-[0.15em] uppercase text-[10px] mt-2">
              Countries Active
            </p>
          </motion.div>

        </div>
      </div>
    </section>
  );
}

export function WhatWeDo() {
  const items = [
    { icon: Lightbulb, title: "Inspire", desc: "Empowering girls to use quantum tech to solve global issues." },
    { icon: Users, title: "Connect", desc: "Building a network of diverse perspectives and ideas." },
    { icon: Handshake, title: "Collaborate", desc: "Partnering with companies to provide resources." },
  ];

    return (
    <section className="py-20 bg-white">
    <div className="max-w-7xl mx-auto px-4 text-center">
    <h2 className="text-4xl font-bold mb-16">What We <span className="text-giq-yellow">Do</span></h2>
    <div className="grid md:grid-cols-3 gap-10">
    {items.map((item, i) => (
    <motion.div
    key={i}
    whileHover={{ y: -10 }}
    className="p-8 rounded-3xl bg-gray-50 hover:bg-giq-light/30 transition border border-transparent hover:border-giq-main"
    >
    <item.icon className="w-16 h-16 mx-auto text-giq-blue mb-6" />
    <h3 className="text-2xl font-bold mb-4">{item.title}</h3>
    <p className="text-gray-600">{item.desc}</p>
    </motion.div>
    ))}
    </div>
    </div>
    </section>
    );
}
