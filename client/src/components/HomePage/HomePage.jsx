import React, { useState, useEffect } from 'react';
import Navbar from "../Layout/Navbar";
import HeroSection from "../../sections/HeroSection";
import BentoGridSection from '../../sections/BentoGrid';
import FeatureSection from '../../sections/Feature';
import StatsSection from '../../sections/stats';
import TestimonialsSection from '../../sections/Testimonials';
import Footer from '../Layout/Footer';
import UploadForm from '../UploadForm/UploadForm';

const HomePage = () => {
  
  return (
    <div className="bg-gray-100">
      <HeroSection />
      <BentoGridSection />
      <FeatureSection />
      <StatsSection />
      <TestimonialsSection />
    </div>
  );
};

export default HomePage;
