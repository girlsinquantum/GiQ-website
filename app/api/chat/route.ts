import { NextResponse } from "next/server";
import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from "@google/generative-ai";
import { buildChatContext } from "@/lib/chatContext";

export const runtime = "nodejs";

const MODEL_NAME = "gemini-flash-latest"; 
const HISTORY_LIMIT = 6; 

const API_KEYS = [
  process.env.GEMINI_API_KEY_1,
  process.env.GEMINI_API_KEY_2,
  process.env.GEMINI_API_KEY_3,
].filter(Boolean) as string[];

async function generateWithFailover(
  systemInstruction: string, 
  history: any[], 
  message: string
): Promise<string> {
  
  let lastError = null;

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
          // 800 is enough to finish a thought, but not enough to write a novel.
          maxOutputTokens: 800, 
          temperature: 0.7,
        },
      });

      const result = await chat.sendMessage(message);
      const response = await result.response;
      return response.text();

    } catch (error: any) {
      if (error.message?.includes("429") || error.message?.includes("quota") || error.message?.includes("limit")) {
        console.warn(`⚠️ Key ending in ...${apiKey.slice(-4)} exhausted. Switching...`);
        lastError = error;
        continue;
      }
      throw error;
    }
  }
  throw lastError || new Error("All API keys exhausted");
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { message, history } = body; 

    if (!message) return NextResponse.json({ error: "No message" }, { status: 400 });

    const lowerMsg = message.trim().toLowerCase();

    if (["hi", "hello", "hey", "hola", "sup"].includes(lowerMsg.replace(/[^\w]/g, ""))) {
      return NextResponse.json({ reply: "Meow! I'm Schrödinger's Assistant. I eat virtual tuna and sleep on warm GPUs.I can help you find resources, team members, or opportunities!" });
    }
    
    if (["thanks", "thank you", "thx", "cool", "great"].includes(lowerMsg)) {
      return NextResponse.json({ reply: "You're welcome! Let me know if you need more quantum data." });
    }

    if ((lowerMsg.includes("solve") || lowerMsg.includes("calculate")) && !lowerMsg.includes("quantum")) {
       return NextResponse.json({ reply: "I'm a Catbot, not a Catculator! 😸 I can help you find resources to learn physics, though." });
    }

    let validHistory = history || [];
    if (validHistory.length > 0 && validHistory[0].role === "model") {
      validHistory = validHistory.slice(1);
    }
    if (validHistory.length > HISTORY_LIMIT) {
      validHistory = validHistory.slice(validHistory.length - HISTORY_LIMIT);
    }

    const contextData = await buildChatContext(message);

    const systemInstruction = `
      You are Schrödinger's Assistant (CatBot) for 'Girls in Quantum' (GIQ).
      
      CONTEXT DATABASE:
      ${contextData}

      GUIDELINES:
      1. Role: Witty, scientific, cat metaphors.
      2. Length: KEEP IT BRIEF. Max 3 sentences generally.
      3. Lists: If listing resources/team, ONLY list the TOP 3 most relevant items unless the user explicitly asks for "all".
      4. Priority: USE THE CONTEXT DATABASE. If the answer isn't there, refer to girlsinquantum@gmail.com.
    `;

    const replyText = await generateWithFailover(systemInstruction, validHistory, message);
    return NextResponse.json({ reply: replyText });

  } catch (error: any) {
    console.error("Fatal Chat Error:", error);
    return NextResponse.json({ 
      reply: "My waveform collapsed unexpectedly. Please try again." 
    }, { status: 500 });
  }
}