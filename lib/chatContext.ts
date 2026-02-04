import { teamMembers, ambassadors, advisoryBoard } from "@/data/content";
import { resources } from "@/data/resources";
import { client } from "@/sanity/lib/client";

// Type Definitions
interface Person {
  name: string;
  role?: string;
  country?: string;
  bio?: string;
  desc?: string;
}

interface SanityOpportunity {
  title: string;
  organization: string;
  deadline: string;
}

interface SanityEvent {
  title: string;
  date: string;
  eventType: string;
}

interface SanityBlog {
  title: string;
  authorName: string | null;
  publishedAt: string;
}

const clean = (str: string) => str.toLowerCase().replace(/[^\w\s]/g, "");

const HACKATHON_CONTEXT = `
EVENT: Q-volution Hackathon 2026
DATES: February 23 - March 1, 2026.
REGISTRATION DEADLINE: February 20, 2026.
LOCATION: Online (Global).
STATUS: Applications Open. Competitive Selection.

TRACKS & CHALLENGES:
1. Rigetti Computing (Hardware Track):
   - Challenge: Energy Grid Optimization (MPES metric).
   - Tech: QAOA, Weighted Max-Cut.
   - Constraint: 84-qubit Ankaa-3 QPU access limited to Top 10 teams. Others use simulators.
   - Difficulty: Advanced.

2. Quandela (Photonic/Finance Track):
   - Challenge: Option Pricing using Quantum Machine Learning (QML).
   - Tech: MerLin SDK, Reservoir Computing.
   - Task: Predict put/call options.
   - Difficulty: Intermediate/Advanced (ML background preferred).

3. Classiq (Algorithm Track):
   - Challenge: Harmonic Oscillator Solver.
   - Tech: Classiq Platform, Circuit Synthesis.
   - Task: Solve Linear Differential Equations (2020 Tao Xin algorithm).
   - Difficulty: Intermediate/Advanced.

BOOTCAMP (Feb 23-26):
- Speakers: Maria Salatino (Rigetti - STEM Journey), Cassandre Notton (Quandela - QML with MerLin).
- Purpose: Workshops before the 48h Sprint.

APPLICATION REQUIREMENTS:
- PDF Resume, Proof of Work (150 words), Discord Username.
- Apply via: Google Form (linked on website).
`;

export async function buildChatContext(userMessage: string): Promise<string> {
  const lowerMsg = clean(userMessage);
  const contextParts: string[] = [];

  contextParts.push(
    `IDENTITY: You are CatBot (Schrödinger's Assistant) for Girls in Quantum (GIQ). Status: Online.`,
    `CONTACT: girlsinquantum@gmail.com.`
  );

  
  const hackathonKeywords = [
    "hackathon", "q-volution", "qvolution", "competition", "contest", 
    "rigetti", "quandela", "classiq", "bootcamp", "register", "apply", 
    "deadline", "track", "challenge", "hardware", "qpu"
  ];

  if (hackathonKeywords.some(k => lowerMsg.includes(k))) {
    contextParts.push(`CURRENT MAJOR EVENT DETAILS:\n${HACKATHON_CONTEXT}`);
    
    // Date Awareness for the bot
    const today = new Date();
    const deadline = new Date('2026-02-20');
    const daysLeft = Math.ceil((deadline.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    
    if (daysLeft > 0) {
      contextParts.push(`TIME SENSITIVE: There are approx ${daysLeft} days left to register (Deadline Feb 20). Urge them to apply!`);
    } else {
      contextParts.push(`TIME SENSITIVE: Registration is likely closed (Deadline was Feb 20). Check with admin.`);
    }
  }

  const allPeople: Person[] = [...teamMembers, ...ambassadors, ...advisoryBoard];
  const mentionedPerson = allPeople.find(p => 
    lowerMsg.includes(p.name.toLowerCase().split(" ")[0]) || 
    lowerMsg.includes(p.name.toLowerCase())
  );

  if (mentionedPerson) {
    const p = mentionedPerson;
    contextParts.push(
      `FOCUS PROFILE: ${p.name} (${p.role || "Member"}). Country: ${p.country || "Global"}. Bio: "${p.bio || p.desc || "Team member"}".`
    );
  }

  if (!mentionedPerson) {
    const countries = [...new Set(allPeople.map(p => p.country).filter((c): c is string => !!c))];
    const foundCountry = countries.find(c => lowerMsg.includes(c.toLowerCase()));

    if (foundCountry) {
      const peopleFromCountry = allPeople.filter(p => p.country?.toLowerCase() === foundCountry.toLowerCase());
      const names = peopleFromCountry.map(p => `${p.name} (${p.role || "Member"})`).join(", ");
      contextParts.push(`PEOPLE FROM ${foundCountry.toUpperCase()}:\n${names}`);
    }
  }
  
  if (lowerMsg.match(/(team|staff|founder|ceo|lead|manage)/) && !mentionedPerson) {
    const teamList = teamMembers.map(t => `- ${t.name} (${t.role})`).join("\n");
    contextParts.push(`CORE TEAM MEMBERS:\n${teamList}`);
  }

  if (lowerMsg.match(/(learn|study|resource|book|course|video|game|play|tool|python|sdk)/)) {
    if (lowerMsg.includes("sdk") || lowerMsg.includes("tool")) {
       contextParts.push(`HACKATHON TOOLS: PyQuil (Rigetti), MerLin (Quandela), Classiq Platform.`);
    }

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

  // We use Promise.allSettled to fetch data in parallel without crashing if one fails
  const [oppsResult, eventsResult, blogsResult] = await Promise.allSettled([
    // Fetch Opportunities
    client.fetch<SanityOpportunity[]>(
      `*[_type == "opportunity" && isLive == true && deadline >= now()] | order(deadline asc) [0...3] { title, organization, deadline }`
    ),
    client.fetch<SanityEvent[]>(
      `*[_type == "event" && date >= now()] | order(date asc) [0...3] { title, date, eventType }`
    ),
    client.fetch<SanityBlog[]>(
      `*[_type == "post"] | order(publishedAt desc) [0...3] { title, "authorName": author->name, publishedAt }`
    )
  ]);

  // Process Opportunities
  if (oppsResult.status === "fulfilled" && oppsResult.value.length > 0) {
    const opps = oppsResult.value.map(o => `- ${o.title} @ ${o.organization} (Due: ${o.deadline})`).join("\n");
    contextParts.push(`LIVE OPPORTUNITIES:\n${opps}`);
  }

  // Process Events
  if (eventsResult.status === "fulfilled" && eventsResult.value.length > 0) {
    const events = eventsResult.value.map(e => `- ${e.title} (${new Date(e.date).toLocaleDateString()})`).join("\n");
    contextParts.push(`UPCOMING EVENTS:\n${events}`);
  }

  // Process Blogs
  if (blogsResult.status === "fulfilled" && blogsResult.value.length > 0) {
    const blogs = blogsResult.value.map(b => `- "${b.title}" by ${b.authorName || "GIQ"} (${new Date(b.publishedAt).toLocaleDateString()})`).join("\n");
    contextParts.push(`LATEST BLOGS:\n${blogs}`);
  }

  return contextParts.join("\n\n");
}