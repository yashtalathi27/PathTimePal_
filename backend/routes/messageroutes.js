import express from "express";
import { getusersforsidebars, getmessage, sendmessage } from '../controllers/message.controller.js';

const router = express.Router();

// Route to get users for sidebars
router.get("/users/:uid", getusersforsidebars);

// Route to get messages between two users (id = sender, rid = receiver)
router.get("/:id/:rid", getmessage);

// Route to send a message (sid = sender, rid = receiver)
router.post("/send/:sid/:rid", sendmessage);

export default router;
