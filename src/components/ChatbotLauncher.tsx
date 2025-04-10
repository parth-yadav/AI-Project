"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import ChatPage from "./ChatBot"; // Assuming ChatPage is in the same directory

export default function ChatbotLauncher() {
  const [isChatOpen, setIsChatOpen] = useState(false);

  // Animation variants for the chatbot container
  const chatVariants = {
    hidden: { opacity: 0, scale: 0.9, y: 50 },
    visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.3 } },
    exit: { opacity: 0, scale: 0.9, y: 50, transition: { duration: 0.2 } },
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
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
      {isChatOpen && (
        <motion.div
          variants={chatVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="fixed -bottom-16 right-28 w-full max-w-md"
        >
          <ChatPage />
          {/* Close Button */}
          
        </motion.div>
      )}
    </div>
  );
}
