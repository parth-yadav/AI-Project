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

// Base URL for product pages (update this with your actual website URL)
const PRODUCT_PAGE_BASE_URL = "http://localhost:3000/collections/";

// Define the Product interface
interface Product {
  id: string; // UUID for the product
  name: string;
  price: number;
  size: string;
  color: string;
}

// Function to initialize the model with the knowledge base
function initializeModelWithKnowledgeBase(products: Product[]) {
  // Format the products data as a string to include in the system instructions
  const knowledgeBase = products
    .map(
      (product) =>
        `Product Name: ${product.name}, Price: ${product.price}, Size: ${product.size}, Color: ${product.color}, ID: ${product.id}`
    )
    .join("\n");

  // Initialize the model with system instructions containing the knowledge base
  return genAI.getGenerativeModel({
    model: "gemini-2.5-pro-exp-03-25",
    systemInstruction:
      `You are a cheerful chatbot for a clothing website. Below is the knowledge base about the products:\n${knowledgeBase}\n\n` +
      "Solve user queries based on this knowledge base. If the question is out of the knowledge base, respond politely and guide the user. If the user finalizes or expresses interest in a product, show a link to the product page using the format: [Product Name](URL).",
  });
}

// Define the POST handler for the API route
export async function POST(request: NextRequest) {
  try {
    // Parse the incoming request body
    const {
      message,
      history,
      products,
    }: { message: string; history: any[]; products: Product[] } =
      await request.json();

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

    // Extract and process the response text
    let responseText = result.response.text();

    // Check if the response mentions a product name and append the product link
    products.forEach((product: Product) => {
      const productName = encodeURIComponent(product.name); // Encode the product name
      const productLink = `${PRODUCT_PAGE_BASE_URL}${productName}/${product.id}`;
      const markdownLink = `[${product.name}](${productLink})`;

      // Replace mentions of the product name with a clickable link
      if (responseText.includes(product.name)) {
        responseText = responseText.replace(
          new RegExp(`\\b${product.name}\\b`, "g"),
          markdownLink
        );
      }
    });

    // Return the processed response
    return NextResponse.json({ response: responseText }, { status: 200 });
  } catch (error) {
    console.error("Error processing chat request:", error);
    return NextResponse.json(
      { error: "An internal server error occurred." },
      { status: 500 }
    );
  }
}
