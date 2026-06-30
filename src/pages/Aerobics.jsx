import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { LuHeart, LuFlame, LuWind, LuShield, LuActivity, LuTrendingUp, LuCheck, LuMessageCircle, LuPhone } from 'react-icons/lu';
import aerobicsHeroImg from '../assets/aerobics_hero.jpg';
import './Studios.css';

gsap.registerPlugin(ScrollTrigger);

const benefits = [
  { icon: LuHeart, title: 'Strengthens the Heart', desc: 'Aerobics is the gold standard for cardiovascular fitness — it strengthens the heart muscle and lowers the risk of heart disease significantly.' },
  { icon: LuFlame, title: 'High Calorie Burn', desc: 'A 45-minute aerobics session burns up to 600 calories, making it one of the most efficient fat-loss workouts available.' },
  { icon: LuWind, title: 'Improves Lung Function', desc: 'Repeated aerobic exercise trains your respiratory muscles, improving VO2 max and oxygen efficiency over time.' },
  { icon: LuTrendingUp, title: 'Builds Endurance & Stamina', desc: 'Regular aerobics increases your body\'s ability to sustain physical activity for longer periods without fatigue.' },
  { icon: LuShield, title: 'Boosts Immune System', desc: 'Moderate aerobic exercise is proven to enhance immune response, reducing the frequency and severity of illness.' },
  { icon: LuActivity, title: 'Mental Health & Sleep Quality', desc: 'Aerobics reduces symptoms of depression and anxiety while significantly improving sleep quality and duration.' },
];

const schedule = [
  { day: 'Monday – Saturday', time: '6:00 AM – 9:00 PM', note: 'Flexible batch slots' },
  { day: 'Sunday', time: '6:00 AM – 9:00 PM', note: 'Open sessions' },
];

export default function Aerobics() {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.aerobics-hero__char',
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, stagger: 0.04, ease: 'power4.out', delay: 0.2 }
      );
      const handleMouseMove = (e) => {
        const xPos = (e.clientX / window.innerWidth - 0.5) * 30;
        const yPos = (e.clientY / window.innerHeight - 0.5) * 30;
        gsap.to('.aerobics-hero__art-wrapper', { x: xPos, y: yPos, duration: 1.5, ease: 'power2.out' });
      };
      window.addEventListener('mousemove', handleMouseMove);
      gsap.fromTo('.benefit-card',
        { y: 60, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.9, stagger: 0.1, ease: 'power3.out',
          scrollTrigger: { trigger: '.benefits-grid', start: 'top 85%', toggleActions: 'play none none none' }
        }
      );
      return () => window.removeEventListener('mousemove', handleMouseMove);
    }, containerRef);
    return () => ctx.revert();
  }, []);

  const heading = 'AEROBICS';

  return (
    <div className="studio-page" ref={containerRef}>
      <section className="studio-hero studio-hero--aerobics">
        <div className="container studio-hero__container">
          <div className="studio-hero__content">
            <span className="section-label">// CUSTOMISED PROGRAMME</span>
            <h1 className="studio-hero__heading">
              {heading.split('').map((char, i) => (
                <span key={i} className="aerobics-hero__char studio-hero__char">{char}</span>
              ))}
              <span className="studio-hero__heading-sub"> CARDIO</span>
            </h1>
            <p className="studio-hero__subtitle">
              High-intensity group cardio that transforms your body, supercharges your heart, and fires up your stamina — all in an electrifying, community-powered format.
            </p>
            <div className="studio-hero__ctas">
              <a href="tel:+919381625959" className="brutal-btn brutal-btn--primary brutal-btn--lg">
                <LuPhone /> Call to Join
              </a>
              <a href="https://wa.me/919381625959?text=Hi%2C%20I'm%20interested%20in%20Aerobics%20classes%20at%20Darur%20Life%20Studio." target="_blank" rel="noreferrer" className="brutal-btn brutal-btn--blue brutal-btn--lg">
                <LuMessageCircle /> WhatsApp Us
              </a>
            </div>
          </div>

          <div className="studio-hero__visual">
            <div className="aerobics-hero__art-wrapper studio-hero__art-wrapper">
              <div className="studio-hero__kinetic-bg">MOVE</div>
              <img
                src={aerobicsHeroImg}
                alt="Darur Life Aerobics Studio — Zero Gravity Resistance Band and Heart Rate Monitor"
                className="studio-hero__float-asset floating-ui-element"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── Pricing Card ── */}
      <section className="section studio-pricing">
        <div className="container">
          <div className="studio-pricing__card brutal-card">
            <div>
              <span className="brutal-badge brutal-badge--blue text-mono mb-sm">MONTHLY PROGRAMME</span>
              <h2 className="studio-pricing__price">₹2,500 <span className="text-sm font-normal text-muted">+ GST / Month</span></h2>
              <p className="text-secondary text-sm mt-xs">Also included in the <strong>₹45,000 Unlimited All-Access Yearly Membership</strong>.</p>
            </div>
            <div className="brutal-divider" style={{ margin: 'var(--space-md) 0' }} />
            <ul className="studio-pricing__features">
              {['Certified Aerobics Instructor', 'Low to High Intensity Options', 'Step & Cardio Combinations', 'High-Energy Group Sessions', 'Flexible Batch Timings'].map(f => (
                <li key={f}><LuCheck className="studio-check" /> {f}</li>
              ))}
            </ul>
            <a href="tel:+919381625959" className="brutal-btn brutal-btn--primary brutal-btn--lg">Enquire Now</a>
          </div>
        </div>
      </section>

      {/* ── Health Benefits ── */}
      <section className="section studio-benefits bg-cream" style={{ borderTop: '1px solid var(--border-light)' }}>
        <div className="container">
          <span className="section-label">// WHY AEROBICS</span>
          <h2 className="section-title">HEALTH ADVANTAGES</h2>
          <p className="studio-benefits__intro">
            Aerobics is the foundation of endurance fitness. At Darur Life Studio, our aerobics classes combine cardio bursts, toning movements, and rhythmic breathing to deliver a full-body transformation that you can feel from day one.
          </p>
          <div className="benefits-grid grid-3">
            {benefits.map((b, i) => {
              const Icon = b.icon;
              return (
                <div className="benefit-card brutal-card" key={i}>
                  <div className="benefit-card__icon"><Icon /></div>
                  <h3 className="benefit-card__title">{b.title}</h3>
                  <p className="benefit-card__desc">{b.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Schedule ── */}
      <section className="section studio-schedule">
        <div className="container">
          <span className="section-label">// TIMINGS</span>
          <h2 className="section-title">CLASS SCHEDULE</h2>
          <div className="grid-2" style={{ maxWidth: '700px' }}>
            {schedule.map((s, i) => (
              <motion.div key={i} className="brutal-card schedule-card"
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.1, duration: 0.4 }}>
                <span className="text-mono text-xs text-muted">{s.day}</span>
                <h3 className="schedule-card__time font-bold">{s.time}</h3>
                <span className="brutal-badge brutal-badge--blue text-mono" style={{ fontSize: '0.65rem' }}>{s.note}</span>
              </motion.div>
            ))}
          </div>
          <p className="text-sm text-muted mt-lg">* Batch timings are flexible. Call us to confirm your preferred slot.</p>
        </div>
      </section>
    </div>
  );
}
