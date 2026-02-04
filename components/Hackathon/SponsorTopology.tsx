'use client'
import Image from 'next/image';
import { motion } from 'framer-motion';
import React from 'react';

interface HolographicCardProps {
  name: string;
  role: string;
  color: string;
  img: string;
  desc: string;
  glow: string;
  status: string;
  sysId: string;
}

export default function SponsorTopology() {
  return (
    <section className="py-24 bg-[#0b111a] relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-20%] left-[20%] w-[500px] h-[500px] bg-[#48c0b2]/10 rounded-full blur-[100px]"></div>
        <div className="absolute bottom-[-20%] right-[20%] w-[500px] h-[500px] bg-[#f7a6dc]/10 rounded-full blur-[100px]"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Technical <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#48c0b2] to-[#f7a6dc]">Topology</span>
          </h2>
          <p className="text-gray-400 font-mono text-sm tracking-widest uppercase">
            {'// Powered by Quantum Industry Leaders'}
          </p>
        </div>

        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          
          <HolographicCard 
            name="Rigetti Computing" 
            role="QPU Provider" 
            color="#48c0b2" 
            img="/partners/rigetti.png" 
            desc="Access the 84-qubit Ankaa-3 system."
            glow="shadow-[0_0_50px_rgba(72,192,178,0.2)]"
            status="COHERENCE_LOCKED"
            sysId="SYS.RG_84"
          />

          <HolographicCard 
            name="Quandela" 
            role="Photonic Platform" 
            color="#60a5fa" 
            img="/partners/quandela.png" 
            desc="QML finance via MerLin framework."
            glow="shadow-[0_0_50px_rgba(96,165,250,0.2)]"
            status="EMISSION_DETECTED"
            sysId="SYS.QN_PH"
          />

          <HolographicCard 
            name="Classiq" 
            role="Algorithm Software" 
            color="#fde047" 
            img="/partners/classiq.png" 
            desc="Synthesize circuits for differential equations."
            glow="shadow-[0_0_50px_rgba(253,224,71,0.2)]"
            status="OPTIMIZER_READY"
            sysId="SYS.CL_OS"
          />

        </div>
      </div>
    </section>
  );
}

const HolographicCard = ({ name, role, color, img, desc, glow, status, sysId }: HolographicCardProps) => {
  return (
    <motion.div 
      whileHover={{ y: -10 }}
      className={`relative group h-[420px] rounded-2xl bg-[#1e293b]/40 backdrop-blur-xl border border-gray-700/50 overflow-hidden flex flex-col items-center justify-center p-8 transition-all duration-500 hover:border-[${color}]`}
      style={{ borderColor: 'rgba(255,255,255,0.1)' }}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/5 to-transparent translate-y-[-100%] group-hover:translate-y-[100%] transition-transform duration-1000 ease-in-out pointer-events-none z-0"></div>
      
      <div className="absolute top-6 right-6 flex items-center gap-2">
        <div className={`w-1.5 h-1.5 rounded-full ${color === '#48c0b2' ? 'bg-[#48c0b2]' : color === '#60a5fa' ? 'bg-[#60a5fa]' : 'bg-[#fde047]'} animate-pulse`}></div>
        <span className="text-[9px] font-mono text-gray-400 uppercase tracking-widest group-hover:text-white transition-colors">
          {status}
        </span>
      </div>

      <div className={`relative z-10 w-44 h-44 mb-8 rounded-full bg-white flex items-center justify-center p-8 border-4 border-white/5 shadow-inner group-hover:scale-110 transition-transform duration-500 ${glow}`}>
        
        <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-40 transition-opacity duration-500 blur-xl" style={{ backgroundColor: color }}></div>
        
        <div className="relative w-full h-full">
           <Image 
             src={img} 
             alt={name} 
             fill 
             className="object-contain drop-shadow-sm" 
             sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
           />
        </div>
      </div>

      <div className="text-center z-10">
        <div className="font-mono text-xs font-bold uppercase tracking-widest mb-2 transition-colors duration-300 group-hover:text-white" style={{ color: color }}>
          {role}
        </div>
        <h3 className="text-2xl font-bold text-white mb-3 group-hover:tracking-wide transition-all duration-300">
          {name}
        </h3>
        <p className="text-gray-400 text-sm leading-relaxed max-w-[250px] mx-auto opacity-70 group-hover:opacity-100 transition-opacity">
          {desc}
        </p>
      </div>

      <div 
        className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-gray-700 to-transparent group-hover:via-[color]" 
        style={{ '--tw-gradient-via': color } as React.CSSProperties}
      ></div>
      
      <div className="absolute bottom-4 left-4 text-[10px] text-gray-700 font-mono group-hover:text-[color]" style={{ color: 'rgba(255,255,255,0.2)' }}>
        {sysId}
      </div>
    </motion.div>
  );
}