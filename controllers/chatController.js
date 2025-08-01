import { GoogleGenerativeAI } from "@google/generative-ai";
import fs from "fs";
import path from "path";

// Pastikan folder logs sudah ada
const logDir = path.join("logs");
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir);
}
const logPath = path.join(logDir, "chat.log");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export async function askQuestion(req, res) {
  const { prompt } = req.query;

  if (!prompt) return res.status(400).json({ error: "Prompt kosong." });

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    // Simpan log
    fs.appendFileSync(
      logPath,
      `[${new Date().toISOString()}] Prompt: ${prompt}\nJawaban: ${text}\n\n`
    );

    res.json({ result: text });
  } catch (err) {
    // Log seluruh error object untuk debugging
    console.error("❌ Gagal generate:", err);
    res.status(500).json({
      error: "Gagal memproses permintaan",
      detail: err.message, // Bisa tambahkan err.stack jika perlu
    });
  }
}