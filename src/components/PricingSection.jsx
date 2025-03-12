import React from "react";
import { motion } from "framer-motion";
import { Check, Star } from "lucide-react";

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
            Begin Your Journey
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Start securing your digital assetstoday with our feature-rich
            starter plan
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-lg mx-auto"
        >
          <div className="relative bg-gradient-to-br from-accent-100/10 to-accent-200/10 rounded-2xl p-1">
            <div className="bg-dark-100 rounded-xl p-8">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 flex items-center space-x-2 bg-gradient-to-r from-accent-100 to-accent-200 rounded-full px-4 py-2">
                <Star className="w-4 h-4 text-dark-100" />
                <span className="text-sm font-semibold text-dark-100">
                  STARTER PLAN
                </span>
              </div>

              <div className="text-center mb-8 pt-4">
                <h3 className="text-3xl font-bold text-white mb-2">
                  Start Your assets
                </h3>
                <div className="flex justify-center items-baseline mb-4">
                  <span className="text-5xl font-bold bg-gradient-to-r from-accent-100 to-accent-200 bg-clip-text text-transparent">
                    Free
                  </span>
                  <span className="text-xl text-gray-300 ml-2">forever</span>
                </div>
                <p className="text-gray-300">No credit card required</p>
              </div>

              <div className="space-y-4 mb-8">
                {[
                  "Secure credential storage",
                  "Multi-factor authentication",
                  "Mobile access",
                  "Basic encryption",
                  "Email support",
                  "Regular security updates",
                ].map((feature, index) => (
                  <div key={index} className="flex items-center">
                    <div className="flex-shrink-0 w-5 h-5 rounded-full bg-gradient-to-r from-accent-100 to-accent-200 flex items-center justify-center">
                      <Check className="w-3 h-3 text-dark-100" />
                    </div>
                    <span className="ml-3 text-gray-300">{feature}</span>
                  </div>
                ))}
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-4 rounded-lg bg-gradient-to-r from-accent-100 to-accent-200 text-dark-100 font-semibold hover:opacity-90 transition-all"
              >
                Get Started Now
              </motion.button>

              <p className="text-center text-sm text-gray-400 mt-4">
                Upgrade anytime to access premium features
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default PricingSection;
