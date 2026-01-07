import QuantumBackground from '@/components/Utilities/QuantumBackground';
import WorldImpact from '@/components/Utilities/WorldImpact';
import { WhatWeDo, StatsStrip} from '@/components/Utilities/HomeSections';
import SocialHub from '@/components/Utilities/SocialMedia';
import Link from 'next/link';
import Partners from '@/components/Utilities/Partners';
import Image from "next/image";

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      
      <section className="relative pt-32 pb-20 px-4 overflow-hidden min-h-[80vh] flex items-center">
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <QuantumBackground />
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-giq-light rounded-full blur-3xl opacity-20 translate-x-1/2 -translate-y-1/2" />
        </div>
        
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <h1 className="text-6xl md:text-8xl font-bold text-gray-900 mb-6 tracking-tight">
            The Future is <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-giq-main to-giq-purple">
              Quantum
            </span>
          </h1>
          <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed">
            We provide free educational resources to girls and students worldwide, 
            bridging the gap in the quantum computing field.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
             <Link href="https://docs.google.com/forms/d/e/1FAIpQLSeaFre-Ys_X-HrhBtjnnPemmggVYE_00RUEJ9DtGHlBSzY-2w/viewform" className="bg-giq-main text-white px-8 py-4 rounded-full font-bold text-lg shadow-lg hover:bg-giq-dark hover:scale-105 transition transform">
               Join Us
             </Link>
             <Link href="/resources" className="bg-white text-gray-800 border-2 border-gray-100 px-8 py-4 rounded-full font-bold text-lg hover:border-giq-main hover:text-giq-main transition transform">
               Explore Resources
             </Link>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
           <div className="relative">
             <div className="absolute inset-0 bg-giq-purple rounded-3xl rotate-3"></div>
             <Image 
               src="/media/group.png" 
               alt="GiQ Team" 
               width={600}
               height={400}
               className="relative w-full h-auto rounded-3xl shadow-xl rotate-[-2deg] hover:rotate-0 transition duration-500" 
             />
           </div>
           <div>
             <span className="text-giq-main font-bold tracking-widest uppercase text-sm">Our Purpose</span>
             <h2 className="text-4xl font-bold mt-2 mb-6">Democratizing Quantum Education</h2>
             <p className="text-gray-600 text-lg leading-relaxed mb-6">
               We want to bring opportunities to students around the world to collaborate and make an impact by strengthening their abilities and talents.
             </p>
             <div className="flex items-center gap-4">
               <Image 
                 src="/team/Elisa.png" 
                 width={48}
                 height={48}
                 className="rounded-full object-cover" 
                 alt="Elisa Torres Durney" 
               />
               <div>
                 <p className="font-bold text-gray-900">Elisa Torres Durney</p>
                 <p className="text-xs text-gray-500">Founder & CEO</p>
               </div>
             </div>
           </div>
        </div>
      </section>

      <WhatWeDo />
      <StatsStrip />
      <WorldImpact />
      <SocialHub />
      <Partners />
    </main>
  );
}