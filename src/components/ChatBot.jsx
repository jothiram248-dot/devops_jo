import React, { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X } from "lucide-react";
import { useLocation } from "react-router-dom";
import { pageContent } from "../content/pageContent";

const ChatBot = ({ onStartReading }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      type: "bot",
      // text: 'Hello! How can I assist you today?',
      options: [
        // 'How can I help you?',
        "I Can Explain The Text For You, May I?",
      ],
    },
  ]);
  const location = useLocation();

  const handleOptionClick = (option) => {
    // Add user message
    setMessages((prev) => [...prev, { type: "user", text: option }]);

    // Add bot response based on option
    setTimeout(() => {
      if (option === "How can I help you?") {
        setMessages((prev) => [
          ...prev,
          {
            type: "bot",
            text: "I can help you with:",
            options: [
              "Understanding our features",
              "Managing credentials",
              "Setting up nominees",
              "Security information",
              "I Can Explain The Text For You, May I?",
            ],
          },
        ]);
      } else if (option === "I Can Explain The Text For You, May I?") {
        // Start reading and minimize chat
        onStartReading();
        setIsOpen(false);
        setMessages((prev) => [
          ...prev,
          {
            type: "bot",
            text: "I'll start reading the content for you. You can control the playback using the voice controls on the left.",
            options: ["How can I help you?"],
          },
        ]);
      } else {
        // Handle other options
        const responses = {
          "Understanding our features":
            "Our platform offers secure credential storage, smart notifications, and nominee management. Would you like me to explain in detail?",
          "Managing credentials":
            "You can securely store and manage various types of credentials including banking, investment, entertainment, and social media accounts.",
          "Setting up nominees":
            "You can designate trusted nominees who will have access to your digital assets according to your predetermined conditions.",
          "Security information":
            "We use military-grade encryption and advanced security measures to protect your data, including multi-factor authentication and secure storage protocols.",
        };

        setMessages((prev) => [
          ...prev,
          {
            type: "bot",
            text:
              responses[option] ||
              "I'll help you with that. Would you like me to explain more?",
            options: [
              "I Can Explain The Text For You, May I?",
              "How can I help you?",
            ],
          },
        ]);
      }
    }, 500);
  };

  return (
    <>
      {/* Chat Toggle Button */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 right-4 z-50 p-4 rounded-full bg-accent-100 text-dark-100 shadow-lg"
      >
        <MessageCircle className="w-6 h-6" />
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-20 right-4 z-50 w-96 max-w-[calc(100vw-2rem)] bg-dark-200 rounded-lg shadow-xl overflow-hidden"
          >
            {/* Chat Header */}
            <div className="flex items-center justify-between p-4 bg-dark-300">
              <div className="flex items-center space-x-2">
                <MessageCircle className="w-6 h-6 text-accent-100" />
                <span className="font-semibold text-white">
                  SacredSecret Assistant
                </span>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 rounded-full hover:bg-dark-200 transition-colors"
              >
                <X className="w-5 h-5 text-gray-400" />
              </button>
            </div>

            {/* Chat Messages */}
            <div className="h-96 overflow-y-auto p-4 space-y-4">
              {messages.map((message, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${
                    message.type === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-lg ${
                      message.type === "user"
                        ? "bg-accent-100 text-dark-100"
                        : "bg-dark-300 text-white"
                    }`}
                  >
                    <p>{message.text}</p>
                    {message.options && (
                      <div className="mt-3 space-y-2">
                        {message.options.map((option, optionIndex) => (
                          <button
                            key={optionIndex}
                            onClick={() => handleOptionClick(option)}
                            className="block w-full text-left px-3 py-2 rounded bg-dark-200 text-white hover:bg-dark-100 transition-colors"
                          >
                            {option}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChatBot;
