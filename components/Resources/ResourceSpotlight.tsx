import { ArrowUpRight, Sparkles } from "lucide-react";

const QUANTUM_INTUITION_URL = "https://thequantumeconomy.com/quantumintuition";

const HIGHLIGHTS = [
  "22 short lessons",
  "Hand-drawn explainer videos",
  "Run real Qiskit code in the browser",
  "Free, no install, works on your phone",
];

export default function ResourceSpotlight() {
  return (
    <section className="relative mb-12 overflow-hidden rounded-3xl bg-gradient-to-br from-giq-deep via-purple-700 to-giq-dark p-8 md:p-10 text-white shadow-xl">
      <div className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-giq-purple/30 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-20 left-1/3 h-56 w-56 rounded-full bg-giq-main/30 blur-3xl" />

      <div className="relative flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
        <div className="max-w-2xl">
          <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-xs font-bold uppercase tracking-widest">
            <Sparkles size={14} /> Featured · Built by our team
          </span>
          <h2 className="mt-4 text-3xl md:text-4xl font-bold">Quantum Intuition</h2>
          <p className="mt-3 text-lg text-white/85 leading-relaxed">
            A free beginner course that starts with the physics, not the formulas: picture first, math second, code third.
            Created by Dhruv Sachdeva, our Head of Team &amp; Project Management, with The Quantum Economy.
          </p>
          <ul className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-white/90">
            {HIGHLIGHTS.map((item) => (
              <li key={item} className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-giq-yellow" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        <a
          href={QUANTUM_INTUITION_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex shrink-0 items-center justify-center gap-2 self-start md:self-center rounded-full bg-white px-7 py-3 font-bold text-giq-deep shadow-lg transition-all hover:-translate-y-1 hover:bg-giq-yellow"
        >
          Start learning <ArrowUpRight size={18} />
        </a>
      </div>
    </section>
  );
}
