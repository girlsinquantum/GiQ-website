'use client'
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function HackathonHero({ isLive }: { isLive: boolean }) {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0 });

  useEffect(() => {
    const target = new Date('2026-02-23T00:00:00-05:00').getTime();
    
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = target - now;
      
      if (distance < 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0 });
      } else {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
        });
      }
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-[85vh] flex flex-col items-center justify-center overflow-hidden bg-[#1e293b] pt-28 pb-12">
      {/* Subtle Grid Background */}
      <div className="absolute inset-0 opacity-10 pointer-events-none" 
        style={{ backgroundImage: 'radial-gradient(#48c0b2 1px, transparent 1px)', backgroundSize: '40px 40px' }}>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="z-10 text-center px-4 max-w-4xl"
      >
        <div className="inline-flex items-center gap-2 py-1 px-4 rounded-full bg-[#48c0b2]/10 border border-[#48c0b2]/30 text-[#48c0b2] text-xs font-mono mb-8 tracking-widest">
          <span className={`w-2 h-2 rounded-full ${isLive ? 'bg-red-500 animate-ping' : 'bg-[#48c0b2]'}`}></span>
          {isLive ? 'SYSTEM STATUS: LIVE' : 'REGISTRATION OPEN UNTIL FEB 20'}
        </div>
        
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter text-white mb-4">
          Q-Hackathon
          <span className="text-[#f7a6dc]">.2026</span>
        </h1>
        
        <p className="text-xl md:text-2xl text-[#d6b3e8] mb-10 font-light">
          Feb 23 - Mar 1 • Online • <span className="border-b border-dotted border-[#d6b3e8]">Competitive Selection</span>
        </p>

        {!isLive && (
          <div className="flex gap-6 justify-center items-center font-mono text-white mb-12">
            <CounterBox value={timeLeft.days} label="DAYS" color="border-[#f7a6dc]" shadow="shadow-[0_0_20px_rgba(247,166,220,0.3)]" />
            <span className="text-2xl opacity-50">:</span>
            <CounterBox value={timeLeft.hours} label="HOURS" color="border-[#48c0b2]" shadow="shadow-[0_0_20px_rgba(72,192,178,0.3)]" />
            <span className="text-2xl opacity-50 hidden md:inline">:</span>
            <CounterBox value={timeLeft.minutes} label="MINS" color="border-[#fde047]" shadow="shadow-[0_0_20px_rgba(253,224,71,0.3)]" className="hidden md:flex" />
          </div>
        )}

        <div className="flex flex-col md:flex-row gap-4 justify-center">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => document.getElementById('application-terminal')?.scrollIntoView({ behavior: 'smooth'})}
            className="bg-[#fde047] text-[#1e293b] px-8 py-4 text-lg font-bold rounded-sm uppercase tracking-widest hover:bg-white transition-all shadow-lg"
          >
            Start Application
          </motion.button>
          
          <motion.a
            href="#challenges"
            whileHover={{ scale: 1.05 }}
            className="bg-transparent border border-gray-600 text-gray-300 px-8 py-4 text-lg font-bold rounded-sm uppercase tracking-widest hover:border-[#48c0b2] hover:text-[#48c0b2] transition-all"
          >
            View Briefings
          </motion.a>
        </div>
      </motion.div>
    </section>
  );
}

interface CounterBoxProps {
  value: number;
  label: string;
  color: string;
  shadow: string;
  className?: string;
}

const CounterBox = ({ value, label, color, shadow, className = "" }: CounterBoxProps) => (
  <div className={`flex flex-col items-center ${className}`}>
    <span className={`text-3xl md:text-5xl font-bold bg-[#0f172a] px-4 py-3 rounded-lg border ${color} ${shadow} min-w-[80px]`}>
      {String(value).padStart(2, '0')}
    </span>
    <span className="text-xs mt-3 text-gray-400 tracking-widest">{label}</span>
  </div>
);