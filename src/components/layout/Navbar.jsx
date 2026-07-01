import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { LuMenu, LuX, LuUser } from 'react-icons/lu';
import { useAuth } from '../../context/AuthContext.jsx';
import logoImg from '../../assets/darur_logo.png';
import './Navbar.css';

const NAV_LINKS = [
  { path: '/', label: 'Home' },
  { path: '/swimming', label: 'Swimming' },
  { path: '/gym', label: 'Gym' },
  { path: '/yoga', label: 'Yoga' },
  { path: '/zumba', label: 'Zumba' },
  { path: '/aerobics', label: 'Aerobics' },
  { path: '/cafe', label: 'Cafeteria' },
  { path: '/gallery', label: 'Gallery' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { user, isAuthenticated, logout } = useAuth();
  const location = useLocation();

  // Track scroll for background change
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  const isActive = (path) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <>
      <nav className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}>
        <div className="navbar__inner">
          {/* Logo */}
          <Link to="/" className="navbar__logo">
            <img src={logoImg} alt="Darur Life Studio Logo" className="navbar__logo-img" />
            <span className="navbar__logo-text">DARUR LIFE STUDIO</span>
          </Link>

          {/* Desktop Nav Links */}
          <ul className="navbar__links">
            {NAV_LINKS.map(({ path, label }) => (
              <li key={path}>
                <Link
                  to={path}
                  className={`navbar__link ${isActive(path) ? 'navbar__link--active' : ''}`}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Right Actions */}
          <div className="navbar__actions">
            {/* Auth / User (Desktop) */}
            {isAuthenticated ? (
              <div className="navbar__user">
                <span className="navbar__user-name">
                  <LuUser />
                  {user?.name || 'User'}
                </span>
                <Link to="/dashboard" className="navbar__dashboard-link">
                  Dashboard
                </Link>
                <button
                  className="navbar__logout-btn"
                  onClick={logout}
                  type="button"
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link
                to="/auth"
                className="brutal-btn brutal-btn--primary brutal-btn--sm navbar__auth-btn"
              >
                Login
              </Link>
            )}

            {/* Hamburger (Mobile) */}
            <button
              className="navbar__hamburger"
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
              type="button"
            >
              <span className="navbar__hamburger-bar" />
              <span className="navbar__hamburger-bar" />
              <span className="navbar__hamburger-bar" />
            </button>
          </div>
        </div>
      </nav>

      {/* Spacer */}
      <div className="navbar__spacer" />

      {/* Mobile Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="navbar__mobile-overlay"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          >
            {/* Close Button */}
            <button
              className="navbar__mobile-close"
              onClick={() => setMobileOpen(false)}
              aria-label="Close menu"
              type="button"
            >
              <LuX />
            </button>

            {/* Mobile Links */}
            <ul className="navbar__mobile-links">
              {NAV_LINKS.map(({ path, label }, i) => (
                <motion.li
                  key={path}
                  initial={{ opacity: 0, x: 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + i * 0.06 }}
                >
                  <Link
                    to={path}
                    className={`navbar__mobile-link ${isActive(path) ? 'navbar__mobile-link--active' : ''}`}
                    onClick={() => setMobileOpen(false)}
                  >
                    {label}
                  </Link>
                </motion.li>
              ))}
            </ul>

            {/* Mobile Bottom Actions */}
            <div className="navbar__mobile-actions">
              {isAuthenticated ? (
                <>
                  <div className="navbar__mobile-user">
                    <LuUser />
                    <span className="navbar__mobile-user-name">
                      {user?.name || 'User'}
                    </span>
                  </div>
                  <Link
                    to="/dashboard"
                    className="brutal-btn brutal-btn--blue"
                    onClick={() => setMobileOpen(false)}
                  >
                    Dashboard
                  </Link>
                  <button
                    className="brutal-btn brutal-btn--coral"
                    onClick={() => {
                      logout();
                      setMobileOpen(false);
                    }}
                    type="button"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <Link
                  to="/auth"
                  className="brutal-btn brutal-btn--primary"
                  onClick={() => setMobileOpen(false)}
                >
                  Login / Register
                </Link>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
