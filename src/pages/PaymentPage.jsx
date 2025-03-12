import React from "react";
import { motion } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";
import { ArrowLeft, Check } from "lucide-react";
import useAuthStore from "../store/authStore";
import { useSelector } from "react-redux";

const PaymentPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuthStore();
  const subscription = location.state?.subscription;
  const { loginIdEmail } = useSelector((state) => state.auth);
  // console.log(loginIdEmail);
  // if (!user) {
  //   navigate("/signin", { state: { from: "/payment" } });
  //   return null;
  // }
  // console.log(subscription);

  if (!loginIdEmail) {
    navigate("/signin", { state: { from: "/payment" } });
    return null;
  }

  if (!subscription) {
    navigate("/");
    return null;
  }

  const handleActivate = () => {
    // Since this is a free plan, we'll directly navigate to success
    navigate("/payment/success", {
      state: {
        subscription,
        orderId: "free_" + Math.random().toString(36).substr(2, 9),
      },
    });
  };

  return (
    <div className="pt-24 min-h-screen bg-dark-100">
      <div className="container mx-auto px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mx-auto"
        >
          <button
            onClick={() => navigate(-1)}
            className="flex items-center text-accent-100 hover:text-accent-200 transition-colors mb-8"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back
          </button>

          <div className="glow-box p-8">
            <h2 className="text-3xl font-bold mb-8 bg-gradient-to-r from-accent-100 to-accent-200 bg-clip-text text-transparent">
              Activate Your Free Plan
            </h2>

            <div className="mb-8">
              <h3 className="text-xl font-semibold text-white mb-4">
                Selected Plan: {subscription.title}
              </h3>
              <p className="text-2xl font-bold text-accent-100">
                ₹{subscription.price}/month
              </p>
            </div>

            <div className="space-y-4 mb-8">
              {subscription.features.map((feature, index) => (
                <div key={index} className="flex items-center">
                  <Check className="w-5 h-5 text-accent-100 mr-3" />
                  <span className="text-gray-300">{feature}</span>
                </div>
              ))}
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleActivate}
              className="w-full py-4 rounded-lg bg-gradient-to-r from-accent-100 to-accent-200 text-dark-100 font-semibold hover:opacity-90 transition-opacity"
            >
              Activate Free Plan
            </motion.button>

            <p className="text-center text-sm text-gray-400 mt-4">
              By proceeding, you agree to our terms and conditions
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default PaymentPage;
