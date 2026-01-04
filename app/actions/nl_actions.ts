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

export type FormState = {
  message: string;
  success: boolean;
};

export async function subscribeToNewsletter(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const email = formData.get("email") as string;
  
  if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
    return { success: false, message: "Please enter a valid email." };
  }

  try {
    // 1. Backup to Sanity
    const existing = await client.fetch(
      `*[_type == "subscriber" && email == $email][0]`, { email }
    );

    if (!existing) {
      await client.create({
        _type: "subscriber",
        email,
        role: "observer",
        status: "active",
        joinedAt: new Date().toISOString(),
        source: "website_footer"
      });
    }

    // 2. Send to MailerLite
    await fetch('https://connect.mailerlite.com/api/subscribers', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.MAILERLITE_API_TOKEN}`,
      },
      body: JSON.stringify({ email: email })
    });

    return { success: true, message: "Entanglement successful. Check your inbox." };
    
  } catch (error) {
    console.error("Subscription Error:", error);
    return { success: false, message: "System error. Please try again." };
  }
}