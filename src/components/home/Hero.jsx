import { motion } from 'framer-motion';
import './Hero.css';

const wordVariants = {
  hidden: { y: '100%', opacity: 0 },
  visible: (i) => ({
    y: '0%',
    opacity: 1,
    transition: {
      delay: 0.3 + i * 0.15,
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1], // Calming, fluid cubic ease
    },
  }),
};

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
  return (
    <section className="hero">
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
                <motion.span
                  style={{ display: 'inline-block' }}
                  variants={wordVariants}
                  initial="hidden"
                  animate="visible"
                  custom={i}
                >
                  {word}
                </motion.span>
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
          <motion.div
            className="hero__wave-wrapper"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: 'easeOut' }}
          >
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
          </motion.div>
        </div>
      </div>
    </section>
  );
}
