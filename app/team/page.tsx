import Navbar from '@/components/Utilities/Navbar';
import TeamCard from '@/components/Utilities/TeamCard';
import { teamMembers, ambassadors, advisoryBoard } from '@/data/content';

export default function TeamPage() {
  return (
    <main className="bg-gradient-to-b from-giq-light via-white to-white min-h-screen pb-20 overflow-hidden">
      <Navbar />
      
      <div className="fixed top-20 left-[-100px] w-96 h-96 bg-giq-main/10 rounded-full blur-3xl -z-10"></div>
      <div className="fixed bottom-20 right-[-100px] w-96 h-96 bg-purple-300/10 rounded-full blur-3xl -z-10"></div>

      <div className="pt-32 px-4 max-w-7xl mx-auto">
        <div className="text-center mb-16 relative">
          <span className="text-giq-purple font-bold tracking-widest uppercase text-sm">Our Community</span>
          <h1 className="text-5xl md:text-6xl font-bold mt-2 text-gray-900">
            Meet the <span className="text-giq-main relative inline-block">
              Team
              {/* Underline scribble SVG */}
              <svg className="absolute w-full h-3 -bottom-1 left-0 text-giq-main opacity-50" viewBox="0 0 100 10" preserveAspectRatio="none">
                 <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="3" fill="none" />
              </svg>
            </span>
          </h1>
          <p className="text-gray-600 mt-6 max-w-2xl mx-auto text-lg">
            We are a diverse group of students, researchers, and experts united by a single mission: to democratize quantum education.
          </p>
        </div>

        <div className="mb-24">
          <h2 className="text-3xl font-bold text-gray-800 mb-10 pl-4 border-l-4 border-giq-main">
            Leadership & Core Team
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 gap-y-12">
            {teamMembers.map((member, i) => (
              <TeamCard key={i} data={member} index={i} /> 
            ))}
          </div>
        </div>

        <div className="mb-24">
          <h2 className="text-3xl font-bold text-gray-800 mb-10 pl-4 border-l-4 border-giq-purple">
            Advisory Board
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {advisoryBoard.map((advisor, i) => (
              <TeamCard key={i} data={advisor} isAdvisor={true} index={i + 10} />
            ))}
          </div>
        </div>

                <div className="mb-20">
                  <div className="text-center mb-10">
                    <h2 className="text-3xl font-bold text-gray-800 inline-block relative">
                      Global Ambassadors
                      <span className="absolute -top-2 -right-4 text-giq-main text-4xl">.</span>
                    </h2>
                    <p className="text-gray-500 mt-2">Representing GiQ in regions across the world.</p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {ambassadors.map((amb, i) => (
                      <TeamCard key={i} data={amb} index={i + 50} />
                    ))}
                  </div>
                </div>
      </div>
    </main>
  );
}