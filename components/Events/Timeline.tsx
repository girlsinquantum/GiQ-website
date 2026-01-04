"use client";

import { useState, useEffect, useCallback } from "react";
import { GiQEvent } from "@/lib/events";
import FrequencyTuner from "./FrequencyTuner";
import { createPortal } from "react-dom";
import Image from "next/image";

interface Props {
  events: GiQEvent[];
}

export default function QuantumTimeline({ events }: Props) {
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [activeGalleryEvent, setActiveGalleryEvent] = useState<GiQEvent | null>(null);

  const allTags = Array.from(new Set(events.flatMap((e) => e.tags)));

  const filteredEvents = activeTag
    ? events.filter((e) => e.tags.includes(activeTag))
    : events;

  const now = new Date();
  const upcomingEvents = filteredEvents.filter(e => new Date(e.date) >= now);
  const pastEvents = filteredEvents.filter(e => new Date(e.date) < now);

  useEffect(() => {
    if (upcomingEvents.length > 0 && !expandedId) {
      setExpandedId(upcomingEvents[0].id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const toggleExpand = (id: string) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  const openLightbox = (event: GiQEvent, index: number) => {
    setActiveGalleryEvent(event);
    setLightboxIndex(index);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setLightboxIndex(null);
    setActiveGalleryEvent(null);
    document.body.style.overflow = '';
  };

  return (
    <div className="relative w-full">
      <FrequencyTuner
        activeTag={activeTag}
        onToggle={setActiveTag}
        tags={allTags}
      />

      <div className="relative max-w-6xl mx-auto min-h-[500px] px-4">
        
        <div className="relative">
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-giq-main via-giq-purple to-transparent opacity-30 md:-translate-x-1/2 -z-10 rounded-full" />
          
          {upcomingEvents.map((event, index) => (
             <TimelineRow 
               key={event.id} 
               event={event} 
               index={index} 
               isPast={false}
               expandedId={expandedId}
               toggleExpand={toggleExpand}
               openLightbox={openLightbox}
             />
          ))}
        </div>

        {upcomingEvents.length > 0 && pastEvents.length > 0 && (
          <div className="relative py-12 flex items-center justify-center md:my-8">
            <div className="absolute left-4 md:left-1/2 h-full w-px border-l-2 border-dashed border-gray-200 md:-translate-x-1/2 -z-20" />
            <div className="bg-white border border-giq-main text-giq-dark px-6 py-2 rounded-full text-xs font-black tracking-[0.2em] uppercase shadow-lg shadow-giq-light z-30 flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-giq-main opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-giq-dark"></span>
              </span>
              Present Day
            </div>
          </div>
        )}

        <div className="relative pb-20">
           <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px border-l-2 border-dashed border-gray-200 md:-translate-x-1/2 -z-10" />

           {pastEvents.map((event, index) => (
             <TimelineRow 
               key={event.id} 
               event={event} 
               index={index + upcomingEvents.length}
               isPast={true}
               expandedId={expandedId}
               toggleExpand={toggleExpand}
               openLightbox={openLightbox}
             />
           ))}
        </div>

        {filteredEvents.length === 0 && (
          <div className="text-center py-20 bg-gray-50/50 rounded-3xl border border-dashed border-gray-200">
            <h3 className="text-xl font-bold text-gray-900">No events found</h3>
            <p className="text-gray-500 mt-2">Try adjusting your frequency tuner.</p>
          </div>
        )}
      </div>

      {activeGalleryEvent && lightboxIndex !== null && (
        <HolographicLightbox 
          event={activeGalleryEvent} 
          startIndex={lightboxIndex} 
          onClose={closeLightbox} 
        />
      )}
    </div>
  );
}

interface TimelineRowProps {
  event: GiQEvent;
  index: number;
  isPast: boolean;
  expandedId: string | null;
  toggleExpand: (id: string) => void;
  openLightbox: (event: GiQEvent, index: number) => void;
}

function TimelineRow({ event, index, isPast, expandedId, toggleExpand, openLightbox }: TimelineRowProps) {
  const isExpanded = expandedId === event.id;
  const isEven = index % 2 === 0;

  return (
    <div className={`relative flex flex-col md:flex-row items-center gap-0 group mb-16 ${isPast ? "opacity-80 hover:opacity-100 transition-opacity duration-500" : ""}`}>
      
      <div className={`w-full md:w-1/2 flex ${isEven ? 'md:justify-end md:pr-12' : 'md:justify-end md:pl-12 order-1 md:order-3'}`}>
        {isEven ? (
          <TimelineCard 
            event={event} isExpanded={isExpanded} isPast={isPast} 
            onToggle={() => toggleExpand(event.id)}
            onImageClick={(idx) => openLightbox(event, idx)}
          />
        ) : (
          <DateMarker date={event.date} align="left" isPast={isPast} />
        )}
      </div>

      <div className="relative z-20 order-2 flex-shrink-0 my-4 md:my-0">
          <div className={`hidden md:block absolute top-1/2 w-12 h-0.5 -z-10 transition-colors duration-300
            ${isExpanded ? 'bg-giq-main' : 'bg-gray-200'}
            ${isPast ? 'bg-gray-200' : ''}
            ${isEven ? 'right-1/2' : 'left-1/2'}
          `} />
          
          <button
            onClick={() => toggleExpand(event.id)}
            className={`w-12 h-12 rounded-full border-4 flex items-center justify-center transition-all duration-500 relative bg-white
              ${isExpanded ? "border-giq-main scale-110 shadow-lg" : "border-gray-200 hover:border-giq-purple"}
              ${isPast ? "grayscale" : ""}
            `}
          >
            {isPast ? (
              <span className="text-lg opacity-50">📼</span> 
            ) : (
              <div className="relative">
                 <span className="absolute -inset-1 rounded-full bg-giq-main opacity-20 animate-ping" />
                 <span className="w-3 h-3 bg-giq-main rounded-full block relative z-10" />
              </div>
            )}
          </button>
      </div>

      <div className={`w-full md:w-1/2 flex ${isEven ? 'md:justify-start md:pl-12 order-3' : 'md:justify-start md:pr-12 order-1'}`}>
          {isEven ? (
            <DateMarker date={event.date} align="right" isPast={isPast} />
          ) : (
          <TimelineCard 
            event={event} isExpanded={isExpanded} isPast={isPast} 
            onToggle={() => toggleExpand(event.id)}
            onImageClick={(idx) => openLightbox(event, idx)}
          />
          )}
      </div>
    </div>
  )
}

function DateMarker({ date, align, isPast }: { date: string, align: 'left' | 'right', isPast: boolean }) {
  return (
    <div className={`hidden md:flex flex-col py-4 ${align === 'right' ? 'items-start text-left' : 'items-end text-right'} w-full`}>
      <span className={`text-5xl font-black leading-none tracking-tighter select-none transition-colors duration-300 ${isPast ? 'text-gray-200' : 'text-giq-deep'}`}>
        {new Date(date).getDate()}
      </span>
      <span className={`text-sm font-bold uppercase tracking-widest ${isPast ? 'text-gray-400' : 'text-giq-main'}`}>
        {new Date(date).toLocaleDateString("en-US", { month: "long", year: "numeric" })}
      </span>
    </div>
  );
}

function TimelineCard({ 
  event, isExpanded, isPast, onToggle, onImageClick 
}: { 
  event: GiQEvent, isExpanded: boolean, isPast: boolean, onToggle: () => void, onImageClick: (i: number) => void
}) {
  return (
    <div 
      className={`relative w-full bg-white rounded-2xl border transition-all duration-500 overflow-hidden group
        ${isExpanded 
          ? 'shadow-2xl ring-1 ring-giq-main/20 scale-100 border-giq-light' 
          : 'shadow-sm hover:shadow-xl hover:-translate-y-1 border-gray-100 hover:border-giq-purple/30'
        }
        ${isPast ? 'bg-gray-50/50' : 'bg-white'}
      `}
    >
      <div className="md:hidden bg-gray-50 px-4 py-2 text-xs font-bold text-gray-400 flex justify-between items-center border-b border-gray-100">
         <span>{new Date(event.date).toLocaleDateString(undefined, { dateStyle: 'long'})}</span>
         {isPast && <span className="text-[10px] bg-gray-200 px-2 py-0.5 rounded text-gray-500">ARCHIVED</span>}
      </div>

      <div onClick={onToggle} className="p-6 cursor-pointer relative overflow-hidden">
        {isPast && (
          <div className="absolute inset-0 bg-gray-50/20 backdrop-grayscale z-10 group-hover:backdrop-grayscale-0 transition-all duration-700 pointer-events-none" />
        )}

        <div className="flex flex-wrap items-center gap-2 mb-3 relative z-20">
           {event.tags.map(tag => (
             <span key={tag} className={`text-[10px] font-bold px-2 py-1 rounded-md uppercase tracking-wide
               ${isPast ? 'bg-gray-200 text-gray-500' : 'bg-giq-light text-giq-dark'}
             `}>
               {tag}
             </span>
           ))}
        </div>

        <h3 className="text-xl md:text-2xl font-extrabold text-giq-text mb-2 leading-tight group-hover:text-giq-main transition-colors relative z-20">
          {event.title}
        </h3>

        <div className="flex items-center gap-2 text-xs font-semibold text-gray-400 mb-4 relative z-20">
          <span>📍 {event.location}</span>
        </div>

        {!isExpanded && (
           <p className="text-sm text-gray-500 line-clamp-2 relative z-20">{event.description}</p>
        )}
        
        <div className={`mt-4 flex items-center gap-2 text-sm font-bold transition-all duration-300 relative z-20 ${isExpanded ? 'opacity-0 h-0' : 'opacity-100 text-giq-purple group-hover:gap-3'}`}>
          <span>{isPast ? 'Open Archive' : 'View Details'}</span>
          <span>→</span>
        </div>
      </div>

      <div className={`transition-all duration-500 ease-in-out bg-white border-t border-gray-100 relative z-20
        ${isExpanded ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'}
      `}>
         <div className="p-6 pt-4">
            {event.coverImage && (
              <div className="w-full h-48 rounded-xl overflow-hidden mb-5 relative group/image">
                <Image 
                  src={event.coverImage} 
                  alt="Event Cover"
                  fill
                  className="object-cover"
                />
              </div>
            )}

            <p className="text-gray-600 text-sm leading-relaxed mb-6 font-medium">
              {event.description}
            </p>

            {isPast && event.gallery && event.gallery.length > 0 && (
              <div className="mb-8 bg-gray-50 p-4 rounded-xl border border-gray-100">
                <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                  <span>📼</span> Event Memories
                </h4>
                <div className="grid grid-cols-3 gap-2">
                  {event.gallery.map((img, i) => (
                    <button 
                      key={i} 
                      onClick={(e) => { e.stopPropagation(); onImageClick(i); }}
                      className="relative aspect-square rounded-lg overflow-hidden group/thumb cursor-pointer hover:ring-2 ring-giq-purple transition-all"
                    >
                      <Image 
                        src={img} 
                        alt={`Gallery ${i}`}
                        fill
                        className="object-cover transition-transform duration-500 group-hover/thumb:scale-110" 
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover/thumb:bg-black/20 transition-colors flex items-center justify-center">
                        <span className="opacity-0 group-hover/thumb:opacity-100 text-white text-xs font-bold backdrop-blur-md px-2 py-1 rounded">VIEW</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {event.link ? (
              <a 
                href={event.link}
                target="_blank"
                className={`flex w-full items-center justify-center py-4 rounded-xl font-bold text-white transition-all shadow-lg transform hover:scale-[1.02]
                  ${isPast 
                    ? 'bg-gray-800 hover:bg-black shadow-gray-400/20' 
                    : 'bg-giq-main hover:bg-giq-dark shadow-giq-main/30'
                  }
                `}
              >
                {isPast ? 'Watch Recording' : 'Secure Your Spot'}
              </a>
            ) : (
              <div className="w-full py-4 bg-gray-100 text-gray-400 font-bold text-center rounded-xl text-sm italic">
                {isPast ? 'No public record available' : 'Registration opening soon'}
              </div>
            )}
         </div>
      </div>
    </div>
  );
}

function HolographicLightbox({ event, startIndex, onClose }: { event: GiQEvent, startIndex: number, onClose: () => void }) {
  const [currentIndex, setCurrentIndex] = useState(startIndex);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') onClose();
    if (e.key === 'ArrowRight') setCurrentIndex(prev => (prev + 1) % event.gallery.length);
    if (e.key === 'ArrowLeft') setCurrentIndex(prev => (prev - 1 + event.gallery.length) % event.gallery.length);
  }, [event.gallery.length, onClose]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  if (typeof document === 'undefined') return null;

  return createPortal(
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-xl animate-in fade-in duration-300">
      
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-giq-purple/20 blur-[120px] rounded-full mix-blend-screen" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-giq-main/20 blur-[120px] rounded-full mix-blend-screen" />
      </div>

      <button 
        onClick={onClose}
        className="absolute top-6 right-6 z-50 p-3 bg-white/10 hover:bg-white/20 rounded-full text-white backdrop-blur-md border border-white/10 transition-all transform hover:rotate-90"
      >
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
      </button>

      <div className="relative w-full max-w-5xl h-[80vh] flex flex-col items-center justify-center p-4">
        
        <div className="relative w-full h-full flex items-center justify-center">
                <Image 
                  key={currentIndex}
                  src={event.gallery[currentIndex]} 
                  alt="Memory"
                  fill
                  className="object-contain"
                />
            </div>

        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-3 p-2 bg-black/40 backdrop-blur-xl rounded-full border border-white/10 max-w-[90vw] overflow-x-auto scrollbar-hide">
          {event.gallery.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`relative w-12 h-12 rounded-lg overflow-hidden flex-shrink-0 transition-all duration-300 border-2 ${
                idx === currentIndex ? 'border-giq-main scale-110 opacity-100' : 'border-transparent opacity-50 hover:opacity-100'
              }`}
            >
            <Image 
                 src={img} 
                 alt="thumb" 
                 fill
                 className="object-cover"
              />
            </button>
          ))}
        </div>

        <button 
          onClick={() => setCurrentIndex(prev => (prev - 1 + event.gallery.length) % event.gallery.length)}
          className="absolute left-4 top-1/2 -translate-y-1/2 p-4 text-white hover:text-giq-main transition-colors"
        >
          <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
        </button>
        <button 
          onClick={() => setCurrentIndex(prev => (prev + 1) % event.gallery.length)}
          className="absolute right-4 top-1/2 -translate-y-1/2 p-4 text-white hover:text-giq-main transition-colors"
        >
          <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
        </button>
      </div>

      <div className="absolute top-6 left-6 text-white z-40">
        <h3 className="text-xl font-bold">{event.title}</h3>
        <p className="text-sm opacity-60 font-mono">Memory {currentIndex + 1} / {event.gallery.length}</p>
      </div>

    </div>,
    document.body
  );
}