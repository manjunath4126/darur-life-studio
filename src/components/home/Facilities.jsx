import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { LuWaves, LuDumbbell, LuCheck, LuSparkles, LuActivity, LuCoffee, LuWifi } from 'react-icons/lu';
import './Facilities.css';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

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
    link: '/gym',
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

export default function Facilities() {
  const containerRef = useRef(null);
  const headingText = "Our Facilities & Services";

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Kinetic Typography character reveal on scroll
      gsap.fromTo(
        '.facilities__char',
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.03,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: '.facilities__heading',
            start: 'top 88%',
            toggleActions: 'play none none none',
          },
        }
      );

      // 2. Parallax card slide-up reveals
      gsap.fromTo(
        '.facilities__card',
        { y: 100, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          stagger: 0.1,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: '.facilities__grid',
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      );

      // 3. Background typography scroll parallax drift
      gsap.to('.facilities__bg-typography', {
        x: '-=150',
        scrollTrigger: {
          trigger: '#facilities',
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="facilities section" id="facilities" ref={containerRef}>
      {/* Background Parallax Typography Layer */}
      <div className="facilities__bg-typography">WELLNESS</div>

      <div className="container">
        <span className="section-label">// WHAT WE OFFER</span>

        {/* Heading Split for Kinetic Typography */}
        <h2 className="facilities__heading section-title" style={{ overflow: 'hidden' }}>
          {headingText.split('').map((char, index) => (
            <span key={index} className="facilities__char" style={{ display: 'inline-block' }}>
              {char === ' ' ? '\u00A0' : char}
            </span>
          ))}
        </h2>

        <div className="facilities__grid">
          {facilities.map((facility) => {
            const Icon = facility.icon;
            return (
              <div
                className={`facilities__card facilities__card--${facility.id} brutal-card`}
                key={facility.id}
              >
                {/* Background active glow element */}
                <div className="facilities__card-glow" />

                {/* Badge sticker */}
                <span className="facilities__badge">{facility.badge}</span>

                {/* Icon wrapper */}
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
                      <span>{feature}</span>
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
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
