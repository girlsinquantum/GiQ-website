import Papa from "papaparse";
import { Resource, resources as staticResources } from "@/data/resources";

// note: if you have multiple tabs, make sure this link is for the 'Form_Responses' tab!
const SHEET_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vS13hgHkWBqjOCJvArZOXR5ATO_wuZnWbEoM66iBtV-Hafz72L2bj2EAGazQPrPWijOX7-nYPBj4Sjh/pub?gid=97204009&single=true&output=csv";

interface GoogleSheetRow {
  [key: string]: string;
}

function normalizeUrl(url: string): string {
  if (!url) return "";
  return url.toLowerCase().trim()
    .replace(/^https?:\/\//, "")
    .replace(/^www\./, "")
    .replace(/\/+$/, "");
}

function getColumnValue(row: GoogleSheetRow, keyword: string): string {
  if (row[keyword]) return row[keyword];
  const key = Object.keys(row).find(k => k.toLowerCase().includes(keyword.toLowerCase()));
  return key ? row[key] : "";
}

export async function getCombinedResources(): Promise<Resource[]> {
  try {
    const seenUrls = new Set<string>();
    staticResources.forEach(r => {
      if (r.link) seenUrls.add(normalizeUrl(r.link));
    });

    const response = await fetch(SHEET_URL, { 
      next: { revalidate: 0 },
      cache: "no-store" 
    });
    
    if (!response.ok) throw new Error("Failed to fetch sheet");
    
    const csvText = await response.text();
    const parsed = Papa.parse<GoogleSheetRow>(csvText, { header: true, skipEmptyLines: true });

    const newResources: Resource[] = [];

    parsed.data.forEach((row) => {
      const rawTitle = getColumnValue(row, "title") || "Untitled Resource";
      const rawLink = getColumnValue(row, "link"); 
      const rawMedium = getColumnValue(row, "medium");
      const rawSubject = getColumnValue(row, "subject");

      const normalizedLink = normalizeUrl(rawLink);

      if (rawLink && !seenUrls.has(normalizedLink)) {
        seenUrls.add(normalizedLink);

        let category: Resource["category"] = "Article";
        const mediumLower = rawMedium.toLowerCase();

        if (mediumLower.includes("course")) category = "Course";
        else if (mediumLower.includes("game")) category = "Game";
        else if (mediumLower.includes("video")) category = "Video";
        else if (mediumLower.includes("book") || mediumLower.includes("textbook")) category = "Book";
        else if (mediumLower.includes("repository") || mediumLower.includes("lab") || mediumLower.includes("tool")) category = "Tool";

        newResources.push({
          title: rawTitle,
          link: rawLink,
          category: category,
          tags: [rawSubject || "General"],
        });
      }
    });
    
    return [...newResources.reverse(), ...staticResources];

  } catch (error) {
    console.error("Error:", error);
    return staticResources;
  }
}