import React from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal.jsx';
import HeroSection from '../components/HeroSection';
import FeatureSection from '../components/FeatureSection';
import CategorySection from '../components/CategorySection';
import CompanySection from '../components/CompanySection';
import JoinSection from '../components/JoinSection';
import TestimonialSection from '../components/TestimonialSection';
import ContactSection from '../components/ContactSection';
import Footer from '../components/Footer';

const Home = () => {
  useScrollReveal();

  return (
    <div className="relative w-full min-h-screen overflow-hidden">
      <HeroSection />
      <FeatureSection />
      <CategorySection />
      <CompanySection />
      <JoinSection />
      <TestimonialSection />
      <ContactSection />
      <Footer />
    </div>
  );
};

export default Home;
