import React, { useState, useRef, useCallback } from "react";
import { motion, useScroll, useTransform, useAnimation } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Check } from "lucide-react";
import { useSelector } from "react-redux";
import FAQ from "../components/FAQ";
import CredentialTypes from "../components/CredentialTypes";
import SecurityFeatures from "../components/SecurityFeatures";
import Footer from "../components/Footer";
import VideoPlayer from "../components/VideoPlayer";

const faqs = [
  {
    question: "What types of credentials can I store?",
    answer:
      "You can store various types of credentials, including banking, investment, entertainment platforms, social media, gaming, and other platform credentials such as job portals, eCommerce, workplace accounts, etc.",
  },
  {
    question: "How secure is my data?",
    answer:
      "We use military-grade encryption and advanced security measures to protect your data. All credentials are encrypted both in transit and at rest, ensuring maximum security.",
  },
  {
    question: "Can I access my credentials from multiple devices?",
    answer:
      "Yes, you can securely access your credentials from any device through our web interface. Multi-factor authentication ensures that only you can access your account.",
  },
  {
    question: "How do I share credentials with nominees?",
    answer:
      "You can designate trusted nominees and set specific access rules. Nominees will only gain access based on your predetermined conditions and verification process.",
  },
  {
    question: "What happens if I forget my master password?",
    answer:
      "We have a secure recovery process that verifies your identity through multiple factors. Your data remains safe while you regain access to your account.",
  },
];



const ManageCredentialsPage = () => {
  const navigate = useNavigate();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const videoRef = useRef(null);
  const { scrollY } = useScroll();
  const handleGoToDown = useCallback(() => {
    const goToStartForFree = document.getElementById("gotostartforfree");
    if (goToStartForFree) {
      goToStartForFree.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  // Replace this function
  const handleGetStarted = () => {
    if (!isAuthenticated) {
      // not logged in → send to signin, then come back to dashboard
      navigate("/signin", { state: { from: "/dashboard" } });
      return;
    }
    // logged in → go straight to dashboard
    navigate("/dashboard");
  };

  const y = useTransform(scrollY, [0, 300], [0, 100]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);
  return (
    <div className="min-h-screen bg-dark-100 ">
      {/* Hero Section */}
      <section
        ref={videoRef}
        className="relative overflow-hidden"
        id="manage-credentials-hero"
      >
        {/* Full viewport container */}
        <div className="hero-viewport">
          {/* Background Base Layer */}
          <div className="absolute inset-0 bg-[#050816]"></div>

          {/* Parallax Animated Background */}
          <motion.div
            style={{ y, opacity }}
            className="absolute inset-0 w-full h-full"
          >
            {/* Dynamic Multi-Layer Gradient Overlays */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#050816]/90 via-[#050816]/60 to-[#050816]/90 mix-blend-overlay"></div>
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-600/10 via-transparent to-transparent opacity-80 mix-blend-screen"></div>
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-purple-600/10 via-transparent to-transparent opacity-80 mix-blend-color-dodge"></div>

            {/* Grid Elements */}
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBzdHJva2U9IiM0MzM4REQiIHN0cm9rZS13aWR0aD0iMC41IiBzdHJva2Utb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMCAwIEw2MCA2MCIvPjxwYXRoIGQ9Ik02MCAwIEwwIDYwIi8+PHBhdGggZD0iTTMwIDAgTDMwIDYwIi8+PHBhdGggZD0iTTAgMzAgTDYwIDMwIi8+PC9nPjwvc3ZnPg==')] opacity-10 animate-pulse-slow"></div>
          </motion.div>

          {/* Interactive Animated Elements */}
          <div className="absolute inset-0 overflow-hidden">
            {/* 3D Particle System with Movement Tracking */}
            <div className="particles-3d-container absolute inset-0 opacity-40 pointer-events-none"></div>

            {/* Neon Data Streams with Reactive Animation */}
            <div className="absolute inset-0 data-streams opacity-15">
              {[...Array(8)].map((_, i) => (
                <div
                  key={`hline-${i}`}
                  className="absolute h-px left-0 right-0 bg-gradient-to-r from-transparent via-blue-500 to-transparent data-line neon-glow"
                  style={{ top: `${(i + 1) * 11}%` }}
                ></div>
              ))}
              {[...Array(8)].map((_, i) => (
                <div
                  key={`vline-${i}`}
                  className="absolute w-px top-0 bottom-0 bg-gradient-to-b from-transparent via-purple-600 to-transparent data-line neon-glow"
                  style={{ left: `${(i + 1) * 11}%` }}
                ></div>
              ))}
            </div>

          </div>

          {/* Content Container - Centered with top spacing for navbar */}
          <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col justify-center pt-16 md:pt-20 lg:pt-24">
            <div className="w-full max-w-7xl mx-auto">
              {/* Compact Header Section */}
              <div className="text-center w-full mb-6 lg:mb-8">
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-3 leading-tight enterprise-heading">
                  Manage{" "}
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
                    Credentials
                  </span>
                </h1>

                <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold text-gray-200 mb-3">
                  with{" "}
                  <span className="font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-300 to-blue-500">
                    SacredSecret
                  </span>
                </h2>

                <div className="w-16 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full"></div>
              </div>

              {/* Two-Column Compact Layout */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-center">
                {/* Left Column: Text Content - Increased text size */}
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="relative p-4 lg:p-6 flex flex-col justify-center z-10"
                  whileHover={{ scale: 1.01, transition: { duration: 0.3 } }}
                >
                  {/* Text Content - Increased size */}
                  <p className="text-base md:text-lg lg:text-xl xl:text-2xl text-gray-100 leading-relaxed dynamic-text">
                    Store all your credentials in{" "}
                    <span className="highlight-text">
                      one centralized location
                    </span>{" "}
                    for easy access, eliminating the need to memorize them. This
                    provides users with{" "}
                    <span className="highlight-text">peace of mind</span>{" "}
                    regarding where to store countless credentials, making it
                    easy to access these details anytime and anywhere, while
                    ensuring <span className="highlight-text">security</span> as
                    a top priority.
                  </p>

                  {/* CTA Button - Compact */}
                  <div className="mt-4 lg:mt-5 flex justify-start">
                    <motion.button
                      whileHover={{
                        scale: 1.03,
                        boxShadow: "0 0 20px rgba(176, 132, 199, 0.3)",
                      }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleGoToDown}
                      className="px-6 py-2.5 lg:px-8 lg:py-3 text-sm md:text-base font-semibold rounded-full bg-gradient-to-r from-indigo-100 via-cyan-100 to-purple-100 text-gray-800 transition-all shadow-lg border border-white/30 relative overflow-hidden group neo-button"
                    >
                      {/* Light Effect */}
                      <div className="absolute inset-0 bg-gradient-to-r from-indigo-200/0 via-white/60 to-indigo-200/0 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                      <span className="relative z-10 flex items-center font-bold">
                        Start For Free{" "}
                        <span className="ml-2 arrow-icon">→</span>
                      </span>
                    </motion.button>
                  </div>
                </motion.div>

                {/* Right Column: Video - Compact */}
                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="relative flex justify-center items-center"
                >
                  {/* Video Container - Compact */}
                  <div className="w-full max-w-2xl mx-auto">
                    <div className="relative rounded-xl overflow-hidden shadow-2xl group border border-white/20 video-frame">
                      {/* Corner Accents - Smaller */}
                      <div className="absolute top-0 left-0 w-10 h-10 border-t-2 border-l-2 border-blue-400/70 rounded-tl-xl z-20"></div>
                      <div className="absolute bottom-0 right-0 w-10 h-10 border-b-2 border-r-2 border-purple-500/70 rounded-br-xl z-20"></div>

                      {/* Video Player */}
                      <div
                        className="relative z-10"
                        style={{ aspectRatio: "16/9" }}
                      >
                        <VideoPlayer
                          videoUrl="https://www.youtube.com/watch?v=ziQqSngFjxY"
                          title="Manage Credentials"
                        />

                        {/* Video Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-black/10 pointer-events-none z-10">
                          {/* Scan Lines */}
                          <div className="absolute inset-0 scan-lines-subtle"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>

        {/* Custom Styles */}
        <style jsx>{`
          .hero-viewport {
            position: relative;
            height: 100svh;
            height: 100dvh;
            min-height: 100vh;
            display: flex;
            align-items: center;
          }

          /* Enterprise-grade heading */}
          .enterprise-heading {
            letter-spacing: -0.02em;
            line-height: 1.1;
            font-weight: 800;
            text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
          }

          /* Button Styling */}
          .neo-button {
            transition: all 0.4s ease;
          }

          .neo-button:hover .arrow-icon {
            transform: translateX(5px);
            transition: transform 0.3s ease;
          }

          .neo-button:before {
            content: "";
            position: absolute;
            inset: -2px;
            border-radius: 999px;
            padding: 2px;
            background: linear-gradient(90deg, #38bdf8, #818cf8, #c084fc);
            -webkit-mask: linear-gradient(#fff 0 0) content-box,
              linear-gradient(#fff 0 0);
            -webkit-mask-composite: xor;
            mask-composite: exclude;
            opacity: 0;
            transition: opacity 0.4s ease;
          }

          .neo-button:hover:before {
            opacity: 1;
          }

          /* Text Highlighting */}
          .dynamic-text {
            letter-spacing: 0.01em;
          }

          .highlight-text {
            position: relative;
            color: #38bdf8;
            font-weight: 600;
          }

          .highlight-text:after {
            content: "";
            position: absolute;
            bottom: 0;
            left: 0;
            width: 100%;
            height: 30%;
            background: linear-gradient(90deg, #38bdf8, #818cf8);
            opacity: 0.15;
            border-radius: 4px;
            z-index: -1;
          }

          /* Video Frame */}
          .video-frame {
            transition: transform 0.3s ease-out;
            position: relative;
            background: rgba(8, 8, 30, 0.4);
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
          }

          .video-frame:after {
            content: "";
            position: absolute;
            inset: 0;
            background: linear-gradient(
              120deg,
              rgba(255, 255, 255, 0) 0%,
              rgba(255, 255, 255, 0.03) 25%,
              rgba(255, 255, 255, 0.05) 50%,
              rgba(255, 255, 255, 0.03) 75%,
              rgba(255, 255, 255, 0) 100%
            );
            opacity: 0.3;
          }

          /* Scan Lines */}
          .scan-lines-subtle {
            background-image: repeating-linear-gradient(
              0deg,
              rgba(56, 189, 248, 0.04),
              rgba(56, 189, 248, 0.04) 1px,
              transparent 1px,
              transparent 2px
            );
            background-size: 100% 4px;
            animation: scan-animation-premium 10s linear infinite;
          }

          /* Neon Glow */}
          .neon-glow {
            box-shadow: 0 0 5px rgba(56, 189, 248, 0.7),
              0 0 10px rgba(56, 189, 248, 0.5);
          }

          /* Holographic Edge */}
          .holographic-edge {
            border-image: linear-gradient(
                to right,
                #38bdf8,
                #818cf8,
                #c084fc,
                #38bdf8
              )
              1;
            border-image-slice: 1;
          }

          /* Data Spark Animation */}
          .data-spark {
            position: absolute;
            width: 4px;
            height: 4px;
            background: white;
            border-radius: 50%;
            box-shadow: 0 0 10px #38bdf8, 0 0 20px #38bdf8;
            animation: spark-travel 3s infinite linear;
          }

          /* Particle System colors */}
          .particle-blue {
            background: #38bdf8;
            box-shadow: 0 0 10px #38bdf8;
          }

          .particle-cyan {
            background: #22d3ee;
            box-shadow: 0 0 10px #22d3ee;
          }

          .particle-purple {
            background: #a855f7;
            box-shadow: 0 0 10px #a855f7;
          }

          /* Animations */}
          @keyframes float-particle-3d {
            0% {
              transform: translate(0, 0) translateZ(var(--z, 0));
              opacity: 0;
            }
            10% {
              opacity: 0.7;
            }
            90% {
              opacity: 0.7;
            }
            100% {
              transform: translate(
                  calc(var(--x, 50) * 1px),
                  calc(var(--y, -500) * 1px)
                )
                translateZ(var(--z, 0));
              opacity: 0;
            }
          }

          @keyframes spark-travel {
            0% {
              left: 0;
              opacity: 0;
            }
            20% {
              opacity: 1;
            }
            80% {
              opacity: 1;
            }
            100% {
              left: 100%;
              opacity: 0;
            }
          }

          @keyframes data-stream-pulse {
            0%,
            100% {
              opacity: 0.1;
              filter: blur(0px);
            }
            50% {
              opacity: 0.3;
              filter: blur(1px);
            }
          }

          @keyframes scan-animation-premium {
            0% {
              background-position: 0 0;
            }
            100% {
              background-position: 0 100%;
            }
          }

          .animate-pulse-slow {
            animation: pulse-slow 5s ease-in-out infinite;
          }

          @keyframes pulse-slow {
            0%,
            100% {
              opacity: 1;
            }
            50% {
              opacity: 0.7;
            }
          }

          /* Spin Animations */}
          .animate-spin-very-slow {
            animation: spin 120s linear infinite;
          }

          .animate-spin-moderate {
            animation: spin 60s linear infinite;
          }

          .animate-spin-slow-reverse {
            animation: spin 80s linear infinite reverse;
          }

          @keyframes spin {
            from {
              transform: translate(-50%, -50%) rotate(0deg);
            }
            to {
              transform: translate(-50%, -50%) rotate(360deg);
            }
          }

          /* Responsive */}
          @media (max-width: 768px) {
            .enterprise-heading {
              font-size: clamp(1.75rem, 6vw, 3rem);
            }
          }
        `}</style>
      </section>

     

      {/* Credential Types Section */}
      <CredentialTypes />

      {/* Security Features Section */}
      {/* <SecurityFeatures /> */}

      {/* Subscription Section */}
      <section className="py-20 relative overflow-hidden">
        {/* background with multiple gradient effects */}
        <div className="absolute inset-0 bg-gradient-to-b from-dark-900 via-dark-800 to-dark-900">
          {/* Radial gradient overlays */}
          <div
            className="absolute inset-0 opacity-70"
            style={{
              background:
                "radial-gradient(circle at 20% 30%, rgba(136, 58, 234, 0.15) 0%, transparent 50%), radial-gradient(circle at 80% 70%, rgba(58, 136, 234, 0.15) 0%, transparent 50%)",
            }}
          ></div>

          {/* Subtle grid pattern */}
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px), linear-gradient(to right, rgba(255, 255, 255, 0.05) 1px, transparent 1px)",
              backgroundSize: "40px 40px",
            }}
          ></div>

          {/* Animated particles */}
          <div className="absolute inset-0 overflow-hidden">
            {[...Array(15)].map((_, i) => (
              <div
                key={i}
                className="absolute rounded-full bg-white/5"
                style={{
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                  width: `${Math.random() * 4 + 1}px`,
                  height: `${Math.random() * 4 + 1}px`,
                  boxShadow: "0 0 10px rgba(255, 255, 255, 0.3)",
                  animation: `float-${i % 3} ${
                    Math.random() * 20 + 10
                  }s infinite ease-in-out`,
                }}
              ></div>
            ))}
          </div>
        </div>

        <div className="container mx-auto max-w-screen-xl px-6 relative z-10">
          {/* Header Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2
              className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-accent-100 to-accent-200 bg-clip-text text-transparent"
              id="gotostartforfree"
            >
              Start For Free
            </h2>
            <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Start securing your digital credentials with our feature-rich free
              plan.
            </p>
          </motion.div>

          {/* Light-Themed Pricing Card with Prominent Glow */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-lg mx-auto relative"
          >
            {/* Prominent outer glow effect */}
            <div className="absolute -inset-3 bg-gradient-to-r from-accent-100/30 via-accent-200/20 to-accent-100/30 rounded-2xl blur-lg"></div>

            {/* Card main container */}
            <div
              className="relative rounded-xl overflow-hidden border border-white/30 shadow-2xl"
              style={{
                boxShadow:
                  "0 0 30px rgba(136, 58, 234, 0.3), 0 0 10px rgba(255, 255, 255, 0.2)",
              }}
            >
              {/* Card background */}
              <div className="absolute inset-0 bg-white"></div>

              {/* Glowing border */}
              <div className="absolute inset-0 rounded-xl overflow-hidden">
                <div className="absolute inset-0 border-4 border-accent-100/20 rounded-xl"></div>
                <div className="absolute top-0 right-0 bottom-0 left-0 border border-white/50 rounded-xl"></div>
              </div>

              {/* Prominent Badge - Positioned higher to be fully visible */}
              <div className="absolute top-0 left-0 right-0 flex justify-center">
                <div className="px-6 py-2 bg-gradient-to-r from-accent-100 to-accent-200 text-white font-bold rounded-b-lg shadow-lg transform translate-y-0">
                  FREE FOREVER
                </div>
              </div>

              {/* Card content with proper padding for badge */}
              <div className="relative p-8 pt-10 z-10">
                {/* Price Display */}
                <div className="text-center mb-6 mt-2">
                  <div className="flex justify-center items-baseline mb-3">
                    <span className="text-5xl font-extrabold bg-gradient-to-r from-accent-100 to-accent-200 bg-clip-text text-transparent">
                      ₹0
                    </span>
                    <span className="text-xl text-gray-500 ml-2">/month</span>
                  </div>
                  <p className="text-gray-600 text-lg">
                    Everything you need to get started.
                  </p>
                </div>

                {/* Separator */}
                <div className="w-full h-px bg-accent-100/20 my-6"></div>

                {/* Features List */}
                <div className="space-y-3 mb-8">
                  {[
                    "Store unlimited credentials",
                    "Secure encryption",
                    "Multi-factor authentication",
                    "Mobile access",
                    "Email support",
                    "Regular security updates",
                  ].map((feature, index) => (
                    <div key={index} className="flex items-center py-2">
                      <div className="flex-shrink-0 w-6 h-6 rounded-full bg-accent-100/10 flex items-center justify-center mr-3">
                        <Check className="w-4 h-4 text-accent-100" />
                      </div>
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>

                {/* CTA Button with prominent glow */}
                <div className="relative">
                  {/* Button glow effect */}
                  <div className="absolute -inset-1 bg-accent-100/40 rounded-lg blur-md"></div>

                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleGetStarted}
                    className="relative w-full py-3.5 rounded-lg bg-gradient-to-r from-accent-100 to-accent-200 text-white font-bold text-lg shadow-lg"
                  >
                    Get Started Now
                  </motion.button>
                </div>

                {/* Trust badge */}
                <div className="mt-5 text-center">
                  <span className="inline-flex items-center text-xs text-gray-500">
                    <svg
                      className="w-4 h-4 mr-1.5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                      />
                    </svg>
                    Secure & encrypted, no credit card required
                  </span>
                </div>
              </div>

              {/* Bottom glow effect */}
              <div className="absolute bottom-0 left-0 right-0 h-10 bg-gradient-to-t from-accent-100/5 to-transparent"></div>
            </div>
          </motion.div>
        </div>

        {/* Custom animations */}
        <style jsx>{`
          @keyframes float-0 {
            0%,
            100% {
              transform: translateY(0) translateX(0);
            }
            50% {
              transform: translateY(-30px) translateX(15px);
            }
          }
          @keyframes float-1 {
            0%,
            100% {
              transform: translateY(0) translateX(0);
            }
            50% {
              transform: translateY(20px) translateX(-20px);
            }
          }
          @keyframes float-2 {
            0%,
            100% {
              transform: translateY(0) translateX(0);
            }
            50% {
              transform: translateY(-15px) translateX(-25px);
            }
          }
        `}</style>
      </section>

      {/* FAQ Section */}
      <FAQ faqs={faqs} />

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default ManageCredentialsPage;
