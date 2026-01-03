import Parser from 'rss-parser';
import { toHTML } from '@portabletext/to-html'; // Converts CMS blocks to HTML
import { BlogPost} from "@/lib/types";
import { getInteractions } from "@/lib/storage";
import { client, urlFor } from "@/sanity/lib/client";

interface MediumItem extends Parser.Item {
  'content:encoded'?: string;
  categories?: string[];
  creator?: string;
  id?: string;
}

const parser = new Parser<{}, MediumItem>({
  customFields: {
    item: ['content:encoded', 'creator', 'categories'],
  }
});

function parseMediumContent(html: string) {
  const matches = [...html.matchAll(/<img[^>]+src="([^">]+)"[^>]*>/g)];
  let coverImage = null;
  let cleanContent = html;

  for (const match of matches) {
    const src = match[1];
    if (src.includes('medium.com/_/stat') || src.includes('medium.com/_/img')) continue; 
    coverImage = src;
    if (match.index !== undefined && match.index < 300) {
        cleanContent = html.replace(match[0], '');
        cleanContent = cleanContent.replace(/<figure[^>]*>\s*<\/figure>/g, '');
    }
    break;
  }
  return { coverImage, cleanContent };
}

function cleanExcerpt(html: string): string {
  return html.replace(/<[^>]+>/g, '').substring(0, 150) + "...";
}

const components = {
  types: {
    image: ({ value }: any) => {
      if (!value?.asset?._ref) return '';

      return `
        <figure>
          <img src="${urlFor(value).width(800).url()}" alt="${value.alt || ''}" />
          ${value.caption ? `<figcaption>${value.caption}</figcaption>` : ''}
        </figure>
      `;
    },
  },
  block: {
    blockquote: ({ children }: any) => `<blockquote>${children}</blockquote>`,
  }
};

const sanityQuery = `*[_type == "post"] {
  _id,
  title,
  "slug": slug.current,
  publishedAt,
  mainImage,
  body,
  categories,
  author-> {
    name,
    role,
    image
  }
}`;


export async function getAllBlogs(): Promise<BlogPost[]> {
  let mediumPosts: BlogPost[] = [];
  try {
    const feed = await parser.parseURL("https://medium.com/feed/@girlsinquantum");
    mediumPosts = await Promise.all(feed.items.map(async (item: MediumItem) => {
      const rawContent = item['content:encoded'] || item.content || "";
      const { coverImage, cleanContent } = parseMediumContent(rawContent);
      const id = item.guid || item.id || Math.random().toString();
      const interactions = await getInteractions(id);

      return {
        id: id,
        source: 'medium',
        title: item.title || "Untitled",
        excerpt: cleanExcerpt(rawContent),
        content: cleanContent, 
        coverImage: coverImage || "", 
        date: item.isoDate ? new Date(item.isoDate).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
        author: {
          name: item.creator || "Girls in Quantum",
          role: "Author",
          avatar: "/logo.svg" 
        },
        tags: item.categories || ["Quantum"],
        link: item.link,
        comments: interactions.comments,
        reactions: interactions.reactions
      };
    }));
  } catch (error) {
    console.error("Medium Feed Error:", error);
  }

  let sanityPosts: BlogPost[] = [];
  try {
    const rawSanity = await client.fetch(sanityQuery);

    sanityPosts = await Promise.all(rawSanity.map(async (post: any) => {
      const interactions = await getInteractions(post.slug);
      
      const htmlContent = toHTML(post.body, { components });
      
      const excerpt = cleanExcerpt(htmlContent);

      return {
        id: post.slug,
        source: 'local',
        title: post.title,
        excerpt: excerpt,
        content: htmlContent,
        coverImage: post.mainImage ? urlFor(post.mainImage).width(1200).url() : "",
        date: post.publishedAt ? post.publishedAt.split('T')[0] : new Date().toISOString().split('T')[0],
        author: {
          name: post.author?.name || "GiQ Team",
          role: post.author?.role || "Contributor",
          avatar: post.author?.image ? urlFor(post.author.image).width(200).url() : "/logo.svg"
        },
        tags: post.categories || [],
        comments: interactions.comments,
        reactions: interactions.reactions
      };
    }));
  } catch (error) {
    console.error("Sanity Fetch Error:", error);
  }

  const allBlogs = [...mediumPosts, ...sanityPosts].sort((a, b) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });

  return allBlogs;
}

export async function getAdjacentBlogs(currentId: string) {
  const all = await getAllBlogs();
  const index = all.findIndex((b) => b.id === decodeURIComponent(currentId));

  if (index === -1) return { prev: null, next: null };

  const previousPost = index > 0 ? all[index - 1] : null;
  const nextPost = index < all.length - 1 ? all[index + 1] : null;

  return { prev: previousPost, next: nextPost };
}

export async function getBlogById(id: string): Promise<BlogPost | undefined> {
  const all = await getAllBlogs();
  const decodedId = decodeURIComponent(id);
  return all.find((b) => b.id === decodedId);
}