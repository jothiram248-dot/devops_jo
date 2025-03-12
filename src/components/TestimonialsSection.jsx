import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useScroll, useTransform } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

const ArticlesSection = () => {
  const articles = [
    {
      id: 1,
      content:
        "Over Rs 82,000 crore in unclaimed assets are lying in forgotten investments, including dormant bank accounts, insurance policy maturity income, and life savings in inactive Provident Fund accounts.",
    },
    {
      id: 2,
      content:
        "With 700 million Indians using smartphones, the average individual has at least 30-50 online accounts registered through email IDs, phone numbers, or both.",
    },
    {
      id: 3,
      content:
        "Globally, SaaS waste (Software as a Service being bought but not used) increases by 80% annually, while abandoned subscriptions rise by as much as 100%.",
    },
    {
      id: 4,
      content:
        "As per RBI, 11.6 million bank-issued gift cards worth Rs 85.25 crore expired as of December 31, 2022. This speaks volumes about the expired economy.",
    },
    {
      id: 5,
      content:
        "In 2024 alone, an Indian FinTech company sent 591 million reminders to its members, saving ₹1,100 crores in late fees on their credit card bills. This speaks volumes about the forgetting economy.",
    },
  ];
  const [activeIndex, setActiveIndex] = useState(0);
  const sectionRef = useRef(null);
  
  // Enhanced scroll-based animation for prominent zoom effect
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"] 
  });

  // Enhanced zoom effect when scrolling into view
  const scale = useTransform(
    scrollYProgress,
    [0, 0.2, 0.5, 0.8, 1],
    [0.8, 1, 1.2, 1, 0.8]
  );
  
  // Transform for the content element with stronger zoom effect
  const contentScale = useTransform(
    scrollYProgress,
    [0, 0.3, 0.5, 0.7, 1],
    [0.85, 1.1, 1.25, 1.1, 0.85]
  );

  // Opacity transform
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.1, 0.9, 1],
    [0, 1, 1, 0]
  );

  // Navigation handlers
  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? articles.length - 1 : prev - 1));
  };
  
  const handleNext = () => {
    setActiveIndex((prev) => (prev === articles.length - 1 ? 0 : prev + 1));
  };

  // Auto-rotate articles with proper cleanup
  useEffect(() => {
    let interval = null;
    
    const handleVisibilityChange = () => {
      if (!sectionRef.current) return;
      
      const rect = sectionRef.current.getBoundingClientRect();
      const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
      
      if (isVisible) {
        if (!interval) {
          interval = setInterval(handleNext, 6000);
        }
      } else {
        if (interval) {
          clearInterval(interval);
          interval = null;
        }
      }
    };

    // Initial check
    handleVisibilityChange();
    
    // Set up scroll event listener with throttling
    const throttledCheck = () => {
      let ticking = false;
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleVisibilityChange();
          ticking = false;
        });
        ticking = true;
      }
    };
    
    window.addEventListener('scroll', throttledCheck);
    
    // Cleanup function
    return () => {
      if (interval) clearInterval(interval);
      window.removeEventListener('scroll', throttledCheck);
    };
  }, [activeIndex]);

  return (
    <>
      {/* Modern top border */}
      <div className="relative w-full h-px">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-accent-100 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-30 blur-sm"></div>
      </div>
      
      <section
        ref={sectionRef}
        className="relative py-20 bg-gradient-to-b from-gray-950 to-black overflow-hidden"
        id="articles"
      >
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

        <motion.div
          className="container mx-auto px-6 relative z-10"
          style={{ 
            scale: scale,
            opacity: opacity,
          }}
        >
          {/* Modern section title */}
          <div className="text-center mb-20">
            <div className="inline-block">
              <h2 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-accent-100 via-blue-400 to-accent-100">
                Did You Know?
              </h2>
              <div className="h-1 w-24 mx-auto mt-6 bg-gradient-to-r from-accent-100 to-blue-400 rounded-full"></div>
            </div>
          </div>

          {/* Premium content container */}
          <motion.div 
            className="relative max-w-3xl mx-auto"
            style={{ scale: contentScale }}
          >
            {/* Modern navigation buttons */}
            <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 flex justify-between pointer-events-none z-20">
              <motion.button
                onClick={handlePrev}
                className="p-2 text-white hover:text-accent-100 transition-all duration-300 pointer-events-auto"
                whileHover={{ scale: 1.1, x: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="w-10 h-10 rounded-full bg-black/30 backdrop-blur-md border border-white/10 flex items-center justify-center shadow-lg">
                  <ChevronLeft className="w-5 h-5" />
                </div>
              </motion.button>
              
              <motion.button
                onClick={handleNext}
                className="p-2 text-white hover:text-accent-100 transition-all duration-300 pointer-events-auto"
                whileHover={{ scale: 1.1, x: 2 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="w-10 h-10 rounded-full bg-black/30 backdrop-blur-md border border-white/10 flex items-center justify-center shadow-lg">
                  <ChevronRight className="w-5 h-5" />
                </div>
              </motion.button>
            </div>

           
           {/* Articles with modern, premium styling */}
<div className="w-full overflow-hidden">
  <AnimatePresence mode="wait">
    <motion.div
      key={articles[activeIndex].id}
      className="w-full px-4 md:px-12"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }}
      transition={{ 
        duration: 0.7, 
        ease: [0.22, 1, 0.36, 1] 
      }}
    >
      <div className="relative text-center mx-auto">
       
        
        {/* Premium content */}
        <p className="text-xl md:text-2xl lg:text-3xl text-white leading-relaxed font-light relative z-10 pt-6 pb-6">
          {articles[activeIndex].content}
        </p>
        
     
        
        {/* Modern accent line */}
        <div className="h-0.5 w-12 mx-auto mt-10 bg-gradient-to-r from-accent-100/80 to-blue-400/80"></div>
        
        {/* Premium glow effect */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-1/2 max-w-md bg-accent-100/5 rounded-full filter blur-[80px] z-0"></div>
      </div>
    </motion.div>
  </AnimatePresence>
</div>
          </motion.div>

          {/* Modern indicators */}
          <div className="flex justify-center mt-16 space-x-3">
            {articles.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveIndex(i)}
                className="group relative p-2"
                aria-label={`View quote ${i + 1}`}
              >
                <div 
                  className={`h-1.5 w-8 rounded-full transition-all duration-300 ${
                    i === activeIndex 
                    ? "bg-accent-100" 
                    : "bg-white/20 group-hover:bg-white/40"
                  }`}
                />
              </button>
            ))}
          </div>
        </motion.div>
      </section>
    </>
  );
};

export default ArticlesSection;