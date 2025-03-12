import React from "react";
import { motion } from "framer-motion";
import { Shield, Bell, Users, ChevronRight } from "lucide-react";
import useAuthStore from "../store/authStore";
import Footer from "../components/Footer";

const subscriptionTypes = {
  credentials: {
    id: "credentials",
    title: "Manage Your Credentials",
    icon: Shield,
    description:
      "Securely store and manage all your digital credentials in one place.",
    features: [
      "Unlimited credential storage",
      "Advanced encryption",
      "Secure sharing",
      "Access logs",
      "Multi-device sync",
    ],
    price: "$9.99/month",
  },
  notifications: {
    id: "notifications",
    title: "Smart Notifications",
    icon: Bell,
    description: "Stay informed with intelligent alerts and timely updates.",
    features: [
      "Real-time alerts",
      "Custom notification rules",
      "Priority alerts",
      "Activity reports",
      "Email digests",
    ],
    price: "$4.99/month",
  },
  nominee: {
    id: "nominee",
    title: "Choose Your Nominee",
    icon: Users,
    description: "Select and manage trusted nominees for your digital assets.",
    features: [
      "Multiple nominees",
      "Access controls",
      "Inheritance rules",
      "Verification system",
      "Document sharing",
    ],
    price: "$7.99/month",
  },
};

const SubscriptionCard = ({ type, isActive, onUpgrade }) => {
  const { icon: Icon, title, description, features, price } = type;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className={`glow-box p-6 ${isActive ? "border-2 border-accent-100" : ""}`}
    >
      <div className="flex items-center space-x-4 mb-4">
        <Icon className="w-8 h-8 text-accent-100" />
        <div>
          <h3 className="text-xl font-semibold text-white">{title}</h3>
          {isActive && (
            <span className="text-sm text-accent-100">Active Subscription</span>
          )}
        </div>
      </div>

      <p className="text-gray-300 mb-4">{description}</p>

      <ul className="space-y-2 mb-6">
        {features.map((feature, index) => (
          <li key={index} className="flex items-center text-gray-300">
            <ChevronRight className="w-4 h-4 text-accent-100 mr-2" />
            {feature}
          </li>
        ))}
      </ul>

      <div className="flex items-center justify-between">
        <span className="text-2xl font-bold text-white">{price}</span>
        {!isActive && (
          <button
            onClick={() => onUpgrade(type.id)}
            className="px-4 py-2 rounded-lg bg-gradient-to-r from-accent-100 to-accent-200 text-dark-100 font-semibold hover:opacity-90 transition-opacity"
          >
            Upgrade Now
          </button>
        )}
      </div>
    </motion.div>
  );
};

const SubscriptionPage = () => {
  const { user } = useAuthStore();
  const activeSubscriptions = user?.subscriptions || ["credentials"]; // Default or mock data

  const handleUpgrade = (subscriptionId) => {
    // Handle subscription upgrade logic
    console.log("Upgrading to:", subscriptionId);
  };

  return (
    <div className="pt-24 min-h-screen bg-dark-100">
      <div className="container mx-auto px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-6xl mx-auto"
        >
          <h1 className="text-4xl font-bold mb-8 bg-gradient-to-r from-accent-100 to-accent-200 bg-clip-text text-transparent">
            My Subscriptions
          </h1>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Object.values(subscriptionTypes).map((type) => (
              <SubscriptionCard
                key={type.id}
                type={type}
                isActive={activeSubscriptions.includes(type.id)}
                onUpgrade={handleUpgrade}
              />
            ))}
          </div>

          <div className="mt-12 p-6 glow-box">
            <h2 className="text-2xl font-bold mb-4 text-white">
              Subscription Overview
            </h2>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-300">Active Subscriptions:</span>
                <span className="text-white font-semibold">
                  {activeSubscriptions.length}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-300">Total Monthly Cost:</span>
                <span className="text-white font-semibold">
                  $
                  {activeSubscriptions
                    .reduce((total, subId) => {
                      const price = parseFloat(
                        subscriptionTypes[subId].price.replace("$", "")
                      );
                      return total + price;
                    }, 0)
                    .toFixed(2)}
                  /month
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-300">Next Billing Date:</span>
                <span className="text-white font-semibold">
                  {new Date(
                    Date.now() + 30 * 24 * 60 * 60 * 1000
                  ).toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
      <Footer />
    </div>
  );
};

export default SubscriptionPage;
