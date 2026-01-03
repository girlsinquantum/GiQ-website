import Link from "next/link";
import { getAllBlogs } from "@/lib/blog";
import BlogCardCover from "@/components/Blog/BlogCardCover"; 
import BlogTagCycler from "@/components/Blog/BlogTagCycler"; 

export const revalidate = 0; 

export default async function BlogPage() {
  const blogs = await getAllBlogs();

  return (
    <main className="min-h-screen bg-white text-gray-900 pt-24 pb-12">
      <div className="container mx-auto px-6">
        
        <div className="mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Quantum <span className="text-giq-purple">Insights</span>
          </h1>
          <p className="text-xl text-giq-blue max-w-2xl">
            Latest articles, research, and stories from the community.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.map((blog) => (
            <Link 
              key={blog.id} 
              href={`/blogs/${encodeURIComponent(blog.id)}`}
              className="group flex flex-col h-full bg-white border border-gray-200 rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              <div className="h-56 overflow-hidden relative bg-gray-100">
                
                <BlogCardCover 
                  src={blog.coverImage} 
                  alt={blog.title} 
                />

                <BlogTagCycler tags={blog.tags} />
                
              </div>

              <div className="p-6 flex flex-col flex-1">
                <div className="flex items-center gap-2 mb-3 text-xs text-gray-500 font-medium">
                  <span>{blog.date}</span>
                  <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                  <span>{blog.author.name}</span>
                </div>
                
                <h2 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-[--color-giq-main] transition-colors">
                  {blog.title}
                </h2>
                
                <p className="text-gray-600 text-sm line-clamp-3 mb-6 flex-1">
                  {blog.excerpt.replace(/<[^>]+>/g, '')}
                </p>

                <div className="flex items-center text-[--color-giq-main] font-bold text-sm mt-auto">
                  Read Article 
                  <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}