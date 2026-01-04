import { createClient } from "next-sanity";
import { Comment, ReactionRecord } from "./types";
import { projectId, dataset, apiVersion } from "../sanity/lib/client";
import legacyData from "@/data/interactions.json";

interface SanityCommentDoc {
  _id: string;
  postSlug: string;
  content: string;
  publishedAt: string;
  platform?: string;
  authorName: string;
  avatar?: string;
}

interface SanityReactionDoc {
  userId: string;
  userName: string;
  type: string;
  timestamp: string;
}

const writeClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
  token: process.env.SANITY_API_WRITE_TOKEN,
});

const readClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
});

function mapSanityComment(doc: SanityCommentDoc): Comment {
  return {
    id: doc._id,
    blogId: doc.postSlug,
    content: doc.content,
    date: new Date(doc.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
    platform: (doc.platform as Comment['platform']) || 'website',
    author: {
      name: doc.authorName,
      role: 'Community Member',
      avatar: doc.avatar
    }
  };
}

function mapSanityReaction(doc: SanityReactionDoc): ReactionRecord {
return {
    userId: doc.userId,
    userName: doc.userName,
    type: doc.type as ReactionRecord['type'],
    timestamp: doc.timestamp
  };
}


export async function getInteractions(blogId: string) {
  const query = `{
    "comments": *[_type == "comment" && postSlug == $id] | order(publishedAt desc),
    "reactions": *[_type == "reaction" && postSlug == $id]
  }`;
  
  const liveData = await readClient.fetch(query, { id: blogId });

  const legacyEntry = (legacyData as Record<string, { comments?: Comment[]; reactions?: ReactionRecord[] }>)[blogId] || { comments: [], reactions: [] };

  return {
    comments: [...liveData.comments.map(mapSanityComment), ...(legacyEntry.comments || [])],
    // For reactions, we merge them. 
    // Note: If a user reacted in legacy and reacts again in live, it might count twice.
    // Ideally, legacy reactions are just for display count.
    reactions: [...liveData.reactions.map(mapSanityReaction), ...(legacyEntry.reactions || [])] 
  };
}

export async function saveComment(blogId: string, comment: Comment) {
  await writeClient.create({
    _type: 'comment',
    postSlug: blogId,
    authorName: comment.author.name,
    content: comment.content,
    avatar: comment.author.avatar,
    platform: 'website',
    publishedAt: new Date().toISOString()
  });
}

export async function toggleReaction(blogId: string, reaction: ReactionRecord) {
  // (We ignore legacy JSON for toggling logic to keep it simple)
  const existingQuery = `*[_type == "reaction" && postSlug == $blogId && userId == $userId && type == $type][0]._id`;
  const existingId = await readClient.fetch(existingQuery, {
    blogId,
    userId: reaction.userId,
    type: reaction.type
  });

  if (existingId) {
    // TOGGLE OFF: Delete the document
    await writeClient.delete(existingId);
  } else {
    // TOGGLE ON: Create the document
    await writeClient.create({
      _type: 'reaction',
      postSlug: blogId,
      userId: reaction.userId,
      userName: reaction.userName,
      type: reaction.type,
      timestamp: new Date().toISOString()
    });
  }
}