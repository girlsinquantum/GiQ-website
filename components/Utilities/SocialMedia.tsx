"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Play } from "lucide-react";
import { SiInstagram, SiYoutube, SiMedium, SiLinkedin, SiDiscord } from "react-icons/si";
import Image from "next/image";
import { getSocialFeed, SocialPost } from "@/lib/social";

export default function SocialHub() {
  const [posts, setPosts] = useState<SocialPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getSocialFeed().then((data) => {
      setPosts(data);
      setLoading(false);
    });
  }, []);

  const ig = posts.find((p) => p.type === "instagram");
  const yt = posts.find((p) => p.type === "youtube");
  const med = posts.find((p) => p.type === "medium");
  const li = posts.find((p) => p.type === "linkedin");

  return (
    <section className="py-24 bg-gray-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">
        
        <div className="flex flex-col md:flex-row justify-between items-end mb-12">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 tracking-tight">
              Community <span className="text-giq-purple">Hub</span>
            </h2>
            <p className="text-gray-500 mt-3 text-lg">Get the latest updates from Girls in Quantum community!</p>
          </div>
          
          <div className="flex flex-wrap gap-3 mt-6 md:mt-0">
            
            <motion.a 
              href="https://linkedin.com/company/girls-in-quantum" 
              target="_blank" rel="noopener noreferrer"
              whileHover={{ y: -5, backgroundColor: "#0077b5" }}
              className="w-14 h-14 bg-giq-yellow rounded-full flex items-center justify-center text-white shadow-md transition-colors duration-300"
            >
              <SiLinkedin size={26} />
            </motion.a>

            <motion.a 
              href="https://instagram.com/girlsinquantum" 
              target="_blank" rel="noopener noreferrer"
              whileHover={{ y: -5 }}
              className="w-14 h-14 bg-giq-lavender rounded-full flex items-center justify-center text-white shadow-md overflow-hidden relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <SiInstagram size={26} className="relative z-10" />
            </motion.a>

            <motion.a 
              href="https://www.youtube.com/@girlsinquantum" 
              target="_blank" rel="noopener noreferrer"
              whileHover={{ y: -5, backgroundColor: "#FF0000" }}
              className="w-14 h-14 bg-giq-blue rounded-full flex items-center justify-center text-white shadow-md transition-colors duration-300"
            >
              <SiYoutube size={26} />
            </motion.a>

            <motion.a 
              href="https://discord.gg/xE9mfGSy" 
              target="_blank" rel="noopener noreferrer"
              whileHover={{ y: -5, backgroundColor: "#5865F2" }}
              className="w-14 h-14 bg-giq-main rounded-full flex items-center justify-center text-white shadow-md transition-colors duration-300"
            >
              <SiDiscord size={26} />
            </motion.a>

            <motion.a 
              href="https://medium.com/@girlsinquantum" 
              target="_blank" rel="noopener noreferrer"
              whileHover={{ y: -5, backgroundColor: "#000000" }}
              className="w-14 h-14 bg-giq-deep rounded-full flex items-center justify-center text-white shadow-md transition-colors duration-300"
            >
              <SiMedium size={26} />
            </motion.a>

          </div>
        </div>

        {/* bento */}
        <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-6 min-h-[600px]">
          
          <motion.a 
            href={ig?.link} target="_blank" rel="noopener noreferrer"
            whileHover={{ scale: 0.99 }}
            className="md:col-span-2 md:row-span-2 relative rounded-[3rem] overflow-hidden group bg-gray-200 shadow-xl"
          >
            <AnimatePresence mode="wait">
              {loading ? <motion.div key="skel" exit={{ opacity: 0 }} className="absolute inset-0 bg-gray-300 animate-pulse" /> : (
                <motion.div key="ig" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="h-full w-full">
                  <Image src={ig?.thumbnail || "/team/group-photo.jpg"} alt="IG" fill priority className="object-cover transition-transform duration-700 group-hover:scale-110" />
                </motion.div>
              )}
            </AnimatePresence>
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
            <div className="absolute top-8 right-8 bg-white/10 backdrop-blur-xl p-4 rounded-full border border-white/20 z-20"><SiInstagram className="text-white text-2xl" /></div>
            <div className="absolute bottom-10 left-10 right-10 text-white z-10">
              <span className="bg-giq-main text-[10px] font-black px-4 py-1.5 rounded-full uppercase mb-4 inline-block tracking-widest">Instagram</span>
              <h3 className="text-2xl md:text-3xl font-bold leading-tight line-clamp-2">{ig?.title}</h3>
            </div>
          </motion.a>

          <motion.a 
            href={yt?.link} target="_blank" rel="noopener noreferrer"
            whileHover={{ scale: 0.98 }}
            className="md:col-span-2 bg-black rounded-[3rem] relative overflow-hidden flex items-center justify-center group shadow-lg"
          >
            {!loading && yt?.thumbnail && (
              <Image src={yt.thumbnail} alt="YT" fill className="object-cover opacity-70 group-hover:scale-105 transition-transform duration-700" />
            )}
            <div className="absolute inset-0 bg-black/40" />
            <div className="text-center z-10 text-white p-8">
               <div className="w-16 h-16 bg-white text-[#FF0000] rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl group-hover:scale-110 transition-transform">
                 <Play fill="currentColor" size={28} className="ml-1" />
               </div>
               <div className="flex items-center justify-center gap-2">
                 <SiYoutube className="text-2xl" />
                 <h4 className="font-bold text-xl line-clamp-1">{yt?.title || "Latest Video"}</h4>
               </div>
            </div>
          </motion.a>

          <motion.a 
             href={med?.link} target="_blank" rel="noopener noreferrer"
             whileHover={{ y: -5 }}
             className="md:col-span-1 bg-white rounded-[3rem] border border-gray-100 flex flex-col overflow-hidden group shadow-sm hover:shadow-2xl transition-all"
          >
            <div className="relative h-40 w-full bg-gray-50">
              {!loading && med?.thumbnail ? <Image src={med.thumbnail} alt="Medium" fill className="object-cover" /> : <div className="absolute inset-0 flex items-center justify-center"><SiMedium className="text-gray-200 text-4xl" /></div>}
            </div>
            <div className="p-6 flex flex-col justify-between flex-grow">
              <h4 className="font-bold text-gray-900 text-md leading-tight line-clamp-3">{med?.title}</h4>
              <p className="text-[10px] font-black text-giq-main mt-4 uppercase tracking-widest flex items-center gap-1">Read on Medium <ArrowUpRight size={10}/></p>
            </div>
          </motion.a>

          <motion.a 
             href={li?.link} target="_blank" rel="noopener noreferrer"
             whileHover={{ y: -5 }}
             className="md:col-span-1 bg-[#0A66C2] rounded-[3rem] flex flex-col justify-between relative overflow-hidden text-white shadow-xl group p-8"
          >
             {!loading && li?.thumbnail ? (
               <>
                 <Image 
                   src={li.thumbnail} 
                   alt="LinkedIn Update" 
                   fill 
                   className="object-cover transition-transform duration-700 group-hover:scale-110" 
                 />
                 <div className="absolute inset-0 bg-[#0A66C2]/85 mix-blend-multiply transition-opacity group-hover:opacity-90" />
               </>
             ) : (
               <div className="absolute -right-6 -top-6 w-24 h-24 bg-white/10 rounded-full blur-2xl group-hover:bg-white/20 transition-colors" />
             )}

             <div className="relative z-10 h-full flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-center mb-6">
                    <SiLinkedin size={28} />
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] opacity-80">Latest Update</span>
                  </div>
                  <h4 className="font-bold text-md leading-snug line-clamp-4 drop-shadow-md">
                    {loading ? "Syncing with LinkedIn..." : li?.title}
                  </h4>
                </div>
                
                <div className="flex items-center gap-2 text-[10px] font-bold bg-white/20 w-fit px-4 py-2 rounded-full backdrop-blur-md mt-4 group-hover:bg-white/30 transition-colors">
                   View on LinkedIn <ArrowUpRight size={12} />
                </div>
             </div>
          </motion.a>

        </div>
      </div>
    </section>
  );
}