import React from 'react';
import { motion } from 'framer-motion';
import { LuCoffee, LuUtensils, LuShieldAlert, LuMessageCircle } from 'react-icons/lu';
import './Cafe.css';

export default function Cafe() {
  const categories = [
    {
      title: 'PRE-WORKOUT ENERGY BOOSTERS',
      icon: <LuCoffee />,
      items: [
        { name: 'Beetroot Nitric Shot', price: '₹120', calories: '45 kcal', info: 'Nitric oxide booster for ultimate muscle pumps.' },
        { name: 'Double Espresso Black Coffee', price: '₹80', calories: '5 kcal', info: 'Pure caffeine kick to maximize training focus.' },
        { name: 'Oats & Banana Energy Shake', price: '₹150', calories: '320 kcal', info: 'Complex carbs for steady, sustained energy release.' }
      ]
    },
    {
      title: 'POST-WORKOUT RECOVERY BLENDS',
      icon: <LuUtensils />,
      items: [
        { name: 'Whey Isolate Protein Shake', price: '₹180', calories: '140 kcal', info: '26g ultra-pure isolate whey protein for rapid muscle repair.' },
        { name: 'Creatine Hydration Punch', price: '₹140', calories: '80 kcal', info: '5g micronized creatine blended with electrolytes.' },
        { name: 'Peanut Butter Oats Protein Bowl', price: '₹160', calories: '410 kcal', info: 'Rolled oats, organic peanut butter, sliced banana, and honey.' }
      ]
    },
    {
      title: 'SUPERFOOD VITALITY BOWLS',
      icon: <LuUtensils />,
      items: [
        { name: 'Chia Seed & Berry Greek Yogurt', price: '₹150', calories: '220 kcal', info: 'High-protein Greek yogurt topped with chia and strawberry.' },
        { name: 'Acai Vitality Granola Bowl', price: '₹180', calories: '280 kcal', info: 'Antioxidant-rich organic acai base with seed granola.' },
        { name: 'Grilled Chicken & Greens Salad', price: '₹220', calories: '340 kcal', info: 'Tender chicken breast, steamed broccoli, olive oil, and lemon.' }
      ]
    }
  ];

  return (
    <div className="page-wrapper cafe-page">
      {/* Hero Banner */}
      <section className="cafe-hero text-center">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="section-label">// NUTRITION &amp; VITALITY</span>
            <h1 className="cafe-title">FITNESS CAFETERIA</h1>
            <p className="cafe-subtitle">Clean fuel for your body. Zero refined sugar. Zero compromises.</p>
          </motion.div>
        </div>
      </section>

      {/* Philosophy banner */}
      <section className="section cafe-philosophy">
        <div className="container">
          <motion.div
            className="brutal-card philosophy-card"
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
          >
            <div className="philosophy-card__icon">
              <LuShieldAlert />
            </div>
            <div>
              <h3 className="font-bold mb-xs" style={{ color: 'var(--ocean-deep)' }}>Our Nutrition Promise</h3>
              <p className="text-secondary text-sm">
                We believe what you put into your body is just as important as the effort you put into your workouts. 
                Our health cafe menu features **zero refined sugars, zero artificial syrup concentrates, and cold-pressed fats**. 
                Every meal lists detailed calorie counts and protein values so you can track your nutrition easily.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Menu Categories */}
      <section className="section cafe-menu bg-cream" style={{ borderTop: '1px solid var(--border-light)', borderBottom: '1px solid var(--border-light)' }}>
        <div className="container">
          <div className="menu-container">
            {categories.map((cat, idx) => (
              <motion.div
                key={cat.title}
                className="menu-category-group mb-2xl"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
              >
                <div className="menu-category-header mb-lg">
                  <span className="category-icon">{cat.icon}</span>
                  <h3 className="category-title font-bold">{cat.title}</h3>
                </div>

                <div className="grid-3">
                  {cat.items.map((item) => (
                    <div key={item.name} className="brutal-card menu-item-card">
                      <div className="item-head mb-sm">
                        <h4 className="item-name font-bold">{item.name}</h4>
                        <span className="item-price text-mono font-bold">{item.price}</span>
                      </div>
                      <p className="item-info text-sm text-secondary mb-md">{item.info}</p>
                      <div className="item-footer">
                        <span className="brutal-badge brutal-badge--yellow text-mono text-xs">{item.calories}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Cafe Timings & WhatsApp Order */}
      <section className="section cafe-order">
        <div className="container text-center">
          <motion.div
            className="order-box max-w-sm mx-auto"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
          >
            <h3 className="font-bold mb-xs" style={{ color: 'var(--ocean-deep)' }}>Cafeteria Hours</h3>
            <p className="text-secondary text-sm mb-lg">
              Open Daily: <strong>6:00 AM – 9:00 PM</strong><br />
              Order at the counter or pre-order before your workout session so it is ready when you finish!
            </p>
            <a
              href="https://wa.me/919381625959?text=Hi%20Darur%20Life%20Studio%20Cafe,%20I%20would%20like%20to%20order..."
              target="_blank"
              rel="noreferrer"
              className="brutal-btn brutal-btn--green w-full"
            >
              <LuMessageCircle className="icon" /> PRE-ORDER ON WHATSAPP
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
