import React from 'react';
import { motion } from 'framer-motion';
import SlotBooking from '../components/swimming/SlotBooking.jsx';
import './Swimming.css';

/* ── Page Variants ── */
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

export default function Swimming() {
  return (
    <div className="swimming-page">
      {/* ── Hero Banner ── */}
      <section className="swimming-hero">
        <div className="container swimming-hero__content">
          <motion.h1
            className="swimming-hero__heading"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          >
            SWIMMING ACADEMY
          </motion.h1>
          <motion.p
            className="swimming-hero__subtitle"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.4 }}
          >
            Book your lane. Learn from experts. Dive in.
          </motion.p>
        </div>
      </section>

      {/* ── Section 1: Slot Booking ── */}
      <section className="swimming-section">
        <div className="container">
          <SlotBooking />
        </div>
      </section>

      {/* ── Divider ── */}
      <div className="brutal-divider" />

      {/* ── Section 2: Membership Packages & Programs ── */}
      <section className="swimming-section swimming-pricing-section">
        <div className="container">
          <motion.div
            className="swimming-section__header text-center mb-xl"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
          >
            <span className="section-label">// PACKAGES &amp; PROGRAMS</span>
            <h2 className="swimming-section__heading section-title">SWIMMING MEMBERSHIPS</h2>
            <p style={{ maxWidth: '600px', margin: 'var(--space-sm) auto 0' }}>
              Dive into our flexible pool access memberships or accelerate your skills with professional coaches. All prices subject to GST.
            </p>
          </motion.div>

          <div className="grid-3 mb-2xl">
            {/* Standard Access */}
            <div className="brutal-card pricing-card">
              <span className="brutal-badge brutal-badge--blue text-mono mb-sm">STANDARD ACCESS</span>
              <h3 className="pricing-card__title font-bold mb-md">General Pool Membership</h3>
              <p className="text-sm text-secondary mb-lg">Access to all public lanes during open studio hours (6 AM – 9 PM).</p>
              <div className="brutal-divider" style={{ margin: 'var(--space-md) 0' }}></div>
              <ul className="pricing-features mb-xl">
                <li>1 Month: <span className="font-bold text-mono">₹3,000</span></li>
                <li>3 Months: <span className="font-bold text-mono">₹8,400</span></li>
                <li>6 Months: <span className="font-bold text-mono">₹15,000</span></li>
                <li>1 Year: <span className="font-bold text-mono">₹24,000</span></li>
              </ul>
              <a href="tel:+919381625959" className="brutal-btn brutal-btn--primary w-full text-center">Join Pool</a>
            </div>

            {/* Coached Programs */}
            <div className="brutal-card pricing-card pricing-card--featured" style={{ borderColor: 'var(--ocean-teal)' }}>
              <span className="brutal-badge brutal-badge--green text-mono mb-sm">21-DAY PROGRAMS</span>
              <h3 className="pricing-card__title font-bold mb-md">Coached Academies</h3>
              <p className="text-sm text-secondary mb-lg">Structured 3-week programs designed to guide you from beginner to elite swimmer.</p>
              <div className="brutal-divider" style={{ margin: 'var(--space-md) 0' }}></div>
              <ul className="pricing-features mb-xl">
                <li style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>Level 1: Learn To Swim (LTS)</span>
                  <span className="font-bold text-mono">₹6,000</span>
                </li>
                <li style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>Level 2: Stroke Correction</span>
                  <span className="font-bold text-mono">₹5,500</span>
                </li>
                <li style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>Level 3: Competitive Elite</span>
                  <span className="font-bold text-mono">₹6,000</span>
                </li>
              </ul>
              <a href="tel:+919381625959" className="brutal-btn brutal-btn--blue w-full text-center">Register Now</a>
            </div>

            {/* Private Training */}
            <div className="brutal-card pricing-card">
              <span className="brutal-badge brutal-badge--coral text-mono mb-sm">ONE-TO-ONE</span>
              <h3 className="pricing-card__title font-bold mb-md">Personal Swim Coaching</h3>
              <p className="text-sm text-secondary mb-lg">Dedicated coach by your lane for private stroke analysis and custom goals.</p>
              <div className="brutal-divider" style={{ margin: 'var(--space-md) 0' }}></div>
              <h2 className="pricing-card__price font-bold text-mono mb-sm">₹15,000 <span className="text-sm font-normal">/ Month</span></h2>
              <ul className="pricing-features mb-xl">
                <li>Individual lane focus</li>
                <li>Customized workout scheduling</li>
                <li>All age and skill levels</li>
              </ul>
              <a href="tel:+919381625959" className="brutal-btn brutal-btn--ghost w-full text-center">Book Private Coach</a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
