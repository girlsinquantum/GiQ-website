'use client'
import { useState, useEffect, useRef } from 'react';
import { Terminal, Check, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ApplicationTerminal() {
  const [step, setStep] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !hasStarted) {
        setHasStarted(true);
      }
    }, { threshold: 0.4 });
    
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, [hasStarted]);

  useEffect(() => {
    if (!hasStarted) return;
    if (step < 6) {
      const timeout = setTimeout(() => {
        setStep(prev => prev + 1);
      }, 700);
      return () => clearTimeout(timeout);
    }
  }, [hasStarted, step]);

  return (
    <section ref={sectionRef} id="application-terminal" className="py-24 bg-[#0a0f16] border-t border-gray-800 scroll-mt-20">
      <div className="container mx-auto px-4 max-w-3xl">
        
        <div className="text-center mb-10">
          <h2 className="text-2xl text-white font-bold mb-2">Ready to Initialize?</h2>
          <p className="text-gray-400 text-sm">Pre-flight system check for applicant: <span className="text-[#48c0b2]">GUEST_USER</span></p>
        </div>

        {/* Terminal Window */}
        <div className="w-full rounded-lg overflow-hidden shadow-2xl bg-[#0f172a] border border-gray-700 font-mono text-sm md:text-base">
          
          {/* Header */}
          <div className="bg-[#1e293b] p-3 flex items-center gap-4 border-b border-gray-700">
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-[#ff5f56]"></div>
              <div className="w-3 h-3 rounded-full bg-[#ffbd2e]"></div>
              <div className="w-3 h-3 rounded-full bg-[#27c93f]"></div>
            </div>
            <div className="flex items-center gap-2 text-gray-500 text-xs">
              <Terminal size={12} />
              <span>root@giq-mainframe</span>
            </div>
          </div>

          {/* Body */}
          <div className="p-8 min-h-[320px] flex flex-col">
            
            <div className="space-y-3 mb-6">
              <div className="text-gray-400">$ ./check_eligibility.sh</div>
              
              <div className="pl-4 space-y-2">
                <CheckLine label='Querying "Talent Pool Consent"...' active={step >= 1} />
                <CheckLine label='Verifying "Resume.pdf" format...' active={step >= 2} />
                <CheckLine label='Validating "Discord Username"...' active={step >= 3} />
                <CheckLine label='Analyzing "Proof of Work" (150 words)...' active={step >= 4} />
                <CheckLine label='Syncing "Team Name" hash...' active={step >= 5} />
              </div>

              {step >= 6 && (
                <div className="text-[#48c0b2] mt-6 animate-pulse">
                  {`>`} ALL SYSTEMS GO. PROTOCOL AUTHORIZED.
                </div>
              )}
            </div>

            {/* CTA Button */}
            <AnimatePresence>
              {step >= 6 && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-auto pt-4 border-t border-gray-800"
                >
                  <a 
                    href="https://forms.gle/X52s6MJVkdFa4FrR6" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full bg-[#fde047] hover:bg-[#fff7ed] text-[#1e293b] font-bold py-4 rounded flex items-center justify-center gap-3 transition-colors group"
                  >
                    <span>LAUNCH APPLICATION FORM</span>
                    <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                  </a>
                  <p className="text-center text-xs text-gray-500 mt-3">
                    *Redirects to Google Forms. Session ID: {new Date().getTime().toString(16)}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

          </div>
        </div>
      </div>
    </section>
  );
}

const CheckLine = ({ label, active }: { label: string, active: boolean }) => {
  if (!active) return null;
  return (
    <motion.div 
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      className="flex items-center gap-3 text-gray-300"
    >
      <Check size={14} className="text-[#48c0b2]" />
      <span>{label}</span>
    </motion.div>
  )
}