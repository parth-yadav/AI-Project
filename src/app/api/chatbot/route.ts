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

// Function to initialize the model with the knowledge base
function initializeModelWithKnowledgeBase(products: any[]) {
  // Format the products data as a string to include in the system instructions
  const knowledgeBase = products
    .map(
      (product: any) =>
        `Product Name: ${product.name}, Price: ${product.price}, Size: ${product.size}, Color: ${product.color} ,ID: ${product.id}`
    )
    .join("\n");

  // Initialize the model with system instructions containing the knowledge base
  return genAI.getGenerativeModel({
    model: "gemini-2.5-pro-exp-03-25",
    systemInstruction:
      `You are a cheerful chatbot for a clothing website. Below is the knowledge base about the products:\n${knowledgeBase}\n\n` +
      "Solve user queries based on this knowledge base. If the question is out of the knowledge base, respond politely and guide the user. If you think has finalisd a product show link to the product page  ",
  });
}

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

    // Initialize the model with the knowledge base
    const model = initializeModelWithKnowledgeBase(products);

    // Configure generation settings
    const generationConfig = {
      temperature: 1,
      topP: 0.95,
      topK: 64,
      maxOutputTokens: 6192,
    };

    // Start a chat session with the model
    const chatSession = model.startChat({
      generationConfig,
      history: history.map((item: any) => ({
        role: item.role,
        parts: item.parts.map((part: any) => ({ text: part.text })),
      })),
    });

    // Send only the user's query to the model (no need to include the knowledge base)
    const result = await chatSession.sendMessage(message);

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
