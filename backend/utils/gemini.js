import "dotenv/config";
import { GoogleGenerativeAI } from "@google/generative-ai";

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

const getGeminiAPIResponse = async(question) => {
    try {
        const result = await geminiModel.generateContent(question);
        return result.response.text();
    } catch(error) {
        console.error("Gemini API error: ", error);
        throw error;
    }
};

export default getGeminiAPIResponse;