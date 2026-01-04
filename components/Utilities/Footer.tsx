"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion} from "framer-motion";
import { 
  ArrowUp, 
  Atom, 
  GraduationCap, 
  Briefcase,
  Mail
} from "lucide-react";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const pathname = usePathname();
  const isHomePage = pathname === "/";

  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-gradient-to-b from-white to-[var(--color-giq-light)] pt-24 pb-10 overflow-hidden mt-auto">
      
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[var(--color-giq-purple)]/20 rounded-full blur-[120px] translate-x-1/3 -translate-y-1/3" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[var(--color-giq-main)]/20 rounded-full blur-[120px] -translate-x-1/3 translate-y-1/3" />
        <div 
          className="absolute inset-0 opacity-[0.03]" 
          style={{ backgroundImage: 'radial-gradient(circle, var(--color-giq-deep) 1px, transparent 1px)', backgroundSize: '30px 30px' }} 
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {isHomePage && (
          <>
            <div className="grid md:grid-cols-2 gap-6 mb-20">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                whileHover={{ y: -8 }}
                className="group relative bg-white/60 backdrop-blur-md border border-[var(--color-giq-main)]/30 rounded-[2rem] p-8 shadow-xl shadow-[var(--color-giq-main)]/5 overflow-hidden flex flex-col justify-between"
              >
                <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
                  <GraduationCap size={120} className="text-[var(--color-giq-main)] rotate-12" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-[var(--color-giq-deep)] mb-2">For Students</h3>
                  <p className="text-[var(--color-giq-dark)] mb-6 max-w-xs font-medium">
                    Join a global community of leaders and learners. Access free resources, workshops, and mentorship.
                  </p>
                </div>
                <div>
                  <Link 
                    href="/join" 
                    className="inline-flex items-center gap-2 bg-[var(--color-giq-main)] text-white px-6 py-3 rounded-full font-bold shadow-md hover:bg-[var(--color-giq-dark)] transition-colors"
                  >
                    Team Registration
                  </Link>
                </div>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                whileHover={{ y: -8 }}
                className="group relative bg-white/60 backdrop-blur-md border border-[var(--color-giq-purple)]/30 rounded-[2rem] p-8 shadow-xl shadow-[var(--color-giq-purple)]/5 overflow-hidden flex flex-col justify-between"
              >
                <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
                  <Briefcase size={120} className="text-[var(--color-giq-purple)] -rotate-12" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-[var(--color-giq-deep)] mb-2">For Advisors</h3>
                  <p className="text-[var(--color-giq-dark)] mb-6 max-w-xs font-medium">
                    Share your expertise. Guide the next generation of quantum pioneers.
                  </p>
                </div>
                <div>
                  <Link 
                    href="/advisors" 
                    className="inline-flex items-center gap-2 bg-[var(--color-giq-lavender)] text-[var(--color-giq-deep)] px-6 py-3 rounded-full font-bold shadow-md hover:bg-[var(--color-giq-purple)] hover:text-white transition-colors"
                  >
                    Advisor Registration
                  </Link>
                </div>
              </motion.div>
            </div>

            <div className="h-px w-full bg-gradient-to-r from-transparent via-[var(--color-giq-main)]/40 to-transparent mb-16" />
          </>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center mb-16">
          
          <div className="space-y-8">
            <Link href="/" className="inline-flex items-center gap-3 group">
              <div className="relative w-12 h-12">
                <Image 
                  src="/logo.svg" 
                  alt="GiQ Logo" 
                  fill 
                  className="object-contain group-hover:rotate-12 transition-transform duration-500" 
                />
              </div>
              <span className="text-3xl font-bold tracking-tight text-[var(--color-giq-main)]">
                Girls in <span className="text-[var(--color-giq-main)]">Quantum</span>
              </span>
            </Link>
            
            <p className="text-[var(--color-giq-dark)] text-lg font-medium leading-relaxed max-w-md">
             Empowering students everywhere with free resources to explore the future of quantum science and technology.
            </p>

            <a 
              href="mailto:girlsinquantum@gmail.com" 
              className="inline-flex items-center gap-3 text-[var(--color-giq-blue)] font-bold text-lg hover:text-[var(--color-giq-main)] transition-colors group"
            >
              <div className="p-3 bg-white rounded-full shadow-sm border border-[var(--color-giq-light)] group-hover:scale-110 transition-transform">
                <Mail size={20} />
              </div>
              girlsinquantum@gmail.com
            </a>
          </div>

          <div className="w-full">
            <div className="bg-white/80 backdrop-blur-xl p-8 rounded-3xl border border-[var(--color-giq-main)]/20 shadow-lg shadow-[var(--color-giq-main)]/5">
              <h4 className="text-xl font-bold text-[var(--color-giq-deep)] mb-3 flex items-center gap-2">
                <Atom className="text-[var(--color-giq-purple)] animate-spin-slow" size={24} />
                Stay Entangled
              </h4>
              <p className="text-[var(--color-giq-dark)] mb-6">
                Receive quantum updates, scholarship alerts, and event invites directly to your inbox.
              </p>
              <form onSubmit={(e) => e.preventDefault()} className="flex flex-col sm:flex-row gap-3">
                <input 
                  type="email" 
                  placeholder="schrodinger@gmail.com" 
                  className="flex-1 px-5 py-3 rounded-xl bg-[var(--color-giq-light)]/30 border border-[var(--color-giq-main)]/20 text-[var(--color-giq-deep)] placeholder-[var(--color-giq-dark)]/50 focus:outline-none focus:ring-2 focus:ring-[var(--color-giq-main)] transition-all"
                />
                <motion.button 
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-8 py-3 rounded-xl bg-[var(--color-giq-deep)] text-white font-bold hover:bg-[var(--color-giq-purple)] transition-colors shadow-md whitespace-nowrap"
                >
                  Subscribe
                </motion.button>
              </form>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-[var(--color-giq-dark)]/10 text-xs font-medium text-[var(--color-giq-dark)]/70">
          <div className="mb-4 md:mb-0">
            &copy; {currentYear} Girls in Quantum. All rights reserved.
          </div>
          <div className="flex items-center gap-8">
             <Link href="/privacy" className="hover:text-[var(--color-giq-deep)] transition-colors">Privacy Policy</Link>
             <Link href="/terms" className="hover:text-[var(--color-giq-deep)] transition-colors">Terms of Service</Link>
             <button 
               onClick={scrollToTop}
               className="flex items-center gap-1 hover:text-[var(--color-giq-main)] transition-colors group"
             >
               Back to top <ArrowUp size={14} className="group-hover:-translate-y-0.5 transition-transform" />
             </button>
          </div>
        </div>
      </div>
    </footer>
  );
}