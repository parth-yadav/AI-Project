"use client";
import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ReactMarkdown from "react-markdown";

interface ChatMessage {
  role: "user" | "model";
  parts: { text: string }[];
}

export default function ChatbotLauncher() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [message, setMessage] = useState<string>("");
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [products, setProducts] = useState<any[]>([]);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  // Animation variants for the chatbot container
  const chatVariants = {
    hidden: { opacity: 0, scale: 0.9, y: 50 },
    visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.3 } },
    exit: { opacity: 0, scale: 0.9, y: 50, transition: { duration: 0.2 } },
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

  useEffect(() => {
    if (chatContainerRef.current && isChatOpen) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [chatHistory, isChatOpen]);

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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
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

  return (
    <div className="fixed bottom-6 right-12 ">
      {/* Circular Button */}
      <motion.button
        onClick={() => setIsChatOpen(!isChatOpen)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="w-16 h-16 bg-purple-600 text-white rounded-full flex items-center justify-center shadow-lg focus:outline-none hover:bg-purple-700 transition-colors duration-200"
      >
        {/* Dynamic Icon Based on `isChatOpen` State */}
        {isChatOpen ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
            />
          </svg>
        )}
      </motion.button>

      {/* Chatbot Overlay */}
      <AnimatePresence>
        {isChatOpen && (
          <motion.div
            variants={chatVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed bottom-24 right-10 w-full max-w-md"
          >
            <div className="my-[2vh] flex flex-col h-[70vh] max-w-2xl mx-auto shadow-lg shadow-black dark:shadow-white rounded-lg overflow-hidden font-sans shadow-l text-white">
              <motion.h1
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-center py-3 m-0 bg-gray-900 text-lg font-semibold text-purple-400"
              >
                Wolf Store Bot
              </motion.h1>

              <div
                ref={chatContainerRef}
                className="relative flex flex-col h-[70vh] overflow-y-auto font-sans shadow-2xl bg-black/20 backdrop-blur-lg scrollbar-hide"
                style={{
                  WebkitOverflowScrolling: "touch",
                }}
              >
                <AnimatePresence>
                  {chatHistory.map((chatItem, index) => (
                    <motion.div
                      key={index}
                      variants={messageVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      className={`
                        max-w-[80%] 
                        px-4 py-3 my-2 mx-2
                        text-white 
                        shadow-md 
                        backdrop-blur-md 
                        bg-purple-600 
                        ${
                          chatItem.role === "user"
                            ? "self-end rounded-2xl rounded-br-none"
                            : "self-start rounded-2xl rounded-bl-none"
                        }
                      `}
                    >
                      <strong className="block text-sm text-gray-300 mb-1">
                        {chatItem.role === "user" ? "You:" : "Wolfbot:"}
                      </strong>
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
                    Wolfbot is thinking...
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
                className="flex p-3 bg-gray-900"
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
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
