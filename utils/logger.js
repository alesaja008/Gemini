// utils/logger.js
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);;


const logDir = path.join(__dirname, "../logs");
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir);
}
const logPath = path.join(logDir, "chat.log");

export function logChat(prompt, response) {
  fs.appendFileSync(
    logPath,
    `[${new Date().toISOString()}] Prompt: ${prompt}\nJawaban: ${response}\n\n`
  );
}
