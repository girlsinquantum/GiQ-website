import { client, urlFor } from "@/sanity/lib/client";


export interface GiQEvent {
  id: string;
  title: string;
  slug: string;
  date: string;
  location: string;
  description: string;
  coverImage: string;
  gallery: string[];
  link?: string;
  tags: string[];
}

interface SanityImageSource {
  asset: {
    _ref: string;
  };
}

interface SanityEventRaw {
  _id: string;
  title: string;
  slug: string;
  date: string;
  location: string;
  description: string;
  coverImage?: SanityImageSource;
  gallery?: SanityImageSource[];
  registrationLink?: string;
  tags?: string[];
}


const eventsQuery = `*[_type == "event"] | order(date asc) {
  _id,
  title,
  "slug": slug.current,
  date,
  location,
  description,
  coverImage,
  gallery,
  registrationLink,
  tags
}`;

export async function getEvents() {
  const rawEvents = await client.fetch<SanityEventRaw[]>(eventsQuery);

  const formattedEvents: GiQEvent[] = rawEvents.map((e) => ({
    id: e._id,
    title: e.title,
    slug: e.slug,
    date: e.date,
    location: e.location,
    description: e.description,
    coverImage: e.coverImage ? urlFor(e.coverImage).width(800).url() : "",
    gallery: e.gallery ? e.gallery.map((img) => urlFor(img).width(600).url()) : [],
    link: e.registrationLink,
    tags: e.tags || [],
  }));

  const now = new Date();
  const upcoming = formattedEvents.filter((e) => new Date(e.date) >= now);
  const past = formattedEvents.filter((e) => new Date(e.date) < now).reverse();

  return { upcoming, past };
}