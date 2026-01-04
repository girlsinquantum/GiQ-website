"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import ReactMarkdown from "react-markdown"; 
import { SchrodingerEquation } from "./ChatAssets";

interface Message {
  role: "user" | "model";
  text: string;
}

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: "model", text: "Meow! I'm **Schrödinger's Assistant**. I am both asleep and awake until you ask me a question.\n\nI can help you find resources, team members, latest updates or opportunities.\n\n*How can I help you today?*" }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isCooldown, setIsCooldown] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const toggleChat = () => setIsOpen(!isOpen);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) scrollToBottom();
  }, [messages, isOpen]);

  const handleSend = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!input.trim() || isLoading || isCooldown) return;

    const userMsg = input.trim();
    setInput("");
    setMessages((prev) => [...prev, { role: "user", text: userMsg }]);
    setIsLoading(true);
    setIsCooldown(true);

    setTimeout(() => setIsCooldown(false), 2000);

    try {
      const history = messages.map(m => ({
        role: m.role,
        parts: [{ text: m.text }]
      }));

      // Note: Assuming /api/chat exists.
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMsg, history }),
      });

      const data = await res.json();
      setMessages((prev) => [...prev, { role: "model", text: data.reply }]);
    } catch {
      setMessages((prev) => [...prev, { role: "model", text: "Connection interference detected. Please check your internet connection." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-0 right-0 z-[9000] font-sans flex flex-col items-end sm:bottom-6 sm:right-6 cursor-none pointer-events-none">
      
      <div 
        className={`
          pointer-events-auto
          fixed bottom-0 right-0 w-full rounded-t-2xl
          /* Desktop: Floating card */
          sm:absolute sm:bottom-20 sm:right-0 sm:w-[380px] sm:h-[600px] sm:max-h-[75vh] sm:rounded-2xl
          bg-white shadow-2xl border border-[#48c0b2]/20
          overflow-hidden transition-all duration-300 origin-bottom-right
          flex flex-col
          ${isOpen ? "h-[85dvh] opacity-100 scale-100 translate-y-0" : "h-0 opacity-0 scale-95 translate-y-10 pointer-events-none"}
        `}
      >
        
        <div className="relative bg-gradient-to-r from-[#2a8f85] to-[#48c0b2] p-4 pt-5 shadow-md z-20 shrink-0 overflow-hidden">
          
          <div className="absolute -right-4 -bottom-4 w-48 h-24 text-white opacity-[0.15] rotate-[-6deg] pointer-events-none mix-blend-overlay">
             <SchrodingerEquation className="w-full h-full" />
          </div>
          
          <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/10 rounded-full blur-2xl animate-pulse"></div>
          <div className="absolute top-5 left-10 w-16 h-16 bg-[#fde047]/10 rounded-full blur-xl"></div>

          <div className="relative flex items-center justify-between z-10">
            <div className="flex items-center gap-3">
              
              <div className="relative">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center border-[3px] border-[#ccfbf1]/50 shadow-sm overflow-hidden transform-gpu relative">
                   <div className="w-full h-full p-1 relative"> 
                     <Image 
                       src="/media/cat.svg" 
                       alt="Schrödinger's Assistant" 
                       fill
                       className="object-contain"
                     />
                   </div>
                </div>
                
                <span className="absolute bottom-0 right-0 block h-3.5 w-3.5 rounded-full bg-[#fde047] ring-2 ring-[#2a8f85]"></span>
              </div>

              <div className="text-white">
                <h3 className="font-bold text-base tracking-wide drop-shadow-sm">Schrödinger&apos;s Assistant</h3>                
                <p className="text-[11px] text-[#e0f7fa] font-medium flex items-center gap-1.5 opacity-95">
                  <span className="relative flex h-2 w-2">
                  </span>
                  Online & Observing
                </p>
              </div>
            </div>

            <button 
              onClick={toggleChat} 
              className="p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors text-white cursor-none backdrop-blur-sm"
              aria-label="Close Chat"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-[#e0f7fa]/30 custom-scrollbar relative">

          <div className="relative z-10 space-y-3">
            {messages.map((msg, idx) => (
              <div 
                key={idx} 
                className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div 
                  className={`
                    max-w-[85%] rounded-2xl px-4 py-3 text-[14px] leading-relaxed shadow-sm break-words
                    ${msg.role === "user" 
                      ? "bg-[#48c0b2] text-white rounded-br-none" 
                      : "bg-white text-[#1e293b] border border-[#48c0b2]/10 rounded-bl-none"}
                  `}
                >
                  <ReactMarkdown 
                    components={{
                      a: ({...props}) => <a {...props} className="underline font-bold text-inherit hover:opacity-80 cursor-none" target="_blank" rel="noopener noreferrer" />,
                      ul: ({...props}) => <ul {...props} className="list-disc pl-4 mt-2 space-y-1" />,
                      p: ({...props}) => <p {...props} className="mb-2 last:mb-0" />,
                      strong: ({...props}) => <strong {...props} className="font-bold" />
                    }}
                  >
                    {msg.text}
                  </ReactMarkdown>
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white rounded-2xl rounded-bl-none px-4 py-3 shadow-sm border border-[#48c0b2]/10">
                  <div className="flex gap-1.5 items-center h-2">
                    <span className="w-2 h-2 bg-[#48c0b2] rounded-full animate-bounce"></span>
                    <span className="w-2 h-2 bg-[#f7a6dc] rounded-full animate-bounce [animation-delay:0.15s]"></span>
                    <span className="w-2 h-2 bg-[#fde047] rounded-full animate-bounce [animation-delay:0.3s]"></span>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </div>

        <div className="bg-white border-t border-[#48c0b2]/10 z-20 p-3 pb-8 sm:pb-3 shadow-[0_-4px_20px_rgba(0,0,0,0.02)] shrink-0">
          <form onSubmit={handleSend} className="flex gap-2 relative">
            <input
              type="text"
              value={input}
              disabled={isLoading || isCooldown}
              onChange={(e) => setInput(e.target.value)}
              placeholder={isCooldown ? "Stabilizing..." : "Ask me anything..."}
              className="flex-1 bg-[#f8fafc] border border-gray-100 rounded-xl px-4 py-3 text-base focus:ring-2 focus:ring-[#48c0b2]/20 focus:border-[#48c0b2] outline-none transition-all placeholder:text-gray-400 disabled:opacity-60 disabled:cursor-not-allowed text-[#1e293b] font-medium cursor-none"
            />
            <button 
              type="submit" 
              disabled={!input.trim() || isLoading || isCooldown}
              className="bg-giq-purple hover:bg-[#2a8f85] text-white p-3 rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg active:scale-95 flex items-center justify-center w-12 cursor-none"
              aria-label="Send Message"
            >
              {isLoading ? (
                 <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                 <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
              )}
            </button>
          </form>
          <div className="text-center mt-2 hidden sm:block">
             <p className="text-[10px] text-gray-400 font-medium tracking-wide">
               The Cat can make mistakes in sleep.
             </p>
          </div>
        </div>
      </div>

      <button 
        onClick={toggleChat}
        className={`
          pointer-events-auto
          group relative flex items-center justify-center 
          w-14 h-14 sm:w-16 sm:h-16 
          rounded-full 
          bg-[#48c0b2] hover:bg-[#2a8f85]
          shadow-[0_4px_25px_rgba(72,192,178,0.5)] 
          transition-all duration-300
          hover:scale-105 active:scale-95
          cursor-none mr-4 mb-4 sm:mr-0 sm:mb-0
          z-[9000]
          ${isOpen ? "rotate-90 opacity-0 pointer-events-none scale-0" : "scale-100 opacity-100"}
        `}
        aria-label="Open Chat"
      >
        <div className="w-12 h-12 sm:w-14 sm:h-14 bg-white rounded-full flex items-center justify-center overflow-hidden relative transform-gpu">
           <div className="w-full h-full p-2 relative"> 
             <Image 
               src="/media/cat.svg" 
               alt="Chat" 
               fill
               className="object-contain drop-shadow-sm group-hover:rotate-12 transition-transform duration-300" 
             />
           </div>
        </div>

        <span className="absolute top-0 right-0 translate-x-[-2px] translate-y-[2px] w-4 h-4 bg-[#fde047] rounded-full animate-bounce shadow-md"></span>
      </button>
    </div>
  );
}