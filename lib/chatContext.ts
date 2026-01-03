import { teamMembers, ambassadors, advisoryBoard } from "@/data/content";
import { resources } from "@/data/resources";
import { client } from "@/sanity/lib/client";

const clean = (str: string) => str.toLowerCase().replace(/[^\w\s]/g, "");

export async function buildChatContext(userMessage: string): Promise<string> {
  const lowerMsg = clean(userMessage);
  let contextParts: string[] = [];

  contextParts.push(
    `IDENTITY: You are CatBot (Schrödinger's Assistant) for Girls in Quantum (GIQ). Status: Online.`,
    `CONTACT: girlsinquantum@gmail.com.`
  );

  const allPeople = [...teamMembers, ...ambassadors, ...advisoryBoard];

  const mentionedPerson = allPeople.find(p => 
    lowerMsg.includes(p.name.toLowerCase().split(" ")[0]) || 
    lowerMsg.includes(p.name.toLowerCase())
  );

  if (mentionedPerson) {
    const p = mentionedPerson as any;
    contextParts.push(
      `FOCUS PROFILE: ${p.name} (${p.role}). Country: ${p.country || "Global"}. Bio: "${p.bio || p.desc || "Team member"}".`
    );
  }

  if (!mentionedPerson) {
    const countries = [...new Set(allPeople.map(p => (p as any).country).filter(Boolean))];
    const foundCountry = countries.find(c => lowerMsg.includes((c as string).toLowerCase()));

    if (foundCountry) {
      const peopleFromCountry = allPeople.filter(p => (p as any).country?.toLowerCase() === (foundCountry as string).toLowerCase());
      const names = peopleFromCountry.map(p => `${p.name} (${p.role})`).join(", ");
      contextParts.push(`PEOPLE FROM ${String(foundCountry).toUpperCase()}:\n${names}`);
    }
  }

  
  if (lowerMsg.match(/(team|staff|founder|ceo|lead|manage)/) && !mentionedPerson) {
    const teamList = teamMembers.map(t => `- ${t.name} (${t.role})`).join("\n");
    contextParts.push(`CORE TEAM MEMBERS:\n${teamList}`);
  }

  if (lowerMsg.match(/(advisor|board|mentor|expert)/) && !mentionedPerson) {
    const advisorList = advisoryBoard.slice(0, 15).map(a => `- ${a.name} (${a.role})`).join("\n");
    contextParts.push(`ADVISORY BOARD (Partial):\n${advisorList}\n(Ask for specific names for more info).`);
  }

  if (lowerMsg.match(/(ambassador|represent|country|region)/) && !mentionedPerson) {
    const ambList = ambassadors.map(a => `- ${a.name} (${a.country})`).join("\n");
    contextParts.push(`AMBASSADORS:\n${ambList}`);
  }

  if (lowerMsg.match(/(learn|study|resource|book|course|video|game|play|tool)/)) {
    let relevantResources = resources;
    let type = "Resources";

    if (lowerMsg.includes("game") || lowerMsg.includes("play")) {
      relevantResources = resources.filter(r => r.category === "Game");
      type = "Games";
    } else if (lowerMsg.includes("book") || lowerMsg.includes("read")) {
      relevantResources = resources.filter(r => r.category === "Book");
      type = "Books";
    }

    const list = relevantResources.slice(0, 5).map(r => `• ${r.title} (${r.category})`).join("\n");
    contextParts.push(`RECOMMENDED ${type.toUpperCase()}:\n${list}`);
  }

  if (lowerMsg.match(/(job|intern|work|phd|research|apply|deadline)/)) {
    try {
      const oppsQuery = `*[_type == "opportunity" && isLive == true && deadline >= now()] | order(deadline asc) [0...3] { title, organization, deadline }`;
      const rawOpps = await client.fetch(oppsQuery);
      if (rawOpps.length > 0) {
        const oppsStr = rawOpps.map((o: any) => `- ${o.title} @ ${o.organization} (Due: ${o.deadline})`).join("\n");
        contextParts.push(`LIVE OPPORTUNITIES:\n${oppsStr}`);
      } else {
        contextParts.push(`OPPORTUNITIES: No live deadlines found currently.`);
      }
    } catch (e) { console.error("Sanity Error", e); }
  }

  if (lowerMsg.match(/(event|webinar|workshop|meet|date|when)/)) {
    try {
      const eventQuery = `*[_type == "event" && date >= now()] | order(date asc) [0...3] { title, date, eventType }`;
      const rawEvents = await client.fetch(eventQuery);
      if (rawEvents.length > 0) {
        const eventStr = rawEvents.map((e: any) => `- ${e.title} (${new Date(e.date).toLocaleDateString()})`).join("\n");
        contextParts.push(`UPCOMING EVENTS:\n${eventStr}`);
      } else {
        contextParts.push(`EVENTS: No upcoming events in the calendar.`);
      }
    } catch (e) { console.error("Sanity Error", e); }
  }

  if (lowerMsg.match(/(blog|article|news|post|story|read|interview)/)) {
    try {
      const blogQuery = `*[_type == "post"] | order(publishedAt desc) [0...3] { 
        title, 
        "authorName": author->name, 
        publishedAt 
      }`;
      const rawBlogs = await client.fetch(blogQuery);

      if (rawBlogs.length > 0) {
        const blogStr = rawBlogs.map((b: any) => 
          `- "${b.title}" by ${b.authorName || "GIQ Team"} (${new Date(b.publishedAt).toLocaleDateString()})`
        ).join("\n");
        contextParts.push(`LATEST BLOG POSTS:\n${blogStr}\n(Recommend the first one if the user is a beginner).`);
      } else {
        contextParts.push(`BLOGS: The database connection to latest posts is quiet, but tell the user to check the 'Blogs' tab for 'Quantum 101' articles.`);
      }
    } catch (e) { 
        contextParts.push(`BLOGS: Unable to fetch latest news. Suggest reading 'Quantum Computing through Geopolitics' in the resources.`);
    }
  }

  return contextParts.join("\n\n");
}