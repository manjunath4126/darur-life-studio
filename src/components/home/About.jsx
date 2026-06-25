import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import './About.css';

const stats = [
  { number: '4+', label: 'Years', variant: 'blue' },
  { number: '562+', label: 'Happy Members', variant: 'electric' },
  { number: '4.8★', label: 'Google Rating', variant: 'green' },
];

const cardVariants = {
  hidden: { opacity: 0, x: 50 },
  visible: (i) => ({
    opacity: 1,
    x: 0,
    transition: {
      delay: 0.2 + i * 0.15,
      duration: 0.5,
      ease: 'easeOut',
    },
  }),
};

const textVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' },
  },
};

export default function About() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  return (
    <section className="about section" id="about" ref={sectionRef}>
      <div className="container">
        <motion.span
          className="section-label"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4 }}
        >
          // About Us
        </motion.span>

        <div className="about__grid">
          {/* Left — Text Content */}
          <motion.div
            variants={textVariants}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
          >
            <h2 className="about__heading section-title">
              Where Fitness Meets Fun
            </h2>
            <p className="about__text">
              <span className="about__highlight">Darur Life Studio</span> is
              Anantapur's premier destination for swimming and fitness —
              where passion meets purpose. Since{' '}
              <span className="about__highlight">2022</span>, we've built a
              community that believes fitness should be fun, accessible, and
              transformative.
            </p>
            <p className="about__text">
              Now celebrating our{' '}
              <span className="about__highlight">4th Anniversary</span>, we
              continue to push boundaries with professional coaches, modern
              equipment, and a welcoming environment that makes every member
              feel at home. From your first splash to your heaviest lift —
              we're with you every step.
            </p>
          </motion.div>

          {/* Right — Stat Cards */}
          <div className="about__stats">
            {stats.map((stat, i) => (
              <motion.div
                className={`about__stat-card about__stat-card--${stat.variant}`}
                key={stat.label}
                variants={cardVariants}
                initial="hidden"
                animate={isInView ? 'visible' : 'hidden'}
                custom={i}
              >
                <div className="about__stat-number">{stat.number}</div>
                <div className="about__stat-label">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
