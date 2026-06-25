import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext.jsx';
import './Auth.css';

export default function Auth() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('login'); // 'login' | 'register'
  
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [registerData, setRegisterData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });
  
  const [error, setError] = useState('');

  const handleLoginChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleRegisterChange = (e) => {
    setRegisterData({ ...registerData, [e.target.name]: e.target.value });
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    setError('');
    
    if (loginData.email && loginData.password) {
      // Simulate successful login
      login({
        name: loginData.email.split('@')[0].toUpperCase(),
        email: loginData.email,
        phone: '9876543210',
        role: 'member'
      });
      navigate('/dashboard');
    } else {
      setError('Please fill in all fields.');
    }
  };

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (registerData.password !== registerData.confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    if (registerData.name && registerData.email && registerData.phone && registerData.password) {
      // Simulate successful registration
      login({
        name: registerData.name,
        email: registerData.email,
        phone: registerData.phone,
        role: 'member'
      });
      navigate('/dashboard');
    } else {
      setError('Please fill in all required fields.');
    }
  };

  return (
    <div className="page-wrapper auth-page flex-center">
      {/* Decorative scattered dots/squares */}
      <div className="decor-dot dot-1 bg-blue"></div>
      <div className="decor-dot dot-2 bg-green"></div>
      <div className="decor-dot dot-3 bg-coral"></div>
      <div className="decor-dot dot-4 bg-yellow"></div>

      <motion.div
        className="brutal-card auth-card"
        initial={{ opacity: 0, scale: 0.95, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <div className="auth-tabs mb-lg">
          <button
            onClick={() => { setActiveTab('login'); setError(''); }}
            className={`brutal-btn brutal-btn--sm w-half ${activeTab === 'login' ? 'brutal-btn--primary' : 'brutal-btn--ghost'}`}
          >
            LOGIN
          </button>
          <button
            onClick={() => { setActiveTab('register'); setError(''); }}
            className={`brutal-btn brutal-btn--sm w-half ${activeTab === 'register' ? 'brutal-btn--primary' : 'brutal-btn--ghost'}`}
          >
            REGISTER
          </button>
        </div>

        {error && (
          <div className="auth-error-banner text-mono mb-md text-center">
            ⚠ {error}
          </div>
        )}

        {activeTab === 'login' ? (
          <form onSubmit={handleLoginSubmit} className="auth-form">
            <div className="form-group mb-md">
              <label htmlFor="email">EMAIL ADDRESS</label>
              <input
                type="email"
                id="email"
                name="email"
                value={loginData.email}
                onChange={handleLoginChange}
                className="brutal-input"
                placeholder="swim@darurlifestudio.com"
                required
              />
            </div>
            <div className="form-group mb-lg">
              <label htmlFor="password">PASSWORD</label>
              <input
                type="password"
                id="password"
                name="password"
                value={loginData.password}
                onChange={handleLoginChange}
                className="brutal-input"
                placeholder="••••••••"
                required
              />
            </div>
            <button type="submit" className="brutal-btn brutal-btn--blue w-full">
              ENTER STUDIO
            </button>
          </form>
        ) : (
          <form onSubmit={handleRegisterSubmit} className="auth-form">
            <div className="form-group mb-md">
              <label htmlFor="name">FULL NAME</label>
              <input
                type="text"
                id="name"
                name="name"
                value={registerData.name}
                onChange={handleRegisterChange}
                className="brutal-input"
                placeholder="MANJUNATH MATAM"
                required
              />
            </div>
            <div className="form-group mb-md">
              <label htmlFor="reg-email">EMAIL ADDRESS</label>
              <input
                type="email"
                id="reg-email"
                name="email"
                value={registerData.email}
                onChange={handleRegisterChange}
                className="brutal-input"
                placeholder="manjunath@example.com"
                required
              />
            </div>
            <div className="form-group mb-md">
              <label htmlFor="phone">PHONE NUMBER</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={registerData.phone}
                onChange={handleRegisterChange}
                className="brutal-input"
                placeholder="093816 25959"
                required
              />
            </div>
            <div className="form-group mb-md">
              <label htmlFor="reg-password">PASSWORD</label>
              <input
                type="password"
                id="reg-password"
                name="password"
                value={registerData.password}
                onChange={handleRegisterChange}
                className="brutal-input"
                placeholder="••••••••"
                required
              />
            </div>
            <div className="form-group mb-lg">
              <label htmlFor="confirmPassword">CONFIRM PASSWORD</label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={registerData.confirmPassword}
                onChange={handleRegisterChange}
                className="brutal-input"
                placeholder="••••••••"
                required
              />
            </div>
            <button type="submit" className="brutal-btn brutal-btn--coral w-full">
              CREATE MEMBERSHIP
            </button>
          </form>
        )}
      </motion.div>
    </div>
  );
}
