import { createClient } from "next-sanity";
import * as cheerio from "cheerio";
import crypto from "crypto";

const writeClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: "2024-01-01",
  token: process.env.SANITY_API_WRITE_TOKEN,
  useCdn: false,
});


const ALL_QUERIES = [
  'site:.edu "quantum" "REU" 2026 apply',
  'site:.edu "quantum" "summer school" 2026',
  'site:.gov "quantum" "internship" 2026',
  'site:boards.greenhouse.io "quantum" 2026',
  'site:jobs.lever.co "quantum" 2026',
  'site:jobs.ashbyhq.com "quantum" 2026',
  '"HPC" "Research Experiences for Undergraduates" 2026',
  '"Vanderbilt" "Undergraduate Summer Research" 2026'
];

const IGNORE_TITLES = [
  "linkedin", "indeed", "glassdoor", "zoominfo", "rocketreach", "handshake"
];


async function fetchPageContent(url: string): Promise<{ html: string; status: number }> {
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 15000); 
    
    const userAgents = [
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.2 Safari/605.1.15'
    ];
    const randomUA = userAgents[Math.floor(Math.random() * userAgents.length)];

    const res = await fetch(url, {
      signal: controller.signal,
      headers: { 
        'User-Agent': randomUA,
        'Accept': 'text/html,application/xhtml+xml',
      },
      redirect: 'follow'
    });
    
    clearTimeout(timeout);
    
    if (res.ok && new URL(res.url).pathname === "/" && new URL(url).pathname.length > 1) {
       return { html: "", status: 404 }; 
    }

    return { 
      html: res.ok ? await res.text() : "", 
      status: res.status 
    };
  } catch{ 
    return { html: "", status: 500 }; 
  }
}

function getLogoUrl(domain: string): string {
  return `https://logo.clearbit.com/${domain}`;
}


function getPageYear($: cheerio.CheerioAPI, title: string): number {
  const currentYear = new Date().getFullYear();
  const nextYear = currentYear + 1;
  const textContext = [
    $('title').text(),
    $('h1').first().text(),
    title
  ].join(" ").toLowerCase();

  if (textContext.includes(String(nextYear))) return nextYear;
  return nextYear; 
}

function cleanText($: cheerio.CheerioAPI): string {
  $('script, style, nav, footer, svg, noscript, header, aside').remove();
  $('div, p, h1, h2, h3, h4, h5, h6, li, tr, td, br, dd, dt').replaceWith((_, html) => `\n ${$(html).text()} \n`);
  
  return $('body').text()
    .replace(/\u00A0/g, ' ') 
    .replace(/\s+/g, ' '); 
}


function findBestDate($: cheerio.CheerioAPI, pageTitle: string): Date | null {
  let jsonDate: string | null = null;
  $('script[type="application/ld+json"]').each((_, el) => {
    try {
      const data = JSON.parse($(el).html() || "{}");
      const items = Array.isArray(data) ? data : [data];
      for (const item of items) {
        if (item['@type'] === 'JobPosting' && item.validThrough) {
          jsonDate = item.validThrough;
        }
      }
    } catch {}
  });
  if (jsonDate) return new Date(jsonDate);

  const text = cleanText($);
  const dominantYear = getPageYear($, pageTitle);
  
  const dateRegex = /((?:jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)[a-z]*[\s\.,\t]+\d{1,2}(?:st|nd|rd|th)?(?:[\s,]*\d{4})?)/gi;
  
  const matches = [...text.matchAll(dateRegex)];
  let bestDate: Date | null = null;
  let maxScore = -500; 

  console.log(`\n--- Analyzing: ${pageTitle} ---`);

  for (const match of matches) {
    const dateStr = match[0];
    const index = match.index || 0;
    

    let cleanDateStr = dateStr.replace(/(\d+)(st|nd|rd|th)/, '$1'); 
    if (!/\d{4}/.test(cleanDateStr)) cleanDateStr = `${cleanDateStr}, ${dominantYear}`;
    
    // Parse as UTC Noon to avoid "Previous Day" shift
    // We append "12:00 UTC" so the date parser treats it as middle of the day in UTC.
    // This solves the "June 8 became June 7" bug.
    const parsed = new Date(`${cleanDateStr} 12:00:00 UTC`);
    
    if (isNaN(parsed.getTime())) continue;

    const broadContext = text.substring(Math.max(0, index - 70), index).toLowerCase();
    const immediatePrefix = text.substring(Math.max(0, index - 25), index).toLowerCase();

    let score = 0;

    if (broadContext.includes("deadline")) score += 40;
    if (broadContext.includes("due")) score += 40;
    if (broadContext.includes("close")) score += 40;
    if (broadContext.includes("apply by")) score += 40;
    if (broadContext.includes("submit")) score += 20;

    // NEGATIVE SIGNALS (Kill List)
    if (broadContext.includes("start")) score -= 50;
    if (broadContext.includes("begin")) score -= 50;
    if (broadContext.includes("program")) score -= 50; 
    if (broadContext.includes("notification")) score -= 100; 
    if (broadContext.includes("decision")) score -= 100;
    if (broadContext.includes("posted")) score -= 20;
    if (broadContext.includes("eligibility")) score -= 50; 
    if (broadContext.includes("arrive")) score -= 50;


    const binderRegex = /(?:deadline|close|due|until|by|submit|applications?)[\s]*(?:is|are|on|at)?[\s]*[:\-]?[\s]*$/;
    
    if (binderRegex.test(immediatePrefix)) {
      score += 100;
      console.log(`   [BINDER MATCH] for ${dateStr}`);
    }

    if (score > maxScore && score > 0) {
      maxScore = score;
      bestDate = parsed;
    }
  }
  
  if (bestDate) console.log(`   >> WINNER: ${bestDate.toISOString().split('T')[0]} (Score: ${maxScore})`);
  return bestDate;
}


async function analyzeOpportunity(link: string, snippet: string, googleTitle: string) {
  const { html, status } = await fetchPageContent(link);
  if (status >= 400 || !html) return null;

  const $ = cheerio.load(html);
  
  const bodyLower = $('body').text().toLowerCase();
  if (bodyLower.includes("no longer accepting") || 
      bodyLower.includes("deadline has passed") ||
      bodyLower.includes("application closed")) {
    console.log(`[CLOSED] ${googleTitle}`);
    return null;
  }

  const deadlineDate = findBestDate($, googleTitle);

  if (deadlineDate) {
    const today = new Date();
    today.setHours(0,0,0,0);
    if (deadlineDate < today) {
       console.log(`[EXPIRED] ${deadlineDate.toISOString().split('T')[0]} - ${googleTitle}`);
       return null; 
    }
  }

  const lowerTitle = googleTitle.toLowerCase();
  let type = "Research"; 
  
  if (lowerTitle.includes("reu") || lowerTitle.includes("undergraduate research")) type = "Internship"; 
  else if (lowerTitle.includes("summer school") || lowerTitle.includes("winter school")) type = "Summer/Winter School";
  else if (lowerTitle.includes("phd")) type = "PhD";
  else if (lowerTitle.includes("intern")) type = "Internship";
  else if (lowerTitle.includes("hackathon")) type = "Hackathon";

  const requiresDeadline = ["Summer/Winter School", "Hackathon"];
  if (!deadlineDate && requiresDeadline.includes(type)) {
     console.log(`[SKIP] No confident deadline: ${googleTitle}`);
     return null;
  }

  const fingerprint = crypto.createHash('sha256').update(link).digest('hex');
  const rootDomain = new URL(link).hostname.replace("www.", "").split(".")[0].toUpperCase();
  
  return {
    docId: `opp-${fingerprint}`,
    title: googleTitle.split(" - ")[0].split(" | ")[0].trim(),
    organization: rootDomain,
    type,
    tags: ["Quantum", type],
    deadline: deadlineDate ? deadlineDate.toISOString().split('T')[0] : null,
    logo: getLogoUrl(new URL(link).hostname),
    link
  };
}


async function fetchGoogleResults(query: string, cx: string, key: string) {
  const url = `https://www.googleapis.com/customsearch/v1?key=${key}&cx=${cx}&q=${encodeURIComponent(query)}&dateRestrict=m2`;
  const res = await fetch(url);
  const data = await res.json();
  return data.items || [];
}

export async function harvestAndCache() {
  const API_KEY = process.env.GOOGLE_SEARCH_API_KEY;
  const CX = process.env.GOOGLE_SEARCH_CX;
  if (!API_KEY || !CX) return { success: false, error: "Missing keys" };

  let totalAdded = 0;

  for (const query of ALL_QUERIES) {
    const items = await fetchGoogleResults(query, CX, API_KEY);
    
    for (const item of items) {
      if (!item.link || IGNORE_TITLES.some(t => item.title.toLowerCase().includes(t))) continue;

      try {
        const data = await analyzeOpportunity(item.link, item.snippet, item.title);
        
        if (data) {
          await writeClient.createOrReplace({
            _id: data.docId,
            _type: 'opportunity',
            title: data.title,
            organization: data.organization,
            type: data.type,
            link: data.link,
            deadline: data.deadline,
            tags: data.tags,
            isLive: true,
            logo: data.logo,
            publishedAt: new Date().toISOString()
          });
          totalAdded++;
          console.log(`[UPDATED] ${data.title} -> ${data.deadline || "Rolling"}`);
        }
      } catch (err) {
        console.error(`Failed ${item.link}:`, err);
      }
    }
  }
  return { success: true, count: totalAdded };
}