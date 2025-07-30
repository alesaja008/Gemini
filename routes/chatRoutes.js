// routes/chatRoutes.js
import express from "express";
import { askQuestion } from "../controllers/chatController.js";

const router = express.Router();

router.get("/ask", askQuestion);

export default router;
