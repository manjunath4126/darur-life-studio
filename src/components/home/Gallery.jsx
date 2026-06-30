import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import './Gallery.css';

// First batch of real photos
import pool1 from '../../assets/pool_1.jpg';
import gym1 from '../../assets/gym_1.png';
import poolKid1 from '../../assets/pool_kid_1.png';
import gym2 from '../../assets/gym_2.png';
import poolKid2 from '../../assets/pool_kid_2.png';

// Second batch
import poolJump from '../../assets/pool_jump.jpg';
import swimGymSplit1 from '../../assets/swim_gym_split1.jpg';
import swimGymSplit2 from '../../assets/swim_gym_split2.jpg';
import nightPoolLift from '../../assets/night_pool_lift.jpg';
import poolWide from '../../assets/pool_wide.jpg';

const items = [
  { label: 'Pool Deck', sub: 'Olympic Size Facility', image: poolWide, variant: 'pool-wide' },
  { label: 'Cardio Studio', sub: 'Premium Equipment', image: gym1, variant: 'gym1' },
  { label: 'All Ages Welcome', sub: 'Family Friendly', image: poolJump, variant: 'pool-jump' },
  { label: 'Strength Zone', sub: 'Integrated Health Club', image: gym2, variant: 'gym2' },
  { label: 'Elite Academy', sub: 'Advanced Swim Program', image: poolKid2, variant: 'kid2' },
  { label: 'Swim & Train', sub: 'Complete Health Club', image: swimGymSplit1, variant: 'split1' },
  { label: 'Coached Swim Lanes', sub: 'Competitive Training', image: swimGymSplit2, variant: 'split2' },
  { label: 'Night Sessions', sub: 'Extended Pool Hours', image: nightPoolLift, variant: 'night' },
  { label: 'Learn to Swim', sub: 'All Skill Levels', image: poolKid1, variant: 'kid1' },
  { label: 'Pool Area', sub: 'Covered Indoor Pool', image: pool1, variant: 'pool1' },
];

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.05 + i * 0.06,
      duration: 0.55,
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
          Inside Darur Life Studio &amp; Health Club
        </motion.h2>

        <div className="gallery__grid">
          {items.map((item, i) => (
            <motion.div
              className="gallery__item brutal-card"
              key={item.variant}
              variants={itemVariants}
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
              custom={i}
            >
              <img src={item.image} alt={item.label} className="gallery__image" />
              <div className="gallery__overlay">
                <div className="gallery__info">
                  <span className="gallery__label">{item.label}</span>
                  <span className="gallery__sublabel">{item.sub}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
