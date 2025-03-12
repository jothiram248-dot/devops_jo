import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Plus } from "lucide-react";

const FAQItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div
      className="border-b border-gray-200 last:border-none"
      initial={false}
    >
      <button
        className="w-full py-6 flex justify-between items-center text-left group"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="text-lg font-medium text-gray-800 group-hover:text-indigo-600 transition-colors duration-200">
          {question}
        </span>
        <motion.div
          animate={{ 
            rotate: isOpen ? 180 : 0,
            backgroundColor: isOpen ? 'rgb(79, 70, 229)' : 'rgb(228, 231, 245)'
          }}
          transition={{ duration: 0.3 }}
          className="w-8 h-8 rounded-full flex items-center justify-center bg-indigo-100 group-hover:bg-indigo-200 transition-colors duration-200"
        >
          <ChevronDown className={`w-5 h-5 ${isOpen ? 'text-white' : 'text-indigo-600'}`} />
        </motion.div>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="pb-6 text-gray-600 leading-relaxed pl-3 border-l-2 border-indigo-100">
              {answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const FAQ = ({ faqs, title = "Frequently Asked Questions" }) => {
  return (
    <section className="relative py-16 overflow-hidden">
      {/* Premium Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-50/90 via-white/95 to-gray-50/90 z-0"></div>
      
      {/* Ambient gradient overlays */}
      <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-br from-blue-200/30 to-transparent opacity-60 z-0"></div>
      <div className="absolute bottom-0 left-0 w-full h-full bg-gradient-to-tr from-indigo-200/30 to-transparent opacity-50 z-0"></div>
      
      {/* Floating gradient spheres */}
      <div className="absolute top-40 right-20 w-80 h-80 bg-blue-300 rounded-full filter blur-3xl opacity-20 animate-float-slow"></div>
      <div className="absolute bottom-20 left-10 w-96 h-96 bg-indigo-300 rounded-full filter blur-3xl opacity-20 animate-float-slow-reverse"></div>
      <div className="absolute top-10 left-1/4 w-64 h-64 bg-sky-300 rounded-full filter blur-3xl opacity-20 animate-float-medium"></div>
      
      {/* Mesh gradient overlay */}
      <div className="absolute inset-0 opacity-30 z-0 bg-[radial-gradient(circle_at_top_right,_rgba(59,130,246,0.2),_transparent_70%),radial-gradient(circle_at_bottom_left,_rgba(99,102,241,0.2),_transparent_70%)]"></div>
      
      {/* Subtle pattern overlay */}
      <div className="absolute inset-0 opacity-5 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMwMDAiIGZpbGwtb3BhY2l0eT0iLjAyIj48cGF0aCBkPSJNMzYgMzRjMC0yLjIxIDEuNzktNCA0LTRzNCAxLjc5IDQgNC0xLjc5IDQtNCA0LTQtMS43OS00LTRtMC0xN2MwLTIuMjEgMS43OS00IDQtNHM0IDEuNzkgNCA0LTEuNzkgNC00IDQtNC0xLjc5LTQtNG0tMTcgMGMwLTIuMjEgMS43OS00IDQtNHM0IDEuNzkgNCA0LTEuNzkgNC00IDQtNC0xLjc5LTQtNG0wIDE3YzAtMi4yMSAxLjc5LTQgNC00czQgMS43OSA0IDQtMS43OSA0LTQgNC00LTEuNzktNC00Ii8+PC9nPjwvZz48L3N2Zz4=')] z-0"></div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-3xl mx-auto"
        >
          {/* Premium Title with Accent */}
          <div className="text-center mb-16">
            <div className="inline-block">
              <div className="w-16 h-1 bg-gradient-to-r from-blue-500 to-indigo-600 mx-auto mb-4"></div>
              <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-700 bg-clip-text text-transparent">
                {title}
              </h2>
            </div>
            <p className="text-gray-600 mt-4 max-w-xl mx-auto">
              Find answers to the most common questions about our services and features
            </p>
          </div>

          {/* FAQ Container with Premium Styling */}
          <div className="rounded-2xl bg-white/80 backdrop-blur-sm shadow-xl p-8 border border-gray-100 relative overflow-hidden">
            {/* Subtle corner accents */}
            <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-indigo-100 to-transparent rounded-bl-full opacity-70"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-blue-100 to-transparent rounded-tr-full opacity-70"></div>
            
         
            
            {/* FAQ Items */}
            <div className="space-y-1">
              {faqs.map((faq, index) => (
                <FAQItem
                  key={index}
                  question={faq.question}
                  answer={faq.answer}
                />
              ))}
            </div>
          </div>
          
         
        </motion.div>
      </div>
    </section>
  );
};

export default FAQ;