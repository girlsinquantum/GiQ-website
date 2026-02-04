
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
            Choose your basis. Each track has specific SDK requirements. 
            Review the briefings carefully before initializing your team.
          </p>
        </div>

        {/* CHANGED: grid-cols-3 -> grid-cols-2 for perfect symmetry with 4 tracks */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          
          {/* TRACK 1: RIGETTI */}
          <div className="flex flex-col h-full bg-[#1e293b] rounded-xl border border-[#48c0b2]/30 overflow-hidden hover:border-[#48c0b2] transition-colors group relative">
            <div className="bg-[#48c0b2]/10 p-6 border-b border-[#48c0b2]/20 flex justify-between items-start">
              <div>
                <div className="text-[#48c0b2] font-mono text-xs font-bold uppercase tracking-wider mb-2">Hardware Track</div>
                <h3 className="text-2xl font-bold text-white">Energy Grid Optimization</h3>
              </div>
              <Cpu className="text-[#48c0b2]" />
            </div>
            <div className="p-6 flex-grow space-y-4">
              <p className="text-gray-300 text-sm leading-relaxed">
                <strong className="text-white">The Mission:</strong> Maximize the &quot;Power Energy Section&quot; (MPES) to prevent blackouts using Weighted Max-Cut problems on South Carolina&apos;s grid.
              </p>
              <div className="flex flex-wrap gap-2 mt-2">
                <Badge text="PyQuil" />
                <Badge text="QCS SDK" />
                <Badge text="QAOA" />
              </div>
              <div className="bg-[#1e293b] border border-giq-dark p-3 rounded mt-4 flex gap-2">
                <Lock size={14} className="text-giq-main mt-0.5 shrink-0" />
                <p className="text-xs text-giq-mint">
                  <span className="font-bold">Access:</span> 84-qubit Ankaa-3 access limited to Top 10 teams. Others will use simulators.
                </p>
              </div>
            </div>
            <Footer difficulty="Advanced" />
          </div>

          {/* TRACK 2: CLASSIQ */}
          <div className="flex flex-col h-full bg-[#1e293b] rounded-xl border border-[#fde047]/30 overflow-hidden hover:border-[#fde047] transition-colors group">
            <div className="bg-[#fde047]/10 p-6 border-b border-[#fde047]/20 flex justify-between items-start">
              <div>
                <div className="text-[#fde047] font-mono text-xs font-bold uppercase tracking-wider mb-2">Algorithm Track</div>
                <h3 className="text-2xl font-bold text-white">Harmonic Oscillator</h3>
              </div>
              <Zap className="text-[#fde047]" />
            </div>
            <div className="p-6 flex-grow space-y-4">
              <p className="text-gray-300 text-sm leading-relaxed">
                <strong className="text-white">The Mission:</strong> Solve Linear Differential Equations using the 2020 Tao Xin algorithm. Simulate kinetic/potential energies of a quantum harmonic oscillator.
              </p>
              <div className="flex flex-wrap gap-2 mt-2">
                <Badge text="Classiq Platform" />
                <Badge text="Jupyter" />
                <Badge text="Synthesis" />
              </div>
              <div className="bg-[#fde047]/10 border border-[#fde047]/30 p-3 rounded mt-4">
                <p className="text-xs text-[#fde047]">
                  <span className="font-bold">Focus:</span> Circuit depth analysis & resource efficiency optimization.
                </p>
              </div>
            </div>
            <Footer difficulty="Advanced" />
          </div>

          {/* TRACK 3: QUANDELA */}
          <div className="flex flex-col h-full bg-[#1e293b] rounded-xl border border-[#60a5fa]/30 overflow-hidden hover:border-[#60a5fa] transition-colors group">
            <div className="bg-[#60a5fa]/10 p-6 border-b border-[#60a5fa]/20 flex justify-between items-start">
              <div>
                <div className="text-[#60a5fa] font-mono text-xs font-bold uppercase tracking-wider mb-2">Finance / QML Track</div>
                <h3 className="text-2xl font-bold text-white">Option Pricing</h3>
              </div>
              <TrendingUp className="text-[#60a5fa]" />
            </div>
            <div className="p-6 flex-grow space-y-4">
              <p className="text-gray-300 text-sm leading-relaxed">
                <strong className="text-white">The Mission:</strong> Implement a Quantum Machine Learning model using MerLin to predict put/call option prices. Train on historical data, test on live sets.
              </p>
              <div className="flex flex-wrap gap-2 mt-2">
                <Badge text="MerLin" />
                <Badge text="Python" />
                <Badge text="Reservoir Computing" />
              </div>
             <div className="bg-[#60a5fa]/10 border border-[#60a5fa]/30 p-3 rounded mt-4">
                <p className="text-xs text-[#93c5fd]">
                  <span className="font-bold">Recommendation:</span> ML background preferred. Workshop available on MerLin usage.
                </p>
              </div>
            </div>
            <Footer difficulty="Intermediate" />
          </div>

          {/* TRACK 4: QUANTUM FOR GOOD (Social Impact) - NEW */}
          <div className="flex flex-col h-full bg-[#1e293b] rounded-xl border border-[#f7a6dc]/30 overflow-hidden hover:border-[#f7a6dc] transition-colors group">
            <div className="bg-[#f7a6dc]/10 p-6 border-b border-[#f7a6dc]/20 flex justify-between items-start">
              <div>
                <div className="text-[#f7a6dc] font-mono text-xs font-bold uppercase tracking-wider mb-2">Social Impact Track</div>
                <h3 className="text-2xl font-bold text-white">Quantum for Good</h3>
              </div>
              <div className="flex gap-1">
                <Heart className="text-[#f7a6dc] fill-[#f7a6dc]/20" />
              </div>
            </div>
            <div className="p-6 flex-grow space-y-4">
              <p className="text-gray-300 text-sm leading-relaxed">
                <strong className="text-white">The Mission:</strong> Design a quantum solution for a social cause. Perfect for beginners and creative thinkers.
              </p>
              
              <div className="space-y-2">
                <div className="flex flex-wrap gap-2 mt-2">
                  
                  <Badge text="No-Code Tools" />
                </div>
              </div>

               <div className="bg-[#f7a6dc]/10 border border-[#f7a6dc]/30 p-3 rounded mt-4">
                <div className="flex items-center gap-2">
                  <Globe size={14} className="text-[#f7a6dc]" />
                  <p className="text-xs text-[#f7a6dc]">
                    <span className="font-bold">Open to All:</span> High Schoolers & Beginners encouraged.
                  </p>
                </div>
              </div>
            </div>
            <div className="p-4 bg-[#0f172a] border-t border-gray-800 text-center">
              <span className="text-xs text-gray-500 font-mono">Difficulty: Beginner / Creative</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

// Sub-components to keep code clean
const Badge = ({ text }: { text: string }) => (
  <span className="px-2 py-1 bg-[#0f172a] border border-gray-700 rounded text-xs text-gray-300 font-mono">
    {text}
  </span>
);

const Footer = ({ difficulty }: { difficulty: string }) => (
  <div className="p-4 bg-[#0f172a] border-t border-gray-800 text-center">
    <span className="text-xs text-gray-500 font-mono">Difficulty: {difficulty}</span>
  </div>
);