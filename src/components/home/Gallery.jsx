import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { LuCamera } from 'react-icons/lu';
import './Gallery.css';

const items = [
  { label: 'Pool Area', variant: 'pool', sub: 'Coming Soon' },
  { label: 'Gym Floor', variant: 'gym', sub: 'Coming Soon' },
  { label: 'Training', variant: 'training', sub: 'Coming Soon' },
  { label: 'Members', variant: 'members', sub: 'Coming Soon' },
  { label: 'Facility', variant: 'facility', sub: 'Coming Soon' },
  { label: 'Events', variant: 'events', sub: 'Coming Soon' },
];

const itemVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: (i) => ({
    opacity: 1,
    scale: 1,
    transition: {
      delay: 0.1 + i * 0.1,
      duration: 0.45,
      ease: 'easeOut',
    },
  }),
};

export default function Gallery() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-60px' });

  return (
    <section className="gallery section" id="gallery" ref={sectionRef}>
      <div className="container">
        <motion.span
          className="section-label"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4 }}
        >
          // Gallery
        </motion.span>

        <motion.h2
          className="gallery__heading section-title"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          Inside Darur Life Studio
        </motion.h2>

        <div className="gallery__grid">
          {items.map((item, i) => (
            <motion.div
              className={`gallery__item gallery__item--${item.variant}`}
              key={item.variant}
              variants={itemVariants}
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
              custom={i}
            >
              <LuCamera className="gallery__icon" />
              <span className="gallery__label">{item.label}</span>
              <span className="gallery__sublabel">{item.sub}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
