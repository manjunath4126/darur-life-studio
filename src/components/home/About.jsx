import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import './About.css';

const stats = [
  { number: '4+', label: 'YEARS STRONG', variant: 'shallow' },
  { number: '562+', label: 'ACTIVE MEMBERS', variant: 'teal' },
  { number: '4.8★', label: 'GOOGLE RATING', variant: 'surface' },
];

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.2 + i * 0.12,
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1],
    },
  }),
};

const textVariants = {
  hidden: { opacity: 0, y: 25 },
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
          // ABOUT US
        </motion.span>

        <div className="about__grid">
          {/* Left — Text Content */}
          <motion.div
            variants={textVariants}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
          >
            <h2 className="about__heading section-title">
              Where Fitness &amp; Well-being Meets Professional Care
            </h2>
            <p className="about__text">
              <span className="about__highlight">Darur Life Studio &amp; Health Club</span> is
              Anantapur's premier premium destination for swimming, gym workouts, yoga, and clinical health services.
              We believe in an integrated wellness philosophy that connects physical conditioning, expert coaching, and professional therapeutic care.
            </p>
            <p className="about__text">
              In collaboration with the renowned <span className="about__highlight">Kasturi College of Physiotherapy</span>, we offer on-site clinical rehabilitation, posture correction, and sports injury therapies. Whether you are learning to swim, hitting personal gym milestones, or recovering from injury, our holistic workspace supports you every day.
            </p>
          </motion.div>

          {/* Right — Stat Cards */}
          <div className="about__stats">
            {stats.map((stat, i) => (
              <motion.div
                className={`about__stat-card about__stat-card--${stat.variant} brutal-card`}
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
