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

  const handleGetStarted = () => {
    if (!isAuthenticated) {
      navigate("/signin", { state: { from: "/payment" } });
      return;
    }

    navigate("/payment/success", {
      state: {
        subscription: {
          id: "starter",
          title: "Free Forever Plan",
          price: 0,
          features: [
            "Store unlimited credentials",
            "Secure encryption",
            "Multi-factor authentication",
            "Mobile access",
            "Email support",
            "Regular security updates",
          ],
        },
        orderId: "free_" + Math.random().toString(36).substr(2, 9),
      },
    });
  };
  const y = useTransform(scrollY, [0, 300], [0, 100]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);
  return (
    <div className="min-h-screen bg-dark-100">
      {/* Hero Section */}

      <section
        ref={videoRef}
        className="relative min-h-screen overflow-visible flex flex-col justify-start py-8 md:py-16"
      >
        {/* Background Base Layer */}
        <div className="absolute inset-0 bg-[#050816]"></div>

        {/* Parallax Animated Background */}
        <motion.div
          style={{ y, opacity }}
          className="absolute inset-0 w-full h-full"
        >
          {/* Cinematic Background Video with Custom Masking */}
          <video
            autoPlay
            muted
            loop
            playsInline
            id="bg-video"
            className="absolute inset-0 w-full h-auto object-cover opacity-60"
          >
            <source
              src={`${import.meta.env.VITE_DO_BUCKET_URL}/assets/Images/managecredentials.mp4`}
              type="video/mp4"
            />
          </video>

          {/* Dynamic Multi-Layer Gradient Overlays with Custom Blend Modes */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#050816]/90 via-[#050816]/60 to-[#050816]/90 mix-blend-overlay"></div>
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-600/10 via-transparent to-transparent opacity-80 mix-blend-screen"></div>
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-purple-600/10 via-transparent to-transparent opacity-80 mix-blend-color-dodge"></div>

          {/* Grid Elements with Pulse Effect */}
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

          {/* Holographic Orbital Elements with Depth Effect */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150vw] h-[150vw] border border-blue-400/10 rounded-full animate-spin-very-slow blur-sm"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120vw] h-[120vw] border border-cyan-400/8 rounded-full animate-spin-moderate"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[100vw] h-[100vw] border border-purple-500/10 rounded-full animate-spin-slow-reverse holographic-edge"></div>
        </div>

        {/* Content Container with Fixed Positioning */}
        <div className="relative z-10 container mx-auto px-4 md:px-6 pt-10 sm:pt-16 md:pt-20">
          <div className="w-full max-w-7xl mx-auto relative">
            {/* Main Content Area - Starting at Top of Screen */}
            <div className="flex flex-col items-center">
              {/* Enterprise-Grade Header Section */}
              <div className="text-center w-full mb-8">
                <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold text-white mb-6 leading-tight enterprise-heading">
                  Manage Your{" "}
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
                    Credentials
                  </span>
                </h1>

                <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-gray-200 mb-8">
                  with{" "}
                  <span className="font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-300 to-blue-500">
                    SacredSecret
                  </span>
                </h2>

                <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mb-8 rounded-full"></div>
                {/*           
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Store all your credentials in one centralized location with enterprise-grade security and seamless access.
          </p> */}
              </div>

              {/* Two-Column Layout */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center mt-4">
                {/* Left Column: Text Content */}
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="relative p-8 md:p-10 flex flex-col justify-center z-10" // for glass effect use neo-glass
                  whileHover={{ scale: 1.01, transition: { duration: 0.3 } }}
                >
                  {/* Text Content - Original */}
                  <p className="text-lg md:text-2xl text-gray-100 leading-relaxed dynamic-text">
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

                  {/* CTA Button - Original */}
                  <div className="mt-6 md:mt-8 flex justify-start">
                    <motion.button
                      whileHover={{
                        scale: 1.03,
                        boxShadow: "0 0 20px rgba(176, 132, 199, 0.3)",
                      }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleGoToDown}
                      className="px-8 py-3 md:px-10 md:py-4 text-base md:text-lg font-semibold rounded-full bg-gradient-to-r from-indigo-100 via-cyan-100 to-purple-100 text-gray-800 transition-all shadow-lg border border-white/30 relative overflow-hidden group neo-button"
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

                {/* Right Column: Video - Similar to Original */}
                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="relative flex justify-center items-start"
                >
                  {/* Video Container */}
                  <div className="w-full max-w-xl mx-auto">
                    {/* Video with Original Styling */}
                    <div className="relative rounded-2xl overflow-hidden shadow-xl group border border-white/20 video-frame">
                      {/* Corner Accents */}
                      <div className="absolute top-0 left-0 w-16 h-16 border-t border-l border-blue-400/70 rounded-tl-2xl z-20"></div>
                      <div className="absolute bottom-0 right-0 w-16 h-16 border-b border-r border-purple-500/70 rounded-br-2xl z-20"></div>

                      {/* Video Player */}
                      <div
                        className="relative z-10"
                        style={{ aspectRatio: "16/9" }}
                      >
                        <VideoPlayer
                          videoUrl={`${import.meta.env.VITE_DO_BUCKET_URL}/assets/Images/managecredentials.mp4`}
                          thumbnailUrl={`${import.meta.env.VITE_DO_BUCKET_URL}/assets/Images/managecredentials_thumbnail.jpg`}
                          title="Manage Your Credentials"
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

              {/* Clean Scroll Indicator */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2, duration: 0.8 }}
                className="mt-12 transform"
              >
                <div className="flex flex-col items-center gap-2">
                  <motion.div
                    animate={{ y: [0, 8, 0] }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    className="w-8 h-14 rounded-full border-2 border-cyan-400/50 flex items-center justify-center cursor-pointer glow-pulse"
                    onClick={handleGoToDown}
                  >
                    <motion.div
                      animate={{ y: [0, 6, 0] }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                      className="w-1.5 h-3 bg-gradient-to-b from-cyan-400 to-purple-500 rounded-full neon-glow"
                    ></motion.div>
                  </motion.div>
                  <span className="text-xs text-cyan-400/80 uppercase tracking-widest font-medium letter-spacing-wide">
                    Explore
                  </span>
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Enhanced Custom Script */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
        document.addEventListener('DOMContentLoaded', function() {
          initializeVideoPlayer();
          initialize3DParticles();
          initializeDataStreams();
          initializeHolographicEffect();
          initializeMouseInteractivity();
        });
        
        // Video Player with Analytics
        function initializeVideoPlayer() {
          const video = document.getElementById('feature-video');
          const playButton = document.getElementById('play-button');
          const videoControls = document.getElementById('video-controls');
          
          if (!video || !playButton) return;
          
          // click handling with analytics
          playButton.addEventListener('click', function(e) {
            e.stopPropagation();
            
            if (video.paused || video.ended) {
              video.play().then(() => {
                playButton.style.display = 'none';
                videoControls.classList.remove('hidden');
                // Track engagement
                if (typeof analytics !== 'undefined') {
                  analytics.track('Video Played', { title: 'Manage Your Credentials' });
                }
              }).catch(error => {
                console.error("Error playing video:", error);
              });
            } else {
              video.pause();
              playButton.style.display = 'flex';
            }
          });
          
          // video ending
          video.addEventListener('ended', function() {
            playButton.style.display = 'flex';
            // Show CTA overlay
            const ctaOverlay = document.createElement('div');
            ctaOverlay.className = 'absolute inset-0 flex items-center justify-center bg-black/50 z-30';
            ctaOverlay.innerHTML = '<div class="text-center p-6"><h3 class="text-xl text-white mb-3">Ready to secure your credentials?</h3><button class="px-6 py-2 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full text-white font-medium">Get Started</button></div>';
            video.parentElement.appendChild(ctaOverlay);
          });
        }
        
        // 3D Particle System with Mouse Interaction
        function initialize3DParticles() {
          const container = document.querySelector('.particles-3d-container');
          if (!container) return;
          
          // Create dynamic 3D particles with depth
          for (let i = 0; i < 40; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle-3d';
            
            // randomization for immersive effect
            const size = Math.random() * 4 + 1;
            const depth = Math.random() * 100; // Z-depth for 3D effect
            const colorClass = Math.random() > 0.6 ? 'particle-blue' : (Math.random() > 0.5 ? 'particle-cyan' : 'particle-purple');
            
            particle.classList.add(colorClass);
            particle.style.width = size + 'px';
            particle.style.height = size + 'px';
            particle.style.position = 'absolute';
            particle.style.borderRadius = '50%';
            particle.style.top = Math.random() * 100 + '%';
            particle.style.left = Math.random() * 100 + '%';
            particle.style.opacity = Math.random() * 0.7 + 0.3;
            particle.style.transform = \`translateZ(\${depth}px)\`;
            
            // animation with variable parameters
            const duration = Math.random() * 15 + 15;
            const delay = Math.random() * 10;
            particle.style.animation = \`float-particle-3d \${duration}s linear infinite\`;
            particle.style.animationDelay = delay + 's';
            
            // Store original position for interactive movement
            particle.dataset.x = particle.style.left;
            particle.dataset.y = particle.style.top;
            particle.dataset.z = depth;
            
            container.appendChild(particle);
          }
        }
        
        // Data Stream Animation with Reactive Behavior
        function initializeDataStreams() {
          const dataLines = document.querySelectorAll('.data-line');
          dataLines.forEach((line, index) => {
            // Create more natural, varied animation
            const baseDelay = (index * 0.7);
            const duration = 4 + (Math.random() * 4);
            line.style.animationDelay = baseDelay + 's';
            line.style.animation = \`data-stream-pulse \${duration}s infinite \${index % 2 === 0 ? 'alternate' : 'alternate-reverse'}\`;
            
            // Add pulse sparks to certain lines
            if (index % 3 === 0) {
              const spark = document.createElement('div');
              spark.className = 'data-spark';
              line.appendChild(spark);
            }
          });
        }
        
        // Holographic Tilt Effect with Depth
        function initializeHolographicEffect() {
          const tiltElement = document.querySelector('.holographic-tilt');
          if (!tiltElement) return;
          
          const inner = tiltElement.querySelector('.holographic-inner');
          const glowEffect = tiltElement.querySelector('.holo-glow');
          
          tiltElement.addEventListener('mousemove', e => {
            if (!inner) return;
            
            const rect = tiltElement.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            
            const percentX = (e.clientX - centerX) / (rect.width / 2);
            const percentY = -(e.clientY - centerY) / (rect.height / 2);
            
            // 3D rotation with depth
            const rotateX = percentY * 10;
            const rotateY = percentX * 10;
            const translateZ = 50; // Add depth
            
            inner.style.transform = \`perspective(1000px) rotateX(\${rotateX}deg) rotateY(\${rotateY}deg) translateZ(\${translateZ}px)\`;
            
            // dynamic lighting effect that follows cursor
            if (glowEffect) {
              glowEffect.style.opacity = '0.8';
              glowEffect.style.background = \`radial-gradient(circle at \${e.clientX - rect.left}px \${e.clientY - rect.top}px, rgba(56, 189, 248, 0.6) 0%, rgba(139, 92, 246, 0.6) 50%, transparent 100%)\`;
            }
            
            // Add reflection effect
            const reflectionX = (e.clientX - rect.left) / rect.width * 100;
            const reflectionY = (e.clientY - rect.top) / rect.height * 100;
            inner.style.setProperty('--reflectionX', \`\${reflectionX}%\`);
            inner.style.setProperty('--reflectionY', \`\${reflectionY}%\`);
          });
          
          tiltElement.addEventListener('mouseleave', () => {
            if (!inner) return;
            // Smooth reset animation
            inner.style.transition = 'transform 0.5s ease-out';
            inner.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)';
            
            setTimeout(() => {
              inner.style.transition = '';
            }, 500);
            
            if (glowEffect) {
              glowEffect.style.opacity = '0';
            }
          });
        }
        
        // Interactive Mouse Movement Effect on Page Elements
        function initializeMouseInteractivity() {
          document.addEventListener('mousemove', e => {
            const mouseX = e.clientX;
            const mouseY = e.clientY;
            
            // Move particles in relation to mouse
            const particles = document.querySelectorAll('.particle-3d');
            particles.forEach(particle => {
              const depth = parseFloat(particle.dataset.z) || 0;
              const moveFactor = depth / 1000; // Deeper particles move more
              
              const moveX = (mouseX - window.innerWidth / 2) * moveFactor;
              const moveY = (mouseY - window.innerHeight / 2) * moveFactor;
              
              particle.style.transform = \`translate(\${moveX}px, \${moveY}px) translateZ(\${depth}px)\`;
            });
            
            // Interactive text shadow on headings
            const headings = document.querySelectorAll('.perspective-text h1, .perspective-text h2');
            headings.forEach(heading => {
              const rect = heading.getBoundingClientRect();
              const centerX = rect.left + rect.width / 2;
              const centerY = rect.top + rect.height / 2;
              
              const percentX = (mouseX - centerX) / (window.innerWidth / 2) * 10;
              const percentY = (mouseY - centerY) / (window.innerHeight / 2) * 5;
              
              heading.style.textShadow = \`\${percentX}px \${percentY}px 15px rgba(0, 0, 0, 0.3), 
                                        \${-percentX}px \${-percentY}px 5px rgba(56, 189, 248, 0.3)\`;
            });
          });
        }
      `,
          }}
        />

        {/* Custom Styles with Advanced Effects */}
        <style jsx>{`
          /* Neo-Morphic Glass Effect with Depth */
          .neo-glass {
            position: relative;
            background: rgba(8, 8, 30, 0.25);
            backdrop-filter: blur(10px);
            border-radius: 20px;
            border: 1px solid rgba(255, 255, 255, 0.08);
            box-shadow: 0 15px 35px rgba(0, 0, 0, 0.25),
              0 5px 15px rgba(0, 0, 0, 0.1),
              inset 0 1px 1px rgba(255, 255, 255, 0.1);
            overflow: hidden;
            transition: all 0.5s ease;
          }

          .neo-glass:before {
            content: "";
            position: absolute;
            inset: 0;
            background: linear-gradient(
              120deg,
              transparent,
              rgba(56, 189, 248, 0.08),
              transparent
            );
            transform: translateX(-100%);
            animation: neo-shine 8s infinite;
            z-index: -1;
          }

          /* 3D Typography Effects */
          /* Enterprise-grade heading style */
          .enterprise-heading {
            letter-spacing: -0.02em;
            line-height: 1.1;
            font-weight: 800;
            text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
          }

          /* Video container styling */
          .video-container {
            position: relative;
            overflow: hidden;
            border-radius: 0.75rem;
            width: 100%;
            aspect-ratio: 16/9;
            background-color: rgba(17, 24, 39, 0.7);
            box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.2),
              0 10px 10px -5px rgba(0, 0, 0, 0.1);
          }

          .text-gradient-animated {
            background: linear-gradient(
              to right,
              #38bdf8,
              #818cf8,
              #c084fc,
              #38bdf8
            );
            background-size: 200% auto;
            background-clip: text;
            -webkit-background-clip: text;
            color: transparent;
            animation: gradient-text 6s linear infinite;
          }

          /* Futuristic Button Styling */
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

          /* Premium Text Highlighting */
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

          /* Holographic Card Effects */
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

          /* Professional animation speeds */
          .animate-pulse-slow {
            animation: pulse-slow 5s ease-in-out infinite;
          }

          /* Professional text styles */
          .professional-text {
            letter-spacing: 0.01em;
            line-height: 1.6;
          }

          /* Premium Scan Lines Effect */
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

          /* Advanced Floating Orbs */
          .glass-orb {
            position: relative;
            overflow: hidden;
          }

          .glass-orb:before {
            content: "";
            position: absolute;
            top: -50%;
            left: -50%;
            width: 200%;
            height: 200%;
            background: radial-gradient(
              circle at 30% 30%,
              rgba(255, 255, 255, 0.2) 0%,
              rgba(255, 255, 255, 0.1) 10%,
              rgba(255, 255, 255, 0.05) 20%,
              transparent 70%
            );
            transform: rotate(-30deg);
          }

          /* Neon Glow Effects */
          .neon-glow {
            box-shadow: 0 0 5px rgba(56, 189, 248, 0.7),
              0 0 10px rgba(56, 189, 248, 0.5);
          }

          .glow-pulse {
            animation: glow-pulsate 3s infinite alternate;
          }

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

          /* Liquid Underline Animation */
          .liquid-underline {
            position: relative;
            overflow: hidden;
          }

          .liquid-underline:after {
            content: "";
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: linear-gradient(
              90deg,
              transparent,
              rgba(56, 189, 248, 0.8),
              transparent
            );
            animation: liquid-flow 3s infinite;
          }

          /* Special clip path for video */
          .clip-path-polygon {
            clip-path: polygon(
              0 5%,
              5% 0,
              95% 0,
              100% 5%,
              100% 95%,
              95% 100%,
              5% 100%,
              0 95%
            );
          }

          /* 3D Text with Depth */
          .perspective-text {
            transform-style: preserve-3d;
            perspective: 1000px;
          }

          .3d-text {
            transform: translateZ(10px);
          }

          /* Data Spark Animation */
          .data-spark {
            position: absolute;
            width: 4px;
            height: 4px;
            background: white;
            border-radius: 50%;
            box-shadow: 0 0 10px #38bdf8, 0 0 20px #38bdf8;
            animation: spark-travel 3s infinite linear;
          }

          /* Particle System colors */
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

          /* Letter Spacing Utilities */
          .letter-spacing-wide {
            letter-spacing: 0.05em;
          }

          /* Enhanced Animations */
          @keyframes neo-shine {
            0% {
              transform: translateX(-100%);
            }
            20%,
            100% {
              transform: translateX(100%);
            }
          }

          @keyframes gradient-text {
            0% {
              background-position: 0% 50%;
            }
            100% {
              background-position: 200% 50%;
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

          @keyframes glow-pulsate {
            0% {
              box-shadow: 0 0 5px rgba(56, 189, 248, 0.5);
            }
            100% {
              box-shadow: 0 0 20px rgba(56, 189, 248, 0.8),
                0 0 30px rgba(139, 92, 246, 0.5);
            }
          }

          @keyframes liquid-flow {
            0% {
              transform: translateX(-100%) skewX(-15deg);
            }
            50% {
              transform: translateX(0%) skewX(0deg);
            }
            100% {
              transform: translateX(100%) skewX(15deg);
            }
          }

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

          @keyframes pulse-slow {
            0%,
            100% {
              opacity: 1;
            }
            50% {
              opacity: 0.7;
            }
          }

          @keyframes float-slow {
            0%,
            100% {
              transform: translateY(0);
            }
            50% {
              transform: translateY(-10px);
            }
          }

          /* Advanced Spin Animations */
          .animate-spin-very-slow {
            animation: spin 120s linear infinite;
          }

          .animate-spin-moderate {
            animation: spin 60s linear infinite;
          }

          .animate-spin-slow-reverse {
            animation: spin 80s linear infinite reverse;
          }

          .animate-pulse-slow {
            animation: pulse-slow 8s ease-in-out infinite;
          }

          @keyframes spin {
            from {
              transform: translate(-50%, -50%) rotate(0deg);
            }
            to {
              transform: translate(-50%, -50%) rotate(360deg);
            }
          }

          /* Media Queries for Responsive Design */
          @media (max-width: 768px) {
            .neo-glass {
              padding: 6vw;
            }

            .holographic-inner:after {
              opacity: 0.3;
            }

            .text-shadow-neon {
              text-shadow: 0 0 3px rgba(56, 189, 248, 0.7),
                0 0 6px rgba(56, 189, 248, 0.5);
            }
          }
        `}</style>
      </section>

      {/* Credential Types Section */}
      <CredentialTypes />

      {/* Security Features Section */}
      <SecurityFeatures />

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
