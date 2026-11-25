import { ArrowUpRight, CalendarDays, MapPin, Mic } from "lucide-react";
import { talks, type Talk } from "@/data/talks";

function isUpcoming(talk: Talk, now: Date): boolean {
  return Boolean(talk.date) && new Date(`${talk.date}T23:59:59Z`) >= now;
}

function TalkCard({ talk, upcoming }: { talk: Talk; upcoming: boolean }) {
  return (
    <article className="group relative flex h-full flex-col rounded-3xl border border-white/60 bg-white/80 p-7 shadow-sm backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      <div className="mb-4 flex flex-wrap items-center gap-2">
        <span className="rounded-full bg-giq-light px-3 py-1 text-xs font-bold uppercase tracking-wider text-giq-dark">
          {talk.kind}
        </span>
        {upcoming && (
          <span className="rounded-full bg-giq-yellow px-3 py-1 text-xs font-bold uppercase tracking-wider text-giq-text">
            Upcoming
          </span>
        )}
      </div>

      <p className="text-sm font-semibold text-giq-deep">{talk.event}</p>
      <h3 className="mt-1 text-xl font-bold text-giq-text">{talk.title}</h3>
      <p className="mt-3 flex-1 text-gray-600 leading-relaxed">{talk.description}</p>

      <div className="mt-5 space-y-1.5 text-sm text-gray-500">
        <p className="flex items-center gap-2">
          <Mic size={15} className="text-giq-main" /> {talk.speakers.join(", ")}
        </p>
        <p className="flex items-center gap-2">
          <CalendarDays size={15} className="text-giq-main" /> {talk.dateLabel}
        </p>
        {talk.location && (
          <p className="flex items-center gap-2">
            <MapPin size={15} className="text-giq-main" /> {talk.location}
          </p>
        )}
      </div>

      {talk.link && (
        <a
          href={talk.link}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-5 inline-flex items-center gap-1 self-start font-bold text-giq-dark hover:text-giq-deep"
        >
          Learn more <ArrowUpRight size={16} />
        </a>
      )}
    </article>
  );
}

export default function TalksHighlights() {
  if (talks.length === 0) return null;
  const now = new Date();

  return (
    <section className="mb-24">
      <div className="mb-10 text-center">
        <span className="text-sm font-bold uppercase tracking-widest text-giq-purple">On stage</span>
        <h2 className="mt-2 text-4xl md:text-5xl font-bold text-giq-text">Talks &amp; Highlights</h2>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600">
          Where our team has been speaking, chairing panels and representing Girls in Quantum around the world.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {talks.map((talk) => (
          <TalkCard key={`${talk.event}-${talk.title}`} talk={talk} upcoming={isUpcoming(talk, now)} />
        ))}
      </div>
    </section>
  );
}
