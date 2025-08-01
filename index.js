import dotenv from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { logChat } from "./utils/logger.js"; // Tambahkan ini

dotenv.config();

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
if (!GEMINI_API_KEY) {
  console.error("❌ API Key tidak ditemukan di .env");
  process.exit(1);
}

const ai = new GoogleGenerativeAI(GEMINI_API_KEY);

async function main() {
  try {
    const model = ai.getGenerativeModel({ model: "gemini-2.5-flash" });
    const chat = model.startChat();

    const questions = [
      "Hi, siapa kamu?",
      "Apa itu AI?",
      "Jelaskan dalam gaya anak SMA."
    ];

    for (const q of questions) {
      const msg = await chat.sendMessage(q);
      const answer = await msg.response.text();
      console.log("User:", q);
      console.log("Bot:", answer);
      console.log("---");
      logChat(q, answer); // Tambahkan ini untuk log ke file
    }
  } catch (err) {
    console.error("❌ Error saat panggil Gemini:", err);
  }
}

main();