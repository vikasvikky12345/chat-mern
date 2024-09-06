import express from "express";
import {
  getMessages,
  messageController,
} from "../controllers/messageController.js";
import { protectRoute } from "../midleware/protectRoute.js";

const router = express.Router();
router.get("/:id", protectRoute, getMessages);
router.post("/send/:id", protectRoute, messageController);
export default router;
