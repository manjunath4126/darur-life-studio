import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { LuCheck, LuPhone, LuMapPin, LuMessageCircle } from 'react-icons/lu';
import gymHeroImg from '../assets/gym_hero.png';
import './Gym.css';

export default function Gym() {
  const containerRef = useRef(null);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    message: ''
  });
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Mouse move parallax for zero-gravity gym visual
      const handleMouseMove = (e) => {
        const { clientX, clientY } = e;
        const xPos = (clientX / window.innerWidth - 0.5) * 30;
        const yPos = (clientY / window.innerHeight - 0.5) * 30;

        gsap.to('.gym-hero__art-wrapper', {
          x: xPos,
          y: yPos,
          duration: 1.5,
          ease: 'power2.out',
        });
      };

      window.addEventListener('mousemove', handleMouseMove);
      return () => window.removeEventListener('mousemove', handleMouseMove);
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const gymPlans = [
    {
      name: 'STANDARD ACCESS',
      description: 'Standard cardio and strength training floor access.',
      pricing: [
        { term: '1 Month', price: '₹5,000' },
        { term: '3 Months', price: '₹12,000' },
        { term: '6 Months', price: '₹22,000' },
        { term: '1 Year', price: '₹35,000' }
      ],
      color: 'var(--ocean-deep)'
    },
    {
      name: 'PERSONAL TRAINING (GROUP)',
      description: 'Standard access plus group personal trainer guidance.',
      pricing: [
        { term: '1 Month', price: '₹7,000' },
        { term: '3 Months', price: '₹18,000' },
        { term: '6 Months', price: '₹30,000' },
        { term: '1 Year', price: '₹50,000' }
      ],
      color: 'var(--ocean-teal)'
    }
  ];

  const studioPlans = [
    { name: 'Zumba Dance', price: '₹2,500', term: 'Month' },
    { name: 'Aerobics', price: '₹2,500', term: 'Month' },
    { name: 'Yoga Session', price: '₹1,500', term: 'Month' },
    { name: '1-to-1 PT (Private)', price: '₹15,000', term: 'Month' }
  ];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.name && formData.phone) {
      // Save inquiry to localStorage for Admin.jsx live inbox
      const newInq = {
        id: `inq-${Date.now()}`,
        date: new Date().toISOString().split('T')[0],
        name: formData.name,
        phone: formData.phone,
        email: formData.email,
        message: formData.message || 'Interested in health club memberships.',
        type: 'Gym/General'
      };

      const existingInquiriesStr = localStorage.getItem('darur_inquiries');
      const existingInquiries = existingInquiriesStr ? JSON.parse(existingInquiriesStr) : [];
      localStorage.setItem('darur_inquiries', JSON.stringify([newInq, ...existingInquiries]));

      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        setFormData({ name: '', phone: '', email: '', message: '' });
      }, 3000);
    }
  };

  return (
    <div className="page-wrapper gym-page" ref={containerRef}>
      {/* Hero Banner (Split-Tone Zero-G Layout) */}
      <section className="gym-hero">
        <div className="container gym-hero__container">
          {/* Left Content (Dark charcoal background side) */}
          <div className="gym-hero__content">
            <span className="section-label">// DARE TO BE STRONG</span>
            <h1 className="gym-title">
              FITNESS CENTER &amp; STUDIOS
            </h1>
            <p className="gym-subtitle">Integrated strength training, group studios, and professional therapeutic care.</p>
          </div>

          {/* Right Visual (Serene pool-water blue side) */}
          <div className="gym-hero__visual">
            <div className="gym-hero__art-wrapper">
              {/* Masked Kinetic Background */}
              <div className="gym-hero__kinetic-bg">LIFT</div>

              {/* Zero-G Floating dumbbell and training watch asset */}
              <img
                src={gymHeroImg}
                alt="Darur Life Gym Strength Dumbbell and Smart Watch"
                className="gym-hero__float-asset floating-ui-element"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Launch Offer Card */}
      <section className="section gym-launch-offer">
        <div className="container">
          <motion.div 
            className="brutal-card launch-card"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            style={{ borderTop: '4px solid var(--ocean-teal)' }}
          >
            <div className="launch-card__content">
              <div>
                <span className="brutal-badge brutal-badge--yellow text-mono mb-sm">LAUNCHING SPECIAL</span>
                <h2 className="font-bold mb-xs" style={{ color: 'var(--ocean-deep)' }}>UNLIMITED ALL-ACCESS MEMBERSHIP</h2>
                <p className="text-secondary mb-md" style={{ maxWidth: '650px' }}>
                  Get complete, unrestricted access to the **Gym floor, Swimming pool, Yoga classes, and Dietician consultation** for an entire year.
                </p>
                <p className="text-xs text-muted mb-lg">* Prices are subject to GST</p>
              </div>
              <div className="launch-card__price-box text-center">
                <span className="text-sm line-through text-muted block">REGULAR: ₹59,000</span>
                <h1 className="text-mono font-bold text-teal mt-xs">₹45,000</h1>
                <span className="text-mono text-sm text-secondary">/ Year + GST</span>
                <a href="tel:+919381625959" className="brutal-btn brutal-btn--primary brutal-btn--sm mt-md w-full">Claim Offer</a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Membership Tiers */}
      <section className="section gym-plans bg-cream" style={{ borderTop: '1px solid var(--border-light)', borderBottom: '1px solid var(--border-light)' }}>
        <div className="container">
          <div className="text-center mb-xl">
            <span className="section-label">// PACKAGES</span>
            <h2 className="section-title">GYM MEMBERSHIPS</h2>
            <p className="text-sm text-secondary">Standard membership packages. Subject to GST.</p>
          </div>

          <div className="grid-2 mb-2xl">
            {gymPlans.map((plan, idx) => (
              <motion.div
                key={plan.name}
                className="brutal-card plan-card"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.15 }}
                style={{ borderLeft: `4px solid ${plan.color}` }}
              >
                <h3 className="plan-name font-bold mb-xs" style={{ color: 'var(--ocean-deep)' }}>{plan.name}</h3>
                <p className="text-sm text-secondary mb-lg">{plan.description}</p>
                <div className="brutal-divider" style={{ margin: 'var(--space-md) 0' }}></div>
                <ul className="pricing-features mb-xl">
                  {plan.pricing.map((tier, tidx) => (
                    <li key={tidx} style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span>{tier.term}</span>
                      <span className="font-bold text-mono">{tier.price}</span>
                    </li>
                  ))}
                </ul>
                <a href="tel:+919381625959" className="brutal-btn brutal-btn--primary w-full text-center">Inquire Plan</a>
              </motion.div>
            ))}
          </div>

          {/* Studio Classes */}
          <div className="text-center mb-xl">
            <span className="section-label">// SPECIAL PROGRAMS</span>
            <h2 className="section-title">STUDIOS &amp; PRIVATE SESSIONS</h2>
          </div>

          <div className="grid-4">
            {studioPlans.map((item, idx) => (
              <motion.div
                key={item.name}
                className="brutal-card text-center"
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: idx * 0.1 }}
              >
                <h4 className="font-bold mb-sm" style={{ color: 'var(--ocean-deep)' }}>{item.name}</h4>
                <div className="brutal-divider" style={{ margin: 'var(--space-sm) 0' }}></div>
                <h2 className="text-mono font-bold" style={{ color: 'var(--ocean-surface)', fontSize: '1.6rem' }}>{item.price}</h2>
                <span className="text-mono text-xs text-muted">/ {item.term}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact & Timings */}
      <section className="section gym-contact">
        <div className="container">
          <div className="grid-2">
            {/* Contact details & Timings */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="contact-info-block"
            >
              <span className="section-label">// CONNECT</span>
              <h2 className="section-title mb-lg">TALK TO OUR TEAM</h2>
              <p className="mb-xl">
                Have questions about facilities, personal training packages, or dietician reviews? Contact our helpdesk directly or start a WhatsApp chat.
              </p>

              {/* Partnership */}
              <div className="brutal-card mb-md" style={{ borderLeft: '4px solid var(--ocean-teal)', background: 'var(--bg-cream)' }}>
                <h4 className="font-bold mb-xs" style={{ color: 'var(--ocean-deep)' }}>Clinical Physiotherapy Partner</h4>
                <p className="text-sm">
                  Partnered with <strong>Kasturi College of Physiotherapy, Anantapur</strong> (Phone: 080554-273747) to provide rehabilitation, posture therapy, and muscle recovery.
                </p>
              </div>

              <div className="brutal-card mb-md">
                <h4 className="text-mono text-xs text-muted mb-xs">GYM TIMINGS</h4>
                <p className="text-sm" style={{ lineHeight: '1.6' }}>
                  <strong>Monday to Saturday:</strong><br />
                  ☀️ 6:00 AM to 1:00 PM (Open)<br />
                  🧹 1:00 PM to 4:00 PM (Closed for Cleaning)<br />
                  🌙 4:00 PM to 9:00 PM (Open)<br />
                  <strong>Sunday:</strong> ☀️ Morning Session open until 12:00 PM (Noon)
                </p>
              </div>

              <div className="info-item brutal-card mb-md">
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <h4 className="text-mono text-xs text-muted mb-xs">DIRECT PHONES</h4>
                  <a href="tel:+919381625959" className="font-bold text-mono" style={{ color: 'var(--ocean-deep)' }}>93816 25959</a>
                  <a href="tel:+917013173562" className="font-bold text-mono" style={{ color: 'var(--ocean-deep)' }}>70131 73562</a>
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
              initial={{ opacity: 0, x: 40 }}
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
                  <div className="success-banner text-center text-mono mt-md" style={{ color: 'var(--ocean-deep)', background: 'var(--ocean-shallow)', border: '1px solid var(--ocean-teal)', padding: '10px', borderRadius: '4px' }}>
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
