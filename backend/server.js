import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import axios from "axios";
import bodyParser from "body-parser";
import fs from 'fs';
import path from 'path';
import { GoogleGenerativeAI } from "@google/generative-ai";
const app = express();
dotenv.config();

const port = 8080;

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.get("/", (req, res) => {
    res.send("Hello World!")
});

const gemini_api_key = process.env.GEMINI_API_KEY;
const googleAI = new GoogleGenerativeAI(gemini_api_key);
const geminiModel = googleAI.getGenerativeModel({
    model: "gemini-3-flash-preview",
    systemInstruction: `
    You are a helpful AI assistant.
    Answer clearly and briefly.
    If the question is unclear, ask for clarification.
    `
});

// var question = "What is the name of the largest ocean in the world?";
const generate = async(question) => {
    try {
        // const prompt = req.body.question;
        const result = await geminiModel.generateContent(question);
        const response = result.response;
        // console.log(response.text());
        return response.text();
    } catch(error) {
        console.log("response error ", error);
    }
};

app.post("/chat", async(req, res) => {
    let data = req.body.question;
    var result = await generate(data);
    console.log(result);
    res.json({"result": result});
})

app.listen(port, ()=> {
    console.log(`server running on port ${port}`)
});