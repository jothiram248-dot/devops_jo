import React from "react";
import { motion } from "framer-motion";
import { Check } from "lucide-react";

const PricingSection = () => {
  return (
    <section className="py-20 bg-dark-200">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-accent-100 to-accent-200 bg-clip-text text-transparent">
            Start For Free
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Begin securing your digital assets with our feature-rich free plan
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-lg mx-auto"
        >
          <div className="relative p-8 rounded-xl glow-box bg-dark-100">
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
              <span className="px-4 py-2 rounded-full bg-accent-100 text-dark-100 font-semibold text-sm">
                SPECIAL OFFER
              </span>
            </div>

            <div className="text-center mb-8">
              <h3 className="text-3xl font-bold text-white mb-2">
                Free Forever
              </h3>
              <div className="flex justify-center items-baseline mb-4">
                <span className="text-5xl font-bold text-accent-100">₹0</span>
                <span className="text-xl text-gray-300 ml-2">/month</span>
              </div>
              <p className="text-gray-300">
                We're excited to offer this plan at no cost!
              </p>
            </div>

            <div className="space-y-4 mb-8">
              {[
                "Store unlimited credentials",
                "Secure encryption",
                "Multi-factor authentication",
                "Mobile access",
                "Email support",
                "Regular security updates",
              ].map((feature, index) => (
                <div key={index} className="flex items-center">
                  <Check className="w-5 h-5 text-accent-100 mr-3 flex-shrink-0" />
                  <span className="text-gray-300">{feature}</span>
                </div>
              ))}
            </div>

            <div className="text-center">
              <p className="text-accent-100 font-semibold">
                Experience the future of digital assetsmanagement!
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default PricingSection;
