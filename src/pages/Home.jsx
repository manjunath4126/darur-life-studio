import React from 'react';
import Hero from '../components/home/Hero.jsx';
import About from '../components/home/About.jsx';
import Facilities from '../components/home/Facilities.jsx';
import Testimonials from '../components/home/Testimonials.jsx';
import Gallery from '../components/home/Gallery.jsx';

export default function Home() {
  return (
    <div className="page-wrapper home-page">
      <Hero />
      <About />
      <Facilities />
      <Testimonials />
      <Gallery />
    </div>
  );
}
