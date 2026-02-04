'use client'
import { motion } from 'framer-motion';
import Image from 'next/image';

const TEAM = [
  { 
    name: "Nafisa", 
    role: "Lead Organizer", 
    img: "/team/Nafisa.jpg",
    color: "border-[#f7a6dc]" // Purple
  },
  { 
    name: "Elisa", 
    role: "Communications", 
    img: "/team/Elisa.png",
    color: "border-[#48c0b2]" // Teal
  },
  { 
    name: "Sophia", 
    role: "Social Media", 
    img: "/team/Sophia.jpg",
    color: "border-[#fde047]" // Yellow
  },
  { 
    name: "Arife", 
    role: "Graphics & Design", 
    img: "/team/Arife.png",
    color: "border-[#60a5fa]" // Blue
  },
  { 
    name: "Maria", 
    role: "Graphics & Design", 
    img: "/team/Maria.png",
    color: "border-[#60a5fa]" // Blue
  },
  { 
    name: "Dhruv", 
    role: "Registrant Relations", 
    img: "/team/Dhruv.png",
    color: "border-[#48c0b2]" // Teal
  },
];

export default function HackathonTeam() {
  return (
    <section className="py-24 bg-[#1e293b] border-t border-gray-800">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-white mb-2">
            Organizing <span className="text-[#48c0b2]">Team</span>
          </h2>
          <p className="text-gray-400 font-mono text-sm">
            The core team behind the hackathon.
          </p>
        </div>

        {/* 2x3 Grid Layout */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 lg:gap-8 max-w-5xl mx-auto">
          {TEAM.map((member, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              viewport={{ once: true }}
              className={`group bg-[#0f172a] rounded-xl p-6 border border-gray-800 hover:bg-[#152035] transition-all duration-300 relative overflow-hidden`}
            >
              {/* Top Accent Line */}
              <div className={`absolute top-0 left-0 w-full h-1 ${member.color.replace('border', 'bg')} opacity-50 group-hover:opacity-100 transition-opacity`}></div>

              <div className="flex flex-col items-center text-center">
                {/* Image Container */}
                <div className={`relative w-24 h-24 mb-4 rounded-full border-2 ${member.color} p-1`}>
                  <div className="relative w-full h-full rounded-full overflow-hidden bg-gray-800">
                    <Image 
                      src={member.img} 
                      alt={member.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                      sizes="(max-width: 768px) 100px, 150px"
                    />
                  </div>
                </div>
                
                <h3 className="text-white font-bold text-lg mb-1 group-hover:text-[#e0f7fa] transition-colors">
                  {member.name}
                </h3>
                
                <div className="text-xs text-gray-400 font-mono uppercase tracking-wider bg-[#1e293b] px-2 py-1 rounded">
                  {member.role}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}