import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { LuStar } from 'react-icons/lu';
import './Testimonials.css';

const testimonials = [
  {
    text: 'Great staff, excellent facilities, and a motivating atmosphere throughout.',
    author: 'Google Review',
    accent: 'blue',
  },
  {
    text: 'The trainers were helpful, and I gained confidence in the water quickly.',
    author: 'Google Review',
    accent: 'green',
  },
  {
    text: 'A very good place with nice music and clean environment.',
    author: 'Google Review',
    accent: 'coral',
  },
  {
    text: 'Fantastic crew, fabulous experience!',
    author: 'Manjunath M.',
    accent: 'yellow',
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.15 + i * 0.12,
      duration: 0.5,
      ease: 'easeOut',
    },
  }),
};

export default function Testimonials() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-80px' });

  return (
    <section
      className="testimonials section"
      id="testimonials"
      ref={sectionRef}
    >
      <div className="container">
        <motion.span
          className="section-label"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4 }}
        >
          // Testimonials
        </motion.span>

        <motion.h2
          className="testimonials__heading section-title"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          What Our Members Say
        </motion.h2>

        <div className="testimonials__grid">
          {testimonials.map((t, i) => (
            <motion.div
              className={`testimonial-card testimonial-card--${t.accent}`}
              key={i}
              variants={cardVariants}
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
              custom={i}
            >
              {/* Large quote mark */}
              <div
                className={`testimonial-card__quote-mark testimonial-card__quote-mark--${t.accent}`}
              >
                &ldquo;
              </div>

              {/* Review text */}
              <p className="testimonial-card__text">{t.text}</p>

              {/* Star rating */}
              <div className="testimonial-card__stars">
                {[...Array(5)].map((_, j) => (
                  <LuStar
                    key={j}
                    className="testimonial-card__star"
                    fill="var(--sunny-yellow)"
                    strokeWidth={0}
                  />
                ))}
              </div>

              {/* Author */}
              <span className="testimonial-card__author">— {t.author}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
