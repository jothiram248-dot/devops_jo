import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";
import { CheckCircle } from "lucide-react";

const PaymentSuccessPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { subscription, orderId } = location.state || {};

  // useEffect(() => {
  //   if (!subscription || !orderId) {
  //     navigate('/');
  //   }
  // }, [subscription, orderId, navigate]);

  // if (!subscription || !orderId) return null;

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
            <CheckCircle className="w-20 h-20 text-accent-100 mx-auto mb-6" />
          </motion.div>

          <h2 className="text-3xl font-bold mb-4 text-white">
            Plan Activated Successfully!
          </h2>

          <p className="text-xl text-gray-300 mb-4">
            Thank you for choosing {subscription.title}
          </p>

          <div className="bg-dark-200 rounded-lg p-4 mb-8">
            <p className="text-sm text-gray-400 mb-2">Order ID</p>
            <p className="text-accent-100">{orderId}</p>
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate("/dashboard")}
            className="w-full py-4 rounded-lg bg-gradient-to-r from-accent-100 to-accent-200 text-dark-100 font-semibold hover:opacity-90 transition-opacity"
          >
            Go to Dashboard
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};

export default PaymentSuccessPage;
