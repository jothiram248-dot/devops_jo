import React, { useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Target, Eye, Sparkles, ChevronRight } from "lucide-react";

const content = [
  {
    title: "Our Mission",
    description:
      "Empowering individuals to designate trusted nominees for secure digital asset access, ensuring privacy and protection at the highest level.",
    icon: Target,
    image:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=1200",
    reverse: false,
  },
  {
    title: "Our Vision",
    description:
      "Revolutionizing the inheritance process through a decentralized, secure, and transparent platform that puts you in control of your digital legacy.",
    icon: Eye,
    image:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=1200",
    reverse: true,
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

  // Premium floating particles with varied sizes and opacities
  const floatingParticles = Array(20).fill().map((_, i) => ({
    id: i,
    size: Math.random() * 4 + 1,
    x: Math.random() * 100,
    y: Math.random() * 100,
    duration: Math.random() * 18 + 15,
    delay: Math.random() * 7,
    opacity: Math.random() * 0.3 + 0.1
  }));

  return (
    <>
      {/* Premium animated top border with glow effect - consistent with other components */}
      <div className="relative w-full h-1">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-accent-100 to-transparent animate-pulse"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-30 blur-sm"></div>
      </div>
      
      <section
        ref={ref}
        className="relative py-24 bg-dark-100 bg-[url('/assets/pattern/mission-bg.png')] bg-cover bg-center bg-no-repeat overflow-hidden"
        id="mission-vision"
      >
        {/* Enhanced background effects matching KeyFeatures */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/65 to-black/50 backdrop-blur-[6px] opacity-85 z-0 pointer-events-none"></div>
        <div className="absolute inset-0 bg-blue-900/10 mix-blend-overlay pointer-events-none z-0"></div>
        
        {/* Background Elements - Soft Blurs for Premium Feel */}
        <div className="absolute top-40 right-20 w-64 h-64 bg-purple-600 rounded-full filter blur-3xl opacity-10"></div>
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-pink-600 rounded-full filter blur-3xl opacity-10"></div>
        <div className="absolute top-10 left-1/4 w-32 h-32 bg-blue-600 rounded-full filter blur-3xl opacity-10"></div>
          {/* Modern background effects */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(79,70,229,0.2),transparent_70%),radial-gradient(ellipse_at_bottom_left,_rgba(124,58,237,0.2),transparent_70%)]"></div>
        
        {/* Premium ambient blurs */}
        <div className="absolute top-1/4 right-1/6 w-80 h-80 bg-indigo-600/20 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-1/4 left-1/6 w-96 h-96 bg-purple-600/20 rounded-full filter blur-3xl"></div>
        
        {/* Enhanced floating particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <div 
              key={i}
              className="absolute w-1.5 h-1.5 rounded-full bg-accent-100/40 animate-float"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${15 + Math.random() * 15}s`
              }}
            />
          ))}
        </div>
        {/* Ultra-premium animated particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {floatingParticles.map((particle) => (
            <div 
              key={particle.id}
              className="absolute rounded-full bg-indigo-400"
              style={{
                width: `${particle.size}px`,
                height: `${particle.size}px`,
                left: `${particle.x}%`,
                top: `${particle.y}%`,
                opacity: particle.opacity,
                boxShadow: '0 0 8px rgba(79, 70, 229, 0.6)',
                animation: `float ${particle.duration}s infinite linear`,
                animationDelay: `${particle.delay}s`
              }}
            />
          ))}
        </div>

        <div className="container mx-auto px-6 relative z-10">
          {/* Section Title with better spacing */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={controls}
            variants={{
              visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] } }
            }}
            className="text-center mb-16"
          >
            <div className="relative">
              <h2 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-accent-100 via-white to-accent-200 mb-4">
                Our Mission & Vision
              </h2>
            </div>
            
            {/* Animated underline consistent with other components */}
            <motion.div
              initial={{ width: 0 }}
              animate={inView ? { width: "10rem" } : {}}
              transition={{ duration: 1.2, delay: 0.5 }}
              className="h-1 bg-gradient-to-r from-accent-200 to-accent-100 mx-auto"
            ></motion.div>
          </motion.div>

          {/* Content Sections with better spacing */}
          {content.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 60 }}
              animate={controls}
              variants={{
                visible: { 
                  opacity: 1, 
                  y: 0, 
                  transition: { 
                    duration: 1, 
                    delay: index * 0.3,
                    ease: [0.22, 1, 0.36, 1]
                  } 
                }
              }}
              className={`flex flex-col md:flex-row items-center gap-12 ${
                item.reverse ? "md:flex-row-reverse" : ""
              } ${index === 0 ? "mb-16" : ""}`}
            >
              {/* Image Section - kept the same */}
              <div className="relative w-full md:w-1/2 h-[420px] overflow-hidden rounded-2xl shadow-2xl group">
                {/* Layered border effect */}
                <div className="absolute inset-0 rounded-2xl border border-white/5 z-30"></div>
                <div className="absolute inset-1 rounded-xl border border-white/5 z-30 opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
                
                {/* Premium image */}
                <motion.img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transition-all duration-1000 scale-110 group-hover:scale-105 rounded-2xl"
                  whileInView={{ scale: 1.05 }}
                  transition={{ duration: 2.5, ease: [0.22, 1, 0.36, 1] }}
                />
                
                {/* Premium layered gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-gray-900/60 via-gray-900/50 to-gray-900/70 opacity-90 group-hover:opacity-75 transition-all duration-1000 rounded-2xl"></div>
                <div className="absolute inset-0 bg-gradient-to-tr from-accent-100/20 to-transparent opacity-0 group-hover:opacity-60 transition-all duration-1000 rounded-2xl"></div>
                
                {/* Premium outer glow effect */}
                <div className="absolute -inset-0.5 bg-gradient-to-br from-accent-100/0 to-accent-200/0 rounded-2xl group-hover:from-accent-100/20 group-hover:to-accent-200/20 opacity-0 group-hover:opacity-100 blur-xl transition-all duration-1000 z-0"></div>
                
                {/* Premium corner accent */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-accent-100/20 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-all duration-1000 blur-xl"></div>
                
                {/* Animated grain overlay for premium texture */}
                <div className="absolute inset-0 opacity-20 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIiB4PSIwIiB5PSIwIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIgdHlwZT0iZnJhY3RhbE5vaXNlIi8+PGZlQ29sb3JNYXRyaXggdHlwZT0ic2F0dXJhdGUiIHZhbHVlcz0iMCIvPjwvZmlsdGVyPjxwYXRoIGQ9Ik0wIDBoMzAwdjMwMEgweiIgZmlsdGVyPSJ1cmwoI2EpIiBvcGFjaXR5PSIuMDUiLz48L3N2Zz4=')]"></div>
                
                {/* Title Overlay */}
                <div className="absolute inset-x-0 bottom-0 z-20 bg-gradient-to-t from-black/80 to-transparent pt-24 px-8 pb-8 transform translate-y-8 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-700">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-accent-100/80 backdrop-blur-md rounded-lg">
                      <item.icon className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white">
                        {item.title}
                      </h3>
                      <div className="h-0.5 w-0 bg-gradient-to-r from-accent-100 to-accent-200 group-hover:w-full transition-all duration-1000 mt-1"></div>
                    </div>
                  </div>
                </div>
              </div>

{/* Content Section - Premium Card with Glowing Corner Effects */}
<motion.div
  whileHover={{ scale: 1.02 }}
  transition={{ duration: 0.4 }}
  className="relative w-full md:w-1/2 p-10 rounded-2xl shadow-xl border border-white/40 transition-all duration-300 group overflow-hidden"
>
  
  {/* Base Premium Soft Gradient Background */}
  <div className="absolute inset-0 bg-gradient-to-br from-white/95 via-gray-50/90 to-gray-100/95 backdrop-blur-md"></div>
  <div className="absolute inset-0 bg-gradient-to-tr from-blue-50/30 to-indigo-50/30 mix-blend-overlay"></div>
  <div className="absolute inset-0 bg-gradient-to-bl from-purple-50/20 via-transparent to-blue-50/30 mix-blend-soft-light"></div>
  <div className="absolute inset-0 bg-gradient-to-r from-pink-50/20 via-sky-50/25 to-emerald-50/20"></div>
  <div className="absolute inset-0 bg-gradient-to-t from-amber-50/15 via-transparent to-rose-50/10 mix-blend-overlay"></div>
  
  {/* Improved subtle pattern with better texture */}
  <div className="absolute inset-0 opacity-[0.07] bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0OCIgaGVpZ2h0PSI0OCI+PGcgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjMDAwIiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1vcGFjaXR5PSIwLjA4Ij48cGF0aCBkPSJNMTIgMTNhMTUgMTUgMCAwIDEgMjQgME0xMiAzNWExNSAxNSAwIDAgMCAyNCAwIi8+PC9nPjwvc3ZnPg==')]"></div>
  
  {/* NEW: Top-Left Glowing Corner */}
  <div className="absolute top-0 left-0 w-28 h-28">
    {/* Outer Glow Layer */}
    <div className="absolute top-0 left-0 w-28 h-28 bg-indigo-400/30 rounded-br-full blur-lg animate-pulse"></div>
    {/* Middle Glow Layer */}
    <div className="absolute top-0 left-0 w-20 h-20 bg-blue-400/40 rounded-br-full blur-md animate-pulse" style={{ animationDuration: '3s' }}></div>
    {/* Inner Glow Layer */}
    <div className="absolute top-0 left-0 w-16 h-16 bg-indigo-300/50 rounded-br-full blur-sm"></div>
    {/* Center Bright Spot */}
    <div className="absolute top-4 left-4 w-6 h-6 bg-white/70 rounded-full blur-sm"></div>
  </div>
  
  {/* NEW: Top-Right Glowing Corner */}
  <div className="absolute top-0 right-0 w-28 h-28">
    {/* Outer Glow Layer */}
    <div className="absolute top-0 right-0 w-28 h-28 bg-purple-400/30 rounded-bl-full blur-lg animate-pulse" style={{ animationDuration: '4s' }}></div>
    {/* Middle Glow Layer */}
    <div className="absolute top-0 right-0 w-20 h-20 bg-indigo-400/40 rounded-bl-full blur-md animate-pulse" style={{ animationDuration: '3.5s' }}></div>
    {/* Inner Glow Layer */}
    <div className="absolute top-0 right-0 w-16 h-16 bg-purple-300/50 rounded-bl-full blur-sm"></div>
    {/* Center Bright Spot */}
    <div className="absolute top-4 right-4 w-6 h-6 bg-white/70 rounded-full blur-sm"></div>
  </div>
  
  {/* NEW: Bottom-Left Glowing Corner */}
  <div className="absolute bottom-0 left-0 w-28 h-28">
    {/* Outer Glow Layer */}
    <div className="absolute bottom-0 left-0 w-28 h-28 bg-blue-400/30 rounded-tr-full blur-lg animate-pulse" style={{ animationDuration: '3.8s' }}></div>
    {/* Middle Glow Layer */}
    <div className="absolute bottom-0 left-0 w-20 h-20 bg-sky-400/40 rounded-tr-full blur-md animate-pulse" style={{ animationDuration: '3.2s' }}></div>
    {/* Inner Glow Layer */}
    <div className="absolute bottom-0 left-0 w-16 h-16 bg-blue-300/50 rounded-tr-full blur-sm"></div>
    {/* Center Bright Spot */}
    <div className="absolute bottom-4 left-4 w-6 h-6 bg-white/70 rounded-full blur-sm"></div>
  </div>
  
  {/* NEW: Bottom-Right Glowing Corner */}
  <div className="absolute bottom-0 right-0 w-28 h-28">
    {/* Outer Glow Layer */}
    <div className="absolute bottom-0 right-0 w-28 h-28 bg-violet-400/30 rounded-tl-full blur-lg animate-pulse" style={{ animationDuration: '4.2s' }}></div>
    {/* Middle Glow Layer */}
    <div className="absolute bottom-0 right-0 w-20 h-20 bg-purple-400/40 rounded-tl-full blur-md animate-pulse" style={{ animationDuration: '3.7s' }}></div>
    {/* Inner Glow Layer */}
    <div className="absolute bottom-0 right-0 w-16 h-16 bg-violet-300/50 rounded-tl-full blur-sm"></div>
    {/* Center Bright Spot */}
    <div className="absolute bottom-4 right-4 w-6 h-6 bg-white/70 rounded-full blur-sm"></div>
  </div>
  
  {/* Enhanced corner accent glow effect on hover */}
  <div className="absolute top-0 left-0 w-32 h-32 bg-indigo-400/0 rounded-br-full blur-xl transition-all duration-700 ease-in-out group-hover:bg-indigo-400/40"></div>
  <div className="absolute top-0 right-0 w-32 h-32 bg-purple-400/0 rounded-bl-full blur-xl transition-all duration-700 ease-in-out group-hover:bg-purple-400/40"></div>
  <div className="absolute bottom-0 left-0 w-32 h-32 bg-blue-400/0 rounded-tr-full blur-xl transition-all duration-700 ease-in-out group-hover:bg-blue-400/40"></div>
  <div className="absolute bottom-0 right-0 w-32 h-32 bg-violet-400/0 rounded-tl-full blur-xl transition-all duration-700 ease-in-out group-hover:bg-violet-400/40"></div>
  
  {/* Enhanced soft glow effects */}
  <div className="absolute top-0 right-0 w-48 h-48 bg-indigo-200/20 rounded-full blur-3xl opacity-70"></div>
  <div className="absolute bottom-0 left-0 w-48 h-48 bg-blue-200/20 rounded-full blur-3xl opacity-70"></div>
  
  {/* Beautiful floating light particles */}
  <div className="absolute w-2 h-2 rounded-full bg-indigo-400/20 top-1/4 right-1/4 blur-sm animate-pulse"></div>
  <div className="absolute w-1.5 h-1.5 rounded-full bg-blue-400/30 bottom-1/3 left-1/3 blur-sm animate-pulse" style={{ animationDelay: '1s' }}></div>
  <div className="absolute w-1 h-1 rounded-full bg-purple-400/20 top-1/3 left-1/4 blur-sm animate-pulse" style={{ animationDelay: '2s' }}></div>
  
  {/* Professional overlay with depth */}
  <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-white/80 to-transparent"></div>
  <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-white/80 to-transparent"></div>
  
  {/* Icon and Title Header with Improved Icon */}
  <div className="relative z-20">
    <div className="flex items-center gap-6 mb-8">
      <div className="relative">
        {/* Refined Premium Icon Container */}
        <div className="relative z-10 p-5 rounded-xl shadow-lg overflow-hidden">
          {/* Multiple gradient layers for depth */}
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 to-blue-700"></div>
          <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/20 to-transparent mix-blend-overlay"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.1),transparent_70%)]"></div>
          
          {/* Icon with subtle shine effect */}
          <item.icon className="w-8 h-8 text-white relative z-10" />
          
          {/* Glossy highlight */}
          <div className="absolute -inset-full top-0 h-[200%] w-[200%] rotate-45 bg-white/10 translate-x-[-120%] translate-y-[-100%] group-hover:translate-x-[100%] group-hover:translate-y-[100%] transition-all duration-1000"></div>
        </div>
        
        {/* Improved subtle icon glow */}
        <div className="absolute inset-0 bg-indigo-500/30 blur-xl rounded-full"></div>
      </div>
      
      <div>
        {/* Premium Title Styling */}
        <h3 className="text-2xl font-bold text-gray-800 group-hover:text-indigo-700 transition-colors duration-300 mb-2">
          {item.title}
        </h3>
        <div className="h-1 w-16 bg-gradient-to-r from-indigo-500 to-blue-500 rounded-full group-hover:w-24 transition-all duration-500"></div>
      </div>
    </div>
  </div>
  
  {/* Description with refined styling */}
  <div className="relative z-20">
    <p className="text-lg text-gray-700 leading-relaxed pl-4 border-l-2 border-indigo-500/40 group-hover:border-indigo-500 transition-all duration-300">
      {item.description}
    </p>
  </div>
  
  {/* Premium accent borders with gradient */}
  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-500/40 via-blue-500/30 to-purple-500/20"></div>
  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-100/60 via-white/80 to-indigo-100/60"></div>
</motion.div>
            </motion.div>
          ))}
        </div>
      </section>
    </>
  );
};

export default MissionVisionSection;