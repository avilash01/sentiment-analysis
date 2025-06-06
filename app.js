require('dotenv').config(); 
const express = require('express');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

if (!GEMINI_API_KEY) {
    console.error("GEMINI_API_KEY not found in environment variables. Please set it in .env file.");
    process.exit(1); 
}

const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-pro" }); 

async function getSentiment(text) {
    if (!text || typeof text !== 'string') {
        throw new Error("Invalid text input. Must be a non-empty string.");
    }

    const prompt = `Analyze the sentiment of the following text.
    Classify the sentiment as 'Positive', 'Negative', or 'Neutral'.
    Provide a brief, concise explanation for your classification.

    Text: "${text}"

    Format your response as a JSON object with 'sentiment' and 'explanation' keys.
    Example:
    {
      "sentiment": "Positive",
      "explanation": "The text expresses strong approval and satisfaction."
    }
    `;

    try {
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const sentimentDataString = response.text().trim();
        try {
            const parsedSentiment = JSON.parse(sentimentDataString);
            return parsedSentiment;
        } catch (jsonError) {
            console.warn("Gemini did not return perfect JSON. Attempting fallback or returning raw text.");
            return {
                sentiment: "Unknown",
                explanation: `Could not parse sentiment from model. Raw output: ${sentimentDataString}`
            };
        }

    } catch (error) {
        console.error("Error calling Gemini API:", error);
        throw new Error("Failed to analyze sentiment due to an internal API error.");
    }
}

app.post('/analyze-sentiment', async (req, res) => {
    const { text } = req.body;

    if (!text) {
        return res.status(400).json({ error: "Invalid request. 'text' field is required in JSON payload." });
    }

    try {
        const sentimentResult = await getSentiment(text);
        res.status(200).json(sentimentResult);
    } catch (error) {
        console.error("Error in /analyze-sentiment endpoint:", error);
        res.status(500).json({ error: error.message || "An unexpected error occurred." });
    }
});

app.get('/health', (req, res) => {
    res.status(200).json({ status: "ok", message: "Backend is running and Gemini configured." });
});

app.listen(port, () => {
    console.log(`Node.js sentiment backend listening at http://localhost:${port}`);
    console.log(`API Key loaded: ${GEMINI_API_KEY ? 'Yes' : 'No'}`);
});