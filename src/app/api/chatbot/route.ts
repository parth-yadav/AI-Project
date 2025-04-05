

import { NextRequest, NextResponse } from "next/server";
import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} from "@google/generative-ai";

// Load environment variables
const apiKey = process.env.GEMINI_API_KEY;

if (!apiKey) {
  throw new Error("GEMINI_API_KEY is not set in the environment variables.");
}

const genAI = new GoogleGenerativeAI(apiKey);

// Initialize the model with system instructions and generation configuration
const model = genAI.getGenerativeModel({
  model: "gemini-2.5-pro-exp-03-25",
  systemInstruction:
    "You are a cheerful chatbot for a clothing website. You will receive a prompt with product data as your knowledge base about the products. Solve user queries based on this knowledge base. If the question is out of the knowledge base, respond politely and guide the user.",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 8192, // Adjusted to a more reasonable value
};

// Define the POST handler for the API route
export async function POST(request: NextRequest) {
  try {
    // Parse the incoming request body
    const { message, history, products } = await request.json();

    if (!message || !Array.isArray(history)) {
      return NextResponse.json(
        {
          error:
            "Both 'message' and 'history' are required in the request body.",
        },
        { status: 400 }
      );
    }

    // Format the products data as a string to include in the prompt
    const knowledgeBase = products
      .map(
        (product: any) =>
          `Product Name: ${product.name}, Price: ${product.price}, Size: ${product.size}, Color: ${product.color}`
      )
      .join("\n");

    // Start a chat session with the model
    const chatSession = model.startChat({
      generationConfig,
      history: history.map((item: any) => ({
        role: item.role,
        parts: item.parts.map((part: any) => ({ text: part.text })),
      })),
    });

    // Combine the user's message with the knowledge base
    const fullPrompt = `Knowledge Base:\n${knowledgeBase}\n\nUser Query: ${message}`;

    // Send the combined prompt to the model
    const result = await chatSession.sendMessage(fullPrompt);

    // Extract and return the response text
    const responseText = result.response.text();
    return NextResponse.json({ response: responseText }, { status: 200 });
  } catch (error) {
    console.error("Error processing chat request:", error);
    return NextResponse.json(
      { error: "An internal server error occurred." },
      { status: 500 }
    );
  }
}
