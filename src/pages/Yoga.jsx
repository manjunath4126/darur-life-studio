import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { LuHeart, LuWind, LuBrain, LuActivity, LuSun, LuShield, LuCheck, LuMessageCircle, LuPhone } from 'react-icons/lu';
import yogaHeroImg from '../assets/yoga_hero.jpg';
import yogaClassImg from '../assets/yoga_class.jpg';
import './Studios.css';

gsap.registerPlugin(ScrollTrigger);

const benefits = [
  { icon: LuHeart, title: 'Improves Heart Health', desc: 'Regular yoga practice lowers blood pressure, reduces resting heart rate, and improves cardiovascular circulation.' },
  { icon: LuWind, title: 'Deep Breathing & Lung Capacity', desc: 'Pranayama breathing exercises expand lung capacity and improve oxygen delivery to every cell in your body.' },
  { icon: LuBrain, title: 'Reduces Stress & Anxiety', desc: 'Yoga activates the parasympathetic nervous system, lowering cortisol levels and calming the mind effectively.' },
  { icon: LuActivity, title: 'Flexibility & Mobility', desc: 'Consistent practice systematically loosens tight muscles and connective tissue, increasing your full range of motion.' },
  { icon: LuSun, title: 'Better Posture & Alignment', desc: 'Yoga corrects postural imbalances caused by sedentary lifestyles, desk jobs, and phone usage.' },
  { icon: LuShield, title: 'Builds Core Strength', desc: 'Every yoga pose engages your deep core stabilizers, building functional strength that supports your spine.' },
];

const schedule = [
  { day: 'Monday – Saturday', time: '6:00 AM – 9:00 PM', note: 'Flexible batch slots' },
  { day: 'Sunday', time: '6:00 AM – 9:00 PM', note: 'Open sessions' },
];

export default function Yoga() {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Kinetic character reveal
      gsap.fromTo('.yoga-hero__char',
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, stagger: 0.04, ease: 'power4.out', delay: 0.2 }
      );
      // Mouse parallax on floating asset
      const handleMouseMove = (e) => {
        const xPos = (e.clientX / window.innerWidth - 0.5) * 30;
        const yPos = (e.clientY / window.innerHeight - 0.5) * 30;
        gsap.to('.yoga-hero__art-wrapper', { x: xPos, y: yPos, duration: 1.5, ease: 'power2.out' });
      };
      window.addEventListener('mousemove', handleMouseMove);
      // Scroll reveals for benefit cards
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

  const heading = 'YOGA';

  return (
    <div className="studio-page" ref={containerRef}>
      {/* ── Split-Tone Hero (same pattern as Home/Swimming/Gym/Cafe) ── */}
      <section className="studio-hero studio-hero--yoga">
        <div className="container studio-hero__container">
          {/* Left — Text (dark charcoal side) */}
          <div className="studio-hero__content">
            <span className="section-label">// CUSTOMISED PROGRAMME</span>
            <h1 className="studio-hero__heading">
              {heading.split('').map((char, i) => (
                <span key={i} className="yoga-hero__char studio-hero__char">{char}</span>
              ))}
              <span className="studio-hero__heading-sub"> &amp; MINDFULNESS</span>
            </h1>
            <p className="studio-hero__subtitle">
              Unite body, breath, and mind. Certified instructors guide you through classical and modern yoga flows designed for all skill levels — from absolute beginners to advanced practitioners.
            </p>
            <div className="studio-hero__ctas">
              <a href="tel:+919381625959" className="brutal-btn brutal-btn--primary brutal-btn--lg">
                <LuPhone /> Call to Join
              </a>
              <a href="https://wa.me/919381625959?text=Hi%2C%20I'm%20interested%20in%20Yoga%20classes%20at%20Darur%20Life%20Studio." target="_blank" rel="noreferrer" className="brutal-btn brutal-btn--blue brutal-btn--lg">
                <LuMessageCircle /> WhatsApp Us
              </a>
            </div>
          </div>

          {/* Right — Zero-G floating asset (pool-water blue side) */}
          <div className="studio-hero__visual">
            <div className="yoga-hero__art-wrapper studio-hero__art-wrapper">
              {/* Kinetic background text mask */}
              <div className="studio-hero__kinetic-bg">BREATHE</div>
              {/* Floating yoga mat & block zero-gravity image */}
              <img
                src={yogaHeroImg}
                alt="Darur Life Yoga Studio — Zero Gravity Yoga Block and Mat"
                className="studio-hero__float-asset floating-ui-element"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── Pricing Card ── */}
      <section className="section studio-pricing">
        <div className="container studio-pricing__container-grid">
          <div className="studio-pricing__card brutal-card">
            <div>
              <span className="brutal-badge brutal-badge--blue text-mono mb-sm">MONTHLY PROGRAMME</span>
              <h2 className="studio-pricing__price">₹1,500 <span className="text-sm font-normal text-muted">+ GST / Month</span></h2>
              <p className="text-secondary text-sm mt-xs">Also included in the <strong>₹45,000 Unlimited All-Access Yearly Membership</strong>.</p>
            </div>
            <div className="brutal-divider" style={{ margin: 'var(--space-md) 0' }} />
            <ul className="studio-pricing__features">
              {['Certified Instructors', 'All Skill Levels Welcome', 'Spacious Wooden Studio Floor', 'Breathing & Meditation Sessions', 'Flexible Batch Timings'].map(f => (
                <li key={f}><LuCheck className="studio-check" /> {f}</li>
              ))}
            </ul>
            <a href="tel:+919381625959" className="brutal-btn brutal-btn--primary brutal-btn--lg">Enquire Now</a>
          </div>

          <div className="studio-pricing__image-wrapper brutal-card">
            <img src={yogaClassImg} alt="Darur Life Studio — Yoga Class Session" className="studio-pricing__image" />
          </div>
        </div>
      </section>

      {/* ── Health Benefits ── */}
      <section className="section studio-benefits bg-cream" style={{ borderTop: '1px solid var(--border-light)' }}>
        <div className="container">
          <span className="section-label">// WHY YOGA</span>
          <h2 className="section-title">HEALTH ADVANTAGES</h2>
          <p className="studio-benefits__intro">
            Yoga is one of the world's most ancient and scientifically validated wellness systems. At Darur Life Studio, our certified instructors tailor each session to maximise your physical and mental transformation.
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
