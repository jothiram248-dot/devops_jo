import React from "react";
import { motion } from "framer-motion";
import {
  Shield,
  Bell,
  Users,
  Lock,
  Key,
  Database,
  Cloud,
  Server,
} from "lucide-react";
import Footer from "../components/Footer";

const features = [
  {
    title: "Manage Your Credentials",
    icon: Shield,
    description:
      "Securely store and manage all your digital credentials in one place.",
    details: [
      "Centralized storage",
      "Multi-factor authentication",
      "Encrypted data",
      "Easy access anytime",
    ],
    image:
      "https://images.unsplash.com/photo-1633265486064-086b219458ec?auto=format&fit=crop&q=80",
  },
  {
    title: "Smart Notifications",
    icon: Bell,
    description: "Stay informed with intelligent alerts and timely updates.",
    details: [
      "Payment reminders",
      "Security alerts",
      "Subscription tracking",
      "Custom notifications",
    ],
    image:
      "https://images.unsplash.com/photo-1614064641938-3bbee52942c7?auto=format&fit=crop&q=80",
  },
  {
    title: "Choose Your Nominee",
    icon: Users,
    description: "Select and manage trusted nominees for your digital assets.",
    details: [
      "Multiple nominees",
      "Access controls",
      "Secure sharing",
      "Inheritance rules",
    ],
    image:
      "https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&q=80",
  },
];

const securityFeatures = [
  {
    title: "End-to-End Encryption",
    icon: Lock,
    description: "Military-grade encryption for all your data",
  },
  {
    title: "Access Control",
    icon: Key,
    description: "Granular control over data access",
  },
  {
    title: "Secure Storage",
    icon: Database,
    description: "Protected storage with redundancy",
  },
  {
    title: "Cloud Security",
    icon: Cloud,
    description: "Enterprise-level cloud protection",
  },
  {
    title: "Infrastructure",
    icon: Server,
    description: "Robust security infrastructure",
  },
];

const FeaturesPage = () => {
  return (
    <div className="pt-24 min-h-screen bg-dark-100">
      {/* Hero Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-8 bg-gradient-to-r from-accent-100 to-accent-200 bg-clip-text text-transparent">
              Our Features
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Discover how SacredSecret empowers you to manage and protect your
              digital assets
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group relative overflow-hidden rounded-xl glow-box"
              >
                <div className="aspect-video relative overflow-hidden">
                  <img
                    src={feature.image}
                    alt={feature.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-dark-100/90 via-dark-100/50 to-transparent" />
                </div>

                <div className="p-6 relative">
                  <feature.icon className="w-8 h-8 text-accent-100 mb-4" />
                  <h3 className="text-xl font-semibold mb-2 text-white">
                    {feature.title}
                  </h3>
                  <p className="text-gray-300 mb-4">{feature.description}</p>

                  <ul className="space-y-2">
                    {feature.details.map((detail, idx) => (
                      <li key={idx} className="flex items-center text-gray-400">
                        <div className="w-1.5 h-1.5 rounded-full bg-accent-100 mr-2" />
                        {detail}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Security Features */}
      <section className="py-20 bg-dark-200">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-accent-100 to-accent-200 bg-clip-text text-transparent">
              Enterprise-Grade Security
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Your digital assetsis protected by industry-leading security
              measures
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
            {securityFeatures.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="p-6 rounded-xl bg-dark-100 hover:bg-dark-300 transition-colors text-center"
              >
                <feature.icon className="w-8 h-8 text-accent-100 mx-auto mb-4" />
                <h4 className="text-lg font-semibold mb-2 text-white">
                  {feature.title}
                </h4>
                <p className="text-sm text-gray-300">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default FeaturesPage;
