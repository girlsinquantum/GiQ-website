"use client";

import { useState } from "react";

export interface Opportunity {
  id: string;
  title: string;
  organization: string;
  logo?: string | null;
  type: string;
  location: string;
  link: string;
  tags: string[];
  deadline?: string;
}

interface Props {
  initialData: Opportunity[];
}

const FILTERS = ["All", "Internship", "Summer/Winter School", "Mentorship", "Hackathon", "PhD"];

export default function OpportunityBoard({ initialData }: Props) {
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");

  const filteredData = initialData.filter((op) => {
    const matchesCategory = filter === "All" || op.type === filter;
    const matchesSearch = 
      op.title.toLowerCase().includes(search.toLowerCase()) || 
      op.organization.toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="w-full max-w-7xl mx-auto">
      <div className="mb-12 space-y-6">
        <div className="relative max-w-lg mx-auto group">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-giq-main to-giq-purple rounded-full opacity-50 group-hover:opacity-100 transition duration-500 blur"></div>
          <div className="relative bg-white rounded-full flex items-center px-6 py-3 shadow-xl">
             <svg className="w-5 h-5 text-gray-400 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
             <input 
               type="text" 
               placeholder="Search roles (e.g. 'IBM', 'Software')..." 
               className="w-full bg-transparent outline-none text-giq-text font-medium placeholder-gray-400"
               onChange={(e) => setSearch(e.target.value)}
             />
          </div>
        </div>

        <div className="flex flex-wrap justify-center gap-3">
          {FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 border
                ${filter === f 
                  ? "bg-giq-dark text-white border-giq-dark shadow-lg shadow-giq-main/20 scale-105" 
                  : "bg-white text-gray-500 border-gray-200 hover:border-giq-main hover:text-giq-main"
                }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredData.map((op) => (
          <OpportunityCard key={op.id} data={op} />
        ))}
      </div>

      {filteredData.length === 0 && (
        <div className="text-center py-20 opacity-50">
          <p className="text-xl font-bold text-gray-400">No opportunities found.</p>
        </div>
      )}
    </div>
  );
}

function OpportunityCard({ data }: { data: Opportunity }) {

  const [logoState, setLogoState] = useState<0 | 1 | 2>(0);

  const handleImageError = () => {
    if (logoState === 0) setLogoState(1); // Try Google
    else if (logoState === 1) setLogoState(2); // Give up, show text
  };

  const getBackupLogo = (url: string | null | undefined) => {
    if (!url) return "";
    try {
      const match = url.match(/logo\.clearbit\.com\/(.+)/);
      const domain = match ? match[1] : "google.com";
      return `https://t2.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=http://${domain}&size=128`;
    } catch {
      return "";
    }
  };

  const deadlineText = data.deadline 
    ? new Date(data.deadline).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) 
    : "Rolling Applications";
  
  const deadlineColor = data.deadline 
    ? "text-giq-dark bg-giq-light border border-giq-main/20" 
    : "text-blue-600 bg-blue-50 border border-blue-100";

  return (
    <div className="relative flex flex-col h-full p-6 rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-xl hover:border-giq-purple/30 transition-all duration-300 group">
      
      <div className="mb-4 flex items-start justify-between">
        <div className="w-12 h-12 shrink-0">
          
          {data.logo && logoState !== 2 ? (
            <img 
              src={logoState === 0 ? data.logo : getBackupLogo(data.logo)}
              alt={data.organization}
              className="w-full h-full object-contain rounded-lg bg-white p-0.5 border border-gray-100"
              onError={handleImageError}
            />
          ) : (
            <div className="w-full h-full rounded-lg flex items-center justify-center text-lg font-black bg-gradient-to-br from-gray-100 to-gray-200 text-gray-400">
              {data.organization.charAt(0)}
            </div>
          )}
        </div>

        <span className="flex items-center gap-1 text-[10px] font-bold text-giq-purple bg-giq-purple/5 px-2 py-1 rounded-full border border-giq-purple/10">
          <span className="w-1.5 h-1.5 rounded-full bg-giq-purple animate-pulse"/>
          OPEN
        </span>
      </div>

      <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-1">
        {data.organization}
      </h3>
      
      <h2 className="text-lg font-bold text-giq-text leading-tight mb-3 line-clamp-2 group-hover:text-giq-main transition-colors">
        {data.title}
      </h2>

      <div className="flex flex-wrap gap-2 mt-auto pt-4">
        <span className="text-[10px] font-mono bg-giq-purple/10 text-giq-purple px-2 py-1 rounded border border-giq-purple/20">
          {data.type}
        </span>
        {data.tags?.slice(0, 2).map(tag => (
          <span key={tag} className="text-[10px] font-mono bg-gray-50 border border-gray-100 px-2 py-1 rounded text-gray-600">
            {tag}
          </span>
        ))}
      </div>
      <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-50">
        <span className={`text-[10px] font-bold px-2 py-1 rounded flex items-center gap-1 ${deadlineColor}`}>
          {data.deadline ? '📅 Deadline:' : '🔄'} {deadlineText}
        </span>

        <a 
          href={data.link} 
          target="_blank"
          rel="noopener noreferrer"
          className="py-2 px-4 rounded-xl text-xs font-bold bg-giq-main text-white hover:bg-giq-main transition-colors shadow-md"
        >
          Apply ↗
        </a>
      </div>
    </div>
  );
}