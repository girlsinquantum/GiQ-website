'use client'
import { motion } from 'framer-motion';

export default function CircuitTimeline() {
  const steps = [
    { 
      date: "Jan 18 - Feb 20", 
      title: "Application Window", 
      desc: "Submit your resume & proof of work. Top 10 teams selected for Rigetti Hardware.", 
      active: true 
    },
    { 
      date: "Feb 23 (Mon)", 
      title: "Bootcamp Day 1", 
      desc: "Keynote: Maria Salatino (Rigetti) on 'My STEM Journey'.", 
      sub: "Evening (ET)",
      active: false 
    },
    { 
      date: "Pending", 
      title: "Bootcamp Day 2", 
      desc: "Workshop: Cassandre Notton (Quandela) on 'QML with MerLin'.", 
      sub: "Afternoon (Europe)",
      active: false 
    },
    { 
      date: "Feb 26", 
      title: "Sprint Start", 
      desc: "Challenges Unlock. Hardware access codes distributed.", 
      active: false 
    },
    { 
      date: "Mar 1", 
      title: "Submission", 
      desc: "Project upload deadline. Judging begins.", 
      active: false 
    },
  ];

  return (
    <section className="py-24 bg-[#1e293b] relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-2 text-center">
          Event <span className="text-[#48c0b2]">Timeline</span>
        </h2>

        <div className="relative max-w-7xl mx-auto">
          <div className="absolute 
            left-8 top-0 bottom-0 w-0.5 bg-gray-700 
            lg:top-12 lg:left-0 lg:right-0 lg:w-full lg:h-0.5 lg:bottom-auto
            -z-10" 
          />
          
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-4">
            {steps.map((step, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="flex lg:flex-col items-start lg:items-center relative pl-20 lg:pl-0 group"
              >
                <div className={`
                  absolute left-6 lg:left-1/2 lg:-translate-x-1/2 lg:top-10
                  w-4 h-4 rounded-full border-2 z-10 bg-[#1e293b] transition-all duration-300
                  ${step.active 
                    ? 'border-[#fde047] bg-[#fde047] shadow-[0_0_15px_#fde047]' 
                    : 'border-gray-500 group-hover:border-[#f7a6dc] group-hover:scale-125'}
                `}></div>

                <div className="lg:hidden absolute left-8 top-4 bottom-[-48px] w-0.5 bg-gray-800 last:hidden"></div>

                <div className="lg:mt-20 text-left lg:text-center w-full">
                  <div className="inline-block px-2 py-0.5 rounded border border-gray-700 bg-[#0f172a] text-[10px] font-mono text-gray-400 mb-2">
                    {step.date}
                  </div>
                  <h4 className="text-white font-bold text-lg leading-tight group-hover:text-[#48c0b2] transition-colors">
                    {step.title}
                  </h4>
                  <p className="text-gray-400 text-sm mt-2 leading-relaxed text-balance">
                    {step.desc}
                  </p>
                  {step.sub && (
                    <span className="text-[#f7a6dc] text-xs font-mono mt-1 block">{step.sub}</span>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}