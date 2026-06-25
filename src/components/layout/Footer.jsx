import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { LuMapPin, LuPhone, LuClock, LuInstagram } from 'react-icons/lu';
import './Footer.css';

const QUICK_LINKS = [
  { path: '/', label: 'Home' },
  { path: '/swimming', label: 'Swimming' },
  { path: '/gym', label: 'Gym' },
  { path: '/shop', label: 'Shop' },
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
              <span className="footer__logo-accent" />
              <span className="footer__logo-text">Darur Life Studio</span>
            </div>
            <p className="footer__description">
              Anantapur's premium swimming academy & gym. Building champions in
              the pool and strength in the gym since 2022.
            </p>
            <p className="footer__copyright">© 2022–2026 Darur Life Studio</p>
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
                  Cognizant College, 80 Feet Rd, near Ayyappa Swamy Temple,
                  Srinagar Colony, Anantapur, AP 515001
                </span>
              </div>
              <div className="footer__contact-item">
                <span className="footer__contact-icon">
                  <LuPhone />
                </span>
                <span className="footer__contact-text">
                  <a href="tel:+919381625959">093816 25959</a>
                </span>
              </div>
              <div className="footer__contact-item">
                <span className="footer__contact-icon">
                  <LuClock />
                </span>
                <span className="footer__contact-text">
                  Mon – Sun: 6:00 AM – 9:00 PM
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
            Made with <span>💪</span> in Anantapur
          </p>
        </motion.div>
      </motion.div>
    </footer>
  );
}
