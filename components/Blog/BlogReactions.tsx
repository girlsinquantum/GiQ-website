"use client";

import { useState, useEffect } from "react";
import { ReactionRecord } from "@/lib/types";
import { toggleReactionAction } from "@/app/actions";

interface Props {
  blogId: string;
  initialReactions: ReactionRecord[];
}

export default function BlogReactions({ blogId, initialReactions }: Props) {
  const [reactions, setReactions] = useState<ReactionRecord[]>(initialReactions);
  const [currentUserId, setCurrentUserId] = useState<string>("");
  const [currentUserName, setCurrentUserName] = useState<string>("");
  
  const [showReactorsModal, setShowReactorsModal] = useState(false);

  useEffect(() => {
    let uid = localStorage.getItem("giq_user_id");
    let uname = localStorage.getItem("giq_guest_name");

    if (!uid) {
      uid = `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      localStorage.setItem("giq_user_id", uid);
    }
    setCurrentUserId(uid);
    if (uname) setCurrentUserName(uname);
  }, []);

  const handleReact = async (type: 'like' | 'love' | 'quantum') => {
    let activeName = currentUserName;

    if (!activeName) {
      const input = prompt("To react, please tell us your name (Visible to community):");
      if (!input) return;
      localStorage.setItem("giq_guest_name", input);
      setCurrentUserName(input);
      activeName = input;
    }

    const newReaction: ReactionRecord = {
      userId: currentUserId,
      userName: activeName || "Guest",
      type,
      timestamp: new Date().toISOString()
    };

    const isExisting = reactions.some(r => r.userId === currentUserId && r.type === type);
    
    let updatedReactions;
    if (isExisting) {
      updatedReactions = reactions.filter(r => !(r.userId === currentUserId && r.type === type));
    } else {
      updatedReactions = [...reactions, newReaction];
    }

    setReactions(updatedReactions); 
    await toggleReactionAction(blogId, newReaction); 
  };

  const getCount = (type: string) => reactions.filter(r => r.type === type).length;
  const isReacted = (type: string) => reactions.some(r => r.userId === currentUserId && r.type === type);

  const uniqueReactors = Array.from(new Set(reactions.map(r => r.userName)));

  return (
    <div className="py-6 my-8">
      <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-4">Reactions</h3>
      
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <ReactionButton 
            emoji="👍" count={getCount('like')} active={isReacted('like')} 
            onClick={() => handleReact('like')} color="text-giq-main border-giq-main bg-giq-light/20"
          />
          <ReactionButton 
            emoji="💙" count={getCount('love')} active={isReacted('love')} 
            onClick={() => handleReact('love')} color="text-giq-purple border-giq-purple bg-purple-50"
          />
          <ReactionButton 
            emoji="💫" count={getCount('quantum')} active={isReacted('quantum')} 
            onClick={() => handleReact('quantum')} color="text-cyan-600 border-cyan-500 bg-cyan-50"
          />

        </div>

        {reactions.length > 0 && (
          <button 
            onClick={() => setShowReactorsModal(true)}
            className="text-sm text-gray-500 hover:text-giq-main hover:underline transition"
          >
            View all {reactions.length} reactions
          </button>
        )}
      </div>

      {showReactorsModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity" onClick={() => setShowReactorsModal(false)} />
          <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-sm overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50">
              <h3 className="font-bold text-gray-800">People who reacted</h3>
              <button onClick={() => setShowReactorsModal(false)} className="text-gray-400 hover:text-gray-600 text-2xl leading-none">&times;</button>
            </div>
            <div className="max-h-[60vh] overflow-y-auto p-2">
              {uniqueReactors.map((name, idx) => (
                <div key={idx} className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-xl transition">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-giq-main to-giq-purple text-white flex items-center justify-center font-bold text-xs">
                    {name.charAt(0).toUpperCase()}
                  </div>
                  <span className="text-gray-700 font-medium">{name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function ReactionButton({ emoji, count, active, onClick, color }: any) {
  return (
    <button 
      onClick={onClick}
      className={`relative group flex items-center gap-2 px-4 py-2 rounded-full transition-all border 
      ${active ? `${color} shadow-sm transform scale-105` : 'border-gray-200 bg-white text-gray-400 hover:bg-gray-50 hover:border-gray-300'}`}
    >
      <span className={`text-xl transition-transform duration-300 ${active ? 'scale-110' : 'group-hover:scale-110'}`}>{emoji}</span>
      <span className="font-sans font-bold text-sm">{count}</span>
    </button>
  );
}