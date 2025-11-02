import React, { useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Target, Eye, ArrowRight } from "lucide-react";
import picture1 from "/assets/Images/Picture1.png";
import picture2 from "/assets/Images/Picture2.png";

const content = [
  {
    title: "Our Mission",
    description:
      "Empowering individuals to designate trusted nominees for secure digital asset access, ensuring privacy and protection at the highest level.",
    icon: Target,
    image: picture1,
    reverse: false,
    gradient: "from-blue-600 via-indigo-600 to-blue-600",
    accentColor: "indigo",
  },
  {
    title: "Our Vision",
    description:
      "Revolutionizing the inheritance process through a decentralized, secure, and transparent platform that puts you in control of your digital legacy.",
    icon: Eye,
    image: picture2,
    reverse: true,
    gradient: "from-indigo-600 via-purple-600 to-indigo-600",
    accentColor: "purple",
  },
];

const MissionVisionSection = () => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.1,
  });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  return (
    <>
      {/* Top border with gradient glow */}
      <div className="relative w-full h-1">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-indigo-400 to-transparent animate-pulse"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-purple-300 to-transparent opacity-30 blur-sm"></div>
      </div>

      <section
        ref={ref}
        className="relative py-12 overflow-hidden"
        id="mission-vision"
      >
        {/* Light background with more pronounced gradients */}
        <div className="absolute inset-0 bg-gradient-to-b from-gray-50/90 via-white/95 to-gray-100/90 z-0"></div>

        {/* More vibrant ambient gradient overlays */}
        <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-br from-indigo-200/30 to-transparent opacity-60 z-0"></div>
        <div className="absolute bottom-0 left-0 w-full h-full bg-gradient-to-tr from-purple-200/30 to-transparent opacity-50 z-0"></div>

        {/* Floating gradient spheres */}
        <div className="absolute top-40 right-20 w-80 h-80 bg-indigo-300 rounded-full filter blur-3xl opacity-30"></div>
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-purple-300 rounded-full filter blur-3xl opacity-30"></div>
        <div className="absolute top-10 left-1/4 w-64 h-64 bg-blue-300 rounded-full filter blur-3xl opacity-30"></div>

        {/* Mesh gradient overlay */}
        <div className="absolute inset-0 opacity-40 z-0 bg-[radial-gradient(circle_at_top_right,_rgba(129,140,248,0.3),_transparent_70%),radial-gradient(circle_at_bottom_left,_rgba(167,139,250,0.3),_transparent_70%)]"></div>

        {/* Additional diagonal gradient for more depth */}
        <div className="absolute inset-0 bg-gradient-to-tr from-blue-100/20 via-transparent to-purple-100/20 z-0"></div>

        {/* Subtle pattern overlay */}
        <div className="absolute inset-0 opacity-5 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMwMDAiIGZpbGwtb3BhY2l0eT0iLjAyIj48cGF0aCBkPSJNMzYgMzRjMC0yLjIxIDEuNzktNCA0LTRzNCAxLjc5IDQgNC0xLjc5IDQtNCA0LTQtMS43OS00LTRtMC0xN2MwLTIuMjEgMS43OS00IDQtNHM0IDEuNzkgNCA0LTEuNzkgNC00IDQtNC0xLjc5LTQtNG0tMTcgMGMwLTIuMjEgMS43OS00IDQtNHM0IDEuNzkgNCA0LTEuNzkgNC00IDQtNC0xLjc5LTQtNG0wIDE3YzAtMi4yMSAxLjc5LTQgNC00czQgMS43OSA0IDQtMS43OSA0LTQgNC00LTEuNzktNC00Ii8+PC9nPjwvZz48L3N2Zz4=')] z-0"></div>

        <div className="container mx-auto px-6 relative z-10">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={controls}
            variants={{
              visible: {
                opacity: 1,
                y: 0,
                transition: { duration: 1 },
              },
            }}
            className="text-center mb-8 relative z-10"
          >
            {/* Accent line with glow */}
            <div className="relative w-20 h-1 mx-auto mb-6">
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-400 to-purple-400 rounded-full"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-400 to-purple-400 rounded-full blur-sm opacity-70"></div>
            </div>

            <h2 className="text-3xl md:text-4xl font-black mb-3 bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 tracking-tight">
              Our Mission & Vision
            </h2>

            <p className="text-base text-gray-700 max-w-3xl mx-auto leading-relaxed font-light">
              Discover what drives us forward and the future we're building for{" "}
              <span className="text-indigo-600 font-medium">
                secure digital inheritance
              </span>
            </p>
          </motion.div>

          {/* Content Cards - Alternating Layout */}
          <div className="space-y-8 max-w-7xl mx-auto">
            {content.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                animate={controls}
                variants={{
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: {
                      duration: 0.8,
                      delay: index * 0.2,
                      ease: [0.16, 1, 0.3, 1],
                    },
                  },
                }}
                className={`flex flex-col ${
                  item.reverse ? "lg:flex-row-reverse" : "lg:flex-row"
                } items-center gap-5 lg:gap-6`}
              >
                {/* Rounded Rectangle Image Section */}
                <motion.div
                  className="w-full lg:w-[22%]"
                  whileHover={{ scale: 1.03, y: -5 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                >
                  <div className="relative group">
                    {/* Outer Glow */}
                    <div className={`absolute -inset-2 bg-gradient-to-r ${item.gradient} rounded-3xl opacity-20 blur-2xl group-hover:opacity-40 transition-all duration-700`}></div>

                    {/* Main Image Container */}
                    <div className="relative rounded-2xl overflow-hidden shadow-2xl border-3 border-white">
                      <div className="aspect-[4/3] relative">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                        />

                        {/* Gradient Overlay */}
                        <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-60 mix-blend-multiply`}></div>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>

                        {/* Shimmer Effect */}
                        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                          <motion.div
                            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12"
                            animate={{
                              x: ["-100%", "200%"],
                            }}
                            transition={{
                              duration: 1.5,
                              ease: "easeInOut",
                            }}
                          />
                        </div>

                        {/* Floating Icon Badge */}
                        <motion.div
                          initial={{ scale: 0, rotate: -180 }}
                          animate={inView ? { scale: 1, rotate: 0 } : {}}
                          transition={{
                            type: "spring",
                            stiffness: 200,
                            damping: 15,
                            delay: index * 0.2 + 0.4,
                          }}
                          className="absolute top-3 right-3 z-10"
                        >
                          <div className="relative">
                            <div className={`absolute inset-0 bg-${item.accentColor}-500/20 blur-md rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>
                            <div className={`relative bg-white/10 backdrop-blur-md text-white rounded-full p-2.5 shadow-lg border border-white/20 group-hover:bg-gradient-to-br group-hover:from-${item.accentColor}-600 group-hover:to-purple-600 transition-all duration-300`}>
                              <item.icon className="w-5 h-5" />
                            </div>
                          </div>
                        </motion.div>

                        {/* Number Badge */}
                        <div className="absolute bottom-3 left-3">
                          <div className="flex items-center gap-3">
                            <div className="text-4xl font-black text-white/90 leading-none drop-shadow-2xl">
                              0{index + 1}
                            </div>
                          </div>
                        </div>

                        {/* Decorative corner accents */}
                        <div className="absolute top-0 left-0 w-12 h-12 border-t-2 border-l-2 border-white/30"></div>
                        <div className="absolute bottom-0 right-0 w-12 h-12 border-b-2 border-r-2 border-white/30"></div>
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Content Section */}
                <motion.div
                  className="w-full lg:w-[72%]"
                  whileHover={{
                    scale: 1.02,
                    y: -3,
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="relative rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 bg-gradient-to-br from-black/90 to-gray-900/90 backdrop-blur-xl border border-gray-800">
                    {/* Glass Effect */}
                    <div className={`absolute inset-0 bg-gradient-to-tr from-${item.accentColor}-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>

                    {/* Top Accent */}
                    <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${item.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>

                    {/* Content */}
                    <div className="relative px-6 py-6 lg:px-8 lg:py-7 z-10">
                      {/* Title with Gradient Effects */}
                      <div className="relative mb-3">
                        <h3 className={`text-xl lg:text-2xl font-bold text-white mb-2 group-hover:bg-clip-text group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:${item.gradient} transition-all duration-300`}>
                          {item.title}
                        </h3>
                        <div className={`absolute -bottom-1 left-0 w-10 h-0.5 bg-gradient-to-r ${item.gradient} rounded-full transform origin-left scale-0 group-hover:scale-100 transition-transform duration-300 delay-100`}></div>
                      </div>

                      <p className="text-sm text-gray-300 font-light leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Custom Animation */}
        <style jsx>{`
          @keyframes spin-slow {
            from {
              transform: rotate(0deg);
            }
            to {
              transform: rotate(360deg);
            }
          }
          .animate-spin-slow {
            animation: spin-slow 20s linear infinite;
          }
        `}</style>
      </section>
    </>
  );
};

export default MissionVisionSection;