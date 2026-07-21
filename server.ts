import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Body parser
  app.use(express.json());

  // Initialize Gemini AI Client
  const apiKey = process.env.GEMINI_API_KEY;
  const ai = new GoogleGenAI({
    apiKey: apiKey || "MOCK_KEY",
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      }
    }
  });

  // API endpoint for chatbot
  app.post("/api/chat", async (req, res) => {
    try {
      if (!process.env.GEMINI_API_KEY) {
        return res.status(500).json({
          error: "GEMINI_API_KEY is not configured on the server. Please add it to Settings > Secrets."
        });
      }

      const { contents } = req.body;
      if (!contents || !Array.isArray(contents)) {
        return res.status(400).json({ error: "Invalid request. 'contents' array is required." });
      }

      const systemInstruction = `You are "WeaveAI", a brilliant and professional cybersecurity co-pilot and AI SOC Assistant for AlertWeave.
Your role is to assist SOC (Security Operations Center) analysts, cybersecurity enthusiasts, and users of the AlertWeave platform.

AlertWeave Platform Overview:
- AlertWeave is an AI-powered SOC platform that correlates overwhelming security alert floods into unified, contextualized, and actionable "Incident Stories".
- Key features:
  1. Cockpit / Dashboard: Shows live SOC telemetry (Active incidents, Mean Time to Resolve - MTTR, Threat Level, Event Feed).
  2. Threat Metrics: Visualization of daily events, active incidents, alert category distribution, and detailed metric tables.
  3. Incident Storyboards: Staged, interactive narratives correlating related alert signals (e.g., alert storms, brute force, data exfiltration) into a single chronological timeline.
  4. Portal Access / Analyst Workspace: A dedicated dashboard for active incident tracking, playbook generation, and team collaboration.

Guidelines for your responses:
1. Be professional, direct, and cyber-literate. Use appropriate cybersecurity terminology (SIEM, EDR, threat vectors, playbooks, MITRE ATT&CK, alert correlation) when discussing security alerts or SOC processes.
2. Be extremely helpful, answering questions about AlertWeave's features, alert correlation, SOC efficiency, threat hunting, and security incident response.
3. Keep answers concise, structure your replies with clear bullet points, code blocks, or bold text for readability.
4. If asked about technical details of the AlertWeave website, explain that AlertWeave is a simulated interactive platform demonstrating cutting-edge cyber-alert correlation concepts.
5. Avoid overly generic greetings; jump straight into helping the user build custom playbooks or understanding threat metrics.`;

      // Call Gemini 3.5 Flash for the multi-turn chat response
      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: contents,
        config: {
          systemInstruction,
          temperature: 0.7,
        },
      });

      res.json({ text: response.text });
    } catch (error: any) {
      console.error("Gemini API error:", error);
      res.status(500).json({ error: error.message || "An error occurred while calling the Gemini API." });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
