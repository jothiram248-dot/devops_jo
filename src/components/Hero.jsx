// import React, { useEffect, useRef, useState, useMemo } from "react";
// import { motion, useScroll, useTransform, useAnimation } from "framer-motion";
// import { useLocation, useNavigate } from "react-router-dom";
// import { useSelector } from "react-redux";
// import VideoPlayer from "./VideoPlayer";
// import NotificationSystem from "@/pages/notifications/NotificationCardToast";

// const Hero = () => {
//   const containerRef = useRef(null);
//   const videoContainerRef = useRef(null);
//   const { scrollY } = useScroll();
//   const navigate = useNavigate();
//   const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
//   const controls = useAnimation();
//   const contentControls = useAnimation();
//   const [isMobile, setIsMobile] = useState(false);
//   const [hasPassedThreshold, setHasPassedThreshold] = useState(false);

//   //  Debounce scroll handler
//   const handleScroll = useMemo(() => {
//     return () => {
//       const scrollPosition = window.scrollY;
//       if (scrollPosition > 300 && !hasPassedThreshold) {
//         setHasPassedThreshold(true);
//       } else if (scrollPosition <= 300 && hasPassedThreshold) {
//         setHasPassedThreshold(false);
//       }
//     };
//   }, [hasPassedThreshold]);

//   // Add optimized scroll listener
//   useEffect(() => {
//     window.addEventListener("scroll", handleScroll, { passive: true });
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, [handleScroll]);

//   // Check for mobile viewport with debouncing
//   useEffect(() => {
//     let timeoutId;
//     const checkMobile = () => {
//       clearTimeout(timeoutId);
//       timeoutId = setTimeout(() => {
//         setIsMobile(window.innerWidth < 768);
//       }, 100);
//     };

//     // Initial check
//     checkMobile();

//     // Listen for resize events
//     window.addEventListener("resize", checkMobile, { passive: true });

//     // Cleanup
//     return () => {
//       window.removeEventListener("resize", checkMobile);
//       clearTimeout(timeoutId);
//     };
//   }, []);

//   const location = useLocation();
//   const text = "SacredSecret"; // The text to animate
//   const [displayedText, setDisplayedText] = useState("");
//   const [index, setIndex] = useState(0);

//   useEffect(() => {
//     const typingInterval = setInterval(() => {
//       if (index < text.length) {
//         setDisplayedText((prev) => prev + text[index]);
//         setIndex((prev) => prev + 1);
//       } else {
//         clearInterval(typingInterval); // Clear interval when animation ends
//         setTimeout(() => {
//           setDisplayedText(""); // Clear text after a pause
//           setIndex(0); // Reset index
//         }, 600); // Pause duration before restarting
//       }
//     }, 100); // Typing speed in milliseconds

//     return () => clearInterval(typingInterval); // Cleanup interval on component unmount
//   }, [index, text]);

//   useEffect(() => {
//     window.scrollTo(0, 0);
//   }, [location]);

//   // Video scale with consistent behavior
//   const videoScale = useTransform(
//     scrollY,
//     [0, 300],
//     hasPassedThreshold ? [0.8, 0.8] : [0.6, 0.8]
//   );

//   // Video rotation with consistent behavior
//   const videoRotateX = useTransform(
//     scrollY,
//     [0, 300],
//     hasPassedThreshold ? [0, 0] : [8, 0]
//   );

//   // Video translation with consistent behavior
//   const videoTranslateY = useTransform(
//     scrollY,
//     [0, 300],
//     hasPassedThreshold ? [40, 40] : [0, 40]
//   );

//   const videoBgOpacity = useTransform(
//     scrollY,
//     [0, 200, 800], // Keep full opacity until 200px, then fade until 800px
//     [1, 1, 0] // Full opacity maintained longer, then smooth fade out
//   );

//   // Background opacity with smooth transition
//   const bgOpacity = useTransform(scrollY, [0, 300], [1, 0.95]);

//   // Apply CSS-based subtle glow instead of JS-based transform
//   const videoGlowClass = hasPassedThreshold
//     ? "video-glow-static"
//     : "video-glow-dynamic";

//   const handleGetStarted = async () => {
//     if (isAuthenticated) {
//       const featuresSection = document.getElementById("features");
//       if (featuresSection) {
//         featuresSection.scrollIntoView({ behavior: "smooth" });
//       }
//     } else {
//       await Promise.all([
//         controls.start({
//           y: [0, window.innerHeight],
//           scale: [1, 2],
//           transition: { duration: 1.5, ease: "easeInOut" },
//         }),
//         contentControls.start({
//           opacity: 0,
//           transition: { duration: 0.75, ease: "easeOut" },
//         }),
//       ]);

//       navigate("/signup");
//     }
//   };

//   const sentence =
//     "SacredSecret empowers individuals with rights over their assets, both in digital and physical form. The name allows users to select their nominee according to their wishes and choose who will inherit or access their assets. 'Sacred' refers to the sanctity of their will, which is kept a Secret, shared only with the chosen individual, and independent of defined societal/system norms.";

//   const words = sentence.split(" "); // Split sentence into words

//   const wordVariants = {
//     hidden: { color: "#A0A0A0", opacity: 0.6, y: 5 },
//     visible: {
//       color: "#FFFFFF",
//       opacity: 1,
//       y: 0,
//       transition: {
//         duration: 0.4,
//         ease: "easeInOut",
//       },
//     },
//   };

//   // Memoize gradient spheres to prevent re-renders
//   const GradientSpheres = useMemo(
//     () => (
//       <div className="absolute inset-0 z-1 overflow-hidden pointer-events-none">
//         <motion.div
//           className="absolute -bottom-[100px] -right-[100px] rounded-full z-2"
//           style={{
//             width: "300px",
//             height: "300px",
//             background:
//               "radial-gradient(circle at 30% 30%, rgba(108, 99, 255, 0.15) 0%, rgba(82, 71, 200, 0.1) 40%, rgba(56, 52, 144, 0.05) 70%, transparent 100%)",
//             boxShadow: "0 0 40px 10px rgba(126, 122, 234, 0.06)",
//             filter: "blur(5px)",
//             opacity: 0.7,
//           }}
//           animate={{
//             scale: [1, 1.05, 1],
//           }}
//           transition={{
//             duration: 15,
//             repeat: Infinity,
//             ease: "easeInOut",
//           }}
//         />

//         <motion.div
//           className="absolute -top-[50px] -left-[50px] rounded-full z-2"
//           style={{
//             width: "250px",
//             height: "250px",
//             background:
//               "radial-gradient(circle at 40% 40%, rgba(66, 158, 245, 0.12) 0%, rgba(55, 125, 192, 0.08) 40%, rgba(42, 89, 134, 0.04) 70%, transparent 100%)",
//             boxShadow: "0 0 30px 5px rgba(66, 158, 245, 0.05)",
//             filter: "blur(4px)",
//             opacity: 0.6,
//           }}
//           animate={{
//             scale: [1, 1.08, 1],
//           }}
//           transition={{
//             duration: 18,
//             repeat: Infinity,
//             ease: "easeInOut",
//             delay: 1,
//           }}
//         />

//         <motion.div
//           className="absolute bottom-[10%] left-[50%] transform -translate-x-1/2 rounded-full z-2"
//           style={{
//             width: "220px",
//             height: "220px",
//             background:
//               "radial-gradient(circle at 50% 50%, rgba(139, 92, 246, 0.06) 0%, rgba(124, 58, 237, 0.04) 40%, rgba(109, 40, 217, 0.02) 70%, transparent 100%)",
//             boxShadow: "0 0 40px 15px rgba(139, 92, 246, 0.03)",
//             filter: "blur(8px)",
//             opacity: 0.6,
//           }}
//           animate={{
//             scale: [1, 1.1, 1],
//             opacity: [0.5, 0.7, 0.5],
//           }}
//           transition={{
//             duration: 20,
//             repeat: Infinity,
//             ease: "easeInOut",
//           }}
//         />

//         <motion.div
//           className="absolute top-[15%] left-[50%] transform -translate-x-1/2 rounded-full z-2"
//           style={{
//             width: "180px",
//             height: "180px",
//             background:
//               "radial-gradient(circle at 50% 50%, rgba(96, 165, 250, 0.08) 0%, rgba(59, 130, 246, 0.05) 40%, rgba(37, 99, 235, 0.02) 70%, transparent 100%)",
//             boxShadow: "0 0 40px 10px rgba(96, 165, 250, 0.02)",
//             filter: "blur(6px)",
//             opacity: 0.5,
//           }}
//           animate={{
//             scale: [1, 1.08, 1],
//             opacity: [0.4, 0.6, 0.4],
//           }}
//           transition={{
//             duration: 22,
//             repeat: Infinity,
//             ease: "easeInOut",
//             delay: 2,
//           }}
//         />
//       </div>
//     ),
//     []
//   );

//   return (
//     <div
//       ref={containerRef}
//       className="relative min-h-screen bg-black overflow-hidden"
//     >
//       <div className="absolute inset-0 z-0 overflow-hidden">
//         <div
//           className="absolute inset-0"
//           style={{
//             background:
//               "radial-gradient(circle at 50% 50%, #121225 0%, #080816 50%, #030308 100%)",
//             opacity: 0.7,
//           }}
//         ></div>

//         {/* Static rich gradient overlays */}
//         <div className="absolute inset-0 bg-gradient-to-br from-blue-900/10 via-transparent to-purple-900/10"></div>
//         <div className="absolute inset-0 bg-gradient-to-tl from-indigo-900/5 via-transparent to-teal-900/5"></div>

//         {/* dust-like particle background - static */}
//         <div
//           className="absolute inset-0 noise-texture"
//           style={{ opacity: 0.2 }}
//         ></div>

//         {/*  gradient overlay - static for better performance */}
//         <div className="absolute inset-0">
//           <div className="absolute top-0 left-0 w-full h-full bg-gradient-radial-blue"></div>
//           <div className="absolute top-0 left-0 w-full h-full bg-gradient-radial-purple"></div>
//         </div>
//       </div>

//       {/* Render memoized gradient spheres */}
//       {GradientSpheres}

//       {isAuthenticated && (
//         <div className="absolute top-28 right-2 z-30 pointer-events-none">
//           <NotificationSystem className="pointer-events-auto" />
//         </div>
//       )}

//       {/* Full-screen background video container with fade effect */}
//       <motion.div
//         style={{ opacity: videoBgOpacity }} // Use the enhanced opacity transform
//         className="fixed inset-0 z-1 transition-opacity duration-150 ease-out"
//       >
//         {/* Video container covering entire viewport */}
//         <div className="w-full h-full overflow-hidden">
//           <video
//             autoPlay
//             muted
//             loop
//             playsInline
//             className="w-full h-full object-cover video-container fixed-video"
//             style={{
//               objectPosition: "center center",
//               willChange: "transform", // Performance hint
//             }}
//           >
//             <source
//               src={`${
//                 import.meta.env.VITE_DO_BUCKET_URL
//               }/assets/Images/Grandpa_Gathering.mp4`}
//               type="video/mp4"
//             />
//           </video>

//           {/* Enhanced gradient overlay for better text visibility */}
//           <div className="absolute inset-0 bg-gradient-to-b from-black/85 via-black/70 to-black/85"></div>
//         </div>
//       </motion.div>

//       {/* U-shaped section container - now as overlay on top of the video */}
//       <div className="absolute left-0 right-0 h-[90vh] overflow-hidden z-10">
//         {/* U-shaped background with identical mobile/desktop curvature */}
//         <div
//           className="absolute inset-0 z-10"
//           style={{
//             clipPath:
//               "polygon(0 0, 100% 0, 100% 85%, 65% 100%, 35% 100%, 0 85%)",
//             border: "1px solid rgba(59, 130, 246, 0.4)",
//             background:
//               "linear-gradient(to bottom, rgba(37, 99, 235, 0.1), transparent)",
//             boxShadow: "0 0 20px rgba(37, 99, 235, 0.25)",
//           }}
//         ></div>

//         <div className="absolute bottom-0 left-[35%] right-[35%] h-[2px] z-10 bottom-accent-glow"></div>
//       </div>

//       {/* Title section - mobile responsive */}
//       <div className="relative z-20 container mx-auto px-4 sm:px-6 pt-24 md:pt-32 pb-6">
//         <div className="text-center mb-8">
//           <motion.h1
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ duration: 0.8 }}
//             className="text-3xl sm:text-5xl md:text-8xl lg:text-8xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500 mb-2 md:mb-3"
//             style={{ fontFamily: '"Helvetica", serif' }}
//           >
//             Empower Yourself
//           </motion.h1>
//           <motion.h2
//             initial={{ opacity: 0, y: 10 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.8, delay: 0.2 }}
//             className="text-2xl sm:text-4xl md:text-6xl font-bold text-white mb-4 md:mb-6"
//             style={{ fontFamily: '"Helvetica", serif' }}
//           >
//             with SacredSecret
//           </motion.h2>

//           {/* Subtitle text - mobile responsive */}
//           <motion.p
//             initial={{ opacity: 0, y: 10 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.8, delay: 0.4 }}
//             className="max-w-2xl mx-auto text-base md:text-lg text-blue-100/80 mb-1 md:mb-2"
//           >
//             Secure your digital legacy and ensure your assets
//           </motion.p>
//           <motion.p
//             initial={{ opacity: 0, y: 10 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.8, delay: 0.5 }}
//             className="max-w-2xl mx-auto text-base md:text-lg text-blue-100/80"
//           >
//             reach the right hands at the right time
//           </motion.p>
//         </div>
//       </div>

//       {/* Main content - mobile responsive with improved performance */}
//       <div className="relative z-20 container mx-auto px-4 sm:px-6 pt-[8vh] md:pt-[12vh] pb-[15vh] md:pb-[20vh]">
//         {/* Video container - highly optimized for performance - mobile optimized */}
//         <div
//           ref={videoContainerRef}
//           className="relative mx-auto mb-12 md:mb-16 max-w-4xl will-change-transform perspective-1000"
//         >
//           {/* Transform container with consistent behavior across devices */}
//           <motion.div
//             style={{
//               scale: videoScale,
//               rotateX: videoRotateX,
//               y: videoTranslateY,
//               transformStyle: "preserve-3d",
//               transformOrigin: "center top",
//               willChange: "transform", // Optimization for browsers
//             }}
//             className={`relative rounded-xl overflow-hidden border border-gray-600/30 ${videoGlowClass} ${
//               isMobile ? "mobile-video-container" : ""
//             }`}
//           >
//             {/* Video container with optimized playback */}
//             <div className="relative w-full pt-[56.25%]">
//               <div className="absolute inset-0">
//                 {/* <VideoPlayer
//                   videoUrl={`${import.meta.env.VITE_DO_BUCKET_URL}/invideo-ai-720 Manage Your Credentials with Ease! 2024-12-02.mp4`}
//                   thumbnailUrl="/thumbnail1.jpeg"
//                   playbackQuality={isMobile ? "low" : "high"} // Optional prop to control video quality
//                 /> */}
//                 <VideoPlayer
//                   videoUrl="https://www.youtube.com/watch?v=ryETI3NMTMw"
//                   title="SacredSecret"
//                 />
//               </div>
//             </div>

//             {/* edge effects using CSS classes for better performance */}
//             <div className="absolute bottom-0 left-0 right-0 h-px edge-glow-horizontal"></div>
//             <div className="absolute top-0 left-0 right-0 h-px edge-glow-horizontal"></div>
//             <div className="absolute top-0 bottom-0 left-0 w-px edge-glow-vertical"></div>
//             <div className="absolute top-0 bottom-0 right-0 w-px edge-glow-vertical"></div>

//             {/* corner highlights using CSS classes */}
//             <div className="absolute top-0 left-0 w-4 h-4 corner-glow corner-top-left"></div>
//             <div className="absolute top-0 right-0 w-4 h-4 corner-glow corner-top-right"></div>
//             <div className="absolute bottom-0 left-0 w-4 h-4 corner-glow corner-bottom-left"></div>
//             <div className="absolute bottom-0 right-0 w-4 h-4 corner-glow corner-bottom-right"></div>
//           </motion.div>

//           {/* Reflection effect using CSS class */}
//           <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 w-[85%] md:w-[80%] h-12 reflection-glow"></div>
//         </div>

//         {/* Get Started Button - mobile responsive with styling */}
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.8, delay: 0.8 }}
//           className="flex justify-center mb-12 md:mb-16"
//         >
//           <motion.button
//             whileHover={{
//               scale: 1.03,
//               boxShadow: "0 0 20px rgba(176, 132, 199, 0.35)",
//             }}
//             whileTap={{ scale: 0.97 }}
//             onClick={handleGetStarted}
//             className="px-8 py-3 md:px-10 md:py-4 text-base md:text-lg font-semibold rounded-full bg-gradient-to-r from-indigo-200 via-purple-100 to-pink-100 text-gray-700 transition-all shadow-lg border border-white/20"
//           >
//             Get Started <span className="ml-1">→</span>
//           </motion.button>
//         </motion.div>

//         {/* Description text - mobile responsive */}
//         <motion.div
//           initial={{ opacity: 0, y: 30 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.8, delay: 1 }}
//           className="max-w-4xl mx-auto text-center"
//         >
//           <p className="text-sm sm:text-base md:text-lg leading-relaxed text-gray-300">
//             {words.map((word, index) => (
//               <motion.span
//                 key={index}
//                 variants={wordVariants}
//                 initial="hidden"
//                 animate="visible"
//                 className="inline-block mr-1"
//               >
//                 {word}
//               </motion.span>
//             ))}
//           </p>
//         </motion.div>
//       </div>

//       {/* CSS for optimized effects */}
//       <style jsx>{`
//         .perspective-1000 {
//           perspective: 1000px;
//         }

//         .will-change-transform {
//           will-change: transform;
//         }

//         /* Noise texture */
//         .noise-texture {
//           background-image: url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIiB4PSIwIiB5PSIwIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIgdHlwZT0iZnJhY3RhbE5vaXNlIi8+PGZlQ29sb3JNYXRyaXggdHlwZT0ic2F0dXJhdGUiIHZhbHVlcz0iMCIvPjwvZmlsdGVyPjxwYXRoIGQ9Ik0wIDBoMzAwdjMwMEgweiIgZmlsdGVyPSJ1cmwoI2EpIiBvcGFjaXR5PSIuMDUiLz48L3N2Zz4=");
//           background-repeat: repeat;
//         }

//         /* Static gradients for better performance */
//         .bg-gradient-radial-blue {
//           background: radial-gradient(
//             circle at 30% 20%,
//             rgba(79, 70, 229, 0.03) 0%,
//             transparent 50%
//           );
//         }

//         .bg-gradient-radial-purple {
//           background: radial-gradient(
//             circle at 70% 60%,
//             rgba(124, 58, 237, 0.04) 0%,
//             transparent 50%
//           );
//         }

//         /* Edge glows */
//         .edge-glow-horizontal {
//           background: linear-gradient(
//             to right,
//             transparent,
//             rgba(59, 130, 246, 0.4),
//             transparent
//           );
//         }

//         .edge-glow-vertical {
//           background: linear-gradient(
//             to bottom,
//             transparent,
//             rgba(59, 130, 246, 0.3),
//             transparent
//           );
//         }

//         /* Corner glows */
//         .corner-glow {
//           opacity: 0.8;
//         }

//         .corner-top-left {
//           background: radial-gradient(
//             circle at top left,
//             rgba(59, 130, 246, 0.2),
//             transparent 70%
//           );
//           border-top-left-radius: 0.75rem;
//         }

//         .corner-top-right {
//           background: radial-gradient(
//             circle at top right,
//             rgba(59, 130, 246, 0.2),
//             transparent 70%
//           );
//           border-top-right-radius: 0.75rem;
//         }

//         .corner-bottom-left {
//           background: radial-gradient(
//             circle at bottom left,
//             rgba(59, 130, 246, 0.2),
//             transparent 70%
//           );
//           border-bottom-left-radius: 0.75rem;
//         }

//         .corner-bottom-right {
//           background: radial-gradient(
//             circle at bottom right,
//             rgba(59, 130, 246, 0.2),
//             transparent 70%
//           );
//           border-bottom-right-radius: 0.75rem;
//         }

//         /* Reflection glow */
//         .reflection-glow {
//           background: radial-gradient(
//             ellipse at center,
//             rgba(59, 130, 246, 0.08) 0%,
//             rgba(79, 70, 229, 0.04) 50%,
//             transparent 100%
//           );
//           filter: blur(8px);
//         }

//         /* Bottom accent glow */
//         .bottom-accent-glow {
//           background: linear-gradient(
//             to right,
//             transparent,
//             rgba(59, 130, 246, 0.7),
//             transparent
//           );
//           box-shadow: 0 0 15px rgba(59, 130, 246, 0.6);
//         }

//         /* Video glow states using CSS instead of JS for better performance */
//         .video-glow-dynamic {
//           box-shadow: 0 0 15px rgba(59, 130, 246, 0.3);
//           transition: box-shadow 0.5s ease;
//         }

//         .video-glow-static {
//           box-shadow: 0 0 25px rgba(59, 130, 246, 0.4);
//         }

//         /* Mobile-specific video container */
//         .mobile-video-container {
//           transform-style: preserve-3d !important;
//         }

//         /* Enhanced video container with hardware acceleration */
//         .video-container {
//           transform: translateZ(0);
//           backface-visibility: hidden;
//         }

//         /* Full-screen fixed background video */
//         .fixed-video {
//           position: fixed;
//           top: 0;
//           left: 0;
//           min-width: 100%;
//           min-height: 100%;
//           width: auto;
//           height: auto;
//         }

//         /* Mobile-specific styles */
//         @media (max-width: 767px) {
//           /* Ensure consistent curved effect on mobile */
//           .mobile-video-container {
//             transform-origin: center top !important;
//           }

//           /* Ensure video fills curved container on mobile */
//           .video-container {
//             height: 100%;
//             object-fit: cover;
//             object-position: center;
//           }
//         }

//         /* Optimize animations for reduced motion preferences */
//         @media (prefers-reduced-motion: reduce) {
//           * {
//             animation-duration: 0.01ms !important;
//             animation-iteration-count: 1 !important;
//             transition-duration: 0.01ms !important;
//             scroll-behavior: auto !important;
//           }
//         }
//       `}</style>
//     </div>
//   );
// };

// export default Hero;


import React, { useEffect, useRef, useState, useMemo } from "react";
import { motion, useScroll, useTransform, useAnimation } from "framer-motion";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import VideoPlayer from "./VideoPlayer";
import NotificationSystem from "@/pages/notifications/NotificationCardToast";

const Hero = () => {
  const containerRef = useRef(null);
  const videoContainerRef = useRef(null);
  const { scrollY } = useScroll();
  const navigate = useNavigate();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const controls = useAnimation();
  const contentControls = useAnimation();
  const [isMobile, setIsMobile] = useState(false);
  const [hasPassedThreshold, setHasPassedThreshold] = useState(false);

  //  Debounce scroll handler
  const handleScroll = useMemo(() => {
    return () => {
      const scrollPosition = window.scrollY;
      if (scrollPosition > 300 && !hasPassedThreshold) {
        setHasPassedThreshold(true);
      } else if (scrollPosition <= 300 && hasPassedThreshold) {
        setHasPassedThreshold(false);
      }
    };
  }, [hasPassedThreshold]);

  // Add optimized scroll listener
  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  // Check for mobile viewport with debouncing
  useEffect(() => {
    let timeoutId;
    const checkMobile = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        setIsMobile(window.innerWidth < 768);
      }, 100);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile, { passive: true });

    return () => {
      window.removeEventListener("resize", checkMobile);
      clearTimeout(timeoutId);
    };
  }, []);

  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  // Parallax effects
  const y = useTransform(scrollY, [0, 300], [0, 100]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  const handleGetStarted = async () => {
    if (isAuthenticated) {
      const featuresSection = document.getElementById("features");
      if (featuresSection) {
        featuresSection.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      await Promise.all([
        controls.start({
          y: [0, window.innerHeight],
          scale: [1, 2],
          transition: { duration: 1.5, ease: "easeInOut" },
        }),
        contentControls.start({
          opacity: 0,
          transition: { duration: 0.75, ease: "easeOut" },
        }),
      ]);

      navigate("/signup");
    }
  };

  return (
    <div
      ref={containerRef}
      className="relative h-screen bg-[#050816] overflow-hidden py-10 md:py-8"
    >
      {/* Background Base Layer */}
      <div className="absolute inset-0 bg-[#050816]"></div>

      {/* Parallax Animated Background */}
      <motion.div
        style={{ y, opacity }}
        className="absolute inset-0 w-full h-full"
      >
        {/* Background Video */}
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-60"
        >
          <source
            src={`${
              import.meta.env.VITE_DO_BUCKET_URL
            }/assets/Images/Grandpa_Gathering.mp4`}
            type="video/mp4"
          />
        </video>

        {/* Dynamic Multi-Layer Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#050816]/90 via-[#050816]/60 to-[#050816]/90 mix-blend-overlay"></div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-600/10 via-transparent to-transparent opacity-80 mix-blend-screen"></div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-purple-600/10 via-transparent to-transparent opacity-80 mix-blend-color-dodge"></div>

        {/* Grid Elements with Pulse Effect */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBzdHJva2U9IiM0MzM4REQiIHN0cm9rZS13aWR0aD0iMC41IiBzdHJva2Utb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMCAwIEw2MCA2MCIvPjxwYXRoIGQ9Ik02MCAwIEwwIDYwIi8+PHBhdGggZD0iTTMwIDAgTDMwIDYwIi8+PHBhdGggZD0iTTAgMzAgTDYwIDMwIi8+PC9nPjwvc3ZnPg==')] opacity-10 animate-pulse-slow"></div>
      </motion.div>

      {/* Interactive Animated Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* 3D Particle System */}
        <div className="particles-3d-container absolute inset-0 opacity-40 pointer-events-none">
          {[...Array(30)].map((_, i) => (
            <div
              key={i}
              className="particle-3d absolute rounded-full"
              style={{
                width: `${Math.random() * 3 + 1}px`,
                height: `${Math.random() * 3 + 1}px`,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                background:
                  Math.random() > 0.5 ? "#38bdf8" : "rgba(168, 85, 247, 0.8)",
                boxShadow:
                  Math.random() > 0.5
                    ? "0 0 10px #38bdf8"
                    : "0 0 10px #a855f7",
                animation: `float-particle ${
                  Math.random() * 20 + 15
                }s linear infinite`,
                animationDelay: `${Math.random() * 5}s`,
              }}
            ></div>
          ))}
        </div>

        {/* Neon Data Streams */}
        <div className="absolute inset-0 data-streams opacity-15">
          {[...Array(6)].map((_, i) => (
            <div
              key={`hline-${i}`}
              className="absolute h-px left-0 right-0 bg-gradient-to-r from-transparent via-blue-500 to-transparent"
              style={{
                top: `${(i + 1) * 15}%`,
                animation: `data-stream-pulse ${4 + Math.random() * 3}s infinite ${
                  i % 2 === 0 ? "alternate" : "alternate-reverse"
                }`,
              }}
            ></div>
          ))}
        </div>

        
      </div>

      {/* Notification System */}
      {isAuthenticated && (
        <div className="absolute top-20 right-2 z-30 pointer-events-none">
          <NotificationSystem className="pointer-events-auto" />
        </div>
      )}

      {/* Main Content Container */}
      <div className="relative z-20 h-screen flex flex-col justify-center">
        <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
          <div className="w-full max-w-7xl mx-auto">
            {/* Header Section */}
            <div className="text-center w-full mb-8 md:mb-12 lg:mb-16">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-3 md:mb-4 leading-tight"
              >
                Empower{" "}
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
                  Yourself
                </span>
              </motion.h1>

              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold text-gray-200 mb-4 md:mb-6"
              >
                with{" "}
                <span className="font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-300 to-blue-500">
                  SacredSecret
                </span>
              </motion.h2>

              <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mb-4 md:mb-6 rounded-full"></div>
            </div>

            {/* Two-Column Layout - Perfectly Aligned */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
              {/* Left Column: Text Content */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="flex flex-col justify-center space-y-4 lg:pr-8"
              >
                {/* Description Text */}
                <div className="space-y-3">
                  <p className="text-base md:text-lg lg:text-xl text-gray-100 leading-normal">
                    <span className="text-cyan-400 font-semibold">
                      SacredSecret
                    </span>{" "}
                    empowers individuals with rights over their assets, both in{" "}
                    <span className="text-blue-400 font-semibold">
                      digital and physical form
                    </span>
                    . The name allows users to select their nominee according to their wishes and choose who will inherit or access their assets.{" "}

                    <span className="text-purple-400 font-semibold">
                      'Sacred'
                    </span>{" "}
                    refers to the sanctity of their will, which is kept a{" "}
                    <span className="text-cyan-400 font-semibold">
                      Secret
                    </span>
                    , shared only with the chosen individual, and independent of defined societal/system norms.
                  </p>
                </div>

                {/* CTA Button */}
                <div className="flex justify-start">
                  <motion.button
                    whileHover={{
                      scale: 1.05,
                      boxShadow: "0 0 30px rgba(176, 132, 199, 0.5)",
                    }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleGetStarted}
                    className="px-8 py-3 md:px-10 md:py-4 text-sm md:text-base font-bold rounded-full bg-gradient-to-r from-indigo-100 via-cyan-100 to-purple-100 text-gray-900 transition-all shadow-xl border border-white/40 relative overflow-hidden group"
                  >
                    {/* Light Effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-indigo-200/0 via-white/70 to-indigo-200/0 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                    <span className="relative z-10 flex items-center">
                      Get Started{" "}
                      <span className="ml-2 transform group-hover:translate-x-1 transition-transform">
                        →
                      </span>
                    </span>
                  </motion.button>
                </div>
              </motion.div>

              {/* Right Column: Video */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="flex justify-center items-center"
              >
                {/* Video Container */}
                <div
                  ref={videoContainerRef}
                  className="w-full"
                >
                  {/* Video with Styling */}
                  <div className="relative rounded-xl lg:rounded-2xl overflow-hidden shadow-2xl border border-white/20 video-frame">
                    {/* Corner Accents */}
                    <div className="absolute top-0 left-0 w-12 h-12 md:w-16 md:h-16 border-t-2 border-l-2 border-blue-400/70 rounded-tl-xl lg:rounded-tl-2xl z-20"></div>
                    <div className="absolute bottom-0 right-0 w-12 h-12 md:w-16 md:h-16 border-b-2 border-r-2 border-purple-500/70 rounded-br-xl lg:rounded-br-2xl z-20"></div>

                    {/* Video Player */}
                    <div
                      className="relative z-10"
                      style={{ aspectRatio: "16/9" }}
                    >
                      <VideoPlayer
                        videoUrl="https://www.youtube.com/watch?v=ryETI3NMTMw"
                        title="SacredSecret"
                      />

                      {/* Video Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/20 to-black/10 pointer-events-none z-10">
                        {/* Scan Lines */}
                        <div className="absolute inset-0 scan-lines-subtle"></div>
                      </div>
                    </div>

                    {/* Glow effect on edges */}
                    <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-400 to-transparent"></div>
                    <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-400 to-transparent"></div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* Custom Styles */}
      <style jsx>{`
        /* Video frame styling */
        .video-frame {
          position: relative;
          background: rgba(8, 8, 30, 0.4);
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.4),
            0 0 40px rgba(56, 189, 248, 0.15);
          transition: transform 0.3s ease-out, box-shadow 0.3s ease-out;
        }

        .video-frame:hover {
          transform: translateY(-5px);
          box-shadow: 0 25px 70px rgba(0, 0, 0, 0.5),
            0 0 50px rgba(56, 189, 248, 0.25);
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
          pointer-events: none;
        }

        /* Scan Lines Effect */
        .scan-lines-subtle {
          background-image: repeating-linear-gradient(
            0deg,
            rgba(56, 189, 248, 0.03),
            rgba(56, 189, 248, 0.03) 1px,
            transparent 1px,
            transparent 2px
          );
          background-size: 100% 4px;
          animation: scan-animation 10s linear infinite;
        }

        /* Particle floating animation */
        @keyframes float-particle {
          0% {
            transform: translate(0, 0);
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
              calc(var(--random-x, 50) * 1px),
              calc(var(--random-y, -500) * 1px)
            );
            opacity: 0;
          }
        }

        /* Data stream pulse */
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

        /* Scan animation */
        @keyframes scan-animation {
          0% {
            background-position: 0 0;
          }
          100% {
            background-position: 0 100%;
          }
        }

        /* Pulse slow animation */
        .animate-pulse-slow {
          animation: pulse-slow 5s ease-in-out infinite;
        }

        @keyframes pulse-slow {
          0%,
          100% {
            opacity: 0.1;
          }
          50% {
            opacity: 0.15;
          }
        }

        /* Spin animations */
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

        /* Responsive adjustments */
        @media (max-width: 1024px) {
          .video-frame {
            box-shadow: 0 15px 40px rgba(0, 0, 0, 0.3),
              0 0 30px rgba(56, 189, 248, 0.1);
          }
        }

        @media (max-width: 768px) {
          .scan-lines-subtle {
            opacity: 0.5;
          }
        }
      `}</style>
    </div>
  );
};

export default Hero;