"use client";

import { useState, useEffect } from "react";

interface Props {
  title: string;
  slug: string;
}

export default function BlogShareButtons({ title, slug }: Props) {
  const [currentUrl, setCurrentUrl] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setCurrentUrl(`${window.location.origin}/blogs/${slug}`);
  }, [slug]);

  const handleShare = (platform: 'twitter' | 'linkedin') => {
    if (!currentUrl) return;

    let shareUrl = "";
    const text = encodeURIComponent(`Check out "${title}" by Girls in Quantum! ⚛️`);
    const url = encodeURIComponent(currentUrl);

    if (platform === 'twitter') {
      shareUrl = `https://twitter.com/intent/tweet?text=${text}&url=${url}`;
    } else if (platform === 'linkedin') {
      shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${url}`;
    }

    window.open(shareUrl, 'newwindow', 'width=600,height=400,left=100,top=100');
  };

  const copyToClipboard = async () => {
    if (!currentUrl) return;

    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(currentUrl);
        handleCopySuccess();
      } else {
        throw new Error("Clipboard API unavailable");
      }
    } catch (err) {
      try {
        const textArea = document.createElement("textarea");
        textArea.value = currentUrl;
        
        textArea.style.position = "fixed";
        textArea.style.left = "-9999px";
        textArea.style.top = "0";
        
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        
        const successful = document.execCommand('copy');
        document.body.removeChild(textArea);
        
        if (successful) handleCopySuccess();
      } catch (fallbackErr) {
        console.error("Failed to copy link", fallbackErr);
      }
    }
  };

  const handleCopySuccess = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex items-center gap-3 text-gray-400">
      
      <button 
        onClick={() => handleShare('twitter')}
        className="hover:text-giq-main hover:scale-110 transition-all duration-200"
        title="Share on Twitter"
      >
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg>
      </button>

      <button 
        onClick={() => handleShare('linkedin')}
        className="hover:text-giq-purple hover:scale-110 transition-all duration-200"
        title="Share on LinkedIn"
      >
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
      </button>

      <button 
        onClick={copyToClipboard}
        className={`hover:scale-110 transition-all duration-200 ${copied ? 'text-green-500' : 'hover:text-gray-600'}`}
        title="Copy Link"
      >
        {copied ? (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
        ) : (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" /></svg>
        )}
      </button>
    </div>
  );
}