import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import HeroSection from '../components/HeroSection';
import backgroundImage from '../assets/background.jpeg';

const HomePage = () => {
  return (
    <div>
      <Header />
      <HeroSection
        title="Bienvenido a UCV Events"
        subtitle="Descubre eventos y salas disponibles"
        backgroundImage={backgroundImage}
      />

      {/* Main Content */}
      <div className="container mx-auto my-8">
        <h2 className="text-3xl font-bold text-center">Our Services</h2>
        {/* You can add content here */}
      </div>
      <Footer />
    </div>
  );
};

export default HomePage;
