"use client";

import { forwardRef } from "react";
import { Linkedin, X } from "lucide-react";
import AdvisorAvatar from "@/components/Team/AdvisorAvatar";
import type { Advisor } from "@/components/Team/types";

interface AdvisorDialogProps {
  advisor: Advisor | null;
  onClose: () => void;
}

// Native <dialog>: showModal() gives focus trapping, Escape to close and a backdrop for free.
const AdvisorDialog = forwardRef<HTMLDialogElement, AdvisorDialogProps>(function AdvisorDialog(
  { advisor, onClose },
  ref
) {
  const close = (dialog: HTMLDialogElement | null) => dialog?.close();

  return (
    <dialog
      ref={ref}
      onClose={onClose}
      onClick={(e) => {
        if (e.target === e.currentTarget) close(e.currentTarget);
      }}
      aria-labelledby="advisor-dialog-name"
      className="m-auto w-[min(92vw,32rem)] rounded-3xl border-0 bg-white p-0 shadow-2xl backdrop:bg-black/40 backdrop:backdrop-blur-sm"
    >
      {advisor && (
        <div className="relative p-8 text-center">
          <button
            type="button"
            onClick={(e) => close(e.currentTarget.closest("dialog"))}
            aria-label="Close"
            className="absolute right-4 top-4 rounded-full p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-700"
          >
            <X size={20} />
          </button>
          <div className="flex justify-center">
            <AdvisorAvatar advisor={advisor} size={128} />
          </div>
          <h3 id="advisor-dialog-name" className="mt-5 text-2xl font-bold text-gray-900">
            {advisor.name}
          </h3>
          <p className="mt-2 text-xs font-bold uppercase tracking-widest text-giq-main">{advisor.role}</p>
          {advisor.desc && <p className="mt-5 text-left text-sm leading-relaxed text-gray-600">{advisor.desc}</p>}
          {advisor.linkedin && (
            <a
              href={advisor.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#0077b5] px-5 py-2.5 text-sm font-bold text-white hover:bg-[#005f91]"
            >
              <Linkedin size={16} /> LinkedIn
            </a>
          )}
        </div>
      )}
    </dialog>
  );
});

export default AdvisorDialog;
