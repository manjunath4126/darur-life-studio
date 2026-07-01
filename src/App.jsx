import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar.jsx';
import Footer from './components/layout/Footer.jsx';
import WhatsAppFloat from './components/ui/WhatsAppFloat.jsx';

// Pages
import Home from './pages/Home.jsx';
import Swimming from './pages/Swimming.jsx';
import Gym from './pages/Gym.jsx';
import Cafe from './pages/Cafe.jsx';
import Yoga from './pages/Yoga.jsx';
import Zumba from './pages/Zumba.jsx';
import Aerobics from './pages/Aerobics.jsx';
import Auth from './pages/Auth.jsx';
import Dashboard from './pages/Dashboard.jsx';
import Admin from './pages/Admin.jsx';
import GalleryPage from './pages/GalleryPage.jsx';

export default function App() {
  return (
    <div className="app-container">
      <Navbar />
      
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/swimming" element={<Swimming />} />
          <Route path="/gym" element={<Gym />} />
          <Route path="/cafe" element={<Cafe />} />
          <Route path="/yoga" element={<Yoga />} />
          <Route path="/zumba" element={<Zumba />} />
          <Route path="/aerobics" element={<Aerobics />} />
          <Route path="/gallery" element={<GalleryPage />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </main>

      <Footer />
      <WhatsAppFloat />
    </div>
  );
}
