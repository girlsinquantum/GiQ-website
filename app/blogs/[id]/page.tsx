import { notFound } from "next/navigation";
import { getBlogById, getAdjacentBlogs } from "@/lib/blog";
import BlogReactions from "@/components/Blog/BlogReactions";
import BlogComments from "@/components/Blog/BlogComments";
import BlogShareButtons from "@/components/Blog/BlogShareButtons";
import BlogTagCycler from "@/components/Blog/BlogTagCycler"; 
import BlogNavigation from "@/components/Blog/BlogNavigation";

import "./blog.css";

type Props = {
  params: Promise<{ id: string }>;
};

function calculateReadTime(content: string): string {
  const text = content.replace(/<[^>]+>/g, '');
  const words = text.trim().split(/\s+/).length;
  const minutes = Math.ceil(words / 200);
  return `${minutes} min read`;
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('en-US', { 
    month: 'long', 
    day: 'numeric', 
    year: 'numeric' 
  });
}

// The particle separator
const QuantumDivider = () => (
  <div className="flex items-center justify-center gap-4 my-8 opacity-30">
    <div className="h-px bg-gray-300 w-24"></div>
    <div className="flex gap-2">
      <div className="w-1.5 h-1.5 rounded-full bg-giq-main animate-pulse"></div>
      <div className="w-1.5 h-1.5 rounded-full bg-giq-purple animate-pulse delay-75"></div>
      <div className="w-1.5 h-1.5 rounded-full bg-gray-400 animate-pulse delay-150"></div>
    </div>
    <div className="h-px bg-gray-300 w-24"></div>
  </div>
);

export default async function BlogPostPage({ params }: Props) {
  const resolvedParams = await params;

  const [blog, adjacent] = await Promise.all([
    getBlogById(resolvedParams.id),
    getAdjacentBlogs(resolvedParams.id)
  ]);

  if (!blog) notFound();

  const readTime = calculateReadTime(blog.content);

  const hasCoverImage = blog.coverImage && blog.coverImage.trim().length > 0;

  return (
    <article className="min-h-screen bg-white text-gray-900 relative">
      
      <div className="fixed top-0 left-0 w-full h-1.5 z-50 bg-gray-100">
         <div 
           className="h-full bg-gradient-to-r from-giq-main to-giq-purple origin-left w-full scale-x-0 animate-scroll-progress"
           style={{
             animationTimeline: 'scroll()',
             animationName: 'scroll-progress',
           }}
         />
      </div>

      <div className="pt-32 pb-24">
        <header className="container mx-auto px-4 max-w-5xl mb-12 text-left">
          
          <div className="flex flex-wrap items-center justify-start gap-3 mb-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <BlogTagCycler tags={blog.tags} variant="header" />
            
        </div>              


          <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 mb-8 leading-tight tracking-tight font-sans animate-in fade-in slide-in-from-bottom-5 duration-1000 delay-100">
            {blog.title}
            
          </h1>
          
          <span className="text-gray-400 text-sm font-serif italic">
            {formatDate(blog.date)} • {readTime}
          </span>

          <div className="flex flex-col md:flex-row items-center justify-between border-t border-b border-gray-100 py-6 gap-6">
            <div className="flex items-center gap-4">
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-tr from-giq-main to-giq-purple rounded-full blur opacity-25 group-hover:opacity-50 transition"></div>
                <img 
                  src={blog.author.avatar || "/logo.svg"} 
                  alt={blog.author.name}
                  className="relative w-14 h-14 rounded-full object-cover border-2 border-white shadow-md" 
                />
              </div>
              <div className="text-left">
                <p className="font-bold text-gray-900 text-lg leading-none hover:text-giq-main transition-colors cursor-pointer">
                  {blog.author.name}
                </p>
                <p className="text-sm text-gray-500 mt-1 font-serif italic">{blog.author.role}</p>
              </div>
              
            </div>

            <div className="scale-90 md:scale-100">
              <BlogShareButtons title={blog.title} slug={blog.id} />
            </div>
          </div>
        </header>

        {hasCoverImage && (
          <div className="container mx-auto px-4 max-w-5xl mb-16 animate-in fade-in duration-1000 delay-200">
            <div className="relative aspect-[21/9] rounded-2xl overflow-hidden shadow-2xl shadow-giq-main/10 group">
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-500 z-10"></div>
              <img 
                src={blog.coverImage || undefined} 
                alt={blog.title}
                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-1000 ease-out"
              />
            </div>
            <figcaption className="text-center text-xs text-gray-400 mt-3 font-mono uppercase tracking-wide">
              Source: Girls in Quantum Media
            </figcaption>
          </div>
        )}

        <div className="container mx-auto px-4 max-w-5xl">
          <div 
            className="blog-content prose prose-lg prose-slate max-w-none"
            dangerouslySetInnerHTML={{ __html: blog.content }} 
          />
          
          {blog.source === 'medium' && blog.link && (
            <div className="mt-2 p-8 bg-gray-50 rounded-2xl border border-gray-100 text-center relative overflow-hidden group">
               <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-giq-main to-giq-purple"></div>
               <p className="text-gray-600 italic relative z-10">
                 Enjoyed this read? Support the author on 
                 <a href={blog.link} target="_blank" className="text-giq-main font-bold ml-1 hover:underline decoration-wavy">Medium</a>.
               </p>
            </div>
          )}

          <QuantumDivider />

          <div className="bg-gray-50/50 -mx-6 md:-mx-12 px-6 md:px-12  rounded-3xl">
             <BlogReactions blogId={blog.id} initialReactions={blog.reactions} />
             <BlogComments blogId={blog.id} existingComments={blog.comments} />
          </div>
        </div>
    <BlogNavigation prev={adjacent.prev} next={adjacent.next} />
      </div>
    </article>
  );
}