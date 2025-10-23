import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import Hero from '../components/Hero';
import FeaturesSection from '../components/FeaturesSection';
import KeyFeaturesSection from '../components/KeyFeaturesSection';
import SecuritySection from '../components/SecuritySection';
import MissionVisionSection from '../components/MissionVisionSection';
import TestimonialsSection from '../components/TestimonialsSection';
import AboutSection from '../components/AboutSection';
import CallToAction from '../components/CallToAction';
import Footer from '../components/Footer';
import FAQ from '../components/FAQ';
import { homeFaqs } from '../data/faqs';

const LandingPage = () => {
  const location = useLocation();
  // Add a loading state to ensure components are fully loaded
  const [isLoaded, setIsLoaded] = useState(false);

  // Enable smooth scrolling for the entire page
  useEffect(() => {
    // Apply smooth scrolling to the entire document
    document.documentElement.style.scrollBehavior = 'smooth';
    
    // Mark as loaded after a short delay to ensure everything is rendered
    setTimeout(() => setIsLoaded(true), 100);
    
    // Clean up when component unmounts
    return () => {
      document.documentElement.style.scrollBehavior = '';
    };
  }, []);

  useEffect(() => {
    // Handle scroll to section on navigation
    if (location.state?.scrollTo && isLoaded) {
      const element = document.getElementById(location.state.scrollTo);
      if (element) {
        // Add a small delay to ensure animations have time to complete
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
      }
      // Clear the state after scrolling
      window.history.replaceState({}, document.title);
    }
  }, [location.state, isLoaded]);

  // Section transition variants for scroll animations - with reduced values to ensure visibility
  const sectionVariants = {
    hidden: { opacity: 0.5, y: 20 },  // Reduced opacity and y offset
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.5,  // Reduced duration
        ease: "easeOut" 
      }
    }
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{ opacity: 1 }}  // Start fully visible
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="relative w-full overflow-x-hidden"
      >
        {/* Hero section - always visible */}
        <div id="home" className="w-full">
          <Hero />
        </div>

        {/* Features section */}
        <div id="features" className="w-full">
          <FeaturesSection />
          {/* <KeyFeaturesSection /> */}
          <SecuritySection />
        </div>

        {/* About section */}
        <div id="about" className="w-full">
          <MissionVisionSection />
          <AboutSection />
          <TestimonialsSection />
        </div>

        {/* FAQ and CTA */}
        <div className="w-full">
          <FAQ faqs={homeFaqs} />
          <CallToAction />
        </div>

        {/* Footer */}
        <Footer />

        {/* Debugging overlay - remove in production */}
        {/* {!isLoaded && (
          <div className="fixed top-0 left-0 bg-red-500 text-white p-2 z-50">
            Loading components...
          </div>
        )} */}
      </motion.div>
    </AnimatePresence>
  );
};

export default LandingPage;