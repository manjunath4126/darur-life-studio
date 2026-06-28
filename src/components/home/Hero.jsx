import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import antigravityHeroImg from '../../assets/antigravity_hero.png';
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
      // 1. Kinetic Typography Word Reveal (Text sliding up)
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

      // 2. Mouse Parallax on the Zero-Gravity floating group
      const handleMouseMove = (e) => {
        const { clientX, clientY } = e;
        const xPos = (clientX / window.innerWidth - 0.5) * 35;
        const yPos = (clientY / window.innerHeight - 0.5) * 35;

        gsap.to('.hero__art-wrapper', {
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

  return (
    <section className="hero" ref={containerRef}>
      <div className="hero__container container">
        {/* Left — Text Content (Dark charcoal background side) */}
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

        {/* Right — Zero-Gravity Floating Concept (Serene blue background side) */}
        <div className="hero__visual">
          <div className="hero__art-wrapper">
            {/* Kinetic Typography Mask behind floating objects */}
            <div className="hero__kinetic-bg">ANTIGRAVITY</div>

            {/* Smart Matte Kettlebell & Swim Goggles Floating Asset */}
            <img
              src={antigravityHeroImg}
              alt="Darur Life Antigravity Smart Kettlebell & Swimming Goggles"
              className="hero__float-asset floating-ui-element"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
