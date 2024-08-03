import React from 'react';
import BackgroundAnimation from './components/BackgroundAnimation';
import UseCaseSection from './components/UseCaseSection';
import TrustedIconsCarousel from './components/TrustedIconsCarousel';
import WorkflowAutomationSection from './components/WorkflowAutomationSection';
import FeaturesCarousel from './components/FeaturesCarousel';
import Navbar from './components/Navbar';

const Home = () => {
  return (
    <div className="relative min-h-screen bg-black overflow-hidden">
      <BackgroundAnimation />
      <div className="relative z-10">
        <Navbar />
        {/* Adjust main container style */}
        <main className="flex flex-col justify-start items-stretch text-white w-full">
          <UseCaseSection />
          <TrustedIconsCarousel />
          <WorkflowAutomationSection />
          <FeaturesCarousel />
        </main>
      </div>
    </div>
  );
};

export default Home;
