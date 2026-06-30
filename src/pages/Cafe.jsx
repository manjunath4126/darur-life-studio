import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  LuCoffee, 
  LuUtensils, 
  LuShieldAlert, 
  LuMessageCircle, 
  LuDumbbell,
  LuSparkles
} from 'react-icons/lu';
import cafeHeroImg from '../assets/cafe_hero.png';

// Import food item images
import imgBeetroot from '../assets/cafe_beetroot_shot.jpg';
import imgBlackCoffee from '../assets/cafe_black_coffee.jpg';
import imgBananaShake from '../assets/cafe_banana_shake.jpg';
import imgProteinShake from '../assets/cafe_protein_shake.jpg';
import imgCreatineDrink from '../assets/cafe_creatine_drink.jpg';
import imgPeanutOats from '../assets/cafe_peanut_oats.jpg';
import imgGreekYogurt from '../assets/cafe_greek_yogurt.jpg';
import imgAcaiBowl from '../assets/cafe_acai_bowl.jpg';
import imgChickenSalad from '../assets/cafe_chicken_salad.jpg';

import './Cafe.css';

gsap.registerPlugin(ScrollTrigger);

export default function Cafe() {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Kinetic title animation
      gsap.fromTo('.cafe-title__char',
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.03, ease: 'power4.out', delay: 0.1 }
      );

      // Mouse move parallax for zero-gravity cafe visual
      const handleMouseMove = (e) => {
        const { clientX, clientY } = e;
        const xPos = (clientX / window.innerWidth - 0.5) * 35;
        const yPos = (clientY / window.innerHeight - 0.5) * 35;

        gsap.to('.cafe-hero__art-wrapper', {
          x: xPos,
          y: yPos,
          duration: 1.5,
          ease: 'power2.out',
        });
      };

      window.addEventListener('mousemove', handleMouseMove);

      // Scroll-triggered reveals for menu categories and cards
      gsap.fromTo('.menu-category-group',
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.menu-container',
            start: 'top 80%',
            toggleActions: 'play none none none'
          }
        }
      );

      return () => window.removeEventListener('mousemove', handleMouseMove);
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const categories = [
    {
      title: 'PRE-WORKOUT ENERGY BOOSTERS',
      icon: <LuCoffee />,
      color: 'brutal-badge--orange',
      items: [
        { name: 'Beetroot Nitric Shot', price: '₹120', calories: '45 kcal', carbs: '10g', protein: '1g', info: 'Nitric oxide booster for ultimate muscle pumps.', image: imgBeetroot },
        { name: 'Double Espresso Black Coffee', price: '₹80', calories: '5 kcal', carbs: '0g', protein: '0g', info: 'Pure caffeine kick to maximize training focus.', image: imgBlackCoffee },
        { name: 'Oats & Banana Energy Shake', price: '₹150', calories: '320 kcal', carbs: '58g', protein: '8g', info: 'Complex carbs for steady, sustained energy release.', image: imgBananaShake }
      ]
    },
    {
      title: 'POST-WORKOUT RECOVERY BLENDS',
      icon: <LuDumbbell />,
      color: 'brutal-badge--blue',
      items: [
        { name: 'Whey Isolate Protein Shake', price: '₹180', calories: '140 kcal', carbs: '3g', protein: '26g', info: '26g ultra-pure isolate whey protein for rapid muscle repair.', image: imgProteinShake },
        { name: 'Creatine Hydration Punch', price: '₹140', calories: '80 kcal', carbs: '15g', protein: '0g', info: '5g micronized creatine blended with electrolytes.', image: imgCreatineDrink },
        { name: 'Peanut Butter Oats Protein Bowl', price: '₹160', calories: '410 kcal', carbs: '44g', protein: '16g', info: 'Rolled oats, organic peanut butter, sliced banana, and honey.', image: imgPeanutOats }
      ]
    },
    {
      title: 'SUPERFOOD VITALITY BOWLS',
      icon: <LuUtensils />,
      color: 'brutal-badge--green',
      items: [
        { name: 'Chia Seed & Berry Greek Yogurt', price: '₹150', calories: '220 kcal', carbs: '18g', protein: '15g', info: 'High-protein Greek yogurt topped with chia and strawberry.', image: imgGreekYogurt },
        { name: 'Acai Vitality Granola Bowl', price: '₹180', calories: '280 kcal', carbs: '36g', protein: '6g', info: 'Antioxidant-rich organic acai base with seed granola.', image: imgAcaiBowl },
        { name: 'Grilled Chicken & Greens Salad', price: '₹220', calories: '340 kcal', carbs: '8g', protein: '38g', info: 'Tender chicken breast, steamed broccoli, olive oil, and lemon.', image: imgChickenSalad }
      ]
    }
  ];

  const titleText = "FITNESS CAFETERIA";

  return (
    <div className="page-wrapper cafe-page" ref={containerRef}>
      {/* Hero Banner (Split-Tone Zero-G Layout) */}
      <section className="cafe-hero">
        <div className="container cafe-hero__container">
          {/* Left Content (Dark charcoal background side) */}
          <div className="cafe-hero__content">
            <span className="section-label">// NUTRITION &amp; VITALITY</span>
            <h1 className="cafe-title">
              {titleText.split('').map((char, i) => (
                <span key={i} className="cafe-title__char" style={{ display: 'inline-block', whiteSpace: char === ' ' ? 'pre' : 'normal' }}>
                  {char}
                </span>
              ))}
            </h1>
            <p className="cafe-subtitle">Clean fuel for your body. Zero refined sugar. Zero compromises.</p>
            <div className="cafe-hero__badges mt-md">
              <span className="brutal-badge brutal-badge--green text-mono text-xs mr-sm">✓ NO REFINED SUGAR</span>
              <span className="brutal-badge brutal-badge--yellow text-mono text-xs">✓ 100% ORGANIC INGREDIENTS</span>
            </div>
          </div>

          {/* Right Visual (Serene pool-water blue side) */}
          <div className="cafe-hero__visual">
            <div className="cafe-hero__art-wrapper">
              {/* Masked Kinetic Background */}
              <div className="cafe-hero__kinetic-bg">FUEL</div>

              {/* Zero-G Floating protein shaker and sliced strawberry fruits asset */}
              <img
                src={cafeHeroImg}
                alt="Darur Life Cafeteria Zero-Gravity Shaker and Berries"
                className="cafe-hero__float-asset floating-ui-element"
              />
            </div>
          </div>
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
              <p className="text-secondary text-sm" style={{ lineHeight: '1.6' }}>
                We believe what you put into your body is just as important as the effort you put into your workouts. 
                Our health cafe menu features <strong>zero refined sugars, zero artificial syrup concentrates, and cold-pressed fats</strong>. 
                Every meal lists detailed calorie counts and protein values so you can track your nutrition easily.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Menu Categories */}
      <section className="section cafe-menu" style={{ borderTop: '1px solid var(--border-light)', borderBottom: '1px solid var(--border-light)' }}>
        <div className="container">
          <div className="section-header text-center mb-2xl">
            <span className="section-label">// CAFE MENU</span>
            <h2 className="section-title">FUEL YOUR ROUTINE</h2>
          </div>

          <div className="menu-container">
            {categories.map((cat) => (
              <div key={cat.title} className="menu-category-group mb-3xl">
                <div className="menu-category-header mb-xl">
                  <span className="category-icon">{cat.icon}</span>
                  <h3 className="category-title font-bold">{cat.title}</h3>
                </div>

                <div className="cafe-menu__grid">
                  {cat.items.map((item) => (
                    <div key={item.name} className="brutal-card menu-item-card">
                      {/* Premium Food Image */}
                      <div className="menu-item-image-wrapper mb-md">
                        <img src={item.image} alt={item.name} className="menu-item-img" />
                      </div>

                      <div className="item-head mb-sm">
                        <h4 className="item-name font-bold">{item.name}</h4>
                        <span className="item-price text-mono font-bold">{item.price}</span>
                      </div>
                      <p className="item-info text-sm text-secondary mb-md">{item.info}</p>
                      
                      {/* Macro Breakdown labels */}
                      <div className="item-macros mb-md">
                        <span className="macro-tag">P: {item.protein}</span>
                        <span className="macro-tag">C: {item.carbs}</span>
                      </div>

                      <div className="item-footer">
                        <span className={`brutal-badge ${cat.color} text-mono text-xs`}>{item.calories}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Cafe Timings & WhatsApp Order */}
      <section className="section cafe-order bg-cream">
        <div className="container text-center">
          <motion.div
            className="order-box max-w-sm mx-auto brutal-card"
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
              <LuMessageCircle className="icon" /> ORDER ON WHATSAPP
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
