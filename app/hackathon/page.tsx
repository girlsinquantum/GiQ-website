import type { Metadata } from 'next'
import { client } from '@/sanity/lib/client'
import HackathonHero from '@/components/Hackathon/HackathonHero'
import ChallengeGrid from '@/components/Hackathon/ChallengeGrid'
import CircuitTimeline from '@/components/Hackathon/CircuitTimeline'
import ApplicationTerminal from '@/components/Hackathon/ApplicationTerminal'
import HackathonTeam from '@/components/Hackathon/HackathonTeam'; // Add Import
import SponsorTopology from '@/components/Hackathon/SponsorTopology'

export const metadata: Metadata = {
  title: 'Q-volution Hackathon 2026 | Girls in Quantum',
  description: 'Join the global quantum computing hackathon. Feb 23 - Mar 1. Challenges by Rigetti, Classiq, and Quandela.',
}

async function getHackathonSettings() {
  // Fetch dynamic settings (is the event live? are there announcements?)
  // If fetch fails, fall back to default
  try {
    return await client.fetch(`*[_type == "hackathon"][0]{ isActive, announcements }`);
  } catch {
    return { isActive: false, announcements: [] };
  }
}

export default async function HackathonPage() {
  const settings = await getHackathonSettings();
  const isLive = settings?.isActive || false;

  return (
    <main className="min-h-screen bg-[#1e293b] text-[#e0f7fa] selection:bg-[#f7a6dc] selection:text-[#1e293b]">
      {/* 
         UX NOTE: 
         We pass 'isLive' to the Hero. If the hackathon has started, 
         the Hero changes from a "Countdown" to a "Live Dashboard".
      */}
      <HackathonHero isLive={isLive} />
      
      {/* Announcements Bar (Only visible if active) */}
      {isLive && settings?.announcements?.length > 0 && (
        <div className="bg-[#fde047] text-[#1e293b] font-bold text-center py-3 px-4 font-mono text-sm border-y border-[#1e293b]">
          <span className="animate-pulse mr-2">●</span> 
          BROADCAST: {settings.announcements[0]}
        </div>
      )}

      {/* Intro Text */}
      <div className="container mx-auto px-6 py-16 text-center max-w-3xl">
        <h3 className="text-2xl md:text-3xl font-light mb-6 text-white">
          Three Tracks. One Quantum Leap.
        </h3>
        <p className="leading-loose text-lg text-gray-300">
          The <span className="text-[#f7a6dc] font-medium">Q-volution</span> is here. 
          From optimizing energy grids with <span className="text-[#48c0b2]">Rigetti</span>, 
          to pricing financial options with <span className="text-[#60a5fa]">Quandela</span>, 
          or simulating oscillators with <span className="text-[#fde047]">Classiq</span>, this 
          is your moment to prove your skills.
        </p>
        <p className="mt-4 text-sm text-gray-500 font-mono">
          *Access to quantum hardware is competitive. Prepare your proof of work.
        </p>
      </div>

      <CircuitTimeline />
      
      <ChallengeGrid />
      
      <SponsorTopology />

      <HackathonTeam />
      
      <ApplicationTerminal />
      
    </main>
  )
}