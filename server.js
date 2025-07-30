// index.js
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import model from "./chat.js";
import { logChat } from "./utils/logger.js";
import app from "./index.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

// Optional: middleware logger untuk debug
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// ✅ FIXED GET /ask route
app.get("/ask", async (req, res) => {
  const prompt = req.query.prompt;
  if (!prompt) return res.status(400).json({ error: "Prompt kosong" });

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = await response.text();

    logChat(prompt, text);
    res.json({ result: text });
  } catch (error) {
    console.error("❌ Error:", error);
    res.status(500).json({ error: "Gagal menghasilkan konten" });
  }
});

// POST /api/chat multi-turn
app.post("/api/chat", async (req, res) => {
  const { messages } = req.body;

  if (!messages || !Array.isArray(messages)) {
    return res.status(400).json({ error: "'messages' harus array" });
  }

  try {
    const chat = model.startChat(); // model harus punya startChat()
    let reply;

    for (let m of messages) {
      const msg = await chat.sendMessage(m);
      reply = await msg.response.text();

      logChat(m, reply); // log ke file/database
    }

    res.json({ reply });
  } catch (err) {
    console.error("❌ Error:", err.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// app.listen(PORT, () => {
//   console.log(`🚀 Server jalan di http://localhost:${PORT}`);
// });

app.listen(PORT, () => {
  console.log(`🚀 Server jalan di http://localhost:${PORT}`);
});