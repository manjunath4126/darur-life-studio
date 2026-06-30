import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  LuCoffee, 
  LuUtensils, 
  LuShieldAlert, 
  LuMessageCircle, 
  LuZap, 
  LuDumbbell, 
  LuFlame, 
  LuSparkles, 
  LuCheck,
  LuPlus,
  LuRotateCcw
} from 'react-icons/lu';
import cafeHeroImg from '../assets/cafe_hero.png';
import './Cafe.css';

gsap.registerPlugin(ScrollTrigger);

export default function Cafe() {
  const containerRef = useRef(null);
  
  // Custom Shake Builder State
  const [goal, setGoal] = useState('recovery');
  const [milkBase, setMilkBase] = useState('almond-milk');
  const [extras, setExtras] = useState([]);

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

      // Scroll-triggered reveals for menu categories
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
        { name: 'Beetroot Nitric Shot', price: '₹120', calories: '45 kcal', carbs: '10g', protein: '1g', info: 'Nitric oxide booster for ultimate muscle pumps.' },
        { name: 'Double Espresso Black Coffee', price: '₹80', calories: '5 kcal', carbs: '0g', protein: '0g', info: 'Pure caffeine kick to maximize training focus.' },
        { name: 'Oats & Banana Energy Shake', price: '₹150', calories: '320 kcal', carbs: '58g', protein: '8g', info: 'Complex carbs for steady, sustained energy release.' }
      ]
    },
    {
      title: 'POST-WORKOUT RECOVERY BLENDS',
      icon: <LuDumbbell />,
      color: 'brutal-badge--blue',
      items: [
        { name: 'Whey Isolate Protein Shake', price: '₹180', calories: '140 kcal', carbs: '3g', protein: '26g', info: '26g ultra-pure isolate whey protein for rapid muscle repair.' },
        { name: 'Creatine Hydration Punch', price: '₹140', calories: '80 kcal', carbs: '15g', protein: '0g', info: '5g micronized creatine blended with electrolytes.' },
        { name: 'Peanut Butter Oats Protein Bowl', price: '₹160', calories: '410 kcal', carbs: '44g', protein: '16g', info: 'Rolled oats, organic peanut butter, sliced banana, and honey.' }
      ]
    },
    {
      title: 'SUPERFOOD VITALITY BOWLS',
      icon: <LuUtensils />,
      color: 'brutal-badge--green',
      items: [
        { name: 'Chia Seed & Berry Greek Yogurt', price: '₹150', calories: '220 kcal', carbs: '18g', protein: '15g', info: 'High-protein Greek yogurt topped with chia and strawberry.' },
        { name: 'Acai Vitality Granola Bowl', price: '₹180', calories: '280 kcal', carbs: '36g', protein: '6g', info: 'Antioxidant-rich organic acai base with seed granola.' },
        { name: 'Grilled Chicken & Greens Salad', price: '₹220', calories: '340 kcal', carbs: '8g', protein: '38g', info: 'Tender chicken breast, steamed broccoli, olive oil, and lemon.' }
      ]
    }
  ];

  // Shake Builder calculations
  const calculateMacros = () => {
    let baseCal = 0;
    let baseProtein = 0;
    let baseCarbs = 0;
    let price = 150; // Base Shake Price

    if (goal === 'energy') {
      baseCal = 220;
      baseProtein = 6;
      baseCarbs = 38;
    } else if (goal === 'recovery') {
      baseCal = 180;
      baseProtein = 26;
      baseCarbs = 8;
    } else { // weight-loss
      baseCal = 110;
      baseProtein = 18;
      baseCarbs = 4;
    }

    // Milk Base Adjustments
    if (milkBase === 'skim-milk') {
      baseCal += 90;
      baseProtein += 8;
      baseCarbs += 12;
      price += 10;
    } else if (milkBase === 'almond-milk') {
      baseCal += 30;
      baseProtein += 1;
      baseCarbs += 1;
      price += 25;
    } else if (milkBase === 'coconut-water') {
      baseCal += 45;
      baseProtein += 1;
      baseCarbs += 9;
      price += 20;
    }

    // Extras
    extras.forEach(extra => {
      if (extra === 'creatine') {
        price += 40;
        baseCarbs += 2;
      } else if (extra === 'glutamine') {
        price += 30;
      } else if (extra === 'chia') {
        price += 25;
        baseCal += 60;
        baseProtein += 2;
        baseCarbs += 5;
      } else if (extra === 'spinach') {
        price += 15;
        baseCal += 10;
        baseProtein += 1;
        baseCarbs += 2;
      }
    });

    return { calories: baseCal, protein: baseProtein, carbs: baseCarbs, price };
  };

  const macros = calculateMacros();

  const handleToggleExtra = (extra) => {
    if (extras.includes(extra)) {
      setExtras(extras.filter(item => item !== extra));
    } else {
      setExtras([...extras, extra]);
    }
  };

  const handleResetBuilder = () => {
    setGoal('recovery');
    setMilkBase('almond-milk');
    setExtras([]);
  };

  const getWhatsAppMessage = () => {
    const goalText = goal.toUpperCase();
    const baseText = milkBase.replace('-', ' ').toUpperCase();
    const extrasText = extras.length > 0 ? extras.map(e => e.toUpperCase()).join(', ') : 'NONE';
    return `Hi Darur Life Studio Cafe, I would like to order a Custom Shake:\n- Goal Type: ${goalText}\n- Liquid Base: ${baseText}\n- Add-ons: ${extrasText}\n- Total Price: ₹${macros.price}`;
  };

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

      {/* Interactive Shake Builder Component */}
      <section className="section cafe-builder bg-cream" style={{ borderTop: '1px solid var(--border-light)' }}>
        <div className="container">
          <div className="section-header text-center mb-xl">
            <span className="section-label">// INTERACTIVE EXPERIENCE</span>
            <h2 className="section-title">BUILD YOUR SHAKE</h2>
            <p className="section-subtitle max-w-sm mx-auto">Customize your recovery drink and see your calories &amp; macro distributions instantly.</p>
          </div>

          <div className="builder-layout brutal-card">
            {/* Options Left */}
            <div className="builder-options">
              {/* Step 1: Goal */}
              <div className="builder-section mb-lg">
                <h4 className="builder-section-title text-mono text-xs mb-sm">STEP 1: SELECT FITNESS GOAL</h4>
                <div className="builder-buttons-grid">
                  <button 
                    className={`builder-btn-option ${goal === 'energy' ? 'active active--energy' : ''}`}
                    onClick={() => setGoal('energy')}
                  >
                    <LuZap className="icon" />
                    <div>
                      <span className="option-label">Energy &amp; Pump</span>
                      <span className="option-sub">High Carbs / Focus</span>
                    </div>
                  </button>
                  <button 
                    className={`builder-btn-option ${goal === 'recovery' ? 'active active--recovery' : ''}`}
                    onClick={() => setGoal('recovery')}
                  >
                    <LuDumbbell className="icon" />
                    <div>
                      <span className="option-label">Muscle Recovery</span>
                      <span className="option-sub">High Protein / Whey Isolate</span>
                    </div>
                  </button>
                  <button 
                    className={`builder-btn-option ${goal === 'vitality' ? 'active active--vitality' : ''}`}
                    onClick={() => setGoal('vitality')}
                  >
                    <LuFlame className="icon" />
                    <div>
                      <span className="option-label">Fat Loss / Lean</span>
                      <span className="option-sub">Low Carb / L-Carnitine</span>
                    </div>
                  </button>
                </div>
              </div>

              {/* Step 2: Milk Base */}
              <div className="builder-section mb-lg">
                <h4 className="builder-section-title text-mono text-xs mb-sm">STEP 2: CHOOSE BASE LIQUID</h4>
                <div className="builder-buttons-grid">
                  <button 
                    className={`builder-btn-option ${milkBase === 'water' ? 'active' : ''}`}
                    onClick={() => setMilkBase('water')}
                  >
                    <div>
                      <span className="option-label">Purified Water</span>
                      <span className="option-sub">+₹0 | 0 kcal</span>
                    </div>
                  </button>
                  <button 
                    className={`builder-btn-option ${milkBase === 'skim-milk' ? 'active' : ''}`}
                    onClick={() => setMilkBase('skim-milk')}
                  >
                    <div>
                      <span className="option-label">Skimmed Milk</span>
                      <span className="option-sub">+₹10 | 90 kcal</span>
                    </div>
                  </button>
                  <button 
                    className={`builder-btn-option ${milkBase === 'almond-milk' ? 'active' : ''}`}
                    onClick={() => setMilkBase('almond-milk')}
                  >
                    <div>
                      <span className="option-label">Organic Almond Milk</span>
                      <span className="option-sub">+₹25 | 30 kcal</span>
                    </div>
                  </button>
                  <button 
                    className={`builder-btn-option ${milkBase === 'coconut-water' ? 'active' : ''}`}
                    onClick={() => setMilkBase('coconut-water')}
                  >
                    <div>
                      <span className="option-label">Fresh Coconut Water</span>
                      <span className="option-sub">+₹20 | 45 kcal</span>
                    </div>
                  </button>
                </div>
              </div>

              {/* Step 3: Extras */}
              <div className="builder-section">
                <h4 className="builder-section-title text-mono text-xs mb-sm">STEP 3: ADD NUTRITION BOOSTS (OPTIONAL)</h4>
                <div className="builder-buttons-grid">
                  <button 
                    className={`builder-btn-option ${extras.includes('creatine') ? 'active active--extra' : ''}`}
                    onClick={() => handleToggleExtra('creatine')}
                  >
                    <div>
                      <span className="option-label">Creatine (5g)</span>
                      <span className="option-sub">+₹40 | Power &amp; Hydration</span>
                    </div>
                  </button>
                  <button 
                    className={`builder-btn-option ${extras.includes('glutamine') ? 'active active--extra' : ''}`}
                    onClick={() => handleToggleExtra('glutamine')}
                  >
                    <div>
                      <span className="option-label">Glutamine (5g)</span>
                      <span className="option-sub">+₹30 | Muscle Recovery</span>
                    </div>
                  </button>
                  <button 
                    className={`builder-btn-option ${extras.includes('chia') ? 'active active--extra' : ''}`}
                    onClick={() => handleToggleExtra('chia')}
                  >
                    <div>
                      <span className="option-label">Chia Seeds</span>
                      <span className="option-sub">+₹25 | Omega-3 &amp; Fiber</span>
                    </div>
                  </button>
                  <button 
                    className={`builder-btn-option ${extras.includes('spinach') ? 'active active--extra' : ''}`}
                    onClick={() => handleToggleExtra('spinach')}
                  >
                    <div>
                      <span className="option-label">Organic Baby Spinach</span>
                      <span className="option-sub">+₹15 | Iron &amp; Minerals</span>
                    </div>
                  </button>
                </div>
              </div>
            </div>

            {/* Live Stats Right */}
            <div className="builder-stats">
              <div className="stats-header mb-md">
                <LuSparkles className="icon-sparkle" />
                <h4 className="font-bold">YOUR LIVE FUEL ANALYSIS</h4>
                <button className="reset-btn" onClick={handleResetBuilder} aria-label="Reset Builder">
                  <LuRotateCcw />
                </button>
              </div>

              <div className="macros-display mb-lg">
                <div className="macro-box">
                  <span className="macro-val">{macros.calories}</span>
                  <span className="macro-label text-mono">CALORIES</span>
                </div>
                <div className="macro-box">
                  <span className="macro-val">{macros.protein}g</span>
                  <span className="macro-label text-mono">PROTEIN</span>
                </div>
                <div className="macro-box">
                  <span className="macro-val">{macros.carbs}g</span>
                  <span className="macro-label text-mono">CARBS</span>
                </div>
              </div>

              <div className="brutal-divider mb-lg" />

              <div className="order-summary mb-lg">
                <div className="summary-row">
                  <span className="text-secondary text-sm">Base Shake Price:</span>
                  <span className="font-bold text-sm">₹150</span>
                </div>
                <div className="summary-row">
                  <span className="text-secondary text-sm">Base Liquid &amp; Add-ons:</span>
                  <span className="font-bold text-sm">₹{macros.price - 150}</span>
                </div>
                <div className="summary-row total-row pt-sm mt-sm">
                  <span className="font-bold">Estimated Cost:</span>
                  <span className="font-bold text-lg text-ocean-teal">₹{macros.price} <span className="text-xs text-muted font-normal">+ GST</span></span>
                </div>
              </div>

              <a 
                href={`https://wa.me/919381625959?text=${encodeURIComponent(getWhatsAppMessage())}`}
                target="_blank" 
                rel="noreferrer" 
                className="brutal-btn brutal-btn--green w-full text-center"
              >
                <LuMessageCircle className="icon" /> PRE-ORDER THIS SHAKE
              </a>
            </div>
          </div>
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
            {categories.map((cat, idx) => (
              <div key={cat.title} className="menu-category-group mb-2xl">
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
