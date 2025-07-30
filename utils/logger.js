// utils/logger.js
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const logsDir = path.join(__dirname, "logs");
const logPath = path.join(logsDir, "chat.log");

// Buat folder jika belum ada
if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir);
}

// Fungsi log
export function logChat(prompt, response) {
  const log = `[${new Date().toISOString()}]\nUser: ${prompt}\nBot: ${response}\n`;
  fs.appendFileSync(logPath, log);
}
