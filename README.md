# Sentiment-analysis

This is a modern and intuitive web application that allows users to instantly determine the emotional tone of text. Leveraging the cutting-edge Google Gemini API for powerful AI-driven analysis, the app provides accurate sentiment classification, identifying whether input text is positive, negative, or neutral. 

Features
Real-time Sentiment Analysis: Instantly analyze text input to determine its sentiment (positive, negative, neutral).
Google Gemini API Integration: Utilizes Google's most advanced and capable AI model for highly nuanced and accurate sentiment detection.
Secure Backend: A Node.js server securely handles all API calls to the Gemini API, keeping your API key safe and protected.

Tech Stack
Backend
Node.js: The JavaScript runtime environment that powers the application's server-side logic, chosen for its efficiency and scalability.
Express.js: (Commonly used with Node.js) A fast, unopinionated, minimalist web framework for building APIs and handling routes.

API
Google Gemini API: The core AI service responsible for performing the sentiment analysis on text.
Environment Management
dotenv: Used for securely loading environment variables (like your API key) from a .env file, keeping sensitive information out of your public codebase.
