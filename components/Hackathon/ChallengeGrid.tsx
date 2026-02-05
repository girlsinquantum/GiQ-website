
import Image from 'next/image';
import { Lock, Cpu, TrendingUp, Zap, Heart, Globe } from 'lucide-react';

export default function ChallengeGrid() {
  return (
    <section id="challenges" className="py-24 bg-[#0f172a] text-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Official <span className="text-[#f7a6dc]">Directives</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Four distinct basis states. Choose your track. 
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 max-w-6xl mx-auto">
          
          {/* RIGETTI */}
          <ChallengeCard 
            track="Hardware Track"
            title="Energy Grid Optimization"
            trackColor="text-[#48c0b2]"
            borderColor="border-[#48c0b2]"
            icon={<Cpu className="text-[#48c0b2]" size={20} />}
            logo="/partners/rigetti.png"
            difficulty="Advanced"
          >
            <p className="text-gray-300 text-sm leading-relaxed mb-4">
              <strong className="text-white">Mission:</strong> Maximize the &quot;Power Energy Section&quot; (MPES) to prevent blackouts using Weighted Max-Cut problems on South Carolina&apos;s grid.
            </p>
            <div className="flex flex-wrap gap-2 mb-4">
              <Badge text="PyQuil" />
              <Badge text="QCS SDK" />
              <Badge text="QAOA" />
            </div>
            <div className="bg-yellow-500/10 border border-yellow-500/30 p-3 rounded flex gap-3 items-start mt-auto">
              <Lock size={16} className="text-yellow-500 mt-0.5 shrink-0" />
              <p className="text-xs text-yellow-100">
                <span className="font-bold block text-yellow-400">Access</span> 
                  84-qubit Ankaa-3 access limited to Top 10 teams. Others will use simulators.              </p>
            </div>
          </ChallengeCard>

          {/* CLASSIQ */}
          <ChallengeCard 
            track="Algorithm Track"
            title="Harmonic Oscillator"
            trackColor="text-[#fde047]"
            borderColor="border-[#fde047]"
            icon={<Zap className="text-[#fde047]" size={20} />}
            logo="/partners/classiq.png"
            difficulty="Intermediate/Advanced"
          >
            <p className="text-gray-300 text-sm leading-relaxed mb-4">
              <strong className="text-white">Mission:</strong> Solve Linear Differential Equations using the 2020 Tao Xin algorithm. Simulate kinetic/potential energies of a quantum harmonic oscillator.
            </p>
            <div className="flex flex-wrap gap-2 mb-4">
              <Badge text="Classiq Platform" />
              <Badge text="Jupyter" />
              <Badge text="Synthesis" />
            </div>
             <div className="bg-[#fde047]/10 border border-[#fde047]/30 p-3 rounded flex gap-3 items-start mt-auto">
               <div className="w-1 h-full bg-[#fde047] rounded-full"></div>
               <p className="text-xs text-yellow-100">
                  <span className="font-bold block text-[#fde047]">Focus</span>
                  Circuit depth analysis & resource efficiency optimization.
               </p>
            </div>
          </ChallengeCard>


          {/* QUANDELA */}
          <ChallengeCard 
            track="Finance / QML Track"
            title="Option Pricing"
            trackColor="text-[#60a5fa]"
            borderColor="border-[#60a5fa]"
            icon={<TrendingUp className="text-[#60a5fa]" size={20} />}
            logo="/partners/quandela.png"
            difficulty="Intermediate"
          >
            <p className="text-gray-300 text-sm leading-relaxed mb-4">
              <strong className="text-white">Mission:</strong> Implement a Quantum Machine Learning model using MerLin to predict put/call option prices. Train on historical data, test on live sets.
            </p>
            <div className="flex flex-wrap gap-2 mb-4">
              <Badge text="MerLin" />
              <Badge text="Python" />
              <Badge text="Reservoir Computing" />
            </div>
            <div className="bg-[#60a5fa]/10 border border-[#60a5fa]/30 p-3 rounded flex gap-3 items-start mt-auto">
               <div className="w-1 h-full bg-[#60a5fa] rounded-full"></div>
               <p className="text-xs text-blue-100">
                  <span className="font-bold block text-[#60a5fa]">Recommendation</span>
                  ML background preferred. Workshop available on MerLin usage.
               </p>
            </div>
          </ChallengeCard>


          {/* QUANTUM FOR GOOD */}
          <ChallengeCard 
            track="Social Impact Track"
            title="Quantum for Good"
            trackColor="text-[#f7a6dc]"
            borderColor="border-[#f7a6dc]"
            icon={<Heart className="text-[#f7a6dc]" size={20} />}
            logo="/logo.svg"
            difficulty="Beginner / Creative"
          >
            <p className="text-gray-300 text-sm leading-relaxed mb-4">
              <strong className="text-white">Mission:</strong> Design a quantum solution for a social cause. No coding experience required.
            </p>
            <div className="flex flex-wrap gap-2 mb-4">
              <Badge text="No-Code Tools" />
              <Badge text="Design Thinking" />
            </div>
            <div className="bg-[#f7a6dc]/10 border border-[#f7a6dc]/30 p-3 rounded flex gap-3 items-start mt-auto">
              <Globe size={16} className="text-[#f7a6dc] mt-0.5 shrink-0" />
              <p className="text-xs text-pink-100">
                <span className="font-bold block text-[#f7a6dc]">Open to All</span>
                High Schoolers & Beginners encouraged.
              </p>
            </div>
          </ChallengeCard>

        </div>
      </div>
    </section>
  );
}

// --- SUB COMPONENTS ---

const ChallengeCard = ({ 
  track, title, trackColor, borderColor, icon, logo, difficulty, children 
}: any) => (
  <div className={`flex flex-col h-full bg-[#1e293b] rounded-xl border border-gray-700 overflow-hidden hover:border-[${borderColor.replace('border-', '')}] transition-all duration-300 group`}>
    
    <div className={`bg-opacity-5 p-6 border-b border-gray-700 flex justify-between items-start gap-4 relative`} style={{ backgroundColor: trackColor.replace('text-', '') + '10' }}>
      <div className="flex-1">
         <div className={`font-mono text-[10px] md:text-xs font-bold uppercase tracking-widest mb-2 flex items-center gap-2 ${trackColor}`}>
            {icon} {track}
         </div>
         <h3 className="text-xl md:text-2xl font-bold text-white leading-tight">{title}</h3>
      </div>
      
      {/* SPONSOR BADGE */}
      <div className={`w-14 h-14 md:w-18 md:h-18 shrink-0 rounded-full bg-white border-2 ${borderColor} p-2 shadow-lg flex items-center justify-center overflow-hidden`}>
        <div className="relative w-full h-full">
           <Image src={logo} alt={title} fill className="object-contain" />
        </div>
      </div>
    </div>

    <div className="p-6 flex-col flex flex-grow">
      {children}
    </div>

    <div className="p-3 bg-[#0f172a] border-t border-gray-800 text-center">
      <span className="text-[10px] md:text-xs text-gray-500 font-mono uppercase tracking-widest">
        Difficulty: <span className="text-white">{difficulty}</span>
      </span>
    </div>
  </div>
);

const Badge = ({ text }: { text: string }) => (
  <span className="px-2 py-1 bg-[#0f172a] border border-gray-700 rounded text-[10px] md:text-xs text-gray-300 font-mono whitespace-nowrap">
    {text}
  </span>
);