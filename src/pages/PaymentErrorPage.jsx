import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { XCircle } from 'lucide-react';

const PaymentErrorPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-dark-100">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="max-w-md w-full mx-4"
      >
        <div className="glow-box p-8 text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
          >
            <XCircle className="w-20 h-20 text-red-400 mx-auto mb-6" />
          </motion.div>

          <h2 className="text-3xl font-bold mb-4 text-white">
            Payment Failed
          </h2>
          
          <p className="text-xl text-gray-300 mb-8">
            We couldn't process your payment. Please try again.
          </p>

          <div className="space-y-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate(-1)}
              className="w-full py-4 rounded-lg bg-gradient-to-r from-accent-100 to-accent-200 text-dark-100 font-semibold hover:opacity-90 transition-opacity"
            >
              Try Again
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/')}
              className="w-full py-4 rounded-lg border border-accent-100 text-accent-100 font-semibold hover:bg-accent-100/10 transition-colors"
            >
              Back to Home
            </motion.button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default PaymentErrorPage;