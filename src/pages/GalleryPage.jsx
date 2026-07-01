import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './GalleryPage.css';

// Pool Photos
import pool1 from '../assets/pool_1.jpg';
import poolKid1 from '../assets/pool_kid_1.png';
import poolKid2 from '../assets/pool_kid_2.png';
import poolJump from '../assets/pool_jump.jpg';
import poolWide from '../assets/pool_wide.jpg';
import nightPoolLift from '../assets/night_pool_lift.jpg';

// Gym Photos
import gym1 from '../assets/gym_1.png';
import gym2 from '../assets/gym_2.png';
import gymCardio from '../assets/gym_cardio.jpg';
import gymSquat from '../assets/gym_squat.jpg';
import gymFloor from '../assets/gym_floor.jpg';
import gymSteam from '../assets/gym_steam.jpg';

// Splits
import swimGymSplit1 from '../assets/swim_gym_split1.jpg';
import swimGymSplit2 from '../assets/swim_gym_split2.jpg';

// Studio Photos
import yogaClass from '../assets/yoga_class.jpg';
import zumbaClass from '../assets/zumba_class.jpg';
import aerobicsClass from '../assets/aerobics_class.jpg';

gsap.registerPlugin(ScrollTrigger);

const categories = ['ALL', 'POOL', 'GYM', 'STUDIOS', 'AMENITIES'];

const galleryItems = [
  { image: poolWide, category: 'POOL', title: 'Covered Swimming Pool', desc: 'Olympic-size indoor pool deck.' },
  { image: gymFloor, category: 'GYM', title: 'Main Gym Floor', desc: 'Spacious strength and cardio zone.' },
  { image: yogaClass, category: 'STUDIOS', title: 'Yoga Studio', desc: 'Certified trainers and peaceful environment.' },
  { image: gymSteam, category: 'AMENITIES', title: 'Steam Bath Room', desc: 'Detox and relax after intense sessions.' },
  { image: zumbaClass, category: 'STUDIOS', title: 'Zumba Dance Room', desc: 'Vibrant and energetic group dance sessions.' },
  { image: gym1, category: 'GYM', title: 'Cardio Station', desc: 'Elite LifeFitness equipment.' },
  { image: poolJump, category: 'POOL', title: 'Academy Lane', desc: 'Learn to swim lessons for kids and adults.' },
  { image: gymSquat, category: 'GYM', title: 'Smith Machine squats', desc: 'Heavy strength training and safety racks.' },
  { image: aerobicsClass, category: 'STUDIOS', title: 'Aerobics cardio class', desc: 'High-intensity group stamina building.' },
  { image: gymCardio, category: 'GYM', title: 'Indoor Turf Zone', desc: 'Sled pushes, lunges, and functional training.' },
  { image: nightPoolLift, category: 'POOL', title: 'Night Swimming', desc: 'Atmospheric evening lighting and coaching.' },
  { image: swimGymSplit1, category: 'POOL', title: 'Elite training pool', desc: 'Olympic standard lanes.' },
  { image: gym2, category: 'GYM', title: 'Free Weight Racks', desc: 'Matte black dumbbells and barbell setups.' },
  { image: poolKid1, category: 'POOL', title: 'LTS Beginners', desc: 'Dedicated coaches for beginner swimmers.' },
  { image: swimGymSplit2, category: 'POOL', title: 'Advanced Swim Lanes', desc: 'Timed trials and competitive training.' },
  { image: poolKid2, category: 'POOL', title: 'Junior Swimming Academy', desc: 'Coaching future champions.' },
  { image: pool1, category: 'POOL', title: 'Clear Pool Waters', desc: 'Pristine water filtration systems.' }
];

export default function GalleryPage() {
  const [activeFilter, setActiveFilter] = useState('ALL');
  const containerRef = useRef(null);

  useEffect(() => {
    // Scroll to top on mount
    window.scrollTo(0, 0);

    const ctx = gsap.context(() => {
      // Hero character reveal
      gsap.fromTo('.gallery-page__char',
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.04, ease: 'power4.out', delay: 0.1 }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const filteredItems = activeFilter === 'ALL' 
    ? galleryItems 
    : galleryItems.filter(item => item.category === activeFilter);

  return (
    <div className="gallery-page" ref={containerRef}>
      {/* ── Split-Tone Hero ── */}
      <section className="gallery-page__hero">
        <div className="gallery-page__bg-text">VISUALS</div>
        <div className="container gallery-page__container">
          <div className="gallery-page__content">
            <span className="section-label">// EXCLUSIVE PHOTO DIARY</span>
            <h1 className="gallery-page__title">
              {'GALLERY'.split('').map((char, i) => (
                <span key={i} className="gallery-page__char" style={{ display: 'inline-block' }}>{char}</span>
              ))}
            </h1>
            <p className="gallery-page__subtitle">
              Take a visual tour inside Anantapur's premium fitness space. Explore our Olympic-size pool, advanced gym floor, vibrant group studios, and luxury steam amenities.
            </p>
          </div>
        </div>
      </section>

      {/* ── Masonry Grid with Category Filters ── */}
      <section className="section gallery-page__showcase">
        <div className="container">
          {/* Category Filter Buttons */}
          <div className="gallery-page__filters mb-2xl">
            {categories.map((cat) => (
              <button
                key={cat}
                className={`brutal-btn brutal-btn--sm ${activeFilter === cat ? 'brutal-btn--primary' : 'brutal-btn--ghost'}`}
                onClick={() => setActiveFilter(cat)}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Grid Layout */}
          <motion.div layout className="gallery-page__grid">
            <AnimatePresence mode="popLayout">
              {filteredItems.map((item, index) => (
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4 }}
                  className="gallery-page__item brutal-card"
                  key={item.title}
                >
                  <div className="gallery-page__img-container">
                    <img src={item.image} alt={item.title} className="gallery-page__img" />
                    <div className="gallery-page__overlay">
                      <span className="gallery-page__tag brutal-badge brutal-badge--blue text-mono">{item.category}</span>
                      <h4 className="gallery-page__item-title font-bold mt-sm">{item.title}</h4>
                      <p className="gallery-page__item-desc text-xs mt-xs">{item.desc}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
