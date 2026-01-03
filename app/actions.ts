"use server";

import { revalidatePath } from "next/cache";
import { saveComment, toggleReaction } from "@/lib/storage";
import { Comment, ReactionRecord } from "@/lib/types";

export async function addCommentAction(blogId: string, comment: Comment) {
  await saveComment(blogId, comment);
  revalidatePath(`/blogs/${blogId}`); // Refresh the page data
  return { success: true };
}

export async function toggleReactionAction(blogId: string, reaction: ReactionRecord) {
  await toggleReaction(blogId, reaction);
  revalidatePath(`/blogs/${blogId}`);
  return { success: true };
}