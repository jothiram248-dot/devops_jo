import React from 'react';
import AboutSection from '../components/AboutSection';
import MissionVisionSection from '../components/MissionVisionSection';
import TestimonialsSection from '../components/TestimonialsSection';
import Footer from '../components/Footer';

const AboutPage = () => {
  return (
    <div className="pt-24">
      <AboutSection />
      <MissionVisionSection />
      <TestimonialsSection />
      <Footer />
    </div>
  );
};

export default AboutPage;