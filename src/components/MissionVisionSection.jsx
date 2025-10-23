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

  // floating particles with varied sizes and opacities
  const floatingParticles = Array(20)
    .fill()
    .map((_, i) => ({
      id: i,
      size: Math.random() * 4 + 1,
      x: Math.random() * 100,
      y: Math.random() * 100,
      duration: Math.random() * 18 + 15,
      delay: Math.random() * 7,
      opacity: Math.random() * 0.3 + 0.1,
    }));

  return (
    <>
      <div className="relative w-full h-1">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-400 to-transparent animate-pulse"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-indigo-400 to-transparent opacity-30 blur-sm"></div>
      </div>

      <section
        ref={ref}
        className="relative py-24 overflow-hidden"
        id="mission-vision"
      >
        {/* Light Theme Background with Gradient - matching SecuritySection light style */}
        <div className="absolute inset-0 bg-gradient-to-b from-gray-50/90 via-white/95 to-gray-100/90 z-0"></div>

        {/* Ambient gradient overlays - lighter colors */}
        <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-br from-blue-200/30 to-transparent opacity-60 z-0"></div>
        <div className="absolute bottom-0 left-0 w-full h-full bg-gradient-to-tr from-indigo-200/30 to-transparent opacity-50 z-0"></div>

        {/* Floating gradient spheres - lighter colors */}
        <div className="absolute top-40 right-20 w-64 h-64 bg-blue-300 rounded-full filter blur-3xl opacity-30"></div>
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-indigo-300 rounded-full filter blur-3xl opacity-30"></div>
        <div className="absolute top-10 left-1/4 w-32 h-32 bg-sky-300 rounded-full filter blur-3xl opacity-30"></div>

        {/* Mesh gradient overlay - lighter */}
        <div className="absolute inset-0 opacity-40 z-0 bg-[radial-gradient(circle_at_top_right,_rgba(59,130,246,0.3),_transparent_70%),radial-gradient(circle_at_bottom_left,_rgba(99,102,241,0.3),_transparent_70%)]"></div>

        {/* Additional light gradients */}
        <div className="absolute top-1/4 right-1/6 w-80 h-80 bg-indigo-200/40 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-1/4 left-1/6 w-96 h-96 bg-purple-200/40 rounded-full filter blur-3xl"></div>

        {/* Enhanced floating particles - lighter */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1.5 h-1.5 rounded-full bg-blue-400/30 animate-float"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${15 + Math.random() * 15}s`,
              }}
            />
          ))}
        </div>
        {/* animated particles */}
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
                opacity: particle.opacity * 0.5,
                boxShadow: "0 0 8px rgba(79, 70, 229, 0.3)",
                animation: `float ${particle.duration}s infinite linear`,
                animationDelay: `${particle.delay}s`,
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
              visible: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] },
              },
            }}
            className="text-center mb-16"
          >
            <div className="relative">
              <h2 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 mb-4">
                Our Mission & Vision
              </h2>
            </div>

            {/* Animated underline consistent with other components */}
            <motion.div
              initial={{ width: 0 }}
              animate={inView ? { width: "10rem" } : {}}
              transition={{ duration: 1.2, delay: 0.5 }}
              className="h-1 bg-gradient-to-r from-blue-500 to-indigo-500 mx-auto"
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
                    ease: [0.22, 1, 0.36, 1],
                  },
                },
              }}
              className={`flex flex-col ${
                item.reverse ? "lg:flex-row-reverse" : "lg:flex-row"
              } items-center gap-12 mb-24 last:mb-0`}
            >
              {/* Image Column */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="w-full lg:w-1/2 relative group"
              >
                <div className="relative rounded-3xl overflow-hidden shadow-2xl transform perspective-1000">
                  {/* Refined 3D tilt effect container */}
                  <div className="relative aspect-[4/3] rounded-3xl overflow-hidden group-hover:shadow-3xl transition-all duration-700">
                    {/* Main image */}
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                    />

                    {/* Sophisticated gradient overlays */}
                    <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/70 via-purple-900/60 to-transparent opacity-60 mix-blend-multiply group-hover:opacity-70 transition-opacity duration-700"></div>
                    <div className="absolute inset-0 bg-gradient-to-tl from-blue-900/50 via-transparent to-indigo-900/40 mix-blend-overlay"></div>

                    {/* Enhanced shimmer effect */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                      <div className="absolute -inset-full bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12 animate-shimmer"></div>
                    </div>

                    {/* Refined floating icon with sophisticated effects */}
                    <motion.div
                      initial={{ scale: 0, rotate: -180 }}
                      animate={
                        inView ? { scale: 1, rotate: 0 } : { scale: 0 }
                      }
                      transition={{
                        type: "spring",
                        stiffness: 200,
                        damping: 15,
                        delay: index * 0.3 + 0.5,
                      }}
                      className="absolute top-8 right-8 z-20"
                    >
                      {/* Layered glow effects */}
                      <div className="relative">
                        <div className="absolute inset-0 bg-white/30 blur-2xl rounded-full scale-150 animate-pulse"></div>
                        <div className="absolute inset-0 bg-indigo-400/40 blur-xl rounded-full scale-125"></div>

                        {/* Icon container with refined styling */}
                        <div className="relative bg-gradient-to-br from-white/95 via-white/90 to-white/85 p-4 rounded-2xl shadow-2xl backdrop-blur-md border border-white/50 group-hover:scale-110 transition-transform duration-300">
                          <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-blue-500/10 rounded-2xl"></div>
                          <item.icon className="w-8 h-8 text-indigo-600 relative z-10 drop-shadow-md" />
                        </div>
                      </div>
                    </motion.div>

                    {/* Corner accent lines with animation */}
                    <div className="absolute top-0 left-0 w-20 h-20 border-t-4 border-l-4 border-white/40 rounded-tl-2xl group-hover:w-24 group-hover:h-24 transition-all duration-500"></div>
                    <div className="absolute bottom-0 right-0 w-20 h-20 border-b-4 border-r-4 border-white/40 rounded-br-2xl group-hover:w-24 group-hover:h-24 transition-all duration-500"></div>

                    {/* Refined decorative elements */}
                    <div className="absolute -top-2 -left-2 w-16 h-16 bg-gradient-to-br from-indigo-500/30 to-transparent rounded-full blur-xl"></div>
                    <div className="absolute -bottom-2 -right-2 w-20 h-20 bg-gradient-to-tl from-blue-500/30 to-transparent rounded-full blur-xl"></div>
                  </div>

                  {/* External accent ring */}
                  <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500/20 via-blue-500/20 to-purple-500/20 rounded-3xl -z-10 blur-md group-hover:blur-lg transition-all duration-500"></div>
                </div>
              </motion.div>

              {/* Text Column with DARK card */}
              <motion.div
                className="w-full lg:w-1/2"
                whileHover={{ x: item.reverse ? 8 : -8 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                {/* DARK CARD - swapped from light to dark */}
                <motion.div className="relative p-10 rounded-3xl overflow-hidden shadow-2xl group cursor-pointer bg-gradient-to-br from-gray-900/95 to-black/95 backdrop-blur-xl border border-gray-800">
                  {/* Dark background pattern */}
                  <div className="absolute inset-0 bg-[url('/assets/pattern/mission-bg.png')] bg-cover bg-center opacity-10"></div>
                  
                  {/* Dark gradient overlays */}
                  <div className="absolute inset-0 bg-gradient-to-bl from-blue-500/10 via-transparent to-indigo-500/10 mix-blend-soft-light"></div>
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 via-indigo-500/15 to-blue-500/10"></div>
                  <div className="absolute inset-0 bg-gradient-to-t from-blue-500/10 via-transparent to-purple-500/5 mix-blend-overlay"></div>

                  {/* subtle pattern with better texture */}
                  <div className="absolute inset-0 opacity-[0.03] bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0OCIgaGVpZ2h0PSI0OCI+PGcgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjZmZmIiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1vcGFjaXR5PSIwLjA4Ij48cGF0aCBkPSJNMTIgMTNhMTUgMTUgMCAwIDEgMjQgME0xMiAzNWExNSAxNSAwIDAgMCAyNCAwIi8+PC9nPjwvc3ZnPg==')]"></div>

                  {/* Top-Left Glowing Corner - adjusted for dark theme */}
                  {/* <div className="absolute top-0 left-0 w-28 h-28">
                    <div className="absolute top-0 left-0 w-28 h-28 bg-indigo-500/20 rounded-br-full blur-lg animate-pulse"></div>
                    <div
                      className="absolute top-0 left-0 w-20 h-20 bg-blue-500/30 rounded-br-full blur-md animate-pulse"
                      style={{ animationDuration: "3s" }}
                    ></div>
                    <div className="absolute top-0 left-0 w-16 h-16 bg-indigo-400/40 rounded-br-full blur-sm"></div>
                    <div className="absolute top-4 left-4 w-6 h-6 bg-white/40 rounded-full blur-sm"></div>
                  </div> */}

                  {/* Top-Right Glowing Corner */}
                  {/* <div className="absolute top-0 right-0 w-28 h-28">
                    <div
                      className="absolute top-0 right-0 w-28 h-28 bg-purple-500/20 rounded-bl-full blur-lg animate-pulse"
                      style={{ animationDuration: "4s" }}
                    ></div>
                    <div
                      className="absolute top-0 right-0 w-20 h-20 bg-indigo-500/30 rounded-bl-full blur-md animate-pulse"
                      style={{ animationDuration: "3.5s" }}
                    ></div>
                    <div className="absolute top-0 right-0 w-16 h-16 bg-purple-400/40 rounded-bl-full blur-sm"></div>
                    <div className="absolute top-4 right-4 w-6 h-6 bg-white/40 rounded-full blur-sm"></div>
                  </div> */}

                  {/* Bottom-Left Glowing Corner */}
                  {/* <div className="absolute bottom-0 left-0 w-28 h-28">
                    <div
                      className="absolute bottom-0 left-0 w-28 h-28 bg-blue-500/20 rounded-tr-full blur-lg animate-pulse"
                      style={{ animationDuration: "3.8s" }}
                    ></div>
                    <div
                      className="absolute bottom-0 left-0 w-20 h-20 bg-sky-500/30 rounded-tr-full blur-md animate-pulse"
                      style={{ animationDuration: "3.2s" }}
                    ></div>
                    <div className="absolute bottom-0 left-0 w-16 h-16 bg-blue-400/40 rounded-tr-full blur-sm"></div>
                    <div className="absolute bottom-4 left-4 w-6 h-6 bg-white/40 rounded-full blur-sm"></div>
                  </div> */}

                  {/* Bottom-Right Glowing Corner */}
                  {/* <div className="absolute bottom-0 right-0 w-28 h-28">
                    <div
                      className="absolute bottom-0 right-0 w-28 h-28 bg-violet-500/20 rounded-tl-full blur-lg animate-pulse"
                      style={{ animationDuration: "4.2s" }}
                    ></div>
                    <div
                      className="absolute bottom-0 right-0 w-20 h-20 bg-purple-500/30 rounded-tl-full blur-md animate-pulse"
                      style={{ animationDuration: "3.7s" }}
                    ></div>
                    <div className="absolute bottom-0 right-0 w-16 h-16 bg-violet-400/40 rounded-tl-full blur-sm"></div>
                    <div className="absolute bottom-4 right-4 w-6 h-6 bg-white/40 rounded-full blur-sm"></div>
                  </div> */}

                  {/* corner accent glow effect on hover */}
                  <div className="absolute top-0 left-0 w-32 h-32 bg-indigo-500/0 rounded-br-full blur-xl transition-all duration-700 ease-in-out group-hover:bg-indigo-500/30"></div>
                  <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/0 rounded-bl-full blur-xl transition-all duration-700 ease-in-out group-hover:bg-purple-500/30"></div>
                  <div className="absolute bottom-0 left-0 w-32 h-32 bg-blue-500/0 rounded-tr-full blur-xl transition-all duration-700 ease-in-out group-hover:bg-blue-500/30"></div>
                  <div className="absolute bottom-0 right-0 w-32 h-32 bg-violet-500/0 rounded-tl-full blur-xl transition-all duration-700 ease-in-out group-hover:bg-violet-500/30"></div>

                  {/* soft glow effects */}
                  <div className="absolute top-0 right-0 w-48 h-48 bg-indigo-500/10 rounded-full blur-3xl opacity-70"></div>
                  <div className="absolute bottom-0 left-0 w-48 h-48 bg-blue-500/10 rounded-full blur-3xl opacity-70"></div>

                  {/* floating light particles */}
                  <div className="absolute w-2 h-2 rounded-full bg-indigo-400/20 top-1/4 right-1/4 blur-sm animate-pulse"></div>
                  <div
                    className="absolute w-1.5 h-1.5 rounded-full bg-blue-400/30 bottom-1/3 left-1/3 blur-sm animate-pulse"
                    style={{ animationDelay: "1s" }}
                  ></div>
                  <div
                    className="absolute w-1 h-1 rounded-full bg-purple-400/20 top-1/3 left-1/4 blur-sm animate-pulse"
                    style={{ animationDelay: "2s" }}
                  ></div>

                  {/* Icon and Title Header with Icon */}
                  <div className="relative z-20">
                    <div className="flex items-center gap-6 mb-8">
                      <div className="relative">
                        {/* Refined Icon Container - adjusted for dark theme */}
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
                        {/* Title Styling - light text for dark background */}
                        <h3 className="text-2xl font-bold text-white group-hover:text-blue-300 transition-colors duration-300 mb-2">
                          {item.title}
                        </h3>
                        <div className="h-1 w-16 bg-gradient-to-r from-indigo-500 to-blue-500 rounded-full group-hover:w-24 transition-all duration-500"></div>
                      </div>
                    </div>
                  </div>

                  {/* Description with refined styling - light text for dark background */}
                  <div className="relative z-20">
                    <p className="text-lg text-gray-300 leading-relaxed pl-4 border-l-2 border-indigo-500/40 group-hover:border-indigo-500 transition-all duration-300">
                      {item.description}
                    </p>
                  </div>

                  {/* accent borders with gradient */}
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-500/40 via-blue-500/30 to-purple-500/20"></div>
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500/40 via-indigo-500/50 to-purple-500/40"></div>
                </motion.div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </section>
    </>
  );
};

export default MissionVisionSection;