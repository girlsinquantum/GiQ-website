import Link from "next/link";
import { BlogPost } from "@/lib/types";

type Props = {
  prev: BlogPost | null;
  next: BlogPost | null;
};

export default function BlogNavigation({ prev, next }: Props) {
  return (
    <nav className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16 max-w-5xl mx-auto px-4">
      {prev ? (
        <Link 
          href={`/blogs/${encodeURIComponent(prev.id)}`}
          className="group relative flex flex-col p-6 bg-white border border-gray-200 rounded-2xl hover:border-transparent transition-all duration-300 overflow-hidden shadow-sm hover:shadow-xl text-left"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-giq-main to-giq-purple opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" style={{ margin: '-2px', borderRadius: '1rem' }} />
          <div className="absolute inset-0 bg-white rounded-2xl z-0" />

          <div className="relative z-10">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 block group-hover:text-giq-main transition-colors">
              &larr; Previous Insight
            </span>
            <h4 className="text-lg font-bold text-gray-900 line-clamp-2 group-hover:text-black">
              {prev.title}
            </h4>
          </div>
        </Link>
      ) : (
        <div />
      )}

      {next ? (
        <Link 
          href={`/blogs/${encodeURIComponent(next.id)}`}
          className="group relative flex flex-col p-6 bg-white border border-gray-200 rounded-2xl hover:border-transparent transition-all duration-300 overflow-hidden shadow-sm hover:shadow-xl text-right items-end"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-giq-purple to-giq-main opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" style={{ margin: '-2px', borderRadius: '1rem' }} />
          <div className="absolute inset-0 bg-white rounded-2xl z-0" />

          <div className="relative z-10">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 block group-hover:text-giq-purple transition-colors">
              Next Discovery &rarr;
            </span>
            <h4 className="text-lg font-bold text-gray-900 line-clamp-2 group-hover:text-black">
              {next.title}
            </h4>
          </div>
        </Link>
      ) : (
        <div />
      )}
    </nav>
  );
}