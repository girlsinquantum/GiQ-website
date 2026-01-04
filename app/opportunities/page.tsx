
import { client } from "@/sanity/lib/client";
import OpportunityBoard, { type Opportunity } from "@/components/Opportunities/OpportunityBoard"; 

export const dynamic = "force-dynamic";
export const revalidate = 0; 

async function getSanityOpportunities(): Promise<Opportunity[]> {
  const today = new Date().toISOString().split('T')[0];

  //isLive == true: Manual override to hide items
  //deadline > $today: Strict expiry check
  //!defined(deadline): Allows "Rolling" applications
  const query = `
    *[_type == "opportunity" && isLive == true && (deadline >= $today || !defined(deadline))] | order(deadline asc) {
      "id": _id, 
      title,
      organization,
      type,
      location,
      link,
      tags,
      deadline,
      logo
    }
  `;

  return await client.fetch<Opportunity[]>(query, { today });
}

export default async function OpportunitiesPage() {
  const opportunities = await getSanityOpportunities();

  return (
    <main className="min-h-screen bg-white pt-32 pb-24 relative overflow-hidden">
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-4xl mx-auto mb-16">
          <h1 className="text-5xl md:text-7xl font-black text-giq-text mb-6 tracking-tighter">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-giq-main to-giq-blue">
               2026 Opportunities
            </span>
          </h1>
          <p className="text-lg text-gray-600 font-medium max-w-2xl mx-auto">
             Internships, PhDs, and research roles for the Quantum Generation.
          </p>
          
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-giq-light rounded-full text-xs font-bold text-giq-dark border border-giq-main/20">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-giq-main opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-giq-main"></span>
              </span>
              {opportunities.length} Verified Openings
            </div>
          </div>
        </div>

        <OpportunityBoard initialData={opportunities} />
      </div>
    </main>
  );
}