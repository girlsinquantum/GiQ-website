import { NextResponse } from "next/server";
import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold, Content } from "@google/generative-ai";
import { buildChatContext } from "@/lib/chatContext";

export const runtime = "nodejs";

const MODEL_NAME = "gemini-flash-latest";
const HISTORY_LIMIT = 6;

const API_KEYS = [
  process.env.GEMINI_API_KEY_1,
  process.env.GEMINI_API_KEY_2,
  process.env.GEMINI_API_KEY_3,
].filter((key): key is string => !!key);

/**
 * Tries to generate content using multiple API keys to handle rate limits.
 */
async function generateWithFailover(
  systemInstruction: string,
  history: Content[],
  message: string
): Promise<string> {
  let lastError: Error | null = null;

  for (const apiKey of API_KEYS) {
    try {
      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({
        model: MODEL_NAME,
        systemInstruction: {
          role: "system",
          parts: [{ text: systemInstruction }]
        },
        safetySettings: [
          { category: HarmCategory.HARM_CATEGORY_HARASSMENT, threshold: HarmBlockThreshold.BLOCK_NONE },
          { category: HarmCategory.HARM_CATEGORY_HATE_SPEECH, threshold: HarmBlockThreshold.BLOCK_NONE },
          { category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT, threshold: HarmBlockThreshold.BLOCK_NONE },
          { category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT, threshold: HarmBlockThreshold.BLOCK_NONE },
        ]
      });

      const chat = model.startChat({
        history: history,
        generationConfig: {
          maxOutputTokens: 500,
          temperature: 0.7,
        },
      });

      const result = await chat.sendMessage(message);
      const response = await result.response;
      return response.text();

    } catch (error: unknown) {
      const err = error as Error;
      // If rate limited (429) or quota exceeded, try next key
      if (err.message?.includes("429") || err.message?.includes("quota") || err.message?.includes("limit")) {
        console.warn(`Key ending in ...${apiKey.slice(-4)} exhausted. Switching...`);
        lastError = err;
        continue;
      }
      throw err;
    }
  }
  
  throw lastError || new Error("All API keys exhausted or configured incorrectly.");
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { message, history } = body;

    if (!message) {
      return NextResponse.json({ error: "No message provided" }, { status: 400 });
    }

    const lowerMsg = message.trim().toLowerCase();
    const cleanMsg = lowerMsg.replace(/[^\w]/g, "");

    //Instant Static Responses (Save Tokens/Latency)
    if (["hi", "hello", "hey", "hola", "sup"].includes(cleanMsg)) {
      return NextResponse.json({ 
        reply: "Meow! 😺 I'm Schrödinger's Assistant. At the moment, I'm observing the Q-volution Hackathon 2026! Ask me about the challenges, partners, or how to register." 
      });
    }

    if (["thanks", "thankyou", "thx", "cool", "great"].includes(cleanMsg)) {
      return NextResponse.json({ 
        reply: "You're welcome! Let me know if you need to collapse any more wave functions. 🌊" 
      });
    }

    //Guardrails
    if ((lowerMsg.includes("solve") || lowerMsg.includes("calculate") || lowerMsg.includes("homework")) && !lowerMsg.includes("quantum")) {
      return NextResponse.json({ 
        reply: "I'm a Catbot, not a calculator! 😸 I can help you find physics resources or event details, but I can't do your math homework." 
      });
    }

    // History Management
    let validHistory = history || [];
    // Remove the first message if it's from the model to prevent "start with user" errors in Gemini
    if (validHistory.length > 0 && validHistory[0].role === "model") {
      validHistory = validHistory.slice(1);
    }
    // Truncate to limit context window usage
    if (validHistory.length > HISTORY_LIMIT) {
      validHistory = validHistory.slice(validHistory.length - HISTORY_LIMIT);
    }

    //  Build Context (Inject Hackathon Truths)
    const contextData = await buildChatContext(message);

    // System Instruction
    const systemInstruction = `
      You are Schrödinger's Assistant (CatBot), the AI guide for 'Girls in Quantum' (GIQ).
      
      CURRENT DATE CONTEXT: February 2026.
      
      CONTEXT DATABASE (SOURCE OF TRUTH):
      ${contextData}

      INSTRUCTIONS:
      1. PRIORITY: Always answer based on the CONTEXT DATABASE first. If the user asks about the "Hackathon", "Q-volution", "Rigetti", "Quandela", or "Classiq", use the specific details in the database.
      2. PERSONA: Scientific, witty, helpful. Use cat puns sparingly (e.g., "purr-fect", "superposition").
      3. ACCURACY: If the answer is not in the Context Database, apologize and direct them to 'girlsinquantum@gmail.com'. Do not hallucinate hackathon rules.
      4. LENGTH: Concise. 2-4 sentences maximum.
      5. TONE: Empowering to women in STEM.
    `;

    const replyText = await generateWithFailover(systemInstruction, validHistory, message);
    
    return NextResponse.json({ reply: replyText });

  } catch (error: unknown) {
    console.error("Fatal Chat Error:", error);
    return NextResponse.json({ 
      reply: "My quantum state became unstable. Please try asking again in a moment." 
    }, { status: 500 });
  }
}