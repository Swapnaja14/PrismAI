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
import mongoose from "mongoose";

const port = 8080;

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.get("/", (req, res) => {
    res.send("Hello World!")
});


app.listen(port, ()=> {
    console.log(`server running on port ${port}`);
    connectDB();
});

const connectDB = async() => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("Connected with Database.");
    } catch(error) {
        console.log("Failed to connect with Db ", error);
    }
}