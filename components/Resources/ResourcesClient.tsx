"use client";

import { useState } from "react";
import Navbar from "@/components/Utilities/Navbar";
import ResourceCard from "@/components/Resources/ResourceCard";
import { PlusCircle } from "lucide-react";
import { Resource } from "@/data/resources";

interface ResourcesClientProps {
  initialResources: Resource[];
}

export default function ResourcesClient({ initialResources }: ResourcesClientProps) {
  const [filter, setFilter] = useState("All");
  const categories = ["All", "Course", "Game", "Video", "Book", "Tool", "Article"];

  const filtered = filter === "All" 
    ? initialResources 
    : initialResources.filter(r => r.category === filter);

  return (
    <main className="min-h-screen bg-gray-50 pb-20">
      <Navbar />
      <div className="pt-32 px-4 max-w-7xl mx-auto">
        
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div>
            <h1 className="text-5xl font-bold text-gray-900 mt-2 mb-4">
                <span className="text-giq-dark">Girls in Quantum's</span><span className="text-giq-purple"> Library</span>
            </h1>
            <p className="text-gray-600 max-w-xl text-lg">
              Explore {initialResources.length}+ curated resources including games, textbooks, and interactive labs.
            </p>
          </div>
          
          <a 
            href="https://docs.google.com/forms/d/e/1FAIpQLSf_df8zFPajU2K-t55O6BURBoJ_QIOQ-TMECpGfWO_MxVu16A/viewform"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-giq-purple text-white px-6 py-3 rounded-full font-bold shadow-lg hover:bg-giq-main transition-all hover:-translate-y-1"
          >
            <PlusCircle size={20} /> Submit a Resource
          </a>
        </div>

        <div className="sticky top-24 z-30 bg-gray-50/95 backdrop-blur-sm py-4 mb-8 -mx-4 px-4 border-b border-gray-200/50">
          <div className="flex overflow-x-auto pb-2 gap-2 no-scrollbar">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-5 py-2 rounded-full text-sm font-bold whitespace-nowrap transition-all ${
                  filter === cat 
                    ? "bg-giq-main text-white shadow-md transform scale-105" 
                    : "bg-white text-gray-500 border border-gray-200 hover:border-giq-main hover:text-giq-main"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
          <div className="text-xs text-gray-400 mt-2 font-medium">
            Showing {filtered.length} resources
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filtered.map((res, i) => (
            <ResourceCard key={i} resource={res} />
          ))}
        </div>
      </div>
    </main>
  );
}