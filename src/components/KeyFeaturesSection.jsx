import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  Shield,
  Key,
  Lock,
  FileCheck,
  Cloud,
  Database,
  Server,
} from "lucide-react";

const bigFeatures = [
  {
    title: "Advanced Encryption",
    description: "Military-grade encryption to protect all your sensitive data",
    icon: Shield,
    image: "/assets/pattern/featuresPattern.jpg",
  },
  {
    title: "Biometric Authentication",
    description: "Multi-factor authentication with biometric security features",
    icon: Lock,
    image: "/assets/pattern/featuresPattern.jpg",
  },
  {
    title: "Smart Contracts",
    description: "Automated and secure asset transfer protocols in place",
    icon: FileCheck,
    image: "/assets/pattern/featuresPattern.jpg",
  },
];

const smallFeatures = [
  {
    title: "Cloud Backup",
    description: "Redundant backup systems",
    icon: Cloud,
    image: "/assets/Images/cloud-backup.jpg",
  },
  {
    title: "Data Recovery",
    description: "Advanced recovery options",
    icon: Database,
    image: "/assets/Images/data_recovery.jpg",
  },
  {
    title: "API Security",
    description: "Secure API endpoints",
    icon: Server,
    image: "/assets/Images/API_security.jpg",
  },
  {
    title: "Access Control",
    description: "Granular permissions",
    icon: Key,
    image: "/assets/Images/Access_Contrl.jpg",
  },
];

const KeyFeaturesSection = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <>
      <div className="relative w-full h-0.5 bg-gradient-to-r from-transparent via-violet-500 to-transparent">
        <div className="absolute inset-0 blur-sm bg-gradient-to-r from-transparent via-violet-400 to-transparent opacity-70"></div>
      </div>

      <section
        className="relative py-16 bg-gradient-to-b from-gray-950 to-black"
        id="key-features"
      >
        {/* background effects */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(79,70,229,0.2),transparent_70%),radial-gradient(ellipse_at_bottom_left,_rgba(124,58,237,0.2),transparent_70%)]"></div>

        {/* ambient blurs */}
        <div className="absolute top-1/4 right-1/6 w-80 h-80 bg-indigo-600/20 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-1/4 left-1/6 w-96 h-96 bg-purple-600/20 rounded-full filter blur-3xl"></div>

        {/* floating particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1.5 h-1.5 rounded-full bg-accent-100/40 animate-float"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${15 + Math.random() * 15}s`,
              }}
            />
          ))}
        </div>
        {/* Subtle mesh grid overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:48px_48px] opacity-5"></div>

        {/* glow spots */}
        <div className="absolute top-1/4 right-1/6 w-64 h-64 rounded-full bg-purple-600/10 blur-3xl"></div>
        <div className="absolute bottom-1/3 left-1/5 w-96 h-96 rounded-full bg-indigo-600/10 blur-3xl"></div>
        <div className="absolute top-1/3 left-2/3 w-72 h-72 rounded-full bg-violet-600/10 blur-3xl"></div>

        <div className="container mx-auto px-6 relative z-10">
          {/* Section Header */}
          <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-20"
          >
            <div className="flex justify-center mb-4">
              <div className="h-px w-16 bg-gradient-to-r from-indigo-500 to-purple-500"></div>
            </div>
            <h2 className="text-4xl md:text-5xl py-1 font-bold mb-6 bg-gradient-to-r from-indigo-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent">
              Key Features
            </h2>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto">
              Experience unmatched security and control with our advanced set of
              features.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {bigFeatures.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="relative h-64 overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-[1.02] cursor-pointer group bg-white"
              >
                {/* Add shine animation keyframes */}
                <style jsx>{`
                  @keyframes shine {
                    0% {
                      left: -100%;
                    }
                    100% {
                      left: 200%;
                    }
                  }
                  .animate-shine {
                    animation: shine 2s infinite linear;
                  }
                `}</style>
                {/* Base clean background */}
                <div className="absolute inset-0">
                  <div
                    className={`absolute inset-0 bg-gradient-to-br 
              ${index === 0 ? "from-green-50 to-white" : ""}
              ${index === 1 ? "from-blue-50 to-white" : ""}
              ${index === 2 ? "from-purple-50 to-white" : ""}
            `}
                  ></div>

                  {/* Subtle dot pattern overlay */}
                  <div className="absolute inset-0 opacity-10 group-hover:opacity-15 transition-all duration-500">
                    <svg
                      width="100%"
                      height="100%"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <defs>
                        <pattern
                          id={`premium-dots-${index}`}
                          width="20"
                          height="20"
                          patternUnits="userSpaceOnUse"
                        >
                          <circle
                            cx="10"
                            cy="10"
                            r="1"
                            fill={
                              index === 0
                                ? "#22C55E"
                                : index === 1
                                ? "#3B82F6"
                                : "#8B5CF6"
                            }
                          />
                        </pattern>
                      </defs>
                      <rect
                        width="100%"
                        height="100%"
                        fill={`url(#premium-dots-${index})`}
                      />
                    </svg>
                  </div>
                </div>

                {/* 
          content background overlay - behind content */}
                <div
                  className={`absolute bottom-0 left-0 right-0 h-36 opacity-10
            ${
              index === 0
                ? "bg-gradient-to-t from-green-300 via-green-200 to-transparent"
                : ""
            }
            ${
              index === 1
                ? "bg-gradient-to-t from-blue-300 via-blue-200 to-transparent"
                : ""
            }
            ${
              index === 2
                ? "bg-gradient-to-t from-purple-300 via-purple-200 to-transparent"
                : ""
            }
          `}
                ></div>

                {/* Diagonal premium accent */}
                <div
                  className={`absolute top-0 right-0 w-full h-full opacity-5 transform rotate-[-15deg] translate-x-1/3 -translate-y-1/4
            ${index === 0 ? "bg-green-400" : ""}
            ${index === 1 ? "bg-blue-400" : ""}
            ${index === 2 ? "bg-purple-400" : ""}
            rounded-full
          `}
                ></div>

                {/* Elegant accent border */}
                <div
                  className={`absolute top-0 left-0 w-full h-1
            ${index === 0 ? "bg-green-400" : ""}
            ${index === 1 ? "bg-blue-400" : ""}
            ${index === 2 ? "bg-purple-400" : ""}
          `}
                ></div>

                {/* icon container with white background and shiny icon */}
                <div
                  className={`absolute top-4 left-4 group-hover:left-5 transition-all duration-500
            bg-white border
            ${index === 0 ? "border-green-200" : ""}
            ${index === 1 ? "border-blue-200" : ""}
            ${index === 2 ? "border-purple-200" : ""}
            p-3 rounded-2xl shadow-lg`}
                >
                  <div
                    className={`
              relative overflow-hidden
              ${
                index === 0
                  ? "bg-gradient-to-br from-green-400 to-green-600"
                  : ""
              }
              ${
                index === 1 ? "bg-gradient-to-br from-blue-400 to-blue-600" : ""
              }
              ${
                index === 2
                  ? "bg-gradient-to-br from-purple-400 to-purple-600"
                  : ""
              }
              rounded-xl p-3 shadow-inner`}
                  >
                    {/* Shiny effect overlay */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-1000">
                      <div className="absolute -inset-[100%] animate-shine bg-white/30 rotate-[25deg] transform-gpu"></div>
                    </div>
                    {React.createElement(feature.icon, {
                      className:
                        "w-6 h-6 text-white drop-shadow-lg relative z-10",
                    })}
                  </div>
                </div>

                {/* Subtle corner accent */}
                <div
                  className={`absolute top-0 right-0 w-20 h-20 opacity-60
            ${
              index === 0
                ? "bg-gradient-to-bl from-green-200 to-transparent"
                : ""
            }
            ${
              index === 1
                ? "bg-gradient-to-bl from-blue-200 to-transparent"
                : ""
            }
            ${
              index === 2
                ? "bg-gradient-to-bl from-purple-200 to-transparent"
                : ""
            }
            rounded-bl-full`}
                />

                {/* content area */}
                <div className="absolute inset-x-0 bottom-0 px-6 py-6 backdrop-blur-[1px]">
                  {/* Title with animated underline */}
                  <div className="relative mb-2">
                    <h3
                      className={`text-xl font-semibold mb-1
                ${index === 0 ? "text-gray-800" : ""}
                ${index === 1 ? "text-gray-800" : ""}
                ${index === 2 ? "text-gray-800" : ""}
              `}
                    >
                      {feature.title}
                    </h3>
                    <div
                      className={`absolute -bottom-1 left-0 h-0.5 w-8 group-hover:w-24 transition-all duration-700 ease-in-out
                ${index === 0 ? "bg-green-400" : ""}
                ${index === 1 ? "bg-blue-400" : ""}
                ${index === 2 ? "bg-purple-400" : ""}
              `}
                    ></div>
                  </div>

                  <p className="text-gray-600 text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </div>

                {/* Left side accent */}
                <div
                  className={`absolute left-0 top-1/4 bottom-1/4 w-1 
            ${index === 0 ? "bg-green-200" : ""}
            ${index === 1 ? "bg-blue-200" : ""}
            ${index === 2 ? "bg-purple-200" : ""}
          `}
                ></div>

                {/* Subtle floating detail effect */}
                <div
                  className={`absolute -bottom-6 -right-6 w-24 h-24 rounded-full opacity-10
            ${index === 0 ? "bg-green-300" : ""}
            ${index === 1 ? "bg-blue-300" : ""}
            ${index === 2 ? "bg-purple-300" : ""}
          `}
                ></div>

                {/* Ultra-subtle wave pattern */}
                <div className="absolute inset-0 opacity-[0.03] pointer-events-none overflow-hidden">
                  <svg
                    width="100%"
                    height="100%"
                    xmlns="http://www.w3.org/2000/svg"
                    preserveAspectRatio="none"
                  >
                    <path
                      d="M0,64 C100,42 200,86 300,64 L300,0 L0,0 Z"
                      fill={
                        index === 0
                          ? "#22C55E"
                          : index === 1
                          ? "#3B82F6"
                          : "#8B5CF6"
                      }
                    />
                  </svg>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {smallFeatures.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: (index + 3) * 0.2 }}
                className="relative overflow-hidden rounded-2xl shadow-2xl group cursor-pointer transition-all duration-500 transform hover:scale-105 bg-white border border-gray-100"
              >
                {/* Glass Morphism Layer */}
                <div className="absolute inset-0 backdrop-blur-md bg-white/40 z-0"></div>

                {/* Background Pattern with Enhanced Visibility */}
                <div
                  className="absolute inset-0 bg-cover bg-center opacity-20 group-hover:opacity-30 transition-all duration-500"
                  style={{
                    backgroundImage:
                      "url('/assets/pattern/smallFeaturesPattern.png')",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                    filter: "contrast(1.2) brightness(1.1)",
                  }}
                />

                {/* Dynamic Gradient Overlay */}
                <div
                  className={`absolute inset-0 opacity-30 group-hover:opacity-50 transition-all duration-500 bg-gradient-to-br 
        ${index % 4 === 0 ? "from-blue-100/40 to-blue-200/20" : ""}
        ${index % 4 === 1 ? "from-purple-100/40 to-purple-200/20" : ""}
        ${index % 4 === 2 ? "from-amber-100/40 to-amber-200/20" : ""}
        ${index % 4 === 3 ? "from-emerald-100/40 to-emerald-200/20" : ""}
      `}
                ></div>

                {/* Animated Top Accent Line */}
                <div
                  className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r 
        ${index % 4 === 0 ? "from-blue-400 to-blue-500" : ""}
        ${index % 4 === 1 ? "from-purple-400 to-purple-500" : ""}
        ${index % 4 === 2 ? "from-amber-400 to-amber-500" : ""}
        ${index % 4 === 3 ? "from-emerald-400 to-emerald-500" : ""}
        group-hover:h-2 transition-all duration-300
      `}
                ></div>

                {/* Icon Container with 3D Effect */}
                <div className="relative z-10 p-5">
                  <div
                    className={`w-14 h-14 rounded-2xl bg-gradient-to-br 
          ${index % 4 === 0 ? "from-blue-400 to-blue-600" : ""}
          ${index % 4 === 1 ? "from-purple-400 to-purple-600" : ""}
          ${index % 4 === 2 ? "from-amber-400 to-amber-600" : ""}
          ${index % 4 === 3 ? "from-emerald-400 to-emerald-600" : ""}
          flex items-center justify-center shadow-xl group-hover:shadow-2xl transform group-hover:-translate-y-1 transition-all duration-300
        `}
                  >
                    {React.createElement(feature.icon, {
                      className: "w-7 h-7 text-white drop-shadow-md",
                    })}
                  </div>
                  {/* Icon Glow Effect */}
                  <div
                    className={`absolute top-6 left-6 w-12 h-12 rounded-full blur-xl opacity-30 group-hover:opacity-60 transition-all duration-500
          ${index % 4 === 0 ? "bg-blue-300" : ""}
          ${index % 4 === 1 ? "bg-purple-300" : ""}
          ${index % 4 === 2 ? "bg-amber-300" : ""}
          ${index % 4 === 3 ? "bg-emerald-300" : ""}
        `}
                  ></div>
                </div>

                {/* Content Section with Enhanced Typography */}
                <div className="relative z-10 px-5 pb-5">
                  {/* Title with Animated Line */}
                  <div className="relative mb-3">
                    <h3 className="text-xl font-bold  text-gray-800 group-hover:text-gray-900 transition-colors duration-300">
                      {feature.title}
                    </h3>
                    <div
                      className={`absolute -bottom-1.5 left-0 h-0.5 w-8 group-hover:w-full transition-all duration-500 ease-in-out
            ${index % 4 === 0 ? "bg-blue-400" : ""}
            ${index % 4 === 1 ? "bg-purple-400" : ""}
            ${index % 4 === 2 ? "bg-amber-400" : ""}
            ${index % 4 === 3 ? "bg-emerald-400" : ""}
          `}
                    ></div>
                  </div>

                  <p className="text-sm text-gray-600 leading-relaxed font-medium">
                    {feature.description}
                  </p>
                </div>

                {/* Decorative Elements */}
                <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent opacity-70"></div>

                {/* Corner Elements */}
                <div
                  className={`absolute -bottom-3 -right-3 w-12 h-12 rounded-tl-xl bg-gradient-to-tl 
        ${index % 4 === 0 ? "from-blue-400/30 via-blue-300/20" : ""}
        ${index % 4 === 1 ? "from-purple-400/30 via-purple-300/20" : ""}
        ${index % 4 === 2 ? "from-amber-400/30 via-amber-300/20" : ""}
        ${index % 4 === 3 ? "from-emerald-400/30 via-emerald-300/20" : ""}
        to-transparent
      `}
                ></div>

                {/* Subtle Dots in Background */}
                <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,_rgba(0,0,0,0.2)_1px,_transparent_1px)] bg-[length:8px_8px]"></div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default KeyFeaturesSection;
