import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, X } from 'lucide-react';

const CountdownModal = ({ isOpen, secondsLeft, onStayLoggedIn, countdownDuration = 60 }) => {
  const redThreshold = Math.max(5, Math.floor(countdownDuration / 6));
  const isWarning = secondsLeft <= redThreshold;
  
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[9999]"
            onClick={onStayLoggedIn}
          />

          {/* Modal */}
          <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.15 }}
              className="w-full max-w-sm pointer-events-auto"
            >
              <div className="bg-dark-200 rounded-lg border border-dark-300 shadow-xl overflow-hidden">
                {/* Header */}
                <div className="flex items-center justify-between px-5 py-4 border-b border-dark-300">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                      isWarning ? 'bg-red-500/20' : 'bg-accent-100/20'
                    }`}>
                      <Clock className={`w-5 h-5 ${
                        isWarning ? 'text-red-500' : 'text-accent-100'
                      }`} />
                    </div>
                    <div>
                      <h3 className="text-base font-semibold text-white">
                        Session Timeout
                      </h3>
                      <p className="text-xs text-gray-500">
                        Action required
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={onStayLoggedIn}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {/* Content */}
                <div className="px-5 py-6">
                  <p className="text-sm text-gray-400 mb-4 text-center">
                    Your session will expire in
                  </p>

                  {/* Countdown */}
                  <div className="flex items-center justify-center gap-3 mb-5">
                    <motion.div
                      key={secondsLeft}
                      initial={{ scale: 1.1 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.2 }}
                      className={`text-5xl font-bold ${
                        isWarning ? 'text-red-500' : 'text-white'
                      }`}
                    >
                      {secondsLeft}
                    </motion.div>
                    <span className="text-gray-500 text-sm">sec</span>
                  </div>

                  {/* Progress Bar */}
                  <div className="mb-5">
                    <div className="h-1 bg-dark-300 rounded-full overflow-hidden">
                      <motion.div
                        className={`h-full ${
                          isWarning ? 'bg-red-500' : 'bg-accent-100'
                        }`}
                        animate={{ width: `${(secondsLeft / countdownDuration) * 100}%` }}
                        transition={{ duration: 1, ease: "linear" }}
                      />
                    </div>
                  </div>

                  {/* Button */}
                  <button
                    onClick={onStayLoggedIn}
                    className={`w-full py-2.5 rounded-lg font-medium text-white text-sm transition-opacity hover:opacity-90 ${
                      isWarning
                        ? 'bg-red-500'
                        : 'bg-gradient-to-r from-accent-100 to-accent-200'
                    }`}
                  >
                    Continue Session
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CountdownModal;