import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView } from 'framer-motion';
import { LuWaves, LuDumbbell, LuCheck } from 'react-icons/lu';
import './Facilities.css';

const facilities = [
  {
    id: 'swim',
    title: 'Swimming Pool',
    icon: LuWaves,
    sticker: 'Dive In!',
    link: '/swimming',
    cta: 'Explore Swimming',
    features: [
      'Heated Pool',
      'Professional Coaches',
      'Lane Booking',
      'All Age Groups',
    ],
  },
  {
    id: 'gym',
    title: 'Premium Gym',
    icon: LuDumbbell,
    sticker: 'Get Fit!',
    link: '/gym',
    cta: 'Explore Gym',
    features: [
      'Modern Equipment',
      'Personal Training',
      'Cardio Zone',
      'Strength Training',
    ],
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 60 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.2 + i * 0.2,
      duration: 0.6,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  }),
};

export default function Facilities() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-80px' });

  return (
    <section className="facilities section" id="facilities" ref={sectionRef}>
      <div className="container">
        <motion.span
          className="section-label"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4 }}
        >
          // What We Offer
        </motion.span>

        <motion.h2
          className="facilities__heading section-title"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          Our Facilities
        </motion.h2>

        <div className="facilities__grid">
          {facilities.map((facility, i) => {
            const Icon = facility.icon;
            return (
              <motion.div
                className={`facilities__card facilities__card--${facility.id}`}
                key={facility.id}
                variants={cardVariants}
                initial="hidden"
                animate={isInView ? 'visible' : 'hidden'}
                custom={i}
              >
                {/* Rotated sticker badge */}
                <span
                  className={`facilities__sticker facilities__sticker--${facility.id}`}
                >
                  {facility.sticker}
                </span>

                {/* Icon */}
                <div
                  className={`facilities__icon facilities__icon--${facility.id}`}
                >
                  <Icon />
                </div>

                {/* Title */}
                <h3 className="facilities__card-title">{facility.title}</h3>

                {/* Features list */}
                <ul className="facilities__features">
                  {facility.features.map((feature) => (
                    <li className="facilities__feature" key={feature}>
                      <LuCheck
                        className={`facilities__check facilities__check--${facility.id}`}
                      />
                      {feature}
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <Link
                  to={facility.link}
                  className={`brutal-btn ${
                    facility.id === 'swim'
                      ? 'brutal-btn--blue'
                      : 'brutal-btn--green'
                  } facilities__cta`}
                >
                  {facility.cta}
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
