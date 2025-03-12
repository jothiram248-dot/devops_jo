import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  CreditCard,
  TrendingUp,
  Tv,
  Share2,
  Gamepad2,
  FolderLock,
} from "lucide-react";

const credentialTypes = [
  {
    title: "Banking Credentials",
    icon: CreditCard,
    image: "/assets/Images/Banking_credentials.jpg",
    description:
      "Securely Manage your Banking User Id/Password and other Credentials",
  },
  {
    title: "Investment Credentials",
    icon: TrendingUp,
    image: "/assets/Images/Investment_credneitals.jpg",
    description: "Keep your Investment Platform access Secure",
  },
  {
    title: "Entertainment Platform Credentials",
    icon: Tv,
    image: "/assets/Images/Entertainment.jpg",
    description: "Store your Streaming and Entertainment Login details",
  },
  {
    title: "Social Media Credentials",
    icon: Share2,
    image: "/assets/Images/SocialMedia.jpg",
    description: "Manage your Social Media account access",
  },
  {
    title: "Gaming Platform Credentials",
    icon: Gamepad2,
    image: "/assets/Images/gaming_credentials.jpg",
    description: "Keep your Gaming Accounts secure",
  },
  {
    title: "Others",
    icon: FolderLock,
    image: "/assets/Images/others.jpg",
    description:
      "Store and Manage Credentials for any other Platforms and Portals",
  },
];

// Ultra premium card component
const PremiumCredentialCard = ({ feature, index }) => {
  return (
    <motion.div
      whileHover={{
        scale: 1.03,
        y: -5,
      }}
      whileTap={{ scale: 0.98 }}
      className="relative h-full rounded-2xl overflow-hidden shadow-xl group will-change-transform"
    >
      {/* Image container - moved to ensure it's visible */}
      <div className="relative h-64 overflow-hidden rounded-t-2xl">
        <img
          src={feature.image}
          alt={feature.title}
          width="400"
          height="256"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading={index < 3 ? "eager" : "lazy"}
          style={{ aspectRatio: "400/256" }}
        />
        
        {/* Lighter overlay that doesn't completely obscure the image */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/30"></div>
      </div>
      
      {/* Premium glass card overlay - positioned to not cover image */}
      <div className="absolute inset-0 rounded-2xl overflow-hidden border border-gray-800/50 group-hover:border-accent-100/30 transition-colors duration-300">
        {/* Top border accent with glow */}
        <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-accent-100 via-purple-600 to-accent-200 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        
        {/* Bottom glass panel only - to keep image visible */}
        <div className="absolute bottom-0 inset-x-0 h-48 bg-gradient-to-t from-black/95 via-black/90 to-transparent backdrop-blur-sm">
          {/* Animated subtle gradient shimmer effect */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 overflow-hidden">
            <div className="absolute top-0 -inset-x-full h-full w-1/2 z-5 block transform -skew-x-12 bg-gradient-to-r from-transparent via-white/10 to-transparent group-hover:animate-shimmer"></div>
          </div>
        </div>
      </div>

      {/* Premium content layout */}
      <div className="absolute inset-0 p-8 flex flex-col justify-between">
        {/* Top section with icon */}
        <div className="flex justify-between items-start">
          <div className="w-16 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
            {/* Purely decorative element */}
            <div className="h-0.5 w-full bg-accent-100/50 rounded-full"></div>
          </div>
          
          {/* Ultra premium icon */}
          <div className="relative">
            {/* Animated ring */}
            <div className="absolute -inset-1 rounded-full border border-accent-100/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500 group-hover:animate-ping-slow"></div>
            
            {/* Icon container with glow */}
            <div className="relative flex items-center justify-center w-14 h-14 bg-gradient-to-br from-gray-900 to-black rounded-full shadow-lg border border-gray-700 group-hover:border-accent-100/50 group-hover:bg-gradient-to-br group-hover:from-accent-100 group-hover:to-accent-200 transition-all duration-500">
              <div className="absolute inset-0 rounded-full bg-accent-100/20 blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <feature.icon className="w-6 h-6 text-gray-400 group-hover:text-white transition-colors duration-300 relative z-10" />
            </div>
          </div>
        </div>
        
        {/* Content area with fixed spacing */}
        <div className="mt-auto">
          {/* Premium title with consistent height */}
          <div className="mb-3 min-h-[3.5rem] flex flex-col justify-end">
            <h3 className="text-2xl font-bold text-white group-hover:text-accent-100 transition-colors duration-300">
              {feature.title}
            </h3>
            
            {/* Animated underline that extends on hover */}
            <div className="h-0.5 w-0 bg-gradient-to-r from-accent-100 to-accent-200 mt-2 rounded-full group-hover:w-24 transition-all duration-500 ease-out"></div>
          </div>
          
          {/* Description with consistent positioning */}
          <p className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors duration-300 font-light">
            {feature.description}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

const CredentialTypes = () => {
  const [isInView, setIsInView] = useState(false);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );
    
    const section = document.getElementById('credential-types-section');
    if (section) {
      observer.observe(section);
    }
    
    return () => {
      if (section) {
        observer.unobserve(section);
      }
    };
  }, []);

  return (
    <>
      {/* Premium border effect */}
      <div className="relative w-full h-px">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-accent-100 to-transparent"></div>
      </div>
      
      <section id="credential-types-section" className="relative py-20 overflow-hidden">
        {/* Optimized premium background */}
        <div className="absolute inset-0 bg-gradient-to-b from-gray-50/95 via-white to-gray-50/95 z-0"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-gray-50/90 via-white/95 to-gray-100/90 z-0"></div>
        
        {/* More vibrant ambient gradient overlays */}
        <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-br from-indigo-200/30 to-transparent opacity-60 z-0"></div>
        <div className="absolute bottom-0 left-0 w-full h-full bg-gradient-to-tr from-purple-200/30 to-transparent opacity-50 z-0"></div>
        
        {/* Enhanced floating gradient spheres */}
        <div className="absolute top-40 right-20 w-80 h-80 bg-indigo-300 rounded-full filter blur-3xl opacity-30 animate-float-slow"></div>
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-purple-300 rounded-full filter blur-3xl opacity-30 animate-float-slow-reverse"></div>
        <div className="absolute top-10 left-1/4 w-64 h-64 bg-blue-300 rounded-full filter blur-3xl opacity-30 animate-float-medium"></div>
        <div className="absolute bottom-40 right-1/4 w-72 h-72 bg-violet-300 rounded-full filter blur-3xl opacity-30 animate-float-medium-reverse"></div>
        
        {/* Enhanced mesh gradient overlay */}
        <div className="absolute inset-0 opacity-40 z-0 bg-[radial-gradient(circle_at_top_right,_rgba(129,140,248,0.3),_transparent_70%),radial-gradient(circle_at_bottom_left,_rgba(167,139,250,0.3),_transparent_70%)]"></div>
        
        {/* Additional diagonal gradient for more depth */}
        <div className="absolute inset-0 bg-gradient-to-tr from-blue-100/20 via-transparent to-purple-100/20 z-0"></div>
        
        {/* Subtle pattern overlay */}
        <div className="absolute inset-0 opacity-5 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMwMDAiIGZpbGwtb3BhY2l0eT0iLjAyIj48cGF0aCBkPSJNMzYgMzRjMC0yLjIxIDEuNzktNCA0LTRzNCAxLjc5IDQgNC0xLjc5IDQtNCA0LTQtMS43OS00LTRtMC0xN2MwLTIuMjEgMS43OS00IDQtNHM0IDEuNzkgNCA0LTEuNzkgNC00IDQtNC0xLjc5LTQtNG0tMTcgMGMwLTIuMjEgMS43OS00IDQtNHM0IDEuNzkgNCA0LTEuNzkgNC00IDQtNC0xLjc5LTQtNG0wIDE3YzAtMi4yMSAxLjc5LTQgNC00czQgMS43OSA0IDQtMS43OSA0LTQgNC00LTEuNzktNC00Ii8+PC9nPjwvZz48L3N2Zz4=')] z-0"></div>
        {/* Premium gradient overlays */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-accent-100/10 via-transparent to-transparent opacity-60 z-0"></div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-purple-200/10 via-transparent to-transparent opacity-40 z-0"></div>
        
        {/* Optimized floating gradient spheres */}
        <div className="absolute top-20 right-10 w-96 h-96 bg-accent-100/20 rounded-full filter blur-3xl opacity-20"></div>
        <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-purple-300/20 rounded-full filter blur-3xl opacity-20"></div>

        <div className="container mx-auto px-6 relative z-10">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20 relative z-10"
          >
            {/* Premium accent line */}
            <div className="relative w-24 h-px mx-auto mb-8">
              <div className="absolute inset-0 bg-gradient-to-r from-accent-100 to-accent-200 rounded-full"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-accent-100 to-accent-200 rounded-full blur-sm opacity-70"></div>
            </div>
            
            <h2 className="text-5xl md:text-6xl font-black mb-8 bg-clip-text text-transparent bg-gradient-to-r from-accent-100 via-purple-600 to-accent-200 tracking-tight">
              Store All Your Credentials
            </h2>
            
            <p className="text-xl text-gray-700 max-w-2xl mx-auto leading-relaxed font-light">
              Keep all your important login details safely secured with our <span className="text-accent-100 font-medium">advanced credential management</span> designed for complete digital protection.
            </p>
          </motion.div>

          {/* Premium card grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10">
            {credentialTypes.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                transition={{ 
                  duration: 0.5, 
                  delay: index * 0.1,
                  ease: "easeOut"
                }}
                className="h-full"
              >
                <PremiumCredentialCard 
                  feature={feature} 
                  index={index}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default CredentialTypes;