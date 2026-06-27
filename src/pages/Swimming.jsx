import { motion } from 'framer-motion';
import {
  LuCircle,
  LuEye,
  LuShirt,
  LuHeadphones,
  LuRectangleHorizontal,
  LuShoppingBag,
} from 'react-icons/lu';
import SlotBooking from '../components/swimming/SlotBooking.jsx';
import AccessoryCard from '../components/swimming/AccessoryCard.jsx';
import './Swimming.css';

import React from 'react';

// Get dynamic price from localStorage or default
const getDynamicPrice = (id, defaultPrice) => {
  const stored = localStorage.getItem('darur_inventory');
  if (stored) {
    try {
      const items = JSON.parse(stored);
      const match = items.find(item => item.id === id);
      if (match) return match.price;
    } catch (e) {}
  }
  return defaultPrice;
};

/* ── Accessories Data ── */
const ACCESSORIES = [
  {
    id: 'swim-1',
    name: 'PRO SWIM CAP',
    price: getDynamicPrice('swim-1', 299),
    category: 'Headwear',
    color: 'var(--electric-blue)',
    icon: LuCircle,
  },
  {
    id: 'swim-2',
    name: 'ANTI-FOG GOGGLES',
    price: getDynamicPrice('swim-2', 599),
    category: 'Eyewear',
    color: 'var(--pool-blue)',
    icon: LuEye,
  },
  {
    id: 'swim-3',
    name: 'SWIM TRUNKS (MEN)',
    price: getDynamicPrice('swim-3', 1499),
    category: 'Swimwear',
    color: 'var(--deep-blue)',
    icon: LuShirt,
  },
  {
    id: 'swim-4',
    name: 'ONE-PIECE SUIT (WOMEN)',
    price: getDynamicPrice('swim-4', 1699),
    category: 'Swimwear',
    color: 'var(--neon-green)',
    icon: LuShirt,
  },
  {
    id: 'swim-5',
    name: 'SILICONE EAR PLUGS',
    price: getDynamicPrice('swim-5', 199),
    category: 'Accessories',
    color: 'var(--chlorine-green)',
    icon: LuHeadphones,
  },
  {
    id: 'swim-6',
    name: 'MICROFIBER TOWEL',
    price: getDynamicPrice('swim-6', 499),
    category: 'Accessories',
    color: 'var(--vibrant-coral)',
    icon: LuRectangleHorizontal,
  },
];


/* ── Page Variants ── */
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

export default function Swimming() {
  return (
    <div className="swimming-page">
      {/* ── Hero Banner ── */}
      <section className="swimming-hero">
        <div className="container swimming-hero__content">
          <motion.h1
            className="swimming-hero__heading"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          >
            SWIMMING ACADEMY
          </motion.h1>
          <motion.p
            className="swimming-hero__subtitle"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.4 }}
          >
            Book your lane. Gear up. Dive in.
          </motion.p>
        </div>
      </section>

      {/* ── Section 1: Slot Booking ── */}
      <section className="swimming-section">
        <div className="container">
          <SlotBooking />
        </div>
      </section>

      {/* ── Divider ── */}
      <div className="brutal-divider" />

      {/* ── Section 2: Accessories Shop ── */}
      <section className="swimming-section swimming-section--accessories">
        <div className="container">
          <motion.div
            className="swimming-section__header"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
          >
            <span className="section-label">
              <LuShoppingBag style={{ verticalAlign: 'middle', marginRight: '6px' }} />
              // SWIM SHOP
            </span>
            <h2 className="swimming-section__heading section-title">
              GEAR &amp; ACCESSORIES
            </h2>
            <p style={{ maxWidth: '520px', marginTop: 'var(--space-sm)' }}>
              Everything you need before hitting the pool. Premium quality swimming
              accessories available at the studio.
            </p>
          </motion.div>

          <div className="accessories-grid">
            {ACCESSORIES.map((item) => (
              <AccessoryCard key={item.id} {...item} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
