import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import './Hero.css';

const fadeUp = {
  hidden: { opacity: 0, y: 25 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.8 + i * 0.12,
      duration: 0.7,
      ease: 'easeOut',
    },
  }),
};

const badgeVariants = {
  hidden: { opacity: 0, scale: 0.9, y: 15 },
  visible: (i) => ({
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      delay: 1.2 + i * 0.15,
      duration: 0.6,
      ease: 'easeOut',
    },
  }),
};

export default function Hero() {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Kinetic Typography Word Reveal
      gsap.fromTo(
        '.hero__word span',
        { y: 120, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.4,
          stagger: 0.2,
          ease: 'power4.out',
        }
      );

      // 2. Continuous Fluid Wave Bobbing
      gsap.to('.hero__svg-waves path', {
        y: '+=12',
        duration: 3,
        repeat: -1,
        yoyo: true,
        stagger: 0.25,
        ease: 'sine.inOut',
      });

      // 3. Mouse Parallax Reveal
      const handleMouseMove = (e) => {
        const { clientX, clientY } = e;
        const xPos = (clientX / window.innerWidth - 0.5) * 25;
        const yPos = (clientY / window.innerHeight - 0.5) * 25;

        gsap.to('.hero__wave-wrapper', {
          x: xPos,
          y: yPos,
          duration: 1.2,
          ease: 'power2.out',
        });
      };

      window.addEventListener('mousemove', handleMouseMove);
      return () => window.removeEventListener('mousemove', handleMouseMove);
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="hero" ref={containerRef}>
      {/* Premium Ambient Background Elements */}
      <div className="hero__ambient hero__ambient--1" />
      <div className="hero__ambient hero__ambient--2" />

      <div className="hero__container container">
        {/* Left — Text Content */}
        <div className="hero__content">
          <div className="hero__badge-container">
            <motion.div
              className="hero__badge hero__badge--rating brutal-badge brutal-badge--yellow"
              variants={badgeVariants}
              initial="hidden"
              animate="visible"
              custom={0}
            >
              ⭐ 4.8 • 562+ REVIEWS
            </motion.div>
            <motion.div
              className="hero__badge hero__badge--anniversary brutal-badge brutal-badge--green"
              variants={badgeVariants}
              initial="hidden"
              animate="visible"
              custom={1}
            >
              4 YEARS OF EXCELLENCE 💪
            </motion.div>
          </div>

          <h1 className="hero__heading">
            {['SWIM.', 'LIFT.', 'ELEVATE.'].map((word, i) => (
              <span
                className={`hero__word hero__word--${['swim', 'lift', 'elevate'][i]}`}
                key={word}
                style={{ display: 'block', overflow: 'hidden' }}
              >
                <span
                  style={{ display: 'inline-block', opacity: 0 }}
                >
                  {word}
                </span>
              </span>
            ))}
          </h1>

          <motion.p
            className="hero__subtitle"
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={0}
          >
            Anantapur's premier swimming academy, gym, and physiotherapy integrated health club.
          </motion.p>

          <motion.div
            className="hero__ctas"
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={1}
          >
            <a href="/swimming" className="brutal-btn brutal-btn--primary brutal-btn--lg">
              Book a Lane
            </a>
            <a href="/gym" className="brutal-btn brutal-btn--blue brutal-btn--lg">
              Explore Membership
            </a>
          </motion.div>
        </div>

        {/* Right — Calming Ocean Waves SVG Visual */}
        <div className="hero__visual">
          <div className="hero__wave-wrapper">
            <svg viewBox="0 0 400 400" className="hero__svg-waves" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <linearGradient id="gradient-wave" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="var(--ocean-shallow)" />
                  <stop offset="50%" stopColor="var(--ocean-teal)" />
                  <stop offset="100%" stopColor="var(--ocean-deep)" />
                </linearGradient>
              </defs>
              {/* Animated wave loops */}
              <path fill="url(#gradient-wave)" opacity="0.15" d="M 0,200 C 100,170 200,230 400,200 L 400,400 L 0,400 Z" />
              <path fill="url(#gradient-wave)" opacity="0.3" d="M 0,220 C 120,180 180,240 400,210 L 400,400 L 0,400 Z" />
              <path fill="url(#gradient-wave)" opacity="0.45" d="M 0,240 C 90,210 210,250 400,230 L 400,400 L 0,400 Z" />
              {/* Float badge */}
              <circle cx="200" cy="220" r="10" fill="var(--ocean-shallow)" />
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}
