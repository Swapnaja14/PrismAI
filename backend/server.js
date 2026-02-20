import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import bodyParser from "body-parser";
const app = express();
dotenv.config();
import mongoose from "mongoose";
import chatRoutes from './routes/chat.js'; 

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

app.use("/api", chatRoutes);

const connectDB = async() => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("Connected with Database.");
    } catch(error) {
        console.log("Failed to connect with Db ", error);
    }
}