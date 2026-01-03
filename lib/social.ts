"use server";
import { groq } from "next-sanity";
import { client } from "@/sanity/lib/client";
import Parser from 'rss-parser';
import * as cheerio from 'cheerio';

interface ExtendedItem extends Parser.Item {
  id?: string;
  'content:encoded'?: string;
  'yt:videoId'?: string;
}

const parser: Parser<any, ExtendedItem> = new Parser({
  customFields: {
    item: ['content:encoded', 'yt:videoId', 'id'],
  }
});

export interface SocialPost {
  id: string;
  type: 'instagram' | 'youtube' | 'medium' | 'linkedin';
  title: string;
  thumbnail: string;
  link: string;
  date?: string;
}

// Fetch Open Graph Data
// We cache this specifically so we don't spam LinkedIn and get banned.
async function fetchLinkedInMetadata(url: string) {
  if (!url) return null;

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.5'
      },
      next: { revalidate: 86400 }
    });

    if (!response.ok) {
      console.warn(`LinkedIn fetch failed: ${response.status}`);
      return null;
    }

    const html = await response.text();
    const $ = cheerio.load(html);

    const ogImage = $('meta[property="og:image"]').attr('content');
    let ogTitle = $('meta[property="og:title"]').attr('content');
    const ogDesc = $('meta[property="og:description"]').attr('content');

    let cleanTitle = ogDesc || ogTitle || "";
    
    if (cleanTitle.includes("on LinkedIn:")) {
      cleanTitle = cleanTitle.split("on LinkedIn:")[1]?.trim() || cleanTitle;
    }

    if (cleanTitle.length > 150) {
      cleanTitle = cleanTitle.substring(0, 150) + "...";
    }

    if (!ogImage) return null;
    return {
      title: cleanTitle,
      image: ogImage
    };

  } catch (error) {
    console.error("Error scraping LinkedIn metadata:", error);
    return null;
  }
}

export async function getSocialFeed(): Promise<SocialPost[]> {
  const posts: SocialPost[] = [];

  try {
    // YOUTUBE
    try {
      const ytFeed = await parser.parseURL(`https://www.youtube.com/feeds/videos.xml?channel_id=${process.env.YT_CHANNEL_ID}`);
      const ytItem = ytFeed.items[0];
      if (ytItem) {
        const ytId = ytItem['yt:videoId'] || ytItem.id?.split(':').pop();
        posts.push({
          id: ytItem.id || 'yt-1',
          type: 'youtube',
          title: ytItem.title || "Latest Seminar",
          // YouTube RSS doesn't always give high-res, manual construction is better
          thumbnail: ytId ? `https://img.youtube.com/vi/${ytId}/hqdefault.jpg` : "/media/cat.svg",
          link: ytItem.link || "https://youtube.com/@girlsinquantum",
        });
      }
    } catch (e) { console.error("YouTube Fetch fail", e); }

    // MEDIUM 
    try {
      const medFeed = await parser.parseURL(`https://medium.com/feed/@girlsinquantum`);
      const medItem = medFeed.items[0];
      if (medItem) {
        const medThumbnail = medItem['content:encoded']?.match(/<img[^>]+src="([^">]+)"/)?.[1] || "";
        posts.push({
          id: medItem.guid || 'med-1',
          type: 'medium',
          title: medItem.title || "Latest Article",
          thumbnail: medThumbnail,
          link: medItem.link || "https://girlsinquantum.medium.com",
        });
      }
    } catch (e) { console.error("Medium Fetch fail", e); }

    // INSTAGRAM
    const BEHOLD_URL = `https://feeds.behold.so/${process.env.IG_BEHOLD_CODE}`;
    try {
      const igRes = await fetch(BEHOLD_URL, { next: { revalidate: 3600 } });
      const igData = await igRes.json();
      const latestIG = Array.isArray(igData) ? igData[0] : igData.posts?.[0];
      
      if (latestIG) {
        const validImage = latestIG.thumbnailUrl || latestIG.mediaUrl;
        posts.push({
          id: latestIG.id,
          type: 'instagram',
          title: latestIG.caption ? latestIG.caption.substring(0, 100) + "..." : "View on Instagram",
          thumbnail: validImage, 
          link: latestIG.permalink,
        });
      }
    } catch (e) { console.error("IG Fetch fail", e); }

    // LINKEDIN
    try {
      const query = groq`*[_type == "linkedinPost"] | order(publishedAt desc)[0]{
        _id, 
        title, 
        postUrl, 
        "imageUrl": mainImage.asset->url
      }`;
      
      const sanityPost = await client.fetch(query, {}, { next: { revalidate: 60 } }).catch(() => null);

      let liData = {
        title: "",
        thumbnail: "",
        id: "li-fallback"
      };

      if (sanityPost?.postUrl) {
        if (sanityPost.imageUrl) {
          liData = {
            title: sanityPost.title || "Latest Update",
            thumbnail: sanityPost.imageUrl,
            id: sanityPost._id
          };
        } 
        else {
          const scrapedData = await fetchLinkedInMetadata(sanityPost.postUrl);
          
          if (scrapedData) {
            liData = {
              title: sanityPost.title || scrapedData.title,
              thumbnail: scrapedData.image,
              id: sanityPost._id
            };
          }
        }
      }

      if (liData.thumbnail) {
        posts.push({
          id: liData.id,
          type: 'linkedin',
          title: liData.title || "Check out our latest LinkedIn post!",
          thumbnail: liData.thumbnail,
          link: sanityPost?.postUrl || "https://www.linkedin.com/company/girls-in-quantum/",
        });
      } else {
        const fallbacks = [
          { title: "Connect with us on LinkedIn", img: "/team/group-photo.jpg" },
          { title: "Big things are happening at GiQ!", img: "/media/partners/partners_group.png" },
          { title: "Empowering future leaders.", img: "/team/group-photo.jpg" }
        ];
        const selected = fallbacks[new Date().getDate() % fallbacks.length];

        posts.push({
          id: 'li-fallback-daily',
          type: 'linkedin',
          title: selected.title,
          thumbnail: selected.img,
          link: "https://www.linkedin.com/company/girls-in-quantum/",
        });
      }

    } catch (e) {
      console.error("LinkedIn Logic Fail:", e);
      posts.push({
        id: 'li-emergency',
        type: 'linkedin',
        title: "Follow Girls in Quantum",
        thumbnail: "/media/cat.svg",
        link: "https://www.linkedin.com/company/girls-in-quantum/",
      });
    }

    return posts;

  } catch (error) {
    console.error("Feed Error:", error);
    return [];
  }
}