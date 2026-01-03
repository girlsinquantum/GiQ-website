import { getEvents } from "@/lib/events";
import QuantumTimeline from "@/components/Events/Timeline";

export const revalidate = 60; 

export default async function EventsPage() {
  const { upcoming, past } = await getEvents();
  const allEvents = [...upcoming, ...past];

  return (
    <main className="min-h-screen bg-white pt-32 pb-24 relative overflow-x-hidden">
      
      <div className="fixed top-20 left-10 w-[500px] h-[500px] bg-giq-mint rounded-full blur-[120px] opacity-30 animate-pulse-slow pointer-events-none"></div>
      <div className="fixed bottom-20 right-10 w-[400px] h-[400px] bg-giq-lavender rounded-full blur-[100px] opacity-30 animate-pulse-slow pointer-events-none" style={{ animationDelay: '2s' }}></div>

      <div className="container mx-auto px-4 relative z-10">
        
        <div className="text-center max-w-3xl mx-auto mb-20 animate-in slide-in-from-bottom-5 duration-1000 fade-in">
          <h1 className="text-5xl md:text-7xl font-extrabold text-giq-text mb-6 tracking-tighter">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-giq-purple to-giq-main">
              String of Events
            </span>
          </h1>
          <p className="text-lg md:text-xl text-gray-600 font-medium leading-relaxed">
            Tune into the frequency of our community impact. <br className="hidden md:block"/>
            Explore upcoming events or relive our past milestones.
          </p>
        </div>

        <QuantumTimeline events={allEvents} />

      </div>
    </main>
  );
}