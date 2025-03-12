import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, User, MessageSquare, Send, X } from "lucide-react";

const HelpAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [body, setBody] = useState("");

  const handleSubmit = () => {
    // Handle submission logic (API call or form handling)
    console.log({ name, email, body });
  };

  return (
    <>
      {/* Help Assistant Toggle Button */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 right-4 z-50 p-4 rounded-full bg-accent-100 text-dark-100 shadow-lg"
      >
        <MessageSquare className="w-6 h-6" />
      </motion.button>

      {/* Help Assistant Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-20 right-4 z-50 w-96 max-w-[calc(100vw-2rem)] bg-dark-200 rounded-lg shadow-xl overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 bg-dark-300">
              <div className="flex items-center space-x-2">
                <MessageSquare className="w-6 h-6 text-accent-100" />
                <span className="font-semibold text-white">Help Assistant</span>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 rounded-full hover:bg-dark-200 transition-colors"
              >
                <X className="w-5 h-5 text-gray-400" />
              </button>
            </div>

            {/* Form Fields */}
            <div className="p-4 space-y-4">
              <div className="relative">
                <User
                  className="absolute left-3 top-3 text-gray-400"
                  size={20}
                />
                <input
                  type="text"
                  placeholder="Your Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-dark-100 text-white rounded-md focus:ring-2 focus:ring-accent-100"
                />
              </div>
              <div className="relative">
                <Mail
                  className="absolute left-3 top-3 text-gray-400"
                  size={20}
                />
                <input
                  type="email"
                  placeholder="Your Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-dark-100 text-white rounded-md focus:ring-2 focus:ring-accent-100"
                />
              </div>
              <textarea
                placeholder="How can we assist you?"
                value={body}
                onChange={(e) => setBody(e.target.value)}
                className="w-full p-3 bg-dark-100 text-white rounded-md h-32 resize-none focus:ring-2 focus:ring-accent-100"
              ></textarea>
              <button
                onClick={handleSubmit}
                className="w-full flex items-center justify-center bg-accent-100 text-dark-100 font-semibold py-2 rounded-md hover:bg-accent-200 transition"
              >
                <Send className="mr-2" size={18} /> Submit Request
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default HelpAssistant;











// import React, { useState, useEffect } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { 
//   Mail, 
//   User, 
//   MessageSquare, 
//   Send, 
//   X, 
//   Phone, 
//   HelpCircle, 
//   FileText, 
//   PaperclipIcon, 
//   Check, 
//   Loader2, 
//   ChevronDown,
//   Clock,
//   MessageCircle,
//   FileQuestion,
//   ThumbsUp,
//   History
// } from "lucide-react";

// const PremiumHelpAssistant = () => {
//   // Core states
//   const [isOpen, setIsOpen] = useState(false);
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [phone, setPhone] = useState("");
//   const [subject, setSubject] = useState("");
//   const [body, setBody] = useState("");
//   const [files, setFiles] = useState([]);
//   const [submitting, setSubmitting] = useState(false);
//   const [success, setSuccess] = useState(false);
//   const [currentView, setCurrentView] = useState("form"); // form, faq, history
//   const [priority, setPriority] = useState("normal");
//   const [selectedCategory, setSelectedCategory] = useState("");
//   const [isAudioRecording, setIsAudioRecording] = useState(false);
//   const [showTooltip, setShowTooltip] = useState(false);
//   const [typingAnimation, setTypingAnimation] = useState(false);
//   const [minimized, setMinimized] = useState(false);
  
//   // Premium feature - Suggested FAQ based on typed content
//   const [suggestedFAQs, setSuggestedFAQs] = useState([]);
  
//   // For chat history section
//   const [chatHistory] = useState([
//     { 
//       id: 1, 
//       title: "Login Issues", 
//       time: "2 days ago", 
//       status: "resolved",
//       preview: "I'm having trouble logging in to my account..."
//     },
//     { 
//       id: 2, 
//       title: "Premium Account Upgrade", 
//       time: "1 week ago", 
//       status: "resolved",
//       preview: "I would like to know more about upgrading to premium..."
//     }
//   ]);
  
//   // For FAQ section
//   const [faqs] = useState([
//     {
//       id: 1,
//       question: "How do I reset my password?",
//       answer: "You can reset your password by clicking on the 'Forgot Password' link on the login page. Follow the instructions sent to your email."
//     },
//     {
//       id: 2,
//       question: "What payment methods do you accept?",
//       answer: "We accept all major credit cards, PayPal, and bank transfers for business accounts."
//     },
//     {
//       id: 3,
//       question: "How can I upgrade my subscription?",
//       answer: "To upgrade your subscription, go to Account Settings > Subscription and select your desired plan."
//     },
//     {
//       id: 4, 
//       question: "Is my data secure?",
//       answer: "Yes, we use military-grade encryption and follow industry best practices to keep your data secure and private."
//     }
//   ]);
  
//   // Support ticket categories
//   const categories = [
//     "Technical Support",
//     "Account Access",
//     "Billing & Payments",
//     "Feature Request",
//     "Security Concern",
//     "Other"
//   ];

//   // Live agent availability simulation
//   const [agentAvailable, setAgentAvailable] = useState(true);
//   const [estimatedWaitTime, setEstimatedWaitTime] = useState(3);
  
//   useEffect(() => {
//     // Simulate agent availability
//     const interval = setInterval(() => {
//       setAgentAvailable(Math.random() > 0.3);
//       setEstimatedWaitTime(Math.floor(Math.random() * 10) + 1);
//     }, 30000);
    
//     return () => clearInterval(interval);
//   }, []);
  
//   // Support for file handling
//   const handleFileChange = (e) => {
//     if (e.target.files.length > 0) {
//       const newFiles = Array.from(e.target.files);
//       setFiles([...files, ...newFiles]);
//     }
//   };
  
//   const removeFile = (index) => {
//     setFiles(files.filter((_, i) => i !== index));
//   };
  
//   // Premium feature - FAQ suggestion based on what's being typed
//   useEffect(() => {
//     if (body.length > 10) {
//       setTypingAnimation(true);
//       const timeoutId = setTimeout(() => {
//         // Simple keyword matching - in a real app this would be more sophisticated
//         const matchedFaqs = faqs.filter(faq => 
//           faq.question.toLowerCase().includes(body.toLowerCase()) || 
//           faq.answer.toLowerCase().includes(body.toLowerCase())
//         ).slice(0, 2);
        
//         setSuggestedFAQs(matchedFaqs);
//         setTypingAnimation(false);
//       }, 1000);
      
//       return () => clearTimeout(timeoutId);
//     } else {
//       setSuggestedFAQs([]);
//     }
//   }, [body, faqs]);

//   const handleSubmit = () => {
//     setSubmitting(true);
    
//     // Simulate API call
//     setTimeout(() => {
//       setSubmitting(false);
//       setSuccess(true);
      
//       // Reset form after showing success message
//       setTimeout(() => {
//         setSuccess(false);
//         setName("");
//         setEmail("");
//         setPhone("");
//         setSubject("");
//         setBody("");
//         setFiles([]);
//         setPriority("normal");
//         setSelectedCategory("");
//       }, 3000);
//     }, 2000);
//   };
  
//   // Premium animation variants
//   const containerVariants = {
//     hidden: { opacity: 0, y: 20, scale: 0.95 },
//     visible: { 
//       opacity: 1, 
//       y: 0, 
//       scale: 1,
//       transition: { 
//         duration: 0.4,
//         ease: [0.22, 1, 0.36, 1],
//         staggerChildren: 0.05
//       }
//     },
//     exit: { 
//       opacity: 0, 
//       y: 20, 
//       scale: 0.95,
//       transition: { duration: 0.3 }
//     }
//   };
  
//   const itemVariants = {
//     hidden: { opacity: 0, y: 10 },
//     visible: { 
//       opacity: 1, 
//       y: 0,
//       transition: { duration: 0.4 }
//     }
//   };
  
//   const buttonVariants = {
//     hover: { 
//       scale: 1.05,
//       boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)",
//       transition: { type: "spring", stiffness: 400, damping: 10 }
//     },
//     tap: { scale: 0.95 }
//   };

//   return (
//     <>
//       {/* Premium Help Assistant Toggle Button */}
//       <motion.button
//         initial={{ scale: 0 }}
//         animate={{ scale: 1 }}
//         whileHover={buttonVariants.hover}
//         whileTap={buttonVariants.tap}
//         onClick={() => {
//           setIsOpen(true);
//           setMinimized(false);
//         }}
//         onMouseEnter={() => setShowTooltip(true)}
//         onMouseLeave={() => setShowTooltip(false)}
//         className="fixed bottom-6 right-6 z-50 p-4 rounded-full bg-gradient-to-tr from-accent-100 to-accent-200 text-white shadow-lg shadow-accent-100/20 border border-accent-100/20"
//       >
//         <MessageSquare className="w-6 h-6" />
//         <span className="absolute top-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-dark-100"></span>
        
//         {/* Tooltip */}
//         <AnimatePresence>
//           {showTooltip && (
//             <motion.div
//               initial={{ opacity: 0, y: 10, scale: 0.9 }}
//               animate={{ opacity: 1, y: -5, scale: 1 }}
//               exit={{ opacity: 0, y: 10, scale: 0.9 }}
//               className="absolute bottom-full right-0 mb-2 px-3 py-1.5 bg-dark-100 text-white text-sm rounded-lg whitespace-nowrap shadow-lg"
//             >
//               Need help? Click to chat
//               <div className="absolute bottom-0 right-5 transform translate-y-1/2 rotate-45 w-2 h-2 bg-dark-100"></div>
//             </motion.div>
//           )}
//         </AnimatePresence>
//       </motion.button>

//       {/* Minimized State Indicator */}
//       <AnimatePresence>
//         {isOpen && minimized && (
//           <motion.div
//             initial={{ opacity: 0, y: 10 }}
//             animate={{ opacity: 1, y: 0 }}
//             exit={{ opacity: 0, y: 10 }}
//             onClick={() => setMinimized(false)}
//             className="fixed bottom-20 right-6 z-50 bg-dark-200 rounded-lg shadow-xl p-2 pr-3 flex items-center gap-2 cursor-pointer hover:bg-dark-300 transition-colors"
//           >
//             <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
//             <span className="text-white text-sm">Help assistant active</span>
//           </motion.div>
//         )}
//       </AnimatePresence>

//       {/* Premium Help Assistant Window */}
//       <AnimatePresence>
//         {isOpen && !minimized && (
//           <motion.div
//             variants={containerVariants}
//             initial="hidden"
//             animate="visible"
//             exit="exit"
//             className="fixed bottom-20 right-6 z-50 w-96 max-w-[calc(100vw-2rem)] bg-dark-200 rounded-xl shadow-2xl overflow-hidden border border-dark-300"
//           >
//             {/* Premium Header */}
//             <div className="relative bg-gradient-to-r from-dark-300 to-dark-300/80 backdrop-blur-sm">
//               {/* Background Pattern */}
//               <div className="absolute inset-0 opacity-10 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCI+PGcgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjZmZmIiBzdHJva2Utd2lkdGg9IjEuNSIgc3Ryb2tlLW9wYWNpdHk9IjAuMSI+PHBhdGggZD0iTTEwIDE1TDUwIDQ1TTUwIDE1TDEwIDQ1Ii8+PC9nPjwvc3ZnPg==')]"></div>
              
//               {/* Top control bar */}
//               <div className="flex items-center justify-between p-4">
//                 <div className="flex items-center space-x-3">
//                   <div className="relative">
//                     <div className="w-8 h-8 flex items-center justify-center rounded-full bg-accent-100 text-dark-100">
//                       <MessageSquare className="w-4 h-4" />
//                     </div>
//                     <span className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 border-2 border-dark-300 rounded-full"></span>
//                   </div>
//                   <div>
//                     <h3 className="font-semibold text-white">Premium Support</h3>
//                     <div className="flex items-center text-gray-400 text-xs">
//                       <span className="inline-block w-1.5 h-1.5 rounded-full bg-green-500 mr-1.5"></span>
//                       <span>{agentAvailable ? "Agents available" : `Wait time: ~${estimatedWaitTime} min`}</span>
//                     </div>
//                   </div>
//                 </div>
                
//                 {/* Window Controls */}
//                 <div className="flex items-center space-x-1">
//                   <button
//                     onClick={() => setMinimized(true)}
//                     className="p-1.5 rounded-full hover:bg-dark-100/50 transition-colors"
//                   >
//                     <ChevronDown className="w-4 h-4 text-gray-400" />
//                   </button>
//                   <button
//                     onClick={() => setIsOpen(false)}
//                     className="p-1.5 rounded-full hover:bg-dark-100/50 transition-colors"
//                   >
//                     <X className="w-4 h-4 text-gray-400" />
//                   </button>
//                 </div>
//               </div>
              
//               {/* Navigation Tabs */}
//               <div className="flex border-b border-dark-100">
//                 <button
//                   onClick={() => setCurrentView("form")}
//                   className={`flex items-center justify-center py-3 flex-1 text-sm font-medium transition-colors ${
//                     currentView === "form" 
//                       ? "text-accent-100 border-b-2 border-accent-100" 
//                       : "text-gray-400 hover:text-white hover:bg-dark-100/30"
//                   }`}
//                 >
//                   <MessageCircle className="w-4 h-4 mr-2" />
//                   New Request
//                 </button>
//                 <button
//                   onClick={() => setCurrentView("faq")}
//                   className={`flex items-center justify-center py-3 flex-1 text-sm font-medium transition-colors ${
//                     currentView === "faq" 
//                       ? "text-accent-100 border-b-2 border-accent-100" 
//                       : "text-gray-400 hover:text-white hover:bg-dark-100/30"
//                   }`}
//                 >
//                   <FileQuestion className="w-4 h-4 mr-2" />
//                   FAQs
//                 </button>
//                 <button
//                   onClick={() => setCurrentView("history")}
//                   className={`flex items-center justify-center py-3 flex-1 text-sm font-medium transition-colors ${
//                     currentView === "history" 
//                       ? "text-accent-100 border-b-2 border-accent-100" 
//                       : "text-gray-400 hover:text-white hover:bg-dark-100/30"
//                   }`}
//                 >
//                   <History className="w-4 h-4 mr-2" />
//                   History
//                 </button>
//               </div>
//             </div>

//             {/* Content Views */}
//             <div className="max-h-[70vh] overflow-y-auto custom-scrollbar">
//               {/* New Support Request Form */}
//               {currentView === "form" && (
//                 <div className="p-4 space-y-4">
//                   <AnimatePresence mode="wait">
//                     {success ? (
//                       <motion.div
//                         initial={{ opacity: 0, scale: 0.9 }}
//                         animate={{ opacity: 1, scale: 1 }}
//                         exit={{ opacity: 0, scale: 0.9 }}
//                         className="bg-green-500/10 border border-green-500/30 rounded-lg p-4 text-center"
//                       >
//                         <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
//                           <Check className="w-6 h-6 text-green-500" />
//                         </div>
//                         <h4 className="text-white font-medium mb-1">Request Submitted!</h4>
//                         <p className="text-sm text-gray-300">We'll get back to you as soon as possible.</p>
//                       </motion.div>
//                     ) : (
//                       <motion.div
//                         initial={{ opacity: 0 }}
//                         animate={{ opacity: 1 }}
//                         exit={{ opacity: 0 }}
//                         className="space-y-4"
//                       >
//                         {/* Name Field */}
//                         <motion.div variants={itemVariants} className="relative">
//                           <User
//                             className="absolute left-3 top-3 text-gray-400"
//                             size={18}
//                           />
//                           <input
//                             type="text"
//                             placeholder="Your Name"
//                             value={name}
//                             onChange={(e) => setName(e.target.value)}
//                             className="w-full pl-10 pr-4 py-2.5 bg-dark-100 text-white rounded-md focus:ring-2 focus:ring-accent-100 border border-dark-300 focus:border-accent-100/50 transition-all"
//                           />
//                         </motion.div>
                        
//                         {/* Email Field */}
//                         <motion.div variants={itemVariants} className="relative">
//                           <Mail
//                             className="absolute left-3 top-3 text-gray-400"
//                             size={18}
//                           />
//                           <input
//                             type="email"
//                             placeholder="Your Email"
//                             value={email}
//                             onChange={(e) => setEmail(e.target.value)}
//                             className="w-full pl-10 pr-4 py-2.5 bg-dark-100 text-white rounded-md focus:ring-2 focus:ring-accent-100 border border-dark-300 focus:border-accent-100/50 transition-all"
//                           />
//                         </motion.div>
                        
//                         {/* Phone Field */}
//                         <motion.div variants={itemVariants} className="relative">
//                           <Phone
//                             className="absolute left-3 top-3 text-gray-400"
//                             size={18}
//                           />
//                           <input
//                             type="tel"
//                             placeholder="Phone Number (Optional)"
//                             value={phone}
//                             onChange={(e) => setPhone(e.target.value)}
//                             className="w-full pl-10 pr-4 py-2.5 bg-dark-100 text-white rounded-md focus:ring-2 focus:ring-accent-100 border border-dark-300 focus:border-accent-100/50 transition-all"
//                           />
//                         </motion.div>
                        
//                         {/* Category Dropdown */}
//                         <motion.div variants={itemVariants} className="relative">
//                           <select
//                             value={selectedCategory}
//                             onChange={(e) => setSelectedCategory(e.target.value)}
//                             className="w-full pl-4 pr-10 py-2.5 bg-dark-100 text-white rounded-md focus:ring-2 focus:ring-accent-100 border border-dark-300 focus:border-accent-100/50 transition-all appearance-none"
//                           >
//                             <option value="">Select a Category</option>
//                             {categories.map((category, index) => (
//                               <option key={index} value={category}>
//                                 {category}
//                               </option>
//                             ))}
//                           </select>
//                           <div className="absolute right-3 top-3 pointer-events-none">
//                             <ChevronDown className="w-5 h-5 text-gray-400" />
//                           </div>
//                         </motion.div>
                        
//                         {/* Subject Field */}
//                         <motion.div variants={itemVariants} className="relative">
//                           <FileText
//                             className="absolute left-3 top-3 text-gray-400"
//                             size={18}
//                           />
//                           <input
//                             type="text"
//                             placeholder="Subject"
//                             value={subject}
//                             onChange={(e) => setSubject(e.target.value)}
//                             className="w-full pl-10 pr-4 py-2.5 bg-dark-100 text-white rounded-md focus:ring-2 focus:ring-accent-100 border border-dark-300 focus:border-accent-100/50 transition-all"
//                           />
//                         </motion.div>
                        
//                         {/* Priority Selection - Premium Feature */}
//                         <motion.div variants={itemVariants} className="grid grid-cols-3 gap-2">
//                           {["low", "normal", "high"].map((level) => (
//                             <button
//                               key={level}
//                               type="button"
//                               onClick={() => setPriority(level)}
//                               className={`py-2 px-3 rounded-md text-sm font-medium capitalize transition-all flex items-center justify-center ${
//                                 priority === level
//                                   ? level === "high"
//                                     ? "bg-red-500/20 border-red-500/40 text-red-400"
//                                     : level === "low"
//                                     ? "bg-blue-500/20 border-blue-500/40 text-blue-400"
//                                     : "bg-green-500/20 border-green-500/40 text-green-400"
//                                   : "bg-dark-100 border-dark-300 text-gray-400 hover:bg-dark-300"
//                               } border`}
//                             >
//                               {level === "high" && <Clock className="w-3 h-3 mr-1.5" />}
//                               {level}
//                             </button>
//                           ))}
//                         </motion.div>
                        
//                         {/* Message Field */}
//                         <motion.div variants={itemVariants} className="relative">
//                           <textarea
//                             placeholder="How can we assist you?"
//                             value={body}
//                             onChange={(e) => setBody(e.target.value)}
//                             className="w-full p-4 bg-dark-100 text-white rounded-md h-36 resize-none focus:ring-2 focus:ring-accent-100 border border-dark-300 focus:border-accent-100/50 transition-all"
//                           ></textarea>
                          
//                           {/* Suggested FAQs while typing - Premium feature */}
//                           <AnimatePresence>
//                             {(suggestedFAQs.length > 0 || typingAnimation) && (
//                               <motion.div
//                                 initial={{ opacity: 0, y: 10 }}
//                                 animate={{ opacity: 1, y: 0 }}
//                                 exit={{ opacity: 0, y: 10 }}
//                                 className="absolute bottom-2 left-2 right-2 bg-dark-300/90 backdrop-blur-sm rounded-md p-2 border border-dark-100 shadow-lg"
//                               >
//                                 <div className="text-xs text-gray-400 mb-2 flex items-center">
//                                   <HelpCircle className="w-3 h-3 mr-1" />
//                                   {typingAnimation ? (
//                                     <div className="flex items-center">
//                                       <span>Finding relevant solutions</span>
//                                       <span className="ml-1 flex">
//                                         <span className="animate-bounce mx-0.5 delay-75">.</span>
//                                         <span className="animate-bounce mx-0.5 delay-150">.</span>
//                                         <span className="animate-bounce mx-0.5 delay-300">.</span>
//                                       </span>
//                                     </div>
//                                   ) : (
//                                     "Related FAQs found that might help:"
//                                   )}
//                                 </div>
                                
//                                 {!typingAnimation && suggestedFAQs.map((faq) => (
//                                   <button
//                                     key={faq.id}
//                                     onClick={() => {
//                                       setCurrentView("faq");
//                                       // In a real app, would scroll to and highlight this specific FAQ
//                                     }}
//                                     className="w-full text-left text-sm py-1.5 px-2 rounded hover:bg-dark-100 transition-colors text-white flex items-center"
//                                   >
//                                     <ThumbsUp className="w-3 h-3 mr-2 text-accent-100" />
//                                     {faq.question}
//                                   </button>
//                                 ))}
//                               </motion.div>
//                             )}
//                           </AnimatePresence>
//                         </motion.div>
                        
//                         {/* File Attachments - Premium Feature */}
//                         <motion.div variants={itemVariants} className="space-y-3">
//                           <div className="flex justify-between items-center">
//                             <label className="flex items-center px-4 py-2 bg-dark-100 text-gray-300 rounded-md hover:bg-dark-300 cursor-pointer border border-dark-300 transition-colors">
//                               <PaperclipIcon className="w-4 h-4 mr-2" />
//                               <span className="text-sm">Attach Files</span>
//                               <input
//                                 type="file"
//                                 className="hidden"
//                                 multiple
//                                 onChange={handleFileChange}
//                               />
//                             </label>
//                             {files.length > 0 && (
//                               <span className="text-xs text-gray-400">
//                                 {files.length} file{files.length !== 1 ? "s" : ""}
//                               </span>
//                             )}
//                           </div>
                          
//                           {/* File Preview */}
//                           {files.length > 0 && (
//                             <div className="border border-dark-300 rounded-md p-2 bg-dark-100 space-y-2">
//                               {files.map((file, index) => (
//                                 <div key={index} className="flex justify-between items-center p-1.5 rounded-md bg-dark-300/50 text-sm">
//                                   <div className="flex items-center text-gray-300 truncate">
//                                     <FileText className="w-4 h-4 mr-2 flex-shrink-0 text-accent-100/70" />
//                                     <span className="truncate max-w-[160px]">{file.name}</span>
//                                   </div>
//                                   <button
//                                     onClick={() => removeFile(index)}
//                                     className="p-1 text-gray-400 hover:text-white transition-colors"
//                                   >
//                                     <X className="w-4 h-4" />
//                                   </button>
//                                 </div>
//                               ))}
//                             </div>
//                           )}
//                         </motion.div>
                        
//                         {/* Audio Message - Premium Feature */}
//                         <motion.div variants={itemVariants} className="flex justify-center">
//                           <button
//                             onClick={() => setIsAudioRecording(!isAudioRecording)}
//                             className={`${
//                               isAudioRecording 
//                                 ? "bg-red-500/20 text-red-400 border-red-500/50 animate-pulse" 
//                                 : "bg-dark-100 text-gray-300 border-dark-300 hover:bg-dark-300"
//                             } px-4 py-2 rounded-full border transition-all flex items-center space-x-2`}
//                           >
//                             <div className={`w-2 h-2 rounded-full ${isAudioRecording ? 'bg-red-500' : 'bg-gray-400'}`}></div>
//                             <span>{isAudioRecording ? "Recording Voice Message..." : "Record Voice Message"}</span>
//                           </button>
//                         </motion.div>
                        
//                         {/* Submit Button */}
//                         <motion.button
//                           variants={itemVariants}
//                           whileHover={buttonVariants.hover}
//                           whileTap={buttonVariants.tap}
//                           onClick={handleSubmit}
//                           disabled={submitting}
//                           className="w-full flex items-center justify-center bg-gradient-to-r from-accent-100 to-accent-200 text-white font-semibold py-3 rounded-md transition-all disabled:opacity-70 shadow-lg shadow-accent-100/10"
//                         >
//                           {submitting ? (
//                             <>
//                               <Loader2 className="w-5 h-5 mr-2 animate-spin" />
//                               Processing...
//                             </>
//                           ) : (
//                             <>
//                               <Send className="w-5 h-5 mr-2" />
//                               Submit Request
//                             </>
//                           )}
//                         </motion.button>
                        
//                         {/* Premium Status Indicators */}
//                         <div className="flex items-center justify-between text-xs text-gray-400 pt-1">
//                           <div className="flex items-center">
//                             <Clock className="w-3 h-3 mr-1" />
//                             <span>Avg response time: {agentAvailable ? "15 min" : "4 hours"}</span>
//                           </div>
//                           <span>256-bit encrypted</span>
//                         </div>
//                       </motion.div>
//                     )}
//                   </AnimatePresence>
//                 </div>
//               )}
              
//               {/* FAQs Section */}
//               {currentView === "faq" && (
//                 <div className="p-4">
//                   <div className="mb-4">
//                     <div className="relative">
//                       <input
//                         type="text"
//                         placeholder="Search FAQs..."
//                         className="w-full pl-10 pr-4 py-2.5 bg-dark-100 text-white rounded-md focus:ring-2 focus:ring-accent-100 border border-dark-300 focus:border-accent-100/50 transition-all"
//                       />
//                       <div className="absolute left-3 top-3 text-gray-400">
//                         <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
//                         </svg>
//                       </div>
//                     </div>
//                   </div>
                  
//                   <div className="space-y-3">
//                     {faqs.map((faq, index) => (
//                       <motion.div
//                         key={faq.id}
//                         initial={{ opacity: 0, y: 10 }}
//                         animate={{ opacity: 1, y: 0 }}
//                         transition={{ delay: index * 0.1 }}
//                         className="bg-dark-100 border border-dark-300 rounded-lg overflow-hidden"
//                       >
//                         <div className="p-4">
//                           <h4 className="font-medium text-white flex items-center">
//                             <HelpCircle className="w-4 h-4 mr-2 text-accent-100" />
//                             {faq.question}
//                           </h4>
//                           <p className="mt-2 text-sm text-gray-300 pl-6">
//                             {faq.answer}
//                           </p>
//                           <div className="mt-3 pl-6 flex items-center space-x-2">
//                             <button className="text-xs bg-dark-200 hover:bg-dark-300 text-gray-400 px-2 py-1 rounded transition-colors">
//                               Helpful
//                             </button>
//                             <button className="text-xs bg-dark-200 hover:bg-dark-300 text-gray-400 px-2 py-1 rounded transition-colors">
//                               Not helpful
//                             </button>
//                           </div>
//                         </div>
//                       </motion.div>
//                     ))}
//                   </div>
                  
//                   <div className="mt-6 p-4 bg-dark-100/50 border border-dark-300 rounded-lg">
//                     <h4 className="font-medium text-white mb-2 flex items-center">
//                       <MessageCircle className="w-4 h-4 mr-2 text-accent-100" />
//                       Can't find what you're looking for?
//                     </h4>
//                     <p className="text-sm text-gray-300 mb-3">
//                       Our support team is ready to help you with any questions.
//                     </p>
//                     <button 
//                       onClick={() => setCurrentView("form")}
//                       className="w-full bg-accent-100/20 hover:bg-accent-100/30 text-accent-100 font-medium py-2 rounded transition-colors"
//                     >
//                       Contact Support
//                     </button>
//                   </div>
//                 </div>
//               )}
              
//               {/* History Section */}
//               {currentView === "history" && (
//                 <div className="p-4">
//                   <div className="space-y-3">
//                     {chatHistory.length === 0 ? (
//                       <div className="text-center py-6">
//                         <div className="w-16 h-16 bg-dark-100 rounded-full flex items-center justify-center mx-auto mb-3">
//                           <History className="w-8 h-8 text-gray-500" />
//                         </div>
//                         <h4 className="text-white font-medium mb-1">No history yet</h4>
//                         <p className="text-sm text-gray-400">Your support requests will appear here</p>
//                       </div>
//                     ) : (
//                       chatHistory.map((ticket, index) => (
//                         <motion.div
//                           key={ticket.id}
//                           initial={{ opacity: 0, y: 10 }}
//                           animate={{ opacity: 1, y: 0 }}
//                           transition={{ delay: index * 0.1 }}
//                           className="bg-dark-100 border border-dark-300 rounded-lg overflow-hidden hover:border-accent-100/30 transition-colors"
//                         >
//                           <div className="p-4">
//                             <div className="flex justify-between items-start mb-2">
//                               <h4 className="font-medium text-white">{ticket.title}</h4>
//                               <span className={`text-xs px-2 py-1 rounded-full ${
//                                 ticket.status === "resolved" 
//                                   ? "bg-green-500/20 text-green-400" 
//                                   : "bg-blue-500/20 text-blue-400"
//                               }`}>
//                                 {ticket.status}
//                               </span>
//                             </div>
//                             <p className="text-sm text-gray-300 mb-2 line-clamp-2">
//                               {ticket.preview}
//                             </p>
//                             <div className="flex justify-between items-center text-xs text-gray-400">
//                               <span>{ticket.time}</span>
//                               <button className="text-accent-100 hover:underline">
//                                 View Details
//                               </button>
//                             </div>
//                           </div>
//                         </motion.div>
//                       ))
//                     )}
//                   </div>
                  
//                   <div className="mt-6 p-4 bg-gradient-to-br from-dark-100 to-dark-200 border border-dark-300 rounded-lg">
//                     <h4 className="font-medium text-white mb-2">Need more help?</h4>
//                     <div className="grid grid-cols-2 gap-3 mt-4">
//                       <button 
//                         onClick={() => setCurrentView("form")}
//                         className="bg-accent-100/20 hover:bg-accent-100/30 text-accent-100 font-medium py-2 px-3 rounded-lg text-sm transition-colors flex items-center justify-center"
//                       >
//                         <MessageCircle className="w-3 h-3 mr-1.5" />
//                         New Request
//                       </button>
//                       <button 
//                         onClick={() => setCurrentView("faq")}
//                         className="bg-dark-100 hover:bg-dark-300 text-gray-300 font-medium py-2 px-3 rounded-lg text-sm transition-colors flex items-center justify-center"
//                       >
//                         <FileQuestion className="w-3 h-3 mr-1.5" />
//                         View FAQs
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               )}
//             </div>
            
//             {/* Premium Footer with Live Chat Indicator */}
//             <div className="p-3 border-t border-dark-300 bg-dark-300/50 flex items-center justify-between">
//               <div className="flex items-center space-x-3">
//                 <button className="p-1.5 hover:bg-dark-100 rounded-full transition-colors">
//                   <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
//                   </svg>
//                 </button>
//                 <div className="flex items-center text-xs text-gray-400">
//                   <div className="flex items-center mr-2">
//                     <span className={`w-1.5 h-1.5 rounded-full ${agentAvailable ? 'bg-green-500' : 'bg-yellow-500'} mr-1`}></span>
//                     <span>{agentAvailable ? 'Online' : 'Busy'}</span>
//                   </div>
//                   <span className="hidden sm:inline">|</span>
//                   <button className="ml-2 hover:text-white transition-colors">Live Chat</button>
//                 </div>
//               </div>
//               <div className="text-xs text-gray-500">
//                 Powered by <span className="text-accent-100">Support Pro</span>
//               </div>
//             </div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </>
//   );
// };

// export default PremiumHelpAssistant;