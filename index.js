// // index.js

// import dotenv from "dotenv";
// import { GoogleGenerativeAI } from "@google/generative-ai";

// dotenv.config();

// const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
// if (!GEMINI_API_KEY) {
//   console.error("API Key tidak ditemukan!");
//   process.exit(1);
// }

// const ai = new GoogleGenerativeAI(GEMINI_API_KEY);

// async function main() {
//   try {
//     const model = ai.getGenerativeModel({ model: "gemini-2.5-flash" });

//     // Mulai sesi chat
//     const chat = model.startChat();

//     const msg1 = await chat.sendMessage("Hi, siapa kamu?");
//     console.log("Bot:", await msg1.response.text());

//     const msg2 = await chat.sendMessage("Apa itu AI?");
//     console.log("Bot:", await msg2.response.text());

//     const msg3 = await chat.sendMessage("Jelaskan dalam gaya anak SMA.");
//     console.log("Bot:", await msg3.response.text());
//   } catch (error) {
//     console.error("Terjadi error:", error.message);
//   }
// }

// main();



import dotenv from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai";

// Load .env
dotenv.config();

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

if (!GEMINI_API_KEY) {
  console.error("❌ API key tidak ditemukan! Pastikan .env berisi GEMINI_API_KEY");
  process.exit(1);
}

// Inisialisasi Gemini client
const ai = new GoogleGenerativeAI(GEMINI_API_KEY);

async function main() {
  try {
    const model = ai.getGenerativeModel({ model: "gemini-2.5-flash" });

    const result = await model.generateContent("Explain how AI works in a few words");
    const response = await result.response;
    const text = response.text();

    console.log("🎉 Output dari Gemini:");
    console.log(text);
  } catch (error) {
    console.error("💥 Terjadi error saat memanggil Gemini:", error.message);
  }
}

main();

