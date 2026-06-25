import { motion } from 'framer-motion';
import './Hero.css';

const wordVariants = {
  hidden: { y: '100%', opacity: 0 },
  visible: (i) => ({
    y: '0%',
    opacity: 1,
    transition: {
      delay: 0.3 + i * 0.2,
      duration: 0.6,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  }),
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.9 + i * 0.15,
      duration: 0.5,
      ease: 'easeOut',
    },
  }),
};

const badgeVariants = {
  hidden: { opacity: 0, scale: 0.8, x: 40 },
  visible: (i) => ({
    opacity: 1,
    scale: 1,
    x: 0,
    transition: {
      delay: 1.4 + i * 0.2,
      duration: 0.5,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  }),
};

const geoVariants = {
  hidden: { opacity: 0, scale: 0.8, rotate: 0 },
  visible: {
    opacity: 1,
    scale: 1,
    rotate: 6,
    transition: {
      delay: 0.6,
      duration: 0.8,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
};

export default function Hero() {
  return (
    <section className="hero">
      {/* Floating badges */}
      <div className="hero__badges">
        <motion.div
          className="hero__badge hero__badge--rating"
          variants={badgeVariants}
          initial="hidden"
          animate="visible"
          custom={0}
        >
          ⭐ 4.8 • 562+ Reviews
        </motion.div>
        <motion.div
          className="hero__badge hero__badge--anniversary"
          variants={badgeVariants}
          initial="hidden"
          animate="visible"
          custom={1}
        >
          4 Years Strong 💪
        </motion.div>
      </div>

      {/* Decorative scattered squares */}
      <div className="hero__deco-square hero__deco-square--1" />
      <div className="hero__deco-square hero__deco-square--2" />
      <div className="hero__deco-square hero__deco-square--3" />
      <div className="hero__deco-square hero__deco-square--4" />

      <div className="hero__container">
        {/* Left — Text Content */}
        <div className="hero__content">
          <h1 className="hero__heading">
            {['SWIM.', 'LIFT.', 'ELEVATE.'].map((word, i) => (
              <span
                className={`hero__word hero__word--${['swim', 'lift', 'elevate'][i]}`}
                key={word}
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
            Premium Swimming Academy &amp; Gym in Anantapur
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
              Join Gym
            </a>
          </motion.div>
        </div>

        {/* Right — Geometric Visual */}
        <div className="hero__visual">
          <motion.div
            className="hero__geometric"
            variants={geoVariants}
            initial="hidden"
            animate="visible"
          />
        </div>
      </div>
    </section>
  );
}
