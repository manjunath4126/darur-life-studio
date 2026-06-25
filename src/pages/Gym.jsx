import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { LuCheck, LuPhone, LuMapPin, LuMessageCircle } from 'react-icons/lu';
import './Gym.css';

export default function Gym() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    message: ''
  });
  const [success, setSuccess] = useState(false);

  const plans = [
    {
      name: 'BASIC',
      price: '1,500',
      duration: 'month',
      features: ['Gym access & lockers', 'Basic training equipment', 'Access during general hours', 'Standard locker access'],
      color: 'var(--electric-blue)',
      popular: false
    },
    {
      name: 'PRO',
      price: '2,500',
      duration: 'month',
      features: ['Everything in Basic', 'Personal trainer support (2x/week)', 'Customized diet plans', 'All premium equipment access'],
      color: 'var(--neon-green)',
      popular: true
    },
    {
      name: 'PREMIUM',
      price: '4,000',
      duration: 'month',
      features: ['Everything in Pro', 'Unlimited personal training slots', 'Full swimming pool access', 'Priority booking & events'],
      color: 'var(--vibrant-coral)',
      popular: false
    }
  ];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.name && formData.phone) {
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        setFormData({ name: '', phone: '', email: '', message: '' });
      }, 3000);
    }
  };

  return (
    <div className="page-wrapper gym-page">
      {/* Hero Banner */}
      <section className="gym-hero text-center">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="section-label">// DARE TO BE STRONG</span>
            <h1 className="gym-title">
              GYM & <span className="highlight-text">FITNESS</span>
            </h1>
            <p className="gym-subtitle">Train hard. Stay consistent. See results.</p>
          </motion.div>
        </div>
      </section>

      {/* Membership Plans */}
      <section className="section gym-plans">
        <div className="container">
          <div className="text-center mb-xl">
            <span className="section-label">// PACKAGES</span>
            <h2 className="section-title">MEMBERSHIP PLANS</h2>
          </div>

          <div className="plans-grid">
            {plans.map((plan, idx) => (
              <motion.div
                key={plan.name}
                className={`brutal-card plan-card ${plan.popular ? 'popular' : ''}`}
                style={{ borderLeft: `8px solid ${plan.color}` }}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
              >
                {plan.popular && <span className="popular-badge">POPULAR</span>}
                <h3 className="plan-name">{plan.name}</h3>
                <div className="plan-price">
                  <span className="currency">₹</span>
                  <span className="amount">{plan.price}</span>
                  <span className="duration">/{plan.duration}</span>
                </div>
                <div className="brutal-divider"></div>
                <ul className="plan-features">
                  {plan.features.map((feat, fidx) => (
                    <li key={fidx}>
                      <LuCheck className="feature-icon" style={{ color: plan.color }} />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
                <button className="brutal-btn brutal-btn--primary w-full plan-btn">
                  JOIN NOW
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Staff */}
      <section className="section gym-contact bg-cream">
        <div className="container">
          <div className="grid-2">
            {/* Contact Details */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="contact-info-block"
            >
              <span className="section-label">// CONNECT</span>
              <h2 className="section-title mb-lg">TALK TO OUR TEAM</h2>
              <p className="mb-xl">
                Have questions about facilities, timings, personal training, or membership extensions? Reach out to us or drop by. We are here to guide you.
              </p>

              <div className="info-item brutal-card mb-md">
                <div className="info-icon bg-blue">
                  <LuPhone />
                </div>
                <div>
                  <h4 className="text-mono">CALL DIRECT</h4>
                  <a href="tel:09381625959" className="info-link">093816 25959</a>
                </div>
              </div>

              <div className="info-item brutal-card mb-md">
                <div className="info-icon bg-green">
                  <LuMapPin />
                </div>
                <div>
                  <h4 className="text-mono">VISIT STUDIO</h4>
                  <p className="info-text">
                    Cognizant College, 80 Feet Rd, Near Ayyappa Swamy Temple, Srinagar Colony, Anantapur, AP 515001
                  </p>
                </div>
              </div>

              <a
                href="https://wa.me/919381625959"
                target="_blank"
                rel="noreferrer"
                className="brutal-btn brutal-btn--green w-full contact-whatsapp-btn"
              >
                <LuMessageCircle className="icon" /> CHAT ON WHATSAPP
              </a>
            </motion.div>

            {/* Form */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="brutal-card contact-form-card"
            >
              <h3 className="mb-lg text-mono">DROP US A MESSAGE</h3>
              <form onSubmit={handleSubmit}>
                <div className="form-group mb-md">
                  <label htmlFor="name">YOUR NAME *</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="brutal-input"
                    placeholder="Enter your name"
                    required
                  />
                </div>

                <div className="form-group mb-md">
                  <label htmlFor="phone">PHONE NUMBER *</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="brutal-input"
                    placeholder="Enter phone number"
                    required
                  />
                </div>

                <div className="form-group mb-md">
                  <label htmlFor="email">EMAIL ADDRESS</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="brutal-input"
                    placeholder="Enter email address"
                  />
                </div>

                <div className="form-group mb-lg">
                  <label htmlFor="message">MESSAGE / INQUIRY</label>
                  <textarea
                    id="message"
                    name="message"
                    rows="4"
                    value={formData.message}
                    onChange={handleChange}
                    className="brutal-input"
                    placeholder="Tell us what you are looking for..."
                  ></textarea>
                </div>

                <button type="submit" className="brutal-btn brutal-btn--primary w-full">
                  SEND MESSAGE
                </button>

                {success && (
                  <div className="success-banner text-center text-mono mt-md">
                    ✓ MESSAGE SENT! WE'LL CALL YOU SOON.
                  </div>
                )}
              </form>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
