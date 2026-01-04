"use client";
import { ExternalLink, BookOpen, Gamepad2, Video, PenTool, Globe, FileText, MonitorPlay } from "lucide-react";
import { motion } from "framer-motion";

const getCategoryStyle = (cat: string) => {
  switch (cat) {
    case "Game":
      return { 
        bg: "bg-gradient-to-br from-pink-500 to-rose-500", 
        icon: <Gamepad2 className="w-8 h-8 text-white" />,
        text: "text-rose-600" 
      };
    case "Course":
      return { 
        bg: "bg-gradient-to-br from-blue-500 to-cyan-500", 
        icon: <MonitorPlay className="w-8 h-8 text-white" />,
        text: "text-blue-600" 
      };
    case "Video":
      return { 
        bg: "bg-gradient-to-br from-red-500 to-orange-500", 
        icon: <Video className="w-8 h-8 text-white" />,
        text: "text-red-600" 
      };
    case "Book":
      return { 
        bg: "bg-gradient-to-br from-emerald-500 to-teal-500", 
        icon: <BookOpen className="w-8 h-8 text-white" />,
        text: "text-emerald-600" 
      };
    case "Tool":
      return { 
        bg: "bg-gradient-to-br from-purple-500 to-indigo-500", 
        icon: <PenTool className="w-8 h-8 text-white" />,
        text: "text-purple-600" 
      };
    case "Community":
      return { 
        bg: "bg-gradient-to-br from-yellow-400 to-amber-500", 
        icon: <Globe className="w-8 h-8 text-white" />,
        text: "text-amber-600" 
      };
    default:
      return { 
        bg: "bg-gradient-to-br from-gray-400 to-gray-600", 
        icon: <FileText className="w-8 h-8 text-white" />,
        text: "text-gray-600" 
      };
  }
};

interface Resource {
  title: string;
  link: string;
  category: string;
}

export default function ResourceCard({ resource }: { resource: Resource }) {
  const style = getCategoryStyle(resource.category);

  return (
    <motion.a 
      href={resource.link} 
      target="_blank"
      whileHover={{ y: -5 }}
      className="group block bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300"
    >
      <div className={`h-32 w-full ${style.bg} flex items-center justify-center relative overflow-hidden`}>
        <div className="absolute inset-0 bg-[url('/network-bg.svg')] opacity-20 mix-blend-overlay"></div>
        
        <div className="transform group-hover:scale-110 transition-transform duration-500 drop-shadow-md">
          {style.icon}
        </div>
      </div>

      <div className="p-6">
        <div className="flex justify-between items-start mb-3">
          <span className={`text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded-full bg-gray-50 ${style.text}`}>
            {resource.category}
          </span>
          <ExternalLink className="w-4 h-4 text-gray-300 group-hover:text-giq-main transition-colors" />
        </div>
        
        <h3 className="text-lg font-bold text-gray-900 leading-tight group-hover:text-giq-main transition-colors line-clamp-2">
          {resource.title}
        </h3>
        
        <p className="text-xs text-gray-500 mt-2">
          Click to access resource →
        </p>
      </div>
    </motion.a>
  );
}