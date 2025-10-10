import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Shield, Heart, Users, Lock, Globe, Sparkles } from "lucide-react";

const CardCarousel = () => {
  const [activeIndex, setActiveIndex] = useState(1); // Start with middle card active
  const [isTransitioning, setIsTransitioning] = useState(false);

  const cards = [
    {
      icon: Heart,
      gradient: "from-slate-800/95 to-slate-900/95",
      overlay: "bg-emerald-500/15", // Increased overlay opacity
      borderColor: "border-emerald-500/40", // Increased border opacity
      hoverShadow: "hover:shadow-emerald-500/40", // Enhanced shadow
      iconGradient: "from-emerald-400 to-teal-600",
      activeIndicator: "from-emerald-400 to-teal-600",
      title: "Personal Touch",
      description:
        "Built with an understanding of the emotional value of digital memories.",
      cornerGlow: "from-emerald-400/20 to-teal-600/30", // Corner glow gradient
    },
    {
      icon: Users,
      gradient: "from-slate-800/95 to-slate-900/95",
      overlay: "bg-amber-500/15", // Increased overlay opacity
      borderColor: "border-amber-500/40", // Increased border opacity
      hoverShadow: "hover:shadow-amber-500/40", // Enhanced shadow
      iconGradient: "from-amber-400 to-orange-600",
      activeIndicator: "from-amber-400 to-orange-600",
      title: "Community Driven",
      description:
        "Developed based on real needs and feedback from our community.",
      cornerGlow: "from-amber-400/20 to-orange-600/30", // Corner glow gradient
    },
    {
      icon: Lock,
      gradient: "from-slate-800/95 to-slate-900/95",
      overlay: "bg-blue-500/15", // Increased overlay opacity
      borderColor: "border-blue-500/40", // Increased border opacity
      hoverShadow: "hover:shadow-blue-500/40", // Enhanced shadow
      iconGradient: "from-blue-400 to-indigo-600",
      activeIndicator: "from-blue-400 to-indigo-600",
      title: "Privacy First",
      description: "Built on the principles of absolute privacy and security.",
      cornerGlow: "from-blue-400/20 to-indigo-600/30", // Corner glow gradient
    },
  ];

  // Auto rotate cards every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isTransitioning) {
        setIsTransitioning(true);
        setActiveIndex((current) => (current + 1) % cards.length);
        // Reset transition state after animation completes
        setTimeout(() => setIsTransitioning(false), 600);
      }
    }, 4000); // Increased time to allow full transition

    return () => clearInterval(interval);
  }, [cards.length, isTransitioning]);

  // Handle manual navigation
  const handleCardClick = (index) => {
    if (!isTransitioning && index !== activeIndex) {
      setIsTransitioning(true);
      setActiveIndex(index);
      // Reset transition state after animation completes
      setTimeout(() => setIsTransitioning(false), 600);
    }
  };

  return (
    <div className="relative w-full">
      {/* height container to ensure stable layout */}
      <div className="relative flex items-center justify-center w-full h-72">
        {cards.map((card, index) => {
          // Calculate position relative to active card
          const position = (index - activeIndex + cards.length) % cards.length;

          // Determine if this card is the active one (center)
          const isActive = index === activeIndex;

          // Calculate transform values based on position
          let xPosition = 0;
          let scale = 0.8;
          let opacity = 0.4;
          let zIndex = 0;

          if (position === 0) {
            // Active card
            scale = 1;
            opacity = 1;
            zIndex = 30;
          } else if (position === 1) {
            // Card to the right
            xPosition = 340; // Increased spacing
            zIndex = 20;
            opacity = 0.7; // Slightly more visible
          } else if (position === cards.length - 1) {
            // Card to the left
            xPosition = -340; // Increased spacing
            zIndex = 20;
            opacity = 0.7; // Slightly more visible
          }

          return (
            <motion.div
              key={card.title}
              className={`absolute p-6 w-72 ${card.overlay} bg-gradient-to-br ${
                card.gradient
              } backdrop-blur-sm rounded-xl border-2 ${
                card.borderColor
              } shadow-xl ${
                isActive ? card.hoverShadow : ""
              } transition-all duration-500 group cursor-pointer overflow-hidden`}
              initial={{
                x: position === 0 ? 0 : position === 1 ? 340 : -340,
                opacity: position === 0 ? 1 : 0.7,
                scale: position === 0 ? 1 : 0.8,
              }}
              animate={{
                x: xPosition,
                scale: scale,
                opacity: opacity,
                zIndex: zIndex,
              }}
              transition={{
                type: "tween",
                ease: "circOut",
                duration: 0.4,
              }}
              onClick={() => handleCardClick(index)}
            >
              {/* Top-left corner glow */}
              <div
                className={`absolute -top-6 -left-6 w-12 h-12 bg-gradient-to-br ${card.cornerGlow} blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-700`}
              ></div>

              {/* Top-right corner accent */}
              <div className="absolute top-0 right-0 w-16 h-16 overflow-hidden">
                <div
                  className={`absolute top-0 right-0 w-4 h-4 bg-gradient-to-br ${card.iconGradient} rotate-45 transform origin-top-right shadow-lg`}
                ></div>
              </div>

              {/* Bottom-right corner glow */}
              <div
                className={`absolute -bottom-6 -right-6 w-12 h-12 bg-gradient-to-tl ${card.cornerGlow} blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-700`}
              ></div>

              {/* metallic accent in bottom-left */}
              <div className="absolute bottom-0 left-0 w-16 h-16 overflow-hidden pointer-events-none">
                <div className="absolute bottom-0 left-0 w-6 h-6 bg-gradient-to-tr from-white/20 to-transparent rotate-45 transform origin-bottom-left"></div>
              </div>

              {/* Add subtle inner glow effect */}
              <div className="absolute inset-0 rounded-xl bg-gradient-to-tr from-white/[0.03] to-transparent opacity-50"></div>

              <div className="flex items-center space-x-4 mb-4 relative z-10">
                <div
                  className={`w-12 h-12 flex items-center justify-center rounded-full bg-gradient-to-br ${
                    card.iconGradient
                  } shadow-lg ${
                    isActive ? "group-hover:shadow-lg" : ""
                  } transition-all duration-300`}
                >
                  {React.createElement(card.icon, {
                    className: "w-6 h-6 text-white",
                  })}
                </div>
                <h4 className="text-xl font-semibold text-white">
                  {card.title}
                </h4>
              </div>
              <p className="text-gray-300 relative z-10">{card.description}</p>
              {isActive && (
                <div
                  className={`w-0 group-hover:w-full h-0.5 mt-6 bg-gradient-to-r ${card.activeIndicator} transition-all duration-500 relative z-10`}
                ></div>
              )}

              {/* Add subtle shadow effect at the bottom */}
              <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-black/20 to-transparent rounded-b-xl"></div>
            </motion.div>
          );
        })}
      </div>

      {/* Navigation dots - improved styling */}
      <div className="flex justify-center mt-4 space-x-2">
        {cards.map((card, index) => (
          <button
            key={index}
            onClick={() => handleCardClick(index)}
            className={`h-3 rounded-full transition-all duration-300 ${
              index === activeIndex
                ? `bg-gradient-to-r ${card.activeIndicator} w-6 shadow-sm`
                : "bg-gray-600 w-3"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

const AboutSection = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  // Animation variants for staggered animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  // Sparkle elements for effect
  const sparkles = Array(40)
    .fill()
    .map((_, i) => ({
      id: i,
      size: Math.random() * 3 + 1,
      x: Math.random() * 100,
      y: Math.random() * 100,
      opacity: Math.random() * 0.2 + 0.05,
      duration: Math.random() * 15 + 10,
      delay: Math.random() * 5,
    }));

  return (
    <>
      <div className="relative w-full h-px">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent"></div>
        <div className="absolute inset-0 blur-sm bg-gradient-to-r from-transparent via-indigo-400 to-transparent opacity-70"></div>
      </div>

      <section
        className="relative py-16 overflow-hidden bg-gradient-to-b from-gray-50 via-white to-gray-50"
        id="about"
      >
        {/* Light Theme Background with Gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-gray-50/90 via-white/95 to-gray-100/90 z-0"></div>

        {/* Ambient gradient overlays */}
        <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-br from-blue-200/30 to-transparent opacity-60 z-0"></div>
        <div className="absolute bottom-0 left-0 w-full h-full bg-gradient-to-tr from-indigo-200/30 to-transparent opacity-50 z-0"></div>

        {/* Floating gradient spheres */}
        <div className="absolute top-40 right-20 w-80 h-80 bg-blue-300 rounded-full filter blur-3xl opacity-30 animate-float-slow"></div>
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-indigo-300 rounded-full filter blur-3xl opacity-30 animate-float-slow-reverse"></div>
        <div className="absolute top-10 left-1/4 w-64 h-64 bg-sky-300 rounded-full filter blur-3xl opacity-30 animate-float-medium"></div>

        {/* Mesh gradient overlay */}
        <div className="absolute inset-0 opacity-40 z-0 bg-[radial-gradient(circle_at_top_right,_rgba(59,130,246,0.3),_transparent_70%),radial-gradient(circle_at_bottom_left,_rgba(99,102,241,0.3),_transparent_70%)]"></div>

        {/* Subtle pattern overlay */}
        <div className="absolute inset-0 opacity-5 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMwMDAiIGZpbGwtb3BhY2l0eT0iLjAyIj48cGF0aCBkPSJNMzYgMzRjMC0yLjIxIDEuNzktNCA0LTRzNCAxLjc5IDQgNC0xLjc5IDQtNCA0LTQtMS43OS00LTRtMC0xN2MwLTIuMjEgMS43OS00IDQtNHM0IDEuNzkgNCA0LTEuNzkgNC00IDQtNC0xLjc5LTQtNG0tMTcgMGMwLTIuMjEgMS43OS00IDQtNHM0IDEuNzkgNCA0LTEuNzkgNC00IDQtNC0xLjc5LTQtNG0wIDE3YzAtMi4yMSAxLjc5LTQgNC00czQgMS43OSA0IDQtMS43OSA0LTQgNC00LTEuNzktNC00Ii8+PC9nPjwvZz48L3N2Zz4=')] z-0"></div>

        {/* sparkle elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {sparkles.map((sparkle) => (
            <div
              key={sparkle.id}
              className="absolute rounded-full bg-indigo-500"
              style={{
                width: `${sparkle.size}px`,
                height: `${sparkle.size}px`,
                left: `${sparkle.x}%`,
                top: `${sparkle.y}%`,
                opacity: sparkle.opacity,
                boxShadow: "0 0 6px rgba(99, 102, 241, 0.8)",
                animation: `float ${sparkle.duration}s infinite linear`,
                animationDelay: `${sparkle.delay}s`,
              }}
            />
          ))}
        </div>

        <div className="container mx-auto px-6 relative z-10">
          {/* section header */}
          <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-24"
          >
            <div className="relative w-24 h-1 mx-auto mb-8">
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-400 to-purple-400 rounded-full blur-sm opacity-70"></div>
            </div>

            <h2 className="text-4xl md:text-5xl py-1 font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600 tracking-tight">
              Our Story
            </h2>
          </motion.div>

          {/* Content Section with image on left, dark card on right */}
          <div className="grid md:grid-cols-2 gap-16 items-center mb-20">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              {/* image with decorative elements */}
              <div className="relative z-10 overflow-hidden rounded-xl shadow-xl">
                <img
                  src={`${import.meta.env.VITE_DO_BUCKET_URL}/assets/Images/AboutUs (2).jpg`}
                  alt="Digital Future"
                  className="w-full h-[500px] object-cover transition-transform duration-700 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-indigo-900/30 to-transparent mix-blend-overlay"></div>
              </div>

              {/* decorative elements */}
              <div className="absolute -bottom-6 -right-6 w-32 h-32 border-2 border-indigo-500/20 rounded-xl z-0 bg-white/70 backdrop-blur-sm"></div>
              <div className="absolute -top-6 -left-6 w-32 h-32 border-2 border-purple-500/20 rounded-xl z-0 bg-white/70 backdrop-blur-sm"></div>

              {/* floating badge */}
              <div className="absolute top-8 -right-4 bg-white/90 backdrop-blur-md px-4 py-2 rounded-lg border border-indigo-200/40 shadow-lg z-20">
                <span className="text-indigo-700 font-medium">Est. 2022</span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="p-10 bg-gradient-to-br from-gray-900/95 to-indigo-900/95 backdrop-blur-xl rounded-xl border border-indigo-500/10 shadow-xl"
            >
              <h3 className="text-3xl font-semibold mb-8 text-white">
                The Genesis
              </h3>
              <p className="text-gray-300 mb-6 leading-relaxed">
                In today's digital age, our lives are increasingly intertwined
                with technology. From precious memories stored on social media
                to critical financial information in banking apps and beyond,
                our digital footprint has become a major part of our daily
                lives. SacredSecret emerged from the recognition that these
                digital assets require the same level of protection and careful
                succession planning as physical assets. We've created a platform
                that ensures your digital assets remain secure and are only
                accessible to those you trust, after you're gone.
              </p>
            </motion.div>
          </div>

          {/* Core Values Cards with dark styling */}
          <CardCarousel />

          {/* Feature Cards with original styling but reduced bottom space */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="grid md:grid-cols-3 gap-8 mt-16"
          >
            {[
              {
                icon: Shield,
                color: "indigo",
                title: "Security First",
                image: `${import.meta.env.VITE_DO_BUCKET_URL}/assets/Images/security_first.jpg`,
                description:
                  "Your digital legacy deserves the highest level of protection.",
                items: [
                  "Military-grade encryption",
                  "Customizable access controls",
                  "Automated security updates",
                  "24/7 technical support",
                  "Regular security audits",
                ],
                gradient: "from-indigo-900/80 to-slate-900/90",
                overlay: "bg-indigo-500/15",
                borderColor: "border-indigo-500/40",
                hoverShadow: "hover:shadow-indigo-500/40",
                iconGradient: "from-indigo-400 to-blue-600",
                cornerGlow: "from-indigo-400/20 to-blue-600/30",
                patternColor: "rgba(99,102,241,0.05)",
              },
              {
                icon: Globe,
                color: "purple",
                title: "Global Reach",
                image: `${import.meta.env.VITE_DO_BUCKET_URL}/assets/Images/global_reach.jpg`,
                description:
                  "Available anywhere, anytime, for everyone who needs it.",
                items: [
                  "Multi-language support",
                  "24/7 customer service",
                  "Regional compliance",
                  "Local data centers",
                  "Global accessibility",
                ],
                gradient: "from-purple-900/80 to-slate-900/90",
                overlay: "bg-purple-500/15",
                borderColor: "border-purple-500/40",
                hoverShadow: "hover:shadow-purple-500/40",
                iconGradient: "from-purple-400 to-fuchsia-600",
                cornerGlow: "from-purple-400/20 to-fuchsia-600/30",
                patternColor: "rgba(168,85,247,0.05)",
              },
              {
                icon: Sparkles,
                color: "blue",
                title: "Innovation",
                image: `${import.meta.env.VITE_DO_BUCKET_URL}/assets/Images/Innovation.jpg`,
                description:
                  "Constantly evolving to meet tomorrow's challenges.",
                items: [
                  "Cutting-edge technology",
                  "Regular feature updates",
                  "User-driven development",
                  "Advanced automation",
                  "Future-proof design",
                ],
                gradient: "from-blue-900/80 to-slate-900/90",
                overlay: "bg-blue-500/15",
                borderColor: "border-blue-500/40",
                hoverShadow: "hover:shadow-blue-500/40",
                iconGradient: "from-blue-400 to-cyan-600",
                cornerGlow: "from-blue-400/20 to-cyan-600/30",
                patternColor: "rgba(59,130,246,0.05)",
              },
            ].map(
              (
                {
                  icon: Icon,
                  color,
                  title,
                  image,
                  description,
                  items,
                  gradient,
                  overlay,
                  borderColor,
                  hoverShadow,
                  iconGradient,
                  cornerGlow,
                  patternColor,
                },
                index
              ) => (
                <motion.div
                  key={title}
                  variants={itemVariants}
                  className={`group relative overflow-hidden rounded-xl border ${borderColor} shadow-xl ${hoverShadow} transition-all duration-500 h-full`}
                >
                  {/* Background Image with Custom Gradient Overlay */}
                  <div className="absolute inset-0 z-0">
                    <img
                      src={image}
                      alt={title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div
                      className={`absolute inset-0 bg-gradient-to-t ${gradient} backdrop-blur-sm`}
                    ></div>
                    <div
                      className={`absolute inset-0 bg-[linear-gradient(45deg,${patternColor}_25%,transparent_25%,transparent_50%,${patternColor}_50%,${patternColor}_75%,transparent_75%)] bg-[length:20px_20px] opacity-5`}
                    ></div>
                  </div>

                  {/* Top-left corner glow */}
                  <div
                    className={`absolute -top-6 -left-6 w-12 h-12 bg-gradient-to-br ${cornerGlow} blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-700`}
                  ></div>

                  {/* Top-right corner accent */}
                  <div className="absolute top-0 right-0 w-16 h-16 overflow-hidden">
                    <div
                      className={`absolute top-0 right-0 w-4 h-4 bg-gradient-to-br ${iconGradient} rotate-45 transform origin-top-right shadow-lg`}
                    ></div>
                  </div>

                  {/* Bottom-right corner glow */}
                  <div
                    className={`absolute -bottom-6 -right-6 w-12 h-12 bg-gradient-to-tl ${cornerGlow} blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-700`}
                  ></div>

                  {/* metallic accent in bottom-left */}
                  <div className="absolute bottom-0 left-0 w-16 h-16 overflow-hidden pointer-events-none">
                    <div className="absolute bottom-0 left-0 w-6 h-6 bg-gradient-to-tr from-white/20 to-transparent rotate-45 transform origin-bottom-left"></div>
                  </div>

                  {/* Add subtle inner glow effect */}
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-tr from-white/[0.03] to-transparent opacity-50"></div>

                  {/* floating sparkle elements */}
                  <div
                    className={`absolute top-1/3 right-1/3 w-6 h-6 rounded-full bg-${color}-500/20 blur-md opacity-0 group-hover:opacity-70 transition-all duration-1000 animate-pulse`}
                  ></div>
                  <div
                    className={`absolute bottom-1/4 left-1/4 w-4 h-4 rounded-full bg-${color}-500/20 blur-md opacity-0 group-hover:opacity-70 transition-all duration-1000 animate-pulse`}
                    style={{ animationDelay: "0.5s" }}
                  ></div>

                  {/* Content Container */}
                  <div className="relative z-10 h-full flex flex-col p-8 pb-4">
                    {/* Header with elegant icon */}
                    <div className="flex items-center space-x-4 mb-6">
                      <div
                        className={`w-14 h-14 flex items-center justify-center rounded-full bg-gradient-to-br ${iconGradient} shadow-lg group-hover:shadow-lg transition-all duration-300`}
                      >
                        <Icon className="w-7 h-7 text-white" />
                      </div>
                      <h4 className="text-2xl font-semibold text-white">
                        {title}
                      </h4>
                    </div>

                    {/* Description with typography */}
                    <p className="text-gray-300 mb-6">{description}</p>

                    {/* List Section */}
                    <div className="flex-grow">
                      <ul className="space-y-4">
                        {items.map((item, idx) => (
                          <li
                            key={idx}
                            className="flex items-start space-x-3 group/item"
                          >
                            <div
                              className={`mt-2 flex-shrink-0 w-2 h-2 rounded-full bg-gradient-to-r ${iconGradient} group-hover/item:scale-125 transition-all duration-300`}
                            ></div>
                            <span className="text-gray-300 group-hover/item:text-white transition-colors duration-300">
                              {item}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* accent border */}
                    <div
                      className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${iconGradient} transform translate-y-0 opacity-50 group-hover:opacity-100 transition-all duration-300`}
                    ></div>
                  </div>
                </motion.div>
              )
            )}
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default AboutSection;
