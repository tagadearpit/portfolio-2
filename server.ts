import express from "express";
import path from "path";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";
import { createServer as createViteServer } from "vite";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Gemini SDK with telemetry header as required by guidelines
const apiKey = process.env.GEMINI_API_KEY;
let aiClient: GoogleGenAI | null = null;

function getAiClient(): GoogleGenAI {
  if (!aiClient) {
    if (!apiKey) {
      throw new Error("GEMINI_API_KEY is not defined. Please add it to your secrets panel.");
    }
    aiClient = new GoogleGenAI({
      apiKey: apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  }
  return aiClient;
}

// In-memory data store for messages received through the portfolio's Contact Form
interface ContactMessage {
  id: string;
  name: string;
  email: string;
  message: string;
  timestamp: string;
}

const contactMessages: ContactMessage[] = [
  {
    id: "1",
    name: "AI Studio System",
    email: "system@aistudio.google",
    message: "Welcome to Arpit's Interactive Portfolio. The backend is running and ready for transmissions!",
    timestamp: new Date().toISOString()
  }
];

// 1. API: Post a new Contact Form message
app.post("/api/contact", (req, res) => {
  const { name, email, message } = req.body;
  if (!name || !email || !message) {
    return res.status(400).json({ error: "Please fill in all fields (name, email, and message)." });
  }

  const newMessage: ContactMessage = {
    id: String(contactMessages.length + 1),
    name: name.trim(),
    email: email.trim(),
    message: message.trim(),
    timestamp: new Date().toISOString()
  };

  contactMessages.unshift(newMessage);
  res.status(201).json({ success: true, message: newMessage });
});

// 2. API: Retrieve in-memory received messages (useful for checking contacts sent)
app.get("/api/contact", (req, res) => {
  res.json({ messages: contactMessages });
});

// 3. API: Interactive simulated AI Interview Agent
app.post("/api/chat", async (req, res) => {
  try {
    const { message, chatHistory } = req.body;
    if (!message) {
      return res.status(400).json({ error: "Missing message payload." });
    }

    const client = getAiClient();

    // Prepare system instructions for Arpit's Portfolio Representative Agent
    const systemInstruction = `You are a professional, high-fidelity AI interviewer/portfolio representative for Arpit Tagade.
Your purpose is to answer questions from recruiters, fellow developers, or hiring managers who visit Arpit's website.
Answer in first-person as Arpit's AI Representative agent ("I represent Arpit...", "Arpit represents...", "Our projects...").
Maintain a highly technical, confident, crisp, and futuristic Tech-Noir tone. Use single sentence details, bullet points, and highlight high-level metrics.

Arpit's profile data:
- Name: Arpit Tagade
- Current Role: AI & Data Science Student at B.Tech, and Full-Stack & AI Engineer.
- Location: Nagpur, India.
- Core Obsession: Architecting high-performance real-time systems, bridging IoT & AI, sub-100ms latency, and hardware-level precision.
- Tech Stack:
  - Frontend: Next.js, React, Tailwind CSS, TypeScript.
  - Artificial Intelligence: Gemini API (this exact SDK), LLMs, and creative prompt engineering.
  - Backend: Spring Boot, Node.js, C++, PostgreSQL.
  - IoT & Hardware: ESP32 (Wireless Control), Arduino (Micro-controllers).
- Projects:
  1. *Neosis*: Real-Time Networking platform utilizing Java and Spring Boot. Uses WebSockets for premium low-latency message delivery. Live: https://neosis-static-site.onrender.com/ | GitHub: https://github.com/tagadearpit/Neosis.git
  2. *CandyRobot*: Physical robotic system powered by ESP32 microchip and C++ codebase. Integrates with Gemini API to offer interactive AI conversation capabilities on a physical terminal.
  3. *Monika AI*: Futuristic web-based companion system built with Node.js featuring complex natural language processing layers. Deployment: https://monika-ai-0jpf.onrender.com/
- Education:
  - B.Tech in AI & Data Science (2021 - Present). Intense deep learning and systems architecture study.
- Contact Details:
  - Email: arpittagade5@gmail.com
  - Github: https://github.com/tagadearpit
  - LinkedIn: https://www.linkedin.com/in/tagadearpit/

Keep your responses clean, short, conversational, and aligned with precision engineering. If someone asks a question outside his skills, guide them elegantly back to his portfolio. Please do not invent any fake contact info. Be ready to invite them to use the contact form to leave a transmission.`;

    // Convert chat history format if provided
    let contentParts: any[] = [];
    if (chatHistory && Array.isArray(chatHistory)) {
      chatHistory.forEach((item: { role: string; message: string }) => {
        contentParts.push({
          role: item.role === "user" ? "user" : "model",
          parts: [{ text: item.message }]
        });
      });
    }

    contentParts.push({
      role: "user",
      parts: [{ text: message }]
    });

    const response = await client.models.generateContent({
      model: "gemini-3.5-flash",
      contents: contentParts,
      config: {
        systemInstruction,
        temperature: 0.8,
      },
    });

    res.json({ reply: response.text });
  } catch (error: any) {
    console.error("Gemini API Error:", error);
    res.status(500).json({ error: error.message || "An issue occurred communicating with the AI Assistant backend." });
  }
});

// Setup Vite and static assets
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[Tech-Noir Core] Portfolio platform online on http://0.0.0.0:${PORT}`);
  });
}

startServer();
