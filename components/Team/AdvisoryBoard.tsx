"use client";

import { useMemo, useRef, useState } from "react";
import { Search, X } from "lucide-react";
import AdvisorAvatar from "@/components/Team/AdvisorAvatar";
import AdvisorDialog from "@/components/Team/AdvisorDialog";
import type { Advisor } from "@/components/Team/types";

const INITIAL_VISIBLE = 15;

function matches(advisor: Advisor, query: string): boolean {
  const haystack = `${advisor.name} ${advisor.role} ${advisor.desc ?? ""}`.toLowerCase();
  return query
    .toLowerCase()
    .split(/\s+/)
    .filter(Boolean)
    .every((word) => haystack.includes(word));
}

export default function AdvisoryBoard({ advisors }: { advisors: Advisor[] }) {
  const [query, setQuery] = useState("");
  const [showAll, setShowAll] = useState(false);
  const [selected, setSelected] = useState<Advisor | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);

  const isSearching = query.trim().length > 0;
  const filtered = useMemo(
    () => (isSearching ? advisors.filter((a) => matches(a, query)) : advisors),
    [advisors, query, isSearching]
  );
  const visible = isSearching || showAll ? filtered : filtered.slice(0, INITIAL_VISIBLE);
  const hiddenCount = filtered.length - visible.length;

  const open = (advisor: Advisor) => {
    setSelected(advisor);
    dialogRef.current?.showModal();
  };

  return (
    <div>
      <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <p className="max-w-xl text-gray-600">
          {advisors.length} researchers, founders and industry leaders who guide our programs and mentor our
          community. Select anyone to read more.
        </p>
        <label className="relative w-full md:w-80">
          <span className="sr-only">Search advisors</span>
          <Search size={18} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by name, role or topic"
            className="w-full rounded-full border border-gray-200 bg-white/80 py-3 pl-11 pr-10 text-sm text-gray-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-giq-main"
          />
          {isSearching && (
            <button
              type="button"
              onClick={() => setQuery("")}
              aria-label="Clear search"
              className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1 text-gray-400 hover:text-gray-700"
            >
              <X size={16} />
            </button>
          )}
        </label>
      </div>

      {filtered.length === 0 ? (
        <p className="py-12 text-center text-gray-500">No advisors match “{query}”.</p>
      ) : (
        <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {visible.map((advisor) => (
            <li key={advisor.name}>
              <button
                type="button"
                onClick={() => open(advisor)}
                className="group flex h-full w-full flex-col items-center rounded-2xl border border-white/60 bg-white/80 p-5 text-center shadow-sm backdrop-blur-md transition-all hover:-translate-y-1 hover:shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-giq-main"
              >
                <AdvisorAvatar advisor={advisor} size={88} />
                <span className="mt-4 text-base font-bold leading-tight text-gray-900 group-hover:text-giq-dark">
                  {advisor.name}
                </span>
                <span className="mt-2 line-clamp-2 text-[11px] font-bold uppercase tracking-wider text-giq-main">
                  {advisor.role}
                </span>
              </button>
            </li>
          ))}
        </ul>
      )}

      {hiddenCount > 0 && (
        <div className="mt-8 text-center">
          <button
            type="button"
            onClick={() => setShowAll(true)}
            className="rounded-full border border-giq-main px-6 py-3 text-sm font-bold text-giq-dark transition-colors hover:bg-giq-main hover:text-white"
          >
            Show all {filtered.length} advisors
          </button>
        </div>
      )}

      <AdvisorDialog ref={dialogRef} advisor={selected} onClose={() => setSelected(null)} />
    </div>
  );
}
