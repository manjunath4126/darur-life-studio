import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { LuMapPin, LuPhone, LuClock, LuInstagram } from 'react-icons/lu';
import logoImg from '../../assets/darur_logo.png';
import './Footer.css';

const QUICK_LINKS = [
  { path: '/', label: 'Home' },
  { path: '/swimming', label: 'Swimming' },
  { path: '/gym', label: 'Gym' },
  { path: '/yoga', label: 'Yoga' },
  { path: '/zumba', label: 'Zumba' },
  { path: '/aerobics', label: 'Aerobics' },
  { path: '/cafe', label: 'Cafeteria' },
  { path: '/gallery', label: 'Gallery' },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

export default function Footer() {
  return (
    <footer className="footer">
      <motion.div
        className="footer__inner"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
      >
        <div className="footer__grid">
          {/* Col 1 — Logo & About */}
          <motion.div className="footer__col" variants={itemVariants}>
            <div className="footer__logo">
              <img src={logoImg} alt="Darur Life Studio Logo" className="footer__logo-img" />
              <span className="footer__logo-text">DARUR LIFE STUDIO</span>
            </div>
            <p className="footer__description">
              Anantapur's premium swimming academy, gym &amp; health club. Building champions in
              the pool and strength in the gym since 2022.
            </p>
            <div className="footer__collab mt-md">
              <span className="brutal-badge brutal-badge--green text-mono" style={{ fontSize: '0.65rem' }}>
                🤝 PHYSIOTHERAPY PARTNER
              </span>
              <p className="text-sm mt-xs text-muted" style={{ lineHeight: '1.4' }}>
                Collaborating with <strong>Kasturi College of Physiotherapy</strong> (Ph: 080554-273747) to provide expert orthopedic and sports rehabilitation.
              </p>
            </div>
            <p className="footer__copyright" style={{ marginTop: 'var(--space-md)' }}>
              © 2022–2026 Darur Life Studio &amp; Health Club
            </p>
          </motion.div>

          {/* Col 2 — Quick Links */}
          <motion.div className="footer__col" variants={itemVariants}>
            <h4 className="footer__col-title">Quick Links</h4>
            <ul className="footer__links">
              {QUICK_LINKS.map(({ path, label }) => (
                <li key={path}>
                  <Link to={path} className="footer__link">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Col 3 — Contact Info */}
          <motion.div className="footer__col" variants={itemVariants}>
            <h4 className="footer__col-title">Contact</h4>
            <div className="footer__contact">
              <div className="footer__contact-item">
                <span className="footer__contact-icon">
                  <LuMapPin />
                </span>
                <span className="footer__contact-text">
                  Beside Cognizant College, 80 Feet Road, Srinagar Colony Extension, before Ayyappa Swamy Temple, Anantapur, AP - 515001.
                </span>
              </div>
              <div className="footer__contact-item">
                <span className="footer__contact-icon">
                  <LuPhone />
                </span>
                <span className="footer__contact-text">
                  <a href="tel:+919381625959">93816 25959</a><br />
                  <a href="tel:+917013173562">70131 73562</a>
                </span>
              </div>
              <div className="footer__contact-item">
                <span className="footer__contact-icon">
                  <LuClock />
                </span>
                <span className="footer__contact-text">
                  Gym: Mon – Sat: 6:00 AM – 9:00 PM (Break 1:00 PM – 4:00 PM)<br />
                  Pool: Mon – Sun: 6:00 AM – 9:00 PM
                </span>
              </div>
            </div>
          </motion.div>

          {/* Col 4 — Social */}
          <motion.div className="footer__col" variants={itemVariants}>
            <h4 className="footer__col-title">Follow Us</h4>
            <div className="footer__social-links">
              <a
                href="https://www.instagram.com/darurlifestudio"
                target="_blank"
                rel="noopener noreferrer"
                className="footer__social-link footer__social-link--instagram"
              >
                <LuInstagram />
                @darurlifestudio
              </a>
              <a
                href="https://maps.google.com/?q=Darur+Life+Studio+Anantapur"
                target="_blank"
                rel="noopener noreferrer"
                className="footer__social-link footer__social-link--maps"
              >
                <LuMapPin />
                Google Maps
              </a>
            </div>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div className="footer__bottom" variants={itemVariants}>
          <p className="footer__bottom-text">
            Made with <span>🌊</span> &amp; <span>💪</span> in Anantapur
          </p>
        </motion.div>
      </motion.div>
    </footer>
  );
}
