import type { Metadata } from "next";
import { Caveat, Space_Grotesk, Inter } from "next/font/google";

const caveat = Caveat({ subsets: ["latin"], weight: ["700"] });
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], weight: ["700"] });
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Terms of Service | Girls in Quantum",
  description: "Rules and regulations for using the GiQ platform.",
};

export default function TermsPage() {
  return (
    <main className={`min-h-screen relative overflow-hidden bg-giq-lavender pt-32 pb-20 px-4 ${inter.className}`}>
      
      <div className="absolute inset-0 opacity-50 bg-[linear-gradient(to_right,#48c0b2_1px,transparent_1px),linear-gradient(to_bottom,#48c0b2_1px,transparent_1px)] bg-[size:40px_40px]" />

      <div className="relative max-w-3xl mx-auto transform -rotate-1 transition-transform hover:rotate-0 duration-500 ease-out">
        
        <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-20 h-12 bg-gray-800 rounded-t-lg z-20 shadow-lg border-b-4 border-gray-600 flex justify-center">
            <div className="w-12 h-4 border-2 border-gray-400 border-t-0 rounded-b-lg mt-2"></div>
        </div>

        <div className="bg-white relative shadow-[0_0_50px_rgba(72,192,178,0.15)] rounded-sm p-8 md:p-16">
          
          <div className="relative z-10 mb-12 border-b-4 border-[#1e293b] pb-6 flex flex-col md:flex-row justify-between items-end gap-4">
            <div>
                <h1 className={`${spaceGrotesk.className} text-5xl font-bold text-[#1e293b] leading-none`}>
                Terms of<br/>Service
                </h1>
            </div>
            <div className="text-right">
                <span className={`${caveat.className} text-2xl text-[#64748b] block rotate-2`}>
                Protocol v2026.1
                </span>
            </div>
          </div>

          <div className="prose prose-lg prose-slate max-w-none 
            prose-p:text-gray-700 prose-p:leading-relaxed
            prose-headings:font-bold prose-headings:text-[#1e293b]
          ">
            
            <div className="bg-[#f1f5f9] p-6 rounded-lg border-l-4 border-[#48c0b2] mb-8">
                <p className="m-0 italic">
                By accessing and using the Girls in Quantum website and resources, you accept and agree to be bound by the terms and provision of this agreement. Basically: play nice, learn lots, and respect the science.
                </p>
            </div>

            <h3><strong>1. Educational Use</strong></h3>
            <p>
            All content provided on this platform is for educational and informational purposes only. While we strive for accuracy (aiming for High Fidelity states!), Girls in Quantum makes no representations as to the absolute completeness of any information on this site.
            </p>

            <h3><strong>2. Intellectual Property</strong></h3>
            <p>
            The content, logo, and visual design of Girls in Quantum are our intellectual property. You may not use our branding or republish our original educational materials for commercial purposes without our written consent.
            </p>
            <p className={`${caveat.className} text-xl text-[#48c0b2] -mt-2 ml-4`}>
                * Feel free to share for homework though!
            </p>

            <h3><strong>3. Community Conduct</strong></h3>
            <p>
            We foster an inclusive and respectful community. We reserve the right to remove any content or comments that are deemed offensive, discriminatory, or harmful to our members.
            </p>

            <h3><strong>4. Changes to Terms</strong></h3>
            <p>
            Girls in Quantum reserves the right to modify these terms at any time. Your continued use of the site after any such changes constitutes your acceptance of the new Terms of Service.
            </p>

            <hr className="my-8 border-gray-200" />

            <h3><strong>5. Contact</strong></h3>
            <p>
            For any legal inquiries (or just to say hi), please reach out to <a href="mailto:girlsinquantum@gmail.com" className="text-[#2a8f85] font-bold hover:underline">girlsinquantum@gmail.com</a>.
            </p>
          </div>

        </div>
      </div>
    </main>
  );
}