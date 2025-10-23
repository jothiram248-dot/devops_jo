// new UI
import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Shield, Bell, Users } from "lucide-react";

const features = [
  {
    title: "Manage Credentials",
    description:
      "Securely store and manage all your digital credentials in one place.",
    icon: Shield,
    image:
      "https://images.unsplash.com/photo-1633265486064-086b219458ec?auto=format&fit=crop&q=80&w=800",
    path: "/manage-credentials",
  },
  {
    title: "Smart Notifications",
    description: "Stay informed with intelligent alerts and timely updates.",
    icon: Bell,
    image:
      "https://images.unsplash.com/photo-1614064641938-3bbee52942c7?auto=format&fit=crop&q=80&w=800",
    path: "/smart-notifications",
  },
  {
    title: "Choose Nominee",
    description: "Select and manage trusted nominees for your digital legacy.",
    icon: Users,
    image:
      "https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&q=80&w=800",
    path: "/choose-nominee",
  },
];

const FeatureCard = ({ feature, index }) => {
  const navigate = useNavigate();

  const handleFeatureClick = () => {
    navigate(feature.path);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <motion.div
      onClick={handleFeatureClick}
      whileHover={{
        scale: 1.03,
        y: -5,
        boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.35)",
      }}
      whileTap={{ scale: 0.98 }}
      className="relative rounded-2xl overflow-hidden cursor-pointer group shadow-xl hover:shadow-2xl transition-all duration-300 bg-gradient-to-br from-black/90 to-gray-900/90 backdrop-blur-xl border border-gray-800"
    >
      {/* Feature Glass Effect */}
      <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

      {/* Feature Card Top Accent */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

      {/* Background Image */}
      <div className="relative">
        <div className="absolute inset-0 w-full h-full bg-gradient-to-br from-black/30 to-black/20 z-10"></div>
        <img
          src={feature.image}
          alt={feature.title}
          className="w-full h-64 object-cover transition-transform duration-700 group-hover:scale-105 rounded-t-2xl"
          loading={index === 0 ? "eager" : "lazy"}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/70 to-black/30 rounded-t-2xl z-20" />

        {/* Feature Icon with Glow */}
        <div className="absolute top-4 right-4 bg-white/10 backdrop-blur-md text-white rounded-full p-3.5 shadow-lg z-30 border border-white/20 group-hover:bg-gradient-to-br group-hover:from-indigo-600 group-hover:to-purple-600 transition-all duration-300">
          <feature.icon className="w-6 h-6" />
          <div className="absolute inset-0 rounded-full bg-indigo-500/20 blur-md -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </div>
      </div>

      {/* Content Section */}
      <div className="absolute bottom-0 left-0 w-full px-8 py-8 bg-gradient-to-t from-black via-black/90 to-transparent rounded-b-2xl z-30">
        {/* Feature Title with Gradient Effects */}
        <div className="relative">
          <h3 className="text-2xl font-bold text-white mb-3 group-hover:bg-clip-text group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-indigo-400 group-hover:to-purple-400 transition-all duration-300">
            {feature.title}
          </h3>
          <div className="absolute -bottom-1 left-0 w-12 h-0.5 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full transform origin-left scale-0 group-hover:scale-100 transition-transform duration-300 delay-100"></div>
        </div>

        <p className="text-sm text-gray-300 font-light">
          {feature.description}
        </p>

        {/* Feature Call to Action */}
        <div className="mt-6 flex justify-start overflow-hidden">
          <motion.div
            className="inline-flex items-center text-sm font-medium text-white/70 group-hover:text-indigo-300 transition-colors duration-300 relative"
            whileHover={{ x: 5 }}
          >
            <span>Explore Service</span>
            <div className="ml-2 w-6 h-6 flex items-center justify-center overflow-hidden relative">
              <motion.div
                animate={{ x: [-20, 0] }}
                transition={{
                  repeat: Infinity,
                  repeatType: "loop",
                  duration: 1.5,
                  ease: "easeInOut",
                  repeatDelay: 1,
                }}
                className="flex items-center absolute"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  />
                </svg>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

const FeaturesSection = () => {
  return (
    <>
      {/* Features top border with gradient glow */}
      <div className="relative w-full h-1">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-indigo-400 to-transparent animate-pulse"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-purple-300 to-transparent opacity-30 blur-sm"></div>
      </div>

      <section className="relative py-16 overflow-hidden" id="features">
        {/* light background with more pronounced gradients */}
        <div className="absolute inset-0 bg-gradient-to-b from-gray-50/90 via-white/95 to-gray-100/90 z-0"></div>

        {/* More vibrant ambient gradient overlays */}
        <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-br from-indigo-200/30 to-transparent opacity-60 z-0"></div>
        <div className="absolute bottom-0 left-0 w-full h-full bg-gradient-to-tr from-purple-200/30 to-transparent opacity-50 z-0"></div>

        {/* floating gradient spheres */}
        <div className="absolute top-40 right-20 w-80 h-80 bg-indigo-300 rounded-full filter blur-3xl opacity-30 animate-float-slow"></div>
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-purple-300 rounded-full filter blur-3xl opacity-30 animate-float-slow-reverse"></div>
        <div className="absolute top-10 left-1/4 w-64 h-64 bg-blue-300 rounded-full filter blur-3xl opacity-30 animate-float-medium"></div>
        <div className="absolute bottom-40 right-1/4 w-72 h-72 bg-violet-300 rounded-full filter blur-3xl opacity-30 animate-float-medium-reverse"></div>

        {/* mesh gradient overlay */}
        <div className="absolute inset-0 opacity-40 z-0 bg-[radial-gradient(circle_at_top_right,_rgba(129,140,248,0.3),_transparent_70%),radial-gradient(circle_at_bottom_left,_rgba(167,139,250,0.3),_transparent_70%)]"></div>

        {/* Additional diagonal gradient for more depth */}
        <div className="absolute inset-0 bg-gradient-to-tr from-blue-100/20 via-transparent to-purple-100/20 z-0"></div>

        {/* Subtle pattern overlay */}
        <div className="absolute inset-0 opacity-5 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMwMDAiIGZpbGwtb3BhY2l0eT0iLjAyIj48cGF0aCBkPSJNMzYgMzRjMC0yLjIxIDEuNzktNCA0LTRzNCAxLjc5IDQgNC0xLjc5IDQtNCA0LTQtMS43OS00LTRtMC0xN2MwLTIuMjEgMS43OS00IDQtNHM0IDEuNzkgNCA0LTEuNzkgNC00IDQtNC0xLjc5LTQtNG0tMTcgMGMwLTIuMjEgMS43OS00IDQtNHM0IDEuNzkgNCA0LTEuNzkgNC00IDQtNC0xLjc5LTQtNG0wIDE3YzAtMi4yMSAxLjc5LTQgNC00czQgMS43OSA0IDQtMS43OSA0LTQgNC00LTEuNzktNC00Ii8+PC9nPjwvZz48L3N2Zz4=')] z-0"></div>

        <div className="container mx-auto px-6 relative z-10">
          {/* Features & Services Section Header with enhanced styling */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-center mb-24 relative z-10"
          >
            {/* Features accent line with glow */}
            <div className="relative w-24 h-1 mx-auto mb-8">
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-400 to-purple-400 rounded-full"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-400 to-purple-400 rounded-full blur-sm opacity-70"></div>
            </div>

            <h2 className="text-5xl md:text-6xl font-black mb-8 bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 tracking-tight">
              Features & Services
            </h2>

            {/* Features accent diamond */}
            {/* <div className="flex justify-center mb-8">
              <motion.div 
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1, rotate: 45 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="w-3 h-3 bg-gradient-to-br from-indigo-400 to-purple-400 shadow-lg shadow-indigo-500/30"
              ></motion.div>
            </div> */}

            <p className="text-xl text-gray-700 max-w-2xl mx-auto leading-relaxed font-light">
              Experience how SacredSecret safeguards and manages your digital
              legacy with our{" "}
              <span className="text-indigo-600 font-medium">
                comprehensive services
              </span>{" "}
              designed for complete digital asset protection.
            </p>
          </motion.div>

          {/* Feature Cards */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  delayChildren: 0.3,
                  staggerChildren: 0.2,
                },
              },
            }}
            className="grid md:grid-cols-3 gap-10 relative z-10"
          >
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                variants={{
                  hidden: { opacity: 0, y: 50 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: {
                      duration: 0.8,
                      ease: [0.16, 1, 0.3, 1],
                    },
                  },
                }}
              >
                <FeatureCard feature={feature} index={index} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default FeaturesSection;
