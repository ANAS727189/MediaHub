import React, { useState, useEffect } from 'react';
import HeroSection from "../../sections/HeroSection";
import BentoGridSection from '../../sections/BentoGrid';
import FeatureSection from '../../sections/Feature';
import TestimonialsSection from '../../sections/Testimonials';

const HomePage = () => {
  
  return (
    <div className="bg-gray-100">
      <HeroSection />
      <BentoGridSection />
      <FeatureSection />
      <TestimonialsSection />
    </div>
  );
};

export default HomePage;
