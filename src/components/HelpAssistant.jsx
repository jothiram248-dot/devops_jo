import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, MessageSquare, Send, X, FileText, CheckCircle } from "lucide-react";
import { useMeQuery } from "@/features/api/userApiSlice";
import { useHelpAssistMutation } from "@/features/api/userApiSlice";
import { toast } from "react-hot-toast";

const HelpAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Get user data from ME API
  const { data: userData, isLoading: isLoadingUser } = useMeQuery();
  const userEmail = userData?.me?.email || "";

  // Help Assist mutation
  const [helpAssist, { isLoading: isSubmitting }] = useHelpAssistMutation();

  // Reset form when opening
  useEffect(() => {
    if (isOpen) {
      setIsSubmitted(false);
    }
  }, [isOpen]);

  const handleSubmit = async () => {
    // Validation
    if (!subject.trim()) {
      toast.error("Please enter a subject");
      return;
    }
    if (!message.trim()) {
      toast.error("Please enter your message");
      return;
    }

    try {
      await helpAssist({
        subject: subject.trim(),
        message: message.trim(),
      }).unwrap();

      // Show success state
      setIsSubmitted(true);
      toast.success("Your request has been submitted successfully!");

      // Reset form after 2 seconds and close
      setTimeout(() => {
        setSubject("");
        setMessage("");
        setIsSubmitted(false);
        setIsOpen(false);
      }, 2000);
    } catch (error) {
      console.error("Error submitting help request:", error);
      toast.error(
        error?.data?.message || "Failed to submit request. Please try again."
      );
    }
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
        className="fixed bottom-6 right-6 z-50 p-4 rounded-full bg-gradient-to-r from-accent-100 to-accent-200 text-dark-100 shadow-2xl shadow-accent-100/30"
        aria-label="Open Help Assistant"
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
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed bottom-24 right-6 z-50 w-[400px] max-w-[calc(100vw-3rem)] bg-dark-200 rounded-2xl shadow-2xl overflow-hidden border border-white/10 max-h-[calc(100vh-8rem)]"
            style={{ display: 'flex', flexDirection: 'column' }}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 bg-gradient-to-r from-dark-300 to-dark-200 border-b border-white/10 flex-shrink-0">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-accent-100 to-accent-200 flex items-center justify-center">
                  <MessageSquare className="w-5 h-5 text-dark-100" />
                </div>
                <div>
                  <h3 className="font-semibold text-white text-base">
                    Help Assistant
                  </h3>
                  <p className="text-xs text-gray-400">
                    We're here to help
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 rounded-lg hover:bg-dark-100 transition-colors"
                aria-label="Close"
              >
                <X className="w-5 h-5 text-gray-400 hover:text-white transition-colors" />
              </button>
            </div>

            {/* Form Content - Scrollable */}
            {!isSubmitted ? (
              <div className="overflow-y-auto flex-1" style={{ maxHeight: 'calc(100vh - 16rem)' }}>
                <div className="p-4 space-y-4">
                  {/* Email Field (Read-only) */}
                  <div>
                    <label className="block text-xs font-medium text-gray-300 mb-1.5">
                      Your Email
                    </label>
                    <div className="relative">
                      <Mail
                        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                        size={16}
                      />
                      <input
                        type="email"
                        value={userEmail}
                        readOnly
                        disabled
                        className="w-full pl-9 pr-3 py-2.5 bg-dark-300 text-gray-400 text-sm rounded-lg border border-dark-300 cursor-not-allowed"
                      />
                    </div>
                   
                  </div>

                  {/* Subject Field */}
                  <div>
                    <label className="block text-xs font-medium text-gray-300 mb-1.5">
                      Subject <span className="text-red-400">*</span>
                    </label>
                    <div className="relative">
                      <FileText
                        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                        size={16}
                      />
                      <input
                        type="text"
                        placeholder="Brief description"
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        maxLength={100}
                        className="w-full pl-9 pr-3 py-2.5 bg-dark-100 text-white text-sm rounded-lg border border-dark-300 focus:border-accent-100 focus:ring-1 focus:ring-accent-100 transition-all outline-none"
                      />
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      {subject.length}/100
                    </p>
                  </div>

                  {/* Message Field */}
                  <div>
                    <label className="block text-xs font-medium text-gray-300 mb-1.5">
                      Message <span className="text-red-400">*</span>
                    </label>
                    <textarea
                      placeholder="Describe your issue..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      maxLength={1000}
                      className="w-full p-3 bg-dark-100 text-white text-sm rounded-lg h-28 resize-none border border-dark-300 focus:border-accent-100 focus:ring-1 focus:ring-accent-100 transition-all outline-none"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      {message.length}/1000
                    </p>
                  </div>

                  {/* Submit Button */}
                  <button
                    onClick={handleSubmit}
                    disabled={isSubmitting || !subject.trim() || !message.trim()}
                    className={`w-full flex items-center justify-center font-semibold py-2.5 rounded-lg transition-all text-sm ${
                      isSubmitting || !subject.trim() || !message.trim()
                        ? "bg-dark-300 text-gray-500 cursor-not-allowed"
                        : "bg-gradient-to-r from-accent-100 to-accent-200 text-dark-100 hover:shadow-lg hover:shadow-accent-100/30"
                    }`}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-dark-100 mr-2" />
                        Submitting...
                      </>
                    ) : (
                      <>
                        <Send className="mr-2" size={16} />
                        Submit Request
                      </>
                    )}
                  </button>

                  {/* Footer Note */}
                  <p className="text-xs text-gray-500 text-center pt-2">
                    We typically respond within 24 hours
                  </p>
                </div>
              </div>
            ) : (
              /* Success State */
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-6 flex flex-col items-center justify-center text-center space-y-3 flex-1"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                  className="w-16 h-16 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center"
                >
                  <CheckCircle className="w-8 h-8 text-white" />
                </motion.div>
                <div>
                  <h3 className="text-lg font-bold text-white mb-1">
                    Request Submitted!
                  </h3>
                  <p className="text-gray-400 text-sm">
                    We'll get back to you soon.
                  </p>
                </div>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default HelpAssistant;