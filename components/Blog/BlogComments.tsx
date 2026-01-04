"use client";

import { useState, useEffect, FormEvent } from "react";
import { Comment } from "@/lib/types";
import { addCommentAction } from "@/app/actions/blog_actions";
import Image from "next/image";

export default function BlogComments({ blogId, existingComments }: { blogId: string, existingComments: Comment[] }) {
  const [comments, setComments] = useState<Comment[]>(existingComments);
  const [guestName, setGuestName] = useState("");
  const [isNameSet, setIsNameSet] = useState(false);
  const [newComment, setNewComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
      const saved = localStorage.getItem("giq_guest_name");
      if (saved) {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setGuestName(saved);
        setIsNameSet(true);
      }
    }, []);

  const handleSetIdentity = (e: FormEvent) => {
    e.preventDefault();
    if(guestName.trim()) {
      localStorage.setItem("giq_guest_name", guestName);
      setIsNameSet(true);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    setIsSubmitting(true);
    
    const commentObj: Comment = {
      id: `c_${Date.now()}`,
      blogId: blogId,
      platform: "website",
      content: newComment,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      author: {
        name: guestName,
        role: "Community Member",
        avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(guestName)}&background=48c0b2&color=fff&bold=true`
      }
    };

    setComments([commentObj, ...comments]);
    setNewComment("");
    await addCommentAction(blogId, commentObj);
    setIsSubmitting(false);
  };

  return (
    <div className="mt-12">
      <h3 className="text-xl font-bold text-gray-900 mb-6 font-sans">Responses ({comments.length})</h3>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-1 mb-10 overflow-hidden">
        
      {!isNameSet ? (
          <div className="p-6 md:p-8 text-center bg-gray-50/50">
             <h4 className="font-bold text-gray-800 mb-2">Join the conversation</h4>
             <p className="text-sm text-gray-500 mb-6">Enter your name to start commenting.</p>

             <form onSubmit={handleSetIdentity} className="flex flex-col sm:flex-row gap-3 max-w-sm mx-auto">
               <input 
                 type="text" 
                 value={guestName}
                 onChange={(e) => setGuestName(e.target.value)}
                 placeholder="Your Name"
                 className="flex-1 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-giq-main focus:ring-2 focus:ring-giq-light/20 transition"
                 required
               />
               
               <button 
                 type="submit" 
                 className="w-full sm:w-auto bg-giq-main text-white px-6 py-2 rounded-lg font-bold hover:bg-giq-dark transition"
               >
                 Continue
               </button>
             </form>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="relative">
            <textarea
              placeholder={`What are your thoughts, ${guestName}?`}
              className="w-full p-4 min-h-[120px] text-gray-700 placeholder:text-gray-400 focus:outline-none resize-y"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              required
            />
            <div className="bg-gray-50 px-4 py-3 flex justify-between items-center border-t border-gray-100">
              <button 
                type="button" 
                onClick={() => setIsNameSet(false)} 
                className="text-xs text-gray-400 hover:text-gray-600 underline"
              >
                Not {guestName}?
              </button>
              <button 
                type="submit"
                disabled={isSubmitting || !newComment.trim()}
                className="bg-giq-main text-white px-6 py-2 rounded-full text-sm font-bold shadow-md shadow-giq-main/20 hover:shadow-lg hover:-translate-y-0.5 disabled:opacity-50 disabled:shadow-none disabled:translate-y-0 transition-all duration-200"
              >
                {isSubmitting ? "Publishing..." : "Post Comment"}
              </button>
            </div>
          </form>
        )}
      </div>

      <div className="space-y-8">
        {comments.map((comment) => (
          <div key={comment.id} className="flex gap-4 animate-in fade-in slide-in-from-bottom-2 duration-500">
            <Image 
              src={comment.author.avatar || ""} 
              alt={comment.author.name} 
              width={40}
              height={40}
              className="w-10 h-10 rounded-full shadow-sm object-cover flex-shrink-0"
              unoptimized
            />
            <div className="flex-1">
              <div className="flex items-baseline gap-2 mb-1">
                <span className="font-bold text-gray-900 text-sm">{comment.author.name}</span>
                <span className="text-xs text-gray-400">{comment.date}</span>
                {comment.platform === 'medium' && <span className="text-[10px] bg-gray-100 text-gray-500 px-1.5 py-0.5 rounded">Medium</span>}
              </div>
              <p className="text-gray-700 text-base leading-relaxed font-serif">{comment.content}</p>
            </div>
          </div>
        ))}
        {comments.length === 0 && (
          <div className="text-center py-10 bg-gray-50 rounded-xl border border-dashed border-gray-200">
            <p className="text-gray-500 italic">No comments yet. Be the first to share your thoughts!</p>
          </div>
        )}
      </div>
    </div>
  );
}