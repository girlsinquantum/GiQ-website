"use server";

import { createClient } from "next-sanity";
import { apiVersion, dataset, projectId } from "@/sanity/env";

const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
  token: process.env.SANITY_API_WRITE_TOKEN,
});

const MAILERLITE_URL = "https://connect.mailerlite.com/api/subscribers";
const MAX_EMAIL_LENGTH = 254;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export type FormState = {
  message: string;
  success: boolean;
};

function readEmail(formData: FormData): string | null {
  const raw = formData.get("email");
  if (typeof raw !== "string") return null;
  const email = raw.trim().toLowerCase();
  if (email.length === 0 || email.length > MAX_EMAIL_LENGTH || !EMAIL_PATTERN.test(email)) return null;
  return email;
}

// Backup copy in Sanity. Best effort: a failure here must not block the signup.
async function backupToSanity(email: string): Promise<void> {
  if (!process.env.SANITY_API_WRITE_TOKEN) {
    console.error("Newsletter backup skipped: SANITY_API_WRITE_TOKEN is not set");
    return;
  }
  try {
    const existing = await client.fetch(`*[_type == "subscriber" && email == $email][0]._id`, { email });
    if (existing) return;
    await client.create({
      _type: "subscriber",
      email,
      role: "observer",
      status: "active",
      joinedAt: new Date().toISOString(),
      source: "website_footer",
    });
  } catch (error) {
    console.error("Newsletter backup to Sanity failed:", error);
  }
}

async function addToMailerLite(email: string): Promise<boolean> {
  const token = process.env.MAILERLITE_API_TOKEN;
  if (!token) {
    console.error("Newsletter signup failed: MAILERLITE_API_TOKEN is not set");
    return false;
  }
  const response = await fetch(MAILERLITE_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ email }),
  });
  if (!response.ok) {
    console.error("MailerLite rejected the signup:", response.status, await response.text());
    return false;
  }
  return true;
}

export async function subscribeToNewsletter(
  _prevState: FormState,
  formData: FormData
): Promise<FormState> {
  // Honeypot: real visitors never see or fill this field.
  if (formData.get("company")) {
    return { success: true, message: "Entanglement successful. Check your inbox." };
  }

  const email = readEmail(formData);
  if (!email) {
    return { success: false, message: "Please enter a valid email." };
  }

  try {
    const added = await addToMailerLite(email);
    if (!added) {
      return { success: false, message: "We couldn't subscribe you right now. Please try again later." };
    }
    await backupToSanity(email);
    return { success: true, message: "Entanglement successful. Check your inbox." };
  } catch (error) {
    console.error("Subscription Error:", error);
    return { success: false, message: "System error. Please try again." };
  }
}
