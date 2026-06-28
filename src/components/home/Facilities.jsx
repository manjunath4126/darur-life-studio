import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView } from 'framer-motion';
import { LuWaves, LuDumbbell, LuCheck, LuSparkles, LuActivity, LuCoffee, LuWifi } from 'react-icons/lu';
import './Facilities.css';

const facilities = [
  {
    id: 'swim',
    title: 'Swimming Academy',
    icon: LuWaves,
    badge: '6AM – 9PM',
    link: '/swimming',
    cta: 'View Pool Details',
    features: [
      'Beginner, Intermediate, Advanced',
      'Learn To Swim in 21 Days',
      'One-to-One Personal Coaching',
      'Temperature Controlled Pool'
    ],
  },
  {
    id: 'gym',
    title: 'Fitness Center / Gym',
    icon: LuDumbbell,
    badge: 'Cardio & Strength',
    link: '/gym',
    cta: 'View Gym Tiers',
    features: [
      'Modern Cardio & Weight Racks',
      'Personal Training (Group/Private)',
      'Nutrition & Body Composition Analysis',
      'Steam & Shower Locker Access'
    ],
  },
  {
    id: 'studios',
    title: 'Yoga, Zumba & Aerobics',
    icon: LuSparkles,
    badge: 'Group Studios',
    link: '/gym',
    cta: 'View Studio Classes',
    features: [
      'Certified Instructors',
      'Spacious Wooden Dance Floors',
      'Flexible Monthly Packages',
      'Energetic Group Workouts'
    ],
  },
  {
    id: 'physio',
    title: 'Physiotherapy & Rehab',
    icon: LuActivity,
    badge: 'Kasturi College Partner',
    link: '/gym', // direct to gym page contact info
    cta: 'Book Rehabilitation',
    features: [
      'Sports Injury Recovery',
      'Posture Correction Programs',
      'Pain Management Therapies',
      'Clinical Care Practitioners'
    ],
  },
  {
    id: 'cafe',
    title: 'The Fitness Cafe',
    icon: LuCoffee,
    badge: 'Healthy Nutrition',
    link: '/cafe',
    cta: 'View Cafe Menu',
    features: [
      'Dietician-Approved Meal Plans',
      'Protein Shakes & Fresh Juices',
      'Organic Pre & Post Workout Meals',
      'Healthy Grab-and-Go Snacks'
    ],
  },
  {
    id: 'workspace',
    title: 'IT Work Space',
    icon: LuWifi,
    badge: 'Work & Workout',
    link: '/auth',
    cta: 'Create Free Account',
    features: [
      'Free High-Speed Wi-Fi',
      'Quiet Workspace Desks',
      'Charging Ports at Every Seat',
      'Perfect for Remote Professionals'
    ],
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.1 + i * 0.1,
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1],
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
          // WHAT WE OFFER
        </motion.span>

        <motion.h2
          className="facilities__heading section-title"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          Our Facilities &amp; Services
        </motion.h2>

        <div className="facilities__grid">
          {facilities.map((facility, i) => {
            const Icon = facility.icon;
            return (
              <motion.div
                className={`facilities__card facilities__card--${facility.id} brutal-card`}
                key={facility.id}
                variants={cardVariants}
                initial="hidden"
                animate={isInView ? 'visible' : 'hidden'}
                custom={i}
              >
                {/* Badge sticker */}
                <span className="facilities__badge">
                  {facility.badge}
                </span>

                {/* Icon */}
                <div className="facilities__icon">
                  <Icon />
                </div>

                {/* Title */}
                <h3 className="facilities__card-title">{facility.title}</h3>

                {/* Features list */}
                <ul className="facilities__features">
                  {facility.features.map((feature) => (
                    <li className="facilities__feature" key={feature}>
                      <LuCheck className="facilities__check" />
                      {feature}
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <Link
                  to={facility.link}
                  className="brutal-btn brutal-btn--ghost brutal-btn--sm facilities__cta"
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
