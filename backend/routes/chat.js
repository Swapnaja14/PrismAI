import express from 'express';
import Thread from '../models/thread.js';
import getGeminiAPIResponse from '../utils/gemini.js';

const router = express.Router();

router.post("/test", async (req, res) => {
    try {
        const thread = new Thread({
            threadId: "xyb",
            title: "Testing New Thread",
        });
        const response = await thread.save();
        res.send(response);
    } 
    catch(error) {
        console.log(error);
        res.send(500).json({error: "Failed to save in DB"});
    }
});

// GET /thread (Get all threads)
router.get("/thread", async (req, res) => {
    try {
        const threads = await Thread.find({}).sort({updatedAt: -1});
        // descending order of updatedAt... most recent data on top
        res.json(threads);
    } 
    catch(error) {
        console.log(error);
        res.status(500).json({error: "Failed to fetch threads"});
    }
});

// GET /thread/:threadId
router.get("/thread/:threadId", async(req, res) => {
    const {threadId} = req.params;
    try {
        const thread = await Thread.findOne({threadId});
        if (!thread) {
            res.status(500).send({error: "Thread not found."});
        }
        res.json(thread.messages);
    }
    catch(error) {
        console.log(error);
        res.status(500).json({error: "Failed to fetch required thread"});
    }
});

// DELETE /thread/:threadId
router.delete("/thread/:threadId", async(req, res) => {
    const {threadId} = req.params;
    try {
        const deletedThread = await Thread.findOneAndDelete({threadId});
        if (!deletedThread) {
            res.status(404).json({error: "Thread could not be deleted"});
        }
        res.status(200).json({error: "Thread deleted successfully."});
    }
    catch(error) {
        console.log(error);
        res.status(500).send({error: "Failed to delete chat."});
    }
});

router.post("/chat", async(req, res) => {
    const {threadId, message} = req.body;
    if (!threadId || !message) {
        res.status(400).json({error: "Missing Required Fields"});
    }
    try {
        let thread = await Thread.findOne({threadId});
        if (!thread) {
            // create a new thread in DB
            thread = new Thread({
                threadId,
                title: message,
                messages: [{role: "user", content: message}]
            });
        }
        else {
            thread.messages.push({role: "user", content: message});
        }
        const assistantReply = await getGeminiAPIResponse(message);
        thread.messages.push({role: "assistant", content: assistantReply});
        thread.updatedAt = new Date();
        await thread.save();
        res.json({reply: assistantReply});
    }
    catch(error) {
        console.log(error);
        res.status(500).json({error: "something went wrong"});
    }
});

export default router;