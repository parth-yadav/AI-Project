"use client";
import React, { useState, FormEvent, useRef, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import { motion, AnimatePresence } from "framer-motion";

interface ChatMessage {
  role: "user" | "model";
  parts: { text: string }[];
}

export default function ChatPage() {
  const [message, setMessage] = useState<string>("");
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [products, setProducts] = useState<any[]>([]);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [chatHistory]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("/api/products");
        if (!response.ok) throw new Error("Failed to fetch products");
        const data = await response.json();
        setProducts(data);
      } catch (err) {
        console.error("Error fetching products:", err);
        setError("Failed to load product data.");
      }
    };
    fetchProducts();
  }, []);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!message.trim() || isLoading) return;

    setError(null);
    setIsLoading(true);

    const newUserMessage: ChatMessage = {
      role: "user",
      parts: [{ text: message }],
    };

    const updatedHistory = [...chatHistory, newUserMessage];
    setChatHistory(updatedHistory);
    setMessage("");

    try {
      const response = await fetch("/api/chatbot", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: message,
          history: chatHistory,
          products: products,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.error || `HTTP error! status: ${response.status}`
        );
      }

      const data = await response.json();
      const modelResponse: ChatMessage = {
        role: "model",
        parts: [{ text: data.response }],
      };
      setChatHistory((prevHistory) => [...prevHistory, modelResponse]);
    } catch (err: unknown) {
      console.error("API Fetch error:", err);
      const errorMessage =
        err instanceof Error ? err.message : "An unknown error occurred.";
      setError(`Failed to get response: ${errorMessage}`);
    } finally {
      setIsLoading(false);
    }
  };

  const messageVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
    exit: { opacity: 0, y: -20, transition: { duration: 0.2 } },
  };

  const loadingVariants = {
    animate: {
      opacity: [0.5, 1, 0.5],
      transition: { repeat: Infinity, duration: 1.5 },
    },
  };

  return (
    <div className="my-[10vh] flex flex-col h-[70vh] max-w-2xl mx-auto  shadow-lg shadow-black dark:shadow-white rounded-lg overflow-hidden font-sans shadow-l text-white">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center py-3   m-0 bg-gray-900 text-lg font-semibold text-purple-500"
      >
        Clothing Brand Chatbot
      </motion.h1>

      <div className="relative flex flex-col h-[70vh]  overflow-hidden font-sans shadow-2xl bg-black/20 backdrop-blur-2xl ">
        <AnimatePresence>
          {chatHistory.map((chatItem, index) => (
            <motion.div
              key={index}
              variants={messageVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className={`max-w-[80%] p-2  text-white ${
                chatItem.role === "user"
                  ? "self-end bg-purple-600 rounded-br-none"
                  : "self-start bg-gray-800 rounded-bl-none"
              }`}
            >
              <strong>{chatItem.role === "user" ? "You:" : "Chatbot:"}</strong>
              <ReactMarkdown>{chatItem.parts[0].text}</ReactMarkdown>
            </motion.div>
          ))}
        </AnimatePresence>

        {isLoading && (
          <motion.div
            variants={loadingVariants}
            animate="animate"
            className="text-center text-gray-400 py-2"
          >
            Chatbot is thinking...
          </motion.div>
        )}
        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              className="text-center text-purple-500 bg-gray-900 border border-purple-700 rounded px-3 py-2 my-2"
            >
              {error}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <motion.form
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="flex p-3   bg-gray-900"
      >
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Ask about our products..."
          className="flex-1 px-3 py-2 border border-gray-600 rounded mr-2 text-base bg-black text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-200"
          disabled={isLoading}
        />
        <motion.button
          type="submit"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-4 py-2 bg-purple-600 text-white rounded text-base disabled:opacity-50 hover:bg-purple-700 transition-colors duration-200"
          disabled={isLoading}
        >
          {isLoading ? "Sending..." : "Send"}
        </motion.button>
      </motion.form>
    </div>
  );
}
