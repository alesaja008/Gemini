// controllers/chatController.js
import { GoogleGenerativeAI } from "@google/generative-ai";
import fs from "fs";
import path from "path";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const logPath = path.join("logs", "chat.log");

export async function askQuestion(req, res) {
  const { prompt } = req.query;

  if (!prompt) return res.status(400).json({ error: "Prompt kosong." });

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    // Simpan log
    fs.appendFileSync(logPath, `[${new Date().toISOString()}] Prompt: ${prompt}\nJawaban: ${text}\n\n`);

    res.json({ result: text });
  } catch (err) {
    console.error("❌ Gagal generate:", err.message);
    res.status(500).json({ error: "Gagal memproses permintaan" });
  }
}
