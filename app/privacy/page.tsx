import type { Metadata } from "next";
import { Caveat, Space_Grotesk, Inter } from "next/font/google";

const caveat = Caveat({ subsets: ["latin"], weight: ["400", "700"] });
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], weight: ["700"] });
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Privacy Policy | Girls in Quantum",
  description: "How we handle your data and privacy.",
};

export default function PrivacyPage() {
  return (
    <main className={`min-h-screen relative overflow-hidden bg-gradient-to-br from-giq-mint via-giq-main to-giq-purple pt-32 pb-20 px-4 ${inter.className}`}>
      
      <div className="absolute top-20 left-10 w-64 h-64 bg-[#48c0b2] rounded-full mix-blend-multiply filter blur-[128px] opacity-20 animate-pulse" />
      <div className="absolute bottom-20 right-10 w-64 h-64 bg-[#fde047] rounded-full mix-blend-multiply filter blur-[128px] opacity-20" />

      <div className="relative max-w-3xl mx-auto transform rotate-1 transition-transform hover:rotate-0 duration-500 ease-out">
        
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-32 h-8 bg-[#fde047]/80 shadow-sm transform -rotate-2 z-20 backdrop-blur-sm" />

        <div className="bg-[#fcfbf9] relative shadow-[0_20px_50px_rgba(0,0,0,0.3)] rounded-sm p-8 md:p-16 border-l-4 border-[#2a8f85]/30">
          
          <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[linear-gradient(to_right,#000_1px,transparent_1px),linear-gradient(to_bottom,#000_1px,transparent_1px)] bg-[size:24px_24px]" />

          <div className="relative z-10 text-center mb-12 border-b-2 border-dashed border-gray-200 pb-8">
            <span className={`${caveat.className} text-2xl text-[#2a8f85] block -rotate-3 mb-2`}>
              Confidential Data
            </span>
            <h1 className={`${spaceGrotesk.className} text-5xl md:text-6xl font-bold text-[#1e293b] tracking-tight`}>
              Privacy Policy
            </h1>
            <p className="mt-4 text-gray-500 font-mono text-sm uppercase tracking-widest">
              Last Updated: <span className="text-[#2a8f85] font-bold">January 2026</span>
            </p>
          </div>

          <div className="prose prose-lg prose-slate max-w-none 
            prose-headings:font-bold prose-headings:text-[#0f172a] 
            prose-p:text-gray-600 prose-p:leading-relaxed
            prose-li:text-gray-600
            prose-strong:text-[#2a8f85]
          ">
            <p className="lead text-xl text-gray-700 italic border-l-4 border-[#fde047] pl-4">
              At Girls in Quantum, we prioritize your privacy. Think of your data like a delicate quantum state; we observe it with care and protect it from decoherence (unauthorized access).
            </p>

            <h3 className={`${spaceGrotesk.className} text-2xl mt-10 flex items-center gap-3`}>
              <span className="flex items-center justify-center w-8 h-8 rounded-full bg-[#e0f7fa] text-[#2a8f85] text-sm">01</span>
              Information We Collect
            </h3>
            <p>We may collect personal information such as your name and email address when you:</p>
            <ul className="list-disc pl-5 space-y-2 marker:text-[#2a8f85]">
              <li>Register for events.</li>
              <li>Apply for scholarships or ambassador programs.</li>
              <li>Subscribe to our <strong>"Stay Entangled"</strong> newsletter.</li>
            </ul>

            <h3 className={`${spaceGrotesk.className} text-2xl mt-10 flex items-center gap-3`}>
              <span className="flex items-center justify-center w-8 h-8 rounded-full bg-[#e0f7fa] text-[#2a8f85] text-sm">02</span>
              How We Use Your Information
            </h3>
            <p>We use your data solely to:</p>
            <ul className="list-disc pl-5 space-y-2 marker:text-[#2a8f85]">
              <li>Deliver educational content and community updates.</li>
              <li>Manage event registrations and attendance.</li>
              <li>Improve our website functionality and user experience.</li>
            </ul>

            <h3 className={`${spaceGrotesk.className} text-2xl mt-12 flex items-center gap-3`}>
                          <span className="flex items-center justify-center w-8 h-8 rounded-full bg-[#e0f7fa] text-[#2a8f85] text-sm">03</span>
                          Data Protection
                        </h3>
                        
                        <div className="relative mt-6">

                            <div className={`${caveat.className} absolute right-0 -top-8 text-[#2a8f85] text-xl md:text-2xl -rotate-2 hidden md:block opacity-90 pointer-events-none`}>
                                We take this super seriously!
                            </div>
                            
                            <p>
                            We implement security measures to maintain the safety of your personal information. We do not sell, trade, or otherwise transfer your personally identifiable information to outside parties without your consent, except to trusted third parties who assist us in operating our website.
                            </p>
                        </div>

            <h3 className={`${spaceGrotesk.className} text-2xl mt-10 flex items-center gap-3`}>
               <span className="flex items-center justify-center w-8 h-8 rounded-full bg-[#e0f7fa] text-[#2a8f85] text-sm">04</span>
               Cookies
            </h3>
            <p>
              Our website uses standard cookies to enhance your browsing experience. You can choose to disable cookies through your browser settings, though it might collapse the wavefunction of some site features.
            </p>

            <h3 className={`${spaceGrotesk.className} text-2xl mt-10 flex items-center gap-3`}>
               <span className="flex items-center justify-center w-8 h-8 rounded-full bg-[#e0f7fa] text-[#2a8f85] text-sm">05</span>
               Contact Us
            </h3>
            <p>
              Questions? Observations? Contact our team at <a href="mailto:girlsinquantum@gmail.com" className="text-[#2a8f85] hover:text-[#1e293b] font-bold no-underline border-b-2 border-[#fde047] hover:border-[#2a8f85] transition-all">girlsinquantum@gmail.com</a>.
            </p>
          </div>

          <div className="mt-16 flex justify-end">
            <div className="w-32 h-32 border-4 border-[#2a8f85]/20 rounded-full flex items-center justify-center transform -rotate-12">
               <span className={`${spaceGrotesk.className} text-[#2a8f85]/40 font-bold text-xl uppercase`}>Verified<br/>Secure</span>
            </div>
          </div>

        </div>
      </div>
    </main>
  );
}